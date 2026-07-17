import Image from 'next/image';
import type { CSSProperties } from 'react';

const PHOTOS = [
  { src: '/family/founders.webp', alt: 'The founders of Canyon Advisors' },
  { src: '/family/daughters.webp', alt: 'The three daughters of the Canyon family' },
  { src: '/family/next-gen-couple.webp', alt: 'The next generation of the Canyon family' },
  { src: '/family/next-gen-family.webp', alt: 'A young family of the next generation of the Canyon family' },
] as const;

export default function FamilySection() {
  return (
    <section id="family" className="bg-stone-50 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div data-reveal className="text-center mb-16">
          <p className="text-brand-600 font-mono text-base tracking-[0.3em] uppercase mb-4">
            Two Generations
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-wide text-iron-900">
            One Family. One Team.
          </h2>
          <p className="mt-5 text-iron-900 text-base leading-relaxed max-w-xl mx-auto">
            One woman built these companies, and she raised three daughters to follow her into
            business. Today two generations of one family work in them side by side.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {PHOTOS.map(({ src, alt }, i) => (
            <div
              key={src}
              data-reveal
              style={{ '--rd': `${i * 0.1}s` } as CSSProperties}
              className="group relative aspect-square w-[calc(50%-0.75rem)] sm:w-56 lg:w-60 overflow-hidden rounded-2xl border border-stone-200 bg-white hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/8 hover:-translate-y-1 transition-all duration-300"
            >
              <Image src={src} alt={alt} width={1200} height={1200}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 14rem, 15rem"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
