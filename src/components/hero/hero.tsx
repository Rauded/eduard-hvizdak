import React from 'react';
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

// The terminal window in the brand navy instead of stark black, so the dark
// object belongs to the same palette as the wave and the buttons. Hovering
// lifts the card and brightens the glyphs.
const TerminalWindow = styled.div`
  width: 90%;
  max-width: 700px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #0f1f44;
  box-shadow:
    0 8px 32px rgba(15, 31, 68, 0.22),
    0 2px 8px rgba(15, 31, 68, 0.14);
  border: 1px solid rgba(195, 210, 234, 0.14);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 14px 40px rgba(15, 31, 68, 0.28),
      0 3px 10px rgba(15, 31, 68, 0.16);
  }
`;

const TerminalBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #16295a;
  border-bottom: 1px solid rgba(10, 21, 48, 0.6);
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
  border: 1px solid rgba(195, 210, 234, 0.25);
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
  color: rgba(195, 210, 234, 0.75);
  letter-spacing: 0.04em;
  padding: 4px 16px;
  background: rgba(195, 210, 234, 0.07);
  border-radius: 4px;
  border: 1px solid rgba(195, 210, 234, 0.14);
`;

const TerminalBody = styled.div`
  padding: 0;
  background: #0a1530;
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

// Gray glyphs tinted toward the pale navy of the ramp so TARS reads as part
// of the palette; hover brings him up to near-white.
const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: sepia(1) saturate(1.6) hue-rotate(190deg) brightness(1.02);
  transition: filter 0.25s ease;

  ${TerminalWindow}:hover & {
    filter: sepia(0.5) saturate(1.3) hue-rotate(190deg) brightness(1.18);
  }
`;

const TerminalStatusBar = styled.div`
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #16295a;
  border-top: 1px solid rgba(195, 210, 234, 0.08);
`;

const StatusText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: rgba(195, 210, 234, 0.45);
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
                src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
                alt="TARS walking ASCII art"
              />
            </TarsContainer>
          </TerminalBody>
          <TerminalStatusBar>
            <StatusText>
              <StatusDot />
              active
            </StatusText>
            <StatusText>patrol module</StatusText>
          </TerminalStatusBar>
        </TerminalWindow>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
