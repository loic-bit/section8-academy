import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { useToolTracking } from '../lib/useToolTracking.js';

// Goal Planner: Turnkey vs BRRRR. Ported from Joseph's strategy one-pager.
// Pick a goal (income / doors / net worth), pick a strategy, set your starting
// position, and see the timeline. Strategy assumptions are grounded in the
// published deal analyses (Detroit turnkey, average BRRRR).
const STRAT = {
  turnkey: { name: 'Turnkey', arv: 80000, cashIn: 23000, cashBack: 0, loan: 64000, cf: 402, cycle: 2, hue: '#0f766e' },
  brrrr: { name: 'BRRRR', arv: 90000, cashIn: 28500, cashBack: 18000, loan: 67500, cf: 472, cycle: 6, hue: '#7c3aed' },
};
const RATE = 0.0775, APPR = 0.03, TERM = 360, MAXM = 480, DOOR_CAP = 60;

const GOALS = {
  income: { min: 2000, max: 40000, step: 500, def: 10000, label: 'Monthly passive income goal', hint: 'After all expenses. The income that replaces your job.' },
  doors: { min: 1, max: 50, step: 1, def: 15, label: 'Number of doors you want', hint: 'Each door is one rented, cash-flowing unit.' },
  networth: { min: 250000, max: 5000000, step: 250000, def: 1000000, label: 'Net worth (equity) goal', hint: 'What the portfolio is worth minus what you owe.' },
};

const fmtK = (n) => {
  const a = Math.abs(n);
  if (a >= 1e6) return '$' + (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M';
  if (a >= 1000) return '$' + Math.round(n / 1000) + 'k';
  return '$' + Math.round(n);
};
const fmtFull = (n) => '$' + Math.round(n).toLocaleString();

function balance(L, m) {
  if (m <= 0) return L;
  if (m >= TERM) return 0;
  const i = RATE / 12;
  return (L * (Math.pow(1 + i, TERM) - Math.pow(1 + i, m))) / (Math.pow(1 + i, TERM) - 1);
}

function simulate(p) {
  const s = p.s;
  let cash = p.start, owned = 0, inFlight = [];
  const acq = [], hist = [0];
  for (let m = 1; m <= MAXM; m++) {
    cash += p.monthly + owned * s.cf;
    inFlight = inFlight.filter((done) => {
      if (done <= m) { cash += s.cashBack; owned++; acq.push(m); return false; }
      return true;
    });
    let guard = 0;
    while (cash >= s.cashIn && inFlight.length < p.parallel && owned + inFlight.length < DOOR_CAP && guard < 80) {
      cash -= s.cashIn; inFlight.push(m + s.cycle); guard++;
    }
    hist.push(owned);
  }
  return { acq, hist, p };
}

function snap(sim, month) {
  const s = sim.p.s;
  let value = 0, debt = 0, doors = 0;
  for (const a of sim.acq) {
    if (a <= month) {
      const yrs = (month - a) / 12;
      value += s.arv * Math.pow(1 + APPR, yrs);
      debt += balance(s.loan, month - a);
      doors++;
    }
  }
  return { doors, value, equity: value - debt, income: doors * s.cf };
}

function goalMonth(sim, goalType, goal) {
  for (let m = 1; m <= MAXM; m++) {
    const sn = snap(sim, m);
    if (goalType === 'doors' && sn.doors >= goal) return m;
    if (goalType === 'income' && sn.income >= goal) return m;
    if (goalType === 'networth' && sn.equity >= goal) return m;
  }
  return null;
}

function Chart({ sim, gm }) {
  const W = 720, H = 280, pL = 42, pR = 18, pT = 16, pB = 30;
  const reached = gm || sim.hist.length - 1;
  const maxM = Math.max(24, Math.min(MAXM, reached + 12));
  const topDoors = Math.max(snap(sim, maxM).doors, 2);
  const x = (m) => pL + (m / maxM) * (W - pL - pR);
  const y = (d) => H - pB - (d / topDoors) * (H - pT - pB);
  const hue = sim.p.s.hue;
  const gridSteps = [0, 1, 2, 3, 4].map((i) => Math.round((topDoors * i) / 4));
  const xstep = maxM > 240 ? 60 : maxM > 120 ? 24 : 12;
  const xt = [];
  for (let m = 0; m <= maxM; m += xstep) xt.push(m);
  let line = `M ${x(0)} ${y(0)}`;
  for (let m = 1; m <= maxM; m++) line += ` L ${x(m)} ${y(snap(sim, m).doors)}`;
  const area = `${line} L ${x(maxM)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="gpFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hue} stopOpacity="0.22" />
          <stop offset="100%" stopColor={hue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridSteps.map((d, i) => (
        <g key={i}>
          <line x1={pL} y1={y(d)} x2={W - pR} y2={y(d)} stroke="#e6ebef" strokeWidth="1" />
          <text x={pL - 8} y={y(d) + 4} textAnchor="end" fontSize="10" fill="#8a97a6">{d}</text>
        </g>
      ))}
      {xt.map((m) => (
        <text key={m} x={x(m)} y={H - 9} textAnchor="middle" fontSize="10" fill="#8a97a6">yr {Math.round(m / 12)}</text>
      ))}
      <path d={area} fill="url(#gpFill)" />
      <path d={line} fill="none" stroke={hue} strokeWidth="2.6" strokeLinejoin="round" />
      {gm && gm <= maxM && (
        <g>
          <line x1={x(gm)} y1={pT} x2={x(gm)} y2={H - pB} stroke={hue} strokeDasharray="4 4" strokeWidth="1.2" />
          <circle cx={x(gm)} cy={y(snap(sim, gm).doors)} r="5.5" fill={hue} />
        </g>
      )}
    </svg>
  );
}

export default function GoalPlanner() {
  const [goalType, setGoalType] = useState('income');
  const [strat, setStrat] = useState('turnkey');
  const [goal, setGoal] = useState(GOALS.income.def);
  const [start, setStart] = useState(30000);
  const [monthly, setMonthly] = useState(1500);
  const [parallel, setParallel] = useState(4);

  const g = GOALS[goalType];
  const p = { goal, start, monthly, parallel, s: STRAT[strat] };
  const sim = useMemo(() => simulate(p), [goal, start, monthly, parallel, strat]);
  const gm = useMemo(() => goalMonth(sim, goalType, goal), [sim, goalType, goal]);
  const sn = gm ? snap(sim, gm) : null;

  useToolTracking('goal-planner', [goal, start, monthly, parallel, strat], () => ({
    inputs: { goalType, strategy: strat, goal, start, monthly, parallel },
    results: { monthsToGoal: gm },
  }));

  function pickGoal(t) {
    setGoalType(t);
    setGoal(GOALS[t].def);
  }

  const goalDisplay = goalType === 'doors' ? `${goal} door${goal === 1 ? '' : 's'}` : fmtFull(goal);

  return (
    <div>
      <PageHeader
        back={{ to: '/vault', label: 'Toolkit' }}
        title="Goal Planner: Turnkey vs BRRRR"
        subtitle="Set your goal, compare both strategies, and see how fast each one gets you there from your real starting position."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Controls */}
        <div className="card lg:col-span-2">
          <div className="eyebrow mb-3">1 · What is your goal?</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {[['income', 'Passive income'], ['doors', 'Doors owned'], ['networth', 'Net worth']].map(([t, label]) => (
              <button key={t} onClick={() => pickGoal(t)} className={`chip ${goalType === t ? 'chip-active' : ''}`}>{label}</button>
            ))}
          </div>
          <div className="mb-6">
            <div className="mb-1.5 flex items-baseline justify-between">
              <label className="text-sm font-medium">{g.label}</label>
              <span className="num font-display text-sm font-bold text-brand">{goalDisplay}</span>
            </div>
            <input type="range" min={g.min} max={g.max} step={g.step} value={goal} onChange={(e) => setGoal(+e.target.value)} className="w-full accent-brand" />
            <p className="mt-1.5 text-xs text-slate-400">{g.hint}</p>
          </div>

          <div className="eyebrow mb-3">2 · Which strategy?</div>
          <div className="mb-2 flex gap-2">
            {Object.entries(STRAT).map(([k, s]) => (
              <button key={k} onClick={() => setStrat(k)} className={`chip flex-1 justify-center ${strat === k ? 'chip-active' : ''}`}>{s.name}</button>
            ))}
          </div>
          <p className="mb-6 text-xs leading-relaxed text-slate-400">
            {strat === 'turnkey'
              ? 'Turnkey: ~$23k in per deal, cash-flowing on day one, none of it comes back until you sell or refinance later.'
              : 'BRRRR: ~$28.5k in per deal, ~$18k returns at the refinance, so the same capital keeps buying. Slower per deal, faster overall.'}
          </p>

          <div className="eyebrow mb-3">3 · Your starting position</div>
          {[
            { label: 'Capital to start', val: start, set: setStart, min: 10000, max: 200000, step: 5000, fmt: fmtFull },
            { label: 'Added every month', val: monthly, set: setMonthly, min: 0, max: 10000, step: 250, fmt: fmtFull },
            { label: 'Deals running at once', val: parallel, set: setParallel, min: 1, max: 8, step: 1, fmt: (n) => `${n} deal${n === 1 ? '' : 's'}` },
          ].map((s) => (
            <div key={s.label} className="mb-5">
              <div className="mb-1.5 flex items-baseline justify-between">
                <label className="text-sm font-medium">{s.label}</label>
                <span className="num font-display text-sm font-bold text-brand">{s.fmt(s.val)}</span>
              </div>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={(e) => s.set(+e.target.value)} className="w-full accent-brand" />
            </div>
          ))}
          {parallel > 4 && (
            <div className="rounded-lg border-l-4 border-warning bg-warning-soft px-4 py-3 text-xs leading-relaxed text-slate-700">
              Running more than 4 deals at once is a full-time job. At this pace you will want a team handling the heavy lifting. That is what our done-for-you program exists for.
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="stat">
              <div className="stat-value text-brand">{gm ? (gm / 12).toFixed(1) : '40+'}</div>
              <div className="stat-label">{gm ? 'years to your goal' : 'years. Raise capital or savings.'}</div>
            </div>
            <div className="stat"><div className="stat-value">{sn ? sn.doors : '--'}</div><div className="stat-label">doors at goal</div></div>
            <div className="stat"><div className="stat-value">{sn ? fmtFull(sn.income) : '--'}</div><div className="stat-label">income / month</div></div>
            <div className="stat"><div className="stat-value">{sn ? fmtK(sn.equity) : '--'}</div><div className="stat-label">equity at goal</div></div>
          </div>

          <div className="card">
            <h3 className="font-display font-bold">Doors over time · {STRAT[strat].name}</h3>
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <Chart sim={sim} gm={gm} />
            </div>
            <table className="num mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  <th className="py-2">When</th>
                  <th className="py-2 text-right">Doors</th>
                  <th className="py-2 text-right">Income/mo</th>
                  <th className="py-2 text-right">Equity</th>
                </tr>
              </thead>
              <tbody>
                {[1, 3, 5, 10, 15].map((yv) => {
                  const s2 = snap(sim, yv * 12);
                  return (
                    <tr key={yv} className="border-t border-slate-100">
                      <td className="py-2 font-semibold">Year {yv}</td>
                      <td className="py-2 text-right">{s2.doors}</td>
                      <td className="py-2 text-right">{fmtFull(s2.income)}</td>
                      <td className="py-2 text-right">{fmtK(s2.equity)}</td>
                    </tr>
                  );
                })}
                {gm && sn && (
                  <tr className="border-t border-slate-100 font-bold text-brand">
                    <td className="py-2">Goal · yr {(gm / 12).toFixed(1)}</td>
                    <td className="py-2 text-right">{sn.doors}</td>
                    <td className="py-2 text-right">{fmtFull(sn.income)}</td>
                    <td className="py-2 text-right">{fmtK(sn.equity)}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Strategy assumptions come from published deal analyses: Turnkey ~$23k in, $402/mo cash flow; BRRRR ~$28.5k in, ~$18k back at refinance, $472/mo. 7.75% rate, 3% appreciation, 30-year loans. Educational estimates only, not financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
