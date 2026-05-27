import ScrollReveal from '../common/ScrollReveal';
import TiltCard from '../common/TiltCard';
import ServiceIcon from '../common/ServiceIcon';

export default function ServicesSection({ services }) {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Services I Offer
          </h2>
          <p className="text-neutral-600 text-lg">
            Robust architectures, fluid animations, dynamic data layer tuning, and cloud-native solutions.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ScrollReveal key={service.title} delay={index * 100}>
            <TiltCard className="p-8 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50/50 flex flex-col h-full transition-all duration-300 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 shadow-sm">
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-200">
                {service.tech.map((tech) => (
                  <span key={tech} className="text-[10px] font-semibold bg-neutral-100 border border-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
