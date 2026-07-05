import React from 'react';
import './projects.scss';
import '../portfolio/PortfolioPage.scss';
import { VISIBLE_PROJECTS } from '../portfolio/projectsData';
// @ts-ignore
import ProjectCard from '../portfolio/ProjectCard.tsx';

// Homepage Projects section: the single home for the project showcase.
// (The standalone /portfolio page was removed; each card's deep dive now
// lives in the case-study modal opened from that card.)
const Projects: React.FC = () => {
  return (
    <div className="projects-container" id="projects">
      <h2 className="section-title">Projects</h2>
      <p className="projects-intro">
        Apps, tools, and experiments built to solve real problems.
      </p>

      <section className="port-projects">
        {VISIBLE_PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
};

export default Projects;
