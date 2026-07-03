// Shared number/date formatting so every view renders money, percents, and
// dates the same way. Import from here instead of re-implementing per route.

export const money = (n) =>
  Number.isFinite(n)
    ? n.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    : '$0';

export const pct = (n) => (Number.isFinite(n) ? `${n.toFixed(1)}%` : '0.0%');

// "2 days ago" / "just now" — relative time for saved-deal timestamps etc.
export function relTime(input) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return '';
  const secs = Math.round((Date.now() - d.getTime()) / 1000);
  const table = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  if (secs < 45) return 'just now';
  for (const [unit, span] of table) {
    const v = Math.floor(secs / span);
    if (v >= 1) return `${v} ${unit}${v > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}
