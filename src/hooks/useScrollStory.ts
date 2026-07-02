import { useEffect } from 'react';
import { ACTS, marks, scroll } from '../three/scrollStore';

/**
 * Drives the shared {@link scroll} store from native scroll + pointer input and
 * eases `progress`/`velocity` on a rAF loop. Mount ONCE (in HomePage). Writes to
 * a plain object — never sets React state — so scrolling stays re-render-free.
 *
 * When smooth-scroll (Lenis) is active it feeds `scroll.target` directly; this
 * loop still owns the easing + pointer smoothing, so the two compose cleanly.
 */
export function useScrollStory() {
  useEffect(() => {
    let raf = 0;

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    // Measure where each act's DOM section sits (normalized 0..1, section centered
    // in the viewport) so the camera + reveals lock to the real content layout.
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      for (const act of ACTS) {
        const el = document.getElementById(act.section);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        // Anchor the act to when the section's heading has entered view (top ~20%
        // down the viewport) — that's when a visitor is reading it, so the 3D act
        // is at full strength while the content is on screen.
        const anchor = top - window.innerHeight * 0.2;
        marks[act.section] = Math.min(1, Math.max(0, anchor / max));
      }
    };

    const onResize = () => {
      scroll.viewportH = window.innerHeight;
      measure();
      readScroll();
    };

    const onPointer = (x: number, y: number) => {
      scroll.pointer.x = (x / window.innerWidth) * 2 - 1;
      scroll.pointer.y = -((y / window.innerHeight) * 2 - 1);
    };
    const onMouse = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPointer(t.clientX, t.clientY);
    };

    // Eased follower loop — decoupled from scroll event frequency.
    const tick = () => {
      const prev = scroll.progress;
      scroll.progress += (scroll.target - scroll.progress) * 0.08;
      scroll.velocity += ((scroll.progress - prev) - scroll.velocity) * 0.1;
      raf = requestAnimationFrame(tick);
    };

    measure();
    readScroll();
    // Re-measure after late layout shifts (fonts, images, lazy content).
    const t1 = window.setTimeout(measure, 400);
    const t2 = window.setTimeout(measure, 1500);
    window.addEventListener('load', measure);
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('load', measure);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);
}
