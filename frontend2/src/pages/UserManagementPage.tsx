import React from 'react';
import { useAppSelector } from '../hooks';

// Dummy data for demonstration; replace with API call in real app
const users = [
  { id: '1', username: 'admin', role: 'admin' },
  { id: '2', username: 'user1', role: 'user' },
  { id: '3', username: 'user2', role: 'user' },
];

const UserManagementPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  if (!user || user.role !== 'admin') {
    return <div className="text-red-400 font-bold text-center mt-12">Access denied. Admins only.</div>;
  }
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">User Management</h1>
      <div className="bg-slate-800 rounded-xl shadow p-8">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-slate-300">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="bg-slate-700 rounded">
                <td className="px-4 py-2 rounded-l">{u.username}</td>
                <td className="px-4 py-2 rounded-r capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
