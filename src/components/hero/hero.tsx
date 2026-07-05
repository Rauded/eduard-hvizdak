import React from 'react';
import styled from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import HalftoneWave from './HalftoneWave';
import AsciiDitherBackground from './AsciiDitherBackground';

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment: the pure reference composition. Centered serif
// headline and CTAs over the full-bleed animated halftone wave, nothing else.
// The TARS mascot was tried in many forms (terminal, ascii, halftone print)
// and cut: the footage never survived abstraction. The wave carries the hero.
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

const Hero: React.FC = () => {
  return (
    <HeroContainer id="home">
      <WaveLayer>
        <HalftoneWave />
      </WaveLayer>
      <AsciiDitherBackground />
      <Content>
        <Headline>I'm Eduard Hvizdak.</Headline>
        <CtaRow>
          <PrimaryCta href="#projects">
            View projects <LuArrowRight />
          </PrimaryCta>
          <GhostCta href="#contact">Email me</GhostCta>
        </CtaRow>
      </Content>
    </HeroContainer>
  );
};

export default Hero;
