import ScrollReveal from '../common/ScrollReveal';

const SUMMARY_STATS = [
  { key: 'experience', kicker: 'Professional', label: 'Industry Experience' },
  { key: 'projects', kicker: 'Delivered Systems', label: 'Production Deployments' },
  { key: 'clients', kicker: 'Happy Partners', label: 'Clients Worldwide' },
  { key: 'rating', kicker: 'Average Rating', label: 'Verified Feedbacks' }
];

export default function WhyChooseMeSection({ personal, reasons }) {
  return (
    <section id="why-me" className="py-24 max-w-7xl mx-auto px-6 border-t border-neutral-200">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
              Why Startups Choose Me to Scale
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mt-4">
              I deliver architectural depth. Your deployment is planned for costs and optimized for load-spikes before the first line of code goes live.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {SUMMARY_STATS.map((stat, index) => (
              <ScrollReveal key={stat.key} delay={(index + 1) * 50}>
                <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm space-y-1">
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">{stat.kicker}</span>
                  <span className="text-2xl font-extrabold text-black block">{personal.stats[stat.key]}</span>
                  <span className="text-xs text-neutral-600 block">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
          {reasons.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3 hover:border-neutral-400/60 transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-black">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-black">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
