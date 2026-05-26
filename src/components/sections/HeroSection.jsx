import springHeroImage from '../../assets/images/spring-hero-park.webp';
import ScrollReveal from '../common/ScrollReveal';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const HERO_STATS = [
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects Delivered' },
  { key: 'clients', label: 'Clients Satisfied' },
  { key: 'rating', label: 'Average Rating' }
];

export default function HeroSection({ hero, personal, onOpenScheduler }) {
  const { progress, targetRef } = useScrollProgress();

  return (
    <section
      ref={targetRef}
      className="spring-hero-scene relative isolate min-h-[220vh] overflow-visible bg-black"
      style={{ '--hero-progress': progress }}
    >
      <div className="sticky top-0 h-[calc(100vh-5rem)] overflow-hidden">
        <img
          src={springHeroImage}
          alt="Spring city park with blossoms and a skyline"
          className="spring-hero-image absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/18 to-black/64" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.14),transparent_36%)]" />
        <div className="hero-section-end-marker" aria-hidden="true" />
      </div>

      <div className="spring-hero-content relative z-10 -mt-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-6 pt-10 pb-12 md:pt-14 flex items-center justify-center">
        <div className="text-center max-w-5xl mx-auto text-white">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/16 border border-white/30 text-xs md:text-sm font-semibold text-white mb-8 shadow-sm backdrop-blur-md">
              <svg className="w-4 h-4 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>{hero.badgeText}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.05] font-sans drop-shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
              Build software that feels calm at scale.
              <span className="block text-white/82">From first launch to real traffic.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-white/86 text-lg md:text-xl font-medium mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow">
              React, React Native, Spring Boot, MySQL, and cost-aware cloud architecture for teams that need polished products without runaway infrastructure bills.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-semibold">
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/14 border border-white/25 text-white shadow-sm backdrop-blur-md">
                {personal.locationDescription} • {personal.remoteAvailability}
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/14 border border-white/25 text-white hover:bg-white/24 transition-all duration-300 shadow-sm backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current text-white/70" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                <span>{personal.email}</span>
              </a>
              <a
                href={personal.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/14 border border-white/25 text-white hover:bg-white/24 transition-all duration-300 shadow-sm backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current text-white/70" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                <span>{personal.phone}</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-white/90 transition-all duration-300 text-center shadow-md border border-white"
              >
                {hero.ctaPrimary}
              </a>
              <button
                onClick={onOpenScheduler}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/20 border border-white/35 hover:bg-black/35 text-white font-bold text-base transition-all duration-300 text-center shadow-sm backdrop-blur-md"
              >
                {hero.ctaSecondary}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-24 md:pb-36 mt-[28vh]">
        <div className="spring-hero-panel max-w-4xl mx-auto text-center">
          <ScrollReveal delay={600}>
            <div className="p-8 md:p-10 rounded-3xl max-w-3xl mx-auto bg-white/92 border border-white/70 shadow-2xl shadow-black/20 relative overflow-hidden text-center backdrop-blur-xl">
              <div className="absolute -top-3 -left-3 text-neutral-200/40 pointer-events-none select-none">
                <svg className="w-20 h-20 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <p className="text-neutral-800 text-lg md:text-xl font-medium leading-relaxed italic relative z-10 tracking-wide">
                "{personal.title}. I help startups and businesses build scalable web & mobile applications with enterprise-grade backend. I optimize cloud costs so you pay only for what you use."
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={650}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.key} className="text-center p-4 rounded-2xl bg-white/92 border border-white/70 shadow-xl shadow-black/10 backdrop-blur-xl">
                  <span className="text-3xl font-extrabold text-black block font-mono">{personal.stats[stat.key]}</span>
                  <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider block mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
