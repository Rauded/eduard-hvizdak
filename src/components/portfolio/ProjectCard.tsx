import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LuBookOpen, LuArrowUpRight, LuGithub, LuX } from 'react-icons/lu';
import { PortfolioProject, CaseStudy } from './projectsData';

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

// ─── Slideshow ───────────────────────────────────────────────────
const Slideshow: React.FC<{ images: string[]; accent?: string }> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % images.length), 3400);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="slideshow">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`slideshow__slide ${i === current ? 'slideshow__slide--active' : ''}`}
        />
      ))}
      <div className="slideshow__dots">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            className={`slideshow__dot ${i === current ? 'slideshow__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── XR Concept card (BookReader) ────────────────────────────────
const ConceptCard: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="concept-card" style={{ '--concept-accent': accent } as React.CSSProperties}>
    <div className="concept-card__bg" />
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
        <span className="concept-card__page">p. 127 / 190, 67%</span>
      </div>
    </div>
  </div>
);

// ─── Branded placeholder (used until a real video/screenshot exists) ──
const PlaceholderCard: React.FC<{ title: string; accent: string }> = ({ title, accent }) => (
  <div className="media-placeholder" style={{ '--ph-accent': accent } as React.CSSProperties}>
    <div className="media-placeholder__glow" />
    <span className="media-placeholder__label">{title}</span>
    <span className="media-placeholder__note">Demo coming soon</span>
  </div>
);

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
  const { media, accent } = project;

  // React does not reliably reflect the `muted` prop to the DOM property, and
  // browsers block autoplay on any video that isn't actually muted. That is what
  // left the case-study reader showing a black box. Force it on via a ref and
  // kick off playback so the clip plays everywhere, including inside the modal.
  // Under prefers-reduced-motion the clip stays parked on its poster frame, and
  // offscreen clips pause so six looping videos never decode at once.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      v.autoplay = false;
      v.pause();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const p = v.play();
      if (p) p.catch(() => {});
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = v.play();
          if (p) p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 }
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
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  switch (media.type) {
    case 'slideshow':
      return <Slideshow images={media.images!} accent={accent} />;
    case 'image':
      return <img className="pcard__img" src={media.images![0]} alt={project.title} />;
    case 'concept':
      return <ConceptCard accent={accent} />;
    case 'placeholder':
    case 'video': // declared video but file not present yet
      return <PlaceholderCard title={project.title} accent={accent} />;
    default:
      return <PlaceholderCard title={project.title} accent={accent} />;
  }
};

// ─── Case study sections ─────────────────────────────────────────
// The full problem→solution narrative is ALWAYS rendered into the DOM
// (inside the dialog markup, hidden via CSS when closed) so crawlers and
// LLM/GEO indexers always get the keywords. The button only reveals the
// reader for human readers, opening "like a window" on the same page.
const CASE_SECTIONS: { key: keyof CaseStudy; heading: string }[] = [
  { key: 'problem', heading: 'The problem' },
  { key: 'motivation', heading: 'Why I built it' },
  { key: 'challenges', heading: 'What I ran into' },
  { key: 'solution', heading: 'How it got solved' },
  { key: 'story', heading: 'Where it happened' },
];

const ProjectCaseStudy: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cs = project.caseStudy;

  // Lock body scroll + wire Esc while the reader is open; restore focus on close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const trigger = triggerRef.current;
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
    <div className={`case-modal ${open ? 'case-modal--open' : ''}`} aria-hidden={!open}>
      <div className="case-modal__backdrop" onClick={() => setOpen(false)} />
      <div className="case-modal__panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button
          type="button"
          className="case-modal__close"
          onClick={() => setOpen(false)}
          aria-label="Close case study"
        >
          <LuX aria-hidden="true" />
        </button>

        <header className="case-modal__head">
          <span className="case-modal__eyebrow">Case study</span>
          <h2 className="case-modal__title" id={titleId}>{project.title}</h2>
          <p className="case-modal__subtitle">{project.subtitle}</p>
        </header>

        <div className="case-modal__media">
          <ProjectMedia project={project} />
        </div>

        <div className="case-modal__body">
          {CASE_SECTIONS.map(({ key, heading }) =>
            cs[key] ? (
              <section className="case-modal__section" key={key}>
                <h3 className="case-modal__h">{heading}</h3>
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
        Read the full story
      </button>
      {dialog}
    </>
  );
};

// ─── Single project card ─────────────────────────────────────────
export const ProjectCard: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const { ref, visible } = useReveal();
  const layout = project.layout ?? (project.reversed ? 'split-reversed' : 'split');

  return (
    <article
      ref={ref}
      className={[
        'pcard',
        layout === 'split-reversed' ? 'pcard--reversed' : '',
        layout === 'full' ? 'pcard--full' : '',
        visible ? 'pcard--visible' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Media */}
      <div className="pcard__media">
        <ProjectMedia project={project} />
      </div>

      {/* Info */}
      <div className="pcard__info">
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
