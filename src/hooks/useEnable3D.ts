import { useQualityTier } from './useQualityTier';

/**
 * Backward-compatible thin wrapper over {@link useQualityTier}. Existing callers
 * expect `{ enabled, count }`; the richer tier settings now drive the global 3D
 * experience. `enabled` is false only when the tier is `off` (reduced-motion or
 * genuinely low-power hardware).
 */
export function useEnable3D() {
  const { tier, particles } = useQualityTier();
  return { enabled: tier !== 'off', count: particles || 120 };
}
