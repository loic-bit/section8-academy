import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import PageHeader from '../components/PageHeader.jsx';
import ContentBlocks from '../components/ContentBlocks.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import { MODULES, TOTAL_LESSONS } from '../content/course.js';
import { LESSON_META } from '../content/lessonMeta.js';

const moduleMinutes = (m) => m.lessons.reduce((n, l) => n + (l.minutes || 0), 0);

// Turn a YouTube / Vimeo / embed URL into an embeddable src.
function toEmbed(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

function VideoFrame({ video, title }) {
  const src = toEmbed(video);
  if (!src) {
    // Placeholder until the module is recorded. Keeps the section layout intact.
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 text-center text-white/90">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="mt-3 text-sm font-semibold">Video lesson coming soon</div>
        <div className="mt-0.5 text-xs text-white/60">We are recording this module now.</div>
      </div>
    );
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-black">
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function ResourceList({ resources }) {
  if (!resources || resources.length === 0) return null;
  return (
    <div className="mt-6">
      <div className="eyebrow mb-2">Resources</div>
      <div className="flex flex-col gap-2">
        {resources.map((r) => (
          <Link
            key={r.to + r.label}
            to={r.to}
            className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm transition duration-160 ease-premium hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-slate-400 group-hover:text-brand">↗</span>
              <span className="font-medium text-ink">{r.label}</span>
            </span>
            {r.kind && <span className="badge-muted">{r.kind}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

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
      <div className="card mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <ProgressRing value={pct} size={84} stroke={9} />
        <div className="flex-1">
          <div className="eyebrow mb-1">Your progress</div>
          <div className="font-display text-lg font-bold">
            {done} of {TOTAL_LESSONS} lessons complete
          </div>
          <div className="mt-1 text-sm text-slate-500">
            {MODULES.length} modules · about {Math.round(totalMinutes / 60)} hours of material
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {MODULES.map((m) => {
          const isOpen = openModule === m.id;
          const moduleDone = m.lessons.filter((l) => completed.has(l.id)).length;
          const mPct = Math.round((moduleDone / m.lessons.length) * 100);
          return (
            <div key={m.id} className="card !p-0 overflow-hidden">
              <button
                onClick={() => setOpenModule(isOpen ? '' : m.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition duration-160 ease-premium hover:bg-slate-50/70 sm:px-6"
              >
                <ProgressRing value={mPct} size={46} stroke={5} className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-display font-bold">{m.title}</div>
                  {m.tagline && <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-400">{m.tagline}</div>}
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <div className="num text-xs font-semibold text-slate-500">{moduleDone}/{m.lessons.length} done</div>
                  <div className="num text-xs text-slate-300">{moduleMinutes(m)} min</div>
                </div>
                <span className="shrink-0 text-lg text-slate-300">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <ul className="border-t border-slate-100">
                  {m.lessons.map((l) => {
                    const isDone = completed.has(l.id);
                    const isExpanded = openLesson === l.id;
                    const meta = LESSON_META[l.id] || {};
                    return (
                      <li key={l.id} className="border-b border-slate-50 last:border-0">
                        <div className="flex items-center justify-between gap-3 px-5 py-3 text-sm transition duration-160 ease-premium hover:bg-slate-50/60 sm:px-6">
                          <button
                            onClick={() => setOpenLesson(isExpanded ? null : l.id)}
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs transition duration-160 ${
                                isDone ? 'bg-brand text-white' : 'border border-slate-300 text-transparent'
                              }`}
                            >
                              ✓
                            </span>
                            <span className={`truncate ${isDone ? 'text-slate-400' : 'font-medium'}`}>{l.title}</span>
                            {l.minutes && <span className="num shrink-0 text-xs text-slate-300">{l.minutes} min</span>}
                          </button>
                          <span className="shrink-0 text-xs font-semibold text-brand">{isExpanded ? 'Hide' : 'Watch'}</span>
                        </div>

                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-6 sm:px-6">
                            <VideoFrame video={meta.video} title={l.title} />
                            {meta.description && (
                              <p className="mt-5 leading-relaxed text-slate-600">{meta.description}</p>
                            )}
                            <div className="mt-5">
                              <ContentBlocks blocks={l.body || []} />
                            </div>
                            <ResourceList resources={meta.resources} />
                            <div className="mt-6 border-t border-slate-200/70 pt-5">
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
