import { identity, site } from '../data/profile';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import {
  IconArrowRight,
  IconDownload,
  IconGitHub,
  IconLinkedIn,
  IconMail,
} from '../components/Icons';

export default function Contact() {
  return (
    <section id="contact" className="section scroll-mt-24">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
          {/* glow */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(34,211,238,0.18),transparent_60%)]"
          />
          <div>
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-cyan/60" aria-hidden />
              Contact
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              Let’s build the AI that{' '}
              <span className="gradient-text">actually ships.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Open to leadership roles, advisory, and collaboration on
              ambitious AI products. The fastest way to reach me is email.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                href={`mailto:${identity.email}`}
                cursorLabel="email"
              >
                <IconMail width={18} height={18} /> {identity.email}
              </MagneticButton>
              <MagneticButton
                href={site.cvPath}
                download
                variant="ghost"
                cursorLabel="download"
              >
                <IconDownload width={18} height={18} /> Download CV
              </MagneticButton>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
                data-cursor="LinkedIn"
              >
                <IconLinkedIn />
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
                data-cursor="GitHub"
              >
                <IconGitHub />
              </a>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500">
              <IconArrowRight width={14} height={14} className="text-cyan" />
              Remote · {identity.location} · Available worldwide
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
