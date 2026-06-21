import { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../data/profile';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { IconArrowRight } from '../components/Icons';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ACCENT: Record<Project['accent'], string> = {
  cyan: 'text-cyan',
  indigo: 'text-indigo',
  violet: 'text-violet',
};
const ACCENT_GLOW: Record<Project['accent'], string> = {
  cyan: 'rgba(34,211,238,0.45)',
  indigo: 'rgba(99,102,241,0.45)',
  violet: 'rgba(167,139,250,0.45)',
};

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
      {children}
    </span>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const card = (
    <button
      onClick={onOpen}
      data-cursor="open"
      className="group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-panel/60 p-6 text-left transition-colors hover:border-cyan/30"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* hover spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx,50%) var(--my,0%), ${ACCENT_GLOW[project.accent]}, transparent 40%)`,
        }}
      />
      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        <div className="flex items-start justify-between gap-3">
          <span className={`font-mono text-xs ${ACCENT[project.accent]}`}>
            {String(projects.indexOf(project) + 1).padStart(2, '0')}
          </span>
          <IconArrowRight
            className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan"
            width={18}
            height={18}
          />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {project.tagline}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>
    </button>
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  if (reduced) {
    return (
      <div onMouseMove={handleMove} className="h-full">
        {card}
      </div>
    );
  }

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable={false}
      transitionSpeed={1500}
      scale={1.01}
      className="h-full"
    >
      <div onMouseMove={handleMove} className="h-full">
        {card}
      </div>
    </Tilt>
  );
}

function Modal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remember what was focused so we can restore it on close (WCAG 2.4.3).
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Trap Tab focus inside the dialog.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog on open.
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="glass relative w-full max-w-2xl overflow-hidden rounded-t-3xl bg-panel/95 p-7 outline-none sm:rounded-3xl"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-accent-gradient"
        />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:text-cyan"
        >
          ✕
        </button>
        <span className={`font-mono text-xs ${ACCENT[project.accent]}`}>
          Case study
        </span>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">
          {project.title}
        </h3>

        <dl className="mt-6 space-y-5">
          {[
            ['Problem', project.problem],
            ['Approach', project.approach],
            ['Result', project.result],
          ].map(([label, body]) => (
            <div key={label} className="grid gap-1 sm:grid-cols-[110px_1fr]">
              <dt className="font-mono text-xs uppercase tracking-wider text-cyan">
                {label}
              </dt>
              <dd className="text-sm leading-relaxed text-slate-300">{body}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
          {project.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="section scroll-mt-24">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work — from RAG to real-time voice"
        subtitle="Real systems shipped in EdTech, FinTech and enterprise. Click any card for the problem, approach and result."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard project={p} onOpen={() => setOpenId(p.id)} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && <Modal project={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}
