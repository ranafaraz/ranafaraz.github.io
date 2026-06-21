import { motion } from 'framer-motion';
import { skillClusters, skills, type SkillNode } from '../data/profile';

const ORDER: SkillNode['cluster'][] = [
  'ai',
  'cloud',
  'engineering',
  'leadership',
];

const COLOR: Record<SkillNode['cluster'], string> = {
  ai: 'from-cyan to-cyan/40',
  cloud: 'from-indigo to-indigo/40',
  engineering: 'from-violet to-violet/40',
  leadership: 'from-pink-400 to-pink-400/40',
};

/** Calm, animated fallback for the 3D cloud (mobile / reduced-motion). */
export default function SkillBars() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {ORDER.map((cluster) => {
        const items = skills.filter((s) => s.cluster === cluster);
        return (
          <div key={cluster} className="glass rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white">
              {skillClusters[cluster].title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((s, i) => (
                <motion.span
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-full bg-gradient-to-r ${COLOR[cluster]} px-3 py-1 text-xs font-medium text-void`}
                >
                  {s.label}
                </motion.span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
