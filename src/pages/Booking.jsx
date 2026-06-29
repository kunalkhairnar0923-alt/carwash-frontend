import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingsAPI, servicesAPI } from '../api/api';

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await servicesAPI.getById(serviceId);
        setService(response.data);
      } catch (err) {
        setError('Failed to load service');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await bookingsAPI.create({
        service_id: parseInt(serviceId),
        ...formData,
      });
      navigate(`/confirmation/${response.data.booking.id}`, {
        state: { confirmationCode: response.data.confirmationCode }
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">Loading...</div>;
  }

  if (!service) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-red-600">Service not found</div>;
  }

  return (
    <div className="bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sky-500 font-semibold uppercase tracking-[0.3em]">Schedule</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Schedule Your Car Wash</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Complete the details below to book a premium service slot and get your car sparkling.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-300/60">
            <h2 className="text-2xl font-semibold text-slate-950 mb-6">Booking Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600">Select Date</label>
                  <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Select Time</label>
                  <input
                    type="time"
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    required
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter any special instructions"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Confirming...' : 'Continue'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-sky-500/10 p-8 shadow-xl shadow-slate-300/30">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">Your selected service</h2>
              <div className="rounded-[1.5rem] bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Service</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">{service.name}</h3>
                <div className="mt-4 flex items-center justify-between gap-4 rounded-3xl bg-slate-100 p-4">
                  <div>
                    <p className="text-sm text-slate-500">Duration</p>
                    <p className="text-lg font-semibold text-slate-900">{service.duration} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-lg font-semibold text-sky-600">₹{service.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-300/40">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">How It Works</h2>
              <div className="space-y-4 text-slate-600">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold">1. Choose Service</p>
                  <p className="text-sm">Confirm the service and select your preferred schedule.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold">2. Confirm Booking</p>
                  <p className="text-sm">Submit the form and receive instant confirmation.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold">3. Visit Center</p>
                  <p className="text-sm">Arrive at your scheduled time and enjoy a freshly cleaned car.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
