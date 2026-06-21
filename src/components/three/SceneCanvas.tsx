import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** CSS class for the wrapping element. */
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  dpr?: [number, number];
};

/**
 * R3F Canvas wrapper with performance guardrails:
 *  - render loop runs only while the canvas is on-screen AND the tab is visible
 *  - clamped device pixel ratio to avoid retina overdraw
 *  - lazy: parents Suspense/lazy this so WebGL never blocks first paint
 */
export default function SceneCanvas({
  children,
  className,
  camera = { position: [0, 0, 12], fov: 60 },
  dpr = [1, 1.8],
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);

    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const active = onScreen && tabVisible;

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={dpr}
        camera={camera}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {children}
      </Canvas>
    </div>
  );
}
