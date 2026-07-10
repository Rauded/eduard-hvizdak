import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LuBookOpen, LuArrowUpRight, LuGithub, LuX } from 'react-icons/lu';
import { PortfolioProject, CaseStudy, localizeProject } from './projectsData';
// @ts-ignore: the `projects` namespace is registered centrally by the parent.
import { useT } from '../../i18n';
import { useLocale } from '../../i18n/LocaleContext';

// ─── Scroll-reveal hook ──────────────────────────────────────────
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Honour the user's reduced-motion setting for any auto-playing media.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Slideshow ───────────────────────────────────────────────────
const Slideshow: React.FC<{ images: string[] }> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance, but stop while hovered/focused and skip it entirely under
  // reduced-motion (the dots still let a reader page through manually).
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % images.length), 3400);
    return () => clearInterval(t);
  }, [images.length, paused]);

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className={`slideshow__slide ${i === current ? 'slideshow__slide--active' : ''}`}
        />
      ))}
      <div className="slideshow__dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current}
            className={`slideshow__dot ${i === current ? 'slideshow__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── XR Concept card (BookReader) ────────────────────────────────
const ConceptCard: React.FC = () => (
  <div className="concept-card">
    <div className="concept-card__hud">
      <div className="concept-card__topbar">
        <span className="concept-card__logo">◈ Even Realities G1</span>
        <span className="concept-card__status">
          <span className="concept-card__dot" />
          MentaOS
        </span>
        <span className="concept-card__battery">⬛⬛⬛⬜ 76%</span>
      </div>
      <div className="concept-card__body">
        <p className="concept-card__chapter">Chapter III</p>
        <p className="concept-card__booktitle">The Obstacle Is The Way</p>
        <div className="concept-card__divider" />
        <p className="concept-card__line">Objective judgement, now, at this very moment.</p>
        <p className="concept-card__line">Unselfish action, now, at this very moment.</p>
        <p className="concept-card__line">Willing acceptance — now, at this very moment —</p>
        <p className="concept-card__line concept-card__line--faint">of all external events. That's all you need.</p>
      </div>
      <div className="concept-card__footer">
        <div className="concept-card__progress-track">
          <div className="concept-card__progress-fill" />
        </div>
        <span className="concept-card__page">p. 127 / 190 · 67%</span>
      </div>
    </div>
  </div>
);

// ─── Branded placeholder (used until a real video/screenshot exists) ──
const PlaceholderCard: React.FC<{ title: string }> = ({ title }) => {
  const t = useT('projects');
  return (
    <div className="media-placeholder">
      <span className="media-placeholder__label">{title}</span>
      <span className="media-placeholder__note">{t.demoSoon}</span>
    </div>
  );
};

// ─── Link icon ───────────────────────────────────────────────────
// Shows the destination site's own favicon when one is provided, falling
// back to the generic arrow if the image fails to load.
const LinkIcon: React.FC<{ link: PortfolioProject['links'][number] }> = ({ link }) => {
  const [failed, setFailed] = useState(false);
  if (link.type === 'github') return <LuGithub />;
  if (link.favicon && !failed) {
    return (
      <img
        className="pcard__favicon"
        src={link.favicon}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <LuArrowUpRight />;
};

// ─── Project media ───────────────────────────────────────────────
// Shared by the showcase card AND the case-study reader so the story
// shows the exact same video / slideshow / screenshot as the showcase.
const ProjectMedia: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const { media } = project;

  // Play only while the clip is actually on screen, and never eagerly fetch it.
  // Previously every card AND the always-mounted case-study modal force-played
  // its <video> on mount, so each preview downloaded twice and decoded for the
  // whole page lifetime (LCP ~14s, ~45MB). With preload="none" nothing is
  // fetched until an IntersectionObserver says the clip is in view; offscreen
  // clips pause. Reduced-motion users get a static poster and no playback.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !media.video) return;
    v.muted = true;
    if (prefersReducedMotion()) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = v.play();
          if (p) p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [media.video]);

  // A real video file always wins, whatever the declared type. This is
  // how a dropped-in clip "upgrades" a slideshow/image/placeholder card.
  if (media.video) {
    return (
      <video
        ref={videoRef}
        className="pcard__video"
        src={media.video}
        poster={media.poster || (media.images && media.images[0])}
        preload="none"
        muted
        loop
        playsInline
      />
    );
  }

  switch (media.type) {
    case 'slideshow':
      return <Slideshow images={media.images!} />;
    case 'image':
      return (
        <img
          className="pcard__img"
          src={media.images![0]}
          alt={project.title}
          loading="lazy"
          decoding="async"
        />
      );
    case 'concept':
      return <ConceptCard />;
    case 'placeholder':
    case 'video': // declared video but file not present yet
      return <PlaceholderCard title={project.title} />;
    default:
      return <PlaceholderCard title={project.title} />;
  }
};

// ─── Case study sections ─────────────────────────────────────────
// The full problem→solution narrative is ALWAYS rendered into the DOM
// (inside the dialog markup, hidden via CSS when closed) so crawlers and
// LLM/GEO indexers always get the keywords. The button only reveals the
// reader for human readers — opening "like a window" on the same page.
// Order + which CaseStudy field each section renders. The visible heading text
// is looked up from the `projects` dictionary (t.caseSections[key]) inside the
// component so it localizes with the active language.
const CASE_SECTIONS: { key: keyof CaseStudy }[] = [
  { key: 'problem' },
  { key: 'motivation' },
  { key: 'challenges' },
  { key: 'solution' },
  { key: 'story' },
];

const ProjectCaseStudy: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const t = useT('projects');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cs = project.caseStudy;

  // Lock body scroll while the reader is open; wire Esc to close and trap Tab
  // inside the dialog so keyboard focus can't wander onto the page behind the
  // overlay. Move focus to the close button on open and restore it on close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      // If focus has escaped the panel (e.g. onto <body> after clicking inert
      // text), pull it back in instead of letting Tab walk the page behind.
      if (!panel.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const trigger = triggerRef.current;
    // Focus the close button once the panel is revealed.
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open]);

  if (!cs) return null;
  const titleId = `case-title-${project.id}`;

  // Rendered to <body> so the overlay escapes any card stacking context.
  // The markup is ALWAYS mounted (visibility toggled via CSS) to preserve
  // the in-DOM, indexable case-study text.
  const dialog = createPortal(
    <div
      className={`case-modal ${open ? 'case-modal--open' : ''}`}
      aria-hidden={!open}
    >
      <div className="case-modal__backdrop" onClick={() => setOpen(false)} />
      <div className="case-modal__panel" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef}>
        <button
          type="button"
          className="case-modal__close"
          onClick={() => setOpen(false)}
          aria-label={t.closeCaseStudy}
          ref={closeRef}
        >
          <LuX aria-hidden="true" />
        </button>

        <header className="case-modal__head">
          <span className="case-modal__eyebrow">{t.caseStudyEyebrow}</span>
          <h2 className="case-modal__title" id={titleId}>{project.title}</h2>
          <p className="case-modal__subtitle">{project.subtitle}</p>
        </header>

        {/* Media is mounted only while the reader is open, so the hidden modal
            no longer downloads and decodes a second copy of every clip. The
            text sections below stay always-mounted for crawlers/GEO. */}
        <div className="case-modal__media">
          {open && <ProjectMedia project={project} />}
        </div>

        <div className="case-modal__body">
          {CASE_SECTIONS.map(({ key }) =>
            cs[key] ? (
              <section className="case-modal__section" key={key}>
                <h3 className="case-modal__h">{t.caseSections[key]}</h3>
                <p
                  className="case-modal__p"
                  dangerouslySetInnerHTML={{ __html: cs[key] as string }}
                />
              </section>
            ) : null
          )}
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="pcard__case-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <LuBookOpen aria-hidden="true" />
        {t.projectDetails}
      </button>
      {dialog}
    </>
  );
};

// ─── Single project card ─────────────────────────────────────────
export const ProjectCard: React.FC<{ project: PortfolioProject }> = ({ project: rawProject }) => {
  const { ref, visible } = useReveal();
  const { locale } = useLocale();
  const project = localizeProject(rawProject, locale);

  return (
    <article
      ref={ref}
      className={['pcard', project.reversed ? 'pcard--reversed' : '', visible ? 'pcard--visible' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {/* Media */}
      <div className="pcard__media">
        <ProjectMedia project={project} />
      </div>

      {/* Info */}
      <div className="pcard__info">
        <span className="pcard__number" aria-hidden="true">
          {project.number}
        </span>

        <h2 className="pcard__title">{project.title}</h2>
        <p className="pcard__subtitle">{project.subtitle}</p>
        <p className="pcard__description">{project.description}</p>

        <ul className="pcard__tags">
          {project.tags.map(tag => (
            <li key={tag} className="pcard__tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="pcard__links">
          {project.links.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`pcard__link pcard__link--${link.type}`}
            >
              <LinkIcon link={link} />
              {link.label}
            </a>
          ))}
        </div>

        <ProjectCaseStudy project={project} />
      </div>
    </article>
  );
};

export default ProjectCard;
