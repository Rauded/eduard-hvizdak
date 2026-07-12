// Case study: the AI assistant built for Masaryk University's Centre for
// International Cooperation (CZS), live on czs.muni.cz. Text-only namespace:
// icons, numbers-as-data, and layout live in the component; every visible
// string lives here so cs/sk can override it. Numbers in the metric band and
// the before/after wins are real and defensible (see the project brief); do not
// inflate them. No em or en dashes anywhere.
const czsChatbot = {
  back: 'Back to projects',
  seo: {
    title: 'AI assistant for Masaryk University (CZS), case study',
    description:
      'A bilingual, source-cited AI assistant live on Masaryk University\'s official study-abroad pages, plus the continuous evaluation system that proves it works: 15,362 graded runs, roughly 90 percent accuracy, hallucinations near 1 percent, all on one small server.',
  },
  hero: {
    eyebrow: 'Case study · Masaryk University, Centre for International Cooperation',
    title: '300 scattered pages. One assistant that cites its sources.',
    lead:
      'Students asked the same study-abroad questions by email for years. I built a bilingual AI assistant that now answers them on Masaryk University\'s official site, grounded only in the university\'s own pages, with every answer linking back to its source. Then I built the system that measures whether it is actually right.',
    live: 'See it live on the Erasmus page',
    liveUrl: 'https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa',
    book: 'Book an intro call',
    email: 'Email me',
    meta: [
      { k: 'Client', v: 'Masaryk University, CZS' },
      { k: 'Role', v: 'Solo engineer, design to production' },
      { k: 'Status', v: 'Live on czs.muni.cz' },
    ],
  },
  metrics: [
    { value: '15,362', label: 'evaluation runs across 37 cycles' },
    { value: '~90%', label: 'measured answer accuracy' },
    { value: '~1%', label: 'hallucination rate' },
    { value: '778', label: 'source pages monitored for changes' },
    { value: '1', label: '8 GB server runs the whole system' },
  ],
  problem: {
    title: '300 pages, one inbox',
    body: [
      'Masaryk University\'s Centre for International Cooperation runs study-abroad programs for thousands of students: Erasmus+, internships, scholarships, bilateral exchanges. The information students need lives across more than 300 Czech and English pages, and it changes constantly. Deadlines shift. Coordinators change. Stipend rules differ by faculty and program.',
      'So students email. They ask the same procedural questions again and again, and staff answer them by hand, one inbox at a time. Answers drift out of date the moment a page changes.',
      'An off-the-shelf chatbot was not an option. A generic language model will confidently invent university rules, and on an official university site a confident wrong answer is worse than no answer. CZS needed something that only says what the university\'s own pages say, cites where it got it, and stays current when those pages change.',
    ],
  },
  product: {
    title: 'Ask in Czech or English. Get an answer with receipts.',
    body: [
      'The assistant sits on the CZS study-abroad pages as a chat widget. A student asks a question in Czech or English and gets a direct answer built only from CZS\'s own content, streamed in real time.',
      'Every answer shows its work. Sources are listed and linked inline, so a student can click through to the official page behind any claim. The bot opens by stating plainly that it is AI and that important answers should be verified, and every response carries thumbs up and down buttons that feed a human review queue.',
      'When a question needs facts that must never be guessed, like the current semester\'s deadlines or the right contact person, the system does not ask the model to remember them. It injects verified data directly: a maintained deadline table, the CZS contact card, today\'s date. The model writes the sentence; the facts come from a table a human approved.',
    ],
    captionPromo: 'The assistant on the official CZS Erasmus+ page. Same blue, same site, no pop-up bolted on.',
    captionOpen: 'Opens with a plain AI disclaimer and suggested questions, in the student\'s language.',
    answerHeading: 'A real answer, with its sources',
    answerQuestion: 'What do I need to submit for the Erasmus+ selection?',
    answerBody: 'For the Erasmus+ selection the documents vary by faculty, but generally you will need:',
    answerList: ['Application form', 'Motivation letter', 'Proof of language level', 'Transcript of records'],
    answerSources: 'Sources (11)',
    answerCaption: 'Every claim links back to an official CZS page. The source count is shown on every answer.',
  },
  architecture: {
    title: 'The pipeline behind a straight answer',
    body: [
      'Grounded answers come from retrieval, so most of the engineering lives there. Every question runs through a classifier that detects intent, entities, and language, then a hybrid search over a self-hosted OpenSearch index: keyword and semantic retrieval fused together, reranked by two independent models, and diversified so the context is not five copies of the same paragraph.',
      'The index is built for precision. Pages are chunked with their heading structure intact, stored as small child passages for accurate matching, then expanded to full parent sections before generation so the model sees complete context, not fragments. An answerability gate checks whether the retrieved material can actually support an answer; if not, the system re-retrieves with a corrected query instead of letting the model improvise.',
      'Freshness is automated. A change monitor watches all 778 source URLs, and any content change fires a webhook that re-ingests and re-indexes the affected page. A scheduled job sweeps everything daily. When CZS updates a deadline on the website, the bot knows without anyone filing a ticket.',
      'Generation runs on CERIT, the Czech national academic AI infrastructure, with classification offloaded to OpenAI to keep CERIT\'s limited slots for answer generation. The whole stack, retrieval, dashboards, and evaluation included, runs on a single 8 GB server behind nginx.',
    ],
    stepsLabel: 'The path of one question',
    steps: [
      { k: 'Question', v: 'Czech or English' },
      { k: 'Classify', v: 'intent, entities, language' },
      { k: 'Hybrid search', v: 'BM25 plus vectors, fused' },
      { k: 'Rerank', v: 'two models, diversified' },
      { k: 'Answerability gate', v: 're-retrieve if weak' },
      { k: 'Fact injection', v: 'deadlines, contacts, date' },
      { k: 'Generate', v: 'DeepSeek on CERIT' },
      { k: 'Cited answer', v: 'streamed with sources' },
    ],
    freshnessLabel: 'Freshness loop',
    freshness: 'A change on any of the 778 monitored URLs fires a webhook that re-ingests and re-indexes the page.',
    stackLabel: 'Stack',
    stack: ['Python', 'FastAPI', 'OpenSearch', 'Voyage AI', 'DeepSeek via CERIT', 'PostHog', 'nginx', 'Hetzner'],
  },
  evaluation: {
    title: 'Measured, not vibes',
    body: [
      'A chatbot that seemed fine in a demo was never the goal. From early in the project, an automated evaluation system has graded the assistant\'s answers against the source material: 37 evaluation cycles so far, 15,362 graded runs, roughly 748 questions per cycle.',
      'The current numbers: average answer accuracy around 9.0 out of 10, with 93 to 95 percent of answers rated high accuracy. Groundedness, meaning how faithfully answers stick to the retrieved sources, averages 8.6 out of 10. Hallucinations sit around 1 percent, single digits per cycle of roughly 748 questions.',
      'Retrieval gets measured separately, because a grounded answer is impossible if the right page never reached the model. After the latest index redesign, the correct source appears in the top results 92 percent of the time, up from 79 percent on the previous version.',
      'Evaluation is not a report I ran once before launch. It runs continuously in production, so a regression shows up in a dashboard before it shows up in a student\'s inbox.',
    ],
    chartTitle: 'Answer accuracy across evaluation cycles',
    chartAccuracy: 'accuracy / 10',
    chartHallucination: 'hallucinations',
    chartCaption: '37 cycles of automated grading. The point is the trend line holding, not any single score.',
  },
  wins: {
    title: 'What 37 cycles of testing actually catches',
    intro: 'None of these showed up in casual testing. All of them showed up in measurement.',
    items: [
      {
        tag: 'Clarification policy',
        before: '4.9',
        after: '7.95',
        scale: 'answer accuracy / 10',
        title: 'The bot was interrogating students.',
        body:
          'Evaluation surfaced that 18.6 percent of real student questions were being answered with a counter-question ("are you an incoming or outgoing student?") even when the answer did not depend on it. Students do not tolerate an intake form disguised as a chat. I rewrote the clarification policy so the bot only asks when the answer genuinely forks, then verified the gain with an A/B evaluation.',
      },
      {
        tag: 'Retrieval index',
        before: '1',
        after: '5.8',
        scale: 'searchable chunks per page (avg)',
        title: 'Most of the knowledge base was invisible.',
        body:
          'Retrieval testing revealed that 258 of the 326 indexed pages had been collapsed into a single chunk each by the HTML scraper, so the search engine effectively could not see inside them. The Czech Erasmus page, one of the most important in the whole corpus, was one blob. After rebuilding the scraper around the pages\' heading structure, that page alone became 35 searchable sections.',
      },
      {
        tag: 'Hybrid search',
        before: '0.65',
        after: '0.75',
        scale: 'recall at 7 results',
        title: 'A production feature had silently died.',
        body:
          'Per-request logs showed the hybrid search was being rejected on 93 out of 93 retrievals and silently falling back to an older method; a second bug had quietly stopped continuous evaluation from recording results. Nothing looked broken from the outside. This is exactly why the logging exists: systems fail politely, and only instrumentation catches it. Both fixes landed the same week.',
      },
    ],
  },
  dashboards: {
    title: 'CZS staff run this. Not me.',
    intro:
      'An AI assistant a client cannot inspect is a liability with a chat window. So the admin side of this project is as built-out as the student side: CZS staff can see every conversation, review anything questionable, and update the knowledge base without touching code.',
    items: [
      {
        title: 'Conversation Database',
        caption:
          'Every question and answer, with the AI\'s confidence, the sources it used, student feedback, and response time. Filterable by program and direction, full-text searchable.',
      },
      {
        title: 'Flagged & Resolved',
        caption:
          'A human review queue. Anything a student thumbs down, or the system is unsure about, waits here for a staff member to verify or correct.',
      },
      {
        title: 'Manage Sources',
        caption:
          'All 778 monitored pages with their change-detection status, plus manual document upload. Staff control what the bot knows.',
      },
      {
        title: 'FAQ Review',
        caption:
          'The system mines candidate FAQs from real conversations; thousands wait in the queue. Nothing enters the knowledge base until a human approves it.',
      },
    ],
    closer: 'The pattern behind every screen is the same: the AI drafts, humans decide. When I hand a system over, the client gets the controls, not a support contract they are trapped in.',
  },
  cost: {
    title: 'Enterprise-grade retrieval, hobby-server bill',
    body: [
      'The entire system, hybrid retrieval, dashboards, continuous evaluation, and change monitoring, runs on one 8 GB server. Answer generation rides on CERIT, Czech national academic AI infrastructure, so marginal inference cost is close to zero; the remaining running costs are embeddings, reranking, and the server itself.',
      'The scale-up path is already designed, not hoped for: a RAM upgrade for the index, and an OpenAI generation failover ready to switch on if CERIT capacity tightens. Built over roughly eight months and 112 commits, from first line to production on the university\'s official pages.',
    ],
    cards: [
      { k: 'Compute', v: 'One 8 GB VPS runs retrieval, dashboards, and eval' },
      { k: 'Generation', v: 'On CERIT national academic infrastructure, near-zero marginal cost' },
      { k: 'Scale path', v: 'RAM upgrade and OpenAI failover already designed' },
    ],
  },
  cta: {
    eyebrow: 'Accepting new projects',
    title: 'Have a site full of answers nobody can find?',
    body:
      'This system was built for a university, but the shape of the problem is everywhere: documentation, policies, product knowledge, support archives. If your users keep asking questions your website already answers, I can build the assistant that closes that gap, and the measurement that proves it works.',
    book: 'Book an intro call',
    email: 'Email me',
    outcome: 'You get an assistant your team controls, numbers you can show your boss, and running costs that fit on one small server.',
  },
};

export default czsChatbot;
