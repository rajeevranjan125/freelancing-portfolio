import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';

export default function ProjectsSection({ onSimulateDemo }) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Filter projects helper
  const filteredProjects = selectedFilter === "All"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => {
        if (selectedFilter === "Web Apps") return p.tech.includes("React") && !p.tech.includes("React Native");
        if (selectedFilter === "Mobile Apps") return p.tech.includes("React Native");
        if (selectedFilter === "Cloud Optimized") return p.cloud.includes("AWS Lightsail") || p.cloud.includes("EC2") || p.cloud.includes("DigitalOcean") || p.cloud.includes("EKS");
        return true;
      });

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200 text-black scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <ScrollReveal>
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
              Featured Systems & Applications
            </h2>
            <p className="text-neutral-600 text-lg">
              A selection of production-ready reference builds deploying Java backend and React frontends at scale.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-neutral-50 border border-neutral-200 self-start">
            {["All", "Web Apps", "Mobile Apps", "Cloud Optimized"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-black text-white shadow-sm'
                    : 'text-neutral-500 hover:text-black border border-transparent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 50}>
            <div className="p-6 rounded-2xl border border-neutral-200 bg-white flex flex-col h-full relative transition-all duration-300 shadow-sm hover:border-neutral-400/60 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold text-black uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                  {project.cloud}
                </span>
                <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded text-xs font-bold text-neutral-700">
                  <svg className="w-3.5 h-3.5 text-black fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{project.rating.toFixed(1)}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200 mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">Volume Scale</span>
                  <span className="text-neutral-800 font-bold block mt-0.5">{project.users}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">Estimated Cost</span>
                  <span className="text-black font-bold block mt-0.5">{project.cost}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-bold text-neutral-700 bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onSimulateDemo(project)}
                className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-800 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-black shadow-sm"
              >
                <span>Simulate Live Demo</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
