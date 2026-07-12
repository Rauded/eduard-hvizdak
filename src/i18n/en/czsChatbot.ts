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
    title: 'A thousand pages, one inbox',
    body: [
      'The CZS website holds close to a thousand pages of study-abroad rules in Czech and English, and the rules do not stay in one place: they also live in PDFs, Word documents, and recorded info sessions, and they change constantly. Students emailed their questions and staff answered each one by hand.',
    ],
    mediaStat: '778 sources: ~530 web pages · 174 PDFs · 60 Word docs · 3 video transcripts',
  },
  product: {
    title: 'Ask in Czech or English. Get an answer with receipts.',
    body: [
      'An assistant that answers study-abroad questions in Czech and English, grounded in retrieved CZS sources and citing them, so every claim can be traced back to a page. Facts that must never be guessed (the current date and semester, application deadlines, CZS contact details) are injected by deterministic tool calls instead of the model\'s memory.',
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
      'Every question runs through a query classifier (intent, entities, language) and then hybrid retrieval on a self-hosted OpenSearch index: BM25 plus Voyage voyage-3.5 dense vectors fused with Reciprocal Rank Fusion, reranked by two independent cross-encoders and diversified with MMR. Chunking is heading-aware and token-sized, with a parent-child index: the system matches on small precise child passages, then expands to the full parent section for generation. A CRAG-style answerability gate checks whether the retrieved context can actually support an answer and re-retrieves with a rewritten query if not; verified facts (date, semester, deadlines, contacts) are injected by deterministic tool calls rather than LLM function-calling, which keeps the response streamable. Generation runs on DeepSeek-v3.2 via CERIT, the Czech national academic AI infrastructure, and streams to the browser over Server-Sent Events.',
    ],
    forBuildersLabel: 'For builders',
    forBuilders: 'Keep fact injection deterministic (dates, deadlines, contacts as plain lookups, not LLM tool calls) so you never break SSE streaming, and gate answerability before generation so the model asks or refuses instead of inventing.',
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
      'A continuous LLM-as-judge harness evaluates the system on in-domain questions drawn from the CZS FAQ: real historical student questions plus generated variations, all answerable from the sources, not off-topic noise. Each answer is graded against the reference material for accuracy and groundedness and checked for hallucination. Across 37 cycles and 15,362 graded runs, 10,438 produced a gradeable answer (the rest were clarifying questions, out-of-scope probes, or empty retrievals); of those, 84 percent scored 9 or 10 out of 10, with a mean of 9.0, groundedness of 8.6, and hallucinations flagged on about 1 percent.',
    ],
    chartTitle: 'How 10,438 graded answers scored',
    chartAccuracy: 'scored 9 or 10',
    chartHallucination: 'scored 0 to 8',
    chartCaption: 'Accuracy distribution across 10,438 gradeable answers from 15,362 judged runs. The correct source appears in the top retrieval results 92 percent of the time, up from 79 before the parent-child index.',
  },
  golden: {
    title: 'A knowledge base that reviews itself',
    intro:
      'CZS staff handed over their archive of real student questions with verified answers, and the team extended it into a curated dataset of 715 question-answer pairs. Every new question runs through it before any generation happens.',
    stepsLabel: 'From a new question to a golden pair',
    steps: [
      'Answerability check: is the question in scope at all, or off-topic.',
      'Similarity search against the FAQ: has a near-identical question already been answered.',
      'If a verified CZS-staff answer exists, serve it directly.',
      'If not, draft an answer with full retrieval across the 778 sources.',
      'The draft goes to CZS staff to review, edit, and approve in the admin queue.',
      'An approved answer becomes a golden FAQ pair, reused for all future similar questions.',
    ],
    closer:
      'The knowledge base compounds: every approved answer makes the next identical question instant and staff-verified. 707 of the 715 pairs carry that verification today.',
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
