import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';

const NAV = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/course', label: 'Free Course', icon: '🎓' },
  { to: '/calculators', label: 'Calculators', icon: '🧮' },
  { to: '/analyzer', label: 'Property Analyzer', icon: '🏚️' },
  { to: '/finder', label: 'Deal Finder', icon: '🔎' },
  { to: '/get-help', label: 'Get Help', icon: '🤝' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="flex min-h-full">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="px-6 py-5">
          <div className="text-lg font-extrabold leading-tight">
            Cashflow <span className="text-brand">2.0</span>
          </div>
          <div className="text-xs font-medium text-slate-400">Academy</div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-2 truncate text-sm font-medium">{user?.name}</div>
          <div className="mb-3 truncate text-xs text-slate-400">{user?.email}</div>
          <button onClick={handleLogout} className="btn-ghost w-full">
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
