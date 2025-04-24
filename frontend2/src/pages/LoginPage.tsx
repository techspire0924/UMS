import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">Login</h2>
        <input
          className="rounded px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="rounded px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-400 font-medium">{error}</div>}
        <button
          type="submit"
          className="rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-2 transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-sm text-slate-300 mt-2">
          Don&apos;t have an account? <Link className="text-blue-400 hover:underline" to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
