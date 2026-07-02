import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scroll } from './scrollStore';

type Props = {
  /** Particle count — supplied by the quality tier (≤ ~6000). */
  count: number;
  /** Radius of the spherical cloud. */
  radius?: number;
};

const COLORS = ['#22D3EE', '#67E8F9', '#6366F1', '#A78BFA'];

/**
 * Dense drifting starfield that gives the scene depth and volume. Deliberately
 * has NO inter-particle lines (that would be O(n²) per frame) — motion comes
 * from a cheap group rotation + a per-point vertex twinkle. Additive, unlit,
 * no shadows: designed to bloom.
 */
export default function ParticleField({ count, radius = 14 }: Props) {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell so the camera sits inside the cloud.
      const r = radius * (0.35 + Math.random() * 0.65);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
      c.set(COLORS[i % COLORS.length]);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      scales[i] = 0.5 + Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    return g;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Slow idle spin + gentle parallax toward the pointer.
    group.current.rotation.y += delta * 0.02;
    const px = scroll.pointer.x;
    const py = scroll.pointer.y;
    group.current.rotation.x += (py * 0.08 - group.current.rotation.x) * 0.03;
    group.current.rotation.z += (px * 0.04 - group.current.rotation.z) * 0.03;
    // Twinkle via material opacity breathing (cheap; avoids a custom shader).
    if (matRef.current) {
      matRef.current.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geo}>
        <pointsMaterial
          ref={matRef}
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
