import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

const COMPANIES = [
  {
    name: 'Canyon Markets',
    category: 'Break Room Micro-Markets',
    description:
      'Canyon Markets installs fully stocked, zero-cost micro-markets in qualifying Phoenix-area workplaces. Fresh food, snacks, and beverages — at no cost to the employer.',
    href: 'https://canyon-markets.com',
    displayUrl: 'canyon-markets.com',
    tags: ['No Equipment Cost', 'Zero Contracts', 'Phoenix Metro'],
  },
  {
    name: 'Canyon Apts',
    category: 'Furnished Short-Term Rentals',
    description:
      'Fully furnished weekly and monthly apartments across the Phoenix metro. No credit check, no rental history required. Utilities included. Move in this week.',
    href: 'https://canyon-apts.com',
    displayUrl: 'canyon-apts.com',
    tags: ['No Credit Check', 'From $495/Week', 'Utilities Included'],
  },
  {
    name: 'Canyon Cleaners',
    category: 'Turnover & Commercial Cleaning',
    description:
      'A woman-owned, women-run cleaning company serving the Phoenix metro since 2017. Short-term rental turnovers, corporate housing, and commercial spaces — handled by vetted, insured teams that leave every property photo-ready.',
    href: 'https://cleaners.canyon-advisors.com',
    displayUrl: 'cleaners.canyon-advisors.com',
    tags: ['Vetted Teams', 'Insured', 'Photo-Ready'],
  },
] as const;

export default function OurCompanies() {
  return (
    <section id="companies" className="bg-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div data-reveal className="text-center mb-16">
          <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
            The Canyon Family
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900">
            Our Companies
          </h2>
          <p className="mt-5 text-iron-900 text-base leading-relaxed max-w-xl mx-auto">
            Canyon Advisors is the parent company behind three businesses in the Phoenix
            metro — workplace micro-markets, furnished rentals, and professional cleaning.
            Each one family-built. Each one still family-run.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {COMPANIES.map(({ name, category, description, href, displayUrl, tags }, i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              data-spotlight
              style={{ '--rd': `${i * 0.12}s` } as CSSProperties}
              className="group relative flex flex-col gap-6 rounded-2xl border border-stone-200 bg-stone-50 p-8 overflow-hidden hover:border-brand-300 hover:bg-white hover:shadow-xl hover:shadow-brand-500/8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-brand-600 font-mono text-xs tracking-[0.2em] uppercase mb-1">
                    {category}
                  </p>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-iron-900">
                    {name}
                  </h3>
                </div>
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </div>
              </div>

              {/* Body */}
              <p className="text-iron-900 text-sm leading-relaxed">{description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map((tag) => (
                  <span key={tag}
                    className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Visit link */}
              <p className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
                Visit {displayUrl} →
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
