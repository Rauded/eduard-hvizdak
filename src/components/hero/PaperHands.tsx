import React from 'react';
import styled from 'styled-components';
import { HalftoneDots, ImageDithering } from '@paper-design/shaders-react';
import handsSrc from '../../assets/hero/hands.jpg';
import { HeroVariant, getVariant, DEFAULT_VARIANT } from './heroVariants';

// Paper Shaders (paper.design, MIT) rendering the hands photo as a GPU halftone
// or ordered-dither in the site navy. The exact treatment comes from a variant
// preset (see heroVariants.ts), selected via ?variant= for the design-review
// loop. Confined to a top band matching the cropped hands strip (3.1:1) so the
// whole composition shows with nothing cut; desktop-only.

const Band = styled.div<{ $maxWidth: number }>`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: min(96%, ${(p) => p.$maxWidth}px);
  aspect-ratio: 3.1 / 1;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 70%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 0%, #000 70%, transparent 100%);

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
  variant?: number;
}

const PaperHands: React.FC<Props> = ({ variant = DEFAULT_VARIANT }) => {
  const v: HeroVariant = getVariant(variant);
  return (
    <Band $maxWidth={v.bandMaxWidth} aria-hidden="true">
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
          fit="contain"
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
          fit="contain"
        />
      )}
    </Band>
  );
};

export default PaperHands;
