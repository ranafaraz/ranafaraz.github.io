import { certifications, credentials, publications } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import RocCurve from '../components/RocCurve';

export default function Research() {
  return (
    <section id="research" className="section scroll-mt-24">
      <SectionHeading
        eyebrow="Research & Credentials"
        title="Published, certified, and legally literate"
        subtitle="Peer-reviewed research alongside a PhD, MPhil, an LLB with bar enrolment (enrolled advocate), and PMP — engineering depth backed by academic rigor, applied-AI certifications, and governance."
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Publications */}
        <div className="space-y-5">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 0.08}>
              <article className="glass group rounded-2xl p-6 transition-colors hover:border-cyan/30">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                    {pub.venue}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-slate-300">
                    {pub.year}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                  {pub.title}
                </h3>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  {pub.highlight}
                </div>
              </article>
            </Reveal>
          ))}

          {/* Credentials grid */}
          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {credentials.map((c) => (
                <div
                  key={c.title}
                  className="glass rounded-xl p-4 transition-colors hover:border-violet/30"
                >
                  <h4 className="font-display text-sm font-semibold text-white">
                    {c.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {c.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Certifications chip strip */}
          <Reveal delay={0.14}>
            <div className="glass rounded-2xl p-5">
              <div className="font-mono text-xs uppercase tracking-wider text-cyan">
                Certifications
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Data-viz flourish */}
        <Reveal delay={0.15}>
          <div className="sticky top-28 space-y-4">
            <RocCurve />
            <div className="glass rounded-2xl p-5">
              <div className="font-mono text-xs uppercase tracking-wider text-cyan">
                AS topology study
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="font-display text-2xl font-bold gradient-text">
                    378
                  </div>
                  <div className="text-[11px] text-slate-400">
                    new Autonomous Systems
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="font-display text-2xl font-bold gradient-text">
                    1,740
                  </div>
                  <div className="text-[11px] text-slate-400">AS links</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
