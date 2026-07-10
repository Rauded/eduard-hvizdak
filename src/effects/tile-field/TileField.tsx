import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TileField } from './engine';

// Interactive tile-field wordmark band. The engine rasterizes the word into a
// grid of tiles; a colour wave wanders through and the cursor lights a soft
// blob. Runs only while on screen, respects reduced-motion, cleans up on
// unmount. Desktop-first: on small screens the tiles are too coarse to read,
// so it hides and the plain caption carries the section.

const Band = styled.section`
  position: relative;
  width: 100%;
  height: clamp(200px, 26vw, 340px);
  background: var(--page-bg, #ffffff);
  border-top: 1px solid var(--border, #e6e9ec);
  border-bottom: 1px solid var(--border, #e6e9ec);
  overflow: hidden;
`;

const Stage = styled.div`
  position: absolute;
  inset: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

// Fallback wordmark for small screens / reduced motion, where the canvas is
// hidden: the name still reads.
const Fallback = styled.span`
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 12vw;
  color: color-mix(in srgb, var(--accent) 12%, transparent);

  @media (max-width: 640px) {
    display: flex;
  }
`;

const TileWordmark: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    let field: TileField | null = null;
    try {
      field = new TileField(stage);
    } catch {
      return undefined; // e.g. no 2d context; the small-screen fallback remains
    }
    const instance = field;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) instance.start();
      else instance.stop();
    });
    io.observe(stage);

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => instance.resize(), 150);
    });
    ro.observe(stage);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      instance.destroy();
    };
  }, []);

  return (
    <Band aria-label="Eduard Hvizdak">
      <Stage ref={stageRef} aria-hidden="true" />
      <Fallback aria-hidden="true">Eduard</Fallback>
    </Band>
  );
};

export default TileWordmark;
