import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/ThemeContext';
// Same CC0 water-lily source as the hero bloom (see AsciiDitherBackground).
import flowerSrc from '../../assets/hero/flower.jpg';

// Site-wide embroidery: the flower re-rendered as a fine-pitch ASCII glyph
// field along the viewport's left and right edges, behind every page. The
// layer is position:fixed, so the same stitched frame stays put while the
// content scrolls past it: one continuous motif across the whole site.
//
// It paints at z-index -1 (above the body background, below all content and
// every section surface) and is masked so the middle of the viewport, where
// the text columns live, stays completely clear.
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
  transition: opacity 0.8s ease;
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

  &.ready {
    opacity: 1;
  }

  /* On stacked mobile layouts the text runs edge to edge, so the bands
     would sit behind it. Desktop moment only. */
  @media (max-width: 768px) {
    display: none;
  }
`;

// 8x8 Bayer matrix, normalized to 0..1 thresholds (texture for the ramp).
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

// Long luminance ramp: the "more detailed ASCII" ask. Fine cells plus a
// 60+ glyph ramp give smooth density gradients instead of chunky blocks.
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

const FRAME_MS = 66; // ~15fps; a background shimmer needs no more
const LUM_FLOOR = 0.06;
const shape = (lum: number) => Math.min(1, Math.max(0, (lum - 0.12) * 1.55));

// Blooms anchored on the viewport edges, cropped by them on purpose.
// cx/cy place the bloom center (at ~0.42/0.42 of the photo) in viewport
// fractions; h is the bloom height as a fraction of viewport height.
const PLACEMENTS = [
  { cx: -0.02, cy: 0.18, h: 0.52, mirror: true, phase: 0.0 },
  { cx: 0.01, cy: 0.8, h: 0.44, mirror: true, phase: 2.5 },
  { cx: 1.02, cy: 0.42, h: 0.56, mirror: false, phase: 1.3 },
  { cx: 1.0, cy: 0.96, h: 0.4, mirror: false, phase: 3.7 },
];

const SiteEmbroidery: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Brand blue, three density tiers, kept faint: this is wallpaper, not art.
    const palette =
      theme === 'dark'
        ? ['rgba(59, 130, 246, 0.22)', 'rgba(96, 165, 250, 0.38)', 'rgba(147, 197, 253, 0.55)']
        : ['rgba(37, 99, 235, 0.14)', 'rgba(37, 99, 235, 0.28)', 'rgba(37, 99, 235, 0.44)'];

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
    let lastFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    const layoutCanvas = () => {
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      cell = Math.min(12, Math.max(9, Math.round(w / 150)));
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.width = cols;
      off.height = rows;
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
      for (const b of PLACEMENTS) {
        const bs = ((rows * b.h) / img.height) * (1 + 0.03 * Math.sin(t * 0.11 + b.phase));
        const dw = img.width * bs;
        const dh = img.height * bs;
        const dx = cols * b.cx - dw * 0.42 + Math.sin(t * 0.05 + b.phase);
        const dy = rows * b.cy - dh * 0.42 + Math.cos(t * 0.04 + b.phase);
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
      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'top';
      // The mask hides the middle anyway; skip sampling it entirely.
      const clearLo = Math.floor(cols * 0.36);
      const clearHi = Math.ceil(cols * 0.64);
      const buckets: Array<Array<[string, number, number]>> = [[], [], []];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (x > clearLo && x < clearHi) continue;
          const i = y * cols + x;
          const p = i * 4;
          const lum = shape(
            (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255
          );
          if (lum < LUM_FLOOR) continue;
          const v = lum + 0.04 * Math.sin(t * 1.2 + hash[i] * 6.283);
          const dith = (BAYER8[y % 8][x % 8] - 0.5) / RAMP.length;
          const idx = Math.min(
            RAMP.length - 1,
            Math.max(0, Math.floor((v + dith) * RAMP.length))
          );
          const glyph = RAMP[idx];
          if (glyph === ' ') continue;
          const bucket = v < 0.35 ? 0 : v < 0.65 ? 1 : 2;
          buckets[bucket].push([glyph, x * cell, y * cell]);
        }
      }
      buckets.forEach((bucket, bi) => {
        if (!bucket.length) return;
        ctx.fillStyle = palette[bi];
        bucket.forEach(([glyph, gx, gy]) => ctx.fillText(glyph, gx, gy));
      });
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_MS) return;
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
      canvas.classList.add('ready');
      startLoop(); // no-op under reduced motion: the single frame above stays
    };
    img.src = flowerSrc;

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
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [theme]);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default SiteEmbroidery;
