import React, { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import './projects.scss';
import '../portfolio/PortfolioPage.scss';
import { VISIBLE_PROJECTS } from '../portfolio/projectsData';
// @ts-ignore
import ProjectCard from '../portfolio/ProjectCard.tsx';
// @ts-ignore: the `projects` namespace is registered centrally by the parent.
import { useT } from '../../i18n';

// How many cards show before the reader asks for more. Six cards ran 4,018px,
// 45% of the homepage, for 321 words. Three make the same point in half the
// height, and the rest are one click away.
const FEATURED_COUNT = 3;

// Homepage Projects section: the single home for the project showcase.
// (The standalone /portfolio page was removed; each card's deep dive now
// lives in the case-study modal opened from that card.)
const Projects: React.FC = () => {
  const t = useT('projects');
  const [showAll, setShowAll] = useState(false);
  const rest = VISIBLE_PROJECTS.length - FEATURED_COUNT;

  return (
    <div className="projects-container" id="projects">
      <h2 className="section-title">{t.heading}</h2>
      <p className="projects-intro">{t.intro}</p>

      <section className="port-projects">
        {VISIBLE_PROJECTS.slice(0, FEATURED_COUNT).map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {rest > 0 && (
        <>
          {/* The remaining cards stay MOUNTED and are hidden with CSS, never
              conditionally rendered. Each one carries a full case study in the
              markup, which is what search engines and LLM crawlers read;
              dropping them from the DOM would trade the page weight win for a
              much bigger SEO loss. Same reasoning as the collapsed case-study
              bodies inside each card. */}
          <section
            className="projects-overflow"
            data-open={showAll ? 'true' : 'false'}
            aria-hidden={!showAll}
          >
            {/* Exactly one child: the 0fr -> 1fr grid collapse measures a
                single row, so the cards need a wrapper of their own. */}
            <div className="port-projects">
              {VISIBLE_PROJECTS.slice(FEATURED_COUNT).map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {!showAll && (
            <button
              type="button"
              className="projects-more"
              onClick={() => setShowAll(true)}
              data-cuelume-press
            >
              <LuPlus aria-hidden="true" />
              {t.showAll.replace('{n}', String(rest))}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
