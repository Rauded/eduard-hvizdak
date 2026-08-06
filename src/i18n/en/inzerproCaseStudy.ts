// Case study: InzerPro, Eduard's own marketplace auto-posting SaaS, live at
// inzerpro.cz with paying customers. Text-only namespace: icons, layout and
// mock-dashboard data live in the component; every visible string lives here
// so cs/sk can override it later. All numbers are real and defensible (4
// marketplaces, ~165 categories, pricing); do not inflate them, and do NOT
// add customer or listing counts until pulled from the production database.
// TRADE SECRET RULE (Eduard, 2026-08-05): never describe HOW the marketplace
// integrations work (APIs, proxies, form replay, logins, anti-dedup tricks).
// The page sells outcomes a buyer cares about, not a build recipe someone
// could reproduce. No em or en dashes.
const inzerproCaseStudy = {
  back: 'Back to projects',
  seo: {
    title: 'InzerPro: marketplace auto-posting, case study',
    description:
      'A SaaS that posts, re-posts and deletes listings across 4 Czech and Slovak marketplaces with no public APIs. Built and run by one person, monitored hourly, tested nightly against the live sites.',
  },
  hero: {
    eyebrow: 'Case study · InzerPro, own product',
    title: 'Sellers re-posted dozens of ads by hand. Every morning.',
    lead:
      'On Czech and Slovak second-hand marketplaces, listing age decides visibility. InzerPro writes the listing once and posts, re-posts and deletes it across every marketplace on schedule, unattended.',
    live: 'See it live at inzerpro.cz',
    liveUrl: 'https://www.inzerpro.cz',
    figureCaption: 'The production dashboard: one listing, posted and re-posted across marketplaces on schedule.',
    book: 'Book an intro call',
    email: 'Email me',
    meta: [
      { k: 'For', v: 'Marketplace power sellers' },
      { k: 'Role', v: 'Solo founder, design to production' },
      { k: 'Status', v: 'Live at inzerpro.cz, paying customers' },
    ],
  },
  metrics: [
    { value: '4', label: 'marketplaces fully automated' },
    { value: '~165', label: 'categories, one picker for all' },
    { value: '24/7', label: 'unattended scheduled posting' },
    { value: '1', label: 'person, design to on-call' },
  ],
  problem: {
    title: 'New listings sit on top. Old ones sink.',
    body:
      'Resellers, small e-shops and car dealers were <strong>deleting and re-posting dozens of ads by hand every day</strong>, and competitors still buried them overnight. The marketplaces sell paid promotion but give small sellers <strong>no automation at all</strong>: none of them has a public API.',
    corpusLabel: 'Marketplaces InzerPro posts to',
    // Icons for these live in public/brand/marketplaces/ and are mapped by id
    // in the component. Same set and branding the InzerPro app itself uses.
    // Deliberately NO integration details here: how each marketplace is
    // connected is a trade secret; the page sells the outcome, not the method.
    marketplaces: [
      { id: 'bazos-cz', name: 'Bazoš.cz', detail: 'the biggest Czech marketplace, fully automated', badge: 'live' },
      { id: 'bazos-sk', name: 'Bazoš.sk', detail: 'the Slovak counterpart, fully automated', badge: 'live' },
      { id: 'bazar-cz', name: 'Bazar.cz', detail: 'post, re-post and delete on schedule', badge: 'live' },
      { id: 'bazar-sk', name: 'Bazar.sk', detail: 'post, re-post and delete on schedule', badge: 'live' },
      { id: 'aukro', name: 'Aukro', detail: 'official partner, launching in beta', badge: 'beta' },
    ],
    before: 'Before: delete and re-post every ad by hand, marketplace by marketplace',
  },
  // Sections 02+ are visual-first (2026-08-05 redesign): each section is a
  // heading, at most one sentence, and a bespoke component. Keep it that way.
  fanout: {
    title: 'Write it once.',
    lead: 'Pick the marketplaces. InzerPro posts, re-posts and deletes everywhere, on schedule.',
    card: {
      photoAlt: 'Demo listing photo: an iPhone 13',
      listingTitle: 'iPhone 13, 128 GB',
      price: '9 990 Kč',
      pill: 're-posts daily · 06:00',
    },
    statusPosted: 'posted',
    statusBeta: 'beta',
  },
  day: {
    title: 'The morning runs itself.',
    railStart: '00:00',
    railEnd: '24:00',
    events: {
      test: 'nightly test posts real listings',
      reposts: 're-posts fire',
      canary: 'health check, every hour',
      wake: '07:30 · seller wakes up, already on top',
    },
  },
  ops: {
    title: 'If something breaks, I know first.',
    lead: 'Hourly checks, nightly test listings on the live marketplaces, one email per state change.',
    note: 'Illustrative mockup with invented example data; the real dashboard lives behind the app login.',
    jobsTitle: 'Scheduled jobs',
    jobsCaption: 'Every post, re-post and delete is a job with per-marketplace status and retries.',
    strip: {
      ok: 'running',
      down: 'down · 1 email',
      back: 'recovered · 1 email',
      caption: 'Alerts only on change: a six-hour outage is two emails, not six.',
    },
  },
  pricing: {
    title: 'One plan.',
    free: {
      value: '0 Kč',
      label: 'every feature',
      detail: 'up to 10 active listings',
    },
    paid: {
      value: '19 EUR',
      alt: '479 Kč / month',
      label: 'unlimited listings',
      detail: 'one plan, nothing to compare',
    },
  },
  cta: {
    eyebrow: 'Accepting new projects',
    title: 'Have a process a computer should own?',
    body:
      'InzerPro automates a manual daily workflow end to end, with paying customers. If your team burns hours on work like this, I build the system that takes it over.',
    book: 'Book an intro call',
    email: 'Email me',
    outcome: 'A workflow that runs itself, with the monitoring to prove it.',
  },
};

export default inzerproCaseStudy;
