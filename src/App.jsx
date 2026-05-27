import React, { useState } from 'react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import Header from './components/common/Header';
import HeroSection from './components/features/hero/HeroSection';
import StrategySection from './components/features/strategy/StrategySection';
import BudgetEstimator from './components/features/calculator/BudgetEstimator';
import ServicesSection from './components/features/services/ServicesSection';
import ProjectsSection from './components/features/projects/ProjectsSection';
import WhyMeSection from './components/features/why-me/WhyMeSection';
import TestimonialsSection from './components/features/testimonials/TestimonialsSection';
import PartnersSection from './components/features/partners/PartnersSection';
import Footer from './components/common/Footer';
import FloatingActions from './components/common/FloatingActions';
import SchedulerModal from './components/modals/SchedulerModal';
import SimulatorModal from './components/modals/SimulatorModal';

export default function App() {
  const [showScheduler, setShowScheduler] = useState(false);
  const [demoProject, setDemoProject] = useState(null);

  const handleOpenScheduler = () => {
    setShowScheduler(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f7] overflow-x-clip selection:bg-neutral-200">
      {/* Header and Navigation */}
      <Header onOpenScheduler={handleOpenScheduler} />

      {/* Hero Presentation */}
      <HeroSection onOpenScheduler={handleOpenScheduler} />

      {/* Cloud Strategy */}
      <StrategySection />

      {/* Interactive Cost Calculator */}
      <BudgetEstimator />

      {/* Services Showcase */}
      <ServicesSection />

      {/* Catalog of Case Studies / Projects */}
      <ProjectsSection onSimulateDemo={(project) => setDemoProject(project)} />

      {/* Qualitative Differentiators / Why Me */}
      <WhyMeSection />

      {/* Founders Feedbacks */}
      <TestimonialsSection />

      {/* Compatible Cloud Partners */}
      <PartnersSection />

      {/* Brand Footer */}
      <Footer />

      {/* Circular floating anchors & widgets */}
      <FloatingActions onOpenScheduler={handleOpenScheduler} />

      {/* Booking Calendar Modal Overlay */}
      {showScheduler && (
        <SchedulerModal 
          personal={PORTFOLIO_DATA.personal} 
          onClose={() => setShowScheduler(false)} 
        />
      )}

      {/* Real-time telemetry Sandbox Simulator Overlay */}
      {demoProject && (
        <SimulatorModal 
          project={demoProject} 
          onClose={() => setDemoProject(null)} 
        />
      )}
    </div>
  );
}
