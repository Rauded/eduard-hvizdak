import React from 'react';
import './projects.scss';
import '../portfolio/PortfolioPage.scss';
import { VISIBLE_PROJECTS } from '../portfolio/projectsData';
// @ts-ignore
import ProjectCard from '../portfolio/ProjectCard.tsx';
// @ts-ignore: the `projects` namespace is registered centrally by the parent.
import { useT } from '../../i18n';

// Homepage Projects section: the single home for the project showcase.
// (The standalone /portfolio page was removed; each card's deep dive now
// lives in the case-study modal opened from that card.)
const Projects: React.FC = () => {
  const t = useT('projects');
  return (
    <div className="projects-container" id="projects">
      <h2 className="section-title">{t.heading}</h2>
      <p className="projects-intro">{t.intro}</p>

      <section className="port-projects">
        {VISIBLE_PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
};

export default Projects;
