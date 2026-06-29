import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500 rounded-full w-11 h-11 flex items-center justify-center shadow-lg">
              <span className="text-xl">🚗</span>
            </div>
            <div>
              <Link to="/" className="text-xl font-bold tracking-tight">CleanRide</Link>
              <p className="text-xs text-slate-300">Car Wash</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-sky-300">Home</Link>
            <Link to="/services" className="hover:text-sky-300">Services</Link>
            <Link to="/my-bookings" className="hover:text-sky-300">Schedule</Link>
            {user?.role === 'admin' && <Link to="/admin" className="hover:text-sky-300">Reports</Link>}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-slate-300">Welcome, {user.first_name}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm hover:text-sky-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
