import { Hammer, Home } from 'lucide-react';
import type { CSSProperties } from 'react';

const SERVICES = [
  {
    icon: Hammer,
    title: 'Fix & Flip',
    tagline: 'Turning distressed properties into move-in ready homes.',
    body: 'We acquire undervalued and distressed properties across the Phoenix metro, renovate them ourselves, and bring them back to market — done right, not rushed. Every project is self-funded and owner-managed from purchase to sale.',
    bullets: [
      'Off-market and distressed property acquisition',
      'Full renovation management, start to finish',
      'Properties sold or converted to lease-option',
      'Selective, quality-first approach',
    ],
  },
  {
    icon: Home,
    title: 'Lease-Option / Rent-to-Own',
    tagline: 'A path to homeownership for families who need one.',
    body: 'Not everyone can walk into a bank and qualify for a mortgage today — but that does not mean homeownership is out of reach. Our lease-option program bridges the gap, giving families the time and structure to build the financial foundation they need while living in the home they want.',
    bullets: [
      'Structured lease-to-own agreements',
      'Credit and financial recovery guidance',
      'Long-term financing pathway planning',
      'Seller and buyer representation',
      'Available across the Phoenix metro',
    ],
  },
] as const;

export default function Services() {
  return (
    <section id="services" className="bg-iron-800 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div data-reveal className="text-center mb-16">
          <p className="text-brand-500 font-mono text-base tracking-[0.3em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-white">
            Our Services
          </h2>
          <p className="mt-5 text-white text-base leading-relaxed max-w-xl mx-auto">
            Thirty years in Phoenix real estate — fix-and-flip and lease-option,
            still hands-on and owner-run.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SERVICES.map(({ icon: Icon, title, tagline, body, bullets }, i) => (
            <div key={title}
              data-reveal
              data-spotlight
              style={{ '--rd': `${i * 0.12}s` } as CSSProperties}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-brand-500/40 hover:bg-white/8 transition-all duration-300">

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
