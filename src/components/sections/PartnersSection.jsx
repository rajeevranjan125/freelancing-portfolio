import ScrollReveal from '../common/ScrollReveal';

export default function PartnersSection({ partners }) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 border-t border-neutral-200">
      <ScrollReveal>
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Cloud Ecosystem Compatibility
          </span>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-neutral-400 hover:text-black transition-all duration-300 font-extrabold text-xl md:text-2xl tracking-widest uppercase cursor-default filter grayscale hover:grayscale-0"
            >
              {partner}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
