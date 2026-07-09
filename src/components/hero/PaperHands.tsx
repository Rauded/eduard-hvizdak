import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HalftoneDots, ImageDithering } from '@paper-design/shaders-react';
import handsSrc from '../../assets/hero/hands.jpg';
import { HeroVariant, getVariant, DEFAULT_VARIANT } from './heroVariants';

// Paper Shaders (paper.design, MIT) rendering the hands photo as a GPU halftone
// or ordered-dither in the site navy. The treatment comes from a variant preset
// (heroVariants.ts), selected via ?variant=. Desktop-only. The full-bleed band
// lets the arms reach the screen edges; the motion is the shader's own grain
// shimmer (driven by `speed`), transform-free so it composites cleanly, and off
// under reduced motion per the paper-design skill.

const Band = styled.div<{ $maxWidth: number; $fullBleed: boolean }>`
  position: absolute;
  z-index: 1;
  pointer-events: none;

  ${(p) =>
    p.$fullBleed
      ? `
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 54vh;
  `
      : `
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: min(96%, ${p.$maxWidth}px);
    aspect-ratio: 3.1 / 1;
  `}

  & > div,
  & canvas {
    width: 100% !important;
    height: 100% !important;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

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

interface Props {
  variant?: number;
}

const PaperHands: React.FC<Props> = ({ variant = DEFAULT_VARIANT }) => {
  const v: HeroVariant = getVariant(variant);
  const reduce = usePrefersReducedMotion();
  const sizing = {
    fit: v.fit ?? 'contain',
    scale: v.scale ?? 1,
    offsetX: v.offsetX ?? 0,
    offsetY: v.offsetY ?? 0,
    speed: reduce ? 0 : v.speed ?? 0,
  } as const;
  return (
    <Band $maxWidth={v.bandMaxWidth} $fullBleed={!!v.fullBleed} aria-hidden="true">
      {v.renderer === 'halftone' ? (
        <HalftoneDots
          width="100%"
          height="100%"
          image={handsSrc}
          colorBack={v.colorBack}
          colorFront={v.colorFront}
          originalColors={false}
          inverted
          grid={v.grid}
          type={v.dotType}
          size={v.size}
          radius={v.radius}
          contrast={v.contrast}
          grainOverlay={v.grainOverlay ?? 0}
          {...sizing}
        />
      ) : (
        <ImageDithering
          width="100%"
          height="100%"
          image={handsSrc}
          colorBack={v.colorBack}
          colorFront={v.colorFront}
          colorHighlight={v.colorHighlight}
          originalColors={false}
          inverted={false}
          type={v.ditherType}
          size={v.size}
          colorSteps={v.colorSteps}
          {...sizing}
        />
      )}
    </Band>
  );
};

export default PaperHands;
