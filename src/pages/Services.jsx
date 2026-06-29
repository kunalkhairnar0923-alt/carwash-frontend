import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data);
      } catch (err) {
        setError('Failed to load services');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">Loading services...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-red-600">{error}</div>;
  }

  return (
    <div className="bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sky-500 font-semibold uppercase tracking-[0.3em]">Our Services</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Full car wash packages for every need</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Choose from our trusted service plans, designed to keep your vehicle shining inside and out.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition hover:-translate-y-1">
              <div className="p-8">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-500">{service.name}</p>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-950">₹{service.price}</h2>
                  </div>
                  <div className="rounded-3xl bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-600">{service.duration} min</div>
                </div>

                <p className="text-slate-600 mb-6">{service.description}</p>

                <ul className="space-y-3 text-slate-600">
                  <li>✔ Professional wash</li>
                  <li>✔ Premium cleaning products</li>
                  <li>✔ Fast and safe service</li>
                </ul>
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-6 text-center">
                {user ? (
                  <Link
                    to={`/booking/${service.id}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Book Now
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Login to Book
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
