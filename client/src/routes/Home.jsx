import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { api } from '../lib/api.js';
import ProgressRing from '../components/ProgressRing.jsx';
import { ALL_LESSONS, TOTAL_LESSONS } from '../content/course.js';
import { VAULT, TOOLS } from '../content/vault.js';

const TILES = [
  { to: '/course', icon: '🎓', title: 'Free Course', desc: 'The complete Section 8 system, first deal to fifty doors.' },
  { to: '/vault', icon: '🧰', title: 'Toolkit Vault', desc: 'Checklists, worksheets, and playbooks for every step.' },
  { to: '/calculators', icon: '🧮', title: 'Deal Calculator', desc: 'Cash flow, cash-on-cash, and cap rate in seconds.' },
  { to: '/brrrr', icon: '♻️', title: 'BRRRR Calculator', desc: 'See how much cash you recycle out of a deal.' },
  { to: '/analyzer', icon: '🏚️', title: 'Property Analyzer', desc: 'Score a property against Section 8 rents.', soon: true },
  { to: '/finder', icon: '🔎', title: 'Deal Finder', desc: 'Surface markets that fit the Section 8 model.', soon: true },
];

export default function Home() {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(new Set());
  const [dealsCount, setDealsCount] = useState(0);

  useEffect(() => {
    api('/progress').then((d) => setCompleted(new Set(d.completed))).catch(() => {});
    api('/deals').then((d) => setDealsCount((d.deals || []).length)).catch(() => {});
  }, []);

  const done = [...completed].length;
  const pct = Math.round((done / TOTAL_LESSONS) * 100);
  const next = ALL_LESSONS.find((l) => !completed.has(l.id));
  const firstName = user?.name?.split(' ')[0] || 'investor';

  return (
    <div>
      <div className="mb-2 text-2xl font-extrabold sm:text-3xl">Welcome back, {firstName} 👋</div>
      <p className="mb-8 text-slate-500">Here is where you are and your next step toward owning doors.</p>

      {/* Progress + continue hero */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card flex items-center gap-5 bg-gradient-to-br from-white to-slate-50 lg:col-span-2">
          <ProgressRing value={pct} size={92} stroke={9} />
          <div className="min-w-0 flex-1">
            <div className="eyebrow mb-1">Course progress</div>
            {next ? (
              <>
                <div className="text-sm text-slate-500">Continue where you left off</div>
                <div className="truncate text-lg font-bold">{next.title}</div>
                <Link to="/course" className="btn-primary mt-3 !py-2 text-sm">Resume course →</Link>
              </>
            ) : (
              <>
                <div className="text-lg font-bold">You finished every lesson. 🎉</div>
                <div className="text-sm text-slate-500">Time to put it to work. Book a call to plan your first or next deal.</div>
                <Link to="/get-help" className="btn-primary mt-3 !py-2 text-sm">Get a game plan →</Link>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
          <Stat value={`${done}/${TOTAL_LESSONS}`} label="Lessons done" />
          <Stat value={VAULT.length + TOOLS.length} label="Tools & resources" />
          <Stat value={dealsCount} label="Deals saved" />
        </div>
      </div>

      {/* Quick access */}
      <div className="eyebrow mb-3">Jump back in</div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link key={t.to} to={t.to} className="card card-hover relative">
            {t.soon && <span className="badge-muted absolute right-4 top-4">Soon</span>}
            <div className="mb-3 text-2xl">{t.icon}</div>
            <h3 className="font-bold">{t.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
          </Link>
        ))}
      </div>

      {/* Work with us */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-brand p-6 text-white sm:p-8">
        <div className="eyebrow mb-1 text-white/70">Ready to move faster?</div>
        <h3 className="text-xl font-extrabold">Get 1-on-1 help or let our team do it for you</h3>
        <p className="mt-1 max-w-xl text-sm text-white/80">
          You have the tools and the training. When you want a proven team in your corner, we map the fastest path to your next deal.
        </p>
        <Link to="/get-help" className="btn mt-4 bg-white text-brand hover:bg-slate-100">See your options</Link>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
