import React from 'react';
import styled from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import { isExpertMode } from '../../config/positioning';

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment version.
//
// Static headline (no typewriter), one Jeju Myeongjo italic accent word,
// availability badge, two CTAs, and the TARS terminal reworked as a light
// mockup card in the humandelta dashboard style. The dark terminal variants
// (?tars=grid|space|combo) and the dither background are intentionally not
// wired on this branch; the light card is the single hero visual.
// ════════════════════════════════════════════════════════════════════════════

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 100px;
  color: var(--text, #0e1320);
  overflow: hidden;
  font-family: var(--font-body);
  position: relative;

  @media (max-width: 768px) {
    padding-top: 90px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
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

// Availability badge, humandelta credential-pill style. The one place on the
// page the status green is allowed.
const AvailabilityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--status-good-surface, #eef6f0);
  border: 1px solid var(--border, #e6e9ec);
  color: var(--text-muted, #3e4b66);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.6em;
`;

const BadgeDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--status-good, #1f8f4e);
`;

const Headline = styled.h1`
  font-size: clamp(2.4em, 7vw, 4.4em);
  font-weight: 600;
  color: var(--text-strong, #0a1530);
  margin: 0 0 0.35em;
  letter-spacing: -0.03em;
  line-height: 1.06;

  .serif-accent {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    color: var(--accent-text, #182e5f);
  }
`;

const Subline = styled.p`
  font-size: clamp(1em, 2vw, 1.15em);
  color: var(--text-muted, #3e4b66);
  margin: 0 0 2em;
  line-height: 1.6;
  max-width: 34em;
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
  transition: background 0.2s ease, transform 0.2s ease;

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

// Trust row: real credentials only, small caps, bounded by a hairline.
const TrustRow = styled.div`
  margin-top: 3em;
  padding-top: 1.2em;
  border-top: 1px solid var(--border, #e6e9ec);
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
`;

const TrustItem = styled.span`
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-faint, #7484a0);
  white-space: nowrap;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 40vh;

  @media (min-width: 768px) {
    flex: 0 0 56%;
    min-height: auto;
    padding-right: var(--container-px, 64px);
    box-sizing: border-box;
  }
`;

// Light mockup window, humandelta dashboard-card style: white body, raised
// title bar, hairline border, neutral shadow.
const MockupWindow = styled.div`
  width: 90%;
  max-width: 700px;
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

// Neutral slate dots instead of macOS red/yellow/green.
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
// Invert + hue-rotate retints it into the brand navy for the white card.
const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: invert(1) sepia(1) saturate(2.6) hue-rotate(200deg) brightness(0.5);
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

// Real credentials only: employers and affiliations from the resume.
const trustItems = [
  'European Commission · Digital Fairness Act',
  'EDUC Alliance',
  'Masaryk University',
  'OneBond',
  'iGalileo',
];

const Hero: React.FC = () => {
  const roleLine = isExpertMode()
    ? 'AI consultant and automation engineer. Python, LangChain, RAG pipelines and production AI agents.'
    : 'Computer science student at Masaryk University building AI agents and RAG pipelines.';

  return (
    <HeroContainer id="home">
      <LeftContainer>
        <AvailabilityBadge>
          <BadgeDot />
          Available for projects
        </AvailabilityBadge>
        <Headline>
          I'm Eduard Hvizdak.
          <br />
          AI that ships to <span className="serif-accent">production</span>.
        </Headline>
        <Subline>{roleLine}</Subline>
        <CtaRow>
          <PrimaryCta href="#projects">
            View projects <LuArrowRight />
          </PrimaryCta>
          <GhostCta href="#contact">Email me</GhostCta>
        </CtaRow>
        <TrustRow>
          {trustItems.map((item) => (
            <TrustItem key={item}>{item}</TrustItem>
          ))}
        </TrustRow>
      </LeftContainer>
      <RightContainer>
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
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
