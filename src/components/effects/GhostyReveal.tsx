import React, { useEffect, useRef, useState } from 'react';
import './GhostyReveal.scss';

// Ghosty reveal: content bleeds in through a soft feathered edge, like it is
// forming out of fog, instead of a hard fade or wipe. The mask is a gradient
// three times the element's size along the travel axis; revealing is just
// sliding mask-position once, so the whole effect is a single CSS transition
// with no per-frame JS. Adapted from arlan.me/vault/ghosty-reveal.
//
// Reduced motion falls back to a plain opacity fade (see the SCSS).

type Direction = 'up' | 'down' | 'left' | 'right';

interface Props {
  children: React.ReactNode;
  /** which way the fog edge travels across the content */
  direction?: Direction;
  /** seconds */
  duration?: number;
  /** seconds */
  delay?: number;
  className?: string;
}

// "Glide": fast start, long soft landing, so the fog edge decelerates into
// place instead of stopping abruptly.
const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';

const GhostyReveal: React.FC<Props> = ({
  children,
  direction = 'up',
  duration = 1.5,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={['ghosty', `ghosty--${direction}`, revealed ? 'ghosty--revealed' : '', className]
        .filter(Boolean)
        .join(' ')}
      // Inline so the site-wide theme-toggle transition rule (which resets
      // transition on every element) cannot clobber the mask sweep.
      style={{
        transition: [
          `-webkit-mask-position ${duration}s ${EASE} ${delay}s`,
          `mask-position ${duration}s ${EASE} ${delay}s`,
          `opacity 0.6s ease ${delay}s`,
        ].join(', '),
      }}
    >
      {children}
    </div>
  );
};

export default GhostyReveal;
