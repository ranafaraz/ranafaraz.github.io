import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce || !containerRef.current || !lineRef.current) {
      // Calm variant: show the full progress line, no scroll scrubbing.
      if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 0.5,
          },
        },
      );

      // Light up each milestone node as it enters.
      gsap.utils.toArray<HTMLElement>('.tl-node').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, boxShadow: '0 0 0 0 rgba(34,211,238,0)' },
          {
            scale: 1,
            boxShadow: '0 0 22px -2px rgba(34,211,238,0.8)',
            scrollTrigger: { trigger: node, start: 'top 80%' },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section scroll-mt-24">
      <SectionHeading
        eyebrow="Experience"
        title="11+ years of building and leading"
        subtitle="From software engineer to CTO — delivering production systems and leading teams at scale."
      />

      <div ref={containerRef} className="relative pl-8 md:pl-0">
        {/* Spine */}
        <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <div
          ref={lineRef}
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-accent-gradient md:left-1/2 md:-translate-x-1/2"
        />

        <ul className="space-y-10">
          {timeline.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={`${item.role}-${i}`}
                className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                  right ? '' : ''
                }`}
              >
                {/* Node */}
                <span
                  className={`tl-node absolute left-[-26px] top-1.5 z-10 h-4 w-4 rounded-full border-2 border-cyan bg-void md:left-1/2 md:-translate-x-1/2 ${
                    item.current ? 'animate-pulse' : ''
                  }`}
                />

                <Reveal
                  className={`md:col-span-1 ${right ? 'md:col-start-2' : ''}`}
                  y={20}
                >
                  <div className="glass rounded-2xl p-5 text-left transition-colors hover:border-cyan/30">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                        {item.period}
                      </span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">
                      {item.role}
                    </h3>
                    <div className="text-sm font-medium text-slate-300">
                      {item.org}
                    </div>
                    <div className="text-xs text-slate-500">{item.location}</div>

                    {item.summary && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {item.summary}
                      </p>
                    )}

                    <ul className="mt-3 space-y-1.5">
                      {item.responsibilities.map((r, ri) => (
                        <li
                          key={ri}
                          className="flex gap-2 text-sm leading-relaxed text-slate-400"
                        >
                          <span
                            className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan/70"
                            aria-hidden
                          />
                          {r}
                        </li>
                      ))}
                    </ul>

                    {item.achievements && (
                      <div className="mt-4 rounded-xl border border-cyan/20 bg-cyan/5 p-3">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                          Key achievements
                        </div>
                        <ul className="mt-1.5 space-y-1">
                          {item.achievements.map((a, ai) => (
                            <li
                              key={ai}
                              className="flex gap-2 text-sm leading-relaxed text-slate-300"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan"
                                aria-hidden
                              />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.stack && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
