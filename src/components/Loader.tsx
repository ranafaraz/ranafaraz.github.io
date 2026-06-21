import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Polished loading screen with a progress animation. Resolves quickly (assets
 * stream in lazily anyway) so it never blocks interaction for long.
 */
export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => setDone(true), 350);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 120);
    return () => clearInterval(tick);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan">
            Initializing
          </div>
          <div className="mt-6 font-display text-5xl font-bold text-white tabular-nums">
            {progress}
            <span className="text-cyan">%</span>
          </div>
          <div className="mt-6 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-accent-gradient"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-[11px] tracking-widest text-slate-500">
            RANA FARAZ AHMED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
