import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool, initDb } from './db.js';
import { mirrorLeadToAirtable } from './airtable.js';
import { mirrorSignupToKit } from './kit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-insecure-secret-change-me';

// Refuse to boot in production with the insecure fallback secret — a missing
// JWT_SECRET in prod would let anyone forge login tokens.
if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.JWT_SECRET || JWT_SECRET === 'dev-insecure-secret-change-me')
) {
  console.error('[server] FATAL: JWT_SECRET must be set in production.');
  process.exit(1);
}

const app = express();
app.use(express.json());

// Route any async handler's rejection into Express instead of crashing the
// process (Node kills on unhandled rejection). Applied at registration time.
const wrapAsync = (fn) =>
  typeof fn === 'function' && fn.constructor.name === 'AsyncFunction'
    ? (req, res, next) => fn(req, res, next).catch(next)
    : fn;
for (const m of ['get', 'post', 'patch', 'delete', 'put']) {
  const orig = app[m].bind(app);
  app[m] = (path, ...handlers) => orig(path, ...handlers.map(wrapAsync));
}

// ── Auth helpers ────────────────────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email });

// ── Health ────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ── Auth routes ─────────────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').toLowerCase().trim();
    const password = req.body.password || '';
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const exists = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
    if (exists.rowCount) {
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }

    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    );
    const user = rows[0];

    // Mirror to CRM + email list — fire and forget, never blocks signup.
    mirrorLeadToAirtable({ name, email });
    mirrorSignupToKit({ name, email });

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (e) {
    console.error('[signup]', e);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const email = (req.body.email || '').toLowerCase().trim();
    const password = req.body.password || '';
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (e) {
    console.error('[login]', e);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('/api/auth/me', authRequired, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [req.user.id]
  );
  if (!rows[0]) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ user: rows[0] });
});

// ── Course progress ───────────────────────────────────────────────────────
app.get('/api/progress', authRequired, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT lesson_id FROM course_progress WHERE user_id = $1',
    [req.user.id]
  );
  res.json({ completed: rows.map((r) => r.lesson_id) });
});

app.post('/api/progress', authRequired, async (req, res) => {
  const lessonId = (req.body.lessonId || '').trim();
  if (!lessonId) return res.status(400).json({ error: 'lessonId required' });
  await pool.query(
    `INSERT INTO course_progress (user_id, lesson_id) VALUES ($1, $2)
     ON CONFLICT (user_id, lesson_id) DO NOTHING`,
    [req.user.id, lessonId]
  );
  res.json({ ok: true });
});

// Un-mark a lesson (toggle a completed lesson back to not-done).
app.delete('/api/progress/:lessonId', authRequired, async (req, res) => {
  await pool.query('DELETE FROM course_progress WHERE user_id = $1 AND lesson_id = $2', [
    req.user.id,
    req.params.lessonId,
  ]);
  res.json({ ok: true });
});

// ── Saved deals (from calculators / analyzer) ─────────────────────────────
app.get('/api/deals', authRequired, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, label, data, created_at FROM saved_deals WHERE user_id = $1 ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json({ deals: rows });
});

app.post('/api/deals', authRequired, async (req, res) => {
  const label = (req.body.label || 'Untitled deal').trim();
  const data = req.body.data || {};
  const { rows } = await pool.query(
    'INSERT INTO saved_deals (user_id, label, data) VALUES ($1, $2, $3) RETURNING id, label, data, created_at',
    [req.user.id, label, data]
  );
  res.json({ deal: rows[0] });
});

app.patch('/api/deals/:id', authRequired, async (req, res) => {
  const label = (req.body.label || '').trim();
  if (!label) return res.status(400).json({ error: 'label required' });
  const { rows } = await pool.query(
    'UPDATE saved_deals SET label = $1 WHERE id = $2 AND user_id = $3 RETURNING id, label, data, created_at',
    [label, req.params.id, req.user.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json({ deal: rows[0] });
});

app.delete('/api/deals/:id', authRequired, async (req, res) => {
  await pool.query('DELETE FROM saved_deals WHERE id = $1 AND user_id = $2', [
    req.params.id,
    req.user.id,
  ]);
  res.json({ ok: true });
});

// ── AI Deal Finder trial requests ─────────────────────────────────────────
app.get('/api/dealfinder/trial', authRequired, async (req, res) => {
  const { rows } = await pool.query(
    "SELECT created_at FROM trial_requests WHERE user_id = $1 AND product = 'dealfinder'",
    [req.user.id]
  );
  res.json({ requested: !!rows[0], at: rows[0]?.created_at || null });
});

app.post('/api/dealfinder/trial', authRequired, async (req, res) => {
  await pool.query(
    `INSERT INTO trial_requests (user_id, product) VALUES ($1, 'dealfinder')
     ON CONFLICT (user_id, product) DO NOTHING`,
    [req.user.id]
  );
  // Let the sales team see the raised hand in the CRM. Fire and forget.
  mirrorLeadToAirtable({
    name: req.user.name,
    email: req.user.email,
    source: 'AI Deal Finder Trial',
  });
  res.json({ ok: true });
});

// ── Static frontend (production build) + SPA fallback ─────────────────────
const distDir = path.join(__dirname, '..', 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

// Final safety net: async route errors land here as a 500, never a crash.
app.use((err, _req, res, _next) => {
  console.error('[api]', err.message);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ── Boot ────────────────────────────────────────────────────────────────
initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`[server] listening on :${PORT}`));
  })
  .catch((e) => {
    console.error('[server] failed to init db', e);
    process.exit(1);
  });
