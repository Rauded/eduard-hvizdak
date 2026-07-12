// Services page copy. Arrays (signals, services, steps) are zipped by index
// against icon/stat data that stays in the component.
const services = {
  featured: {
    eyebrow: 'Flagship',
    title: 'An AI employee for your whole company',
    body: 'One agent connected to all your tools that your team just chats with. See the live, interactive demo.',
    cta: 'See the AI Employee',
  },

  caseStudy: {
    eyebrow: 'Case study',
    title: 'AI assistant for Masaryk University',
    body: 'Source-cited answers live on the university site. 15,362 graded runs, roughly 90 percent accuracy.',
    cta: 'Read the case study',
  },

  seoTitle: 'AI Consulting & Automation',
  seoDescription:
    'AI consulting and automation for teams: workflow automation, document intelligence and RAG, AI agents, and private on-premise deployment. Scoped, built, and shipped end to end by Eduard Hvizdak.',

  heroEyebrow: 'AI Consulting & Automation',
  heroTitle: 'I ship AI systems that pay for themselves.',
  heroLead:
    'I help teams put AI to work on real problems: automating the manual work that slows them down, making their documents answerable, and deploying systems that run reliably in production. Scoped, built and delivered end to end.',
  ctaConsult: 'Book a free consultation',
  ctaAltPrefix: 'Prefer writing? Reach me at',
  ctaAltOr: 'or call',
  ctaRepeatTitle: 'Have a process that should run itself?',

  sectionServices: 'Services',
  sectionDemo: 'In action',
  sectionWhyMe: 'Why me',
  sectionProcess: 'Process',
  sectionMethod: 'Method',

  demoTitle: 'See it in action',
  demoLead:
    'Live, interactive demos of the systems I build: an agent pipeline, a working assistant run, and the stack it plugs into.',

  signalKicker: 'Shipped, in production, at scale',
  signals: [
    { value: 'Millions', label: 'of public contracts categorized and made searchable in parallel' },
    { value: '200k+', label: 'students served by an AI assistant across 10 European universities' },
    { value: 'End to end', label: 'one person scopes it, builds it, ships it, and hands it over' },
  ],

  whatIDo: 'What I do',
  youGet: 'You get',
  services: [
    {
      question: 'Still copy-pasting between tools every morning?',
      outcome:
        'I automate the routine end to end, so it runs unattended and only pings a human when something actually needs one.',
      deliverables: ['process teardown', 'built and deployed pipeline', 'alerting', 'handover doc'],
    },
    {
      question: 'Ten years of documents and nobody can find anything?',
      outcome:
        'Ask in plain language and get the answer with the exact source cited, across everything you have ever filed.',
      deliverables: ['search over all your docs', 'cited answers', 'accuracy eval set'],
    },
    {
      question: 'Drowning in work an agent could finish overnight?',
      outcome:
        'Hand off the whole process, not a chat window: the agent reads, researches, verifies and acts, and shows its work.',
      deliverables: ['scoped agent workflow', 'guardrails and logs', 'human-in-the-loop review'],
    },
    {
      question: 'Not allowed to send your data to a cloud?',
      outcome:
        'The same leverage on your own hardware: private models, access controls, and nothing sensitive leaving the building.',
      deliverables: ['on-prem deployment', 'audit logs', 'zero data egress'],
    },
  ],

  whyMe: 'Why work with me',
  proof: [
    'Real production systems with paying customers (InzerPro, NasadClaw, KouzelnikNaAkci), not demos that die after the pitch.',
    'RAG in the wild: vector search, BM25, MMR retrieval and LLM reranking, plus fact-verification so answers stay grounded in the source.',
    'The unglamorous parts are handled: scheduled jobs that fire on time, Stripe billing with trials and failed-payment recovery, auth, rate limits, on-prem hardening.',
    'One person, end to end. No agency layers, no handoffs, no account manager between you and the person writing the code.',
  ],

  howItWorks: 'How it works',
  steps: [
    { title: 'Discovery call', body: 'A short call to find the specific bottleneck, who it hurts, and what a good outcome is actually worth in hours or money.' },
    { title: 'Scope and fixed price', body: 'A written scope with one clear deliverable, a timeline and a fixed price. You know exactly what you get and what it costs before we start.' },
    { title: 'Build in the open', body: 'I build in short cycles and show working software early, so we correct course while it is still cheap to change.' },
    { title: 'Deploy and hand over', body: 'It goes live in your environment, documented, with a handover so your team can run it without me on retainer.' },
  ],

  howEyebrow: 'Under the hood',
  howTitle: 'How I actually build',
  howLead:
    'AI does not ship production software on its own. These are live visualizations of a real, large-scale AI-assisted engineering effort, shown as an example of how I run the work: many agents in parallel, an adversarial reviewer hunting every bug, and nothing merged until it is green everywhere.',

  adversarialTitle: 'Adversarial review',
  adversarialSubtitle: 'One agent writes the code, a second agent is told to break it. This is how I keep AI-generated code honest before it ever reaches you.',
  errorsTitle: 'Errors, cleared in parallel',
  errorsSubtitle: 'Thousands of compiler errors split across many agents and worktrees, then cleared in batches. This is how I parallelize a migration that would take one person months.',
  greenTitle: 'Shipped only when it is green',
  greenSubtitle: 'Every change raced to green across every platform before it ships. Nothing goes live on a red build.',
  deliveryTitle: 'Delivery, hour by hour',
  deliverySubtitle: 'Commit activity by hour across the sprint: what steady, high-throughput delivery actually looks like.',
  historyTitle: 'The full history, replayed',
  historySubtitle: 'The whole effort replayed commit by commit: the scale of change behind a single shipped result.',
};

export default services;
