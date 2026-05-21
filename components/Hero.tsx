export default function Hero() {
  return (
    <section id="home" className="relative bg-iron-900 min-h-screen flex items-center pt-16 overflow-hidden">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Orange glow accent */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-brand-600/8 blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="max-w-3xl">

          <p className="text-brand-500 font-mono text-xs sm:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6">
            Canyon Advisors · Est. 1993
          </p>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide text-white leading-tight sm:leading-none mb-8">
            Thirty Years of<br />
            <span className="text-brand-500">Real Estate</span><br />
            Expertise
          </h1>

          <p className="text-white text-base sm:text-xl leading-relaxed max-w-2xl mb-4">
            Canyon Advisors is a family-owned real estate consulting, investment,
            and management firm. We connect investors, property owners, and families
            with the tools, capital, and guidance to build long-term wealth.
          </p>

          <p className="text-iron-300 text-sm sm:text-base leading-relaxed max-w-xl mb-10">
            Phoenix · Dallas · Memphis · Nationwide
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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
    </section>
  );
}
