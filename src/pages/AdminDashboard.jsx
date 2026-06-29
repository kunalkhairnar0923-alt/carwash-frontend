import React, { useState, useEffect } from 'react';
import { adminAPI } from '../api/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [popularityData, setPopularityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes, revenueRes, popularityRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getAllBookings(),
          adminAPI.getRevenueReport(),
          adminAPI.getPopularityReport(),
        ]);

        setStats(statsRes.data);
        setBookings(bookingsRes.data);
        setRevenueData(revenueRes.data);
        setPopularityData(popularityRes.data);
      } catch (err) {
        setError('Failed to load admin data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-semibold ${activeTab === 'dashboard' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-semibold ${activeTab === 'bookings' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 font-semibold ${activeTab === 'reports' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            Reports
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </div>
                <span className="text-4xl">📅</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</p>
                </div>
                <span className="text-4xl">✅</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <span className="text-4xl">👥</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Services</p>
                  <p className="text-3xl font-bold">{stats.totalServices}</p>
                </div>
                <span className="text-4xl">🛁</span>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{booking.first_name} {booking.last_name}</td>
                    <td className="px-6 py-4">{booking.service_name}</td>
                    <td className="px-6 py-4">{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{booking.booking_time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Revenue Report */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Revenue Report (Last 30 Days)</h2>
              <div className="space-y-3">
                {revenueData.slice(0, 10).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{new Date(item.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{item.total_bookings} bookings</p>
                    </div>
                    <p className="text-lg font-bold text-green-600">${parseFloat(item.total_revenue).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Popularity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Service Popularity</h2>
              <div className="space-y-4">
                {popularityData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm font-semibold">{item.total_bookings || 0} bookings</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(item.total_bookings || 0) / Math.max(...popularityData.map(d => d.total_bookings || 0), 1) * 100}%`
                        }}
                      ></div>
                    </div>
                    {item.revenue && (
                      <p className="text-sm text-gray-600 mt-1">Revenue: ${parseFloat(item.revenue).toFixed(2)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
