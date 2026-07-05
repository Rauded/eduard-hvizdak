import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import HalftoneWave from './HalftoneWave';

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment version 3.
//
// Split layout as on the original site: serif name headline on the left with
// the CTAs below it, the TARS terminal on the right as the page's one
// deliberate dark object (the shipped light mode used the same trick). The
// humandelta halftone dot wave drifts across the whole hero behind both.
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

// Semi-dark terminal in a muted navy-slate: dark enough that the pale-mist
// TARS glyphs pop, light enough not to punch a black hole in the light page.
const TerminalWindow = styled.div`
  width: 90%;
  max-width: 700px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #2e4370;
  box-shadow:
    0 8px 32px rgba(15, 31, 68, 0.20),
    0 2px 8px rgba(15, 31, 68, 0.12);
  border: 1px solid rgba(195, 210, 234, 0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 14px 40px rgba(15, 31, 68, 0.26),
      0 3px 10px rgba(15, 31, 68, 0.14);
  }
`;

const TerminalBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #263a63;
  border-bottom: 1px solid rgba(10, 21, 48, 0.45);
  position: relative;
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

// Muted navy dots instead of macOS candy colors; quieter, same affordance.
const TrafficDot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(138, 165, 216, 0.35);
  border: 1px solid rgba(195, 210, 234, 0.3);
`;

const TerminalTabBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const TerminalTab = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: rgba(234, 240, 248, 0.8);
  letter-spacing: 0.04em;
  padding: 4px 16px;
  background: rgba(234, 240, 248, 0.08);
  border-radius: 4px;
  border: 1px solid rgba(195, 210, 234, 0.18);
`;

const TerminalBody = styled.div`
  padding: 0;
  background: #2e4370;
  position: relative;
  overflow: hidden;
`;

const TarsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

// ascii_navy_mist.gif is a real recolor of the monochrome gif (glyphs mapped
// onto the pale end of the navy ramp), so no CSS filter is needed. Hover
// nudges the brightness up a touch.
const TarsImage = styled.img`
  width: 100%;
  display: block;
  transition: filter 0.25s ease;

  ${TerminalWindow}:hover & {
    filter: brightness(1.12);
  }
`;

const TerminalStatusBar = styled.div`
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #263a63;
  border-top: 1px solid rgba(195, 210, 234, 0.1);
`;

const StatusText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: rgba(234, 240, 248, 0.5);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #8aa5d8;
  margin-right: 6px;
`;

// REVIEW MODE: rotate through every TARS gif so Eduard can compare them in
// place. The winner gets hardcoded and this carousel removed.
const TARS_GIFS = [
  'ascii_navy_mist',
  'ascii_monochrome',
  'ascii_cyberpunk',
  'ascii_neon_blocks',
  'ascii_hot_pink',
  'ascii_electric_yellow',
  'ascii_matrix',
  'ascii_matrix_code',
  'ascii_orange_retro',
  'ascii_retro_crt',
];
const ROTATE_MS = 4000;

const Hero: React.FC = () => {
  const [gifIndex, setGifIndex] = useState(0);

  useEffect(() => {
    // Preload so each switch is instant.
    TARS_GIFS.forEach((name) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/${name}.gif`;
    });
    const id = setInterval(() => {
      setGifIndex((i) => (i + 1) % TARS_GIFS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const gifName = TARS_GIFS[gifIndex];

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
        <TerminalWindow>
          <TerminalBar>
            <TrafficLights>
              <TrafficDot />
              <TrafficDot />
              <TrafficDot />
            </TrafficLights>
            <TerminalTabBar>
              <TerminalTab>TARS · patrol module</TerminalTab>
            </TerminalTabBar>
          </TerminalBar>
          <TerminalBody>
            <TarsContainer>
              <TarsImage
                src={`${process.env.PUBLIC_URL}/${gifName}.gif`}
                alt="TARS walking ASCII art"
              />
            </TarsContainer>
          </TerminalBody>
          <TerminalStatusBar>
            <StatusText>
              <StatusDot />
              active
            </StatusText>
            <StatusText>{gifName.replace('ascii_', '').replace(/_/g, ' ')}</StatusText>
          </TerminalStatusBar>
        </TerminalWindow>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
