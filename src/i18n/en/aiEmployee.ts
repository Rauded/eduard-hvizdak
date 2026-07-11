// Unlisted AI-employee proposal page. Text-only: icons, on/off flags, and the
// featured/number metadata stay in the component; every visible string lives
// here. Lists are arrays so a locale override replaces them wholesale.
const aiEmployee = {
  seo: {
    title: 'An AI Employee for Your Whole Company',
    description:
      'A single AI agent connected to your entire company that your team can chat with, that investigates across every tool, produces finished work, and runs securely with per-user access and a full audit trail.',
  },
  hero: {
    eyebrow: 'Private proposal · AI Employee',
    title: 'One AI agent that knows your whole company.',
    lead:
      'Not another chatbot bolted onto one app. A single agent your whole team talks to in Slack and on the web, connected to the tools you already use, that investigates across all of them, produces the finished work, and does it under a security model your IT can sign off on.',
    book: 'Book a discovery call',
    altPrefix: 'Prefer writing? Reach me at',
    altOr: 'or call',
  },
  what: {
    title: 'What it actually does',
  },
  capabilities: [
    {
      title: 'Ask it anything about the business',
      body: 'One chat box in Slack and on the web. It knows where the answer lives, pulls it from the right system, and replies with the source attached.',
    },
    {
      title: 'Investigate across every tool at once',
      body: 'A question that used to mean checking five apps and messaging three people gets answered in a minute, with the trail of where it looked.',
    },
    {
      title: 'Produce the finished artifact',
      body: 'The updated deck, the drafted contract reply, the filled RFP, the ticket summary. Real output back in your tools, not a chat message telling you what to change.',
    },
    {
      title: 'Act before it is asked',
      body: 'A ticket lands, a review comes in, a deadline nears. It takes the first pass and brings a person in only when judgment is actually needed.',
    },
  ],
  connectors: {
    kicker: 'Connects to the tools you already run',
    note: 'If it has an API or a login, it can almost certainly be connected. These are the common ones; we scope your exact stack in discovery.',
    labels: [
      'Slack',
      'Email',
      'GitHub',
      'CRM',
      'Spreadsheets',
      'Drive / Docs',
      'Your database',
      'Helpdesk',
      'Calendar',
      'Internal wiki',
    ],
  },
  security: {
    eyebrow: 'The part that lets you say yes',
    title: 'Built so it can be trusted with everything',
    lead:
      'Giving one agent reach across the company is only safe with the right guardrails. These are non-negotiable and they are in from day one, not bolted on later.',
    cards: [
      {
        title: 'It inherits each person’s access',
        body: 'The agent can only see what that specific employee is already allowed to see. Nobody gets a backdoor to data they could not open themselves.',
      },
      {
        title: 'Every action is logged',
        body: 'A full audit trail of what was read, what was done, and on whose behalf. You can always answer "who touched this, and when".',
      },
      {
        title: 'Policy enforced at every step',
        body: 'Sensitive systems and customer data are fenced off with rules checked on every single tool call, not trusted to the model to remember.',
      },
      {
        title: 'Runs where your data lives',
        body: 'Cloud, your own tenant, or fully on your servers for regulated work. Nothing sensitive has to leave your building. EU-based and GDPR-minded by default.',
      },
    ],
  },
  process: {
    title: 'How the engagement runs',
    steps: [
      {
        title: 'Discovery workshop',
        dur: 'Week 0, half a day',
        body: 'We map the jobs your team actually does, the tools those jobs touch, and where the hours leak. We pick one flagship workflow to prove value on first, and agree what a good outcome is worth.',
      },
      {
        title: 'Scope, security review, fixed price',
        dur: 'Week 0-1',
        body: 'You get a written scope: which systems connect, who gets access, the security model, one measurable success metric, a timeline, and a fixed price. Your IT signs off on access before anything is wired.',
      },
      {
        title: 'Pilot build',
        dur: 'Week 1-3',
        body: 'I connect the first tools, stand up the agent in Slack and on the web behind the access gateway, and ship the flagship workflow. You are using it and giving feedback while it is still cheap to change.',
      },
      {
        title: 'Company rollout',
        dur: 'Week 3-10',
        body: 'We widen it: more connectors, more workflows, proactive automations, artifact write-back into your systems of record. Access, audit logging, and cost controls are hardened as the surface grows.',
      },
      {
        title: 'Handover and care',
        dur: 'Ongoing',
        body: 'Documented, with training for your team so it runs without me. Then an optional care plan keeps the connectors healthy, tunes cost, and adds new workflows as you find them.',
      },
    ],
  },
  pricing: {
    title: 'Investment',
    lead:
      'Fixed prices, scoped in writing before we start. Figures are a starting point; the discovery call sets the exact number. Model usage is always billed at cost, with the meter visible to you.',
    tiers: [
      {
        name: 'Proof of Value',
        tag: 'Start here',
        price: 'from €4,900',
        priceNote: 'fixed, one-off',
        dur: '~3 weeks',
        blurb: 'Prove it saves real hours on one workflow before any bigger commitment.',
        features: [
          'One team, one flagship workflow',
          'Up to 3 tool connections',
          'Chat in Slack + on the web',
          'Per-user access + audit logging',
          'Measured against one success metric',
          'Company-wide rollout',
          'Proactive automations',
          'Ongoing care',
        ],
        cta: 'Book the discovery call',
      },
      {
        name: 'Company Rollout',
        tag: 'Most teams',
        price: 'from €18,000',
        priceNote: 'fixed, project',
        dur: '6-10 weeks',
        blurb: 'One agent across the whole company, wired into your stack and handed over to your team.',
        features: [
          'Single agent for the whole company',
          'Up to ~8 tool connections',
          'Secure access gateway + full audit trail',
          'Proactive automations',
          'Writes finished artifacts back to your tools',
          'On-prem / your-tenant deployment option',
          'Team training + full handover docs',
          'Everything in Proof of Value',
        ],
        cta: 'Book the discovery call',
      },
      {
        name: 'Care & Scale',
        tag: 'After launch',
        price: 'from €1,900',
        priceNote: 'per month',
        dur: 'rolling, cancel anytime',
        blurb: 'Keep it healthy and growing: new workflows, cost tuning, monitoring, a monthly outcome report.',
        features: [
          'Connectors kept working as your tools change',
          'New workflows added each month',
          'Model routing + cost optimization',
          'Monitoring, uptime, and error triage',
          'Monthly outcome report',
          'Priority access to me',
          'Model / API usage billed at cost',
          'No lock-in, cancel anytime',
        ],
        cta: 'Add after your build',
      },
    ],
  },
  provide: {
    title: 'What you provide',
    items: [
      'A decision-maker who can approve which systems the agent connects to.',
      'Admin or API access to the tools in scope (Slack, email, CRM, docs, database, and so on), granted through your normal IT process.',
      'One person per team to name the workflows that eat the most time.',
      'A short list of what counts as sensitive data, so we fence it correctly.',
      'Sign-off on the security model before anything goes live.',
    ],
  },
  faq: {
    title: 'Questions you are probably asking',
    items: [
      {
        q: 'Is our data safe if one agent can see everything?',
        a: 'It never sees more than the person using it already can. Access is inherited per employee, every action is logged, policy is enforced on each tool call, and for regulated work the whole thing runs on your own infrastructure so nothing sensitive leaves your building.',
      },
      {
        q: 'Do we have to replace our current tools?',
        a: 'No. The agent sits across your existing tools. GitHub keeps the code, your CRM keeps the accounts, your drive keeps the docs. The agent is the layer that reads from and writes to them.',
      },
      {
        q: 'What does it cost to run after it is built?',
        a: 'Two things: an optional care plan, and model usage billed at cost. Usage scales with how much the team leans on it. I set up routing so each task uses the cheapest model that can do it well, and I show you the numbers.',
      },
      {
        q: 'What if the pilot does not prove out?',
        a: 'That is the point of starting small and fixed-price. You get a working system and a clear read on the hours saved before deciding whether to roll it out company-wide. No open-ended spend.',
      },
    ],
  },
};

export default aiEmployee;
