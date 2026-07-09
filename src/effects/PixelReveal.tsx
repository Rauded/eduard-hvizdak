import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Pixel reveal: an image resolves from coarse pixel blocks to sharp when it
// first scrolls into view. Adapted from the originkit "Pixelate Image" pattern
// and tuned to the site's dither aesthetic. The real image (children, so a
// <picture>/webp still works) sits underneath; a canvas overlay draws the
// pixelated version, sharpens over ~0.8s, then fades out. Reduced-motion and
// missing-2d-context both fall through to the plain image.

const Wrap = styled.div`
  position: relative;
  display: block;
  overflow: hidden;

  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }
`;

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PixelReveal: React.FC<Props> = ({ children, className }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const img = wrap.querySelector('img');
    if (!img) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    wrap.appendChild(canvas);

    let rafId = 0;
    let startTs = 0;
    const DURATION = 850; // ms of sharpening
    const FADE = 260; // ms of fade-out after sharp

    const draw = (blocks: number) => {
      const w = img.clientWidth;
      const h = img.clientHeight;
      if (w < 1 || h < 1) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const small = Math.max(4, Math.round(blocks));
      const sh = Math.max(2, Math.round((small * h) / w));
      // Downscale into a tiny buffer, then blow it back up with smoothing off
      // so the image reads as hard pixel blocks that get finer each frame.
      const buf = document.createElement('canvas');
      buf.width = small;
      buf.height = sh;
      const bctx = buf.getContext('2d');
      if (!bctx) return;
      bctx.drawImage(img, 0, 0, small, sh);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(buf, 0, 0, small, sh, 0, 0, canvas.width, canvas.height);
    };

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = ts - startTs;
      if (t < DURATION) {
        const p = t / DURATION;
        const eased = p * p;
        // block count grows from ~10 wide to ~img width (sharp)
        const blocks = 10 + eased * (img.clientWidth / 2);
        draw(blocks);
        rafId = requestAnimationFrame(tick);
      } else if (t < DURATION + FADE) {
        canvas.style.opacity = String(1 - (t - DURATION) / FADE);
        rafId = requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    };

    const begin = () => {
      if (!img.complete || img.naturalWidth === 0) {
        img.addEventListener('load', begin, { once: true });
        return;
      }
      startTs = 0;
      draw(10);
      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        begin();
        io.disconnect();
      }
    });
    io.observe(wrap);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
      if (canvas.parentElement) canvas.remove();
    };
  }, []);

  return (
    <Wrap ref={wrapRef} className={className}>
      {children}
    </Wrap>
  );
};

export default PixelReveal;
