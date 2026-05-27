import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function Footer() {
  return (
    <footer className="relative bg-[#f5f5f7] border-t border-neutral-200 py-12 md:py-16 text-black overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="https://www.generalintelligencecompany.com/images/cofounder-bg.avif"
          alt="Footer texture background"
          className="w-full h-full object-cover object-right opacity-[0.95] select-none pointer-events-none"
        />
        {/* Gradient overlay to ensure text readability on the left while keeping the sunflower image fully visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f7] via-[#f5f5f7]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <img
              src={PORTFOLIO_DATA.personal.avatar}
              alt="Logo"
              className="w-8 h-8 rounded-lg object-cover shadow-sm"
            />
            <span className="font-bold text-black">{PORTFOLIO_DATA.personal.name}</span>
          </div>
          <p className="text-neutral-500 text-xs leading-relaxed">
            Enterprise-grade backend pipelines coupled with lightweight, fast Web/Mobile frontends. Cost-centric deployments guaranteed.
          </p>
        </div>

        <div className="text-left">
          <h4 className="text-black text-xs font-bold uppercase tracking-wider mb-4">Availability</h4>
          <div className="space-y-2 text-xs">
            <p className="text-neutral-600">📍 {PORTFOLIO_DATA.personal.location}</p>
            <p className="text-neutral-600">🌍 {PORTFOLIO_DATA.personal.remoteAvailability}</p>
            <p className="text-black font-semibold">Available for freelance contracts</p>
          </div>
        </div>

        <div className="text-left">
          <h4 className="text-black text-xs font-bold uppercase tracking-wider mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2.5 text-xs text-neutral-500">
            <a href="#services" className="hover:text-black transition-colors">Developer Services</a>
            <a href="#strategy" className="hover:text-black transition-colors">Infrastructure Strategy</a>
            <a href="#projects" className="hover:text-black transition-colors">Reference Builds</a>
            <a href="#calculator" className="hover:text-black transition-colors">Cloud Budget Tool</a>
          </div>
        </div>

        <div className="space-y-4 text-left">
          <h4 className="text-black text-xs font-bold uppercase tracking-wider mb-2">Connect</h4>
          <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-neutral-700 hover:text-black text-sm font-bold flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current text-neutral-500" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span>{PORTFOLIO_DATA.personal.email}</span>
          </a>
          <a href={PORTFOLIO_DATA.personal.whatsapp} target="_blank" rel="noreferrer" className="text-neutral-700 hover:text-black text-sm font-bold flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current text-neutral-500" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <span>{PORTFOLIO_DATA.personal.phone} (WhatsApp)</span>
          </a>

          <div className="flex gap-3 pt-2 relative z-10">
            <a
              href={PORTFOLIO_DATA.personal.github}
              className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:border-neutral-400 shadow-sm transition-all duration-300"
              title="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:border-neutral-400 shadow-sm transition-all duration-300"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.twitter}
              className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black hover:border-neutral-400 shadow-sm transition-all duration-300"
              title="Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between text-xs text-neutral-500">
        <span>© 2026 {PORTFOLIO_DATA.personal.name}. All rights reserved.</span>
        <span className="mt-2 md:mt-0">Design inspired by SaaS leaders. Engineered for performant cloud distribution.</span>
      </div>
    </footer>
  );
}
