import React from 'react';
import styled, { keyframes } from 'styled-components';
import { isExpertMode } from '../../config/positioning';

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-top: 64px;
  background-color: var(--page-bg);
  color: var(--text);
  overflow: hidden;
  font-family: var(--font-body);
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const enter = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
`;

const LeftContainer = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px clamp(20px, 4vw, 48px);
  text-align: left;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    flex: 0 0 45%;
    padding-left: clamp(24px, 6vw, 96px);
  }
`;

const Reveal = styled.div<{ $delay: number }>`
  opacity: 0;
  animation: ${enter} 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(p) => p.$delay}ms;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const Intro = styled.p`
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  margin: 0 0 1.4em;
`;

const Title = styled.h1`
  color: var(--text-strong);
  font-size: clamp(2rem, 3.2vw, 2.9rem);
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1.1;
  max-width: 24ch;
`;

const Subtext = styled.p`
  color: var(--text-muted);
  font-size: clamp(1.02rem, 1.4vw, 1.15rem);
  line-height: 1.6;
  margin: 1.4em 0 0;
  max-width: 44ch;
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 2.2em;
  flex-wrap: wrap;
`;

const RightContainer = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 40vh;
  padding: 0 clamp(20px, 4vw, 48px) 48px;

  @media (min-width: 768px) {
    flex: 0 0 55%;
    min-height: auto;
    padding-bottom: 0;
  }
`;

const TerminalWindow = styled.div`
  width: 100%;
  max-width: 680px;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
`;

const TerminalBar = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border);
  position: relative;
`;

const TrafficLights = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const TrafficDot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--border-strong);
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
  font-size: 0.68rem;
  color: var(--text-faint);
  letter-spacing: 0.04em;
  padding: 4px 16px;
  background: var(--surface-sunken);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
`;

const TerminalBody = styled.div`
  padding: 0;
  background: var(--surface-sunken);
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
  animation: ${patrolAnimation} 24s linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TarsImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(100%) contrast(1.08);
`;

const EXPERT_INTRO = 'Eduard Hvizdak, AI engineer in Brno';
const STUDENT_INTRO = 'Eduard Hvizdak, CS student at Masaryk University';
const EXPERT_SUBTEXT =
  'RAG pipelines, AI agents, and three SaaS products with paying customers.';
const STUDENT_SUBTEXT =
  'RAG pipelines, AI agents, and SaaS products with paying customers.';

const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroContainer id="home">
      <LeftContainer>
        <Reveal $delay={0}>
          <Intro>{isExpertMode() ? EXPERT_INTRO : STUDENT_INTRO}</Intro>
          <Title>I build AI systems that hold up in production.</Title>
        </Reveal>
        <Reveal $delay={90}>
          <Subtext>{isExpertMode() ? EXPERT_SUBTEXT : STUDENT_SUBTEXT}</Subtext>
        </Reveal>
        <Reveal $delay={180}>
          <CtaRow>
            <a href="#projects" className="btn btn--primary" onClick={scrollToProjects}>
              View projects
            </a>
            <a
              href="https://cal.com/eduardhv/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Book a call
            </a>
          </CtaRow>
        </Reveal>
      </LeftContainer>
      <RightContainer>
        <Reveal $delay={140} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TerminalWindow>
            <TerminalBar>
              <TrafficLights>
                <TrafficDot />
                <TrafficDot />
                <TrafficDot />
              </TrafficLights>
              <TerminalTabBar>
                <TerminalTab>tars</TerminalTab>
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
        </Reveal>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
