import React from 'react';
import { useAppSelector } from '../hooks';

const DashboardPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Dashboard</h1>
      <div className="bg-slate-800 rounded-xl shadow p-8 flex flex-col gap-4">
        <div className="text-xl font-semibold text-slate-100">Welcome, {user?.username || 'User'}!</div>
        <div className="text-slate-300">
          This is your dashboard. Here you can view your profile, see system status, and more.
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex-1 bg-slate-700 rounded-lg p-4 text-center">
            <div className="text-2xl text-blue-400 font-bold">{user?.role === 'admin' ? 'Admin' : 'User'}</div>
            <div className="text-slate-400">Role</div>
          </div>
          {/* Add more dashboard cards here as needed */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
