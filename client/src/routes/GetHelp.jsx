import PageHeader from '../components/PageHeader.jsx';
import { trackNow } from '../lib/track.js';

// Real booking funnels (provided by Loic, 2026-07-06). Env vars can override
// per environment without a code change.
const MENTORSHIP_URL =
  import.meta.env.VITE_MENTORSHIP_URL || 'https://go.investingsection8.com/df82de5b';
const DFY_URL = import.meta.env.VITE_DFY_URL || 'https://go.investingsection8.com/5249ca49';

// Two ways to work with us. Edit copy freely — this is in-app content, not a redirect.
const PATHS = [
  {
    icon: '🧭',
    tag: '1-on-1 Mentorship',
    title: 'We coach you to your first (or next) deal',
    desc: 'Work directly with our team to find, analyze, and close Section 8 deals with a proven game plan built around your goals.',
    bullets: [
      'Personalized buy box & target market',
      'Live deal reviews on real properties',
      'Direct access when you get stuck',
    ],
    href: MENTORSHIP_URL,
    cta: 'Book your mentorship call',
  },
  {
    icon: '🤝',
    tag: 'Done-For-You',
    title: 'We build the portfolio for you',
    desc: 'Want it handled end to end? Our team sources, analyzes, and manages turnkey Section 8 deals so you can grow hands-off.',
    bullets: [
      'We find & vet every deal',
      'Turnkey or BRRRR strategies',
      'Hands-off portfolio growth',
    ],
    href: DFY_URL,
    cta: 'Book your done-for-you call',
  },
];

// Real resources only. Add entries as { title, desc, href } and the section
// appears automatically; leave it empty and the section is hidden (no
// "add a link here" placeholders shown to members).
// e.g. { title: 'Section 8 Starter Guide', desc: 'The 10-page primer.', href: 'https://…' }
const RESOURCES = [];

export default function GetHelp() {
  return (
    <div>
      <PageHeader
        title="Ready to start investing?"
        subtitle="You've got the tools. Here's how we help you go from learning to owning doors."
      />

      {/* Hero CTA band */}
      <div className="mb-8 rounded-2xl bg-brand p-8 text-white">
        <h2 className="font-display text-xl font-bold tracking-tight">Get a free game plan call</h2>
        <p className="mt-1 max-w-xl text-sm text-white/80">
          Tell us where you are and where you want to go. We'll map the fastest path to your
          first or next Section 8 deal.
        </p>
        <a
          href={MENTORSHIP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackNow('calendar_click', { which: 'hero', href: MENTORSHIP_URL })}
          className="btn mt-4 bg-white text-brand hover:bg-slate-100"
        >
          Book your call
        </a>
      </div>

      {/* Two paths */}
      <h3 className="mb-4 font-display text-lg font-bold">Two ways to work with us</h3>
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PATHS.map((p) => (
          <div key={p.tag} className="card flex flex-col">
            <div className="mb-3 text-3xl">{p.icon}</div>
            <span className="mb-2 inline-block w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              {p.tag}
            </span>
            <h4 className="font-display text-lg font-bold">{p.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{p.desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="text-brand">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackNow('calendar_click', { which: p.tag, href: p.href })}
              className="btn-primary mt-6 w-full"
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Resources — only render when there are real resources to show. */}
      {RESOURCES.length > 0 && (
        <>
          <h3 className="mb-4 text-lg font-bold">Helpful resources</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {RESOURCES.map((r) => {
              const Card = r.href ? 'a' : 'div';
              const linkProps = r.href
                ? { href: r.href, target: '_blank', rel: 'noreferrer' }
                : {};
              return (
                <Card
                  key={r.title}
                  {...linkProps}
                  className={`card ${r.href ? 'transition hover:shadow-md' : ''}`}
                >
                  <h4 className="font-semibold">{r.title}</h4>
                  {r.desc && <p className="mt-1 text-sm text-slate-500">{r.desc}</p>}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
