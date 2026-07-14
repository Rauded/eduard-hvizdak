import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { LuArrowRight } from 'react-icons/lu';
import AsciiDitherBackground from './AsciiDitherBackground';
import HandsShader from './HandsShader';
import PaperHands from './PaperHands';
import ReachingHands from './ReachingHands';
import HeroBackdrop, { BackdropConcept } from './HeroBackdrop';
import { useT } from '../../i18n';

// Hero concept, chosen via ?hero= (for the concept-exploration review):
//   editorial (default) type only, no backdrop
//   mesh / grain / ditherbg   subtle Paper Shaders backdrop behind the type
//   hands                the parked dithered-hands hero (kept, not deleted)
// The hands concept keeps its own controls: ?variant=N picks a heroVariants
// preset, ?hands=shader|dither|paper picks the renderer family. Best hands
// preset is 17 (transparent-bg halftone).
type HeroState =
  | { concept: 'hands'; hands: { kind: 'paper'; variant: number } | { kind: 'shader' } | { kind: 'dither2d' } }
  | { concept: 'editorial' | BackdropConcept | 'combined' };

const readHero = (): HeroState => {
  if (typeof window === 'undefined') return { concept: 'combined' };
  const q = new URLSearchParams(window.location.search);
  const variant = q.get('variant');
  if (variant && /^\d+$/.test(variant)) return { concept: 'hands', hands: { kind: 'paper', variant: parseInt(variant, 10) } };
  const hands = q.get('hands');
  if (hands === 'shader') return { concept: 'hands', hands: { kind: 'shader' } };
  if (hands === 'dither') return { concept: 'hands', hands: { kind: 'dither2d' } };
  if (hands === 'paper') return { concept: 'hands', hands: { kind: 'paper', variant: 9 } };
  const hero = q.get('hero');
  if (hero === 'hands') return { concept: 'hands', hands: { kind: 'paper', variant: 17 } };
  if (hero === 'mesh' || hero === 'grain' || hero === 'ditherbg' || hero === 'editorial' || hero === 'combined') {
    return { concept: hero };
  }
  return { concept: 'combined' };
};

// ════════════════════════════════════════════════════════════════════════════
// Hero, humandelta experiment. Centered serif headline and CTAs over the
// full-bleed animated halftone wave, blueprint frame details from Eduard's
// design bookmarks, and a hairline browser mockup below the CTAs playing the
// real InzerPro showcase video (the bookmark-hero product-card pattern; also
// how humandelta presents its own dashcards). TARS and the flower bloom were
// both tried here and cut.
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

const Content = styled.div<{ $handsOffset: boolean }>`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 760px;

  /* With the hands concept the type sits below the top-band artwork; every
     other concept centres the type in the hero. */
  @media (min-width: 769px) {
    margin-top: ${(p) => (p.$handsOffset ? '44vh' : '0')};
  }
`;

// Full serif headline, humandelta style (their h1 is the serif face, navy).
// Follows the switchable display face (Geist by default, Jeju under
// ?type=serif) instead of pinning the serif, so the hero tracks the site.
const Headline = styled.h1`
  font-family: var(--font-display) !important;
  /* Sized for a full claim sentence (jamny-style hero), not a short name. */
  font-size: clamp(2em, 4.6vw, 3.4em);
  font-weight: var(--weight-display, 600);
  color: var(--accent, #182e5f);
  margin: 0 0 0.5em;
  letter-spacing: -0.01em;
  line-height: 1.12;
`;

// One-line positioning claim under the name (jamny-style: claim, disqualifier,
// metric). Kept muted so the serif headline stays the visual anchor.
const Tagline = styled.p`
  margin: -0.2em 0 1.6em;
  max-width: 34em;
  font-size: clamp(1em, 1.6vw, 1.15em);
  line-height: 1.55;
  color: var(--text-muted, #3e4b66);
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

// ── Blueprint frame (from Eduard's design bookmarks: hero pages framed like
// a design canvas, with faint ruler rails and measurement ticks) ────────────
const RulerRail = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(p) => p.$side}: calc(var(--container-px, 64px) / 2);
  width: 1px;
  background: var(--border, #e6e9ec);
  z-index: 0;
  pointer-events: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const RulerTick = styled.span<{ $top: number }>`
  position: absolute;
  top: ${(p) => p.$top}%;
  left: -3px;
  width: 7px;
  height: 1px;
  background: var(--border, #e6e9ec);
`;

const RulerLabel = styled.span<{ $top: number }>`
  position: absolute;
  top: calc(${(p) => p.$top}% - 4px);
  left: 8px;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--text-faint, #7484a0) 55%, transparent);
`;

const TICKS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const Ruler: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <RulerRail $side={side} aria-hidden="true">
    {TICKS.map((t) => (
      <React.Fragment key={t}>
        <RulerTick $top={t} />
        {side === 'left' && t % 20 === 10 && <RulerLabel $top={t}>{t * 8}</RulerLabel>}
      </React.Fragment>
    ))}
  </RulerRail>
);

// Status pill framed by hairline wings with square end caps (Barqen hero
// pattern from the bookmarks). The one green dot on the page.
const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
`;

const StatusWing = styled.span<{ $flip?: boolean }>`
  position: relative;
  width: 72px;
  height: 1px;
  background: var(--border, #e6e9ec);

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    ${(p) => (p.$flip ? 'right' : 'left')}: 0;
    width: 5px;
    height: 5px;
    background: var(--page-bg, #ffffff);
    border: 1px solid var(--border, #e6e9ec);
  }

  @media (max-width: 768px) {
    width: 36px;
  }
`;

// A slow sheen travels across the pill: a narrow band of light that sweeps and
// then rests, rather than a constant gradient (keeps within the no-decorative-
// gradient rule; the pill fill stays flat white, this is a moving highlight).
const sheen = keyframes`
  0%   { transform: translateX(-120%); }
  55%  { transform: translateX(220%); }
  100% { transform: translateX(220%); }
`;

const StatusPill = styled.span`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border, #e6e9ec);
  background: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted, #3e4b66);
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    background: linear-gradient(
      100deg,
      transparent,
      color-mix(in srgb, var(--accent, #182e5f) 14%, transparent),
      transparent
    );
    transform: translateX(-120%);
    animation: ${sheen} 5.5s ease-in-out infinite;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      display: none;
    }
  }
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--status-good, #1f8f4e);
`;

// Keyboard-shortcut chips inside the CTAs (bookmark pattern; the keys work).
const KeyChip = styled.span<{ $ghost?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$ghost ? 'var(--border, #e6e9ec)' : 'rgba(255, 255, 255, 0.3)')};
  background: ${(p) => (p.$ghost ? 'var(--surface, #f6f6f6)' : 'rgba(255, 255, 255, 0.14)')};
  color: ${(p) => (p.$ghost ? 'var(--text-faint, #7484a0)' : 'rgba(255, 255, 255, 0.9)')};
  margin-left: 4px;

  /* No keyboard on touch layouts; the chip would just be noise. */
  @media (max-width: 768px) {
    display: none;
  }
`;

// Figma-style corner ticks marking the content zone (blueprint frame).
const CornerTick = styled.span<{ $pos: string }>`
  position: absolute;
  width: 11px;
  height: 11px;
  pointer-events: none;
  color: var(--border, #e6e9ec);
  ${(p) => p.$pos};

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: currentColor;
  }
  &::before {
    left: 5px;
    top: 0;
    width: 1px;
    height: 11px;
  }
  &::after {
    left: 0;
    top: 5px;
    width: 11px;
    height: 1px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const CORNERS = [
  'top: -26px; left: -34px;',
  'top: -26px; right: -34px;',
  'bottom: -26px; left: -34px;',
  'bottom: -26px; right: -34px;',
];

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => {
  // Resolve the hero concept at first render (the shader library memoizes on
  // colour props, so a post-mount switch would be skipped). The no-param
  // default is 'editorial', which matches the prerender.
  const [hero] = useState<HeroState>(() => readHero());
  const t = useT('hero');
  // Both the hands concept and the combined concept put artwork in the top
  // band, so the text block sits below it.
  const handsOffset = hero.concept === 'hands' || hero.concept === 'combined';

  // Working single-key shortcuts for the CTA chips: P scrolls to projects,
  // E to contact. Ignored while typing or when a modifier is held.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.repeat) return;
      const el = e.target as HTMLElement | null;
      if (el?.isContentEditable) return;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'p' || e.key === 'P') scrollToId('projects');
      if (e.key === 'e' || e.key === 'E') scrollToId('contact');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <HeroContainer id="home">
      {hero.concept === 'hands' && hero.hands.kind === 'paper' && (
        <PaperHands key={hero.hands.variant} variant={hero.hands.variant} />
      )}
      {hero.concept === 'hands' && hero.hands.kind === 'shader' && <HandsShader />}
      {hero.concept === 'hands' && hero.hands.kind === 'dither2d' && <AsciiDitherBackground />}
      {(hero.concept === 'mesh' || hero.concept === 'grain' || hero.concept === 'ditherbg') && (
        <HeroBackdrop concept={hero.concept} />
      )}
      {hero.concept === 'combined' && (
        <>
          <HeroBackdrop concept="ditherbg" faint />
          <ReachingHands />
        </>
      )}
      <Ruler side="left" />
      <Ruler side="right" />
      <Content $handsOffset={handsOffset}>
        {CORNERS.map((pos) => (
          <CornerTick key={pos} $pos={pos} aria-hidden="true" />
        ))}
        <Headline>{t.name}</Headline>
        <Tagline>{t.tagline}</Tagline>
        <CtaRow>
          <PrimaryCta href="#projects">
            {t.viewProjects} <LuArrowRight /> <KeyChip>P</KeyChip>
          </PrimaryCta>
          <GhostCta href="#contact">
            {t.emailMe} <KeyChip $ghost>E</KeyChip>
          </GhostCta>
        </CtaRow>
        <StatusRow>
          <StatusWing aria-hidden="true" />
          <StatusPill>
            <StatusDot />
            {t.accepting}
          </StatusPill>
          <StatusWing $flip aria-hidden="true" />
        </StatusRow>
      </Content>
    </HeroContainer>
  );
};

export default Hero;
