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
}

export interface ProjectMedia {
  type: 'video' | 'slideshow' | 'image' | 'concept' | 'placeholder';
  video?: string | null;
  poster?: string;
  images?: string[];
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
      { label: 'Website', url: 'https://www.inzerpro.cz', type: 'demo' },
    ],
    media: {
      type: 'video',
      video: assetSafe('inzerpro.mp4'),
    },
    accent: '#3b82f6',
    reversed: false,
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
      { label: 'Website', url: 'https://www.studyexe.com', type: 'demo' },
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
      { label: 'Website', url: 'https://www.kouzelniknaakci.cz', type: 'demo' },
    ],
    media: {
      type: 'placeholder',
      video: assetSafe('kouzelnici.mp4'),
    },
    accent: '#ec4899',
    reversed: false,
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
      { label: 'Website', url: 'https://www.nasadclaw.cz', type: 'demo' },
    ],
    media: {
      type: 'image',
      video: assetSafe('nasadclaw.mp4'), // upgrades to video if dropped in
      images: [asset('nasadclaw-real-image.png')],
    },
    accent: '#a855f7',
    reversed: false,
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
      { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao', type: 'demo' },
      { label: 'GitHub', url: 'https://github.com/Rauded/college_extension_chrome', type: 'github' },
    ],
    media: {
      type: 'video',
      video: asset('psychetab-demo.mp4'),
      poster: asset('psychetab-main.png'),
    },
    accent: '#f59e0b',
    reversed: true,
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
