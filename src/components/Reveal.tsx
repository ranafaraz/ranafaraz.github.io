import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
};

/**
 * Scroll-reveal wrapper. Framer Motion respects prefers-reduced-motion via the
 * MotionConfig in App, so this degrades to a simple fade/no-move automatically.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
