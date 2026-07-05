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
// Bayer-dithered halftone (2 to 3 px dots, like a risograph print) or an
// ASCII glyph field in the brand blue, with a slow bloom of the source and a
// gentle shimmer of the pattern. Ported from the experiment/hero-dither
// branch; selected via the ?tars=rose | ?tars=rose-dither hero variants.
// The blue palette is deliberately fixed (Eduard's call), so it does not
// follow the ?accent= presets.
//
// The dither renderer writes one cell per ImageData pixel at grid resolution
// and upscales with image smoothing off, then knocks a 1px grid out of the
// result so the dots read as printed halftone instead of smeared blocks.
// That is dramatically cheaper than per-cell fillRect calls, which is what
// makes the fine dot pitch affordable.

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
  /* one focal mass: the whole bloom sits in the upper right and dissolves
     softly at its own edges, well before the headline column */
  -webkit-mask-image: radial-gradient(68% 74% at 79% 38%, #000 55%, transparent 76%);
  mask-image: radial-gradient(68% 74% at 79% 38%, #000 55%, transparent 76%);

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

const ASCII_RAMP = ' .:-=+*#%@';

// Dither cells are ImageData pixels, so the budget is generous: 1440x900 at a
// 3px pitch is ~144k cells and still one putImageData + one drawImage.
const MAX_DITHER_CELLS = 220000;
const MAX_ASCII_CELLS = 14000;
const FRAME_MS = 50; // ~20fps; the shimmer reads fine well below 60fps
// Cells darker than this never draw, so the photo's black ground stays truly
// empty and the bloom keeps a crisp silhouette (the shimmer amplitude cannot
// lift background cells over it).
const LUM_FLOOR = 0.06;

// Levels curve applied at sample time. A gentle contrast expansion keeps the
// long backlit gradients (which the fine dither turns into smooth density
// ramps) while dropping the near-black ground below the floor.
const shape = (lum: number) => Math.min(1, Math.max(0, (lum - 0.12) * 1.55));

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

    // Accent-only palettes per theme. css strings feed the ascii glyph mode;
    // the rgba tuples feed the dither's ImageData directly (base tone for the
    // body of the bloom, hi tone for petal highlights).
    const palette =
      theme === 'dark'
        ? {
            dim: 'rgba(59, 130, 246, 0.28)', // #3b82f6
            mid: 'rgba(96, 165, 250, 0.5)', // #60a5fa
            bright: 'rgba(147, 197, 253, 0.75)', // #93c5fd
            base: [96, 165, 250, 82] as const, // #60a5fa at 0.32
            hi: [147, 197, 253, 210] as const, // #93c5fd at 0.82
          }
        : {
            dim: '#a5bef3', // #2563eb mixed 60% toward page bg #fafaf8
            mid: 'rgba(101, 144, 239, 0.7)', // #2563eb mixed 30% toward page bg
            bright: 'rgba(37, 99, 235, 0.55)', // #2563eb
            base: [76, 118, 235, 120] as const, // soft blue at 0.47
            hi: [37, 99, 235, 205] as const, // #2563eb at 0.8
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

    const layout = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const maxCells = mode === 'dither' ? MAX_DITHER_CELLS : MAX_ASCII_CELLS;
      cell = mode === 'dither' ? (w < 768 ? 2 : 3) : Math.max(13, Math.round(w / 70));
      // Bound total work regardless of viewport size.
      while (Math.ceil(w / cell) * Math.ceil(h / cell) > maxCells) cell += 1;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const dpr = Math.min(window.devicePixelRatio || 1, mode === 'dither' ? 2 : 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.width = cols;
      off.height = rows;
      if (mode === 'dither') {
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

      // Contain the WHOLE bloom, large, in the upper right of the hero (the
      // silhouette is the point; never crop the flower). The bloom's center
      // sits at ~(0.42, 0.42) of the cropped photo. Slow breathing scale plus
      // a slight drift keep it alive.
      const base = Math.min((cols * 0.62) / img.width, (rows * 0.96) / img.height);
      const scale = base * (1.0 + 0.035 * Math.sin(t * 0.15));
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = cols * 0.79 - dw * 0.42 + 1.5 * Math.sin(t * 0.07);
      const dy = rows * 0.4 - dh * 0.42 + Math.cos(t * 0.05);
      offCtx.clearRect(0, 0, cols, rows);
      offCtx.drawImage(img, dx, dy, dw, dh);
      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mode === 'dither' && dots) {
        const px = dots.data;
        px.fill(0);
        const [br, bg, bb, ba] = palette.base;
        const [hr, hg, hb, ha] = palette.hi;
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
