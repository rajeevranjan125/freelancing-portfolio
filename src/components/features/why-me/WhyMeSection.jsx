import React from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';

export default function WhyMeSection() {
  return (
    <section id="why-me" className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200 text-black scroll-mt-20">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-5 space-y-8 text-left">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
              Why Startups Choose Me to Scale
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mt-4">
              I deliver architectural depth. Your deployment is planned for costs and optimized for load-spikes before the first line of code goes live.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal delay={100}>
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">Professional</span>
                <span className="text-2xl font-extrabold text-black block">{PORTFOLIO_DATA.personal.stats.experience}</span>
                <span className="text-xs text-neutral-600 block">Industry Experience</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">Delivered Systems</span>
                <span className="text-2xl font-extrabold text-black block">{PORTFOLIO_DATA.personal.stats.projects}</span>
                <span className="text-xs text-neutral-600 block">Production Deployments</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">Happy Partners</span>
                <span className="text-2xl font-extrabold text-black block">{PORTFOLIO_DATA.personal.stats.clients}</span>
                <span className="text-xs text-neutral-600 block">Clients Worldwide</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">Average Rating</span>
                <span className="text-2xl font-extrabold text-black block">{PORTFOLIO_DATA.personal.stats.rating}</span>
                <span className="text-xs text-neutral-600 block">Verified Feedbacks</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8 text-left">
          {PORTFOLIO_DATA.whyChooseMe.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-400/60 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-black">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-black">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
