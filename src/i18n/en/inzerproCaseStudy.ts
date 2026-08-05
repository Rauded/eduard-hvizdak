// Case study: InzerPro, Eduard's own marketplace auto-posting SaaS, live at
// inzerpro.cz with paying customers. Text-only namespace: icons, layout and
// mock-dashboard data live in the component; every visible string lives here
// so cs/sk can override it later. All numbers are real and defensible (4
// marketplaces, ~165 canonical categories, 41 RLS tables, 34 edge functions,
// pricing); do not inflate them, and do NOT add customer or listing counts
// until they are pulled from the production database. No em or en dashes.
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
    corpusLabel: 'The integration surface, one project per marketplace',
    // Icons for these live in public/brand/marketplaces/ and are mapped by id
    // in the component. Same set and branding the InzerPro app itself uses.
    marketplaces: [
      { id: 'bazos-cz', name: 'Bazoš.cz', detail: 'undocumented mobile API, datacenter IPs blocked', badge: 'live' },
      { id: 'bazos-sk', name: 'Bazoš.sk', detail: 'same API, own categories and section rules', badge: 'live' },
      { id: 'bazar-cz', name: 'Bazar.cz', detail: 'ASP.NET VIEWSTATE form replay', badge: 'live' },
      { id: 'bazar-sk', name: 'Bazar.sk', detail: 'Azet OAuth login session', badge: 'live' },
      { id: 'aukro', name: 'Aukro', detail: 'official partner API, posting in sandbox', badge: 'beta' },
    ],
    before: 'Before: delete and re-post every ad by hand, marketplace by marketplace',
  },
  product: {
    title: 'Write the listing once. The system does the rest.',
    body: [
      'A seller writes a listing once, picks marketplaces, and InzerPro <strong>posts, re-posts on schedule and deletes</strong> across all of them. One canonical category picker (about <strong>165 categories</strong>) resolves to the right category on every marketplace through a database crosswalk; photos are <strong>re-encoded per platform</strong> to fit each site\'s rules.',
      'Every feature is <strong>free up to 10 active listings</strong>, then one plan, <strong>19 EUR / 479 Kč per month</strong>, for unlimited listings. The limit is enforced in the app and by a <strong>Postgres trigger</strong>, so it holds even if the client misbehaves.',
    ],
  },
  architecture: {
    title: 'The pipeline behind one scheduled re-post',
    body: [
      'A React dashboard on <strong>Supabase</strong> (auth, Postgres with <strong>row-level security on all 41 tables</strong>, <strong>34 edge functions</strong>) runs post, relist and delete as <strong>scheduled jobs per user</strong>. All marketplace traffic goes through a small <strong>Node relay with a residential proxy</strong>, because Bazos blocks datacenter IPs outright, including the ones edge functions run from. Each marketplace is its own <strong>reverse-engineered integration</strong>: replaying the real HTTP flows proved far more reliable than driving a browser.',
    ],
    stepsLabel: 'The path of one listing',
    steps: [
      { k: 'Listing', v: 'written once in the dashboard' },
      { k: 'Schedule', v: 'post, relist, delete jobs per user' },
      { k: 'Categories', v: 'DB crosswalk, ~165 canonical' },
      { k: 'Photos', v: 're-encoded per platform' },
      { k: 'Relay', v: 'residential proxy, Node' },
      { k: 'Marketplace', v: 'reverse-engineered API per site' },
      { k: 'Live', v: 'on every selected marketplace' },
    ],
    freshnessLabel: 'Watchdog loop',
    freshness:
      'An <strong>hourly canary</strong> probes the relay, the proxy exit country, credentials and image acceptance, and emails <strong>only on state transitions</strong>: one mail when something breaks, one when it recovers. A <strong>nightly Playwright suite</strong> posts real listings with real credentials against the live marketplaces.',
    stackLabel: 'Stack',
    stack: ['React', 'Supabase', 'Postgres + RLS', 'Deno edge functions', 'Node relay', 'Railway', 'Stripe', 'PostHog', 'Sentry', 'Playwright'],
  },
  wins: {
    title: 'Decisions that kept it running',
    intro: 'Each of these replaced a version that was already built and worked worse.',
    items: [
      {
        tag: 'Marketplace access',
        before: 'Puppeteer',
        after: 'HTTP replay',
        scale: 'how listings reach Bazar.cz',
        title: 'Replay the form, not the browser.',
        body:
          'Browser automation was the first approach and it <strong>flaked</strong>; replaying the ASP.NET form flow directly proved far more reliable. The cost: every marketplace is <strong>its own integration project</strong> with its own failure modes.',
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
        caption: 'Hourly probe of relay health, proxy exit country, credentials and image acceptance, alerting on transitions only.',
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
