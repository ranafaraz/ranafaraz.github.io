import { Suspense, useMemo, useRef, useState, type ReactNode } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ACTS, marks, revealAt, scroll } from './scrollStore';
import { ui } from './uiStore';
import type { TierSettings } from './quality';
import type { SkillNode } from '../data/profile';
import ParticleField from './ParticleField';
import NeuralCore from './NeuralCore';
import SkillGalaxy from './SkillGalaxy';
import ProjectConstellation from './ProjectConstellation';
import NeuralField from '../components/three/NeuralField';

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _target = new THREE.Vector3();

function smoothstep(a: number, b: number, x: number) {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Wraps an act's 3D content and reveals it (scale in/out) as the scroll position
 * enters/leaves the act — all in `useFrame`, no re-renders. Hidden groups are
 * flagged invisible so they cost nothing to draw.
 */
function ActGroup({
  curve,
  position,
  children,
}: {
  curve: (p: number) => number;
  position?: [number, number, number];
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const w = curve(scroll.progress);
    ref.current.visible = w > 0.01;
    // Ease scale toward the reveal weight (mapped into a pleasant 0.55–1.15 range
    // at full strength) so acts grow in as they enter and never fully collapse.
    const target = w * (0.55 + w * 0.6);
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.12 + 0.0001;
    ref.current.scale.setScalar(Math.max(0.001, s));
  });
  return (
    <group ref={ref} position={position} scale={0.001}>
      {children}
    </group>
  );
}

/**
 * Skills act. Gates the interactive galaxy labels on an active-threshold state
 * (flips only when entering/leaving the act, so no per-frame re-renders) — drei
 * <Html> labels don't hide with a scaled/invisible parent, so mounting them only
 * while the act is on-screen prevents them leaking over the hero.
 */
function SkillsAct({ labels }: { labels: boolean }) {
  const [active, setActive] = useState(false);
  const [cluster, setCluster] = useState<SkillNode['cluster'] | null>(null);
  const was = useRef(false);
  const wasCluster = useRef<SkillNode['cluster'] | null>(null);
  useFrame(() => {
    const on = revealAt(marks.skills, scroll.progress) > 0.15;
    if (on !== was.current) {
      was.current = on;
      setActive(on);
    }
    // Mirror the hovered-cluster bridge into React state (only on change) so the
    // galaxy can mount/unmount that cluster's skill labels.
    if (ui.activeCluster !== wasCluster.current) {
      wasCluster.current = ui.activeCluster;
      setCluster(ui.activeCluster);
    }
  });
  return (
    <ActGroup curve={(p) => revealAt(marks.skills, p)} position={[0, 0, -2]}>
      <SkillGalaxy labels={labels && active} activeCluster={cluster} />
    </ActGroup>
  );
}

/**
 * Scene director. Owns the single camera and drives it through the narrative
 * acts, whose keyframes are anchored to the measured DOM section positions
 * (`marks`) so the 3D stays locked to the real content as the user scrolls.
 */
export default function Experience({ settings }: { settings: TierSettings }) {
  const { camera } = useThree();

  // Precompute the per-act camera vectors once; read `marks` live each frame.
  const keys = useMemo(
    () =>
      ACTS.map((a) => ({
        section: a.section,
        cam: new THREE.Vector3(...a.cam),
        look: new THREE.Vector3(...a.look),
      })),
    [],
  );

  useFrame(() => {
    const p = scroll.progress;

    // Find the two acts whose measured marks bracket the current scroll, then
    // smoothstep the camera between their keyframes.
    let i0 = 0;
    for (let i = 0; i < keys.length - 1; i++) {
      if (p >= marks[keys[i].section]) i0 = i;
    }
    const i1 = Math.min(i0 + 1, keys.length - 1);
    const m0 = marks[keys[i0].section];
    const m1 = marks[keys[i1].section];
    const span = m1 - m0 || 1;
    const ease = smoothstep(0, 1, (p - m0) / span);

    _pos.copy(keys[i0].cam).lerp(keys[i1].cam, ease);
    _look.copy(keys[i0].look).lerp(keys[i1].look, ease);
    _pos.x += scroll.pointer.x * 0.6;
    _pos.y += scroll.pointer.y * 0.4;

    camera.position.lerp(_pos, 0.06);
    _target.copy(_look);
    camera.lookAt(_target);
  });

  const heroCurve = (p: number) =>
    1 - smoothstep(marks.about * 0.5, marks.about, p);

  return (
    <>
      <ambientLight intensity={0.5} />

      {/* Depth: dense drifting starfield behind everything. */}
      <ParticleField count={settings.particles} />

      {/* Hero act: glowing AI core + connected neural web (fades by the About mark).
          The core sits to the right so it clears the hero copy on the left. */}
      <ActGroup curve={heroCurve}>
        <Suspense fallback={null}>
          <group position={[3.4, 0.2, -0.5]}>
            <NeuralCore />
          </group>
        </Suspense>
        <NeuralField count={settings.tier === 'high' ? 110 : 80} />
      </ActGroup>

      {/* Skills act: clustered knowledge graph. */}
      <SkillsAct labels={settings.labels} />

      {/* Projects act: atmospheric constellation behind the grid. */}
      <ActGroup curve={(p) => revealAt(marks.projects, p)} position={[0, -0.4, -3]}>
        <ProjectConstellation />
      </ActGroup>
    </>
  );
}
