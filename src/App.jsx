import { useState } from 'react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import FloatingContactActions from './components/layout/FloatingContactActions';
import HeroSection from './components/sections/HeroSection';
import CloudStrategySection from './components/sections/CloudStrategySection';
import CloudCostCalculatorSection from './components/sections/CloudCostCalculatorSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import WhyChooseMeSection from './components/sections/WhyChooseMeSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import PartnersSection from './components/sections/PartnersSection';
import SchedulerModal from './components/modals/SchedulerModal';
import SimulatorModal from './components/modals/SimulatorModal';

export default function App() {
  const [showScheduler, setShowScheduler] = useState(false);
  const [demoProject, setDemoProject] = useState(null);

  const handleOpenScheduler = () => {
    if (PORTFOLIO_DATA.personal.calendly) {
      window.open(PORTFOLIO_DATA.personal.calendly, '_blank');
      return;
    }

    setShowScheduler(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f5f7] overflow-x-hidden selection:bg-neutral-200">
      <SiteHeader
        personal={PORTFOLIO_DATA.personal}
        onOpenScheduler={handleOpenScheduler}
      />

      <main>
        <HeroSection
          hero={PORTFOLIO_DATA.hero}
          personal={PORTFOLIO_DATA.personal}
          onOpenScheduler={handleOpenScheduler}
        />
        <CloudStrategySection strategy={PORTFOLIO_DATA.cloudStrategy} />
        <CloudCostCalculatorSection />
        <ServicesSection services={PORTFOLIO_DATA.services} />
        <ProjectsSection
          projects={PORTFOLIO_DATA.projects}
          onOpenDemo={setDemoProject}
        />
        <WhyChooseMeSection
          personal={PORTFOLIO_DATA.personal}
          reasons={PORTFOLIO_DATA.whyChooseMe}
        />
        <TestimonialsSection testimonials={PORTFOLIO_DATA.testimonials} />
        <PartnersSection partners={PORTFOLIO_DATA.partners} />
      </main>

      <SiteFooter personal={PORTFOLIO_DATA.personal} />
      <FloatingContactActions
        personal={PORTFOLIO_DATA.personal}
        onOpenScheduler={handleOpenScheduler}
      />

      {showScheduler && (
        <SchedulerModal
          personal={PORTFOLIO_DATA.personal}
          onClose={() => setShowScheduler(false)}
        />
      )}

      {demoProject && (
        <SimulatorModal
          project={demoProject}
          onClose={() => setDemoProject(null)}
        />
      )}
    </div>
  );
}
