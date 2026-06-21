import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  /** Node count — keep modest for mobile/perf. */
  count?: number;
  /** Max distance to draw a connecting line between two nodes. */
  linkDist?: number;
};

/**
 * An animated neural-network / particle constellation: nodes drift inside a
 * box, near neighbours are connected by glowing lines, and the whole field
 * parallaxes gently toward the pointer. Connection topology is computed once;
 * only positions update per frame, so this stays cheap.
 */
export default function NeuralField({ count = 120, linkDist = 2.3 }: Props) {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  const SPREAD = 9;

  // Initial positions + per-node velocities.
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions, velocities };
  }, [count]);

  // Pre-allocate the line buffer (max possible pairs is capped to keep it light).
  const maxLines = count * 6;
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3),
    );
    return g;
  }, [maxLines]);

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const linkDistSq = linkDist * linkDist;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = pointGeo.attributes.position.array as Float32Array;

    // Drift nodes and softly bounce inside the box.
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix] += velocities[ix];
      pos[ix + 1] += velocities[ix + 1];
      pos[ix + 2] += velocities[ix + 2];
      for (let a = 0; a < 3; a++) {
        const limit = a === 0 ? SPREAD / 2 : (SPREAD * (a === 1 ? 0.6 : 0.5)) / 2;
        if (pos[ix + a] > limit || pos[ix + a] < -limit) {
          velocities[ix + a] *= -1;
        }
      }
    }
    pointGeo.attributes.position.needsUpdate = true;

    // Rebuild connecting lines.
    const lp = lineGeo.attributes.position.array as Float32Array;
    let n = 0;
    for (let i = 0; i < count && n < maxLines; i++) {
      for (let j = i + 1; j < count && n < maxLines; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq < linkDistSq) {
          lp[n * 6] = pos[i * 3];
          lp[n * 6 + 1] = pos[i * 3 + 1];
          lp[n * 6 + 2] = pos[i * 3 + 2];
          lp[n * 6 + 3] = pos[j * 3];
          lp[n * 6 + 4] = pos[j * 3 + 1];
          lp[n * 6 + 5] = pos[j * 3 + 2];
          n++;
        }
      }
    }
    lineGeo.setDrawRange(0, n * 2);
    lineGeo.attributes.position.needsUpdate = true;

    // Parallax toward pointer + slow idle rotation.
    if (group.current) {
      const px = (state.pointer.x * viewport.width) / 18;
      const py = (state.pointer.y * viewport.height) / 18;
      group.current.rotation.y +=
        (px * 0.05 - group.current.rotation.y) * 0.04 + 0.0006;
      group.current.rotation.x +=
        (-py * 0.05 - group.current.rotation.x) * 0.04;
      group.current.position.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.07}
          color="#67E8F9"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
