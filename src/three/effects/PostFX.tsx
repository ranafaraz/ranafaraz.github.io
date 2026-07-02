import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
  DepthOfField,
} from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import type { TierSettings } from '../quality';

/**
 * Cinematic postprocessing stack. Bloom is what makes the emissive core/particles
 * read as "expensive"; DOF (high tier only) adds cinematic focus falloff; Vignette
 * frames the shot; SMAA gives edge AA (the canvas runs antialias:false so the
 * composer owns AA). Tier-gated and lazy — never mounted on `low`/`off`.
 */
export default function PostFX({ settings }: { settings: TierSettings }) {
  if (!settings.bloom) return null;

  // Build the pass list conditionally, then filter — EffectComposer strips
  // falsy children at runtime, and this keeps the (strict) types happy.
  const effects = [
    <Bloom
      key="bloom"
      intensity={0.85}
      luminanceThreshold={0.25}
      luminanceSmoothing={0.9}
      mipmapBlur
      kernelSize={KernelSize.LARGE}
    />,
    settings.dof ? (
      <DepthOfField
        key="dof"
        focusDistance={0.02}
        focalLength={0.05}
        bokehScale={2.2}
      />
    ) : null,
    <Vignette key="vignette" eskil={false} offset={0.2} darkness={0.85} />,
    <SMAA key="smaa" />,
  ].filter(Boolean) as JSX.Element[];

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      {effects}
    </EffectComposer>
  );
}
