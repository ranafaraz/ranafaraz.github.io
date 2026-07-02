import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import Experience from './Experience';
import PostFX from './effects/PostFX';
import { demote, settingsFor, type TierSettings } from './quality';

/**
 * The ONE WebGL renderer for the homepage (single-renderer rule → no mobile
 * context-loss). Fixed behind the DOM, transparent, AA delegated to the composer
 * (SMAA). Pauses its render loop when the tab is hidden, and self-demotes a tier
 * live via <PerformanceMonitor> if the frame rate sags.
 */
export default function ExperienceCanvas({ initial }: { initial: TierSettings }) {
  const [settings, setSettings] = useState<TierSettings>(initial);
  const [dpr, setDpr] = useState(initial.dprMax);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setSettings(initial);
    setDpr(initial.dprMax);
  }, [initial]);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <Canvas
      // Positioning via `style` (not className): R3F sets `position: relative`
      // inline, and an inline style would beat a Tailwind class.
      style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none' }}
      frameloop={visible ? 'always' : 'never'}
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <PerformanceMonitor
        onDecline={() => {
          // Drop DPR first; if still struggling, demote the tier (fewer
          // particles, and eventually no bloom).
          setDpr((d) => Math.max(1, d - 0.25));
          setSettings((s) =>
            s.tier === 'low' ? s : settingsFor(demote(s.tier as 'high' | 'mid')),
          );
        }}
      />
      <Suspense fallback={null}>
        <Experience settings={settings} />
        <PostFX settings={settings} />
      </Suspense>
    </Canvas>
  );
}
