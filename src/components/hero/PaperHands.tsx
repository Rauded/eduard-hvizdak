import React from 'react';
import styled from 'styled-components';
import { HalftoneDots, ImageDithering } from '@paper-design/shaders-react';
import handsSrc from '../../assets/hero/hands.jpg';

// Paper Shaders (paper.design, MIT) rendering the hands photo as a GPU halftone
// or ordered-dither in the site navy. Two variants, compared against the
// hand-rolled shader / 2D dither via ?hands= in hero.tsx. The image is on a
// black ground, so low luminance maps to the page white (colorBack) and the
// hands render in navy (colorFront). Confined to the top band with a soft
// bottom fade so it never overlays the headline; desktop-only.

const Band = styled.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  /* Match the cropped hands strip (3.1:1) so contain fills the band with the
     whole composition: both hands complete, nothing cut at the top, and a
     comfortable margin from the screen edges. */
  width: min(94%, 1120px);
  aspect-ratio: 3.1 / 1;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 70%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 0%, #000 70%, transparent 100%);

  /* Paper renders a <div><canvas> that we let fill the band. */
  & > div,
  & canvas {
    width: 100% !important;
    height: 100% !important;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

interface Props {
  variant: 'halftone' | 'dither';
}

const PaperHands: React.FC<Props> = ({ variant }) => (
  <Band aria-hidden="true">
    {variant === 'halftone' ? (
      <HalftoneDots
        width="100%"
        height="100%"
        image={handsSrc}
        colorBack="#ffffff"
        colorFront="#182e5f"
        originalColors={false}
        grid="hex"
        type="gooey"
        size={0.5}
        radius={1.2}
        contrast={0.45}
        grainMixer={0.15}
        grainOverlay={0.12}
        fit="contain"
      />
    ) : (
      <ImageDithering
        width="100%"
        height="100%"
        image={handsSrc}
        colorBack="#ffffff"
        colorFront="#182e5f"
        colorHighlight="#8aa5d8"
        originalColors={false}
        inverted={false}
        type="8x8"
        size={1.3}
        colorSteps={6}
        fit="contain"
      />
    )}
  </Band>
);

export default PaperHands;
