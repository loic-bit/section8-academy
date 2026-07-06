import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { FILTERS, STRATEGIES } from '../content/strategies.js';

// Strategy Comparison: five ways to invest in real estate, judged on the same
// five filters. Tap a filter to rank by it; open a strategy for the honest
// cost breakdown.
const dots = (n) => '●'.repeat(n) + '○'.repeat(5 - n);

export default function Compare() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [open, setOpen] = useState('section8');

  const ranked = activeFilter
    ? [...STRATEGIES].sort((a, b) => b.scores[activeFilter] - a.scores[activeFilter])
    : STRATEGIES;
  const best = activeFilter ? Math.max(...STRATEGIES.map((s) => s.scores[activeFilter])) : null;

  return (
    <div>
      <PageHeader
        title="Strategy Comparison"
        subtitle="Airbnb, flips, ADUs, traditional rentals, and Section 8, judged on the same five filters. No hype, just the math."
      />

      {/* Filter chips */}
      <div className="mb-5">
        <div className="eyebrow mb-2">Rank by what matters to you</div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveFilter(null)} className={`chip ${activeFilter === null ? 'chip-active' : ''}`}>Overview</button>
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`chip ${activeFilter === f.key ? 'chip-active' : ''}`}>{f.label}</button>
          ))}
        </div>
        {activeFilter && (
          <p className="mt-2 text-xs text-slate-400">{FILTERS.find((f) => f.key === activeFilter)?.hint}. More dots is better for you.</p>
        )}
      </div>

      {/* Strategy cards */}
      <div className="space-y-3">
        {ranked.map((s, idx) => {
          const isOpen = open === s.slug;
          const isWinner = activeFilter && s.scores[activeFilter] === best;
          return (
            <div key={s.slug} className={`card !p-0 overflow-hidden ${isWinner ? 'border-brand/40' : ''}`}>
              <button
                onClick={() => setOpen(isOpen ? '' : s.slug)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition duration-160 ease-premium hover:bg-slate-50/70 sm:px-6"
              >
                <span className="text-2xl">{s.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-bold">{s.name}</span>
                    {isWinner && <span className="badge-brand">Best for this</span>}
                    {activeFilter === null && s.slug === 'section8' && <span className="badge-brand">Our model</span>}
                  </div>
                  <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-400">{s.summary}</div>
                </div>
                {activeFilter ? (
                  <span className="num shrink-0 tracking-widest text-brand">{dots(s.scores[activeFilter])}</span>
                ) : (
                  <span className="num hidden shrink-0 text-xs text-slate-400 sm:block">
                    {FILTERS.reduce((n, f) => n + s.scores[f.key], 0)}/25
                  </span>
                )}
                <span className="shrink-0 text-lg text-slate-300">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {FILTERS.map((f) => (
                      <div key={f.key} className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{f.label}</span>
                          <span className="num text-xs tracking-widest text-brand">{dots(s.scores[f.key])}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.breakdown[f.key]}</p>
                      </div>
                    ))}
                    <div className="rounded-lg border-l-4 border-brand bg-brand/5 p-4 sm:col-span-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-brand">The verdict</span>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{s.verdict}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="font-display font-bold">Numbers are educational estimates, not promises.</div>
          <p className="mt-1 text-sm text-slate-500">Want to pressure-test Section 8 with your own assumptions? Run a real deal through the calculator.</p>
        </div>
        <Link to="/calculators" className="btn-primary shrink-0 !py-2 text-sm">Open the Deal Calculator →</Link>
      </div>
    </div>
  );
}
