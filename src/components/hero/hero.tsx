import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import HalftoneWave from './HalftoneWave';
import { assetSafe } from '../portfolio/projectsData';

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment. Centered serif headline and CTAs over the
// full-bleed animated halftone wave, blueprint frame details from Eduard's
// design bookmarks, and a hairline browser mockup below the CTAs playing the
// real InzerPro showcase video (the bookmark-hero product-card pattern; also
// how humandelta presents its own dashcards). TARS and the flower bloom were
// both tried here and cut.
// ════════════════════════════════════════════════════════════════════════════

const HeroContainer = styled.section`
  position: relative;
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px var(--container-px, 64px) 80px;
  box-sizing: border-box;
  color: var(--text, #0e1320);
  overflow: hidden;
  font-family: var(--font-body);
  border-bottom: 1px solid var(--border, #e6e9ec);
  background: var(--page-bg, #ffffff);

  @media (max-width: 768px) {
    padding: 110px var(--container-px, 24px) 64px;
    min-height: 80vh;
  }
`;

const WaveLayer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 760px;

  /* Quiet zone: a soft page-color halo keeps the wave and bloom from ever
     running through the headline. */
  &::before {
    content: '';
    position: absolute;
    inset: -22% -18%;
    background: radial-gradient(
      ellipse 62% 58% at 50% 46%,
      var(--page-bg, #ffffff) 0%,
      var(--page-bg, #ffffff) 42%,
      transparent 74%
    );
    pointer-events: none;
    z-index: -1;
  }
`;

// Full serif headline, humandelta style (their h1 is the serif face, navy).
const Headline = styled.h1`
  font-family: var(--font-serif) !important;
  font-size: clamp(2.8em, 6.5vw, 4.8em);
  font-weight: 400;
  color: var(--accent, #182e5f);
  margin: 0 0 0.5em;
  letter-spacing: -0.01em;
  line-height: 1.12;
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const PrimaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  border-radius: 999px;
  background: var(--accent, #182e5f);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95em;
  text-decoration: none;
  transition: background 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: var(--accent-strong, #0f1f44);
    svg {
      transform: translateX(3px);
    }
  }
`;

const GhostCta = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 26px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid var(--border, #e6e9ec);
  color: var(--accent-text, #182e5f);
  font-weight: 500;
  font-size: 0.95em;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: var(--accent-ring, #c3d2ea);
    background: var(--accent-soft, #eaf0f8);
  }
`;

// ── Blueprint frame (from Eduard's design bookmarks: hero pages framed like
// a design canvas, with faint ruler rails and measurement ticks) ────────────
const RulerRail = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(p) => p.$side}: calc(var(--container-px, 64px) / 2);
  width: 1px;
  background: var(--border, #e6e9ec);
  z-index: 0;
  pointer-events: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const RulerTick = styled.span<{ $top: number }>`
  position: absolute;
  top: ${(p) => p.$top}%;
  left: -3px;
  width: 7px;
  height: 1px;
  background: var(--border, #e6e9ec);
`;

const RulerLabel = styled.span<{ $top: number }>`
  position: absolute;
  top: calc(${(p) => p.$top}% - 4px);
  left: 8px;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--text-faint, #7484a0) 55%, transparent);
`;

const TICKS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const Ruler: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <RulerRail $side={side} aria-hidden="true">
    {TICKS.map((t) => (
      <React.Fragment key={t}>
        <RulerTick $top={t} />
        {side === 'left' && t % 20 === 10 && <RulerLabel $top={t}>{t * 8}</RulerLabel>}
      </React.Fragment>
    ))}
  </RulerRail>
);

// Status pill framed by hairline wings with square end caps (Barqen hero
// pattern from the bookmarks). The one green dot on the page.
const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 26px;
`;

const StatusWing = styled.span<{ $flip?: boolean }>`
  position: relative;
  width: 72px;
  height: 1px;
  background: var(--border, #e6e9ec);

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    ${(p) => (p.$flip ? 'right' : 'left')}: 0;
    width: 5px;
    height: 5px;
    background: var(--page-bg, #ffffff);
    border: 1px solid var(--border, #e6e9ec);
  }

  @media (max-width: 768px) {
    width: 36px;
  }
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border, #e6e9ec);
  background: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted, #3e4b66);
  white-space: nowrap;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--status-good, #1f8f4e);
`;

// Keyboard-shortcut chips inside the CTAs (bookmark pattern; the keys work).
const KeyChip = styled.span<{ $ghost?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$ghost ? 'var(--border, #e6e9ec)' : 'rgba(255, 255, 255, 0.3)')};
  background: ${(p) => (p.$ghost ? 'var(--surface, #f6f6f6)' : 'rgba(255, 255, 255, 0.14)')};
  color: ${(p) => (p.$ghost ? 'var(--text-faint, #7484a0)' : 'rgba(255, 255, 255, 0.9)')};
  margin-left: 4px;

  /* No keyboard on touch layouts; the chip would just be noise. */
  @media (max-width: 768px) {
    display: none;
  }
`;

// Figma-style corner ticks marking the content zone (blueprint frame).
const CornerTick = styled.span<{ $pos: string }>`
  position: absolute;
  width: 11px;
  height: 11px;
  pointer-events: none;
  color: var(--border, #e6e9ec);
  ${(p) => p.$pos};

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: currentColor;
  }
  &::before {
    left: 5px;
    top: 0;
    width: 1px;
    height: 11px;
  }
  &::after {
    left: 0;
    top: 5px;
    width: 11px;
    height: 1px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const CORNERS = [
  'top: -26px; left: -34px;',
  'top: -26px; right: -34px;',
  'bottom: -26px; left: -34px;',
  'bottom: -26px; right: -34px;',
];

// Browser-framed product mockup below the CTAs (Flowtix/Designify bookmark
// pattern): hairline chrome, surface bar with a URL pill, real product video.
const MockupCard = styled.div`
  position: relative;
  z-index: 1;
  width: min(880px, 92vw);
  margin-top: 64px;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--border, #e6e9ec);
  box-shadow: var(--shadow-card, 0 1px 2px rgba(14, 19, 32, 0.05), 0 8px 24px rgba(14, 19, 32, 0.05));

  @media (max-width: 768px) {
    margin-top: 44px;
  }
`;

const MockupBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: var(--surface, #f6f6f6);
  border-bottom: 1px solid var(--border, #e6e9ec);
`;

const MockupDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--surface-sunken, #eef0f2);
  border: 1px solid var(--border, #e6e9ec);
`;

const MockupUrl = styled.span`
  margin: 0 auto;
  padding: 3px 18px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid var(--border, #e6e9ec);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.05em;
  color: var(--text-faint, #7484a0);
`;

const MockupVideo = styled.video`
  display: block;
  width: 100%;
`;

const inzerproVideo = assetSafe('inzerpro.mp4');

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => {
  // Working single-key shortcuts for the CTA chips: P scrolls to projects,
  // E to contact. Ignored while typing or when a modifier is held.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'p' || e.key === 'P') scrollToId('projects');
      if (e.key === 'e' || e.key === 'E') scrollToId('contact');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <HeroContainer id="home">
      <WaveLayer>
        <HalftoneWave />
      </WaveLayer>
      <Ruler side="left" />
      <Ruler side="right" />
      <Content>
        {CORNERS.map((pos) => (
          <CornerTick key={pos} $pos={pos} aria-hidden="true" />
        ))}
        <StatusRow>
          <StatusWing aria-hidden="true" />
          <StatusPill>
            <StatusDot />
            Accepting new projects
          </StatusPill>
          <StatusWing $flip aria-hidden="true" />
        </StatusRow>
        <Headline>I'm Eduard Hvizdak.</Headline>
        <CtaRow>
          <PrimaryCta href="#projects">
            View projects <LuArrowRight /> <KeyChip>P</KeyChip>
          </PrimaryCta>
          <GhostCta href="#contact">
            Email me <KeyChip $ghost>E</KeyChip>
          </GhostCta>
        </CtaRow>
      </Content>
      {inzerproVideo && (
        <MockupCard>
          <MockupBar>
            <MockupDot />
            <MockupDot />
            <MockupDot />
            <MockupUrl>inzerpro.cz</MockupUrl>
          </MockupBar>
          <MockupVideo src={inzerproVideo} autoPlay muted loop playsInline />
        </MockupCard>
      )}
    </HeroContainer>
  );
};

export default Hero;
