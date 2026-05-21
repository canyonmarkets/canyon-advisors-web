'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',     href: '#about'     },
  { label: 'Services',  href: '#services'  },
  { label: 'Companies', href: '#companies' },
  { label: 'Markets',   href: '#markets'   },
  { label: 'Contact',   href: '#contact'   },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm border-b border-stone-100' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <a href="#" aria-label="Canyon Advisors home">
          <Image
            src="/logo.png"
            alt="Canyon Advisors"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            style={{ mixBlendMode: 'multiply' }}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href}
              className="text-sm font-semibold uppercase tracking-wide text-iron-600 hover:text-brand-600 transition-colors duration-200">
              {label}
            </a>
          ))}
          <a href="#contact"
            className="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            Get In Touch
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-iron-700 hover:text-brand-600 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-wide text-iron-700 hover:text-brand-600 transition-colors">
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white">
            Get In Touch
          </a>
        </div>
      )}
    </header>
  );
}
