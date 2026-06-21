import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Cycles through the role labels with a vertical flip. */
export default function RoleRotator({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  if (reduced) {
    // Calm variant: no flip, just show the first role (still informative).
    return <span className="gradient-text">{roles[i]}</span>;
  }

  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={roles[i]}
          className="gradient-text"
          initial={{ y: '0.6em', opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: '-0.6em', opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
