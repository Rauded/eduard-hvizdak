import React, { useEffect, useRef } from 'react';

// ════════════════════════════════════════════════════════════════════════════
// HalftoneWave: the humandelta.ai hero canvas, rebuilt.
//
// Flowing ribbons of navy halftone dots on white. Each frame evaluates a few
// overlapping sine bands over a fixed dot grid; a Bayer 4x4 threshold turns
// the smooth band intensity into the dithered halftone falloff the reference
// site has. Animation is a slow phase drift, throttled to ~30fps, and
// prefers-reduced-motion gets a single static frame.
// ════════════════════════════════════════════════════════════════════════════

const NAVY = '24, 46, 95'; // #182e5f

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

type Band = {
  base: number;      // vertical center as a fraction of height
  amp: number;       // sine amplitude as a fraction of height
  freq: number;      // full sine periods across the width
  speed: number;     // phase drift per second
  phase: number;
  halfWidth: number; // band half thickness as a fraction of height
  modFreq: number;   // horizontal presence modulation: periods across width
  modPhase: number;
};

// Two thin ribbons that fade in and out along their length, so the wave reads
// as drifting patches with plenty of white air, like the reference site.
const BANDS: Band[] = [
  { base: 0.34, amp: 0.14, freq: 1.05, speed: 0.09, phase: 0.0, halfWidth: 0.075, modFreq: 1.3, modPhase: 0.6 },
  { base: 0.68, amp: 0.16, freq: 0.8, speed: -0.06, phase: 2.4, halfWidth: 0.09, modFreq: 1.1, modPhase: 3.6 },
];

const PITCH = 6; // dot grid pitch in CSS px

const HalftoneWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / PITCH);
      const rows = Math.ceil(height / PITCH);

      for (let xi = 0; xi <= cols; xi++) {
        const x = xi * PITCH;
        const u = x / width;
        // Precompute each band's center and horizontal presence.
        const centers: number[] = [];
        const presences: number[] = [];
        for (let k = 0; k < BANDS.length; k++) {
          const b = BANDS[k];
          centers[k] =
            (b.base + b.amp * Math.sin(u * b.freq * Math.PI * 2 + b.phase + t * b.speed)) *
            height;
          // 0..1 presence wave; clipped so each ribbon has real gaps.
          const p = 0.5 + 0.5 * Math.sin(u * b.modFreq * Math.PI * 2 + b.modPhase + t * b.speed * 0.7);
          presences[k] = Math.max(0, (p - 0.25) / 0.75);
        }
        for (let yi = 0; yi <= rows; yi++) {
          const y = yi * PITCH;
          let intensity = 0;
          for (let k = 0; k < BANDS.length; k++) {
            if (presences[k] <= 0) continue;
            const d = Math.abs(y - centers[k]) / (BANDS[k].halfWidth * height);
            if (d < 1) {
              const v = (1 - d) * presences[k];
              if (v > intensity) intensity = v;
            }
          }
          if (intensity <= 0.03) continue;
          // Bayer threshold gives the dithered edge instead of a smooth fade.
          const threshold = (BAYER[xi % 4][yi % 4] + 0.5) / 16;
          if (intensity < threshold) continue;
          const r = 0.8 + intensity * 1.0;
          ctx.fillStyle = `rgba(${NAVY}, ${0.16 + intensity * 0.42})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps is plenty for a slow drift
      last = now;
      draw(now / 1000);
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

export default HalftoneWave;
