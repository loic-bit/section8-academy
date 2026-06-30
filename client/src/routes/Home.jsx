import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import PageHeader from '../components/PageHeader.jsx';

const TILES = [
  {
    to: '/course',
    icon: '🎓',
    title: 'Free Course',
    desc: 'Learn Section 8 investing step by step, from first deal to scaling.',
  },
  {
    to: '/calculators',
    icon: '🧮',
    title: 'Calculators',
    desc: 'Run cash flow, cash-on-cash, and cap rate on any deal in seconds.',
  },
  {
    to: '/analyzer',
    icon: '🏚️',
    title: 'Property Analyzer',
    desc: 'Score a property against Section 8 rents and your buy box.',
  },
  {
    to: '/finder',
    icon: '🔎',
    title: 'Deal Finder',
    desc: 'Surface markets and properties that fit the Section 8 model.',
  },
];

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] || 'investor'} 👋`}
        subtitle="Everything you need to find, analyze, and fund Section 8 deals."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TILES.map((t) => (
          <Link key={t.to} to={t.to} className="card transition hover:shadow-md">
            <div className="mb-3 text-2xl">{t.icon}</div>
            <h3 className="font-bold">{t.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-brand p-6 text-white">
        <h3 className="text-lg font-bold">Ready to invest with help?</h3>
        <p className="mt-1 text-sm text-white/80">
          Get 1-on-1 mentorship or let our team do it for you.
        </p>
        <Link to="/get-help" className="btn mt-4 bg-white text-brand hover:bg-slate-100">
          See your options
        </Link>
      </div>
    </div>
  );
}
