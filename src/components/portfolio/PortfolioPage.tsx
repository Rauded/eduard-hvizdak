import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './PortfolioPage.scss';
import { PROJECTS } from './projectsData';
// @ts-ignore
import ProjectCard from './ProjectCard.tsx';

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
          Portfolio
        </h1>
        <p className="port-hero__tagline">
          Apps, tools, and experiments built to solve real problems.
        </p>
        <div className="port-hero__meta">
          <span>{PROJECTS.length} projects</span>
          <span className="port-hero__sep">·</span>
          <span>2023 – 2025</span>
          <span className="port-hero__sep">·</span>
          <span>AI · SaaS · XR · Web · Desktop</span>
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
