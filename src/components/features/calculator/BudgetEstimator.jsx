import React, { useState } from 'react';
import ScrollReveal from '../../ui/ScrollReveal';

export default function BudgetEstimator() {
  const [calcUsers, setCalcUsers] = useState(2500);

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

  return (
    <section id="calculator" className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200 text-black scroll-mt-20">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Interactive Cloud Budget Estimator
          </h2>
          <p className="text-neutral-600 text-lg">
            Slide to adjust your estimated active monthly users and see my recommended, cost-optimized deployment architecture.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="max-w-4xl mx-auto p-6 md:p-10 rounded-3xl border border-neutral-200/80 shadow-md bg-white relative overflow-hidden text-left">
          
          <div className="relative grid md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-slate-800 font-bold text-lg">Target Active Users:</label>
                <span className="text-3xl font-extrabold text-indigo-600 font-mono">
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none accent-indigo-600"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 uppercase tracking-wider select-none">
                <span>100 Users</span>
                <span className="hidden sm:inline">10K</span>
                <span>25K Users</span>
                <span className="hidden sm:inline">50K</span>
                <span>75K</span>
                <span>100K+ Users</span>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-sm">
                <h4 className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">Recommended Setup</h4>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">{calcInfo.setup}</p>
              </div>
            </div>

            <div className="md:col-span-5 p-6 rounded-2xl bg-white border border-neutral-200 space-y-6 relative text-black shadow-sm">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded">
                  {calcInfo.tier}
                </span>
                <h4 className="text-neutral-500 text-xs font-bold uppercase tracking-wider mt-5">Estimated Cloud Bill</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-black font-mono">{calcInfo.cost}</span>
                </div>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-neutral-200">
                <div>
                  <span className="text-xs text-neutral-500 block">Suggested Provider:</span>
                  <span className="text-sm font-bold text-neutral-800">{calcInfo.provider}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block">Why this configuration:</span>
                  <span className="text-xs text-neutral-600 leading-relaxed block mt-0.5">{calcInfo.why}</span>
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-sm">
                  ⚡
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block">Projected Savings</span>
                  <span className="text-sm font-bold text-emerald-600 block mt-0.5">{calcInfo.savings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
