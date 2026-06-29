import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.25),_transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-200">
                CleanRide Car Wash
              </span>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
                Keep Your Car <span className="text-sky-300">Clean</span> & <span className="text-sky-300">Shining</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-200">
                Professional car wash services at your convenience. Book your slot anytime and keep your vehicle looking brand new.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-full bg-sky-400 px-8 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/20 hover:bg-sky-300"
                >
                  Book Now
                </Link>
                <Link
                  to={user ? '/my-bookings' : '/register'}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-semibold text-white hover:border-white hover:bg-white/20"
                >
                  {user ? 'My Bookings' : 'Create Account'}
                </Link>
              </div>
            </div>

            <div className="relative rounded-[2rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-slate-900/40">
              <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="absolute -right-10 bottom-12 h-32 w-32 rounded-full bg-slate-400/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 p-8">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.16),transparent_35%)]" />
                <div className="relative z-10 grid gap-6">
                  <div className="rounded-3xl bg-slate-900/90 p-6 shadow-xl shadow-slate-950/30">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Scheduled for Today</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white">Slide into a sparkling ride</h2>
                    <p className="mt-3 text-slate-300">Choose a service, pick a time and get your car washed with premium care.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { title: 'Exterior Wash', price: '₹299' },
                      { title: 'Interior Cleaning', price: '₹499' },
                      { title: 'Full Service', price: '₹799' },
                      { title: 'Premium Wash', price: '₹1,199' },
                    ].map((item) => (
                      <div key={item.title} className="rounded-3xl bg-slate-950/80 border border-white/10 p-4 shadow-lg shadow-slate-950/20">
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">{item.title}</p>
                        <p className="mt-4 text-xl font-semibold text-white">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: '⏱️', title: 'Easy Booking', description: 'Reserve your slot in seconds and manage appointments online.' },
              { icon: '💎', title: 'Premium Quality', description: 'Top-grade cleaning products and expert technicians.' },
              { icon: '🚘', title: 'Customer Care', description: 'Friendly service and fast turnaround for every car.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/40">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sky-500 font-semibold uppercase tracking-[0.3em]">Our Services</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Service packages for every need</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { title: 'Exterior Wash', price: '₹299', details: ['High pressure wash', 'Wheel cleaning', 'Tire dressing'] },
              { title: 'Interior Cleaning', price: '₹499', details: ['Vacuum cleaning', 'Dashboard polish', 'Window cleaning'] },
              { title: 'Full Service', price: '₹799', details: ['Exterior wash', 'Interior clean', 'Wax finish'] },
              { title: 'Premium Wash', price: '₹1,199', details: ['Full exterior detail', 'Interior deep clean', 'Perfume spray'] },
            ].map((service) => (
              <div key={service.title} className="rounded-3xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
                  <span className="text-lg font-semibold text-sky-600">{service.price}</span>
                </div>
                <p className="mt-4 text-slate-600">Starting at</p>
                <ul className="mt-5 space-y-3 text-slate-600">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
