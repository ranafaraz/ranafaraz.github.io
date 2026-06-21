import { useEffect, useState } from 'react';

/**
 * Tracks the user's `prefers-reduced-motion` setting (live).
 * When true, callers should disable WebGL/auto-motion and ship a calm variant.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
