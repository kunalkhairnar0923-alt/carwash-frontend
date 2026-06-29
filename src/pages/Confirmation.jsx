import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { bookingsAPI } from '../api/api';

function Confirmation() {
  const { bookingId } = useParams();
  const location = useLocation();
  const confirmationCode = location.state?.confirmationCode;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingsAPI.getById(bookingId);
        setBooking(response.data);
      } catch (err) {
        setError('Failed to load booking');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-red-600">{error}</div>;
  }

  return (
    <div className="bg-slate-100 py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-300/50">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] bg-sky-500/10 p-8 text-center">
                <div className="mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-sky-500 text-4xl text-white shadow-lg shadow-sky-500/20">
                  ✅
                </div>
                <h1 className="text-3xl font-semibold text-slate-950">Booking Confirmed!</h1>
                <p className="mt-4 text-slate-600">Your car wash appointment has been successfully booked.</p>
              </div>

              {confirmationCode && (
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Confirmation Code</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 break-all">{confirmationCode}</p>
                  <p className="mt-2 text-sm text-slate-500">Please keep this code for your booking records.</p>
                </div>
              )}

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-950 mb-6">Booking Summary</h2>
                <div className="space-y-4 text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Service</span>
                    <span>{booking.service_name}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Date</span>
                    <span>{new Date(booking.booking_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Time</span>
                    <span>{booking.booking_time}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Price</span>
                    <span className="font-semibold text-slate-950">₹{booking.price}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Status</span>
                    <span className="rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">{booking.status}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-slate-50 p-6 text-slate-700">
                <h3 className="text-lg font-semibold text-slate-950 mb-3">Important Information</h3>
                <ul className="space-y-3 text-sm leading-6">
                  <li>• Arrive at the service center 10 minutes early.</li>
                  <li>• Keep your confirmation code handy.</li>
                  <li>• Reschedule or cancel at least 24 hours before your appointment.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl shadow-slate-900/30">
              <h2 className="text-2xl font-semibold mb-6">Next Steps</h2>
              <div className="space-y-5 text-sm leading-7 text-slate-200">
                <p>Thank you for booking with CleanRide. We’ll make sure your car looks fresh and clean when you arrive.</p>
                <div className="rounded-3xl bg-slate-900/70 p-5">
                  <p className="font-semibold text-sky-300">Visit Location</p>
                  <p className="mt-2 text-slate-300">123 Clean Street, Mumbai, MH</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-5">
                  <p className="font-semibold text-sky-300">Need help?</p>
                  <p className="mt-2 text-slate-300">Contact support for any changes to your booking.</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <Link to="/my-bookings" className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-400">
                  View My Bookings
                </Link>
                <Link to="/" className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-transparent px-5 py-3 font-semibold text-white hover:bg-white/10">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
