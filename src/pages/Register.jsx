import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';

function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    agree: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agree) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const [first_name, ...rest] = formData.full_name.trim().split(' ');
      const last_name = rest.join(' ') || '';

      await authAPI.register({
        email: formData.email,
        password: formData.password,
        first_name,
        last_name,
        phone: formData.phone,
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-400/20 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative bg-slate-950 px-8 py-12 text-white sm:px-12 lg:px-16">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-sky-500/10" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center rounded-full bg-sky-500/20 px-4 py-2 text-sm uppercase tracking-[0.25em] text-sky-200">
              Create Account
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Join and book your car wash in easy steps.</h1>
            <p className="max-w-md text-slate-300">
              Sign up now to schedule your appointment, manage your bookings, and keep your vehicle spotless with premium care.
            </p>
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-xl shadow-slate-950/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold">Quick Registration</p>
                  <p className="text-sm text-slate-300">Sign up easily and start booking your car wash service.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧼</span>
                <div>
                  <p className="font-semibold">Premium Service</p>
                  <p className="text-sm text-slate-300">Enjoy tailored packages and quality cleaning every time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-8 py-10 sm:px-12 lg:px-14">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Register</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Create your account</h2>
            </div>

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400"
                />
                I agree to the Terms & Conditions
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="font-semibold text-slate-900">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
