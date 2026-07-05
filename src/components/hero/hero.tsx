import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import myPhoto from '../../assets/about/picture_of_me.jpeg';
import myPhotoWebP from '../../assets/about/picture_of_me.webp';

// Design v2 hero: Swiss print split. Ink type on paper, one orange accent,
// the portrait as a flat editorial object with a solid offset block.

const rise = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const entrance = css`
  animation: ${rise} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const HeroContainer = styled.section`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  background: var(--page-bg, #f2f2ee);
  color: var(--text, #1a1a1d);
  font-family: var(--font-body);
  padding: 96px 40px 64px;
  border-bottom: 1px solid var(--border-strong, rgba(20, 20, 22, 0.32));

  @media (max-width: 768px) {
    padding: 90px 20px 48px;
  }
`;

const HeroGrid = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const TextColumn = styled.div`
  ${entrance};
`;

const Headline = styled.h1`
  font-family: var(--font-display);
  font-stretch: 118%;
  font-weight: 780;
  font-size: clamp(2.5rem, 5.4vw, 4.5rem);
  line-height: 0.98;
  letter-spacing: -0.025em;
  margin: 0 0 0.35em;
  color: var(--text-strong, #0d0d0f);
  text-wrap: balance;

  em {
    font-style: normal;
    color: var(--accent, #d1481d);
  }
`;

const Subline = styled.p`
  font-size: clamp(1.02rem, 1.6vw, 1.2rem);
  line-height: 1.6;
  color: var(--text-muted, rgba(20, 20, 22, 0.68));
  max-width: 34em;
  margin: 0 0 2.2em;

  strong {
    color: var(--text-strong, #0d0d0f);
    font-weight: 600;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 26px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  border-radius: 0;
  transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease,
    border-color 0.15s ease;

  svg {
    width: 1.05em;
    height: 1.05em;
    transition: transform 0.15s ease;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const PrimaryButton = styled.a`
  ${buttonBase};
  background: var(--accent, #d1481d);
  color: #fff;
  border: 1px solid var(--accent, #d1481d);

  &:hover {
    background: var(--accent-strong, #ad3a15);
    border-color: var(--accent-strong, #ad3a15);

    svg {
      transform: translateX(3px);
    }
  }
`;

const SecondaryButton = styled.a`
  ${buttonBase};
  background: transparent;
  color: var(--text-strong, #0d0d0f);
  border: 1px solid var(--border-strong, rgba(20, 20, 22, 0.32));

  &:hover {
    border-color: var(--text-strong, #0d0d0f);
  }
`;

const PortraitColumn = styled.div`
  ${entrance};
  animation-delay: 0.1s;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const PortraitFrame = styled.div`
  position: relative;
  width: min(100%, 400px);

  img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.06);
    border: 1px solid var(--ink, #141416);
    box-shadow: 16px 16px 0 var(--accent, #d1481d);
  }

  @media (max-width: 900px) {
    width: min(78vw, 360px);

    img {
      box-shadow: 12px 12px 0 var(--accent, #d1481d);
    }
  }
`;

const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => (
  <HeroContainer id="home">
    <HeroGrid>
      <TextColumn>
        <Headline>
          AI systems that make it to <em>production.</em>
        </Headline>
        <Subline>
          I'm <strong>Eduard Hvizdak</strong>, AI engineer and founder. I build RAG
          pipelines and multi-agent tooling for clients, and run my own SaaS products.
        </Subline>
        <Actions>
          <PrimaryButton href="#projects" onClick={scrollToProjects}>
            View projects
            <LuArrowRight aria-hidden="true" />
          </PrimaryButton>
          <SecondaryButton href="/services">What I offer</SecondaryButton>
        </Actions>
      </TextColumn>
      <PortraitColumn>
        <PortraitFrame>
          <picture>
            <source srcSet={myPhotoWebP} type="image/webp" />
            <img src={myPhoto} alt="Eduard Hvizdak" />
          </picture>
        </PortraitFrame>
      </PortraitColumn>
    </HeroGrid>
  </HeroContainer>
);

export default Hero;
