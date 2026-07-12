// Case study: the AI assistant built for Masaryk University's Centre for
// International Cooperation (CZS), live on czs.muni.cz. Text-only namespace:
// icons, numbers-as-data, and layout live in the component; every visible
// string lives here so cs/sk can override it. Numbers in the metric band and
// the before/after wins are real and defensible (see the project brief); do not
// inflate them. No em or en dashes anywhere. Copy is deliberately minimal.
const czsChatbot = {
  back: 'Back to services',
  seo: {
    title: 'AI assistant for Masaryk University (CZS), case study',
    description:
      'Bilingual, source-cited AI assistant live on Masaryk University\'s study-abroad pages. 15,362 graded evaluation runs, roughly 90 percent accuracy, hallucinations near 1 percent, one 8 GB server.',
  },
  hero: {
    eyebrow: 'Case study · Masaryk University, CZS',
    title: '300 scattered pages. One assistant that cites its sources.',
    lead:
      'A bilingual assistant answers study-abroad questions on Masaryk University\'s official site, grounded in the university\'s own pages, every answer cited.',
    live: 'See it live on the Erasmus page',
    liveUrl: 'https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa',
    figureCaption: 'The production widget on the official CZS site, not a prototype.',
    book: 'Book an intro call',
    email: 'Email me',
    meta: [
      { k: 'Client', v: 'Masaryk University, CZS' },
      { k: 'Role', v: 'Solo engineer, design to production' },
      { k: 'Status', v: 'Live on czs.muni.cz' },
    ],
  },
  metrics: [
    { value: '15,362', label: 'graded evaluation runs' },
    { value: '~90%', label: 'measured answer accuracy' },
    { value: '~1%', label: 'measured hallucination rate' },
    { value: '778', label: 'source pages monitored' },
    { value: '1', label: '8 GB server runs everything' },
  ],
  problem: {
    title: '300 pages, one inbox',
    body: [
      'Study-abroad rules live across 300+ Czech and English pages that change constantly, so students email the same questions and staff answer by hand.',
    ],
  },
  product: {
    title: 'Ask in Czech or English. Get an answer with receipts.',
    body: [
      'Students ask in Czech or English; answers come only from CZS content, sources linked, deadlines and contacts injected from human-approved tables.',
    ],
    captionWidgetLive: 'Opens with an AI disclaimer and suggested questions, in the student\'s language.',
    captionAnswerLive: 'A real answer citing 11 named source documents, with feedback that routes to human review.',
    answerHeading: 'The same answer, in English',
    answerQuestion: 'What do I need to submit for the Erasmus+ selection?',
    answerBody: 'For the Erasmus+ selection the documents vary by faculty, but generally you will need:',
    answerList: ['Application form', 'Motivation letter', 'Proof of language level', 'Transcript of records'],
    answerSources: 'Sources (11)',
    answerCaption: 'Every claim backed by a cited CZS source.',
  },
  architecture: {
    title: 'The pipeline behind a straight answer',
    body: [
      'Each question runs through intent classification, hybrid OpenSearch retrieval (BM25 plus vectors), two rerankers, and an answerability gate. Facts that must never be guessed, like deadlines and the right coordinator, come from a deterministic tool call, not the model\'s memory. Generation runs on CERIT.',
    ],
    stepsLabel: 'The path of one question',
    steps: [
      { k: 'Question', v: 'Czech or English' },
      { k: 'Classify', v: 'intent, entities, language' },
      { k: 'Hybrid search', v: 'BM25 plus vectors, fused' },
      { k: 'Rerank', v: 'two models, diversified' },
      { k: 'Answerability gate', v: 're-retrieve if weak' },
      { k: 'Tool call', v: 'verified deadlines, contacts, date' },
      { k: 'Generate', v: 'DeepSeek on CERIT' },
      { k: 'Cited answer', v: 'streamed with sources' },
    ],
    freshnessLabel: 'Freshness loop',
    freshness: 'A change monitor watches all 778 CZS source pages. When any page changes, a webhook re-ingests and re-indexes just that page, and a scheduled job sweeps every source daily. Update a deadline on the website and the bot knows, with no ticket and no manual re-training.',
    stackLabel: 'Stack',
    stack: ['Python', 'FastAPI', 'OpenSearch', 'Voyage AI', 'DeepSeek via CERIT', 'PostHog', 'nginx', 'Hetzner'],
  },
  evaluation: {
    title: 'Measured, not vibes',
    body: [
      '37 automated evaluation cycles, 15,362 graded runs: accuracy around 9.0/10, groundedness 8.6/10, hallucinations near 1 percent, correct source in top results 92 percent.',
    ],
    chartTitle: 'How 10,438 graded answers scored',
    chartAccuracy: 'scored 9 or 10',
    chartHallucination: 'scored 0 to 8',
    chartCaption: 'Of 15,362 eval runs, 10,438 produced a gradeable answer. 84 percent scored 9 or 10; the average is 9.0 out of 10. Judged by an LLM against the source pages, with hallucinations flagged on about 1 percent.',
  },
  wins: {
    title: 'What measurement actually catches',
    intro: 'None of these showed up in casual testing.',
    items: [
      {
        tag: 'Clarification policy',
        before: '4.9',
        after: '7.95',
        scale: 'answer accuracy / 10',
        title: 'The bot interrogated students.',
        body:
          'Evaluation showed 18.6 percent of questions got a counter-question instead of an answer; I rewrote the clarification policy and verified the gain with an A/B evaluation.',
      },
      {
        tag: 'Retrieval index',
        before: '0.79',
        after: '0.92',
        scale: 'correct source in top 7 results',
        title: 'Small chunks to find, full sections to answer.',
        body:
          'I built a parent-child index: match on small, precise passages, then expand to the full section so the model answers with complete context. The right page now reaches the top results 92 percent of the time, up from 79.',
      },
      {
        tag: 'Answer speed',
        before: '15.0s',
        after: '10.6s',
        scale: 'median (p50) answer latency',
        title: 'Faster, at higher accuracy.',
        body:
          'The same retrieval redesign cut median answer latency by 4.4 seconds while answer accuracy went up, not down. Better context reached the model in fewer, cleaner passages.',
      },
    ],
  },
  dashboards: {
    title: 'CZS staff run this. Not me.',
    intro:
      'Staff see every conversation, review anything questionable, and update the knowledge base without touching code.',
    items: [
      {
        title: 'Conversation Database',
        caption:
          'Every question and answer with confidence, sources, feedback, and response time; searchable.',
      },
      {
        title: 'Flagged & Resolved',
        caption:
          'Thumbs-down and low-confidence answers wait here for staff verification.',
      },
      {
        title: 'Manage Sources',
        caption:
          'All 778 monitored pages with change-detection status, plus manual upload.',
      },
      {
        title: 'FAQ Review',
        caption:
          'Candidate FAQs mined from real conversations; nothing enters without human approval.',
      },
    ],
    closer: 'The AI drafts, humans decide; the client gets the controls, not a support contract.',
  },
  cost: {
    title: 'Enterprise-grade retrieval, hobby-server bill',
    body: [
      'Everything runs on one 8 GB server; generation rides CERIT at near-zero marginal cost, with a RAM upgrade and OpenAI failover already designed.',
    ],
    cards: [
      { k: 'Compute', v: 'One 8 GB VPS runs retrieval, dashboards, eval' },
      { k: 'Generation', v: 'CERIT academic infrastructure, near-zero marginal cost' },
      { k: 'Scale path', v: 'RAM upgrade and OpenAI failover designed' },
    ],
  },
  privacy: {
    title: 'Private by default',
    body: [
      'Students need no account and hand over no personal data to use it. Conversations are logged for quality review with IP addresses hashed, never stored raw.',
      'Everything runs on the university\'s own server, not a third-party AI service, and the bot only ever reads CZS\'s own public pages. The data, the model traffic, and the logs stay inside the institution.',
    ],
  },
  cta: {
    eyebrow: 'Accepting new projects',
    title: 'Have a site full of answers nobody can find?',
    body:
      'If users keep asking questions your site already answers, I build the assistant that closes the gap and the measurement proving it works.',
    book: 'Book an intro call',
    email: 'Email me',
    outcome: 'An assistant your team controls, numbers to show your boss, one small server.',
  },
};

export default czsChatbot;
