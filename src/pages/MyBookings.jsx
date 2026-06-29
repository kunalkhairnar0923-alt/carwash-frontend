import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../api/api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsAPI.getAll();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.cancel(bookingId);
        setBookings(prev => prev.filter(b => b.id !== bookingId));
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">Loading bookings...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">You haven't made any bookings yet</p>
            <Link to="/services" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{booking.service_name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {booking.booking_time}</p>
                      <p><strong>Price:</strong> ${booking.price}</p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <div></div>
                    <div className="space-y-2">
                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <>
                          <Link
                            to={`/confirmation/${booking.id}`}
                            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 width-full"
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {booking.notes && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600"><strong>Notes:</strong> {booking.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
