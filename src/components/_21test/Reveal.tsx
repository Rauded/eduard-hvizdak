import React, { useEffect, useRef, useState } from 'react';
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
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setSeen(true); io.disconnect(); }
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
