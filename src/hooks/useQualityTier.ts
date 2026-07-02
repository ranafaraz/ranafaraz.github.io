import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { probeTier, settingsFor, type Tier, type TierSettings } from '../three/quality';

/**
 * Resolves the active 3D quality tier for this device and exposes both the tier
 * and its derived settings (particle count, DPR clamp, bloom/DOF toggles).
 *
 * SSR/first-paint safe: starts at `off` (nothing heavy mounts) and upgrades in an
 * effect once we can probe the device. `prefers-reduced-motion` pins it to `off`.
 */
export function useQualityTier(): TierSettings {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<Tier>('off');

  useEffect(() => {
    setTier(probeTier(reduced));
  }, [reduced]);

  return settingsFor(tier);
}
