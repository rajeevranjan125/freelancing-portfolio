import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from './portfolioData';
import ScrollReveal from './components/ScrollReveal';
import TiltCard from './components/TiltCard';
import SimulatorModal from './components/SimulatorModal';
import SchedulerModal from './components/SchedulerModal';
import ContactForm from './components/ContactForm';

export default function App() {


  // App UI states
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [calcUsers, setCalcUsers] = useState(2500);
  const [showScheduler, setShowScheduler] = useState(false);
  const [demoProject, setDemoProject] = useState(null);

  const handleOpenScheduler = () => {
    if (PORTFOLIO_DATA.personal.calendly) {
      window.open(PORTFOLIO_DATA.personal.calendly, '_blank');
    } else {
      setShowScheduler(true);
    }
  };

  // Form Success Lead state
  const [showFormSuccess, setShowFormSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);



  // Cloud calculator utility function
  const getCalcStats = (users) => {
    if (users <= 1000) {
      const cost = Math.round(10 + (users - 100) * (15 / 900));
      return {
        provider: "AWS Lightsail / DigitalOcean",
        cost: `$${cost}/mo`,
        tier: "Startup Tier",
        setup: "React SPA + Java Spring Boot (packaged monolith) + Managed MySQL (1GB RAM)",
        why: "All-in-one Virtual Private Server. Bundles static frontends with minimal container footprint. Perfect for initial traction.",
        savings: "$180 - $250/mo saved"
      };
    } else if (users <= 10000) {
      const cost = Math.round(60 + (users - 1000) * (60 / 9000));
      return {
        provider: "AWS EC2 t3.medium + RDS MySQL",
        cost: `$${cost}/mo`,
        tier: "Growth Cluster",
        setup: "S3 hosted React + Application Load Balancer + Spring Boot on EC2 with Auto-Scaling + Multi-AZ RDS",
        why: "Allows backend to scale vertically & horizontally. RDS ensures automated daily backups and decoupled compute.",
        savings: "$350 - $500/mo saved"
      };
    } else {
      const cost = Math.round(250 + (users - 10000) * (450 / 90000));
      return {
        provider: "AWS EKS (Kubernetes) + RDS Multi-AZ",
        cost: `$${cost}/mo`,
        tier: "Enterprise Microservices",
        setup: "Next.js Static hosting + AWS EKS Cluster running Spring Boot pods + Redis cache + RDS replicas",
        why: "Orchestrated container deployments, automatic traffic load balancing, master-replica DB setup for heavy queries.",
        savings: "$1,200 - $2,500/mo saved"
      };
    }
  };

  const calcInfo = getCalcStats(calcUsers);

  // Form submit handler
  const handleFormSubmitSuccess = (data) => {
    setSubmittedLead(data);
    setShowFormSuccess(true);
  };

  // Filter projects helper
  const filteredProjects = selectedFilter === "All"
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => {
        if (selectedFilter === "Web Apps") return p.tech.includes("React") && !p.tech.includes("React Native");
        if (selectedFilter === "Mobile Apps") return p.tech.includes("React Native");
        if (selectedFilter === "Cloud Optimized") return p.cloud.includes("AWS Lightsail") || p.cloud.includes("EC2");
        return true;
      });

  // SVG Render Helper
  const renderIcon = (type, className = "w-6 h-6 text-cyanNeon") => {
    switch(type) {
      case 'web':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'mobile':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'backend':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case 'cloud':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen grid-bg overflow-x-hidden selection:bg-cyanNeon/30">
      
      {/* Decorative Glow Lights */}
      <div className="absolute top-0 left-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-cyanNeon/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] right-1/4 w-[450px] md:w-[750px] h-[450px] md:h-[750px] bg-purpleSubtle/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10%] left-1/3 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blueElectric/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Sticky Header Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-darkBg/75 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyanNeon to-blueElectric flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-transform group-hover:scale-105">
              RP
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-white group-hover:text-cyanNeon transition-colors">{PORTFOLIO_DATA.personal.name}</span>
              <span className="text-xs text-slate-400 font-medium">{PORTFOLIO_DATA.personal.role}</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-300 hover:text-cyanNeon transition-colors">Services</a>
            <a href="#strategy" className="text-sm font-medium text-slate-300 hover:text-cyanNeon transition-colors">Cloud Strategy</a>
            <a href="#projects" className="text-sm font-medium text-slate-300 hover:text-cyanNeon transition-colors">Projects</a>
            <a href="#calculator" className="text-sm font-medium text-slate-300 hover:text-cyanNeon transition-colors">Cost Calculator</a>
            <a href="#why-me" className="text-sm font-medium text-slate-300 hover:text-cyanNeon transition-colors">Why Me</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 relative">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute"></span>
              <span className="ml-3">{PORTFOLIO_DATA.personal.availability}</span>
            </div>

            <button 
              onClick={handleOpenScheduler}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon/50 hover:bg-cyanNeon/10 text-sm font-semibold transition-all duration-300 shadow-sm"
            >
              Book a Call
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 max-w-7xl mx-auto px-6 overflow-hidden">
        
        {/* Static Background Icons */}
        <div className="absolute top-10 left-10 w-16 h-16 text-slate-700/20 pointer-events-none hidden lg:block">
          <svg className="w-full h-full text-cyanNeon/10" viewBox="-11.5 -10.23174 23 20.46348">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        </div>
        <div className="absolute bottom-20 right-16 w-20 h-20 text-slate-700/20 pointer-events-none hidden lg:block">
          <svg className="w-full h-full text-emerald-500/10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyanNeon/10 border border-cyanNeon/20 text-xs md:text-sm font-semibold text-cyanNeon mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <svg className="w-4 h-4 text-cyanNeon animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>{PORTFOLIO_DATA.hero.badgeText}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans">
              Scalable Web + Mobile Apps.<br />
              <span className="text-gradient-cyan-blue bg-clip-text text-transparent">Enterprise Backend.</span><br />
              Smart Cloud.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-slate-400 text-lg md:text-xl font-medium mb-6 max-w-2xl mx-auto leading-relaxed">
              {PORTFOLIO_DATA.hero.subheadline}
            </p>
          </ScrollReveal>

          {/* Clickable contact details & location above-the-fold */}
          <ScrollReveal delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-semibold">
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/60 border border-white/5 text-slate-300 shadow-sm shadow-black/10">
                {PORTFOLIO_DATA.personal.locationDescription} • {PORTFOLIO_DATA.personal.remoteAvailability}
              </span>
              <a 
                href={`mailto:${PORTFOLIO_DATA.personal.email}`} 
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/60 border border-white/5 text-slate-300 hover:text-cyanNeon hover:border-cyanNeon/40 hover:bg-cyanNeon/5 transition-all duration-300 shadow-sm shadow-black/10"
              >
                📧 {PORTFOLIO_DATA.personal.email}
              </a>
              <a 
                href={PORTFOLIO_DATA.personal.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/60 border border-white/5 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300 shadow-sm shadow-black/10"
              >
                💬 {PORTFOLIO_DATA.personal.phone}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm sm:max-w-none mx-auto">
              <a 
                href="#projects" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyanNeon to-blueElectric text-white font-bold text-base hover:opacity-95 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 text-center shadow-lg"
              >
                {PORTFOLIO_DATA.hero.ctaPrimary}
              </a>
              <button 
                onClick={handleOpenScheduler}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon/50 hover:bg-cyanNeon/10 text-white font-bold text-base transition-all duration-300 text-center"
              >
                {PORTFOLIO_DATA.hero.ctaSecondary}
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="mt-16 md:mt-24 p-6 md:p-8 rounded-2xl glass-panel max-w-3xl mx-auto border-white/5">
              <p className="text-slate-300 text-base md:text-lg leading-relaxed italic">
                "{PORTFOLIO_DATA.personal.title}. I help startups and businesses build scalable web & mobile applications with enterprise-grade backend. I optimize cloud costs so you pay only for what you use."
              </p>
            </div>
          </ScrollReveal>

          {/* Above-the-fold stats dashboard block */}
          <ScrollReveal delay={650}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-white/5">
              <div className="text-center p-4 rounded-2xl bg-slate-900/50 border border-white/5 glass-panel">
                <span className="text-3xl font-extrabold text-cyanNeon block font-mono">{PORTFOLIO_DATA.personal.stats.experience}</span>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Experience</span>
              </div>
              <div className="text-center p-4 rounded-2xl bg-slate-900/50 border border-white/5 glass-panel">
                <span className="text-3xl font-extrabold text-cyanNeon block font-mono">{PORTFOLIO_DATA.personal.stats.projects}</span>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Projects Delivered</span>
              </div>
              <div className="text-center p-4 rounded-2xl bg-slate-900/50 border border-white/5 glass-panel">
                <span className="text-3xl font-extrabold text-cyanNeon block font-mono">{PORTFOLIO_DATA.personal.stats.clients}</span>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Clients Satisfied</span>
              </div>
              <div className="text-center p-4 rounded-2xl bg-slate-900/50 border border-white/5 glass-panel">
                <span className="text-3xl font-extrabold text-cyanNeon block font-mono">{PORTFOLIO_DATA.personal.stats.rating}</span>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Average Rating</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cloud Strategy visual comparison section */}
      <section id="strategy" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {PORTFOLIO_DATA.cloudStrategy.heading}
            </h2>
            <p className="text-slate-400 text-lg">
              {PORTFOLIO_DATA.cloudStrategy.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.cloudStrategy.tiers.map((tier, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <TiltCard className={`h-full p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col relative transition-all duration-300 ${
                tier.isPopular ? 'border-cyanNeon/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/80' : ''
              }`}>
                
                {tier.isPopular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-cyanNeon to-blueElectric text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Recommended Option
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-xs font-bold text-cyanNeon uppercase tracking-widest bg-cyanNeon/10 px-2.5 py-1 rounded-md">
                    {tier.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-4">{tier.scale}</h3>
                </div>

                <div className="my-4 pb-6 border-b border-white/5">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Estimated Infrastructure Cost</p>
                  <p className="text-4xl font-extrabold text-white mt-1.5">{tier.cost}</p>
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Cloud Provider</p>
                    <p className="text-slate-200 font-bold text-sm mt-1">{tier.provider}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Architecture Rationale</p>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{tier.why}</p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={150}>
          <div className="mt-12 text-center">
            <p className="text-gradient-cyan-blue font-bold text-lg inline-block px-6 py-3 rounded-full bg-white/5 border border-white/5">
              "{PORTFOLIO_DATA.cloudStrategy.footerText}"
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Cloud Cost Calculator Section */}
      <section id="calculator" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Interactive Cloud Budget Estimator
            </h2>
            <p className="text-slate-400 text-lg">
              Slide to adjust your estimated active monthly users and see my recommended, cost-optimized deployment architecture.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto p-6 md:p-10 rounded-3xl glass-panel border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyanNeon/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative grid md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-7 space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 font-bold text-lg">Target Active Users:</label>
                  <span className="text-3xl font-extrabold text-cyanNeon font-mono">
                    {calcUsers >= 100000 ? "100,000+" : calcUsers.toLocaleString()}
                  </span>
                </div>

                <input 
                  type="range" 
                  min="100" 
                  max="100000" 
                  step="100" 
                  value={calcUsers}
                  onChange={(e) => setCalcUsers(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none accent-cyanNeon"
                />

                <div className="flex justify-between text-xs text-slate-500 font-bold px-1">
                  <span>100 Users</span>
                  <span className="hidden sm:inline">10K</span>
                  <span>25K Users</span>
                  <span className="hidden sm:inline">50K</span>
                  <span>75K</span>
                  <span>100K+ Users</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Recommended Setup</h4>
                  <p className="text-slate-200 text-sm leading-relaxed">{calcInfo.setup}</p>
                </div>
              </div>

              <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-white/10 space-y-6 relative">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyanNeon bg-cyanNeon/10 px-2 py-0.5 rounded">
                    {calcInfo.tier}
                  </span>
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-4">Estimated Cloud Bill</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white">{calcInfo.cost}</span>
                  </div>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-white/5">
                  <div>
                    <span className="text-xs text-slate-400 block">Suggested Provider:</span>
                    <span className="text-sm font-bold text-slate-200">{calcInfo.provider}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Why this configuration:</span>
                    <span className="text-xs text-slate-300 leading-relaxed block mt-0.5">{calcInfo.why}</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">Projected Savings</span>
                    <span className="text-sm font-bold text-emerald-300 block">{calcInfo.savings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Services I Offer
            </h2>
            <p className="text-slate-400 text-lg">
              Robust architectures, fluid animations, dynamic data layer tuning, and cloud-native solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PORTFOLIO_DATA.services.map((svc, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <TiltCard className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col h-full transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyanNeon to-blueElectric flex items-center justify-center mb-6 shadow-md shadow-cyanNeon/10">
                  {renderIcon(svc.icon, "w-6 h-6 text-white")}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{svc.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                  {svc.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-semibold bg-white/5 border border-white/5 text-slate-300 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Featured Systems & Applications
              </h2>
              <p className="text-slate-400 text-lg">
                A selection of production-ready reference builds deploying Java backend and React frontends at scale.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5 self-start">
              {["All", "Web Apps", "Mobile Apps", "Cloud Optimized"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-cyanNeon to-blueElectric text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
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
              <div className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col h-full relative transition-all duration-300 border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold text-cyanNeon uppercase tracking-wider bg-cyanNeon/10 px-2 py-0.5 rounded">
                    {project.cloud}
                  </span>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded text-xs font-bold text-slate-300">
                    {renderIcon('star', 'w-3.5 h-3.5')}
                    <span>{project.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Volume Scale</span>
                    <span className="text-slate-200 font-bold block mt-0.5">{project.users}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Estimated Cost</span>
                    <span className="text-emerald-400 font-bold block mt-0.5">{project.cost}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold text-slate-300 bg-slate-900 border border-white/5 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setDemoProject(project)}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon/50 hover:bg-cyanNeon/10 text-slate-200 hover:text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
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

      {/* Why Choose Me section */}
      <section id="why-me" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Why Startups Choose Me to Scale
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mt-4">
                I deliver architectural depth. Your deployment is planned for costs and optimized for load-spikes before the first line of code goes live.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
              <ScrollReveal delay={100}>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Professional</span>
                  <span className="text-2xl font-extrabold text-cyanNeon block">{PORTFOLIO_DATA.personal.stats.experience}</span>
                  <span className="text-xs text-slate-300 block">Industry Experience</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Delivered Systems</span>
                  <span className="text-2xl font-extrabold text-cyanNeon block">{PORTFOLIO_DATA.personal.stats.projects}</span>
                  <span className="text-xs text-slate-300 block">Production Deployments</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Happy Partners</span>
                  <span className="text-2xl font-extrabold text-cyanNeon block">{PORTFOLIO_DATA.personal.stats.clients}</span>
                  <span className="text-xs text-slate-300 block">Clients Worldwide</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Average Rating</span>
                  <span className="text-2xl font-extrabold text-cyanNeon block">{PORTFOLIO_DATA.personal.stats.rating}</span>
                  <span className="text-xs text-slate-300 block">Verified Feedbacks</span>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.whyChooseMe.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-cyanNeon/10 flex items-center justify-center font-bold text-cyanNeon">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              What Startup Founders Say
            </h2>
            <p className="text-slate-400 text-lg">
              Real numbers, real migrations, real uptime assurances.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.testimonials.map((test, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <div className="p-8 rounded-2xl glass-panel flex flex-col h-full justify-between relative border-white/5">
                <div className="absolute top-6 right-8 text-white/5 pointer-events-none">
                  <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="space-y-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                    ⚡ {test.scale}
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed italic relative z-10 font-medium">
                    "{test.quote}"
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <p className="text-slate-200 font-bold text-sm">{test.author}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Partners Grayscale Logos Row */}
      <section className="py-16 max-w-7xl mx-auto px-6 border-t border-white/5">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cloud Ecosystem Compatibility
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {PORTFOLIO_DATA.partners.map((partner, idx) => (
              <div 
                key={idx} 
                className="text-slate-500 hover:text-cyanNeon transition-all duration-300 font-extrabold text-xl md:text-2xl tracking-widest uppercase cursor-default filter grayscale hover:grayscale-0"
              >
                {partner}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Lead Capture Contact Form */}
      <section id="contact" className="py-24 max-w-5xl mx-auto px-6 border-t border-white/5 relative">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4 space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Let's Build Your Infrastructure
              </h2>
              <p className="text-slate-300 text-xs font-semibold leading-relaxed mt-3">
                📍 {PORTFOLIO_DATA.personal.location}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">
                💼 {PORTFOLIO_DATA.personal.remoteAvailability}
              </p>
              <div className="mt-4 space-y-2 text-xs font-semibold text-slate-300">
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="flex items-center gap-2 hover:text-cyanNeon transition-colors">
                  📧 {PORTFOLIO_DATA.personal.email}
                </a>
                <a href={PORTFOLIO_DATA.personal.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  💬 {PORTFOLIO_DATA.personal.phone} (WhatsApp)
                </a>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-4">
                Submit the form to request a custom estimate, or book your meeting directly using the scheduler:
              </p>
              <button
                onClick={handleOpenScheduler}
                className="mt-3 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyanNeon/50 hover:bg-cyanNeon/10 text-cyanNeon font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2"
              >
                📅 Open Strategy Call Scheduler
              </button>
            </ScrollReveal>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-[10px] font-bold">✓</span>
                <span>24h response guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-[10px] font-bold">✓</span>
                <span>Free 30-min architecture review</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-[10px] font-bold">✓</span>
                <span>No upfront discovery fee</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-[10px] font-bold">✓</span>
                <span>NDAs signed before call</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <ScrollReveal delay={150}>
              <ContactForm onSubmitSuccess={handleFormSubmitSuccess} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyanNeon to-blueElectric flex items-center justify-center font-bold text-white text-sm">
                RP
              </div>
              <span className="font-bold text-white">{PORTFOLIO_DATA.personal.name}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise-grade backend pipelines coupled with lightweight, fast Web/Mobile frontends. Cost-centric deployments guaranteed.
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">Availability</h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-400">📍 {PORTFOLIO_DATA.personal.location}</p>
              <p className="text-slate-400">🌍 {PORTFOLIO_DATA.personal.remoteAvailability}</p>
              <p className="text-emerald-400 font-semibold">Available for freelance contracts</p>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <a href="#services" className="hover:text-cyanNeon transition-colors">Developer Services</a>
              <a href="#strategy" className="hover:text-cyanNeon transition-colors">Infrastructure Strategy</a>
              <a href="#projects" className="hover:text-cyanNeon transition-colors">Reference Builds</a>
              <a href="#calculator" className="hover:text-cyanNeon transition-colors">Cloud Budget Tool</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider mb-2">Connect</h4>
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-slate-300 hover:text-cyanNeon text-sm font-bold block transition-colors">
              📧 {PORTFOLIO_DATA.personal.email}
            </a>
            <a href={PORTFOLIO_DATA.personal.whatsapp} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-emerald-400 text-sm font-bold block transition-colors">
              💬 {PORTFOLIO_DATA.personal.phone} (WhatsApp)
            </a>
            
            <div className="flex gap-4 pt-2">
              <a href={PORTFOLIO_DATA.personal.github} className="text-slate-500 hover:text-cyanNeon transition-colors" title="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={PORTFOLIO_DATA.personal.linkedin} className="text-slate-500 hover:text-cyanNeon transition-colors" title="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={PORTFOLIO_DATA.personal.twitter} className="text-slate-500 hover:text-cyanNeon transition-colors" title="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-slate-500">
          <span>© 2026 {PORTFOLIO_DATA.personal.name}. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Design inspired by SaaS leaders. Engineered for performant cloud distribution.</span>
        </div>
      </footer>

      {/* Floating WhatsApp Chat Button */}
      <a 
        href={PORTFOLIO_DATA.personal.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)] border border-emerald-400/30 hover:scale-110 transition-transform duration-300"
        title="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.516 0 10.007-4.49 10.01-10.014.002-2.674-1.037-5.187-2.927-7.08C16.545 1.617 14.037.58 11.36.577c-5.52 0-10.01 4.49-10.013 10.016a9.917 9.917 0 001.536 5.223L1.87 21.05l5.221-1.37.003-.004.053-.031zm10.748-7.399c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.668.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.15-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>

      {/* Floating Calendly Booking Trigger */}
      <button 
        onClick={handleOpenScheduler}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-cyanNeon to-blueElectric text-white text-sm font-bold shadow-[0_4px_25px_rgba(6,182,212,0.4)] border border-cyanNeon/30 hover:scale-105 transition-transform"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">Schedule Strategy Call</span>
      </button>

      {/* Lead Form Success Modal Overlay */}
      {showFormSuccess && submittedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 rounded-3xl glass-panel text-center border-white/10 relative shadow-2xl animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 text-3xl font-extrabold">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Request Received!</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Thanks, {submittedLead.name}! I'll review your details for the <strong className="text-cyanNeon">{submittedLead.projectType}</strong> and respond within 24 hours with a custom cloud quote.
            </p>
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 mb-6 text-left text-xs text-slate-400 space-y-2">
              <p><strong>Config Suggestion:</strong> {getCalcStats(submittedLead.users === "<1k" ? 500 : submittedLead.users === "1k-10k" ? 5000 : 25000).setup}</p>
            </div>
            <button
              onClick={() => {
                setShowFormSuccess(false);
                setSubmittedLead(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyanNeon to-blueElectric text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Calendly Booking strategy call Modal Overlay */}
      {showScheduler && (
        <SchedulerModal 
          personal={PORTFOLIO_DATA.personal} 
          onClose={() => setShowScheduler(false)} 
        />
      )}

      {/* Reference Sandbox Live Emulator Modal Overlay */}
      {demoProject && (
        <SimulatorModal 
          project={demoProject} 
          onClose={() => setDemoProject(null)} 
        />
      )}

    </div>
  );
}
