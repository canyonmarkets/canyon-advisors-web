import { TrendingUp, Home, Building2 } from 'lucide-react';

const SERVICES = [
  {
    icon: TrendingUp,
    title: 'Investment Consulting',
    tagline: 'Strategic guidance for investors at every level.',
    body: 'For over 20 years we have helped realtors, investors, and lenders connect and build across the country. Whether you are buying your first investment property or liquidating a commercial portfolio, we bring the network and the experience to move efficiently.',
    bullets: [
      'Off-market residential & commercial sourcing',
      'Private & non-qualifying funding contacts',
      'Strategic investment planning',
      'Difficult property placement with qualified buyers',
      '1031 Exchange consultations & referrals',
      'Listing, buying & brokerage services',
      'Investor training & mentorship',
      'Nationwide professional networking',
    ],
  },
  {
    icon: Home,
    title: 'Lease-Option Program',
    tagline: 'A path to homeownership for families who need one.',
    body: 'Not everyone can walk into a bank and qualify for a mortgage today — but that does not mean homeownership is out of reach. Our lease-option program bridges the gap, giving families the time and structure to build the financial foundation they need while living in the home they want.',
    bullets: [
      'Structured lease-to-own agreements',
      'Credit and financial recovery guidance',
      'Long-term financing pathway planning',
      'Seller and buyer representation',
      'Available in Phoenix, Dallas & Memphis',
    ],
  },
  {
    icon: Building2,
    title: 'Corporate Housing',
    tagline: 'Turning vacant units into reliable income streams.',
    body: 'We partner with property owners across the Phoenix metro to manage units as furnished corporate and short-term rentals. Owners get reduced vacancy, consistent income, and none of the day-to-day management headaches. It is a straightforward arrangement that works.',
    bullets: [
      'Master lease partnerships with property owners',
      'Reduced vacancy and consistent monthly income',
      'Full furnishing and management handled by us',
      'Preferred for traveling professionals and relocations',
      'Flexible partnership structures',
    ],
  },
] as const;

export default function Services() {
  return (
    <section id="services" className="bg-iron-800 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-brand-500 font-mono text-base tracking-[0.3em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-white">
            Our Services
          </h2>
          <p className="mt-5 text-white text-base leading-relaxed max-w-xl mx-auto">
            Three decades of experience across three distinct real estate disciplines —
            all under one family roof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, tagline, body, bullets }) => (
            <div key={title}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand-500/40 hover:bg-white/8 transition-all duration-300">

              {/* Card header */}
              <div className="p-8 pb-6 border-b border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/20 text-brand-500 mb-5 group-hover:bg-brand-600/30 transition-colors duration-300">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-2">
                  {title}
                </h3>
                <p className="text-brand-500 text-sm font-semibold">{tagline}</p>
              </div>

              {/* Card body */}
              <div className="p-8 flex flex-col gap-5 flex-1">
                <p className="text-white text-sm leading-relaxed">{body}</p>
                <ul className="flex flex-col gap-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
