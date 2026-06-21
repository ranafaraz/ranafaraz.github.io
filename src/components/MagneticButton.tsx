import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  download?: boolean;
  ariaLabel?: string;
  cursorLabel?: string;
};

/**
 * Button/link with a magnetic hover pull — the element drifts toward the cursor
 * and snaps back on leave. Disabled under prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  download,
  ariaLabel,
  cursorLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  const cursorProps = cursorLabel ? { 'data-cursor': cursorLabel } : {};

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        download={download}
        aria-label={ariaLabel}
        className={cls}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        {...cursorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cls}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...cursorProps}
    >
      {children}
    </button>
  );
}
