import { about, identity, site, stats } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import { iconByName } from '../components/Icons';

export default function About() {
  return (
    <section id="about" className="section scroll-mt-24">
      <SectionHeading
        eyebrow="About"
        title="AI that ships — and holds up"
        subtitle={about.lead}
      />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Photo + identity card */}
        <Reveal className="relative">
          <div className="glass relative overflow-hidden rounded-3xl p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo/20 via-panel to-cyan/10">
              {/* Headshot — drop /public/profile.jpg. Falls back to initials art. */}
              <img
                src={site.photo}
                alt="Portrait of Rana Faraz Ahmed"
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-void/80 to-transparent p-5">
                <div>
                  <div className="font-display text-lg font-semibold text-white">
                    {identity.name}
                  </div>
                  <div className="text-sm text-cyan">
                    CTO · VP Engineering · AI/ML Architect
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* TODO: add real headshot at /public/profile.jpg */}
        </Reveal>

        <div>
          {about.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-5 text-base leading-relaxed text-slate-300 md:text-lg">
                {para}
              </p>
            </Reveal>
          ))}

          {/* Differentiator pillars */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {about.pillars.map((p, i) => {
              const Icon = iconByName[p.icon];
              return (
                <Reveal key={p.title} delay={0.1 + i * 0.08}>
                  <div className="glass h-full rounded-2xl p-5 transition-colors hover:border-cyan/30">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gradient text-void">
                      {Icon && <Icon />}
                    </div>
                    <h3 className="font-display font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stat band */}
      <Reveal className="mt-16">
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/[0.02] p-7 text-center">
              <div className="font-display text-3xl font-bold text-white md:text-4xl">
                {s.label.includes('ROC-AUC') ? (
                  <span className="gradient-text">0.957</span>
                ) : (
                  <span className="gradient-text">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wide text-slate-400">
                {s.label.includes('ROC-AUC') ? 'Best model ROC-AUC' : s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
