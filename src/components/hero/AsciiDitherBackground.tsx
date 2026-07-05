import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeContext';
// Source photo: "Water lily on black" by ryan baker thefirebaker, Wikimedia
// Commons, CC0, cropped around the bloom
// (https://commons.wikimedia.org/wiki/File:Water_lily_on_black_(Unsplash).jpg)
// Chosen because the whole flower has an iconic, instantly readable
// silhouette: layered petals radiating from a bright center. Abstract petal
// macros dither into elegant mush; a full bloom stays a flower.
import flowerSrc from '../../assets/hero/flower.jpg';

// Hero background: the flower photo is re-rendered live as a fine-grained
// Bayer-dithered halftone (2 to 3 px dots, like a risograph print) in the
// brand blue, with a slow bloom of the source and a gentle shimmer of the
// pattern. Ported from the experiment/hero-dither branch (dither mode only;
// the ASCII glyph mode was tried and dropped).
//
// Two layouts:
//   'bloom' (?tars=rose)  → one large bloom, upper right
//   'edges' (?tars=edges) → smaller blooms cropped by the hero's edges, like
//     embroidery growing in from the sides; masked so the center stays clear
//     and drawn at reduced alpha so text and the terminal keep contrast.
//
// Two render modes:
//   'dither'  → the original fine Bayer halftone (2 to 3 px dots)
//   'symbols' (?tars=symbols) → symbol halftone, after arlan.me/vault/sandbox:
//     the bloom is rebuilt from little marks at a coarser pitch. Luminance is
//     split into three bands and each band stamps its own glyph in its own
//     blue: dim cells a small dot, mid cells a ring, bright cells a frame.
//     Reads like a print made of tiny instrument markings.

interface Props {
  layout?: 'bloom' | 'edges';
  mode?: 'dither' | 'symbols';
}
//
// The dither renderer writes one cell per ImageData pixel at grid resolution
// and upscales with image smoothing off, then knocks a 1px grid out of the
// result so the dots read as printed halftone instead of smeared blocks.
// That is dramatically cheaper than per-cell fillRect calls, which is what
// makes the fine dot pitch affordable.

const MASKS = {
  /* one focal mass: the whole bloom sits in the upper right and dissolves
     softly at its own edges, well before the headline column */
  bloom: 'radial-gradient(68% 74% at 79% 38%, #000 55%, transparent 76%)',
  /* embroidery: only the side bands show, the center of the hero stays clear */
  edges:
    'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.85) 12%, transparent 38%, transparent 62%, rgba(0,0,0,0.85) 88%, #000 100%)',
} as const;

const BgCanvas = styled.canvas<{ $layout: 'bloom' | 'edges' }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
  -webkit-mask-image: ${(p) => MASKS[p.$layout]};
  mask-image: ${(p) => MASKS[p.$layout]};

  &.ready {
    opacity: 1;
  }

  /* The composition needs the empty space of the two-column desktop hero; on
     the stacked mobile layout the bloom lands behind the text, so it stays a
     desktop moment (and saves the battery work). */
  @media (max-width: 768px) {
    display: none;
  }
`;

// 8x8 Bayer matrix, normalized to 0..1 thresholds.
const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64));

// Dither cells are ImageData pixels, so the budget is generous: 1440x900 at a
// 3px pitch is ~144k cells and still one putImageData + one drawImage.
const MAX_DITHER_CELLS = 220000;
const FRAME_MS = 50; // ~20fps; the shimmer reads fine well below 60fps

// Symbols mode stamps one small drawImage per lit cell, so the pitch is much
// coarser and the frame rate lower; both keep the per-frame stamp count in
// the low thousands.
const SYMBOL_CELL = 9;
const MAX_SYMBOL_CELLS = 26000;
const SYMBOL_FRAME_MS = 90;
// Luminance splits between the three symbol bands (after shape()).
const SYMBOL_EDGE_1 = 0.4; // below: dot, above: ring
const SYMBOL_EDGE_2 = 0.72; // below: ring, above: frame
// Cells darker than this never draw, so the photo's black ground stays truly
// empty and the bloom keeps a crisp silhouette (the shimmer amplitude cannot
// lift background cells over it).
const LUM_FLOOR = 0.06;

// Levels curve applied at sample time. A gentle contrast expansion keeps the
// long backlit gradients (which the fine dither turns into smooth density
// ramps) while dropping the near-black ground below the floor.
const shape = (lum: number) => Math.min(1, Math.max(0, (lum - 0.12) * 1.55));

const AsciiDitherBackground: React.FC<Props> = ({ layout = 'bloom', mode = 'dither' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Brand-blue palette per theme: rgba tuples feed the dither's ImageData
    // directly (base tone for the body of the bloom, hi for petal highlights).
    const palette =
      theme === 'dark'
        ? {
            base: [96, 165, 250, 82] as const, // #60a5fa at 0.32
            hi: [147, 197, 253, 210] as const, // #93c5fd at 0.82
          }
        : {
            base: [76, 118, 235, 120] as const, // soft blue at 0.47
            hi: [37, 99, 235, 205] as const, // #2563eb at 0.8
          };

    // Symbol-band inks, dim to bright. Alpha carries the depth: dots are
    // whispers, frames are full-strength brand blue.
    const symbolInk =
      theme === 'dark'
        ? {
            dot: 'rgba(96, 165, 250, 0.5)',
            ring: 'rgba(96, 165, 250, 0.8)',
            frame: 'rgba(147, 197, 253, 0.95)',
          }
        : {
            dot: 'rgba(96, 165, 250, 0.6)',
            ring: 'rgba(59, 130, 246, 0.85)',
            frame: 'rgba(37, 99, 235, 0.95)',
          };

    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return undefined;
    // Dither dots are written here at 1px per cell, then upscaled.
    const dotCanvas = document.createElement('canvas');
    const dotCtx = dotCanvas.getContext('2d');
    if (!dotCtx) return undefined;
    // Static 1px grid knocked out of the upscaled dots each frame so they
    // read as separate printed dots, not merged blocks.
    const gridCanvas = document.createElement('canvas');
    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return undefined;

    const img = new Image();
    let imgReady = false;
    let cols = 0;
    let rows = 0;
    let cell = 0;
    let hash = new Float32Array(0);
    let dots: ImageData | null = null;
    let sprites: HTMLCanvasElement[] = [];
    let rafId = 0;
    let running = false;
    let inView = true;
    let lastFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const layoutCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const maxCells = mode === 'symbols' ? MAX_SYMBOL_CELLS : MAX_DITHER_CELLS;
      cell = mode === 'symbols' ? SYMBOL_CELL : w < 768 ? 2 : 3;
      // Bound total work regardless of viewport size.
      while (Math.ceil(w / cell) * Math.ceil(h / cell) > maxCells) cell += 1;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.width = cols;
      off.height = rows;
      if (mode === 'symbols') {
        // One tiny sprite per band, drawn once at device resolution, then
        // stamped per cell. Dot for dim, ring for mid, frame for bright.
        const s = Math.max(2, Math.round(cell * dpr));
        const inks = [symbolInk.dot, symbolInk.ring, symbolInk.frame];
        sprites = inks.map((ink, band) => {
          const sc = document.createElement('canvas');
          sc.width = s;
          sc.height = s;
          const g = sc.getContext('2d');
          if (!g) return sc;
          g.strokeStyle = ink;
          g.fillStyle = ink;
          g.lineWidth = Math.max(1, s * 0.11);
          if (band === 0) {
            g.beginPath();
            g.arc(s / 2, s / 2, s * 0.16, 0, Math.PI * 2);
            g.fill();
          } else if (band === 1) {
            g.beginPath();
            g.arc(s / 2, s / 2, s * 0.27, 0, Math.PI * 2);
            g.stroke();
          } else {
            const inset = s * 0.2;
            g.strokeRect(inset, inset, s - 2 * inset, s - 2 * inset);
          }
          return sc;
        });
      } else {
        dotCanvas.width = cols;
        dotCanvas.height = rows;
        dots = dotCtx.createImageData(cols, rows);
        // Grid mask in device pixels: opaque 1px lines on every cell boundary.
        gridCanvas.width = canvas.width;
        gridCanvas.height = canvas.height;
        gridCtx.setTransform(1, 0, 0, 1, 0, 0);
        gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        gridCtx.fillStyle = '#000';
        const step = cell * dpr;
        for (let gx = 0; gx <= cols; gx++) {
          gridCtx.fillRect(Math.round(gx * step) - 1, 0, 1, gridCanvas.height);
        }
        for (let gy = 0; gy <= rows; gy++) {
          gridCtx.fillRect(0, Math.round(gy * step) - 1, gridCanvas.width, 1);
        }
      }
      // Per-cell deterministic hash so the shimmer breathes instead of
      // flickering with fresh randomness every frame.
      hash = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
          hash[y * cols + x] = s - Math.floor(s);
        }
      }
    };

    const drawFrame = (now: number) => {
      if (!imgReady || cols === 0) return;
      const t = (now - start) / 1000;

      offCtx.clearRect(0, 0, cols, rows);
      if (layout === 'bloom') {
        // Contain the WHOLE bloom, large, in the upper right of the hero (the
        // silhouette is the point; never crop the flower). The bloom's center
        // sits at ~(0.42, 0.42) of the cropped photo. Slow breathing scale
        // plus a slight drift keep it alive.
        const base = Math.min((cols * 0.62) / img.width, (rows * 0.96) / img.height);
        const scale = base * (1.0 + 0.035 * Math.sin(t * 0.15));
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = cols * 0.79 - dw * 0.42 + 1.5 * Math.sin(t * 0.07);
        const dy = rows * 0.4 - dh * 0.42 + Math.cos(t * 0.05);
        offCtx.drawImage(img, dx, dy, dw, dh);
      } else {
        // Edge embroidery: blooms anchored on the hero's edges, deliberately
        // cropped by them (the mask keeps the hero's center clear). Each one
        // breathes on its own phase; mirrored so they grow inward.
        const placements = [
          { cx: 0.0, cy: 0.82, h: 0.56, mirror: true, phase: 0 },
          { cx: 1.0, cy: 0.14, h: 0.68, mirror: false, phase: 2.1 },
          { cx: 1.02, cy: 0.92, h: 0.4, mirror: false, phase: 4.2 },
        ];
        for (const b of placements) {
          const bs = ((rows * b.h) / img.height) * (1 + 0.03 * Math.sin(t * 0.13 + b.phase));
          const dw = img.width * bs;
          const dh = img.height * bs;
          const dx = cols * b.cx - dw * 0.42 + Math.sin(t * 0.06 + b.phase);
          const dy = rows * b.cy - dh * 0.42 + Math.cos(t * 0.05 + b.phase);
          if (b.mirror) {
            offCtx.save();
            offCtx.translate(dx + dw / 2, 0);
            offCtx.scale(-1, 1);
            offCtx.translate(-(dx + dw / 2), 0);
            offCtx.drawImage(img, dx, dy, dw, dh);
            offCtx.restore();
          } else {
            offCtx.drawImage(img, dx, dy, dw, dh);
          }
        }
      }
      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mode === 'symbols') {
        if (sprites.length !== 3) return;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const p = i * 4;
            const lum = shape(
              (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255
            );
            if (lum < LUM_FLOOR) continue;
            // The shimmer nudges cells near a band edge across it now and
            // then, so the print sparkles instead of sitting frozen.
            const v = lum + 0.03 * Math.sin(t * 1.2 + hash[i] * 6.283);
            const band = v < SYMBOL_EDGE_1 ? 0 : v < SYMBOL_EDGE_2 ? 1 : 2;
            ctx.drawImage(sprites[band], x * cell, y * cell, cell, cell);
          }
        }
        return;
      }

      if (dots) {
        const px = dots.data;
        px.fill(0);
        const aScale = layout === 'edges' ? 0.68 : 1;
        const [br, bg, bb] = palette.base;
        const ba = Math.round(palette.base[3] * aScale);
        const [hr, hg, hb] = palette.hi;
        const ha = Math.round(palette.hi[3] * aScale);
        for (let y = 0; y < rows; y++) {
          const bayerRow = BAYER8[y % 8];
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const p = i * 4;
            const lum = shape(
              (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255
            );
            if (lum < LUM_FLOOR) continue;
            const v = lum + 0.04 * Math.sin(t * 1.4 + hash[i] * 6.283);
            const threshold = bayerRow[x % 8];
            if (v <= threshold) continue;
            if (v > threshold + 0.5) {
              px[p] = hr; px[p + 1] = hg; px[p + 2] = hb; px[p + 3] = ha;
            } else {
              px[p] = br; px[p + 1] = bg; px[p + 2] = bb; px[p + 3] = ba;
            }
          }
        }
        dotCtx.putImageData(dots, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(dotCanvas, 0, 0, cols, rows, 0, 0, cols * cell, rows * cell);
        // Knock the 1px grid out so dots stay discrete (device-pixel space).
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(gridCanvas, 0, 0);
        ctx.restore();
      }
    };

    const frameMs = mode === 'symbols' ? SYMBOL_FRAME_MS : FRAME_MS;
    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < frameMs) return;
      lastFrame = now;
      drawFrame(now);
    };

    const startLoop = () => {
      if (running || reducedMotion || !imgReady || !inView || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    img.onload = () => {
      imgReady = true;
      layoutCanvas();
      drawFrame(performance.now());
      canvas.classList.add('ready');
      startLoop(); // no-op under reduced motion: the single frame above stays
    };
    img.src = flowerSrc;

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startLoop();
      else stopLoop();
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!imgReady) return;
        layoutCanvas();
        drawFrame(performance.now());
      }, 150);
    });
    ro.observe(parent);

    return () => {
      stopLoop();
      img.onload = null;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [theme, layout, mode]);

  return <BgCanvas ref={canvasRef} $layout={layout} aria-hidden="true" />;
};

export default AsciiDitherBackground;
