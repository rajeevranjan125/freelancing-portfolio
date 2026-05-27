import React from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';

export default function PartnersSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 border-t border-neutral-200 text-black">
      <ScrollReveal>
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Cloud Ecosystem Compatibility
          </span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {PORTFOLIO_DATA.partners.map((partner, idx) => (
            <div 
              key={idx} 
              className="text-neutral-400 hover:text-black transition-all duration-300 font-extrabold text-xl md:text-2xl tracking-widest uppercase cursor-default filter grayscale hover:grayscale-0"
            >
              {partner}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
