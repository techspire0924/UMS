import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../features/auth/authSlice';

const nav = [
  { name: 'Dashboard', path: '/' },
  { name: 'User Management', path: '/users', admin: true },
];

const Layout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-800 text-slate-100 flex flex-col py-6 px-3 gap-6 shadow-lg">
        <div className="font-bold text-2xl tracking-wide mb-8 text-blue-400">UMS</div>
        <nav className="flex flex-col gap-2">
          {nav.map((item) => {
            if (item.admin && user?.role !== 'admin') return null;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`rounded px-4 py-2 font-medium transition-colors ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-grow" />
        {user && (
          <button
            className="rounded px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )}
      </aside>
      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="bg-slate-800 text-slate-100 px-8 py-4 shadow flex items-center justify-between">
          <span className="font-bold text-xl">User Management System</span>
          {user && <span className="text-sm text-blue-300">{user.username} ({user.role})</span>}
        </header>
        <section className="flex-1 p-8 bg-slate-900">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
