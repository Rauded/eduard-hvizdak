import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MeshGradient, GrainGradient, Dithering } from '@paper-design/shaders-react';

// Alternative hero backdrops (Paper Shaders), explored as hero concepts via
// ?hero=. All kept deliberately subtle and navy/white so the headline stays
// high-contrast: these sit full-bleed behind the hero content, never competing
// with it. Following the paper-design skill: contained canvas, pointer-events
// none, reduced-motion freezes the animation (speed 0 + fixed frame), and the
// `faint` mode is a whisper texture for layering under the dithered hands.
// Desktop-first (decorative motion, hidden on small screens).

export type BackdropConcept = 'mesh' | 'grain' | 'ditherbg';

const usePrefersReducedMotion = (): boolean => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener?.('change', on);
    return () => m.removeEventListener?.('change', on);
  }, []);
  return reduce;
};

const Full = styled.div<{ $faint: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: ${(p) => (p.$faint ? 0.7 : 1)};

  & > div,
  & canvas {
    width: 100% !important;
    height: 100% !important;
  }

  /* Faint mode is the FULL-BLEED base layer (a light dither texture across the
     whole hero), softly fading at the very top and bottom edges so it never
     hard-edges; full mode fades at the bottom edge. */
  -webkit-mask-image: ${(p) =>
    p.$faint
      ? 'linear-gradient(180deg, transparent 0%, #000 14%, #000 90%, transparent 100%)'
      : 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)'};
  mask-image: ${(p) =>
    p.$faint
      ? 'linear-gradient(180deg, transparent 0%, #000 14%, #000 90%, transparent 100%)'
      : 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)'};

  @media (max-width: 768px) {
    display: none;
  }
`;

interface Props {
  concept: BackdropConcept;
  faint?: boolean;
}

const HeroBackdrop: React.FC<Props> = ({ concept, faint = false }) => {
  const reduce = usePrefersReducedMotion();
  const anim = (s: number) => (reduce ? 0 : s);
  const frame = reduce ? 900 : undefined;
  return (
    <Full $faint={faint} aria-hidden="true">
      {concept === 'mesh' && (
        <MeshGradient
          width="100%"
          height="100%"
          colors={['#ffffff', '#eef2f8', '#d8e2f2', '#c3d2ea']}
          distortion={0.7}
          swirl={0.25}
          speed={anim(0.12)}
          frame={frame}
        />
      )}
      {concept === 'grain' && (
        <GrainGradient
          width="100%"
          height="100%"
          colorBack="#ffffff"
          colors={['#eef2f8', '#c3d2ea', '#8aa5d8']}
          softness={0.8}
          intensity={0.35}
          noise={0.35}
          speed={anim(0.1)}
          frame={frame}
        />
      )}
      {concept === 'ditherbg' && (
        <Dithering
          width="100%"
          height="100%"
          colorBack="#ffffff"
          colorFront={faint ? '#dbe4f4' : '#c3d2ea'}
          shape="wave"
          type="8x8"
          size={faint ? 3 : 2}
          speed={faint ? 0 : anim(0.12)}
          frame={faint ? 400 : frame}
        />
      )}
    </Full>
  );
};

export default HeroBackdrop;
