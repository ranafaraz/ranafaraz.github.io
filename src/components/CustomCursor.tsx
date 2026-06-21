import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Custom cursor: a small dot + a larger trailing ring that grows and shows a
 * label over interactive elements (anything with [data-cursor], a, or button).
 * Only mounts on fine-pointer devices and when motion is allowed.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const el = (e.target as HTMLElement)?.closest(
        '[data-cursor], a, button',
      ) as HTMLElement | null;
      if (el) {
        setLabel(el.getAttribute('data-cursor') ?? '');
        ringRef.current?.classList.add('is-active');
      } else {
        setLabel('');
        ringRef.current?.classList.remove('is-active');
      }
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[60] flex h-9 w-9 -ml-[18px] -mt-[18px] items-center justify-center rounded-full border border-cyan/60 text-[9px] font-medium uppercase tracking-wider text-cyan transition-[width,height,background-color] duration-200"
      >
        {label}
      </div>
      <style>{`
        .cursor-ring.is-active {
          width: 64px; height: 64px;
          margin-left: -32px; margin-top: -32px;
          background: rgba(34,211,238,0.12);
        }
      `}</style>
    </>
  );
}
