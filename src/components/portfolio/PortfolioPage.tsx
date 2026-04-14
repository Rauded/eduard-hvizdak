import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import './PortfolioPage.scss';

// ─── Asset loader (same pattern as rest of codebase) ───────────────────────
function asset(path: string): string {
  return require(`../../assets/projects/${path}`);
}

// ─── Types ─────────────────────────────────────────────────────────────────
interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo';
}

interface ProjectMedia {
  type: 'video' | 'slideshow' | 'image' | 'concept';
  video?: string;
  poster?: string;
  images?: string[];
}

interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  media: ProjectMedia;
  accent: string;
  reversed: boolean;
}

// ─── Project data ───────────────────────────────────────────────────────────
const PROJECTS: PortfolioProject[] = [
  {
    id: 'studyexe',
    number: '01',
    title: 'StudyExe',
    subtitle: 'Deep work for ADHD brains',
    description:
      'Real-time eye tracking alerts you after 5 seconds of looking away. Full screen lock eliminates every distraction. AI-scored recall sessions measure what you actually retained — not just how long you stared at a screen.',
    tags: ['Python', 'OpenAI API', 'Eye Tracking', 'Tkinter', 'Desktop App', 'AI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
      { label: 'Website', url: 'https://www.studyexe.com', type: 'demo' },
    ],
    media: {
      type: 'slideshow',
      images: [
        asset('obsidian_theme_dashboard.png'),
        asset('obsidian_theme_study_session_reading.png'),
        asset('obsidian_theme_score.png'),
        asset('red_cyberpunk_theme_dashboard.png'),
        asset('cyberforest_theme.png'),
        asset('obsidian_theme_study_session_configuration.png'),
      ],
    },
    accent: '#6366f1',
    reversed: false,
  },
  {
    id: 'newsmatics',
    number: '02',
    title: 'Newsmatics Globe',
    subtitle: 'News as geography',
    description:
      'A geolocation pipeline that extracts locations from news articles via NLP, matches them against the GeoNames database, and visualises them on an interactive 3D globe. Timeline playback lets you watch events unfold across the world in real time.',
    tags: ['Python', 'JavaScript', 'Globe.gl', 'LangChain', 'NLP', 'Data Viz', 'Hackathon'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
    ],
    media: {
      type: 'video',
      video: asset('newsmatics-hackathon.mp4'),
      poster: asset('newsmatics-globe-1.png'),
    },
    accent: '#10b981',
    reversed: true,
  },
  {
    id: 'psychetab',
    number: '03',
    title: 'PsycheTab',
    subtitle: 'Your browser, your aesthetic',
    description:
      'A Chrome extension that replaces the new tab page with rotating collage wallpapers assembled from your own image library. Drag, resize, rotate, and layer each piece. Every byte lives locally in IndexedDB — no cloud, no tracking, ever.',
    tags: ['JavaScript', 'Manifest V3', 'LocalForage', 'IndexedDB', 'Chrome Extension'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded/college_extension_chrome', type: 'github' },
    ],
    media: {
      type: 'video',
      video: asset('psychetab-demo.mp4'),
      poster: asset('psychetab-main.png'),
    },
    accent: '#f59e0b',
    reversed: false,
  },
  {
    id: 'nasadclaw',
    number: '04',
    title: 'NasadClaw',
    subtitle: 'AI infrastructure for Czech & Slovak enterprises',
    description:
      "Professional deployment of the OpenClaw AI assistant for business teams. Physical installation on dedicated hardware at the client's office, full InfoSec hardening, and ongoing maintenance \u2014 so teams get leverage from day one without a new software project to manage.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostHog', 'B2B', 'SaaS'],
    links: [
      { label: 'Website', url: 'https://www.nasadclaw.cz', type: 'demo' },
    ],
    media: {
      type: 'image',
      images: [asset('nasadclaw-real-image.png')],
    },
    accent: '#a855f7',
    reversed: true,
  },
  {
    id: 'bookreader-xr',
    number: '05',
    title: 'BookReader for Even G1',
    subtitle: 'Read anywhere, eyes forward',
    description:
      'An XR reading application for the Even Realities G1 smart glasses running on MentaOS. Upload any book and read hands-free — commuting, exercising, anywhere. Chapter progress and bookmarks sync automatically across sessions.',
    tags: ['JavaScript', 'MentaOS', 'XR', 'Extended Reality', 'Open Source'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
    ],
    media: { type: 'concept' },
    accent: '#06b6d4',
    reversed: false,
  },
];

// ─── Scroll-reveal hook ──────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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

// ─── Slideshow ───────────────────────────────────────────────────────────────
const Slideshow: React.FC<{ images: string[]; accent: string }> = ({ images, accent }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent(c => (c + 1) % images.length),
      3400
    );
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

// ─── XR Concept card (BookReader) ────────────────────────────────────────────
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

// ─── Single project card ──────────────────────────────────────────────────────
const ProjectCard: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const { ref, visible } = useReveal();

  const renderMedia = () => {
    const { media, accent } = project;
    switch (media.type) {
      case 'video':
        return (
          <video
            className="pcard__video"
            src={media.video}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        );
      case 'slideshow':
        return <Slideshow images={media.images!} accent={accent} />;
      case 'image':
        return (
          <img
            className="pcard__img"
            src={media.images![0]}
            alt={project.title}
          />
        );
      case 'concept':
        return <ConceptCard accent={accent} />;
      default:
        return null;
    }
  };

  return (
    <article
      ref={ref}
      className={[
        'pcard',
        project.reversed ? 'pcard--reversed' : '',
        visible ? 'pcard--visible' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Media */}
      <div
        className="pcard__media"
        style={{ '--card-accent': project.accent } as React.CSSProperties}
      >
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
      </div>
    </article>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const PortfolioPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="portfolio-page">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className={`port-hero ${heroVisible ? 'port-hero--visible' : ''}`}
      >
        <Link to="/" className="port-back">
          <FaArrowLeft />
          Back
        </Link>

        <p className="port-hero__eyebrow">Selected Work</p>
        <h1 className="port-hero__title">
          <span className="port-hero__title-line port-hero__title-line--accent">Port</span>
          <span className="port-hero__title-line">folio</span>
        </h1>
        <p className="port-hero__tagline">
          Apps, tools, and experiments built to solve real problems.
        </p>
        <div className="port-hero__meta">
          <span>5 projects</span>
          <span className="port-hero__sep">·</span>
          <span>2023 – 2025</span>
          <span className="port-hero__sep">·</span>
          <span>AI · XR · Web · Desktop</span>
        </div>
      </section>

      {/* ── Project cards ── */}
      <section className="port-projects">
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {/* ── Footer CTA ── */}
      <div className="port-footer">
        <Link to="/" className="port-back">
          <FaArrowLeft />
          Back to main site
        </Link>
      </div>
    </div>
  );
};

export default PortfolioPage;
