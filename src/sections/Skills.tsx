import { Suspense, lazy, useState } from 'react';
import { skillClusters, type SkillNode } from '../data/profile';
import { useEnable3D } from '../hooks/useEnable3D';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SkillBars from '../components/SkillBars';

const SceneCanvas = lazy(() => import('../components/three/SceneCanvas'));
const SkillCloud3D = lazy(() => import('../components/three/SkillCloud3D'));

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
  const { enabled } = useEnable3D();
  const [active, setActive] = useState<SkillNode['cluster'] | null>(null);

  return (
    <section id="skills" className="section scroll-mt-24">
      <SectionHeading
        eyebrow="Expertise"
        title="A knowledge graph, not a checklist"
        subtitle="Hover a cluster to see how AI/ML, cloud, engineering and leadership reinforce each other. On touch devices this becomes a clean, animated overview."
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* 3D cloud or fallback */}
        <Reveal>
          {enabled ? (
            <Suspense
              fallback={
                <div className="grid h-[460px] place-items-center text-sm text-slate-500">
                  Loading knowledge graph…
                </div>
              }
            >
              <SceneCanvas
                className="h-[460px] w-full"
                camera={{ position: [0, 0, 11], fov: 55 }}
              >
                <SkillCloud3D active={active} setActive={setActive} />
              </SceneCanvas>
            </Suspense>
          ) : (
            <SkillBars />
          )}
        </Reveal>

        {/* Cluster legend */}
        <div className="space-y-3">
          {CLUSTER_ORDER.map((cluster) => {
            const isActive = active === cluster;
            return (
              <button
                key={cluster}
                onMouseEnter={() => setActive(cluster)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(cluster)}
                onBlur={() => setActive(null)}
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
    </section>
  );
}
