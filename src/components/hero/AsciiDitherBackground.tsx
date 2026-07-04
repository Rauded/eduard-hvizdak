import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeContext';
// Source photo: "Back-lit tulip on a black background" by photochem_PA,
// Wikimedia Commons, CC BY 2.0
// (https://commons.wikimedia.org/wiki/File:Back-lit_tulip_on_a_black_background_(14020051016).jpg)
// Chosen for the dither: a few large backlit petals with long smooth
// gradients survive Bayer dithering far better than fine floret detail.
import flowerSrc from '../../assets/hero/flower.jpg';

// Experimental hero background: the flower photo is re-rendered live as a
// coarse Bayer-dithered dot field or an ASCII glyph field in the accent color,
// with a slow bloom of the source and a gentle shimmer of the pattern.
// Gated behind the heroAscii feature flag (?hero=on, ?heroMode=dither|ascii).

interface Props {
  mode: 'dither' | 'ascii';
}

const BgCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
  /* one focal mass: the field lives around the bloom in the lower right and
     dissolves before it reaches the headline column */
  -webkit-mask-image: radial-gradient(95% 115% at 86% 76%, #000 32%, transparent 63%);
  mask-image: radial-gradient(95% 115% at 86% 76%, #000 32%, transparent 63%);

  &.ready {
    opacity: 1;
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

const ASCII_RAMP = ' .:-=+*#%@';

const MAX_CELLS = 14000;
const FRAME_MS = 50; // ~20fps; the shimmer reads fine well below 60fps
// Cells darker than this never draw, so the photo's black ground stays truly
// empty and the bloom keeps a crisp silhouette (the shimmer amplitude of 0.05
// cannot lift background cells over it).
const LUM_FLOOR = 0.09;

// Levels curve applied at sample time. The daisy is mid-tone almost
// everywhere, and raw mid-tones dither to a uniform 50% checkerboard with no
// petal structure. Expanding the contrast pushes highlights toward solid
// fill and drops the shadows between petals below the floor, so the floret
// pattern survives the dither.
const shape = (lum: number) => Math.min(1, Math.max(0, (lum - 0.18) * 1.9));

const AsciiDitherBackground: React.FC<Props> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Accent-only palettes per theme. On the light page the dim tone is mixed
    // toward the page background instead of using alpha alone, which looks
    // harsh on white.
    const palette =
      theme === 'dark'
        ? {
            dim: 'rgba(59, 130, 246, 0.28)', // #3b82f6
            mid: 'rgba(96, 165, 250, 0.5)', // #60a5fa
            bright: 'rgba(147, 197, 253, 0.75)', // #93c5fd
          }
        : {
            dim: '#a5bef3', // #2563eb mixed 60% toward page bg #fafaf8
            mid: 'rgba(101, 144, 239, 0.7)', // #2563eb mixed 30% toward page bg
            bright: 'rgba(37, 99, 235, 0.55)', // #2563eb
          };

    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return undefined;

    const img = new Image();
    let imgReady = false;
    let cols = 0;
    let rows = 0;
    let cell = 0;
    let hash = new Float32Array(0);
    let rafId = 0;
    let running = false;
    let inView = true;
    let lastFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const layout = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      cell = mode === 'dither' ? Math.max(9, Math.round(w / 110)) : Math.max(13, Math.round(w / 70));
      // Bound total work regardless of viewport size.
      while (Math.ceil(w / cell) * Math.ceil(h / cell) > MAX_CELLS) cell += 1;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const dpr = Math.min(window.devicePixelRatio || 1, mode === 'dither' ? 2 : 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.width = cols;
      off.height = rows;
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

      // Slow bloom + drift of the source. The tulip's petals sweep out of the
      // photo's lower right, so anchor that corner to the canvas corner and
      // let the petal edge arc up toward the middle of the hero.
      const base = Math.max(cols / img.width, rows / img.height);
      const scale = base * (1.06 + 0.05 * Math.sin(t * 0.15));
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = cols - dw + 1.5 * Math.sin(t * 0.07);
      // Push the crop down so the petal crown arcs through the middle of the
      // hero with dark space above it, instead of filling the whole frame.
      const dy = rows - dh + rows * 0.22 + Math.cos(t * 0.05);
      offCtx.clearRect(0, 0, cols, rows);
      offCtx.drawImage(img, dx, dy, dw, dh);
      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mode === 'dither') {
        const dimPath = new Path2D();
        const brightPath = new Path2D();
        let drewDim = false;
        let drewBright = false;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const p = i * 4;
            const lum = shape(
              (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255
            );
            if (lum < LUM_FLOOR) continue;
            const v = lum + 0.05 * Math.sin(t * 1.4 + hash[i] * 6.283);
            const threshold = BAYER8[y % 8][x % 8];
            if (v <= threshold) continue;
            if (v > threshold + 0.45) {
              brightPath.rect(x * cell, y * cell, cell - 1, cell - 1);
              drewBright = true;
            } else {
              dimPath.rect(x * cell, y * cell, cell - 1, cell - 1);
              drewDim = true;
            }
          }
        }
        if (drewDim) {
          ctx.fillStyle = palette.dim;
          ctx.fill(dimPath);
        }
        if (drewBright) {
          ctx.fillStyle = palette.bright;
          ctx.fill(brightPath);
        }
      } else {
        // Glyph density follows luminance in both themes: on dark the dense
        // glyphs read as bright petals, on light they read as the blue bloom.
        ctx.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.textBaseline = 'top';
        const buckets: Array<Array<[string, number, number]>> = [[], [], []];
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const p = i * 4;
            const lum = shape(
              (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255
            );
            if (lum < LUM_FLOOR) continue;
            const v = lum + 0.05 * Math.sin(t * 1.4 + hash[i] * 6.283);
            // Bayer threshold nudges the ramp index by one step for texture.
            const dith = (BAYER8[y % 8][x % 8] - 0.5) / ASCII_RAMP.length;
            const idx = Math.min(
              ASCII_RAMP.length - 1,
              Math.max(0, Math.floor((v + dith) * ASCII_RAMP.length))
            );
            const glyph = ASCII_RAMP[idx];
            if (glyph === ' ') continue;
            const bucket = v < 0.35 ? 0 : v < 0.65 ? 1 : 2;
            buckets[bucket].push([glyph, x * cell, y * cell]);
          }
        }
        const styles = [palette.dim, palette.mid, palette.bright];
        buckets.forEach((bucket, b) => {
          if (!bucket.length) return;
          ctx.fillStyle = styles[b];
          bucket.forEach(([glyph, gx, gy]) => ctx.fillText(glyph, gx, gy));
        });
      }
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
      layout();
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
        layout();
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
  }, [mode, theme]);

  return <BgCanvas ref={canvasRef} aria-hidden="true" />;
};

export default AsciiDitherBackground;
