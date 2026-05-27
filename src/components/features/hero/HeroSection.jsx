import React from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';

export default function HeroSection({ onOpenScheduler }) {
  const handleOpenScheduler = () => {
    if (PORTFOLIO_DATA.personal.calendly) {
      window.open(PORTFOLIO_DATA.personal.calendly, '_blank');
    } else {
      onOpenScheduler();
    }
  };

  return (
    <>
      {/* 1. Main Hero Banner (Aspect Ratio Container on Desktop) */}
      <section className="relative w-full overflow-hidden bg-black text-white flex items-center justify-center lg:aspect-[2160/612] py-16 lg:py-0 mb-12 lg:mb-16">
        {/* Background Image with High-End Overlay Gradients */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="https://www.generalintelligencecompany.com/images/footer-2.png" 
            alt="Modern generative tech grid background" 
            className="w-full h-full object-cover select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.14),transparent_40%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full lg:py-6">
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-transparent border border-white/20 text-xs md:text-sm font-semibold text-white/90 mb-5 lg:mb-4 select-none">
                <svg className="w-4 h-4 text-white/77" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>{PORTFOLIO_DATA.hero.badgeText}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 lg:mb-3 leading-[1.1] font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                Scalable Web + Mobile Apps.<br />
                <span className="text-white">Enterprise Backend.</span><br />
                Smart Cloud.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-2.5 lg:gap-3 mb-5 lg:mb-3 max-w-3xl mx-auto">
                {/* Java Spring Boot Card */}
                <div className="relative overflow-hidden flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent border border-white/20 hover:border-white/40 text-white/90 transition-all duration-300 shadow-none hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:scale-[1.03] cursor-default group select-none">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-emerald-500/10 to-orange-500/10 pointer-events-none z-0" />
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-5 h-5 text-[#f97316] filter drop-shadow-[0_0_4px_rgba(249,115,22,0.3)] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 2c-.6-.7-1.3-.2-1.1.6.3 1.1.9 1.4.9 2.1s-.6 1.1-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M15 1c-.6-.7-1.3-.2-1.1.6.3 1.1.9 1.4.9 2.1s-.6 1.1-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M7 8h10c0 0 1 3.5-1 6s-6 2.5-8 0S7 8 7 8z" fill="currentColor" opacity="0.85" />
                        <path d="M16.5 9.5c1.5 0.5 2.5 1.5 2.5 2.5s-1 2-2.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M5 17.5c4-1.5 10-1.5 14 0 1 0.4 1 1-1 1.2-3.5 0.5-8.5 0.5-12 0-2-0.2-2-0.8-1-1.2z" fill="currentColor" />
                      </svg>
                      <svg className="w-4.5 h-4.5 text-[#6DB33F] filter drop-shadow-[0_0_4px_rgba(109,179,63,0.3)] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11" fill="#6DB33F" />
                        <path d="M12 4.5c-4.1 0-7.5 3.4-7.5 7.5 0 2.1.8 4 2.2 5.3l10.6-10.6C16 5.3 14.1 4.5 12 4.5zm5.3 3.8L6.7 18.9c1.3 1.4 3.2 2.2 5.3 2.2 4.1 0 7.5-3.4 7.5-7.5 0-2.1-.8-4-2.2-5.3z" fill="white" />
                        <path d="M12 4.5c-2.5 3-2.5 7.5 0 10.5 2.5-3 2.5-7.5 0-10.5z" fill="#6DB33F" />
                        <circle cx="6.5" cy="17.5" r="1.2" fill="white" />
                      </svg>
                    </div>
                    <span className="font-semibold text-xs tracking-wide transition-colors duration-300">Java Spring Boot</span>
                  </div>
                </div>

                {/* React Card */}
                <div className="relative overflow-hidden flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent border border-white/20 hover:border-white/40 text-white/90 transition-all duration-300 shadow-none hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:scale-[1.03] cursor-default group select-none">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none z-0" />
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-4.5 h-4.5 text-[#087EA4] animate-[spin_15s_linear_infinite] group-hover:animate-[spin_6s_linear_infinite] filter drop-shadow-[0_0_4px_rgba(8,126,164,0.3)] transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                    <span className="font-semibold text-xs tracking-wide">React</span>
                  </div>
                </div>

                {/* React Native Card */}
                <div className="relative overflow-hidden flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent border border-white/20 hover:border-white/40 text-white/90 transition-all duration-300 shadow-none hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:scale-[1.03] cursor-default group select-none">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pointer-events-none z-0" />
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-4.5 h-4.5 text-[#087EA4] filter drop-shadow-[0_0_4px_rgba(8,126,164,0.3)] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="3" width="14" height="18" rx="2.5" />
                      <path d="M12 17h.01M9 6h6" strokeLinecap="round" />
                      <ellipse cx="12" cy="10" rx="3.5" ry="1.4" transform="rotate(30 12 10)" />
                      <ellipse cx="12" cy="10" rx="3.5" ry="1.4" transform="rotate(90 12 10)" />
                      <ellipse cx="12" cy="10" rx="3.5" ry="1.4" transform="rotate(150 12 10)" />
                    </svg>
                    <span className="font-semibold text-xs tracking-wide">React Native</span>
                  </div>
                </div>

                {/* MySQL Card */}
                <div className="relative overflow-hidden flex items-center gap-2 px-4 py-1.5 rounded-xl bg-transparent border border-white/20 hover:border-white/40 text-white/90 transition-all duration-300 shadow-none hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:scale-[1.03] cursor-default group select-none">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 pointer-events-none z-0" />
                  <div className="relative z-10 flex items-center gap-2">
                    <svg className="w-4.5 h-4.5 text-[#00758F] filter drop-shadow-[0_0_4px_rgba(0,117,143,0.3)] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
                      <path d="M4 5v14c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5M4 12c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-semibold text-xs tracking-wide">MySQL</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Clickable contact details & location */}
            <ScrollReveal delay={350}>
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 lg:mb-4.5 text-[11px] font-semibold select-none">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-black shadow-md">
                  <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{PORTFOLIO_DATA.personal.locationDescription} • {PORTFOLIO_DATA.personal.remoteAvailability}</span>
                </span>
                
                <a 
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`} 
                  className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 text-black hover:text-black border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current text-neutral-500 group-hover:text-black transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  <span>{PORTFOLIO_DATA.personal.email}</span>
                </a>
                
                <a 
                  href={PORTFOLIO_DATA.personal.whatsapp} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#25D366]/10 text-black hover:text-[#25D366] border border-neutral-200 hover:border-[#25D366]/30 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current text-neutral-500 group-hover:text-[#25D366] transition-colors duration-300" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  <span>{PORTFOLIO_DATA.personal.phone}</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={450}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                <a 
                  href="#projects" 
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white text-black hover:bg-neutral-50 hover:text-black font-bold text-sm transition-all duration-300 text-center shadow-md border border-white"
                >
                  {PORTFOLIO_DATA.hero.ctaPrimary}
                </a>
                <button 
                  onClick={handleOpenScheduler}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-transparent text-white hover:bg-white/10 border border-white shadow-sm font-bold text-sm transition-all duration-300 text-center"
                >
                  {PORTFOLIO_DATA.hero.ctaSecondary}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Hero Supplemental Content (Stats & Quote - Styled beautifully in off-white to match the portfolio theme) */}
      <section className="bg-[#f5f5f7] text-black pt-10 pb-16 lg:py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal delay={600}>
            <div className="p-8 md:p-10 rounded-3xl max-w-3xl mx-auto bg-white border border-neutral-200 shadow-sm relative overflow-hidden text-center mb-12">
              {/* Decorative watermark double quote */}
              <div className="absolute -top-3 -left-3 text-neutral-100 pointer-events-none select-none">
                <svg className="w-20 h-20 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              <p className="text-neutral-700 text-base md:text-lg font-medium leading-relaxed italic relative z-10 tracking-wide">
                "{PORTFOLIO_DATA.personal.title}. I help startups and businesses build scalable web & mobile applications with enterprise-grade backend. I optimize cloud costs so you pay only for what you use."
              </p>
            </div>
          </ScrollReveal>

          {/* Above-the-fold stats dashboard block */}
          <ScrollReveal delay={650}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="relative overflow-hidden text-center p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:border-neutral-400 hover:-translate-y-0.5 hover:scale-[1.01] group">
                <span className="text-2xl md:text-3xl font-extrabold text-black block font-mono tracking-tight transition-all duration-300">{PORTFOLIO_DATA.personal.stats.experience}</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mt-2 transition-colors duration-300 group-hover:text-black">Experience</span>
              </div>
              
              <div className="relative overflow-hidden text-center p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:border-neutral-400 hover:-translate-y-0.5 hover:scale-[1.01] group">
                <span className="text-2xl md:text-3xl font-extrabold text-black block font-mono tracking-tight transition-all duration-300">{PORTFOLIO_DATA.personal.stats.projects}</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mt-2 transition-colors duration-300 group-hover:text-black">Projects Delivered</span>
              </div>
              
              <div className="relative overflow-hidden text-center p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:border-neutral-400 hover:-translate-y-0.5 hover:scale-[1.01] group">
                <span className="text-2xl md:text-3xl font-extrabold text-black block font-mono tracking-tight transition-all duration-300">{PORTFOLIO_DATA.personal.stats.clients}</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mt-2 transition-colors duration-300 group-hover:text-black">Clients Satisfied</span>
              </div>
              
              <div className="relative overflow-hidden text-center p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:border-neutral-400 hover:-translate-y-0.5 hover:scale-[1.01] group">
                <span className="text-2xl md:text-3xl font-extrabold text-black block font-mono tracking-tight transition-all duration-300">{PORTFOLIO_DATA.personal.stats.rating}</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mt-2 transition-colors duration-300 group-hover:text-black">Average Rating</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
