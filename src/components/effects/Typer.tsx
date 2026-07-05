import React, { useEffect, useMemo, useState } from 'react';
import './Typer.scss';

// Typer: a wave runs across the line exactly once on mount; as it passes,
// each character flickers through a couple of accent-token states (solid
// pill, soft highlight, outlined pill) before settling as plain text.
// Adapted from arlan.me/vault/typer and deliberately tuned down: one pass,
// three flicker states, brand tokens only.
//
// The wave head advances on an ease-out curve and character states only
// change when the head crosses whole-character steps, so the flicker feels
// quantized (like a low-fps frame loop) and the component re-renders roughly
// once per character rather than every animation frame.

const CYCLES = 3; // flicker states each character passes through
const STEP_MS = 55; // average time the head spends per character
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

// Deterministic per-character hash (same trick as the dither shimmer) so the
// flicker pattern is stable across renders instead of reshuffling.
const hash01 = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const STATE_CLASSES = ['typer__ch--pill', 'typer__ch--soft', 'typer__ch--outline'];

interface Props {
  text: string;
  className?: string;
}

const Typer: React.FC<Props> = ({ text, className = '' }) => {
  const chars = useMemo(() => Array.from(text), [text]);

  // Integer position of the wave head, in characters. -1 = nothing shown
  // yet; Infinity = fully settled (the reduced-motion starting state).
  const [head, setHead] = useState<number>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? Number.POSITIVE_INFINITY
      : -1
  );

  useEffect(() => {
    if (!Number.isFinite(head) && head > 0) return undefined; // reduced motion
    const steps = chars.length + CYCLES + 1;
    const duration = steps * STEP_MS;
    const start = performance.now();
    let raf = 0;
    let last = -1;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const h = Math.floor(easeOutCubic(p) * steps);
      if (h !== last) {
        last = h;
        setHead(h);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Runs once per text; `head` is deliberately not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chars]);

  return (
    <span className={`typer ${className}`.trim()}>
      <span className="typer__sr">{text}</span>
      {chars.map((ch, i) => {
        // Spaces get no state class so the line can still wrap normally.
        if (ch === ' ') {
          return (
            <span key={i} aria-hidden="true">
              {' '}
            </span>
          );
        }
        const k = head - i;
        const cls =
          k >= CYCLES
            ? ''
            : k < 0
            ? 'typer__ch--pending'
            : STATE_CLASSES[Math.floor(hash01(i * 7.13 + k * 13.7) * STATE_CLASSES.length)];
        return (
          <span key={i} aria-hidden="true" className={`typer__ch ${cls}`.trim()}>
            {ch}
          </span>
        );
      })}
    </span>
  );
};

export default Typer;
