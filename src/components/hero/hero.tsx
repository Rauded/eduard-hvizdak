import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { isExpertMode } from '../../config/positioning';
import { isFeatureOn, heroMode, HeroMode } from '../../config/features';
import AsciiDitherBackground from './AsciiDitherBackground';

// Main container for the hero section
const HeroContainer = styled.section<{ $dither: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* fallback for browsers without dvh */
  min-height: 100dvh;
  padding-top: 100px;
  background-color: var(--page-bg, #09090b);
  color: var(--text, #fff);
  overflow: hidden;
  font-family: var(--font-body);
  position: relative;

  @media (max-width: 768px) {
    padding-top: 90px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 20% 60%, var(--hero-glow, rgba(59, 130, 246, 0.07)) 0%, transparent 55%);
    pointer-events: none;
    /* the dither canvas replaces the glow; two soft layers read as mud */
    opacity: ${(p) => (p.$dither ? 0 : 1)};
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
  padding: 40px;
  text-align: left;
  margin-top: -10%;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 24px;
    margin-top: 0;
  }

  @media (min-width: 768px) {
    flex: 0 0 40%;
    padding: 60px 40px;
  }
`;

const Headline = styled.h1`
  font-size: 1.25em;
  font-weight: 400;
  color: var(--text-muted, rgba(255, 255, 255, 0.7));
  margin-bottom: 1.5em;
  letter-spacing: 0.05em;
  line-height: 1.6;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.5em;
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
    flex: 0 0 60%;
    min-height: auto;
  }
`;

// Terminal window, macOS-style but in neutral graphite: a real terminal is
// not purple.
const TerminalWindow = styled.div`
  width: 90%;
  max-width: 700px;
  position: relative;
  border-radius: var(--radius-md, 14px);
  overflow: hidden;
  background: #17171a;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TerminalBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #202024;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  position: relative;
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const TrafficDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.2);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 5px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TerminalTabBar = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0;
`;

const TerminalTab = styled.div`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.04em;
  padding: 4px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm, 8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TerminalBody = styled.div`
  padding: 0;
  background: #0f0f11;
  position: relative;
  overflow: hidden;
`;

// TARS patrol animation inside the terminal
const patrolAnimation = keyframes`
  0% { transform: translateX(0%) scaleX(-1); }
  2.5% { transform: translateX(0%) scaleX(-1); }
  22.5% { transform: translateX(-12%) scaleX(-1); }
  27.5% { transform: translateX(-12%) scaleX(-1); }
  27.6% { transform: translateX(-12%) scaleX(1); }
  32.5% { transform: translateX(-12%) scaleX(1); }
  72.5% { transform: translateX(12%) scaleX(1); }
  77.5% { transform: translateX(12%) scaleX(1); }
  77.6% { transform: translateX(12%) scaleX(-1); }
  82.5% { transform: translateX(12%) scaleX(-1); }
  97.5% { transform: translateX(0%) scaleX(-1); }
  100% { transform: translateX(0%) scaleX(-1); }
`;

const TarsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${patrolAnimation} 24s linear infinite;
    will-change: transform;
  }
`;

const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(20%) contrast(1.1);
`;

const GradientText = styled.h2`
  color: var(--text-strong, #f8fafc);
  font-size: clamp(2.5em, 8vw, 5em);
  font-weight: 700;
  margin: 0.3em 0;
  letter-spacing: -0.03em;
  line-height: 1.05;

  @media (min-width: 768px) {
    font-size: clamp(3.5em, 6vw, 5.5em);
  }
`;

// One static line instead of the old typewriter carousel: a fixed claim reads
// senior, a cycling animation reads template. Mono keeps the terminal
// signature; the > prefix stays.
const RoleLine = styled.p`
  font-family: var(--font-mono);
  color: var(--accent-bright, #60a5fa);
  font-size: clamp(1.05em, 2.4vw, 1.4em);
  margin: 1em 0 0;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.5;
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 2em;
  flex-wrap: wrap;
`;

const PrimaryCta = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--radius-pill, 999px);
  background: var(--accent, #2563eb);
  color: var(--on-accent, #ffffff);
  font-weight: 600;
  font-size: 0.95em;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--accent-strong, #1d4ed8);
    transform: translateY(-1px);
  }
`;

const GhostCta = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--radius-pill, 999px);
  border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.14));
  color: var(--text, #e7e7ea);
  font-weight: 500;
  font-size: 0.95em;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--accent-ring, rgba(96, 165, 250, 0.35));
    transform: translateY(-1px);
  }
`;

const topLines = [
  "Ahoj! Vitaj na mojom portfóliu.",
  "Hey! Thanks for dropping by.",
];

// Expert mode leads with the consulting-facing framing; student mode keeps
// the honest university line. See src/config/positioning.ts.
const roleLine = isExpertMode()
  ? "AI engineer. I build agents, RAG systems, and products people pay for."
  : "CS student at Masaryk University, building AI agents and RAG systems.";

const Hero: React.FC = () => {
  const [topLine, setTopLine] = useState('');
  // Resolved in an effect (not during render) so the prerendered HTML never
  // differs from the first client render; the canvas fades in a frame later.
  const [ditherBg, setDitherBg] = useState<HeroMode | null>(null);

  useEffect(() => {
    if (isFeatureOn('heroAscii')) setDitherBg(heroMode());
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
  }, []);

  return (
    <HeroContainer id="home" $dither={ditherBg !== null}>
      {ditherBg && <AsciiDitherBackground mode={ditherBg} />}
      <LeftContainer>
        <Headline>{topLine}</Headline>
        <GradientText>I'm Eduard Hvizdak.</GradientText>
        <RoleLine>&gt; {roleLine}</RoleLine>
        <CtaRow>
          <PrimaryCta href="#projects">View projects</PrimaryCta>
          <GhostCta href="mailto:eduardd.hv@gmail.com">Email me</GhostCta>
        </CtaRow>
      </LeftContainer>
      <RightContainer>
        <TerminalWindow>
          <TerminalBar>
            <TrafficLights>
              <TrafficDot color="#ff5f57" />
              <TrafficDot color="#febc2e" />
              <TrafficDot color="#28c840" />
            </TrafficLights>
            <TerminalTabBar>
              <TerminalTab>tars@eduard:~</TerminalTab>
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
        </TerminalWindow>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
