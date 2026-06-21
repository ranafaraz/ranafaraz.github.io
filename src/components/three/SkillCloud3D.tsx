import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills, type SkillNode } from '../../data/profile';

const CLUSTER_COLOR: Record<SkillNode['cluster'], string> = {
  ai: '#22D3EE',
  cloud: '#6366F1',
  engineering: '#A78BFA',
  leadership: '#F472B6',
};

/** Distribute N points roughly evenly on a sphere (fibonacci sphere). */
function fibonacciSphere(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return pts;
}

export default function SkillCloud3D({
  active,
  setActive,
}: {
  active: SkillNode['cluster'] | null;
  setActive: (c: SkillNode['cluster'] | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [paused, setPaused] = useState(false);
  const positions = useMemo(() => fibonacciSphere(skills.length, 4.4), []);

  useFrame((state, delta) => {
    if (group.current && !paused) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    }
  });

  return (
    <group ref={group}>
      {skills.map((skill, i) => {
        const dim = active !== null && active !== skill.cluster;
        const highlight = active === skill.cluster;
        const color = CLUSTER_COLOR[skill.cluster];
        return (
          <Billboard key={skill.id} position={positions[i]}>
            <Html center distanceFactor={9} zIndexRange={[10, 0]}>
              <button
                onMouseEnter={() => {
                  setActive(skill.cluster);
                  setPaused(true);
                }}
                onMouseLeave={() => {
                  setActive(null);
                  setPaused(false);
                }}
                className="select-none whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium backdrop-blur-sm transition-all duration-300"
                style={{
                  borderColor: color,
                  color: dim ? 'rgba(148,163,184,0.5)' : color,
                  background: highlight
                    ? `${color}22`
                    : 'rgba(6,7,13,0.55)',
                  opacity: dim ? 0.35 : 1,
                  transform: highlight ? 'scale(1.12)' : 'scale(1)',
                  boxShadow: highlight ? `0 0 22px -4px ${color}` : 'none',
                }}
              >
                {skill.label}
              </button>
            </Html>
          </Billboard>
        );
      })}
    </group>
  );
}
