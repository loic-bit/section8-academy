import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import COPY from '../content/dealfinderCopy.js';

// AI Deal Finder: the advanced-member product page. 30-day free trial, then
// $25/month. Until a hosted checkout exists, the CTA files an in-app trial
// request (stored + mirrored to the CRM) and the team activates it manually.
// Set VITE_DEALFINDER_URL to flip the button to an external checkout link.
const EXTERNAL_URL = import.meta.env.VITE_DEALFINDER_URL || '';

export default function Finder() {
  const [requested, setRequested] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api('/dealfinder/trial')
      .then((d) => setRequested(d.requested))
      .catch(() => {});
  }, []);

  async function startTrial() {
    if (EXTERNAL_URL) {
      window.open(EXTERNAL_URL, '_blank', 'noreferrer');
      return;
    }
    setBusy(true);
    try {
      await api('/dealfinder/trial', { method: 'POST' });
      setRequested(true);
    } catch {
      /* button stays; they can retry */
    } finally {
      setBusy(false);
    }
  }

  const Cta = ({ className = '' }) =>
    requested ? (
      <div className={`rounded-lg border border-brand/30 bg-brand/5 px-5 py-3.5 text-sm font-semibold text-brand ${className}`}>
        ✓ Trial requested. We activate it within 24 hours and email you access.
      </div>
    ) : (
      <button onClick={startTrial} disabled={busy} className={`btn-primary ${className}`}>
        {busy ? 'Requesting…' : COPY.cta}
      </button>
    );

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-slate-800 to-brand-dark p-8 text-white sm:p-12">
        <div className="eyebrow mb-2 text-brand-light">{COPY.eyebrow}</div>
        <h1 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{COPY.headline}</h1>
        <p className="mt-3 max-w-xl leading-relaxed text-white/75">{COPY.subhead}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Cta />
          <div className="text-sm text-white/60">
            <span className="font-semibold text-white">{COPY.pricing.trial}</span> · {COPY.pricing.price}
          </div>
        </div>
      </div>

      {/* Problem */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-display text-xl font-bold tracking-tight">{COPY.problem.h}</h2>
        <p className="mt-2 leading-relaxed text-slate-500">{COPY.problem.p}</p>
      </div>

      {/* How it works */}
      <div className="mb-10">
        <div className="eyebrow mb-3 text-center">How it works</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COPY.steps.map((s, i) => (
            <div key={i} className="card text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-xl">{s.icon}</div>
              <div className="font-display font-bold">{s.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features + pricing */}
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="eyebrow mb-3">What you get</div>
          <ul className="space-y-2.5 text-sm">
            {COPY.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-0.5 text-brand">✓</span>
                <span className="leading-relaxed text-slate-600">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card flex flex-col justify-between border-brand/25 bg-brand/5">
          <div>
            <div className="eyebrow mb-3">Simple pricing</div>
            <div className="font-display num text-4xl font-bold">$25<span className="text-lg text-slate-400">/month</span></div>
            <div className="mt-1 font-semibold text-brand">{COPY.pricing.trial}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{COPY.pricing.note}</p>
          </div>
          <Cta className="mt-6 w-full" />
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-2xl">
        <div className="eyebrow mb-3">Straight answers</div>
        <div className="space-y-3">
          {COPY.faq.map((f) => (
            <div key={f.q} className="card !p-5">
              <div className="font-display text-sm font-bold">{f.q}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
