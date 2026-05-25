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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[90vh] md:h-[620px] rounded-3xl glass-panel border-neutral-200 overflow-hidden shadow-xl flex flex-col relative animate-scale-in bg-white">
        
        {/* Modal Header */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-neutral-600 flex-shrink-0"></span>
            <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-neutral-400 flex-shrink-0"></span>
            <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-neutral-300 flex-shrink-0"></span>
            <span className="text-neutral-600 text-[10px] sm:text-xs font-bold truncate">Sandbox • {project.title}</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-200 text-[10px] sm:text-xs font-bold transition-colors flex-shrink-0"
          >
            Close Simulator
          </button>
        </div>

        {/* Simulation Screen body */}
        <div className="flex-grow grid md:grid-cols-12 overflow-y-auto md:overflow-hidden bg-white text-black">
          
          {/* Left Column: Mock App Screen representation */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 bg-neutral-50/50 flex-shrink-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase bg-neutral-100 text-black border border-neutral-200 px-2.5 py-1 rounded-md">
                  Live UI Emulator
                </span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-800 font-bold relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 animate-ping"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 absolute"></span>
                  <span className="ml-5">System Operational</span>
                </div>
              </div>

              {/* Representation content of the app */}
              <div className="border border-neutral-200 rounded-2xl p-6 bg-white relative overflow-hidden h-[340px] flex flex-col justify-between">
                
                {/* Mock graphic for App UI */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider block">Mock Application Title</span>
                    <h4 className="text-black font-extrabold text-lg mt-0.5">{project.title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider block">Scale Threshold</span>
                    <span className="text-black font-bold text-xs block mt-0.5">{project.users}</span>
                  </div>
                </div>

                {/* Interactive UI display details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-center">
                      <span className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider block">Active Users</span>
                      <span className="text-sm font-extrabold text-black block mt-0.5 font-mono">
                        {demoLoading ? "Connecting..." : demoActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-center">
                      <span className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider block">API Latency</span>
                      <span className="text-sm font-extrabold text-black block mt-0.5 font-mono">
                        {demoLoading ? "Calculating..." : `${demoMetricSec}ms`}
                      </span>
                    </div>
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-center">
                      <span className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider block">Error Rate</span>
                      <span className="text-sm font-extrabold text-black block mt-0.5 font-mono">0.00%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                      <span className="text-neutral-700">MySQL Connection Status:</span>
                    </div>
                    <span className="font-mono text-black font-bold">POOL OK (Active: 14)</span>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-500 text-center">
                  Simulating production metrics of live server container on {project.cloud}.
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-600 mt-4 leading-relaxed">
              This represents the active, load-tested baseline of {project.title}. The underlying Java Spring Boot API holds a performance profile capable of handling 5x typical loads.
            </div>
          </div>

          {/* Right Column: Console logs output (Dev logs) */}
          <div className="md:col-span-5 p-6 bg-black flex flex-col justify-between font-mono text-xs flex-shrink-0 text-white border-t md:border-t-0 border-neutral-800">
            <div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-4">API Container Log Feed</span>
              
              <div className="space-y-3 max-h-[220px] md:max-h-[420px] overflow-y-auto">
                {demoLogs.map((log, lIdx) => (
                  <div 
                    key={lIdx} 
                    className={`leading-relaxed break-all ${
                      log.startsWith('[SYSTEM]') 
                        ? 'text-white font-bold' 
                        : log.startsWith('[OK]') || log.includes('POOL OK')
                          ? 'text-neutral-300'
                          : log.startsWith('[SQL]')
                            ? 'text-neutral-200'
                            : 'text-neutral-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {demoLoading && (
                  <div className="text-white animate-pulse">
                    [LOADING] Connecting virtual sockets...
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex gap-2">
              <button
                onClick={() => {
                  setDemoLogs(prev => [...prev, `[USER_ACTION] Triggered custom health audit at timestamp ${Date.now()}`]);
                }}
                className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-lg text-center transition-colors border border-neutral-800"
              >
                Trigger Event
              </button>
              <button
                onClick={() => {
                  setDemoLogs([`[SYSTEM] Clear logs trigger called.`, `[APP] Re-initialised monitoring.`]);
                }}
                className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg text-center transition-colors border border-neutral-800"
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
