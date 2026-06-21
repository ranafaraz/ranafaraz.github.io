import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Decides whether to mount heavy WebGL. Disabled under reduced-motion or on
 * clearly low-power devices (few cores / tiny memory) so we never ship a janky
 * hero. Returns { enabled, count } where count scales particles to the screen.
 */
export function useEnable3D() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(120);

  useEffect(() => {
    if (reduced) {
      setEnabled(false);
      return;
    }
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    const small = window.matchMedia('(max-width: 768px)').matches;

    if (cores <= 2 || mem <= 1) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
    setCount(small ? 70 : 120);
  }, [reduced]);

  return { enabled, count };
}
