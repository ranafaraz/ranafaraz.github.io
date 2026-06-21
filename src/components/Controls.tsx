import { useEffect, useRef, useState } from 'react';
import { IconMoon, IconSun, IconVolume, IconVolumeOff } from './Icons';

/** Light/dark theme toggle button. */
export function ThemeToggle({
  theme,
  toggle,
}: {
  theme: 'dark' | 'light';
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan dark:text-slate-300"
      data-cursor={theme === 'dark' ? 'light' : 'dark'}
    >
      {theme === 'dark' ? <IconSun /> : <IconMoon />}
    </button>
  );
}

/**
 * Ambient sound toggle (off by default). Generates a soft evolving drone with
 * the Web Audio API so we ship no audio asset. Honors autoplay policies by only
 * starting on user gesture.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  const start = () => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Two detuned oscillators + slow LFO for a calm ambient pad.
    const freqs = [110, 164.81];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.3;
      osc.connect(g).connect(master);
      osc.start();
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();

    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);
    ctxRef.current = ctx;
    gainRef.current = master;
  };

  const toggle = () => {
    if (!on) {
      start();
      setOn(true);
    } else {
      const ctx = ctxRef.current;
      const g = gainRef.current;
      if (ctx && g) {
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        setTimeout(() => ctx.close(), 700);
      }
      ctxRef.current = null;
      setOn(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      aria-pressed={on}
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
      data-cursor={on ? 'mute' : 'sound'}
    >
      {on ? <IconVolume /> : <IconVolumeOff />}
    </button>
  );
}
