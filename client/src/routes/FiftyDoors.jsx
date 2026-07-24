import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { useToolTracking } from '../lib/useToolTracking.js';
import { money } from '../lib/format.js';

// Path to 50 Doors. Ported from Joseph's standalone page: a month-by-month
// simulation of buying at a discount, refinancing, and recycling the same
// capital. The lever that matters is cash left stuck per deal, not salary.
const VALUE = 130000, LTV = 0.75, RATE = 0.075;
const LOAN = VALUE * LTV;
const CYCLE = 5, PARALLEL = 4, APPR = 0.02, TARGET = 50, CAP = 360;

const fmtK = (n) => {
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (Math.abs(n) >= 1000) return '$' + Math.round(n / 1000) + 'k';
  return '$' + Math.round(n);
};

function amort(L, annual, m) {
  if (m <= 0) return L;
  const i = annual / 12, n = 360;
  if (m >= n) return 0;
  return (L * (Math.pow(1 + i, n) - Math.pow(1 + i, m))) / (Math.pow(1 + i, n) - 1);
}

function simulate(p) {
  const cashToStart = p.down;
  const cashBack = p.down - p.left;
  let cash = p.reserve, owned = 0, inFlight = [];
  const acq = [], hist = [0];
  let targetMonth = null;
  for (let m = 1; m <= CAP; m++) {
    cash += p.monthly + owned * p.cf;
    inFlight = inFlight.filter((done) => {
      if (done === m) { cash += cashBack; owned++; acq.push(m); return false; }
      return true;
    });
    let g = 0;
    while (cash >= cashToStart && inFlight.length < PARALLEL && owned + inFlight.length < TARGET && g < 60) {
      cash -= cashToStart; inFlight.push(m + CYCLE); g++;
    }
    hist.push(owned);
    if (owned >= TARGET && targetMonth === null) targetMonth = m;
  }
  return { cashToStart, cashBack, acq, hist, targetMonth, p };
}

function equityAt(sim, month) {
  let value = 0, debt = 0, doors = 0;
  for (const a of sim.acq) {
    if (a <= month) {
      const yrs = (month - a) / 12;
      value += VALUE * Math.pow(1 + APPR, yrs);
      debt += amort(LOAN, RATE, month - a);
      doors++;
    }
  }
  return { equity: value - debt, doors, cf: doors * sim.p.cf };
}

const matureEquity = (years) =>
  VALUE * Math.pow(1 + APPR, years) * TARGET - amort(LOAN, RATE, years * 12) * TARGET;

const SLIDERS = [
  { key: 'reserve', label: 'Cash you start with', min: 0, max: 80000, step: 2500, fmt: fmtK, group: 'Your starting point' },
  { key: 'monthly', label: 'Money you add each month', min: 0, max: 10000, step: 250, fmt: fmtK, group: 'Your starting point', hint: 'Drag this toward zero. Watch the finish line barely move. The recycled deals do the work, not your paycheck.' },
  { key: 'down', label: 'Cash you put into each deal', min: 8000, max: 30000, step: 1000, fmt: fmtK, group: 'Your deals (this is the lever)', hint: 'Your money in on day one: down payment, rehab gap, and reserves. A lender covers the rest.' },
  { key: 'left', label: 'Cash left stuck after refinance', min: 0, max: 20000, step: 1000, fmt: fmtK, group: 'Your deals (this is the lever)', hint: 'The only money that does not come back. Buy at a deeper discount and this shrinks. This number decides your speed more than anything else.' },
  { key: 'cf', label: 'Cash flow per door / month', min: 100, max: 600, step: 25, fmt: (n) => '$' + n, group: 'Your deals (this is the lever)', hint: 'What you keep after the mortgage, management, vacancy, and repairs.' },
];

function Chart({ sim }) {
  const W = 720, H = 300, pL = 40, pR = 16, pT = 14, pB = 28;
  const reached = sim.targetMonth || sim.hist.length - 1;
  const maxM = Math.max(24, Math.min(sim.hist.length - 1, reached + 6));
  const x = (m) => pL + (m / maxM) * (W - pL - pR);
  const y = (d) => H - pB - (d / TARGET) * (H - pT - pB);
  const grid = [];
  for (let d = 0; d <= 50; d += 10) grid.push(d);
  const xt = [];
  const step = maxM > 96 ? 24 : 12;
  for (let m = 0; m <= maxM; m += step) xt.push(m);
  let line = `M ${x(0)} ${y(sim.hist[0])}`;
  for (let m = 1; m <= maxM; m++) line += ` L ${x(m)} ${y(sim.hist[m] ?? sim.hist[sim.hist.length - 1])}`;
  const area = `${line} L ${x(maxM)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="fdFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map((d) => (
        <g key={d}>
          <line x1={pL} y1={y(d)} x2={W - pR} y2={y(d)} stroke="#e6ebef" strokeWidth="1" />
          <text x={pL - 8} y={y(d) + 3} textAnchor="end" fontSize="10" fill="#8a97a6">{d}</text>
        </g>
      ))}
      {xt.map((m) => (
        <text key={m} x={x(m)} y={H - 8} textAnchor="middle" fontSize="10" fill="#8a97a6">yr {(m / 12).toFixed(0)}</text>
      ))}
      <path d={area} fill="url(#fdFill)" />
      <path d={line} fill="none" stroke="#0f766e" strokeWidth="2.5" strokeLinejoin="round" />
      {sim.targetMonth && sim.targetMonth <= maxM && (
        <g>
          <line x1={x(sim.targetMonth)} y1={pT} x2={x(sim.targetMonth)} y2={H - pB} stroke="#0f766e" strokeDasharray="4 4" strokeWidth="1" />
          <circle cx={x(sim.targetMonth)} cy={y(TARGET)} r="5" fill="#0f766e" />
        </g>
      )}
    </svg>
  );
}

export default function FiftyDoors() {
  const [v, setV] = useState({ reserve: 20000, monthly: 2000, down: 15000, left: 5000, cf: 300 });
  const sim = useMemo(() => simulate(v), [v]);
  const set = (key) => (e) => setV({ ...v, [key]: +e.target.value });

  useToolTracking('fifty-doors', [v], () => ({
    inputs: v,
    results: {
      monthsToTarget: sim.targetMonth,
      doors: sim.hist[sim.hist.length - 1],
    },
  }));

  const groups = [...new Set(SLIDERS.map((s) => s.group))];
  const fin = sim.targetMonth ? equityAt(sim, sim.targetMonth) : null;

  return (
    <div>
      <PageHeader
        back={{ to: '/vault', label: 'Toolkit' }}
        title="Path to 50 Doors"
        subtitle="It was never about how much you save. Your timeline is set by how good your deals are, not by your income. Move the sliders and see it."
      />

      {/* The engine, in three steps */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ['01', 'Buy at a discount', 'Get a property worth far more after repairs than it costs to buy and fix. That gap is the entire engine.'],
          ['02', 'Fix, rent, refinance', 'Renovate, place a Section 8 tenant, then refinance at the new higher value. The new loan hands most of your cash back.'],
          ['03', 'Recycle and repeat', 'Your money comes back. You buy the next one with the same dollars. Deeper discount, faster growth.'],
        ].map(([n, t, d]) => (
          <div key={n} className="card !p-5">
            <div className="eyebrow mb-1">{n}</div>
            <div className="font-display font-bold">{t}</div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{d}</p>
          </div>
        ))}
      </div>

      {/* Headline results */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="stat">
          <div className="stat-value text-brand">{sim.targetMonth ? (sim.targetMonth / 12).toFixed(1) : '30+'}</div>
          <div className="stat-label">{sim.targetMonth ? 'years to 50 doors' : 'years. Tighten your deals.'}</div>
        </div>
        <div className="stat">
          <div className="stat-value">{fin ? fmtK(Math.round(fin.equity)) : '--'}</div>
          <div className="stat-label">equity at 50 doors</div>
        </div>
        <div className="stat">
          <div className="stat-value text-brand">{sim.targetMonth ? fmtK(50 * v.cf) : '--'}</div>
          <div className="stat-label">monthly cash flow at 50</div>
        </div>
        <div className="stat">
          <div className="stat-value">{fmtK(Math.round(matureEquity(20)))}</div>
          <div className="stat-label">equity on a 20-yr hold, gross</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Sliders */}
        <div className="card lg:col-span-2">
          {groups.map((g) => (
            <div key={g}>
              <div className="eyebrow mb-3 mt-2 first:mt-0">{g}</div>
              {SLIDERS.filter((s) => s.group === g).map((s) => (
                <div key={s.key} className="mb-5">
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <label className="text-sm font-medium">{s.label}</label>
                    <span className="num font-display text-sm font-bold text-brand">{s.fmt(v[s.key])}</span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={v[s.key]}
                    onChange={set(s.key)}
                    className="w-full accent-brand"
                  />
                  {s.hint && <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{s.hint}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Output panel */}
        <div className="card lg:col-span-3">
          <h3 className="font-display font-bold">What one deal does to your money</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">You put in</div>
              <div className="num font-display mt-1 font-bold">{fmtK(sim.cashToStart)}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">You pull back out</div>
              <div className={`num font-display mt-1 font-bold ${sim.cashBack < 0 ? 'text-danger' : 'text-brand'}`}>{fmtK(sim.cashBack)}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Stays stuck</div>
              <div className={`num font-display mt-1 font-bold ${v.left <= 5000 ? 'text-brand' : v.left >= 15000 ? 'text-warning' : ''}`}>{fmtK(v.left)}</div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Fixed assumptions: ~$130k value after repair · refinance at 75% of value · ~5 months per deal cycle · up to 4 deals at once · 2% yearly appreciation · 30-year loan at 7.5%. Educational estimates only, not financial advice.
          </p>

          <h3 className="font-display mt-6 font-bold">Doors over time</h3>
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
            <Chart sim={sim} />
          </div>

          <table className="num mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="py-2">When</th>
                <th className="py-2 text-right">Doors</th>
                <th className="py-2 text-right">Equity</th>
                <th className="py-2 text-right">Cash flow/mo</th>
              </tr>
            </thead>
            <tbody>
              {[5, 10, 15].map((yr) => {
                const e = equityAt(sim, yr * 12);
                return (
                  <tr key={yr} className="border-t border-slate-100">
                    <td className="py-2 font-semibold">Year {yr}</td>
                    <td className="py-2 text-right">{e.doors}</td>
                    <td className="py-2 text-right">{fmtK(Math.round(e.equity))}</td>
                    <td className="py-2 text-right">{fmtK(Math.round(e.cf))}</td>
                  </tr>
                );
              })}
              <tr className="border-t border-slate-100 font-bold text-brand">
                <td className="py-2">20-yr hold</td>
                <td className="py-2 text-right">50</td>
                <td className="py-2 text-right">{fmtK(Math.round(matureEquity(20)))}</td>
                <td className="py-2 text-right">{fmtK(50 * v.cf)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
