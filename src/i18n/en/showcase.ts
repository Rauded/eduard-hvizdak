// "See it run" showcase: agent steps + outcome stats. Step/stat numbers stay
// in the component; only the labels live here.
const showcase = {
  title: 'See it run',
  lead:
    'A document-intelligence task, start to finish: the agent works through the steps, and the results it produces are exactly what you get back.',
  barTitle: 'agent · run',
  steps: [
    'Reading 240 uploaded documents',
    'Building vector index (VoyageAI)',
    'Retrieving the relevant clauses',
    'Cross-checking against the source',
    'Drafting a cited answer',
  ],
  stats: [
    'Documents indexed in the run',
    'Median time to a cited answer',
    'Answers traced back to the source',
  ],
};

export default showcase;
