// Hero hands variant presets, explored via ?variant=N for the design-review
// loop. Each preset fully describes the Paper Shaders treatment of the hands
// photo plus the band size. The screenshot script (scripts/hero-shots.mjs)
// iterates these; the winner becomes the locked default.

export interface HeroVariant {
  id: number;
  label: string;
  note: string;
  renderer: 'dither' | 'halftone';
  bandMaxWidth: number;
  // Common
  colorBack: string;
  colorFront: string;
  // ImageDithering
  ditherType?: '2x2' | '4x4' | '8x8';
  size?: number;
  colorSteps?: number;
  colorHighlight?: string;
  // HalftoneDots
  grid?: 'hex' | 'square';
  dotType?: 'gooey' | 'classic';
  radius?: number;
  contrast?: number;
  grainOverlay?: number;
}

const NAVY = '#182e5f';
const NAVY_SOFT = '#2b4585';
const HI = '#8aa5d8';
const PAPER = '#f4f1ea';
const INK = '#1a2340';

export const HERO_VARIANTS: HeroVariant[] = [
  {
    id: 1, label: 'Dither 8x8 fine', note: 'Bayer 8x8, fine pitch, smooth 6 steps. The current default.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    colorHighlight: HI, ditherType: '8x8', size: 1.3, colorSteps: 6,
  },
  {
    id: 2, label: 'Dither 8x8 ultra-fine', note: 'Finer pitch (size 1.0) and 7 steps: closest to a photo, most detail.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    colorHighlight: HI, ditherType: '8x8', size: 1.0, colorSteps: 7,
  },
  {
    id: 3, label: 'Dither 4x4 print', note: 'Bayer 4x4, coarser pitch: reads as a printed newspaper halftone.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    colorHighlight: HI, ditherType: '4x4', size: 1.7, colorSteps: 4,
  },
  {
    id: 4, label: 'Dither 2x2 chunky', note: 'Bayer 2x2, big pixels: retro 8-bit graphic.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    colorHighlight: HI, ditherType: '2x2', size: 2.2, colorSteps: 3,
  },
  {
    id: 5, label: 'Dither 2-tone graphic', note: 'Hard 2 steps: high-contrast poster, no midtones.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    colorHighlight: NAVY, ditherType: '8x8', size: 1.3, colorSteps: 2,
  },
  {
    id: 6, label: 'Dither warm duotone', note: 'Ink on warm paper instead of navy on white: editorial riso feel.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: PAPER, colorFront: INK,
    colorHighlight: '#5a6a9a', ditherType: '8x8', size: 1.3, colorSteps: 6,
  },
  {
    id: 7, label: 'Dither softer navy', note: 'Lighter navy front for a quieter, less heavy read.',
    renderer: 'dither', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY_SOFT,
    colorHighlight: '#a9bde6', ditherType: '8x8', size: 1.3, colorSteps: 6,
  },
  {
    id: 8, label: 'Dither bigger', note: 'Same fine dither, larger band (1500px): more presence.',
    renderer: 'dither', bandMaxWidth: 1500, colorBack: '#ffffff', colorFront: NAVY,
    colorHighlight: HI, ditherType: '8x8', size: 1.3, colorSteps: 7,
  },
  {
    id: 9, label: 'Halftone hex gooey', note: 'Round hex dots, gooey merge: classic pop-art print.',
    renderer: 'halftone', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    grid: 'hex', dotType: 'gooey', size: 0.5, radius: 1.2, contrast: 0.5,
  },
  {
    id: 10, label: 'Halftone hex round', note: 'Discrete round dots (no gooey): cleaner engraving dots.',
    renderer: 'halftone', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    grid: 'hex', dotType: 'classic', size: 0.5, radius: 1.0, contrast: 0.5,
  },
  {
    id: 11, label: 'Halftone square grid', note: 'Square dot grid: more technical, screen-print look.',
    renderer: 'halftone', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    grid: 'square', dotType: 'classic', size: 0.5, radius: 1.0, contrast: 0.5,
  },
  {
    id: 12, label: 'Halftone fine dots', note: 'Finer, denser dots (size 0.32): subtler, more photographic.',
    renderer: 'halftone', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    grid: 'hex', dotType: 'gooey', size: 0.32, radius: 1.15, contrast: 0.5,
  },
  {
    id: 13, label: 'Halftone high contrast', note: 'Punchier contrast (0.85): bolder shapes, less midtone.',
    renderer: 'halftone', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    grid: 'hex', dotType: 'gooey', size: 0.5, radius: 1.2, contrast: 0.85,
  },
  {
    id: 14, label: 'Halftone with grain', note: 'Hex dots plus film grain: printed-paper texture.',
    renderer: 'halftone', bandMaxWidth: 1300, colorBack: '#ffffff', colorFront: NAVY,
    grid: 'hex', dotType: 'gooey', size: 0.5, radius: 1.2, contrast: 0.5, grainOverlay: 0.35,
  },
];

export const DEFAULT_VARIANT = 1;

export const getVariant = (id: number): HeroVariant =>
  HERO_VARIANTS.find((v) => v.id === id) || HERO_VARIANTS[0];
