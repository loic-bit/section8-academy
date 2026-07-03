// Single source of truth for the "Cashflow 2.0 Academy" wordmark.
// Used in the sidebar, the mobile top bar, and the auth screens.
export default function BrandMark({ compact = false }) {
  return (
    <div className="leading-tight">
      <div className={compact ? 'text-base font-extrabold' : 'text-lg font-extrabold'}>
        Cashflow <span className="text-brand">2.0</span>
      </div>
      {!compact && <div className="text-xs font-medium text-slate-400">Academy</div>}
    </div>
  );
}
