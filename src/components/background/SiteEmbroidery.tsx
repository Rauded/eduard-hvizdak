import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
// Same CC0 water-lily source as the hero bloom (see AsciiDitherBackground).
import flowerSrc from '../../assets/hero/flower.jpg';

// Site-wide embroidery: blooms along the viewport's left and right edges,
// behind every page, rendered in two layers from the same source photo:
//
//   1. a fine Bayer-dithered halftone (3px dots, like a risograph print)
//      that carries the detailed petal gradients, and
//   2. a sparse ASCII glyph pass over the highlights only, so the bright
//      petal edges read as embroidered stitches on top of the print.
//
// The layer is position:fixed, so the same stitched frame stays put while
// the content scrolls past it: one continuous motif across the whole site.
// It paints at z-index -1 (above the html background, below all content)
// and is masked so the middle of the viewport stays completely clear.
//
// The hero owns its own composition, so the layer stays invisible while the
// hero is on screen and fades in smoothly as it scrolls away (opacity is
// driven by an IntersectionObserver on #home, never a scroll listener).
// Pages without a hero show it from the top.
//
// Toggle via ?bg=off / ?bg=embroidery (src/config/background.ts).

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s linear;
  /* only the side bands show; the content column stays clear */
  -webkit-mask-image: linear-gradient(
    90deg,
    #000 0%,
    rgba(0, 0, 0, 0.9) 10%,
    transparent 34%,
    transparent 66%,
    rgba(0, 0, 0, 0.9) 90%,
    #000 100%
  );
  mask-image: linear-gradient(
    90deg,
    #000 0%,
    rgba(0, 0, 0, 0.9) 10%,
    transparent 34%,
    transparent 66%,
    rgba(0, 0, 0, 0.9) 90%,
    #000 100%
  );

  /* On stacked mobile layouts the text runs edge to edge, so the bands
     would sit behind it. Desktop moment only. */
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

// Long luminance ramp for the glyph pass. Only the upper half is ever used
// (glyphs decorate highlights), but the full ramp keeps indexing simple.
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

const DITHER_CELL = 3; // px per halftone dot
const FRAME_MS = 66; // ~15fps; a background shimmer needs no more
const LUM_FLOOR = 0.06;
// Glyphs only above this shaped luminance: stitches on the bright petals.
const GLYPH_FLOOR = 0.48;
const shape = (lum: number) => Math.min(1, Math.max(0, (lum - 0.12) * 1.55));

// Blooms anchored on the viewport edges, cropped by them on purpose. Large
// blooms carry the motif; small buds cluster around them so each edge reads
// as a composed spray, not a repeated stamp. cx/cy place the bloom center
// (at ~0.42/0.42 of the photo) in viewport fractions; h is bloom height as
// a fraction of viewport height.
const PLACEMENTS = [
  { cx: -0.02, cy: 0.18, h: 0.52, mirror: true, phase: 0.0 },
  { cx: 0.045, cy: 0.47, h: 0.19, mirror: true, phase: 1.7 },
  { cx: 0.01, cy: 0.8, h: 0.44, mirror: true, phase: 2.5 },
  { cx: 1.02, cy: 0.42, h: 0.56, mirror: false, phase: 1.3 },
  { cx: 0.965, cy: 0.1, h: 0.22, mirror: false, phase: 3.1 },
  { cx: 1.0, cy: 0.96, h: 0.4, mirror: false, phase: 3.7 },
];

const SiteEmbroidery: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Brand blue, kept faint: this is wallpaper, not art. rgba tuples feed
    // the dither ImageData (base = bloom body, hi = petal highlights); the
    // css strings paint the glyph stitches.
    const palette =
      theme === 'dark'
        ? {
            base: [96, 165, 250, 48] as const,
            hi: [147, 197, 253, 125] as const,
            glyph: ['rgba(147, 197, 253, 0.42)', 'rgba(191, 219, 254, 0.62)'],
          }
        : {
            base: [76, 118, 235, 62] as const,
            hi: [37, 99, 235, 130] as const,
            glyph: ['rgba(37, 99, 235, 0.38)', 'rgba(29, 78, 216, 0.52)'],
          };

    const offD = document.createElement('canvas'); // dither-resolution sample
    const offDCtx = offD.getContext('2d', { willReadFrequently: true });
    const offG = document.createElement('canvas'); // glyph-resolution sample
    const offGCtx = offG.getContext('2d', { willReadFrequently: true });
    const dotCanvas = document.createElement('canvas'); // 1px-per-dot buffer
    const dotCtx = dotCanvas.getContext('2d');
    const gridCanvas = document.createElement('canvas'); // 1px grid knockout
    const gridCtx = gridCanvas.getContext('2d');
    if (!offDCtx || !offGCtx || !dotCtx || !gridCtx) return undefined;

    const img = new Image();
    let imgReady = false;
    // 0 = hero fully visible (layer hidden), 1 = hero gone (layer full on).
    const heroEl = document.getElementById('home');
    let heroGone = heroEl ? 0 : 1;
    const applyOpacity = () => {
      canvas.style.opacity = imgReady ? String(Math.min(1, Math.max(0, heroGone))) : '0';
    };
    let dCols = 0;
    let dRows = 0;
    let gCols = 0;
    let gRows = 0;
    let gCell = 0;
    let dots: ImageData | null = null;
    let hash = new Float32Array(0);
    let rafId = 0;
    let running = false;
    let lastFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const layoutCanvas = () => {
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      dCols = Math.ceil(w / DITHER_CELL);
      dRows = Math.ceil(h / DITHER_CELL);
      gCell = Math.min(13, Math.max(10, Math.round(w / 130)));
      gCols = Math.ceil(w / gCell);
      gRows = Math.ceil(h / gCell);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offD.width = dCols;
      offD.height = dRows;
      offG.width = gCols;
      offG.height = gRows;
      dotCanvas.width = dCols;
      dotCanvas.height = dRows;
      dots = dotCtx.createImageData(dCols, dRows);
      // Grid mask in device pixels: 1px lines on every dither-cell boundary,
      // knocked out of the dots so they read as printed halftone.
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;
      gridCtx.setTransform(1, 0, 0, 1, 0, 0);
      gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
      gridCtx.fillStyle = '#000';
      const step = DITHER_CELL * dpr;
      for (let gx = 0; gx <= dCols; gx++) {
        gridCtx.fillRect(Math.round(gx * step) - 1, 0, 1, gridCanvas.height);
      }
      for (let gy = 0; gy <= dRows; gy++) {
        gridCtx.fillRect(0, Math.round(gy * step) - 1, gridCanvas.width, 1);
      }
      // Per-cell deterministic hash (glyph shimmer) so the pattern breathes
      // instead of flickering with fresh randomness every frame.
      hash = new Float32Array(gCols * gRows);
      for (let y = 0; y < gRows; y++) {
        for (let x = 0; x < gCols; x++) {
          const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
          hash[y * gCols + x] = s - Math.floor(s);
        }
      }
    };

    // Draw every bloom into the given sample canvas at its resolution.
    const drawBlooms = (
      target: CanvasRenderingContext2D,
      cols: number,
      rows: number,
      t: number
    ) => {
      target.clearRect(0, 0, cols, rows);
      for (const b of PLACEMENTS) {
        const bs = ((rows * b.h) / img.height) * (1 + 0.03 * Math.sin(t * 0.11 + b.phase));
        const dw = img.width * bs;
        const dh = img.height * bs;
        const dx = cols * b.cx - dw * 0.42 + Math.sin(t * 0.05 + b.phase);
        const dy = rows * b.cy - dh * 0.42 + Math.cos(t * 0.04 + b.phase);
        if (b.mirror) {
          target.save();
          target.translate(dx + dw / 2, 0);
          target.scale(-1, 1);
          target.translate(-(dx + dw / 2), 0);
          target.drawImage(img, dx, dy, dw, dh);
          target.restore();
        } else {
          target.drawImage(img, dx, dy, dw, dh);
        }
      }
    };

    const drawFrame = (now: number) => {
      if (!imgReady || dCols === 0 || !dots) return;
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Layer 1: fine halftone dither (the detailed print) ──
      drawBlooms(offDCtx, dCols, dRows, t);
      const dData = offDCtx.getImageData(0, 0, dCols, dRows).data;
      const px = dots.data;
      px.fill(0);
      const [br, bg, bb, ba] = palette.base;
      const [hr, hg, hb, ha] = palette.hi;
      const dClearLo = Math.floor(dCols * 0.36);
      const dClearHi = Math.ceil(dCols * 0.64);
      for (let y = 0; y < dRows; y++) {
        const bayerRow = BAYER8[y % 8];
        for (let x = 0; x < dCols; x++) {
          if (x > dClearLo && x < dClearHi) continue; // masked center: skip
          const p = (y * dCols + x) * 4;
          const lum = shape(
            (0.2126 * dData[p] + 0.7152 * dData[p + 1] + 0.0722 * dData[p + 2]) / 255
          );
          if (lum < LUM_FLOOR) continue;
          const threshold = bayerRow[x % 8];
          if (lum <= threshold) continue;
          if (lum > threshold + 0.5) {
            px[p] = hr; px[p + 1] = hg; px[p + 2] = hb; px[p + 3] = ha;
          } else {
            px[p] = br; px[p + 1] = bg; px[p + 2] = bb; px[p + 3] = ba;
          }
        }
      }
      dotCtx.putImageData(dots, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        dotCanvas,
        0, 0, dCols, dRows,
        0, 0, dCols * DITHER_CELL, dRows * DITHER_CELL
      );
      // Knock the 1px grid out so dots stay discrete (device-pixel space).
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(gridCanvas, 0, 0);
      ctx.restore();

      // ── Layer 2: ASCII stitches over the highlights only ──
      drawBlooms(offGCtx, gCols, gRows, t);
      const gData = offGCtx.getImageData(0, 0, gCols, gRows).data;
      ctx.font = `${gCell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'top';
      const gClearLo = Math.floor(gCols * 0.36);
      const gClearHi = Math.ceil(gCols * 0.64);
      const buckets: Array<Array<[string, number, number]>> = [[], []];
      for (let y = 0; y < gRows; y++) {
        for (let x = 0; x < gCols; x++) {
          if (x > gClearLo && x < gClearHi) continue;
          const i = y * gCols + x;
          const p = i * 4;
          const lum = shape(
            (0.2126 * gData[p] + 0.7152 * gData[p + 1] + 0.0722 * gData[p + 2]) / 255
          );
          const v = lum + 0.04 * Math.sin(t * 1.2 + hash[i] * 6.283);
          if (v < GLYPH_FLOOR) continue;
          const dith = (BAYER8[y % 8][x % 8] - 0.5) / RAMP.length;
          const idx = Math.min(
            RAMP.length - 1,
            Math.max(0, Math.floor((v + dith) * RAMP.length))
          );
          const glyph = RAMP[idx];
          if (glyph === ' ') continue;
          buckets[v < 0.7 ? 0 : 1].push([glyph, x * gCell, y * gCell]);
        }
      }
      buckets.forEach((bucket, bi) => {
        if (!bucket.length) return;
        ctx.fillStyle = palette.glyph[bi];
        bucket.forEach(([glyph, gx, gy]) => ctx.fillText(glyph, gx, gy));
      });
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_MS) return;
      if (heroGone <= 0.02) return; // invisible behind the hero: skip the work
      lastFrame = now;
      drawFrame(now);
    };

    const startLoop = () => {
      if (running || reducedMotion || !imgReady || document.hidden) return;
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
      applyOpacity();
      startLoop(); // no-op under reduced motion: the single frame above stays
    };
    img.src = flowerSrc;

    // Fade with the hero: intersectionRatio is the visible fraction of the
    // (viewport-tall) hero, so 1 - ratio tracks the scroll transition.
    let heroIO: IntersectionObserver | undefined;
    if (heroEl) {
      heroIO = new IntersectionObserver(
        ([entry]) => {
          heroGone = 1 - entry.intersectionRatio;
          applyOpacity();
          // Draw immediately so the fade never reveals a stale frame.
          if (imgReady && heroGone > 0.02) drawFrame(performance.now());
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );
      heroIO.observe(heroEl);
    } else {
      applyOpacity();
    }

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!imgReady) return;
        layoutCanvas();
        drawFrame(performance.now());
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stopLoop();
      img.onload = null;
      heroIO?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [theme, pathname]);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default SiteEmbroidery;
