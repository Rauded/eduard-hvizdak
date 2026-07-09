import React from 'react';
import styled from 'styled-components';
import { MeshGradient, GrainGradient, Dithering } from '@paper-design/shaders-react';

// Alternative hero backdrops (Paper Shaders), explored as hero concepts via
// ?hero=. All kept deliberately subtle and navy/white so the headline stays
// high-contrast: these sit full-bleed behind the hero content, not competing
// with it. Desktop-first (the motion is decorative, so hidden on small screens).

export type BackdropConcept = 'mesh' | 'grain' | 'ditherbg';

const Full = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  & > div,
  & canvas {
    width: 100% !important;
    height: 100% !important;
  }

  /* Soft fade at the bottom edge so it dissolves into the page. */
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroBackdrop: React.FC<{ concept: BackdropConcept }> = ({ concept }) => (
  <Full aria-hidden="true">
    {concept === 'mesh' && (
      <MeshGradient
        width="100%"
        height="100%"
        colors={['#ffffff', '#eef2f8', '#d8e2f2', '#c3d2ea']}
        distortion={0.7}
        swirl={0.25}
        speed={0.12}
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
        speed={0.1}
      />
    )}
    {concept === 'ditherbg' && (
      <Dithering
        width="100%"
        height="100%"
        colorBack="#ffffff"
        colorFront="#c3d2ea"
        shape="wave"
        type="8x8"
        size={2}
        speed={0.12}
      />
    )}
  </Full>
);

export default HeroBackdrop;
