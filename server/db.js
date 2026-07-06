import pg from 'pg';

const { Pool } = pg;

// Railway injects DATABASE_URL when a Postgres service is attached.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Railway Postgres requires SSL in production; local dev usually does not.
  ssl: process.env.DATABASE_URL?.includes('railway')
    ? { rejectUnauthorized: false }
    : false,
});

// A dropped idle connection must never crash the process. The pool replaces
// the client; in-flight queries reject and surface as a 500 on that request.
pool.on('error', (err) => {
  console.error('[db] idle client error (recovered):', err.message);
});

// Create tables on boot if they don't exist. Safe to run every start.
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL UNIQUE,
      password    TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS course_progress (
      id           SERIAL PRIMARY KEY,
      user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lesson_id    TEXT NOT NULL,
      completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, lesson_id)
    );

    CREATE TABLE IF NOT EXISTS saved_deals (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      label      TEXT NOT NULL,
      data       JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS trial_requests (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product    TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, product)
    );
  `);
  console.log('[db] schema ready');
}
