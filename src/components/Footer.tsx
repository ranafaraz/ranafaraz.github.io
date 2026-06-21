import { identity } from '../data/profile';
import { IconArrowUp, IconGitHub, IconLinkedIn, IconMail } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <a
            href="#home"
            className="font-display text-xl font-bold text-slate-900 dark:text-white"
          >
            Rana Faraz Ahmed<span className="text-cyan">.</span>
          </a>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Head of AI &amp; Engineering Leader · CTO · AI/ML Architect.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            © {new Date().getFullYear()} Rana Faraz Ahmed. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
            data-cursor="LinkedIn"
          >
            <IconLinkedIn />
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
            data-cursor="GitHub"
          >
            <IconGitHub />
          </a>
          <a
            href={`mailto:${identity.email}`}
            aria-label="Email"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
            data-cursor="email"
          >
            <IconMail />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="btn-ghost h-11 w-11 !p-0"
            data-cursor="top"
          >
            <IconArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
