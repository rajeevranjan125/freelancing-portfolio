import React from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';
import TiltCard from '../../ui/TiltCard';

export default function StrategySection() {
  return (
    <section id="strategy" className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200 text-black scroll-mt-20">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
            {PORTFOLIO_DATA.cloudStrategy.heading}
          </h2>
          <p className="text-neutral-600 text-lg">
            {PORTFOLIO_DATA.cloudStrategy.subheading}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.cloudStrategy.tiers.map((tier, idx) => (
          <ScrollReveal key={idx} delay={idx * 150}>
            <TiltCard className={`h-full p-8 rounded-2xl flex flex-col relative transition-all duration-300 bg-white border ${
              tier.isPopular ? 'border-black shadow-lg' : 'border-neutral-200 shadow-sm'
            }`}>
              
              {tier.isPopular && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-black text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Recommended Option
                </div>
              )}

              <div className="mb-6 text-left">
                <span className="text-xs font-bold text-black uppercase tracking-widest bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">
                  {tier.badge}
                </span>
                <h3 className="text-2xl font-bold text-black mt-4">{tier.scale}</h3>
              </div>

              <div className="my-4 pb-6 border-b border-neutral-200 text-left">
                <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Estimated Infrastructure Cost</p>
                <p className="text-4xl font-extrabold text-black mt-1.5">{tier.cost}</p>
              </div>

              <div className="space-y-4 flex-grow text-left">
                <div>
                  <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">Cloud Provider</p>
                  <p className="text-neutral-800 font-bold text-sm mt-1">{tier.provider}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">Architecture Rationale</p>
                  <p className="text-neutral-700 text-sm mt-1 leading-relaxed">{tier.why}</p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={150}>
        <div className="mt-12 text-center">
          <p className="text-gradient-cyan-blue font-bold text-lg inline-block px-6 py-3 rounded-full bg-neutral-50 border border-neutral-200">
            "{PORTFOLIO_DATA.cloudStrategy.footerText}"
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
