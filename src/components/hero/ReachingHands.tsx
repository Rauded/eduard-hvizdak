import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import handsSrc from '../../assets/hero/hands-dither.png';

// The combined hero's hands, animated to reach toward each other. The artwork is
// a pre-baked navy ordered-dither with a fully transparent background (no live
// shader), so there is categorically no background box or seam behind the hands.
// Both halves show the SAME full image, each clipped to its side, then slide
// toward the centre and back so the fingertips almost touch, with a gentle
// breathe. Motion is CSS only; off under reduced motion. Full-bleed so the arms
// reach the screen edges. Desktop-only.

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

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
  }
`;

const ReachingHands: React.FC<{ animate?: boolean }> = ({ animate = true }) => (
  <Band aria-hidden="true">
    <Half $side="left" $animate={animate}>
      <FullWrap $side="left">
        <img src={handsSrc} alt="" />
      </FullWrap>
    </Half>
    <Half $side="right" $animate={animate}>
      <FullWrap $side="right">
        <img src={handsSrc} alt="" />
      </FullWrap>
    </Half>
  </Band>
);

export default ReachingHands;
