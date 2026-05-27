import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function Header({ onOpenScheduler }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenScheduler = () => {
    if (PORTFOLIO_DATA.personal.calendly) {
      window.open(PORTFOLIO_DATA.personal.calendly, '_blank');
    } else {
      onOpenScheduler();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={PORTFOLIO_DATA.personal.avatar}
              alt="Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-black group-hover:text-neutral-600 transition-colors">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-xs text-neutral-500 font-medium">{PORTFOLIO_DATA.personal.role}</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Services</a>
            <a href="#strategy" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Cloud Strategy</a>
            <a href="#projects" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Projects</a>
            <a href="#calculator" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Cost Calculator</a>
            <a href="#why-me" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Why Me</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 border border-emerald-500 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md select-none">
              <span className="w-2 h-2 rounded-full bg-white inline-block shadow-[0_0_4px_rgba(255,255,255,0.8)]"></span>
              <span>{PORTFOLIO_DATA.personal.availability}</span>
            </div>

            <button 
              onClick={handleOpenScheduler}
              className="hidden sm:inline-block px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-sm font-semibold transition-all duration-300 shadow-sm border border-black"
            >
              Book a Call
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-black transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
 
      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-lg p-6 space-y-4 shadow-xl flex flex-col">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors py-2 border-b border-neutral-100">Services</a>
          <a href="#strategy" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors py-2 border-b border-neutral-100">Cloud Strategy</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors py-2 border-b border-neutral-100">Projects</a>
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors py-2 border-b border-neutral-100">Cost Calculator</a>
          <a href="#why-me" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-black transition-colors py-2">Why Me</a>
          
          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 border border-emerald-500 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md self-center select-none">
              <span className="w-2 h-2 rounded-full bg-white inline-block shadow-[0_0_4px_rgba(255,255,255,0.8)]"></span>
              <span>{PORTFOLIO_DATA.personal.availability}</span>
            </div>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenScheduler();
              }}
              className="w-full py-3 rounded-xl bg-black text-white text-sm font-bold shadow-md text-center border border-black hover:bg-neutral-800"
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}
