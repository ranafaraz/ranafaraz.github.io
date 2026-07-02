import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { identity, site } from '../data/profile';
import RoleRotator from '../components/RoleRotator';
import MagneticButton from '../components/MagneticButton';
import { IconArrowRight, IconDownload, IconGitHub, IconLinkedIn } from '../components/Icons';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Lift + fade the hero content as it scrolls away (synced with the camera
  // pulling back from the AI core in the global 3D scene).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Animated gradient backdrop (CSS only — cheap, always on) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(40%_40%_at_80%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(40%_40%_at_15%_30%,rgba(167,139,250,0.16),transparent_55%)]"
      />
      {/* Fine grid motif */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid bg-[size:44px_44px] opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]"
      />

      {/* The 3D neural core/field lives in the global <ExperienceCanvas> behind
          the whole page; the hero just needs a soft focal glow over it. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(38%_38%_at_50%_45%,rgba(34,211,238,0.10),transparent_60%)]"
      />

      <motion.div
        style={{ y, opacity }}
        className="container-x relative grid items-center gap-12 pt-28 md:grid-cols-[1.4fr_1fr] md:pt-0"
      >
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {identity.title}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {identity.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 font-display text-2xl font-semibold sm:text-4xl"
            aria-live="polite"
          >
            <RoleRotator roles={identity.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            {identity.oneLiner}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" cursorLabel="explore">
              View Work <IconArrowRight width={18} height={18} />
            </MagneticButton>
            <MagneticButton
              href={site.cvPath}
              download
              target="_blank"
              rel="noopener"
              variant="ghost"
              cursorLabel="download"
            >
              <IconDownload width={18} height={18} /> Download CV
            </MagneticButton>
            <div className="ml-1 flex items-center gap-2">
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
              >
                <IconLinkedIn />
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
              >
                <IconGitHub />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating stat / accent panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block"
        >
          <div className="glass relative animate-float rounded-3xl p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-cyan">
              Now leading
            </div>
            <div className="mt-2 font-display text-xl font-semibold text-white">
              Life Hub Infiniti AI
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Adaptive AI EdTech + FinTech — personalization, RAG, career
              intelligence &amp; blockchain credentials.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="font-display text-2xl font-bold text-white">
                  {identity.experienceYears}
                </div>
                <div className="text-[11px] uppercase tracking-wide text-slate-400">
                  Years
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="font-display text-2xl font-bold text-white">
                  PMP
                </div>
                <div className="text-[11px] uppercase tracking-wide text-slate-400">
                  Certified
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan"
        >
          Scroll
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="h-2 w-1 animate-float rounded-full bg-cyan" />
          </span>
        </a>
      </div>
    </section>
  );
}
