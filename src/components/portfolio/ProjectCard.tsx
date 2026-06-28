import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { LuChevronDown } from 'react-icons/lu';
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
const Slideshow: React.FC<{ images: string[]; accent: string }> = ({ images, accent }) => {
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
            style={i === current ? { background: accent } : {}}
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
        <span className="concept-card__page">p. 127 / 190 — 67%</span>
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

// ─── Case study (always in the DOM for SEO/GEO; collapsed via CSS) ─
// The full problem→solution narrative is rendered for every project
// regardless of expand state, so crawlers and LLM indexers always get
// the keywords. The button only toggles a CSS class for human readers.
const CASE_SECTIONS: { key: keyof CaseStudy; heading: string }[] = [
  { key: 'problem', heading: 'The problem' },
  { key: 'motivation', heading: 'Why I built it' },
  { key: 'challenges', heading: 'What I ran into' },
  { key: 'solution', heading: 'How it got solved' },
  { key: 'story', heading: 'Where it happened' },
];

const ProjectCaseStudy: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const cs = project.caseStudy;
  if (!cs) return null;

  return (
    <div className={`pcard__case ${open ? 'pcard__case--open' : ''}`}>
      <button
        type="button"
        className="pcard__case-toggle"
        aria-expanded={open}
        aria-controls={`case-${project.id}`}
        onClick={() => setOpen(o => !o)}
        style={{ color: project.accent }}
      >
        {open ? 'Hide the full story' : 'Read the full story'}
        <LuChevronDown className="pcard__case-chevron" aria-hidden="true" />
      </button>

      <div className="pcard__case-body" id={`case-${project.id}`}>
        <div className="pcard__case-inner">
          {CASE_SECTIONS.map(({ key, heading }) =>
            cs[key] ? (
              <div className="pcard__case-section" key={key}>
                <h3 className="pcard__case-h" style={{ color: project.accent }}>
                  {heading}
                </h3>
                <p
                  className="pcard__case-p"
                  dangerouslySetInnerHTML={{ __html: cs[key] as string }}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Single project card ─────────────────────────────────────────
export const ProjectCard: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const { ref, visible } = useReveal();

  const renderMedia = () => {
    const { media, accent } = project;

    // A real video file always wins, whatever the declared type — this is
    // how a dropped-in clip "upgrades" a slideshow/image/placeholder card.
    if (media.video) {
      return (
        <video
          className="pcard__video"
          src={media.video}
          poster={media.poster || (media.images && media.images[0])}
          autoPlay
          muted
          loop
          playsInline
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

  return (
    <article
      ref={ref}
      className={['pcard', project.reversed ? 'pcard--reversed' : '', visible ? 'pcard--visible' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {/* Media */}
      <div className="pcard__media" style={{ '--card-accent': project.accent } as React.CSSProperties}>
        {renderMedia()}
      </div>

      {/* Info */}
      <div className="pcard__info">
        <span className="pcard__number" aria-hidden="true">
          {project.number}
        </span>

        <h2 className="pcard__title" style={{ color: project.accent }}>
          {project.title}
        </h2>
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
              style={
                link.type === 'demo'
                  ? ({
                      '--btn-accent': project.accent,
                      borderColor: `${project.accent}55`,
                      color: project.accent,
                    } as React.CSSProperties)
                  : {}
              }
            >
              {link.type === 'github' ? <FaGithub /> : <FaExternalLinkAlt />}
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
