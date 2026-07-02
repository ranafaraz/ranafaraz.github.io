import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Buttery smooth-scroll via Lenis. Wheel/programmatic scrolling is eased; touch
 * stays native (avoids the mobile scroll-jank Lenis can introduce). Gated off
 * when `enabled` is false (reduced-motion / off tier). Lenis moves the real
 * scroll position, so the shared scroll store stays in sync automatically.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Keep in-page anchor links (nav, scroll cue) working with eased scroll.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
    };
  }, [enabled]);
}
