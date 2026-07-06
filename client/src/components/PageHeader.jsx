export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl leading-relaxed text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function ComingSoon({ note }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="mb-3 text-3xl">🚧</div>
      <p className="font-display font-bold">Coming soon</p>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">{note}</p>
    </div>
  );
}
