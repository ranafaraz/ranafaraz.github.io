import { useEffect, useState } from 'react';
import { nav, identity, site } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle, SoundToggle } from './Controls';
import { IconDownload } from './Icons';

const ids = nav.map((n) => n.id);

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}) {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`container-x flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/20' : ''
        }`}
        aria-label="Primary"
      >
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
          aria-label="Rana Faraz Ahmed — home"
        >
          RFA<span className="text-cyan">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === item.id
                    ? 'text-cyan'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <a
            href={site.cvPath}
            download
            target="_blank"
            rel="noopener"
            className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex"
            data-cursor="download"
          >
            <IconDownload width={16} height={16} /> CV
          </a>
          <button
            className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-4 bg-current transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="container-x mt-2 lg:hidden">
          <ul className="glass grid gap-1 rounded-2xl p-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm ${
                    active === item.id
                      ? 'bg-white/5 text-cyan'
                      : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.cvPath}
                download
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="btn-primary mt-1 w-full text-sm"
              >
                <IconDownload width={16} height={16} /> Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
      <span className="sr-only">{identity.name}</span>
    </header>
  );
}
