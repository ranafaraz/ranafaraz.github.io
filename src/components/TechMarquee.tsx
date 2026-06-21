import { techMarquee } from '../data/profile';

/** Infinite marquee of tech actually used. Duplicated track for seamless loop. */
export default function TechMarquee() {
  const items = [...techMarquee, ...techMarquee];
  return (
    <div
      className="relative overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-display text-xl font-semibold text-slate-500 transition-colors hover:text-cyan md:text-2xl"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
