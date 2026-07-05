import React from 'react';
import styled from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import HalftoneWave from './HalftoneWave';

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment version 2.
//
// Faithful to the humandelta.ai hero: a full-bleed animated halftone dot wave
// canvas with a centered Jeju Myeongjo serif headline over it, one primary
// pill and one ghost CTA. The TARS mockup card sits centered below the CTAs
// with a high-contrast navy tint so it clearly reads on white.
// ════════════════════════════════════════════════════════════════════════════

const HeroContainer = styled.section`
  position: relative;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 150px var(--container-px, 64px) 60px;
  box-sizing: border-box;
  color: var(--text, #0e1320);
  overflow: hidden;
  font-family: var(--font-body);
  border-bottom: 1px solid var(--border, #e6e9ec);
  background: var(--page-bg, #ffffff);

  @media (max-width: 768px) {
    padding: 120px var(--container-px, 24px) 48px;
    min-height: 88vh;
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
  width: 100%;
`;

// Full serif headline, humandelta style (their h1 is the serif face, navy).
const Headline = styled.h1`
  font-family: var(--font-serif) !important;
  font-size: clamp(2.6em, 6.5vw, 4.6em);
  font-weight: 400;
  color: var(--accent, #182e5f);
  margin: 0 0 0.55em;
  letter-spacing: -0.01em;
  line-height: 1.12;
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 56px;
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

// Light mockup window, humandelta dashboard-card style.
const MockupWindow = styled.div`
  width: 100%;
  max-width: 640px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--border, #e6e9ec);
  box-shadow: var(--shadow-card, 0 1px 2px rgba(14, 19, 32, 0.05), 0 8px 24px rgba(14, 19, 32, 0.05));
`;

const MockupBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface, #f6f6f6);
  border-bottom: 1px solid var(--border, #e6e9ec);
  position: relative;
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const TrafficDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--surface-sunken, #eef0f2);
  border: 1px solid var(--border, #e6e9ec);
`;

const MockupTabBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const MockupTab = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-faint, #7484a0);
  letter-spacing: 0.04em;
  padding: 4px 16px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid var(--border, #e6e9ec);
`;

const MockupBody = styled.div`
  padding: 0;
  background: #ffffff;
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

// The gif is light gray glyphs on transparency (drawn for a dark terminal).
// Invert hard and clamp brightness low so the glyphs read as solid dark navy
// ink on the white card; v1's soft tint was too transparent to see.
const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: brightness(0) saturate(100%) invert(14%) sepia(31%) saturate(2274%) hue-rotate(200deg) brightness(93%) contrast(97%);
`;

const MockupStatusBar = styled.div`
  padding: 5px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface, #f6f6f6);
  border-top: 1px solid var(--border, #e6e9ec);
`;

const StatusText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: var(--text-faint, #7484a0);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--status-good, #1f8f4e);
  margin-right: 6px;
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer id="home">
      <WaveLayer>
        <HalftoneWave />
      </WaveLayer>
      <Content>
        <Headline>I'm Eduard Hvizdak.</Headline>
        <CtaRow>
          <PrimaryCta href="#projects">
            View projects <LuArrowRight />
          </PrimaryCta>
          <GhostCta href="#contact">Email me</GhostCta>
        </CtaRow>
        <MockupWindow>
          <MockupBar>
            <TrafficLights>
              <TrafficDot />
              <TrafficDot />
              <TrafficDot />
            </TrafficLights>
            <MockupTabBar>
              <MockupTab>TARS · patrol module</MockupTab>
            </MockupTabBar>
          </MockupBar>
          <MockupBody>
            <TarsContainer>
              <TarsImage
                src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
                alt="TARS walking ASCII art"
              />
            </TarsContainer>
          </MockupBody>
          <MockupStatusBar>
            <StatusText>
              <StatusDot />
              active
            </StatusText>
            <StatusText>patrol module</StatusText>
          </MockupStatusBar>
        </MockupWindow>
      </Content>
    </HeroContainer>
  );
};

export default Hero;
