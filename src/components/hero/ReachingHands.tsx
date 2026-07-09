import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { HalftoneDots } from '@paper-design/shaders-react';
import handsSrc from '../../assets/hero/hands-clean.jpg';

// The combined hero's hands, animated to reach toward each other. Both halves
// render the SAME full halftone (so they align perfectly), each clipped to its
// side; the two clip layers then slide toward the centre and back, so the
// fingertips almost touch and part, with a gentle breathe. Motion is CSS only
// (the Paper shader is static, speed 0) so it stays cheap; off under reduced
// motion. Full-bleed so the arms reach the screen edges; the source has soft
// black margins so nothing hard-cuts. Desktop-only.

// Left hand eases toward the centre (to the right) and breathes; right mirrors.
const reachRight = keyframes`
  0%, 100% { transform: translateX(0) scale(1); }
  50% { transform: translateX(1.8%) scale(1.02); }
`;
const reachLeft = keyframes`
  0%, 100% { transform: translateX(0) scale(1); }
  50% { transform: translateX(-1.8%) scale(1.02); }
`;

const Band = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  aspect-ratio: 2.85 / 1;
  z-index: 1;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Half = styled.div<{ $side: 'left' | 'right'; $animate: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  width: 52%;
  overflow: hidden;
  ${(p) => p.$side}: 0;
  transform-origin: ${(p) => (p.$side === 'left' ? '0% 40%' : '100% 40%')};
  ${(p) =>
    p.$animate
      ? css`
          animation: ${p.$side === 'left' ? reachRight : reachLeft} 7s ease-in-out infinite;
        `
      : ''}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// The full-image layer, band-width, anchored to the outer edge of its clip so
// the two halves reconstruct the whole composition seamlessly.
const FullWrap = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  height: 100%;
  width: ${(100 / 52) * 100}%;
  ${(p) => p.$side}: 0;

  & div,
  & canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const dots = () => (
  <HalftoneDots
    width="100%"
    height="100%"
    image={handsSrc}
    colorBack="#ffffff00"
    colorFront="#33528d"
    originalColors={false}
    inverted
    grid="hex"
    type="gooey"
    size={0.5}
    radius={1.2}
    contrast={0.85}
    fit="contain"
  />
);

const ReachingHands: React.FC<{ animate?: boolean }> = ({ animate = true }) => (
  <Band aria-hidden="true">
    <Half $side="left" $animate={animate}>
      <FullWrap $side="left">{dots()}</FullWrap>
    </Half>
    <Half $side="right" $animate={animate}>
      <FullWrap $side="right">{dots()}</FullWrap>
    </Half>
  </Band>
);

export default ReachingHands;
