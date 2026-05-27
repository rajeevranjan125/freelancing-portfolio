import React from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';

export default function TestimonialsSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200 text-black">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
            What Startup Founders Say
          </h2>
          <p className="text-neutral-600 text-lg">
            Real numbers, real migrations, real uptime assurances.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.testimonials.map((test, idx) => (
          <ScrollReveal key={idx} delay={idx * 150}>
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col h-full justify-between relative hover:border-neutral-400/60 transition-all duration-300 text-left">
              <div className="absolute top-6 right-8 text-neutral-100 pointer-events-none select-none">
                <svg className="w-16 h-16 fill-current animate-none" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <div className="relative z-10 flex-grow">
                <p className="text-neutral-700 italic text-sm leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-extrabold text-black text-xs uppercase tracking-wider">{test.author}</h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded">
                  {test.scale}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
