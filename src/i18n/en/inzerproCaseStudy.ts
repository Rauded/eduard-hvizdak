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
  product: {
    title: 'Write the listing once. The system does the rest.',
    body: [
      'A seller writes a listing once, picks marketplaces, and InzerPro <strong>posts, re-posts on schedule and deletes</strong> across all of them. One category picker (about <strong>165 categories</strong>) maps to the right category on every marketplace automatically; photos are <strong>prepared per platform</strong> to fit each site\'s rules.',
      'Every feature is <strong>free up to 10 active listings</strong>, then one plan, <strong>19 EUR / 479 Kč per month</strong>, for unlimited listings.',
    ],
  },
  architecture: {
    title: 'What happens to one listing',
    body: [
      'A seller\'s listings run as <strong>scheduled jobs, around the clock</strong>. Every marketplace has its own category tree, photo limits and section rules; InzerPro absorbs all of that, so the seller writes one listing and <strong>never deals with any marketplace\'s quirks again</strong>. When a marketplace changes something on its side, monitoring catches it <strong>within the hour</strong>, usually before any customer notices.',
    ],
    stepsLabel: 'The path of one listing',
    steps: [
      { k: 'Listing', v: 'written once in the dashboard' },
      { k: 'Schedule', v: 'post, re-post, delete, per seller' },
      { k: 'Categories', v: 'picked once, mapped to every site' },
      { k: 'Photos', v: 'prepared per platform\'s rules' },
      { k: 'Post', v: 'delivered to every selected marketplace' },
      { k: 'Verify', v: 'checked, retried until live' },
      { k: 'Report', v: 'status visible in the dashboard' },
    ],
    freshnessLabel: 'Watchdog loop',
    freshness:
      'An <strong>hourly health check</strong> exercises the whole posting path and emails <strong>only on state transitions</strong>: one mail when something breaks, one when it recovers. A <strong>nightly test suite</strong> posts real listings against the live marketplaces, so a marketplace-side change is caught the same night.',
    stackLabel: 'Built on',
    stack: ['React', 'Supabase', 'Postgres', 'Stripe', 'PostHog', 'Sentry'],
  },
  wins: {
    title: 'Decisions that kept it running',
    intro: 'Simple beats clever wherever a customer can feel the difference.',
    items: [
      {
        tag: 'The morning grind',
        before: 'by hand',
        after: 'on schedule',
        scale: 'how listings get re-posted',
        title: 'The daily re-posting ritual, deleted.',
        body:
          'Sellers were deleting and re-posting <strong>dozens of ads every morning</strong> and competitors still buried them overnight. Now the listing is written <strong>once</strong> and the schedule owns it, including taking sold items down everywhere.',
      },
      {
        tag: 'Alerting',
        before: 'every failure',
        after: 'transitions',
        scale: 'when the canary sends email',
        title: 'One mail when it breaks. One when it recovers.',
        body:
          'A check that fails for six hours sends <strong>one email, not six</strong>. Alert fatigue is a real risk when <strong>one person is the whole on-call rotation</strong>.',
      },
      {
        tag: 'Pricing',
        before: '3 tiers',
        after: '1 plan',
        scale: 'billing model',
        title: 'Charge for volume, not features.',
        body:
          'The credit-based tier model <strong>confused users</strong>. Now everything is free to 10 active listings, then <strong>19 EUR / 479 Kč</strong> for unlimited: simple to explain, and <strong>enforced in Postgres</strong>, not just the UI.',
      },
    ],
  },
  ops: {
    title: 'It runs while nobody watches.',
    intro:
      'The system is built to run <strong>unattended</strong> and to tell one person that something broke <strong>before a customer does</strong>: scheduled jobs, an hourly canary, Sentry on every function, and a nightly end-to-end suite against the real marketplaces.',
    note: 'The screens shown here are illustrative mockups with invented example data; the real dashboards live behind the app login.',
    items: [
      {
        title: 'Scheduled jobs',
        caption: 'Every post, relist and delete is a job with per-marketplace status and retries; the queue is the product.',
      },
      {
        title: 'Posting canary',
        caption: 'An hourly end-to-end health check of the whole posting path, alerting on state transitions only.',
      },
    ],
    closer: 'Post, relist and delete are verified green across all enabled marketplaces after every change.',
  },
  cta: {
    eyebrow: 'Accepting new projects',
    title: 'Have a process a computer should own?',
    body:
      'InzerPro is my own product: a manual daily workflow automated end to end, running in production with paying customers. If your team burns hours on work like this, I build the system that takes it over and the monitoring that proves it keeps working.',
    book: 'Book an intro call',
    email: 'Email me',
    outcome: 'A workflow that runs itself, with the monitoring to prove it.',
  },
};

export default inzerproCaseStudy;
