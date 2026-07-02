import type { SkillNode } from '../data/profile';

/**
 * Tiny mutable bridge for DOM → 3D interactions that must not cause React
 * re-renders (the scene reads these in `useFrame`). E.g. hovering a skill-cluster
 * legend button in the DOM highlights that cluster in the global galaxy.
 */
export const ui: {
  activeCluster: SkillNode['cluster'] | null;
  hoverProject: string | null;
} = {
  activeCluster: null,
  hoverProject: null,
};
