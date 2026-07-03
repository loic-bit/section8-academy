import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import PageHeader from '../components/PageHeader.jsx';
import ContentBlocks from '../components/ContentBlocks.jsx';
import { MODULES, TOTAL_LESSONS } from '../content/course.js';

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
    // Optimistic flip (add or remove), reconcile with the server.
    setCompleted((prev) => {
      const next = new Set(prev);
      isDone ? next.delete(lessonId) : next.add(lessonId);
      return next;
    });
    try {
      if (isDone) {
        await api(`/progress/${encodeURIComponent(lessonId)}`, { method: 'DELETE' });
      } else {
        await api('/progress', { method: 'POST', body: { lessonId } });
      }
    } catch {
      /* keep optimistic state; will reconcile on reload */
    }
  }

  const done = [...completed].length;
  const pct = Math.round((done / TOTAL_LESSONS) * 100);

  return (
    <div>
      <PageHeader
        title="Free Course"
        subtitle="The complete Section 8 investing system. Work through it at your own pace."
      />

      <div className="card mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">Your progress</span>
          <span className="text-slate-500">{done} / {TOTAL_LESSONS} lessons</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {MODULES.map((m) => {
          const isOpen = openModule === m.id;
          const moduleDone = m.lessons.filter((l) => completed.has(l.id)).length;
          return (
            <div key={m.id} className="card overflow-hidden !p-0">
              <button
                onClick={() => setOpenModule(isOpen ? '' : m.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <div className="min-w-0">
                  <div className="font-semibold">{m.title}</div>
                  {m.summary && <div className="mt-0.5 text-xs text-slate-400">{m.summary}</div>}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-slate-400">{moduleDone}/{m.lessons.length}</span>
                  <span className="text-slate-400">{isOpen ? '−' : '+'}</span>
                </div>
              </button>

              {isOpen && (
                <ul className="border-t border-slate-100">
                  {m.lessons.map((l) => {
                    const isDone = completed.has(l.id);
                    const isExpanded = openLesson === l.id;
                    return (
                      <li key={l.id} className="border-b border-slate-50 last:border-0">
                        <div className="flex items-center justify-between gap-3 px-6 py-3 text-sm">
                          <button
                            onClick={() => setOpenLesson(isExpanded ? null : l.id)}
                            className="flex min-w-0 flex-1 items-center gap-2 text-left"
                          >
                            <span className={`text-xs ${isDone ? 'text-brand' : 'text-slate-300'}`}>
                              {isDone ? '✓' : '○'}
                            </span>
                            <span className={`truncate ${isDone ? 'text-slate-400' : 'font-medium'}`}>
                              {l.title}
                            </span>
                            {l.minutes && (
                              <span className="shrink-0 text-xs text-slate-300">{l.minutes} min</span>
                            )}
                          </button>
                          <span className="shrink-0 text-xs text-slate-300">{isExpanded ? 'Hide' : 'Read'}</span>
                        </div>

                        {isExpanded && (
                          <div className="border-t border-slate-50 bg-slate-50/50 px-6 py-5">
                            <ContentBlocks blocks={l.body || []} />
                            <div className="mt-6">
                              <button
                                onClick={() => toggle(l.id)}
                                className={
                                  isDone
                                    ? 'btn-ghost !py-2 text-sm text-brand'
                                    : 'btn-primary !py-2 text-sm'
                                }
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
