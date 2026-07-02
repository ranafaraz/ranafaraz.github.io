/**
 * Quality tiers for the cinematic 3D experience.
 *
 * Posture: "push visuals, lighter fallback." Almost every device gets a scaled
 * 3D world — only `prefers-reduced-motion` (or genuinely ancient hardware) drops
 * to `off`, where the DOM ships its calm CSS/2D fallback. A running scene may be
 * demoted live by drei's <PerformanceMonitor> if the frame rate sags.
 */
export type Tier = 'high' | 'mid' | 'low' | 'off';

export type TierSettings = {
  tier: Tier;
  /** Particle count for the neural field. Never above ~6k (mobile GPU ceiling). */
  particles: number;
  /** Clamp for renderer device-pixel-ratio (retina overdraw guard). */
  dprMax: number;
  /** Enable bloom postprocessing. */
  bloom: boolean;
  /** Enable depth-of-field (heaviest effect — high tier only). */
  dof: boolean;
  /** Render interactive skill-galaxy HTML labels (expensive on weak devices). */
  labels: boolean;
};

// Note: `dof` (depth-of-field) is wired end-to-end but defaults off — its
// focus params need tuning on real high-end GPUs before shipping, and a
// mis-tuned pass blurs the whole hero. Flip high.dof → true after device testing.
export const TIER_SETTINGS: Record<Exclude<Tier, 'off'>, TierSettings> = {
  high: { tier: 'high', particles: 6000, dprMax: 2.0, bloom: true, dof: false, labels: true },
  mid: { tier: 'mid', particles: 3000, dprMax: 1.6, bloom: true, dof: false, labels: true },
  low: { tier: 'low', particles: 1200, dprMax: 1.25, bloom: false, dof: false, labels: false },
};

export const OFF_SETTINGS: TierSettings = {
  tier: 'off',
  particles: 0,
  dprMax: 1,
  bloom: false,
  dof: false,
  labels: false,
};

/**
 * Probe device capability once. `reduced` (prefers-reduced-motion) always wins
 * and forces `off`. Otherwise we pick a tier from core count, memory and screen
 * size — biased toward serving *some* 3D rather than dropping it.
 */
export function probeTier(reduced: boolean): Tier {
  if (reduced) return 'off';
  if (typeof navigator === 'undefined') return 'mid';

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;
  const small =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;

  // Genuinely ancient / memory-starved → no WebGL.
  if (cores <= 2 || mem <= 1) return 'off';

  // Phones & tablets: give them a real (but scaled) scene.
  if (coarse || small) {
    return cores >= 8 && mem >= 4 ? 'mid' : 'low';
  }

  // Desktop / laptop.
  if (cores >= 8 && mem >= 8) return 'high';
  return 'mid';
}

/** Order used when <PerformanceMonitor> demotes a live scene. */
export const TIER_ORDER: Exclude<Tier, 'off'>[] = ['high', 'mid', 'low'];

export function demote(tier: Exclude<Tier, 'off'>): Exclude<Tier, 'off'> {
  const i = TIER_ORDER.indexOf(tier);
  return TIER_ORDER[Math.min(i + 1, TIER_ORDER.length - 1)];
}

export function settingsFor(tier: Tier): TierSettings {
  return tier === 'off' ? OFF_SETTINGS : TIER_SETTINGS[tier];
}
