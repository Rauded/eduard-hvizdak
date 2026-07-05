import React from 'react';
import styled from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import HalftoneWave from './HalftoneWave';

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment.
//
// Split layout: serif name headline on the left with the CTAs below it, and
// TARS on the right rendered frameless, straight on the page. The gif is a
// high-detail navy-ink ASCII render regenerated from the original source
// frames (see ascii_matrix.py in the portfolio root), so it needs no window
// chrome or filter to sit on the white canvas. The humandelta halftone dot
// wave drifts across the whole hero behind both.
// ════════════════════════════════════════════════════════════════════════════

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 92vh;
  padding-top: 100px;
  box-sizing: border-box;
  color: var(--text, #0e1320);
  overflow: hidden;
  font-family: var(--font-body);
  border-bottom: 1px solid var(--border, #e6e9ec);
  background: var(--page-bg, #ffffff);

  @media (max-width: 768px) {
    padding-top: 90px;
    min-height: 88vh;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const WaveLayer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 40px;
  text-align: left;
  margin-top: -6%;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 24px;
    margin-top: 0;
  }

  @media (min-width: 768px) {
    flex: 0 0 44%;
    padding: 60px 40px 60px var(--container-px, 64px);
  }
`;

// Full serif headline, humandelta style (their h1 is the serif face, navy).
const Headline = styled.h1`
  font-family: var(--font-serif) !important;
  font-size: clamp(2.6em, 5.5vw, 4.2em);
  font-weight: 400;
  color: var(--accent, #182e5f);
  margin: 0 0 0.55em;
  letter-spacing: -0.01em;
  line-height: 1.12;
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
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

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  min-height: 40vh;

  @media (min-width: 768px) {
    flex: 0 0 56%;
    min-height: auto;
    padding-right: var(--container-px, 64px);
    box-sizing: border-box;
  }
`;

// Frameless TARS: the high-detail navy render walks directly on the page,
// no terminal window, no caption. Hover deepens the ink slightly.
const TarsStage = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  /* Soft white halo quiets the wave directly behind TARS so the two navy
     patterns never blend into each other. */
  &::before {
    content: '';
    position: absolute;
    inset: -12% -6%;
    background: radial-gradient(
      ellipse 60% 55% at 50% 45%,
      var(--page-bg, #ffffff) 0%,
      var(--page-bg, #ffffff) 45%,
      transparent 78%
    );
    pointer-events: none;
  }

  > * {
    position: relative;
  }

  &:hover img {
    filter: brightness(0.82);
  }
`;

const TarsImage = styled.img`
  width: 100%;
  display: block;
  transition: filter 0.25s ease;
`;




const Hero: React.FC = () => {
  return (
    <HeroContainer id="home">
      <WaveLayer>
        <HalftoneWave />
      </WaveLayer>
      <LeftContainer>
        <Headline>I'm Eduard Hvizdak.</Headline>
        <CtaRow>
          <PrimaryCta href="#projects">
            View projects <LuArrowRight />
          </PrimaryCta>
          <GhostCta href="#contact">Email me</GhostCta>
        </CtaRow>
      </LeftContainer>
      <RightContainer>
        <TarsStage>
          <TarsImage
            src={`${process.env.PUBLIC_URL}/ascii_navy_ink_hd.gif`}
            alt="TARS walking ASCII art"
          />
        </TarsStage>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
