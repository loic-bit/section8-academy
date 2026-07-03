import { Link } from 'react-router-dom';

// Renders the block array used by course lessons and vault assets.
// Block shapes: { h } | { p } | { list:[] } | { steps:[] } | { tip } | { link:{to,label} }
export default function ContentBlocks({ blocks }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.h) return <h4 key={i} className="pt-1 text-base font-bold text-ink">{b.h}</h4>;
        if (b.p) return <p key={i} className="text-sm leading-relaxed text-slate-600">{b.p}</p>;
        if (b.list)
          return (
            <ul key={i} className="space-y-2 text-sm text-slate-600">
              {b.list.map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-0.5 text-brand">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          );
        if (b.steps)
          return (
            <ol key={i} className="space-y-2 text-sm text-slate-600">
              {b.steps.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    {j + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          );
        if (b.tip)
          return (
            <div key={i} className="rounded-lg border-l-4 border-brand bg-brand/5 px-4 py-3 text-sm font-medium text-slate-700">
              {b.tip}
            </div>
          );
        if (b.link)
          return (
            <Link key={i} to={b.link.to} className="btn-ghost inline-flex w-fit !py-2 text-sm">
              {b.link.label} →
            </Link>
          );
        return null;
      })}
    </div>
  );
}
