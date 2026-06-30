export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-extrabold">{title}</h1>
      {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function ComingSoon({ note }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mb-2 text-3xl">🚧</div>
      <p className="font-semibold">Coming soon</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{note}</p>
    </div>
  );
}
