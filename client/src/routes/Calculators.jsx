import { useMemo, useState } from 'react';
import { api } from '../lib/api.js';
import PageHeader from '../components/PageHeader.jsx';

const DEFAULTS = {
  purchasePrice: 120000,
  downPct: 25,
  rate: 7.0,
  termYears: 30,
  monthlyRent: 1500, // Section 8 FMR for the unit
  taxesYearly: 1800,
  insuranceYearly: 1200,
  vacancyPct: 5,
  maintenancePct: 8,
  mgmtPct: 8,
  otherMonthly: 0,
};

const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const pct = (n) => `${n.toFixed(1)}%`;

function compute(v) {
  const down = (v.purchasePrice * v.downPct) / 100;
  const loan = v.purchasePrice - down;
  const monthlyRate = v.rate / 100 / 12;
  const n = v.termYears * 12;
  const mortgage =
    monthlyRate > 0
      ? (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
      : loan / n;

  const gross = v.monthlyRent;
  const vacancy = (gross * v.vacancyPct) / 100;
  const maintenance = (gross * v.maintenancePct) / 100;
  const mgmt = (gross * v.mgmtPct) / 100;
  const taxes = v.taxesYearly / 12;
  const insurance = v.insuranceYearly / 12;

  const operatingExpenses = vacancy + maintenance + mgmt + taxes + insurance + v.otherMonthly;
  const noiMonthly = gross - operatingExpenses; // before debt service
  const cashFlow = noiMonthly - mortgage;

  const annualNOI = noiMonthly * 12;
  const annualCashFlow = cashFlow * 12;
  const cashInvested = down; // simplification: down payment only (closing costs added later)
  const capRate = (annualNOI / v.purchasePrice) * 100;
  const cashOnCash = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;

  return { down, loan, mortgage, operatingExpenses, cashFlow, annualCashFlow, capRate, cashOnCash };
}

const FIELDS = [
  { key: 'purchasePrice', label: 'Purchase price ($)' },
  { key: 'downPct', label: 'Down payment (%)' },
  { key: 'rate', label: 'Interest rate (%)' },
  { key: 'termYears', label: 'Loan term (years)' },
  { key: 'monthlyRent', label: 'Section 8 monthly rent ($)' },
  { key: 'taxesYearly', label: 'Property taxes / year ($)' },
  { key: 'insuranceYearly', label: 'Insurance / year ($)' },
  { key: 'vacancyPct', label: 'Vacancy (%)' },
  { key: 'maintenancePct', label: 'Maintenance (%)' },
  { key: 'mgmtPct', label: 'Property mgmt (%)' },
  { key: 'otherMonthly', label: 'Other monthly costs ($)' },
];

export default function Calculators() {
  const [v, setV] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const r = useMemo(() => compute(v), [v]);

  const set = (key) => (e) => {
    setV({ ...v, [key]: parseFloat(e.target.value) || 0 });
    setSaved(false);
  };

  async function saveDeal() {
    setSaving(true);
    try {
      const label = `Deal @ ${money(v.purchasePrice)} — ${money(r.cashFlow)}/mo`;
      await api('/deals', { method: 'POST', body: { label, data: { inputs: v, results: r } } });
      setSaved(true);
    } catch {
      /* ignore for v1 */
    } finally {
      setSaving(false);
    }
  }

  const positive = r.cashFlow >= 0;

  return (
    <div>
      <PageHeader
        title="Deal Calculator"
        subtitle="Section 8 rental analysis — cash flow, cash-on-cash, and cap rate."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Inputs */}
        <div className="card lg:col-span-2">
          <h3 className="mb-4 font-bold">Deal inputs</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <input type="number" className="field" value={v[f.key]} onChange={set(f.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className={`card ${positive ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <div className="text-sm font-medium text-slate-600">Monthly cash flow</div>
            <div className={`text-3xl font-extrabold ${positive ? 'text-green-700' : 'text-red-600'}`}>
              {money(r.cashFlow)}
            </div>
          </div>

          <div className="card space-y-3 text-sm">
            <Row label="Cash-on-cash return" value={pct(r.cashOnCash)} />
            <Row label="Cap rate" value={pct(r.capRate)} />
            <Row label="Annual cash flow" value={money(r.annualCashFlow)} />
            <hr className="border-slate-100" />
            <Row label="Down payment" value={money(r.down)} />
            <Row label="Loan amount" value={money(r.loan)} />
            <Row label="Mortgage (P&I) / mo" value={money(r.mortgage)} />
            <Row label="Operating expenses / mo" value={money(r.operatingExpenses)} />
          </div>

          <button onClick={saveDeal} className="btn-primary w-full" disabled={saving}>
            {saved ? '✓ Saved to your account' : saving ? 'Saving…' : 'Save this deal'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
