import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { scroll } from './scrollStore';

/**
 * The hero's signature centerpiece: a distorted, pulsing energy sphere that
 * reads instantly as an "AI core". High-emissive so the bloom pass makes it
 * glow; a faint wireframe shell orbits it for a technical, contained feel.
 * Pointer parallax + a slow breathe give it life without heavy cost.
 */
export default function NeuralCore() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // Parallax toward pointer + a slow bob. (The hero ActGroup owns the
      // scroll-driven fade/scale, so the core itself just idles.)
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x +=
        (scroll.pointer.y * 0.25 - group.current.rotation.x) * 0.04;
      group.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    if (shell.current) {
      shell.current.rotation.x -= delta * 0.08;
      shell.current.rotation.z += delta * 0.05;
    }
    if (inner.current) {
      // Emissive breathing pulse — kept low so the core glows without washing
      // out the hero copy layered in front of it.
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + Math.sin(t * 1.4) * 0.18;
    }
  });

  return (
    <group ref={group}>
      {/* Glowing distorted core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.45, 12]} />
        <MeshDistortMaterial
          color="#0b2b3a"
          emissive="#22D3EE"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.6}
          distort={0.36}
          speed={1.5}
        />
      </mesh>

      {/* Orbiting wireframe containment shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial
          color="#6366F1"
          wireframe
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Core key light so the distort material catches highlights */}
      <pointLight position={[3, 2, 4]} intensity={12} color="#67E8F9" distance={20} />
      <pointLight position={[-4, -2, 2]} intensity={8} color="#A78BFA" distance={20} />
    </group>
  );
}
