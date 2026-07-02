import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills, skillClusters, type SkillNode } from '../data/profile';
import { ui } from './uiStore';

const CLUSTER_COLOR: Record<SkillNode['cluster'], string> = {
  ai: '#22D3EE',
  cloud: '#6366F1',
  engineering: '#A78BFA',
  leadership: '#F472B6',
};

const CLUSTERS = Object.keys(skillClusters) as SkillNode['cluster'][];

// Anchor each cluster ("god node") at a corner of a spread tetrahedron.
const ANCHORS: Record<SkillNode['cluster'], THREE.Vector3> = {
  ai: new THREE.Vector3(0, 2.8, 0),
  cloud: new THREE.Vector3(-3.1, -1.4, 1.8),
  engineering: new THREE.Vector3(3.1, -1.4, 1.8),
  leadership: new THREE.Vector3(0, -0.8, -3.2),
};

const CLUSTER_TITLE: Record<SkillNode['cluster'], string> = {
  ai: 'AI / ML',
  cloud: 'Cloud & Platform',
  engineering: 'Engineering',
  leadership: 'Leadership',
};

type Placed = {
  skill: SkillNode;
  pos: THREE.Vector3;
  color: THREE.Color;
};

/**
 * The skills "act": a clustered knowledge graph. Each cluster is a hub with its
 * skills as spokes; hubs interconnect. Hovering a cluster's legend button in the
 * DOM (via {@link ui}) highlights that cluster and dims the rest — no second
 * WebGL renderer, no React re-renders. Emissive so bloom lights it up.
 */
export default function SkillGalaxy({
  labels,
  activeCluster,
}: {
  labels: boolean;
  activeCluster: SkillNode['cluster'] | null;
}) {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const placed = useMemo<Placed[]>(() => {
    const byCluster: Record<string, number> = {};
    return skills.map((skill) => {
      const anchor = ANCHORS[skill.cluster];
      const idx = (byCluster[skill.cluster] = (byCluster[skill.cluster] ?? 0) + 1);
      // Fibonacci-ish spread around the cluster anchor.
      const golden = Math.PI * (3 - Math.sqrt(5));
      const theta = golden * idx;
      const r = 1.15;
      const pos = anchor
        .clone()
        .add(
          new THREE.Vector3(
            Math.cos(theta) * r,
            Math.sin(theta * 1.3) * r * 0.7,
            Math.sin(theta) * r,
          ),
        );
      return { skill, pos, color: new THREE.Color(CLUSTER_COLOR[skill.cluster]) };
    });
  }, []);

  // Static line geometry: hub→node spokes + hub↔hub links.
  const lineGeo = useMemo(() => {
    const pts: number[] = [];
    placed.forEach((p) => {
      const a = ANCHORS[p.skill.cluster];
      pts.push(a.x, a.y, a.z, p.pos.x, p.pos.y, p.pos.z);
    });
    for (let i = 0; i < CLUSTERS.length; i++) {
      for (let j = i + 1; j < CLUSTERS.length; j++) {
        const a = ANCHORS[CLUSTERS[i]];
        const b = ANCHORS[CLUSTERS[j]];
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, [placed]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
    }
    const active = ui.activeCluster;
    placed.forEach((p, i) => {
      const mesh = nodeRefs.current[i];
      if (!mesh) return;
      const on = active === null || active === p.skill.cluster;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const targetEmissive = on ? (active === p.skill.cluster ? 2.4 : 1.2) : 0.25;
      mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.12;
      const targetScale = active === p.skill.cluster ? 1.4 : on ? 1 : 0.7;
      const s = mesh.scale.x + (targetScale - mesh.scale.x) * 0.15;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Cluster hub cores + always-on hub labels */}
      {CLUSTERS.map((c) => (
        <group key={c} position={ANCHORS[c]}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial
              color={CLUSTER_COLOR[c]}
              emissive={CLUSTER_COLOR[c]}
              emissiveIntensity={2}
              roughness={0.3}
            />
          </mesh>
          {labels && (
            <Billboard position={[0, 0.42, 0]}>
              <Html center distanceFactor={13} zIndexRange={[6, 0]} pointerEvents="none">
                <span
                  className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-semibold backdrop-blur-sm"
                  style={{
                    borderColor: CLUSTER_COLOR[c],
                    color: CLUSTER_COLOR[c],
                    background: 'rgba(6,7,13,0.7)',
                  }}
                >
                  {CLUSTER_TITLE[c]}
                </span>
              </Html>
            </Billboard>
          )}
        </group>
      ))}

      {/* Skill nodes */}
      {placed.map((p, i) => (
        <group key={p.skill.id} position={p.pos}>
          <mesh ref={(m) => (nodeRefs.current[i] = m)}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={1.2}
              roughness={0.4}
            />
          </mesh>
          {/* Skill labels appear only for the hovered cluster — keeps the graph
              readable instead of a 32-label clump. */}
          {labels && activeCluster === p.skill.cluster && (
            <Billboard>
              <Html
                center
                distanceFactor={11}
                zIndexRange={[5, 0]}
                pointerEvents="none"
              >
                <span className="whitespace-nowrap rounded-full border border-white/15 bg-void/70 px-2 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-sm">
                  {p.skill.label}
                </span>
              </Html>
            </Billboard>
          )}
        </group>
      ))}
    </group>
  );
}
