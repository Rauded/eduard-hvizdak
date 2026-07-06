import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeContext';
// Source photo: "Person Reaching Out to a Robot" by Tara Winstead, Pexels
// (free license, https://www.pexels.com/photo/8386434/), background removed
// and composited on black. The Creation-of-Adam composition: a human hand and
// a robotic hand reaching toward each other. Iconic, instantly readable
// silhouette, and the subject IS the site's pitch (humans working with AI).
import handsSrc from '../../assets/hero/hands.jpg';

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

interface Props {
  layout?: 'bloom' | 'edges';
}
//
// The dither renderer writes one cell per ImageData pixel at grid resolution
// and upscales with image smoothing off, then knocks a 1px grid out of the
// result so the dots read as printed halftone instead of smeared blocks.
// That is dramatically cheaper than per-cell fillRect calls, which is what
// makes the fine dot pitch affordable.

const MASKS = {
  /* the whole hands composition spans the hero, dissolving softly at the
     edges; the Content quiet-zone halo hollows the center for the headline */
  bloom: 'radial-gradient(86% 62% at 50% 26%, #000 70%, transparent 94%)',
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
// 2px pitch is ~324k cells and still one putImageData + one drawImage.
const MAX_DITHER_CELLS = 420000;
const FRAME_MS = 66; // ~15fps; the slow breath reads fine and halves the work
// Cells darker than this never draw, so the photo's black ground stays truly
// empty and the bloom keeps a crisp silhouette (the shimmer amplitude cannot
// lift background cells over it).
const LUM_FLOOR = 0.06;

// Levels curve applied at sample time. A gentle contrast expansion keeps the
// long backlit gradients (which the fine dither turns into smooth density
// ramps) while dropping the near-black ground below the floor.
const shape = (lum: number) => Math.min(1, Math.max(0, (lum - 0.06) * 1.9));

const AsciiDitherBackground: React.FC<Props> = ({ layout = 'bloom' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Navy palette for the humandelta experiment: rgba tuples feed the
    // dither's ImageData directly (base tone for the body of the bloom, hi
    // for petal highlights). Retinted from the original brand blue.
    const palette =
      theme === 'dark'
        ? {
            base: [92, 123, 192, 82] as const, // #5c7bc0 at 0.32
            hi: [138, 165, 216, 210] as const, // #8aa5d8 at 0.82
          }
        : {
            base: [63, 91, 160, 185] as const, // #3f5ba0 at 0.73
            hi: [24, 46, 95, 235] as const, // #182e5f at 0.92
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
      const maxCells = MAX_DITHER_CELLS;
      cell = 4; // print pitch; batched Path2D drawing keeps this cheap
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
      {
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
        // Contain the WHOLE composition, centered: both hands stay in frame
        // (the silhouette is the point; never crop the subject). The two
        // hands drift apart and back together on a slow breath, reaching
        // toward the headline that sits in the gap between them.
        // Each half is cropped to just its hand's vertical band in the
        // source, which makes both crops wide-format: the hands can then
        // scale much larger without outgrowing the hero's top band.
        const half = img.width / 2;
        const bandH = img.height * 0.42;
        const syL = img.height * 0.2; // robot hand band
        const syR = img.height * 0.4; // human hand band (sits lower in frame)
        const targetW = cols * 0.46; // each hand spans ~46% of the hero width
        const scale = (targetW / half) * (1.0 + 0.015 * Math.sin(t * 0.12));
        const dw = half * scale;
        const dh = bandH * scale;
        const breathe = 3 * Math.sin(t * 0.2); // hands ease toward and apart
        const dyL = rows * 0.07 + Math.cos(t * 0.05);
        const dxL = cols * 0.03 - breathe;
        offCtx.drawImage(img, 0, syL, half, bandH, dxL, dyL, dw, dh);
        const dyR = rows * 0.17 - Math.cos(t * 0.05);
        const dxR = cols * 0.97 - dw + breathe;
        offCtx.drawImage(img, half, syR, half, bandH, dxR, dyR, dw, dh);
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

      // Print-halftone pass: one round navy dot per cell, radius and tone
      // driven by luminance (bright source areas get bigger, darker dots on
      // the white page reads inverted, so bright = more ink here where the
      // subject lives on a black ground). Bayer keeps the dithered edges.
      const [br, bg, bb] = palette.base;
      const [hr, hg, hb] = palette.hi;
      const baseA = palette.base[3] / 255;
      const hiA = palette.hi[3] / 255;
      const maxR = cell * 0.42;
      const basePath = new Path2D();
      const hiPath = new Path2D();
      for (let y = 0; y < rows; y++) {
        const bayerRow = BAYER8[y % 8];
        const cy = y * cell + cell / 2;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const p = i * 4;
          const lum = shape(
            (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255
          );
          if (lum < LUM_FLOOR) continue;
          const v = lum + 0.04 * Math.sin(t * 1.4 + hash[i] * 6.283);
          const threshold = bayerRow[x % 8];
          if (v <= threshold * 0.55) continue;
          const r = 0.7 + Math.min(1, v) * (maxR - 0.7);
          const target = v > threshold + 0.5 ? hiPath : basePath;
          const cx = x * cell + cell / 2;
          target.moveTo(cx + r, cy);
          target.arc(cx, cy, r, 0, Math.PI * 2);
        }
      }
      ctx.fillStyle = `rgba(${br}, ${bg}, ${bb}, ${baseA})`;
      ctx.fill(basePath);
      ctx.fillStyle = `rgba(${hr}, ${hg}, ${hb}, ${hiA})`;
      ctx.fill(hiPath);
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_MS) return;
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
    img.src = handsSrc;

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
  }, [theme, layout]);

  return <BgCanvas ref={canvasRef} $layout={layout} aria-hidden="true" />;
};

export default AsciiDitherBackground;
