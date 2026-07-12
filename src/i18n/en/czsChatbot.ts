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
      'Bilingual, source-cited AI assistant live on Masaryk University\'s study-abroad pages. 15,362 graded evaluation runs, roughly 90 percent accuracy, hallucinations near 1 percent.',
  },
  hero: {
    eyebrow: 'Case study · Masaryk University, CZS',
    title: 'The answers were on the site. Staff answered by hand anyway.',
    lead:
      'An assistant that answers study-abroad questions on Masaryk University\'s official site, grounded in the university\'s own pages, every answer cited.',
    live: 'See it live on the Erasmus page',
    liveUrl: 'https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa',
    figureCaption: 'The production widget on the official CZS site, not a prototype.',
    book: 'Book an intro call',
    email: 'Email me',
    meta: [
      { k: 'For', v: 'Masaryk University, CZS' },
      { k: 'Role', v: 'Solo engineer, design to production' },
      { k: 'Status', v: 'Live on czs.muni.cz' },
    ],
  },
  metrics: [
    { value: '15,362', label: 'graded evaluation runs' },
    { value: '~90%', label: 'measured answer accuracy' },
    { value: '~1%', label: 'measured hallucination rate' },
    { value: '778', label: 'source pages monitored' },
  ],
  problem: {
    title: '778 sources, one inbox.',
    body: 'The rules live in <strong>778 constantly changing sources</strong> in Czech and English, and every student question used to be answered <strong>by hand, one email at a time</strong>.',
    corpusLabel: 'Source corpus, CS + EN',
    mix: [
      { fmt: 'web', k: 'web pages', n: 530, short: '530 web' },
      { fmt: 'pdf', k: 'PDF', n: 174, short: '174 PDF' },
      { fmt: 'docx', k: 'docx', n: 60, short: '' },
      { fmt: 'video', k: 'video transcripts', n: 3, short: '' },
    ],
    before: 'Before: every question answered manually, by email',
  },
  product: {
    title: 'Ask in Czech or English. Get an answer with receipts.',
    body: [
      'Answers study-abroad questions in <strong>Czech or English</strong>, grounded in retrieved CZS sources and <strong>cited</strong>, so every claim traces back to a page. Facts that must not be guessed (current date, deadlines, contacts) come from <strong>deterministic tool calls</strong>, not the model\'s memory.',
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
      'Every question is classified, then answered from <strong>hybrid OpenSearch retrieval</strong> (BM25 plus Voyage dense vectors, fused with RRF, two rerankers, MMR) over a heading-aware <strong>parent-child index</strong>, with a <strong>CRAG-style answerability gate</strong> that re-retrieves on weak context. Verified facts come from <strong>deterministic tool calls</strong>, not the model, so answers stream over SSE from <strong>DeepSeek-v3.2 on CERIT</strong>.',
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
    freshness: 'A change monitor watches all <strong>778 sources</strong>. Any change fires a <strong>webhook</strong> that re-indexes just that page, and a <strong>daily job</strong> sweeps the rest, so the bot never goes stale.',
    stackLabel: 'Stack',
    stack: ['Python', 'FastAPI', 'OpenSearch', 'Voyage AI', 'DeepSeek via CERIT', 'PostHog', 'nginx'],
  },
  evaluation: {
    title: 'Measured, not vibes',
    body: [
      'A continuous <strong>LLM-as-judge</strong> harness grades in-domain questions from the CZS FAQ (real historical plus generated) against the sources for accuracy, groundedness, and hallucination. Across <strong>37 cycles</strong> and <strong>15,362 runs</strong>, <strong>10,438</strong> were gradeable answers: <strong>84 percent scored 9 or 10</strong>, mean <strong>9.0</strong>, groundedness <strong>8.6</strong>, hallucinations <strong>near 1 percent</strong>.',
    ],
    chartTitle: 'How 10,438 graded answers scored',
    chartAccuracy: 'scored 9 or 10',
    chartHallucination: 'scored 0 to 8',
    chartCaption: 'Accuracy distribution across 10,438 gradeable answers from 15,362 judged runs. The correct source appears in the top retrieval results 92 percent of the time, up from 79 before the parent-child index.',
  },
  golden: {
    title: 'Every approved answer makes the next one instant.',
    intro:
      'CZS handed over their archive of real student questions with <strong>verified answers</strong>; the system turns every new answer back into that archive.',
    statNum: '707',
    statDen: '/ 715',
    statLabel: 'Q&A pairs staff verified',
    statSub: '8 promoted from live chats',
    nodes: [
      { k: 'New question', v: 'scope check + FAQ match' },
      { k: 'Known & verified?', v: 'serve it, or draft from sources' },
      { k: 'Staff review', v: 'edit, approve' },
      { k: 'Golden pair', v: 'joins the verified FAQ' },
    ],
    loopLabel: 'Every approval grows the verified set',
    closer: '707 of 715 pairs are already staff verified, and the loop only adds to that number.',
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
          'Evaluation showed <strong>18.6 percent</strong> of questions got a counter-question instead of an answer; I rewrote the clarification policy and verified the gain with an <strong>A/B evaluation</strong>.',
      },
      {
        tag: 'Retrieval index',
        before: '0.79',
        after: '0.92',
        scale: 'correct source in top 7 results',
        title: 'Small chunks to find, full sections to answer.',
        body:
          'I built a <strong>parent-child index</strong>: match on small, precise passages, then expand to the full section so the model answers with complete context. The right page now reaches the top results <strong>92 percent</strong> of the time, up from <strong>79</strong>.',
      },
      {
        tag: 'Answer speed',
        before: '15.0s',
        after: '10.6s',
        scale: 'median (p50) answer latency',
        title: 'Faster, at higher accuracy.',
        body:
          'The same retrieval redesign cut median answer latency by <strong>4.4 seconds</strong> while answer accuracy went up, not down. Better context reached the model in fewer, cleaner passages.',
      },
    ],
  },
  dashboards: {
    title: 'CZS staff run this. Not me.',
    intro:
      'Staff see <strong>every conversation</strong>, review anything questionable, and update the knowledge base <strong>without touching code</strong>.',
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
    note: 'The screens shown here are illustrative mockups with invented example data; the real dashboards live behind a staff login.',
    closer: 'The AI drafts, humans decide; CZS gets the controls, not a support contract.',
  },
  privacy: {
    title: 'Private by default',
    body: [
      'No account, <strong>no personal data collected</strong>. Conversations are logged for quality review.',
      'Everything runs on a <strong>dedicated server for the university</strong>, not a shared third-party AI service, and the bot reads only CZS\'s public pages.',
    ],
  },
  cta: {
    eyebrow: 'Accepting new projects',
    title: 'Have a site full of answers nobody can find?',
    body:
      'If users keep asking questions your site already answers, I build the assistant that closes the gap and the measurement proving it works.',
    book: 'Book an intro call',
    email: 'Email me',
    outcome: 'An assistant your team controls, with the numbers to prove it works.',
  },
};

export default czsChatbot;
