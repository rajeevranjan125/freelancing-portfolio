import React, { useState, useEffect } from 'react';

export default function SimulatorModal({ project, onClose }) {
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoLogs, setDemoLogs] = useState([]);
  const [demoActiveUsers, setDemoActiveUsers] = useState(0);
  const [demoMetricSec, setDemoMetricSec] = useState(0);

  useEffect(() => {
    if (!project) return;
    setDemoLoading(true);
    setDemoLogs([
      "[SYSTEM] Allocating virtualization container...",
      "[SYSTEM] Connecting to mock database shard...",
      "[SYSTEM] Injecting Spring Security JWT headers..."
    ]);
    setDemoActiveUsers(parseInt(project.users.replace(/[^0-9]/g, '')) || 100);
    setDemoMetricSec(12);

    const t1 = setTimeout(() => {
      setDemoLoading(false);
      setDemoLogs(prev => [
        ...prev,
        "[OK] Container successfully bootloaded.",
        `[APP] Listening on Port 8080. Deployed on ${project.cloud}.`,
        "[DATABASE] Connection Pool verified: Max 50 active connections."
      ]);
    }, 1500);

    const interval = setInterval(() => {
      const msgs = [
        `[GET] /api/v1/resource - Status 200 - JWT Auth OK (User scale: ${Math.round(Math.random() * 100 + 10)} req/s)`,
        `[SQL] SELECT * FROM users WHERE status = 'ACTIVE' LIMIT 20 - Execution: ${Math.round(Math.random() * 5 + 1)}ms (Index Hit)`,
        `[WEBSOCKET] PING client_id_${Math.floor(Math.random()*1000)} - RTT: ${Math.floor(Math.random()*40 + 5)}ms`,
        `[HEALTH] Memory usage: ${Math.floor(Math.random()*15 + 40)}% | CPU load: ${Math.floor(Math.random()*10 + 5)}%`,
        `[CLOUD] Request routed via ALB container IP 10.0.12.${Math.floor(Math.random()*254)}`
      ];
      setDemoLogs(prev => {
        const next = [...prev, msgs[Math.floor(Math.random() * msgs.length)]];
        if (next.length > 8) next.shift();
        return next;
      });
      setDemoActiveUsers(prev => Math.round(prev + (Math.random() * 4 - 2)));
      setDemoMetricSec(prev => Math.floor(Math.random() * 6 + 8));
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [project]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-4xl h-[620px] rounded-3xl glass-panel border-white/10 overflow-hidden shadow-2xl flex flex-col relative animate-scale-in">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>
            <span className="text-slate-400 text-xs font-bold ml-2">Virtual Sandbox Sandbox-V1 • {project.title}</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors"
          >
            Close Simulator
          </button>
        </div>

        {/* Simulation Screen body */}
        <div className="flex-grow grid md:grid-cols-12 overflow-hidden bg-darkBg text-slate-300">
          
          {/* Left Column: Mock App Screen representation */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between border-r border-white/5 bg-slate-950/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase bg-cyanNeon/10 text-cyanNeon px-2.5 py-1 rounded-md">
                  Live UI Emulator
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute"></span>
                  <span className="ml-5">System Operational</span>
                </div>
              </div>

              {/* Representation content of the app */}
              <div className="border border-white/10 rounded-2xl p-6 bg-slate-900/60 relative overflow-hidden h-[340px] flex flex-col justify-between">
                
                {/* Mock graphic for App UI */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Mock Application Title</span>
                    <h4 className="text-white font-extrabold text-lg mt-0.5">{project.title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Scale Threshold</span>
                    <span className="text-cyanNeon font-bold text-xs block mt-0.5">{project.users}</span>
                  </div>
                </div>

                {/* Interactive UI display details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-slate-950/80 border border-white/5 rounded-xl text-center">
                      <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">Active Users</span>
                      <span className="text-sm font-extrabold text-white block mt-0.5 font-mono">
                        {demoLoading ? "Connecting..." : demoActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950/80 border border-white/5 rounded-xl text-center">
                      <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">API Latency</span>
                      <span className="text-sm font-extrabold text-emerald-400 block mt-0.5 font-mono">
                        {demoLoading ? "Calculating..." : `${demoMetricSec}ms`}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950/80 border border-white/5 rounded-xl text-center">
                      <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">Error Rate</span>
                      <span className="text-sm font-extrabold text-white block mt-0.5 font-mono">0.00%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-xs flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyanNeon"></span>
                      <span className="text-slate-300">MySQL Connection Status:</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">POOL OK (Active: 14)</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 text-center">
                  Simulating production metrics of live server container on {project.cloud}.
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 mt-4 leading-relaxed">
              This represents the active, load-tested baseline of {project.title}. The underlying Java Spring Boot API holds a performance profile capable of handling 5x typical loads.
            </div>
          </div>

          {/* Right Column: Console logs output (Dev logs) */}
          <div className="md:col-span-5 p-6 bg-slate-950 flex flex-col justify-between font-mono text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">API Container Log Feed</span>
              
              <div className="space-y-3 max-h-[420px] overflow-y-auto">
                {demoLogs.map((log, lIdx) => (
                  <div 
                    key={lIdx} 
                    className={`leading-relaxed break-all ${
                      log.startsWith('[SYSTEM]') 
                        ? 'text-blueElectric' 
                        : log.startsWith('[OK]') || log.includes('POOL OK')
                          ? 'text-emerald-400'
                          : log.startsWith('[SQL]')
                            ? 'text-purpleSubtle'
                            : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {demoLoading && (
                  <div className="text-cyanNeon animate-pulse">
                    [LOADING] Connecting virtual sockets...
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <button
                onClick={() => {
                  setDemoLogs(prev => [...prev, `[USER_ACTION] Triggered custom health audit at timestamp ${Date.now()}`]);
                }}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg text-center transition-colors border border-white/5"
              >
                Trigger Event
              </button>
              <button
                onClick={() => {
                  setDemoLogs([`[SYSTEM] Clear logs trigger called.`, `[APP] Re-initialised monitoring.`]);
                }}
                className="py-2 px-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg text-center transition-colors border border-white/5"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
