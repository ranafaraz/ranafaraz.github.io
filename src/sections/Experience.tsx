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
                  className={`md:col-span-1 ${
                    right ? 'md:col-start-2' : 'md:text-right'
                  }`}
                  y={20}
                >
                  <div className="glass rounded-2xl p-5 transition-colors hover:border-cyan/30">
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan">
                      {item.period}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">
                      {item.role}
                    </h3>
                    <div className="text-sm font-medium text-slate-300">
                      {item.org}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.detail}
                    </p>
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
