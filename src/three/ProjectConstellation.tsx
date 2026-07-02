import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projects, type Project } from '../data/profile';

const ACCENT: Record<Project['accent'], string> = {
  cyan: '#22D3EE',
  indigo: '#6366F1',
  violet: '#A78BFA',
};

/**
 * The projects "act": a slowly drifting constellation of nodes — one per project,
 * colored by its accent — with links between neighbours. Deliberately atmospheric
 * (it sits behind the DOM project grid), so it reads as depth, not clutter.
 */
export default function ProjectConstellation() {
  const group = useRef<THREE.Group>(null);

  const { nodes, lineGeo } = useMemo(() => {
    const nodes = projects.map((p, i) => {
      // Spread on a wide, shallow ellipsoidal shell.
      const golden = Math.PI * (3 - Math.sqrt(5));
      const y = 1 - (i / Math.max(projects.length - 1, 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const pos = new THREE.Vector3(
        Math.cos(theta) * r * 5.5,
        y * 3,
        Math.sin(theta) * r * 4,
      );
      return { pos, color: new THREE.Color(ACCENT[p.accent]) };
    });

    // Link each node to its nearest neighbour for a constellation feel.
    const pts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let best = -1;
      let bestD = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = nodes[i].pos.distanceToSquared(nodes[j].pos);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      if (best >= 0) {
        const a = nodes[i].pos;
        const b = nodes[best].pos;
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    return { nodes, lineGeo: g };
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.05;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={1.6}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}
