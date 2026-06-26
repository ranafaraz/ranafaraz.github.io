import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './Controls';
import Footer from './Footer';

export default function PageLayout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();

  return (
    <div className="grain relative min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 py-4">
        <div className="container-x flex items-center justify-between rounded-2xl px-4 py-2.5 glass shadow-lg shadow-black/20">
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
            aria-label="Rana Faraz Ahmed — home"
          >
            RFA<span className="text-cyan">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggle={toggle} />
            <Link
              to="/"
              className="btn-ghost px-4 py-2 text-sm"
            >
              ← Portfolio
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-12">
        {children}
      </main>

      <Footer />
    </div>
  );
}
