import React, { useEffect, useRef, useState } from 'react';
import { useHydrating } from '../common/useHydrating';
import './reveal.scss';

// ── TEST: scroll-reveal wrapper. Fades + rises its child in when it enters the
// viewport, so sections announce themselves as you scroll (harder to skip past).
type Props = {
  children: React.ReactNode;
  delay?: number;      // ms stagger
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

const Reveal: React.FC<Props> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const ref = useRef<HTMLElement>(null);
  // Baked revealed, so the prerendered page paints whole before the bundle runs.
  const [seen, setSeen] = useState(useHydrating());
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setSeen(true); io.disconnect(); }
      // A baked section that is still off screen goes back to waiting for its scroll.
      else if (e[0].intersectionRatio === 0) setSeen(false);
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
