import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';
import ScrollReveal from '../../ui/ScrollReveal';

export default function ServicesSection() {
  // State definitions for Simulator 1: Web Applications
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [pageSpeedTesting, setPageSpeedTesting] = useState(false);
  const [perfScore, setPerfScore] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  const [accScore, setAccScore] = useState(0);

  const startPageSpeedTest = () => {
    if (pageSpeedTesting) return;
    setPageSpeedTesting(true);
    setPerfScore(0);
    setSeoScore(0);
    setAccScore(0);
    
    let currentPerf = 0;
    let currentSeo = 0;
    let currentAcc = 0;

    const timer = setInterval(() => {
      let done = true;
      if (currentPerf < 100) {
        currentPerf += Math.floor(Math.random() * 8) + 4;
        if (currentPerf >= 100) currentPerf = 100;
        setPerfScore(currentPerf);
        done = false;
      }
      if (currentSeo < 100) {
        currentSeo += Math.floor(Math.random() * 10) + 5;
        if (currentSeo >= 100) currentSeo = 100;
        setSeoScore(currentSeo);
        done = false;
      }
      if (currentAcc < 100) {
        currentAcc += Math.floor(Math.random() * 9) + 4;
        if (currentAcc >= 100) currentAcc = 100;
        setAccScore(currentAcc);
        done = false;
      }

      if (done) {
        clearInterval(timer);
        setPageSpeedTesting(false);
      }
    }, 80);
  };

  // Trigger page speed audit once automatically when mounted
  useEffect(() => {
    startPageSpeedTest();
  }, []);

  // State definitions for Simulator 2: Mobile Apps (Offline Caching & Data Sync)
  const [isNetworkOnline, setIsNetworkOnline] = useState(true);
  const [offlineTasks, setOfflineTasks] = useState([
    { id: 1, title: 'Process customer lunch order #412', status: 'completed' },
    { id: 2, title: 'Map dispatch route for active driver', status: 'completed' },
  ]);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState('');

  const handleToggleTask = (id) => {
    setOfflineTasks(prev => 
      prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
          if (!isNetworkOnline) {
            setPendingSyncCount(c => c + 1);
            setSyncFeedback('Saved locally! Sync pending restore...');
            setTimeout(() => setSyncFeedback(''), 2500);
          } else {
            setSyncFeedback('Saved directly to cloud in 32ms! ⚡');
            setTimeout(() => setSyncFeedback(''), 2000);
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: Date.now(),
      title: `Consultation record #${offlineTasks.length + 1}`,
      status: 'pending'
    };
    setOfflineTasks(prev => [...prev, newTask]);
    if (!isNetworkOnline) {
      setPendingSyncCount(c => c + 1);
      setSyncFeedback('Internet lost: Saved securely to device memory.');
    } else {
      setSyncFeedback('Stored in cloud database! ⚡');
    }
    setTimeout(() => setSyncFeedback(''), 2500);
  };

  const handleToggleNetwork = () => {
    const nextNetwork = !isNetworkOnline;
    setIsNetworkOnline(nextNetwork);
    if (nextNetwork && pendingSyncCount > 0) {
      setIsSyncing(true);
      setSyncFeedback('Restoring network: Syncing data queue with cloud server...');
      setTimeout(() => {
        setIsSyncing(false);
        setPendingSyncCount(0);
        setSyncFeedback('Sync complete! All local database changes successfully backed up. ✅');
        setTimeout(() => setSyncFeedback(''), 3000);
      }, 1500);
    } else {
      setSyncFeedback(nextNetwork ? 'System connected online' : 'Offline Mode: Local backup storage activated.');
      setTimeout(() => setSyncFeedback(''), 2500);
    }
  };

  // State definitions for Simulator 3: Secure Systems & APIs
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/v1/auth/login');
  const [apiResponse, setApiResponse] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiLatency, setApiLatency] = useState(0);
  const [showJsonDump, setShowJsonDump] = useState(false);

  const getEndpointPayload = (path) => {
    switch (path) {
      case '/api/v1/auth/login':
        return {
          status: "success",
          message: "Secure login verified",
          session: { valid: "Yes (24 Hours)", encrypted: "AES-256", tokenType: "Bearer Key" },
          user: { id: "usr_client", role: "Owner" }
        };
      case '/api/v1/user/profile':
        return {
          status: "success",
          message: "Account verified",
          data: {
            name: "Rajeev's Client",
            tier: "Enterprise Tier",
            limits: "Unlimited active data streams"
          }
        };
      case '/api/v1/cache/purge':
        return {
          status: "success",
          action: "SPEED_CACHE_REFRESH",
          freedRAM: "48.2 MB",
          speedIncrease: "3x query load speed",
          statusMessage: "System cleared safely"
        };
      default:
        return { error: "Unknown endpoint path" };
    }
  };

  const handleExecuteApi = () => {
    setApiLoading(true);
    setApiResponse(null);
    setShowJsonDump(false);
    const mockLatency = Math.floor(Math.random() * 8) + 6;

    setTimeout(() => {
      setApiLatency(mockLatency);
      setApiResponse(getEndpointPayload(selectedEndpoint));
      setApiLoading(false);
    }, 700);
  };

  // State definitions for Simulator 4: Cloud Infrastructure & Autoscaler
  const [trafficLoad, setTrafficLoad] = useState(25000);
  const activePodsCount = trafficLoad < 15000 ? 1 : trafficLoad < 60000 ? 2 : 3;
  const traditionalCost = 450;
  const optimizedCost = Number(15 + (trafficLoad / 1000) * 1.25).toFixed(2);
  const savingsPct = Math.round(((traditionalCost - optimizedCost) / traditionalCost) * 100);

  // References and scroll pinning stacking calculations
  const trackRef = useRef(null);
  const cardRef0 = useRef(null);
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Monitor resize state
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor scroll state and compute active index
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      const element = trackRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      const progress = Math.min(Math.max(scrolled / scrollableDist, 0), 1);
      
      // Divide progress into discrete activation thresholds:
      // Card 0: 0.0 -> 0.25
      // Card 1: 0.25 -> 0.55
      // Card 2: 0.55 -> 0.85
      // Card 3: 0.85 -> 1.0 (remains stuck and fully active at end of runway)
      let idx = 0;
      if (progress < 0.25) idx = 0;
      else if (progress < 0.55) idx = 1;
      else if (progress < 0.85) idx = 2;
      else idx = 3;

      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate clean, hardware-accelerated inline styles based on index
  const getCardStyles = (idx) => {
    if (windowWidth < 1024) {
      return {
        opacity: 1,
        transform: 'none',
        zIndex: 10,
        pointerEvents: 'auto'
      };
    }

    const isActive = idx === activeIndex;
    const isPast = idx < activeIndex;

    if (isActive) {
      return {
        opacity: 1,
        transform: 'scale(1) translateY(0px)',
        zIndex: 30,
        pointerEvents: 'auto'
      };
    } else if (isPast) {
      // Smoothly slides up slightly and fades away
      return {
        opacity: 0,
        transform: 'scale(0.95) translateY(-50px)',
        zIndex: 10,
        pointerEvents: 'none'
      };
    } else {
      // Renders below, ready to slide up
      return {
        opacity: 0,
        transform: 'scale(0.97) translateY(140px)',
        zIndex: 20,
        pointerEvents: 'none'
      };
    }
  };

  return (
    /* Parent track container defining pinned scroll depth (360vh provides excellent scroll buffer) */
    <section ref={trackRef} id="services" className="relative lg:h-[360vh] bg-transparent border-t border-neutral-200 text-black scroll-mt-20">
      
      {/* Pinned Sticky container locking the screen viewport (slate body color prevents white page flash) */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#f5f5f7] py-16 lg:py-0">
        
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10 shrink-0 px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-3 tracking-tight">
              Services I Offer
            </h2>
            <p className="text-neutral-600 text-sm md:text-lg">
              Robust architectures, fluid animations, dynamic data layer tuning, and cloud-native solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Absolute Window Overlay Stack */}
        <div className="relative w-full max-w-7xl px-6 min-h-[580px] lg:h-[70vh] flex flex-col lg:block">
          
          {/* WINDOW 0: Web Applications */}
          <div 
            ref={cardRef0}
            className="relative lg:absolute lg:inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-out origin-center mb-12 lg:mb-0"
            style={getCardStyles(0)}
          >
            <div className="w-full h-full bg-white rounded-2xl border border-neutral-300 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
              {/* Header Title Bar */}
              <div className="bg-[#1e1e2e] text-[#a6adc8] px-4 py-3 flex items-center justify-between border-b border-black select-none shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
                </div>
                <div className="text-xs md:text-sm font-semibold text-[#cdd6f4] bg-black/35 px-3 py-1 rounded-md">
                  💼 Business Center / Services / Web Applications
                </div>
                <div className="w-14" />
              </div>

              {/* Main Content Pane */}
              <div className="p-6 md:p-8 flex-grow grid lg:grid-cols-12 gap-8 items-center bg-[#fafafa] overflow-y-auto">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#89b4fa] flex items-center justify-center text-white shadow">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900">
                      {PORTFOLIO_DATA.services[0].title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                    {PORTFOLIO_DATA.services[0].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PORTFOLIO_DATA.services[0].tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-neutral-100 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-neutral-200 text-xs font-bold text-neutral-700">
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Fast load times & conversion optimized</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Looks stunning on phones, tablets & desktops</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Built with modern Google SEO best practices</div>
                  </div>
                </div>

                <div className="lg:col-span-7 w-full flex items-center justify-center">
                  <div className="w-full max-w-lg flex flex-col gap-3">
                    <div className="w-full rounded-lg border border-neutral-300 bg-white shadow overflow-hidden flex flex-col">
                      <div className="bg-neutral-100 px-3 py-2 flex items-center gap-2 border-b border-neutral-200 select-none">
                        <div className="flex gap-1 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400 text-xs pl-2">
                          <span>◀</span><span>▶</span>
                          <span className="cursor-pointer hover:text-black transition-colors" onClick={startPageSpeedTest}>🔄</span>
                        </div>
                        <div className="flex-grow mx-2 bg-white border border-neutral-200 rounded px-2 py-0.5 text-[10px] text-neutral-500 flex items-center">
                          <span className="truncate text-neutral-600">
                            🔒 https://your-startup.com/dashboard
                          </span>
                        </div>
                        <div className="flex border border-neutral-200 rounded overflow-hidden text-[9px] font-bold shrink-0">
                          <button onClick={() => setDeviceMode('desktop')} className={`px-2 py-0.5 ${deviceMode === 'desktop' ? 'bg-black text-white' : 'bg-white text-neutral-600'}`}>Desktop</button>
                          <button onClick={() => setDeviceMode('mobile')} className={`px-2 py-0.5 ${deviceMode === 'mobile' ? 'bg-black text-white' : 'bg-white text-neutral-600'}`}>Phone</button>
                        </div>
                      </div>
                      <div className="p-3 bg-[#f8f9fa] h-40 overflow-y-auto scrollbar-none flex items-center justify-center">
                        {deviceMode === 'desktop' ? (
                          <div className="w-full space-y-2.5 font-sans">
                            <div className="flex justify-between items-center bg-white p-2 rounded border border-neutral-200 shadow-sm">
                              <div className="text-[11px] font-bold text-neutral-800 font-sans">📊 Your Business Sales Dashboard</div>
                              <div className="text-[9px] text-emerald-600 font-bold">● Active Users: 2,412</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-white p-2 rounded border border-neutral-200 shadow-sm text-center">
                                <div className="text-[7px] text-neutral-500 font-semibold uppercase">Monthly Sales</div>
                                <div className="text-xs font-extrabold text-[#27c93f]">$42,410</div>
                              </div>
                              <div className="bg-white p-2 rounded border border-neutral-200 shadow-sm text-center">
                                <div className="text-[7px] text-neutral-500 font-semibold uppercase">Ratings</div>
                                <div className="text-xs font-extrabold text-[#89b4fa]">4.92 ★</div>
                              </div>
                              <div className="bg-white p-2 rounded border border-neutral-200 shadow-sm text-center">
                                <div className="text-[7px] text-neutral-500 font-semibold uppercase">Load Speed</div>
                                <div className="text-xs font-extrabold text-neutral-900 font-mono">0.32s</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-40 bg-white border border-neutral-200 rounded shadow p-2.5 flex flex-col gap-1.5 font-sans">
                            <div className="flex justify-between items-center pb-1 border-b border-neutral-100">
                              <span className="text-[8px] font-bold text-neutral-800">📱 Mobile Dashboard</span>
                            </div>
                            <div className="bg-neutral-50 p-1 rounded text-center border border-neutral-200">
                              <div className="text-[6px] text-neutral-500 font-bold">Daily Revenue</div>
                              <div className="text-[10px] font-extrabold text-[#27c93f]">$2,412.50</div>
                            </div>
                            <div className="flex gap-1 text-[8px] font-extrabold">
                              <div className="flex-1 bg-neutral-50 p-0.5 rounded text-center border border-neutral-200 text-[#89b4fa]">+124</div>
                              <div className="flex-1 bg-neutral-50 p-0.5 rounded text-center border border-neutral-200 text-[#27c93f]">0.3s</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-neutral-300 p-2.5 shadow-sm flex items-center justify-between gap-3 font-sans">
                      <span className="text-[9px] font-bold text-neutral-500 leading-tight">Google SEO & Speed Test:</span>
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full bg-emerald-50 border border-emerald-500 flex items-center justify-center font-extrabold text-[9px] text-emerald-600">{perfScore || '-'}</div>
                        <div className="relative w-8 h-8 rounded-full bg-emerald-50 border border-emerald-500 flex items-center justify-center font-extrabold text-[9px] text-emerald-600">{seoScore || '-'}</div>
                        <button onClick={startPageSpeedTest} disabled={pageSpeedTesting} className="bg-black hover:bg-neutral-800 text-white font-bold text-[8px] px-2 py-1 rounded shadow select-none shrink-0">{pageSpeedTesting ? 'RUNNING' : 'RUN TEST'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WINDOW 1: Mobile Apps */}
          <div 
            ref={cardRef1}
            className="relative lg:absolute lg:inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-out origin-center mb-12 lg:mb-0"
            style={getCardStyles(1)}
          >
            <div className="w-full h-full bg-white rounded-2xl border border-neutral-300 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
              {/* Header Title Bar */}
              <div className="bg-[#1e1e2e] text-[#a6adc8] px-4 py-3 flex items-center justify-between border-b border-black select-none shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
                </div>
                <div className="text-xs md:text-sm font-semibold text-[#cdd6f4] bg-black/35 px-3 py-1 rounded-md">
                  💼 Business Center / Services / Mobile Applications
                </div>
                <div className="w-14" />
              </div>

              {/* Main Content Pane */}
              <div className="p-6 md:p-8 flex-grow grid lg:grid-cols-12 gap-8 items-center bg-[#fafafa] overflow-y-auto">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#a6e3a1] flex items-center justify-center text-white shadow">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900">
                      {PORTFOLIO_DATA.services[1].title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                    {PORTFOLIO_DATA.services[1].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PORTFOLIO_DATA.services[1].tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-neutral-100 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-neutral-200 text-xs font-bold text-neutral-700">
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Single code base for Apple iOS & Android Stores</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Saves records locally without signal (Offline Mode)</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> High responsiveness & animations matching store standard</div>
                  </div>
                </div>

                <div className="lg:col-span-7 w-full flex items-center justify-center">
                  <div className="w-full max-w-sm flex flex-col gap-3">
                    <div className="relative mx-auto w-48 h-[270px] rounded-[24px] border-4 border-neutral-800 bg-[#f8f9fa] shadow-lg overflow-hidden flex flex-col">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-neutral-800 rounded-b-lg z-20" />
                      <div className="bg-neutral-800 text-white text-[6px] px-4 pt-3.5 pb-0.5 flex justify-between shrink-0 font-mono">
                        <span>09:41 AM</span>
                        <span>{isNetworkOnline ? '📶 Cloud Active' : '⚠️ Offline'}</span>
                      </div>
                      <div className="p-2.5 flex-grow flex flex-col justify-between h-full bg-neutral-50 font-sans select-none text-[8px]">
                        <div className="flex justify-between items-center pb-1 border-b border-neutral-200 font-extrabold text-neutral-800">
                          <span>📦 Customer dispatch</span>
                          <span className={`px-1 py-0.2 rounded font-bold ${isNetworkOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>{isNetworkOnline ? 'CONNECTED' : 'LOCAL BACKUP'}</span>
                        </div>
                        <div className="flex-grow py-1 space-y-1 overflow-y-auto scrollbar-none">
                          {offlineTasks.map((t) => (
                            <div key={t.id} onClick={() => handleToggleTask(t.id)} className={`p-1.5 rounded border text-[7px] cursor-pointer flex items-center justify-between ${t.status === 'completed' ? 'bg-neutral-100 text-neutral-400 line-through' : 'bg-white text-neutral-700 font-bold border-neutral-300'}`}>
                              <span className="truncate max-w-[80%]">{t.title}</span>
                              <span>{t.status === 'completed' ? '✓' : '⏳'}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-1 shrink-0">
                          {pendingSyncCount > 0 && <div className="text-[6px] font-bold text-amber-700 bg-amber-50 rounded text-center py-0.5 animate-pulse">⚠️ Phone database: {pendingSyncCount} changes waiting to back up</div>}
                          <button onClick={handleAddNewTask} className="w-full bg-black text-white text-[7px] font-bold py-1 rounded shadow">+ Add Record</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-neutral-300 p-2.5 shadow-sm flex items-center justify-between gap-3 font-sans">
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                        <input type="checkbox" checked={isNetworkOnline} onChange={handleToggleNetwork} className="sr-only peer" />
                        <div className="w-7 h-3.5 bg-neutral-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:bg-emerald-500" />
                        <span className="ml-2 text-[9px] font-bold text-neutral-700">Cell Signal</span>
                      </label>
                      <div className="text-[8px] font-mono text-neutral-500 truncate flex items-center gap-1">
                        {isSyncing && <span className="w-2 h-2 border border-emerald-500 border-t-transparent rounded-full animate-spin shrink-0" />}
                        <span className={syncFeedback ? 'text-black font-bold' : 'text-neutral-400'}>{syncFeedback || (isNetworkOnline ? 'Cloud active' : 'Offline local backup')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WINDOW 2: Secure Systems & APIs */}
          <div 
            ref={cardRef2}
            className="relative lg:absolute lg:inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-out origin-center mb-12 lg:mb-0"
            style={getCardStyles(2)}
          >
            <div className="w-full h-full bg-white rounded-2xl border border-neutral-300 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
              {/* Header Title Bar */}
              <div className="bg-[#1e1e2e] text-[#a6adc8] px-4 py-3 flex items-center justify-between border-b border-black select-none shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
                </div>
                <div className="text-xs md:text-sm font-semibold text-[#cdd6f4] bg-black/35 px-3 py-1 rounded-md">
                  💼 Business Center / Services / Secure Systems & APIs
                </div>
                <div className="w-14" />
              </div>

              {/* Main Content Pane */}
              <div className="p-6 md:p-8 flex-grow grid lg:grid-cols-12 gap-8 items-center bg-[#fafafa] overflow-y-auto">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f9e2af] flex items-center justify-center text-white shadow">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900">
                      {PORTFOLIO_DATA.services[2].title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                    {PORTFOLIO_DATA.services[2].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PORTFOLIO_DATA.services[2].tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-neutral-100 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-neutral-200 text-xs font-bold text-neutral-700">
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Encrypted cryptographic login verification standards</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Ultra-fast data search speeds (sub-15 milliseconds)</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Safe automatic integrations that prevent server memory leaks</div>
                  </div>
                </div>

                <div className="lg:col-span-7 w-full flex items-center justify-center">
                  <div className="w-full max-w-lg flex flex-col gap-3 font-sans">
                    <div className="w-full rounded-lg border border-neutral-300 bg-white shadow overflow-hidden flex flex-col">
                      <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200 flex justify-between text-neutral-600 text-[10px] font-bold">
                        <span>🛡️ System Security Gateway Sandbox</span>
                        <span className="bg-neutral-200 text-neutral-600 px-1 py-0.2 rounded text-[8px]">AES-256</span>
                      </div>
                      <div className="p-3 bg-[#fafafa] border-b border-neutral-200 flex items-center gap-2 text-[9px]">
                        <select value={selectedEndpoint} onChange={(e) => { setSelectedEndpoint(e.target.value); setApiResponse(null); setShowJsonDump(false); }} className="flex-grow bg-white border border-neutral-300 rounded px-2 py-1 text-neutral-700 focus:outline-none focus:border-black font-semibold font-sans">
                          <option value="/api/v1/auth/login">🛡️ Secure Account Login Verification</option>
                          <option value="/api/v1/user/profile">👤 Authenticate Customer Profile</option>
                          <option value="/api/v1/cache/purge">⚡ System Performance Cache Clean</option>
                        </select>
                        <button onClick={handleExecuteApi} disabled={apiLoading} className="bg-black hover:bg-neutral-800 text-white font-bold px-3 py-1.5 rounded shadow shrink-0 select-none">{apiLoading ? 'TESTING' : 'TEST GATEWAY ⚡'}</button>
                      </div>
                      <div className="p-4 bg-[#f8f9fa] h-32 relative flex items-center justify-center border-b border-neutral-200 select-none">
                        {apiLoading && (
                          <div className="absolute inset-0 bg-[#f8f9fa]/90 flex items-center justify-center z-10 text-[9px] text-neutral-500 font-bold flex-col gap-1">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Verifying data...</span>
                          </div>
                        )}
                        {apiResponse ? (
                          <div className="bg-white border border-emerald-250 p-3 rounded-lg shadow-sm flex gap-3 text-[9px] max-w-xs text-neutral-750">
                            <span className="text-base shrink-0">🛡️</span>
                            <div className="space-y-0.5">
                              <div className="font-extrabold text-emerald-700">✓ Security Validation Successful!</div>
                              <div className="grid grid-cols-2 gap-x-2 pt-0.5 border-t border-neutral-100 font-semibold font-sans">
                                <span className="text-neutral-400">Latency:</span>
                                <span className="font-bold text-emerald-600 font-mono">{apiLatency}ms (Instant)</span>
                                <span className="text-neutral-400">Response:</span>
                                <span className="font-bold truncate max-w-[90px]">{apiResponse.message || apiResponse.action}</span>
                              </div>
                            </div>
                          </div>
                        ) : !apiLoading && (
                          <div className="text-neutral-400 text-center py-4 italic text-[10px] font-semibold">Click "TEST GATEWAY" above to trigger security check.</div>
                        )}
                      </div>
                      {apiResponse && !apiLoading && (
                        <div className="bg-neutral-50 px-4 py-1.5 flex flex-col">
                          <div className="flex justify-between text-[7px] text-neutral-400 font-bold uppercase">
                            <span>Diagnostics</span>
                            <button onClick={() => setShowJsonDump(!showJsonDump)} className="text-neutral-600 hover:text-black underline font-bold">{showJsonDump ? 'Hide JSON' : 'Show JSON'}</button>
                          </div>
                          {showJsonDump && (
                            <pre className="mt-1 p-2 bg-[#1e1e2e] text-[#cdd6f4] rounded text-[8px] font-mono leading-relaxed select-text overflow-x-auto max-h-20">{JSON.stringify(apiResponse, null, 2)}</pre>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WINDOW 3: Smart Server Scaling */}
          <div 
            ref={cardRef3}
            className="relative lg:absolute lg:inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-out origin-center mb-12 lg:mb-0"
            style={getCardStyles(3)}
          >
            <div className="w-full h-full bg-white rounded-2xl border border-neutral-300 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
              {/* Header Title Bar */}
              <div className="bg-[#1e1e2e] text-[#a6adc8] px-4 py-3 flex items-center justify-between border-b border-black select-none shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer" />
                </div>
                <div className="text-xs md:text-sm font-semibold text-[#cdd6f4] bg-black/35 px-3 py-1 rounded-md">
                  💼 Business Center / Services / Smart Server Scaling
                </div>
                <div className="w-14" />
              </div>

              {/* Main Content Pane */}
              <div className="p-6 md:p-8 flex-grow grid lg:grid-cols-12 gap-8 items-center bg-[#fafafa] overflow-y-auto">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#cba6f7] flex items-center justify-center text-white shadow">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900">
                      {PORTFOLIO_DATA.services[3].title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                    {PORTFOLIO_DATA.services[3].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PORTFOLIO_DATA.services[3].tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-neutral-100 border border-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-neutral-200 text-xs font-bold text-neutral-700">
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Saves up to 80% on monthly hosting bills</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Scales up automatically during visitor spikes to prevent crashes</div>
                    <div className="flex items-center gap-2"><span className="text-[#a6e3a1] text-base">✓</span> Includes secure automated recovery backups every day</div>
                  </div>
                </div>

                <div className="lg:col-span-7 w-full flex items-center justify-center">
                  <div className="w-full max-w-lg flex flex-col gap-3 font-sans text-xs">
                    <div className="bg-white rounded-lg border border-neutral-300 p-3 shadow-sm select-none">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[#cba6f7]/15 border-2 border-[#cba6f7] flex items-center justify-center text-base shadow-sm">🔀</div>
                          <span className="text-[8px] font-extrabold text-neutral-700 mt-1 font-sans">Smart Traffic director</span>
                        </div>
                        <div className="flex gap-2 items-center justify-center flex-wrap">
                          <div className="w-16 border border-[#27c93f] bg-emerald-50/50 p-1.5 rounded flex flex-col items-center gap-0.5 text-center">
                            <span className="text-sm">🖥️</span>
                            <span className="text-[7px] font-extrabold text-emerald-800">Server A</span>
                            <span className="text-[5px] bg-[#27c93f]/20 text-emerald-700 px-1 rounded font-bold">Active</span>
                          </div>
                          <div className={`w-16 border p-1.5 rounded flex flex-col items-center gap-0.5 text-center transition-all ${activePodsCount >= 2 ? 'border-[#27c93f] bg-emerald-50/50 opacity-100' : 'border-neutral-200 bg-neutral-50 opacity-40'}`}>
                            <span className="text-sm">🖥️</span>
                            <span className="text-[7px] font-extrabold">{activePodsCount >= 2 ? 'Server B' : 'Server B'}</span>
                            <span className={`text-[5px] px-1 rounded font-extrabold ${activePodsCount >= 2 ? 'bg-[#27c93f]/20 text-emerald-700 animate-pulse' : 'bg-neutral-200 text-neutral-500'}`}>{activePodsCount >= 2 ? 'Scaled' : 'Asleep'}</span>
                          </div>
                          <div className={`w-16 border p-1.5 rounded flex flex-col items-center gap-0.5 text-center transition-all ${activePodsCount >= 3 ? 'border-[#27c93f] bg-emerald-50/50 opacity-100' : 'border-neutral-200 bg-neutral-50 opacity-40'}`}>
                            <span className="text-sm">🖥️</span>
                            <span className="text-[7px] font-extrabold">{activePodsCount >= 3 ? 'Server C' : 'Server C'}</span>
                            <span className={`text-[5px] px-1 rounded font-extrabold ${activePodsCount >= 3 ? 'bg-[#27c93f]/20 text-emerald-700 animate-pulse' : 'bg-neutral-200 text-neutral-500'}`}>{activePodsCount >= 3 ? 'Scaled' : 'Asleep'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2.5 flex flex-col gap-1 font-sans">
                        <div className="flex justify-between items-center text-[9px] font-bold text-neutral-700">
                          <span>Simulate Traffic Load:</span>
                          <span className="bg-black text-white px-2 py-0.5 rounded font-mono font-bold">{trafficLoad.toLocaleString()} visitors</span>
                        </div>
                        <input type="range" min="1000" max="100000" step="5000" value={trafficLoad} onChange={(e) => setTrafficLoad(Number(e.target.value))} className="w-full accent-black cursor-pointer bg-neutral-200 h-1 rounded" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[9px] font-sans">
                      <div className="bg-white rounded-lg border border-neutral-300 p-2.5 shadow-sm flex flex-col justify-between">
                        <span className="font-bold text-neutral-400 uppercase text-[7px] tracking-wide">Monthly Server Bill</span>
                        <div className="flex justify-between text-neutral-600 font-bold mt-1"><span>Fixed Rigs:</span><span className="text-rose-600 line-through font-mono">${traditionalCost}/mo</span></div>
                        <div className="flex justify-between text-neutral-800 font-extrabold"><span>Smart Scaled:</span><span className="text-[#27c93f] font-mono font-bold">${optimizedCost}/mo</span></div>
                      </div>
                      <div className="bg-[#27c93f]/10 border border-[#27c93f]/40 rounded-lg p-2.5 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#1aab29] uppercase text-[7px]">Dynamic Cost Savings</span>
                          <div className="font-extrabold text-neutral-800 mt-0.5">Budget Saved: {savingsPct}%</div>
                        </div>
                        <span className="text-xl">📉</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
