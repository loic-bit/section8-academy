import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { money, pct } from '../lib/format.js';

// BRRRR = Buy, Rehab, Rent, Refinance, Repeat. The question this answers:
// after I refinance, how much of my cash is still stuck in the deal?
const DEFAULTS = {
  purchasePrice: 95000,
  rehabBudget: 28000,
  purchaseClosingPct: 4,
  holdingCosts: 3500,
  arv: 175000,
  refiLtv: 75,
  refiRate: 7.5,
  termYears: 30,
  monthlyRent: 1600,
  taxesYearly: 1800,
  insuranceYearly: 1200,
  vacancyPct: 5,
  maintenancePct: 8,
  mgmtPct: 8,
};

function compute(v) {
  const purchaseCosts = (v.purchasePrice * v.purchaseClosingPct) / 100;
  const allIn = v.purchasePrice + v.rehabBudget + purchaseCosts + v.holdingCosts;

  const refiLoan = (v.arv * v.refiLtv) / 100;
  const cashLeftIn = allIn - refiLoan; // negative means you pulled out extra
  const cashRecovered = Math.min(refiLoan, allIn);
  const equity = v.arv - refiLoan;

  const monthlyRate = v.refiRate / 100 / 12;
  const n = v.termYears * 12;
  const mortgage =
    monthlyRate > 0 ? (refiLoan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n)) : refiLoan / n;

  const gross = v.monthlyRent;
  const opex =
    v.taxesYearly / 12 +
    v.insuranceYearly / 12 +
    (gross * (v.vacancyPct + v.maintenancePct + v.mgmtPct)) / 100;
  const cashFlow = gross - opex - mortgage;

  const fullRecycle = cashLeftIn <= 0;
  const cashOnCash = cashLeftIn > 0 ? ((cashFlow * 12) / cashLeftIn) * 100 : Infinity;

  return { allIn, refiLoan, cashLeftIn, cashRecovered, equity, mortgage, cashFlow, cashOnCash, fullRecycle };
}

const FIELDS = [
  { key: 'purchasePrice', label: 'Purchase price ($)' },
  { key: 'rehabBudget', label: 'Rehab budget ($)' },
  { key: 'purchaseClosingPct', label: 'Purchase closing costs (%)' },
  { key: 'holdingCosts', label: 'Holding costs ($)' },
  { key: 'arv', label: 'After-repair value / ARV ($)' },
  { key: 'refiLtv', label: 'Refinance LTV (%)' },
  { key: 'refiRate', label: 'Refinance rate (%)' },
  { key: 'termYears', label: 'Loan term (years)' },
  { key: 'monthlyRent', label: 'Section 8 monthly rent ($)' },
  { key: 'taxesYearly', label: 'Property taxes / year ($)' },
  { key: 'insuranceYearly', label: 'Insurance / year ($)' },
  { key: 'vacancyPct', label: 'Vacancy (%)' },
  { key: 'maintenancePct', label: 'Maintenance (%)' },
  { key: 'mgmtPct', label: 'Property mgmt (%)' },
];

export default function Brrrr() {
  const [v, setV] = useState(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const r = useMemo(() => compute(v), [v]);

  const set = (key) => (e) => setV({ ...v, [key]: parseFloat(e.target.value) || 0 });
  const reset = () => setV(DEFAULTS);

  const cocText = r.fullRecycle ? 'Infinite' : pct(r.cashOnCash);

  async function copySummary() {
    const text = [
      'BRRRR analysis',
      `All-in cost: ${money(r.allIn)}`,
      `Refinance loan (${v.refiLtv}% of ARV): ${money(r.refiLoan)}`,
      `Cash left in deal: ${money(r.cashLeftIn)}`,
      `Monthly cash flow: ${money(r.cashFlow)}`,
      `Cash-on-cash: ${cocText}`,
      `Equity captured: ${money(r.equity)}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  }

  const cfPositive = r.cashFlow >= 0;

  return (
    <div>
      <PageHeader
        title="BRRRR Calculator"
        subtitle="Buy, rehab, rent, refinance, repeat. See how much of your cash you get back out of a deal."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Deal inputs</h3>
            <button onClick={reset} className="text-xs font-semibold text-slate-400 hover:text-slate-600">
              Reset to defaults
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <input type="number" min="0" className="field" value={v[f.key]} onChange={set(f.key)} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className={`card ${r.fullRecycle ? 'border-brand/30 bg-brand/5' : cfPositive ? 'border-success/20 bg-success-soft' : 'border-warning/20 bg-warning-soft'}`}>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cash left in the deal</div>
            <div className={`num font-display mt-1 text-[32px] font-bold leading-none ${r.cashLeftIn <= 0 ? 'text-brand' : 'text-ink'}`}>
              {money(Math.max(0, r.cashLeftIn))}
            </div>
            {r.fullRecycle ? (
              <div className="mt-1 text-xs font-semibold text-brand">
                Full BRRRR. You recovered all of your capital{r.cashLeftIn < 0 ? ` plus ${money(-r.cashLeftIn)}` : ''}.
              </div>
            ) : (
              <div className="mt-1 text-xs text-slate-500">
                You recovered {money(r.cashRecovered)} of {money(r.allIn)} all-in.
              </div>
            )}
          </div>

          <div className="card space-y-3 text-sm">
            <Row label="Monthly cash flow" value={money(r.cashFlow)} strong positive={cfPositive} />
            <Row label="Cash-on-cash return" value={cocText} />
            <Row label="Equity captured" value={money(r.equity)} />
            <hr className="border-slate-100" />
            <Row label="All-in cost" value={money(r.allIn)} />
            <Row label="Refinance loan" value={money(r.refiLoan)} />
            <Row label="New mortgage (P&I) / mo" value={money(r.mortgage)} />
          </div>

          <button onClick={copySummary} className="btn-ghost w-full">
            {copied ? '✓ Copied summary' : 'Copy summary'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong, positive }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`num font-semibold tabular-nums ${strong ? (positive ? 'text-success' : 'text-danger') : ''}`}>
        {value}
      </span>
    </div>
  );
}
