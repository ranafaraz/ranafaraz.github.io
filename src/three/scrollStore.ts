/**
 * Module-level scroll store shared by the DOM and the R3F scene.
 *
 * Scrolling must NOT trigger React re-renders (that would tank FPS), so both the
 * scene director (via `useFrame`) and any imperative DOM readers poll this plain
 * mutable object instead. `target` is the raw normalized scroll [0..1]; `progress`
 * is an eased follower the scene reads for buttery camera motion. `pointer` holds
 * the smoothed cursor/touch position for parallax.
 */
export type ScrollStore = {
  /** Raw normalized document scroll, 0 (top) .. 1 (bottom). */
  target: number;
  /** Eased follower of `target` — what the scene animates against. */
  progress: number;
  /** Instantaneous scroll velocity (eased), for subtle motion accents. */
  velocity: number;
  /** Smoothed pointer in NDC-ish [-1..1] range. */
  pointer: { x: number; y: number };
  /** Viewport height in px (cached; refreshed on resize). */
  viewportH: number;
};

export const scroll: ScrollStore = {
  target: 0,
  progress: 0,
  velocity: 0,
  pointer: { x: 0, y: 0 },
  viewportH: typeof window !== 'undefined' ? window.innerHeight : 800,
};

/**
 * Narrative acts, each bound to a real DOM section id. The scroll driver measures
 * where each section sits (`marks`, normalized 0..1) so the camera keyframes and
 * per-act reveals stay locked to the actual content — not guessed fractions.
 */
export type Act = {
  id: string;
  /** DOM section id whose on-screen position drives this act. */
  section: string;
  /** Camera position + look-at target for this act. */
  cam: [number, number, number];
  look: [number, number, number];
};

export const ACTS: Act[] = [
  { id: 'hero', section: 'home', cam: [0, 0, 12], look: [0, 0, 0] },
  { id: 'about', section: 'about', cam: [2.4, 0.6, 10], look: [0.6, 0, 0] },
  { id: 'skills', section: 'skills', cam: [0, 0.2, 9.5], look: [0, 0, -2] },
  { id: 'experience', section: 'experience', cam: [-2.6, -0.3, 10.5], look: [-0.7, 0, 0] },
  { id: 'projects', section: 'projects', cam: [0, -0.5, 11], look: [0, -0.4, -3] },
  { id: 'contact', section: 'contact', cam: [0, 0, 13], look: [0, 0, 0] },
];

/**
 * Normalized scroll position (0..1) at which each section is centered in the
 * viewport. Seeded with sensible defaults and overwritten by measurement in
 * `useScrollStory`. Mutable and read live by the scene each frame.
 */
export const marks: Record<string, number> = {
  home: 0.0,
  about: 0.2,
  skills: 0.4,
  experience: 0.6,
  projects: 0.8,
  contact: 1.0,
};

/**
 * Reveal weight (0..1) for how "at" a mark the scroll is. Uses a plateau: full
 * weight within `core` of the mark, smoothly fading to 0 by `half`. The plateau
 * keeps an act's 3D content full-size across the whole section it belongs to,
 * rather than peaking for a single instant.
 */
export function revealAt(mark: number, p: number, half = 0.17, core = 0.06): number {
  const d = Math.abs(p - mark);
  if (d <= core) return 1;
  if (d >= half) return 0;
  const t = 1 - (d - core) / (half - core); // 1 at core edge → 0 at half
  return t * t * (3 - 2 * t);
}
