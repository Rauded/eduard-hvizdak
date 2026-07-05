import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { isExpertMode } from '../../config/positioning';
import { getTarsVariant } from '../../config/tarsVariant';
import AsciiDitherBackground from './AsciiDitherBackground';
import Typer from '../effects/Typer';

// Main container for the hero section
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 100px;
  color: var(--text, #fff);
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
  min-height: 40vh;

  @media (min-width: 768px) {
    flex: 0 0 60%;
    min-height: auto;
  }
`;

// Terminal window — realistic macOS-style
const TerminalWindow = styled.div`
  width: 90%;
  max-width: 700px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #18181b;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TerminalBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #232326;
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
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const TerminalBody = styled.div`
  padding: 0;
  background: #0f0f12;
  position: relative;
  overflow: hidden;
`;

// Combo variant: the terminal's screen is a scene. Sparse stars in the upper
// half, the engineering grid rising from the floor TARS patrols.
const SceneBody = styled(TerminalBody)`
  background-color: #0a0a10;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 22%, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(1px 1px at 28% 44%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 37% 12%, rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(1.5px 1.5px at 52% 30%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 61% 8%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(1px 1px at 70% 38%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 83% 18%, rgba(255, 255, 255, 0.65), transparent),
    radial-gradient(1px 1px at 91% 46%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 6% 52%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 46% 56%, rgba(255, 255, 255, 0.25), transparent);
  padding-top: 12px;

  /* Grid fades in toward the floor so the sky stays clear for the stars. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 26px 26px;
    -webkit-mask-image: linear-gradient(180deg, transparent 32%, #000 100%);
    mask-image: linear-gradient(180deg, transparent 32%, #000 100%);
    pointer-events: none;
  }

  > * {
    position: relative;
  }
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
  animation: ${patrolAnimation} 24s linear infinite;
  will-change: transform;
`;

const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(20%) contrast(1.1);
`;


// Engineering-grid stage: a dark tile whose grid reads as the floor TARS
// patrols, fading out toward the top so it stays a backdrop, not a pattern.
const GridTile = styled.div`
  position: relative;
  width: 90%;
  max-width: 700px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    #0e0e14;
  background-size: 30px 30px, 30px 30px, auto;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 14px 0 0;

  /* Fade the grid away from the floor so the top of the tile stays calm. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #0e0e14 0%, rgba(14, 14, 20, 0) 85%);
    pointer-events: none;
  }

  > * {
    position: relative;
  }
`;

// Starfield stage: TARS on a floor line under a sparse night sky.
const SpaceTile = styled.div`
  width: 90%;
  max-width: 700px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-image:
    radial-gradient(1.5px 1.5px at 12% 22%, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(1px 1px at 28% 48%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 37% 14%, rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(1.5px 1.5px at 52% 34%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 61% 10%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(1px 1px at 70% 42%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 83% 20%, rgba(255, 255, 255, 0.65), transparent),
    radial-gradient(1px 1px at 91% 52%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 6% 58%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 46% 62%, rgba(255, 255, 255, 0.25), transparent);
  background-color: #0a0a10;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 26px 0 0;
`;

const SpaceFloor = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.22);
`;

const TerminalStatusBar = styled.div`
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1c1c1f;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const StatusText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4ade80;
  margin-right: 6px;
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

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TypewriterText = styled.div`
  font-family: var(--font-mono);
  color: var(--accent-text, #60a5fa);
  font-size: clamp(1.1em, 3vw, 1.75em);
  margin-top: 1em;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  letter-spacing: 0.01em;

  &::after {
    content: '_';
    animation: ${blink} 1s infinite;
    color: var(--accent, #3b82f6);
    font-weight: 300;
  }
`;

const topLines = [
  "Ahoj! Vitaj na mojom portfóliu.",
  "Hey! Thanks for dropping by.",
];

// Expert mode drops the "CS Student" line (and swaps in a consulting-facing
// title) so the rotating role never leads with a student framing. See
// src/config/positioning.ts.
const typewriterTexts = [
  "AI Developer @ OneBond",
  "AI Developer @ CZS / Masaryk University",
  "AI Developer @ iGalileo",
  "Think Tank @ EDUC Alliance",
  isExpertMode() ? "AI Consultant & Automation Engineer" : "CS Student @ Masaryk University",
  "Python & LangChain Developer",
  "Building AI agents & RAG pipelines",
  "Hackathon Fanatic",
  "AI Enthusiast"
];

const Hero: React.FC = () => {
  const [topLine, setTopLine] = useState('');
  const [currentText, setCurrentText] = useState('');
  const tarsVariant = getTarsVariant();
  const isRose = tarsVariant === 'rose';
  const isCombo = tarsVariant === 'combo';
  const isEdges = tarsVariant === 'edges';
  const isSymbols = tarsVariant === 'symbols';

  // One terminal, two screens: the flat body, or the starfield+grid scene.
  const renderTerminal = (scene: boolean) => {
    const Body = scene ? SceneBody : TerminalBody;
    return (
      <TerminalWindow>
        <TerminalBar>
          <TrafficLights>
            <TrafficDot color="#ff5f57" />
            <TrafficDot color="#febc2e" />
            <TrafficDot color="#28c840" />
          </TrafficLights>
          <TerminalTabBar>
            <TerminalTab>TARS · patrol module</TerminalTab>
          </TerminalTabBar>
        </TerminalBar>
        <Body>
          <TarsContainer>
            <TarsImage
              src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
              alt="TARS walking ASCII art"
            />
          </TarsContainer>
        </Body>
        <TerminalStatusBar>
          <StatusText><StatusDot />active</StatusText>
          <StatusText>patrol module</StatusText>
        </TerminalStatusBar>
      </TerminalWindow>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    let i = 0;
    let textPos = 0;
    let currentString = typewriterTexts[i];
    const speed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;

    function type() {
      if (!isMounted) return;
      setCurrentText(currentString.substring(0, textPos));
      if (textPos++ === currentString.length) {
        timeoutId = setTimeout(() => deleteText(), waitTime);
      } else {
        timeoutId = setTimeout(type, speed);
      }
    }

    function deleteText() {
      if (!isMounted) return;
      setCurrentText(currentString.substring(0, textPos));
      if (textPos-- === 0) {
        i = (i + 1) % typewriterTexts.length;
        currentString = typewriterTexts[i];
        timeoutId = setTimeout(type, speed);
      } else {
        timeoutId = setTimeout(deleteText, deleteSpeed);
      }
    }

    type();
    return () => { isMounted = false; clearTimeout(timeoutId); };
  }, []);

  return (
    <HeroContainer id="home">
      {(isRose || isCombo) && <AsciiDitherBackground />}
      {isSymbols && <AsciiDitherBackground mode="symbols" />}
      {isEdges && <AsciiDitherBackground layout="edges" />}
      <LeftContainer>
        <Headline>{topLine}</Headline>
        <GradientText>
          <Typer text="I'm Eduard Hvizdak." />
        </GradientText>
        <TypewriterText>&gt; {currentText}</TypewriterText>
      </LeftContainer>
      {!isRose && !isSymbols && <RightContainer>
        {(tarsVariant === 'terminal' || isEdges) && renderTerminal(false)}
        {isCombo && renderTerminal(true)}
        {tarsVariant === 'grid' && (
          <GridTile>
            <TarsContainer>
              <TarsImage
                src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
                alt="TARS walking ASCII art"
              />
            </TarsContainer>
          </GridTile>
        )}
        {tarsVariant === 'space' && (
          <SpaceTile>
            <TarsContainer>
              <TarsImage
                src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
                alt="TARS walking ASCII art"
              />
            </TarsContainer>
            <SpaceFloor />
          </SpaceTile>
        )}
      </RightContainer>}
    </HeroContainer>
  );
};

export default Hero;
