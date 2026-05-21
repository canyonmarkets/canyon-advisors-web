import { MapPin } from 'lucide-react';

const MARKETS = [
  {
    city: 'Phoenix, AZ',
    label: 'Headquarters',
    body: 'Our home base since 1993. We have deep roots in the Phoenix metro real estate market across all asset classes — residential, commercial, and corporate housing.',
  },
  {
    city: 'Dallas, TX',
    label: 'Active Market',
    body: 'One of the fastest-growing real estate markets in the country. We source investment properties and advise clients on opportunities across the Dallas-Fort Worth metroplex.',
  },
  {
    city: 'Memphis, TN',
    label: 'Active Market',
    body: 'A strong market for cash-flow investors. Memphis offers some of the best rental yield opportunities in the Southeast, and we have the local network to find them.',
  },
  {
    city: 'Nationwide',
    label: 'Remote Advisory',
    body: 'Through market analytics and our national professional network, we advise clients in any U.S. market. Distance has never limited what we can do for the right client.',
  },
] as const;

export default function Markets() {
  return (
    <section id="markets" className="bg-stone-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
            Where We Work
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900">
            Our Markets
          </h2>
          <p className="mt-5 text-iron-900 text-base leading-relaxed max-w-lg mx-auto">
            Three decades of active investing and advising across the Sun Belt and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MARKETS.map(({ city, label, body }) => (
            <div key={city}
              className="group flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-7 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors duration-300">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-brand-600 font-mono text-xs tracking-[0.15em] uppercase mb-1">
                  {label}
                </p>
                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-iron-900 mb-2">
                  {city}
                </h3>
                <p className="text-sm leading-relaxed text-iron-900">{body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
