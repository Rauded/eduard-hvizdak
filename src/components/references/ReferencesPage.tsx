import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowUpRight } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import { useT } from '../../i18n';
import { useTheme } from '../theme/ThemeContext';
import Reveal from '../_21test/Reveal';
import './references.scss';

// Company logos live under public/brand/clients (referenced by URL, not import).
// Roles and dates come from the resume; Artiffine is the current role.
const CLIENTS = [
  { name: 'Artiffine', role: 'AI & Web3 studio', dates: 'Present', url: 'https://www.artiffine.com', logo: '/brand/clients/artiffine.svg', current: true },
  { name: 'Masaryk University, CZS', role: 'AI Systems Engineer', dates: '2025 - Present', url: 'https://czs.muni.cz/cs/', logo: '/brand/clients/masaryk-university.png', current: true },
  { name: 'OneBond', role: 'AI Systems Engineer', dates: '2025 - 2026', url: 'https://onebond.tech', logo: '/brand/clients/onebond.svg' },
  { name: 'iGalileo', role: 'AI Developer', dates: '2025', url: 'https://www.igalileo.cz/', logo: '/brand/clients/igalileo.svg' },
  { name: 'EDUC Alliance', role: 'Think Tank Member & Programmer', dates: '2024 - 2025', url: 'https://www.educalliance.eu', logo: '/brand/clients/educ-alliance.png' },
];

const ReferencesPage: React.FC = () => {
  const { theme } = useTheme();
  const t = useT('references');

  return (
    <div className="refs" data-theme={theme}>
      <Seo title={t.seo.title} description={t.seo.description} path="/references" noindex />

      <header className="refs-hero">
        <Link to="/" className="refs-back"><LuArrowLeft aria-hidden="true" /> {t.back}</Link>
        <span className="refs-eyebrow">{t.eyebrow}</span>
        <h1 className="refs-title">{t.title}</h1>
        <p className="refs-subtitle">{t.subtitle}</p>
      </header>

      <ul className="refs-grid">
        {CLIENTS.map((c, i) => (
          <Reveal as="li" className="refs-card" key={c.name} delay={i * 60}>
            <a className="refs-card__link" href={c.url} target="_blank" rel="noopener noreferrer">
              <span className="refs-logo">
                <img src={c.logo} alt={`${c.name} logo`} loading="lazy" />
              </span>
              <span className="refs-meta">
                <span className="refs-name">
                  {c.name}
                  {c.current && <span className="refs-badge">{t.currentLabel}</span>}
                </span>
                <span className="refs-role">{c.role}</span>
                <span className="refs-dates">{c.dates}</span>
              </span>
              <span className="refs-visit">{t.visit} <LuArrowUpRight aria-hidden="true" /></span>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
};

export default ReferencesPage;
