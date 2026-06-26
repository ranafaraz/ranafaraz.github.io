import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout>
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glowing 404 */}
          <div
            className="font-display text-[clamp(6rem,20vw,12rem)] font-bold leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #6366F1 50%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 60px rgba(34,211,238,0.35))',
            }}
            aria-hidden="true"
          >
            404
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-slate-400">
            This path doesn't exist — but most things worth finding are just one click
            away.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-primary px-6 py-2.5 text-sm">
              ← Back to Portfolio
            </Link>
            <a href="/#contact" className="btn-ghost px-6 py-2.5 text-sm">
              Get in touch
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-12 glass rounded-2xl p-6">
            <p className="mb-4 text-sm text-slate-500">Maybe you were looking for:</p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              {[
                { label: 'Projects', href: '/#projects' },
                { label: 'Experience', href: '/#experience' },
                { label: 'Research', href: '/#research' },
                { label: 'Contact', href: '/#contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: '/uses', href: '/uses' },
                { label: '/now', href: '/now' },
              ].map((l) => (
                <li key={l.href}>
                  {l.href.startsWith('/') && !l.href.startsWith('/#') ? (
                    <Link to={l.href} className="hover:text-cyan transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="hover:text-cyan transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
