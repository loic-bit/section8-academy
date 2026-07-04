import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import PageHeader from '../components/PageHeader.jsx';
import ContentBlocks from '../components/ContentBlocks.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import { MODULES, TOTAL_LESSONS } from '../content/course.js';

const moduleMinutes = (m) => m.lessons.reduce((n, l) => n + (l.minutes || 0), 0);

export default function Course() {
  const [completed, setCompleted] = useState(new Set());
  const [openModule, setOpenModule] = useState('m1');
  const [openLesson, setOpenLesson] = useState(null);

  useEffect(() => {
    api('/progress')
      .then((d) => setCompleted(new Set(d.completed)))
      .catch(() => {});
  }, []);

  async function toggle(lessonId) {
    const isDone = completed.has(lessonId);
    setCompleted((prev) => {
      const next = new Set(prev);
      isDone ? next.delete(lessonId) : next.add(lessonId);
      return next;
    });
    try {
      if (isDone) await api(`/progress/${encodeURIComponent(lessonId)}`, { method: 'DELETE' });
      else await api('/progress', { method: 'POST', body: { lessonId } });
    } catch {
      /* optimistic; reconciles on reload */
    }
  }

  const done = [...completed].length;
  const pct = Math.round((done / TOTAL_LESSONS) * 100);
  const totalMinutes = MODULES.reduce((n, m) => n + moduleMinutes(m), 0);

  return (
    <div>
      <PageHeader
        title="The Section 8 Cashflow System"
        subtitle="The complete path from your first deal to a portfolio that runs without you."
      />

      {/* Progress hero */}
      <div className="card mb-8 flex flex-col items-start gap-6 bg-gradient-to-br from-white to-slate-50 sm:flex-row sm:items-center">
        <ProgressRing value={pct} size={84} stroke={9} />
        <div className="flex-1">
          <div className="eyebrow mb-1">Your progress</div>
          <div className="text-lg font-bold">
            {done} of {TOTAL_LESSONS} lessons complete
          </div>
          <div className="mt-1 text-sm text-slate-500">
            {MODULES.length} modules · about {Math.round(totalMinutes / 60)} hours of material
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {MODULES.map((m, idx) => {
          const isOpen = openModule === m.id;
          const moduleDone = m.lessons.filter((l) => completed.has(l.id)).length;
          const mPct = Math.round((moduleDone / m.lessons.length) * 100);
          return (
            <div key={m.id} className="card !p-0 overflow-hidden">
              <button
                onClick={() => setOpenModule(isOpen ? '' : m.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
              >
                <ProgressRing value={mPct} size={46} stroke={5} className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold">{m.title}</div>
                  {m.tagline && <div className="mt-0.5 line-clamp-2 text-xs text-slate-400">{m.tagline}</div>}
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <div className="text-xs font-semibold text-slate-500">{moduleDone}/{m.lessons.length} done</div>
                  <div className="text-xs text-slate-300">{moduleMinutes(m)} min</div>
                </div>
                <span className="shrink-0 text-lg text-slate-300">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <ul className="border-t border-slate-100">
                  {m.lessons.map((l) => {
                    const isDone = completed.has(l.id);
                    const isExpanded = openLesson === l.id;
                    return (
                      <li key={l.id} className="border-b border-slate-50 last:border-0">
                        <div className="flex items-center justify-between gap-3 px-5 py-3 text-sm sm:px-6">
                          <button
                            onClick={() => setOpenLesson(isExpanded ? null : l.id)}
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                                isDone ? 'bg-brand text-white' : 'border border-slate-300 text-transparent'
                              }`}
                            >
                              ✓
                            </span>
                            <span className={`truncate ${isDone ? 'text-slate-400' : 'font-medium'}`}>{l.title}</span>
                            {l.minutes && <span className="shrink-0 text-xs text-slate-300">{l.minutes} min</span>}
                          </button>
                          <span className="shrink-0 text-xs font-semibold text-brand">{isExpanded ? 'Hide' : 'Read'}</span>
                        </div>

                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-6 sm:px-6">
                            <ContentBlocks blocks={l.body || []} />
                            <div className="mt-6">
                              <button
                                onClick={() => toggle(l.id)}
                                className={isDone ? 'btn-ghost !py-2 text-sm text-brand' : 'btn-primary !py-2 text-sm'}
                              >
                                {isDone ? '✓ Completed (click to undo)' : 'Mark lesson complete'}
                              </button>
                            </div>
                          </div>
                        )}
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
