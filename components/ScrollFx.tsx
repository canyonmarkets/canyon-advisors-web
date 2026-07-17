'use client';

import { useEffect } from 'react';

/* Site-wide motion driver: scroll reveals, stat count-ups, and card
   spotlight tracking. Renders nothing. All effects degrade gracefully —
   without JS the .fx gate never activates and content stays visible. */
export default function ScrollFx() {
  useEffect(() => {
    document.documentElement.classList.add('fx');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll reveals */
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    let revealIo: IntersectionObserver | undefined;
    if (reduced) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      revealIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              revealIo!.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      reveals.forEach((el) => revealIo!.observe(el));
    }

    /* Stat count-ups — final value is already in the markup; JS animates
       toward it, so reduced-motion and no-JS both show the real number. */
    let countIo: IntersectionObserver | undefined;
    if (!reduced) {
      const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
      countIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            countIo!.unobserve(entry.target);
            const el = entry.target as HTMLElement;
            const raw = el.textContent ?? '';
            const match = raw.match(/\d+/);
            if (!match) continue;
            const target = parseInt(match[0], 10);
            const prefix = raw.slice(0, match.index ?? 0);
            const suffix = raw.slice((match.index ?? 0) + match[0].length);
            const start = performance.now();
            const duration = 1300;
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 4);
              el.textContent = prefix + Math.round(target * eased) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => countIo!.observe(el));
    }

    /* Spotlight — track the cursor inside any [data-spotlight] card */
    const onMove = (ev: MouseEvent) => {
      const card = (ev.target as HTMLElement | null)?.closest?.('[data-spotlight]');
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--sx', `${ev.clientX - rect.left}px`);
      card.style.setProperty('--sy', `${ev.clientY - rect.top}px`);
    };
    document.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      revealIo?.disconnect();
      countIo?.disconnect();
    };
  }, []);

  return null;
}
