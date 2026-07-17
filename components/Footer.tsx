import { MapPin } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',     href: '#about'     },
  { label: 'Services',  href: '#services'  },
  { label: 'Companies', href: '#companies' },
  { label: 'Markets',   href: '#markets'   },
  { label: 'Contact',   href: '#contact'   },
] as const;

const COMPANIES = [
  { label: 'Canyon Markets',  href: 'https://canyon-markets.com'         },
  { label: 'Canyon Apts',     href: 'https://canyon-apts.com'            },
  { label: 'Canyon Cleaners', href: 'https://cleaners.canyon-advisors.com' },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 border-t border-stone-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-stone-700">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-bold text-2xl tracking-widest uppercase text-stone-100">
              Canyon Advisors
            </span>
            <p className="text-xs leading-relaxed text-stone-400 max-w-xs">
              The woman-owned parent company of Canyon Markets, Canyon Apts, and
              Canyon Cleaners. Built in Phoenix, family-run since 1993.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-stone-500 mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-sm text-stone-400 hover:text-brand-400 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Companies */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-stone-500 mb-4">Our Companies</p>
            <ul className="flex flex-col gap-2.5">
              {COMPANIES.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-stone-400 hover:text-brand-400 transition-colors duration-200">
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-stone-500 mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 text-sm text-stone-400">
                <MapPin size={14} strokeWidth={1.5} />
                Phoenix Metro Area, AZ
              </span>
              <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
                Use the contact form above to reach a member of our team directly.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">&copy; {year} Canyon Advisors. All rights reserved.</p>
          <p className="text-xs text-stone-700 font-mono tracking-wide">Three Companies · One Family · Est. 1993</p>
        </div>
      </div>
    </footer>
  );
}
