import { useState } from 'react';
import { skillClusters, type SkillNode } from '../data/profile';
import { useQualityTier } from '../hooks/useQualityTier';
import { ui } from '../three/uiStore';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SkillBars from '../components/SkillBars';

const CLUSTER_ORDER: SkillNode['cluster'][] = [
  'ai',
  'cloud',
  'engineering',
  'leadership',
];

const CLUSTER_DOT: Record<SkillNode['cluster'], string> = {
  ai: 'bg-cyan',
  cloud: 'bg-indigo',
  engineering: 'bg-violet',
  leadership: 'bg-pink-400',
};

export default function Skills() {
  const { tier } = useQualityTier();
  const [active, setActive] = useState<SkillNode['cluster'] | null>(null);

  // Hovering a cluster highlights it in the global 3D galaxy (via the UI store),
  // and styles the legend button. On the `off` tier we show the 2D SkillBars.
  const setCluster = (c: SkillNode['cluster'] | null) => {
    setActive(c);
    ui.activeCluster = c;
  };

  return (
    <section id="skills" className="section scroll-mt-24">
      <SectionHeading
        eyebrow="Expertise"
        title="A knowledge graph, not a checklist"
        subtitle="Hover a cluster to light it up in the constellation behind — AI/ML, cloud, engineering and leadership reinforcing each other. Reduced-motion visitors get a clean, animated overview."
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* On capable devices the interactive graph plays in the global canvas
            behind this section; this column just reserves the stage. */}
        {tier === 'off' ? (
          <Reveal>
            <SkillBars />
          </Reveal>
        ) : (
          <div
            aria-hidden
            className="relative hidden min-h-[460px] lg:block"
          />
        )}

        {/* Cluster legend */}
        <div className="space-y-3">
          {CLUSTER_ORDER.map((cluster) => {
            const isActive = active === cluster;
            return (
              <button
                key={cluster}
                onMouseEnter={() => setCluster(cluster)}
                onMouseLeave={() => setCluster(null)}
                onFocus={() => setCluster(cluster)}
                onBlur={() => setCluster(null)}
                className={`glass block w-full rounded-2xl p-5 text-left transition-all ${
                  isActive ? 'border-cyan/40 scale-[1.02]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${CLUSTER_DOT[cluster]}`}
                  />
                  <h3 className="font-display font-semibold text-white">
                    {skillClusters[cluster].title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {skillClusters[cluster].blurb}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* On tablet/mobile (no room for the side graph) show the bars too. */}
      {tier !== 'off' && (
        <Reveal className="mt-10 lg:hidden">
          <SkillBars />
        </Reveal>
      )}
    </section>
  );
}
