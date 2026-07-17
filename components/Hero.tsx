import HeroScene from '@/components/HeroScene';

export default function Hero() {
  return (
    <section id="home" className="relative bg-iron-900 min-h-screen flex items-center pt-16 overflow-hidden">

      {/* Generative canyon-at-dusk scene (canvas, mouse parallax) */}
      <HeroScene />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 w-full">
        <div className="max-w-4xl">

          <p className="hero-rise text-brand-500 font-mono text-xs sm:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6">
            Canyon Advisors · Est. 1993
          </p>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-8xl uppercase tracking-wide text-white leading-tight sm:leading-none mb-8">
            <span className="hero-mask">
              <span className="hero-line" style={{ animationDelay: '0.1s' }}>Thirty Years of</span>
            </span>
            <span className="hero-mask">
              <span className="hero-line text-brand-500" style={{ animationDelay: '0.22s' }}>
                <span className="relative inline-block">
                  Business
                  <svg
                    className="swoosh absolute -bottom-2 sm:-bottom-3 left-0 w-full"
                    viewBox="0 0 220 14"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11 C 60 3, 150 2, 217 7"
                      stroke="#ff6c27"
                      strokeWidth="5"
                      strokeLinecap="round"
                      pathLength="1"
                    />
                  </svg>
                </span>
              </span>
            </span>
            <span className="hero-mask">
              <span className="hero-line" style={{ animationDelay: '0.34s' }}>Expertise</span>
            </span>
          </h1>

          <p className="hero-rise text-white text-base sm:text-xl leading-relaxed max-w-2xl mb-4" style={{ animationDelay: '0.55s' }}>
            Canyon Advisors is a woman-owned, family-run Phoenix real estate firm —
            fix-and-flip and lease-option properties — and the parent company of Canyon
            Markets, Canyon Apts, and Canyon Cleaners. What the first generation built,
            the second now helps run.
          </p>

          <p className="hero-rise text-iron-300 text-sm sm:text-base leading-relaxed max-w-xl mb-10" style={{ animationDelay: '0.68s' }}>
            Phoenix Metro · Birmingham · Northern Indiana
          </p>

          <div className="hero-rise flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.8s' }}>
            <a href="#services"
              className="btn-pulse inline-flex items-center justify-center rounded-lg bg-brand-600 px-8 py-4 text-base font-semibold text-white uppercase tracking-wide hover:bg-brand-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/40 active:scale-[0.97] active:translate-y-0 transition-all duration-200">
              Our Services
            </a>
            <a href="#contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white uppercase tracking-wide hover:border-brand-500/60 hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg active:scale-[0.97] active:translate-y-0 transition-all duration-200">
              Get In Touch
            </a>
          </div>

        </div>
      </div>

      {/* Scroll indicator — family signature */}
      <div
        className="hero-rise absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        style={{ animationDelay: '1.15s' }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-iron-400">Scroll</span>
        <span className="scroll-track block h-10 w-px">
          <span className="scroll-thread block h-full w-full bg-gradient-to-b from-transparent via-brand-500 to-brand-500" />
        </span>
      </div>
    </section>
  );
}
