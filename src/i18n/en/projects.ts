// Projects showcase UI chrome: section heading + intro, plus the case-study
// modal chrome (eyebrow, close label, trigger, section headings). Per-project
// content (subtitle, description, case-study prose) is NOT here; it lives as
// `_sk` variant fields on the project data in projectsData.tsx.
const projects = {
  heading: 'Projects',
  intro: "Projects and products I've shipped. Each project article covers the problem, what I built, and the result.",
  demoSoon: 'Demo coming soon',
  caseStudyEyebrow: 'Case study',
  closeCaseStudy: 'Close case study',
  projectDetails: 'Project details',
  caseSections: {
    problem: 'The problem',
    motivation: 'Why I built it',
    challenges: 'What I ran into',
    solution: 'How it got solved',
    story: 'Where it happened',
  },
};

export default projects;
