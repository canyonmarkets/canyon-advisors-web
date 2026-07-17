import type { CSSProperties } from 'react';

const STATS = [
  { value: '30+',  label: 'Years in Business'            },
  { value: '4',    label: 'Family Companies'             },
  { value: '2',    label: 'Generations'                  },
  { value: '7',    label: 'Family Members — One Team'    },
] as const;

export default function TheFirm() {
  return (
    <section id="about" className="bg-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div data-reveal>
            <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
              Since 1993
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900 mb-8">
              Two Generations, One Standard
            </h2>
            <div className="flex flex-col gap-5 text-iron-900 text-base leading-relaxed">
              <p>
                Canyon Advisors was founded in Phoenix in 1993. It is woman-owned and
                family-run — and it has been from the beginning. Thirty years of building
                businesses, one at a time, under one name.
              </p>
              <p>
                Canyon Advisors started as a real estate and business consulting firm. That
                work grew into four family businesses instead of one. Today Canyon Advisors
                focuses on fix-and-flip and lease-option real estate in the Phoenix market —
                while Canyon Markets, Canyon Apts, and Canyon Cleaners run workplace
                micro-markets, furnished and corporate housing, and professional cleaning.
                Four wings, one family.
              </p>
              <p>
                Now the second generation is in the business — raised in it, not recruited to
                it. Three daughters followed their mother&apos;s footsteps, and the two sons who
                married into the family work in the companies alongside her. Seven family
                members, two generations, the same name on the door since 1993.
              </p>
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map(({ value, label }, i) => (
              <div key={label}
                data-reveal
                style={{ '--rd': `${i * 0.09}s` } as CSSProperties}
                className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-8 hover:border-brand-300 hover:bg-white hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300">
                <span data-count className="font-display font-bold text-5xl text-brand-600 leading-none">
                  {value}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-iron-600 leading-snug">
                  {label}
                </span>
              </div>
            ))}

            {/* Markets served */}
            <div data-reveal style={{ '--rd': '0.36s' } as CSSProperties} className="col-span-2 rounded-2xl bg-iron-900 p-8">
              <p className="text-brand-500 font-mono text-xs tracking-[0.2em] uppercase mb-3">
                Markets Served
              </p>
              <div className="flex flex-wrap gap-3">
                {['Phoenix Metro, AZ', 'Birmingham, AL', 'Northern Indiana'].map((city) => (
                  <span key={city}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold text-white">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
