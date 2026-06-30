// ═══════════════════════════════════════════════════════════════
//  Shared project data — single source of truth for the homepage
//  Projects section AND the /portfolio page.
// ═══════════════════════════════════════════════════════════════

// ─── Safe asset loader ───────────────────────────────────────────
// require() throws at build time if the file is missing, which would
// break the whole bundle. assetSafe() swallows that so we can declare
// a video "slot" (e.g. inzerpro.mp4) before the file exists — the card
// falls back to a poster/placeholder until the real file is dropped in.
export function asset(path: string): string {
  return require(`../../assets/projects/${path}`);
}

export function assetSafe(path: string): string | null {
  try {
    return require(`../../assets/projects/${path}`);
  } catch {
    return null;
  }
}

// ─── Types ───────────────────────────────────────────────────────
export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo';
  // Optional brand favicon (path under public/) shown on the link instead of
  // the generic arrow — e.g. the destination site's own icon.
  favicon?: string;
}

export interface ProjectMedia {
  type: 'video' | 'slideshow' | 'image' | 'concept' | 'placeholder';
  video?: string | null;
  poster?: string;
  images?: string[];
}

// A keyword-rich case study that is ALWAYS rendered into the DOM (collapsed
// visually, but present in the HTML) so search engines, LLM crawlers, and GEO
// indexers get the full problem→solution narrative + tech keywords for every
// project, whether or not a visitor clicks to expand it.
export interface CaseStudy {
  problem: string;     // what problem it solves / the pain
  motivation: string;  // the "why" behind building it
  challenges: string;  // what went wrong / hard parts we hit
  solution: string;    // how it actually got solved (tech, keywords)
  story?: string;      // where it happened / the human story
}

export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  media: ProjectMedia;
  accent: string;
  reversed: boolean;
  caseStudy?: CaseStudy;
  hidden?: boolean; // kept in data but not rendered (toggle to re-enable)
}

// ─── Projects ────────────────────────────────────────────────────
export const PROJECTS: PortfolioProject[] = [
  {
    id: 'inzerpro',
    number: '01',
    title: 'InzerPro',
    subtitle: 'A SaaS I run on the side',
    description:
      'Auto-renewal, bulk posting, and analytics for power sellers on the Bazoš.cz / Bazoš.sk classifieds. It keeps dozens of listings at the top automatically — the relisting grind power sellers used to do by hand. Born from a hackathon, now a side business with paying customers.',
    tags: ['React', 'Supabase', 'Stripe', 'Deno', 'PostHog', 'SaaS', 'Hackathon'],
    links: [
      { label: 'Website', url: 'https://www.inzerpro.cz', type: 'demo', favicon: '/brand/sites/inzerpro.svg' },
    ],
    media: {
      type: 'video',
      video: assetSafe('inzerpro.mp4'),
    },
    accent: '#3b82f6',
    reversed: false,
    caseStudy: {
      problem:
        'Power sellers on the <strong>Bazoš.cz</strong> and <strong>Bazoš.sk</strong> classifieds live and die by listing position. On Bazoš the only way to climb back to the top of a category is to delete an ad and re-post it — so high-volume sellers were manually <strong>re-listing dozens of classified ads every single day</strong>, an endless copy-paste-delete-repost grind that ate hours and still let competitors bury them overnight.',
      motivation:
        'InzerPro started as a <strong>hackathon</strong> project. I watched second-hand resellers, e-shops and car dealers burn their mornings on this repetitive relisting busywork and realised the whole thing was a scheduling problem a computer should own. The goal: give small sellers the same <strong>automation, bulk posting and analytics</strong> the big marketplaces keep for themselves.',
      challenges:
        'Bazoš has <strong>no public API</strong>, so everything had to be driven through the live site — which meant wrestling with session and cookie handling, image uploads, category rules, CAPTCHAs, anti-bot rate limiting and listing caps without ever getting accounts flagged. On top of that sat the hard parts of any real SaaS: reliable scheduled jobs that fire on time for every user, multi-account management, and <strong>Stripe subscription billing</strong> with trials, upgrades and failed-payment recovery.',
      solution:
        'I built an automation engine on <strong>Deno</strong> that handles auto-renewal, scheduled re-posting and bulk listing across multiple seller accounts, backed by <strong>Supabase</strong> for auth, Postgres data and storage, <strong>Stripe</strong> for subscriptions, and a fast <strong>React</strong> dashboard for managing listings and reading performance analytics. <strong>PostHog</strong> tracks product usage so I can see exactly which features drive retention. The result keeps a seller’s ads parked at the top automatically — the relisting grind, fully on autopilot.',
      story:
        'What began as a weekend hackathon build is now a real <strong>side business with paying customers</strong> at <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. I later pitched it again at the <a href="/blog/zero-to-done">Zero to Done startup-build hackathon</a> in Brno, where the whole point was getting real customers — not just shipping a demo.',
    },
  },
  {
    id: 'studyexe',
    number: '02',
    title: 'StudyExe',
    subtitle: 'Deep work for ADHD brains',
    description:
      'Real-time eye tracking alerts you after 5 seconds of looking away. Full screen lock eliminates every distraction. AI-scored recall sessions measure what you actually retained — not just how long you stared at a screen.',
    tags: ['Python', 'OpenAI API', 'Eye Tracking', 'Tkinter', 'Desktop App', 'AI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
      { label: 'Website', url: 'https://www.studyexe.com', type: 'demo', favicon: '/brand/sites/studyexe.svg' },
    ],
    media: {
      type: 'slideshow',
      video: assetSafe('studyexe.mp4'), // upgrades to video if dropped in
      images: [
        asset('obsidian_theme_dashboard.png'),
        asset('obsidian_theme_study_session_reading.png'),
        asset('obsidian_theme_score.png'),
        asset('red_cyberpunk_theme_dashboard.png'),
        asset('cyberforest_theme.png'),
        asset('obsidian_theme_study_session_configuration.png'),
      ],
    },
    accent: '#6366f1',
    reversed: true,
    caseStudy: {
      problem:
        'Most study apps measure the wrong thing: <strong>time on screen</strong>, not learning. For an <strong>ADHD</strong> brain, an open textbook and a wandering gaze can look identical to "studying" while nothing actually goes in. The real problems are silent attention drift and the total absence of any honest signal for <strong>how much you actually retained</strong>.',
      motivation:
        'I built StudyExe out of my own fight with focus and <strong>deep work</strong>. I wanted a tool that didn’t just block distractions but actively kept my eyes on the page and then <strong>proved</strong> whether the session worked — measuring recall, not minutes.',
      challenges:
        'Real-time <strong>eye tracking</strong> from a plain webcam is unforgiving: gaze detection had to be fast and low-latency, robust to head movement, lighting and glasses, and tuned to avoid false "you looked away" alarms while still catching genuine drift within seconds. Locking the screen into a true distraction-free <strong>full-screen</strong> mode on desktop, and getting an LLM to fairly <strong>score active recall</strong> against the source material, were each their own rabbit holes — all inside a <strong>Python</strong> / <strong>Tkinter</strong> desktop app.',
      solution:
        'StudyExe uses computer-vision <strong>gaze tracking</strong> to alert you after just 5 seconds of looking away, a full-screen lock that removes every distraction, and <strong>AI-scored recall sessions</strong> powered by the <strong>OpenAI API</strong> that test what you actually remember. Instead of rewarding time served, it rewards retention — turning studying into a measurable feedback loop.',
      story:
        'It shipped as a polished desktop app with several themes (Obsidian, cyberpunk, cyberforest) at <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a> — a focus tool built by someone who genuinely needed it.',
    },
  },
  {
    id: 'kouzelnici',
    number: '03',
    title: 'KouzelníkNaAkci.cz',
    subtitle: 'A directory for Czech & Slovak magicians',
    description:
      'A two-sided marketplace connecting event organisers with professional magicians. Curated performer profiles, Stripe-powered listings, automated email, and 20+ city & occasion landing pages tuned for local search.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    links: [
      { label: 'Website', url: 'https://www.kouzelniknaakci.cz', type: 'demo', favicon: '/brand/sites/kouzelniknaakci.svg' },
    ],
    media: {
      type: 'placeholder',
      video: assetSafe('kouzelnici.mp4'),
    },
    accent: '#ec4899',
    reversed: false,
    caseStudy: {
      problem:
        'If you need to <strong>book a professional magician</strong> for a wedding, birthday, corporate event or kids’ party in the Czech Republic or Slovakia, there was no good place to look. Performers were scattered across outdated personal sites and Facebook pages, and event organisers had no central, trustworthy way to compare and hire them — a classic fragmented local market.',
      motivation:
        'I saw a textbook <strong>two-sided marketplace</strong> gap with a strong <strong>local-SEO</strong> angle: high-intent searches like "magician for a party in Brno" with almost no one ranking properly for them. Owning that search traffic could connect organisers and magicians far better than the status quo.',
      challenges:
        'Marketplaces have the classic <strong>cold-start chicken-and-egg problem</strong> — no organisers without performers, no performers without organisers. On top of that I needed real <strong>programmatic SEO</strong>: generating and maintaining 20+ city × occasion landing pages that rank locally without turning into thin duplicate content, plus <strong>Stripe</strong> paid listings and reliable automated transactional email for enquiries.',
      solution:
        'I built it on <strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> with <strong>Tailwind CSS</strong>, deployed on <strong>Vercel</strong> for fast server-rendered, SEO-friendly pages. It has curated performer profiles, <strong>Stripe-powered</strong> listings, automated email notifications, and 20+ programmatic <strong>city & occasion landing pages</strong> tuned for local search — so the right magician shows up exactly when someone searches for one.',
      story:
        'It runs today at <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a> — a small but genuinely useful niche marketplace serving the Czech and Slovak events scene.',
    },
  },
  {
    id: 'newsmatics',
    number: '04',
    title: 'Newsmatics Globe',
    subtitle: 'News as geography',
    description:
      'A geolocation pipeline that extracts locations from news articles via NLP, matches them against the GeoNames database, and visualises them on an interactive 3D globe. Timeline playback lets you watch events unfold across the world in real time.',
    tags: ['Python', 'JavaScript', 'Globe.gl', 'LangChain', 'NLP', 'Data Viz', 'Hackathon'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
      { label: 'Hackathon Story', url: '/blog/newsmatics-hackathon', type: 'demo' },
    ],
    media: {
      type: 'video',
      video: asset('newsmatics-hackathon.mp4'),
      poster: asset('newsmatics-hackathon-group.jpg'),
    },
    accent: '#10b981',
    reversed: true,
    caseStudy: {
      problem:
        'The news tells you <strong>what</strong> happened but makes it hard to feel <strong>where</strong> and <strong>when</strong> it happened. Thousands of articles a day reference places, but that geography is locked inside plain text — there was no easy way to watch global events light up across a map over time.',
      motivation:
        'At the <strong>Newsmatics Hackathon</strong> in Brno, my team <strong>MOGGERS</strong> wanted to turn the firehose of news into something spatial and alive — "news as geography" — and prove we could build the whole <strong>NLP-to-visualisation</strong> pipeline in a single weekend.',
      challenges:
        'Pulling locations out of messy article text meant real <strong>named-entity recognition</strong> and the nasty problem of <strong>geographic disambiguation</strong> — is "Paris" the French capital or a town in Texas? Matching those mentions against the <strong>GeoNames</strong> database accurately, keeping the extraction pipeline fast, rendering thousands of points smoothly on a 3D globe, and syncing it all to a <strong>timeline playback</strong> — all against a hard hackathon deadline — were the core battles.',
      solution:
        'We built a <strong>Python</strong> pipeline using <strong>LangChain</strong> and <strong>NLP</strong> to extract locations from articles, matched them to coordinates via the <strong>GeoNames</strong> gazetteer, and visualised everything on an interactive 3D globe with <strong>Globe.gl</strong> in <strong>JavaScript</strong>. A timeline scrubber lets you watch events unfold across the world in real time — turning raw news into an explorable <strong>data-visualisation</strong>.',
      story:
        'Newsmatics Globe is one of the projects I’m proudest of — read the full weekend write-up in <a href="/blog/newsmatics-hackathon">my Newsmatics Hackathon story</a>.',
    },
  },
  {
    id: 'nasadclaw',
    number: '05',
    title: 'NasadClaw',
    subtitle: 'AI infrastructure for Czech & Slovak enterprises',
    description:
      "Professional deployment of the OpenClaw AI assistant for business teams. Physical installation on dedicated hardware at the client's office, full InfoSec hardening, and ongoing maintenance — so teams get leverage from day one without a new software project to manage.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostHog', 'B2B', 'SaaS'],
    links: [
      { label: 'Website', url: 'https://www.nasadclaw.cz', type: 'demo', favicon: '/brand/sites/nasadclaw.png' },
    ],
    media: {
      type: 'image',
      video: assetSafe('nasadclaw.mp4'), // upgrades to video if dropped in
      images: [asset('nasadclaw-real-image.png')],
    },
    accent: '#a855f7',
    reversed: false,
    caseStudy: {
      problem:
        'Most <strong>small and mid-sized businesses</strong> in the Czech Republic and Slovakia know <strong>AI</strong> could give their teams real leverage, but they can’t realistically run a new software project to get it — and many are rightly nervous about <strong>data privacy</strong> and sending sensitive company data into someone else’s cloud.',
      motivation:
        'I wanted to remove every excuse a non-technical team has for not adopting AI: no setup, no maintenance burden, no data leaving the building. Deliver the leverage as a <strong>done-for-you, managed deployment</strong> rather than yet another app they have to learn and babysit.',
      challenges:
        'Going <strong>on-premise</strong> instead of pure cloud means real-world hardware: provisioning <strong>dedicated hardware</strong>, physically installing it at a client’s office, and doing serious <strong>InfoSec hardening</strong> and <strong>GDPR-friendly</strong> data handling so everything stays local. Then there’s the ongoing reliability, updates and maintenance — plus the <strong>B2B SaaS</strong> machinery of contracts, billing and onboarding for non-technical buyers.',
      solution:
        'NasadClaw is the professional deployment of the <strong>OpenClaw</strong> AI assistant for business teams: physical installation on dedicated hardware at the client’s office, full InfoSec hardening, and ongoing maintenance, so teams get value from day one. The product surface — marketing site, dashboard and billing — runs on <strong>Next.js</strong>, <strong>TypeScript</strong> and <strong>Tailwind CSS</strong>, with <strong>Stripe</strong> for payments and <strong>PostHog</strong> for analytics.',
      story:
        'It’s live as a <strong>B2B</strong> offering at <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a>, bringing private, on-site AI to Czech and Slovak enterprises.',
    },
  },
  {
    id: 'psychetab',
    number: '06',
    title: 'PsycheTab',
    subtitle: 'Your browser, your aesthetic',
    description:
      'A Chrome extension that replaces the new tab page with rotating collage wallpapers assembled from your own image library. Drag, resize, rotate, and layer each piece. Every byte lives locally in IndexedDB — no cloud, no tracking, ever.',
    tags: ['JavaScript', 'Manifest V3', 'LocalForage', 'IndexedDB', 'Chrome Extension'],
    links: [
      { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao', type: 'demo', favicon: '/brand/sites/psychetab.jpg' },
      { label: 'GitHub', url: 'https://github.com/Rauded/college_extension_chrome', type: 'github' },
    ],
    media: {
      type: 'video',
      video: asset('psychetab-demo.mp4'),
      poster: asset('psychetab-main.png'),
    },
    accent: '#f59e0b',
    reversed: true,
    caseStudy: {
      problem:
        'You open a new browser tab dozens of times a day and stare at the same generic, soulless default <strong>new tab page</strong>. There was no simple way to make that moment <em>yours</em> with your own images — and the personalisation extensions that do exist usually want to upload your photos to their cloud and track you.',
      motivation:
        'I wanted my browser to reflect my own <strong>aesthetic</strong>: rotating <strong>collage wallpapers</strong> built from my personal image library, fully editable, and crucially <strong>private by design</strong> — no accounts, no cloud, no tracking, every byte staying on my own machine.',
      challenges:
        'Chrome’s <strong>Manifest V3</strong> brings real constraints — service workers, strict content-security policy, and no easy persistent background. Storing a library of full-resolution images entirely on-device meant leaning on <strong>IndexedDB</strong> (via <strong>LocalForage</strong>) and keeping performance smooth while users <strong>drag, resize, rotate and layer</strong> many large images on a canvas. And it all had to pass <strong>Chrome Web Store</strong> review.',
      solution:
        'PsycheTab is a <strong>Manifest V3 Chrome extension</strong> written in <strong>JavaScript</strong> that replaces the new tab page with rotating, editable collages. Each piece can be dragged, resized, rotated and layered, and everything is persisted locally in <strong>IndexedDB</strong> through <strong>LocalForage</strong> — no cloud, no tracking, ever. Your browser, your aesthetic, your data.',
      story:
        'It’s published and installable on the <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, with the source on <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHub</a>.',
    },
  },
  {
    id: 'mindtype',
    number: '07',
    title: 'MindType',
    subtitle: 'Cognitive conditioning, one keystroke at a time',
    description:
      'Not a typing app — a psychological practice. Choose an identity pack (Stoic, CEO, athlete) and type curated quotes against the clock to condition how you think. Streaks, shareable session cards, and progress tracking turn mindset work into a daily habit.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Stripe'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
    ],
    media: {
      type: 'placeholder',
      video: assetSafe('mindtype.mp4'),
    },
    accent: '#14b8a6',
    reversed: false,
    hidden: true,
  },
  {
    id: 'bookreader-xr',
    number: '08',
    title: 'BookReader for Even Realities G1',
    subtitle: 'Read books on XR glasses',
    description:
      'A reading app for the Even Realities G1 extended-reality glasses, built on MentaOS (the open-source OS for XR glasses). Upload a book, read it hands-free on the display, and the app tracks progress and bookmarks — optimised text rendering for a tiny screen and limited input.',
    tags: ['JavaScript', 'MentaOS', 'XR', 'Extended Reality', 'Productivity'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
    ],
    media: {
      type: 'concept',
    },
    accent: '#38bdf8',
    reversed: true,
    hidden: true,
  },
];

// Renumber + fix alternating layout so the list stays correct no matter
// which projects are hidden. This is the list both pages actually render.
export const VISIBLE_PROJECTS: PortfolioProject[] = PROJECTS
  .filter(p => !p.hidden)
  .map((p, i) => ({
    ...p,
    number: String(i + 1).padStart(2, '0'),
    reversed: i % 2 === 1,
  }));
