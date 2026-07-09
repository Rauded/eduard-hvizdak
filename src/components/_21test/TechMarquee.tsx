import React from 'react';
import './tech-marquee.scss';
import {
  SiPython, SiTypescript, SiFastapi, SiLangchain, SiPostgresql, SiOpensearch,
  SiSupabase, SiDeno, SiStripe, SiNextdotjs, SiReact, SiTailwindcss,
  SiPosthog, SiVite,
} from 'react-icons/si';

// ── TEST: 21st.dev "Logo Marquee" (grootstudio) ported to SCSS. Slowed to 55s.
// Curated to the real, production stack actually used across the projects and
// roles (RAG systems, automation engines, B2B SaaS), not AI-vendor logos.
const STACK = [
  { icon: SiPython, label: 'Python' },
  { icon: SiFastapi, label: 'FastAPI' },
  { icon: SiLangchain, label: 'LangChain' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: SiOpensearch, label: 'OpenSearch' },
  { icon: SiSupabase, label: 'Supabase' },
  { icon: SiDeno, label: 'Deno' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiReact, label: 'React' },
  { icon: SiVite, label: 'Vite' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiStripe, label: 'Stripe' },
  { icon: SiPosthog, label: 'PostHog' },
];

const TechMarquee: React.FC = () => {
  const track = [...STACK, ...STACK];
  return (
    <section className="tech-marquee" aria-label="Tech stack">
      <p className="tech-marquee__eyebrow">The stack behind the RAG systems, automation engines and SaaS</p>
      <div className="tech-marquee__viewport">
        <ul className="tech-marquee__track">
          {track.map((t, i) => {
            const Icon = t.icon;
            return (
              <li className="tech-marquee__item" key={`${t.label}-${i}`}>
                <Icon className="tech-marquee__icon" aria-hidden />
                <span>{t.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TechMarquee;
