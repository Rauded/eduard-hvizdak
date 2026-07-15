// About section. The prose is broken into segments so the inline highlighted
// spans (purple-text) and the expert/student positioning branch stay intact.
// Copy mirrors jakubjamny.com's about structure per Eduard's request
// (2026-07-12), adapted to Eduard's true facts. Paying customers = InzerPro
// only; no chatbot metrics.
const about = {
  title: 'About Me',
  greeting: "I'm",
  introExpert: 'I try my best to position myself between business and technology.',
  introStudent:
    'A computer science student at Masaryk University who sits between business and technology.',
  recentPrefix: "For the past two years I've built AI systems across",
  recentSpan:
    'public-contract document pipelines, university knowledge systems, and municipal AI assistants',
  interestsPrefix: "Now I'm focused on building",
  interestsSpan: 'production AI agents and automation systems',
  interestsSuffix:
    'that run on schedule, work with real data, take real actions, and report results.',
  skillsPrefix: 'On the side I run',
  skillsSpan: 'InzerPro, a SaaS with paying customers.',
  skillsSuffix:
    'I build with Claude Code and modern AI tooling, so integrations, automations, and internal tools ship in days, not quarters.',
  outside:
    "I spend my free time reading books, experimenting with new tools (token-maxxing) and doom-scrolling Twitter...",
  highlightEyebrow: 'Recent Highlight',
  highlightTitlePrefix: 'Invited by the',
  highlightTitleSpan: 'European Commission',
  highlightTitleSuffix: 'to discuss the Digital Fairness Act',
  highlightDescPrefix: 'With EU Commissioner',
  highlightDescSpan: 'Michael McGrath',
  highlightDescSuffix: 'as part of the Youth Policy Dialogue initiative.',
  highlightCta: 'Read the story',
};

export default about;
