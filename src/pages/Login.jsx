import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;
      login(user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-6xl gap-8 overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-400/20 lg:grid-cols-[1fr_1.05fr]">
        <div className="relative bg-gradient-to-br from-sky-500 to-slate-950 px-10 py-12 text-white sm:px-14 lg:px-16">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-white/10" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
              Welcome Back
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Welcome Back!</h1>
            <p className="max-w-md text-slate-200">
              Login to continue and manage your bookings. Fast, secure, and ready for your next car wash.
            </p>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <span className="text-2xl">🚗</span>
                <div>
                  <p className="font-medium">Easy Scheduling</p>
                  <p className="text-slate-300">Book your service within seconds.</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-200">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-medium">Premium Care</p>
                  <p className="text-slate-300">Enjoy premium wash and detailing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-10 sm:px-12 lg:px-14">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Login</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Sign in to your account</h2>
          </div>

          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 mt-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-700">
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Demo credentials</p>
            <p className="mt-3">Admin: admin@carwash.com / admin123</p>
            <p>Customer: customer@carwash.com / customer123</p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="font-semibold text-slate-950">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
