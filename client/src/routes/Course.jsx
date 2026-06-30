import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import PageHeader from '../components/PageHeader.jsx';

// Course outline lives here for v1. Swap lesson bodies for real video/content later.
const MODULES = [
  {
    id: 'm1',
    title: 'Module 1 — Section 8 Foundations',
    lessons: [
      { id: 'm1l1', title: 'Why Section 8 beats traditional rentals' },
      { id: 'm1l2', title: 'How the voucher program actually works' },
      { id: 'm1l3', title: 'Fair Market Rents (FMR) explained' },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2 — Finding & Analyzing Deals',
    lessons: [
      { id: 'm2l1', title: 'Building your buy box' },
      { id: 'm2l2', title: 'Running the numbers (use the Calculators tab)' },
      { id: 'm2l3', title: 'Turnkey vs BRRRR for Section 8' },
    ],
  },
  {
    id: 'm3',
    title: 'Module 3 — Funding & Scaling to 50 Doors',
    lessons: [
      { id: 'm3l1', title: 'Financing your first deal' },
      { id: 'm3l2', title: 'Recycling capital with refinances' },
      { id: 'm3l3', title: 'Systems to scale past 10 units' },
    ],
  },
];

export default function Course() {
  const [completed, setCompleted] = useState(new Set());
  const [open, setOpen] = useState('m1');

  useEffect(() => {
    api('/progress')
      .then((d) => setCompleted(new Set(d.completed)))
      .catch(() => {});
  }, []);

  async function toggle(lessonId) {
    if (completed.has(lessonId)) return; // v1: complete-only, no un-complete
    setCompleted((prev) => new Set(prev).add(lessonId));
    try {
      await api('/progress', { method: 'POST', body: { lessonId } });
    } catch {
      /* keep optimistic state; will reconcile on reload */
    }
  }

  const total = MODULES.reduce((n, m) => n + m.lessons.length, 0);
  const done = [...completed].length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <PageHeader
        title="Free Course"
        subtitle="The complete Section 8 investing system. Work through it at your own pace."
      />

      <div className="card mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">Your progress</span>
          <span className="text-slate-500">
            {done} / {total} lessons
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {MODULES.map((m) => {
          const isOpen = open === m.id;
          return (
            <div key={m.id} className="card !p-0 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? '' : m.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
              >
                {m.title}
                <span className="text-slate-400">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <ul className="border-t border-slate-100">
                  {m.lessons.map((l) => {
                    const isDone = completed.has(l.id);
                    return (
                      <li
                        key={l.id}
                        className="flex items-center justify-between border-b border-slate-50 px-6 py-3 text-sm last:border-0"
                      >
                        <span className={isDone ? 'text-slate-400 line-through' : ''}>
                          {l.title}
                        </span>
                        <button
                          onClick={() => toggle(l.id)}
                          className={
                            isDone
                              ? 'text-xs font-semibold text-brand'
                              : 'btn-ghost !px-3 !py-1.5 text-xs'
                          }
                        >
                          {isDone ? '✓ Done' : 'Mark done'}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
