import type { CSSProperties } from 'react';

const ERAS = [
  {
    era: 'Where We’ve Been',
    title: 'Proven Ground',
    blurb:
      'The markets that built our track record — properties bought, renovated, rented, and sold across two decades.',
    cities: ['Dallas, TX', 'Memphis, TN', 'Cordova, TN', 'Germantown, TN'],
    state: 'past',
  },
  {
    era: 'Where We Do Business',
    title: 'Canyon Country',
    blurb:
      'The Phoenix metro is home — and the map keeps growing. From Arizona to Alabama to northern Indiana, this is Canyon territory.',
    cities: ['Phoenix, AZ', 'Tempe, AZ', 'Mesa, AZ', 'Chandler, AZ', 'Gilbert, AZ', 'Birmingham, AL', 'South Bend, IN', 'Elkhart, IN'],
    state: 'now',
  },
] as const;

const CHIP_STYLES: Record<string, string> = {
  past: 'border border-stone-300 bg-white text-iron-500',
  now:  'border border-brand-200 bg-brand-50 text-brand-700',
};

export default function Markets() {
  return (
    <section id="markets" className="bg-stone-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div data-reveal className="text-center mb-14">
          <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
            Where We Work
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900">
            Then &amp; Now
          </h2>
          <p className="mt-5 text-iron-900 text-base leading-relaxed max-w-lg mx-auto">
            Thirty years of markets — the ground we&apos;ve proven, and the territory
            we work today.
          </p>
        </div>

        {/* Journey line + waypoints (desktop) */}
        <div data-reveal className="hidden lg:grid grid-cols-2 relative mb-6 max-w-4xl mx-auto" aria-hidden="true">
          <div className="route-line absolute top-1/2 left-[25%] right-[25%] border-t-2 border-dashed border-stone-300" />
          <div className="flex justify-center relative z-10">
            <span className="h-4 w-4 rounded-full bg-stone-400 ring-4 ring-stone-50" />
          </div>
          <div className="flex justify-center relative z-10">
            <span className="btn-pulse h-4 w-4 rounded-full bg-brand-600 ring-4 ring-stone-50" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ERAS.map(({ era, title, blurb, cities, state }, i) => (
            <div
              key={title}
              data-reveal
              style={{ '--rd': `${i * 0.14}s` } as CSSProperties}
              className={`flex flex-col gap-5 rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/5 ${
                state === 'now'
                  ? 'border-brand-300 shadow-md shadow-brand-500/5'
                  : 'border-stone-200 hover:border-brand-300'
              }`}
            >
              <div>
                <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-1.5 ${
                  state === 'past' ? 'text-iron-400' : 'text-brand-600'
                }`}>
                  {era}
                </p>
                <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-iron-900">
                  {title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-iron-900">{blurb}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {cities.map((city) => (
                  <span
                    key={city}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${CHIP_STYLES[state]}`}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
