// ═══════════════════════════════════════════════════════════════
//  "Tech I love": a living, chaptered piece. One chapter per thing
//  I actually use and love, written like a blog: your own words plus
//  your own photos and videos.
//
//  HOW TO EXPAND A CHAPTER
//  - body: add as many paragraphs as you like (each string is one
//    paragraph). Write freely: personal opinions, stories, gripes.
//  - media: drop files in `public/things/<id>/` and reference them by
//    path. Images can be .jpg/.webp/.gif and videos .mp4/.webm (avoid
//    .png in public, it is gitignored; use .webp/.jpg instead). Each
//    entry can carry a caption. Order is the order they appear:
//      { type: 'image', src: '/things/kindle/desk.jpg', caption: '...' }
//      { type: 'video', src: '/things/g1/demo.mp4', poster: '/things/g1/demo-poster.jpg' }
// ═══════════════════════════════════════════════════════════════

export interface Media {
  type: 'image' | 'video';
  src: string;
  caption?: string;
  poster?: string; // optional still frame for videos
}

export interface Chapter {
  id: string;
  title: string;       // chapter heading, e.g. "Even Realities G1"
  category: string;    // small kicker, e.g. "XR glasses"
  accent: string;
  emoji: string;       // used for the cover tile until real media is added
  link?: string;
  lead: string;        // one-line summary under the title
  body: string[];      // paragraphs: your personal take
  media: Media[];      // photos / videos accompanying the chapter
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'macbook-pro-m4-pro',
    title: 'MacBook Pro (M4 Pro)',
    category: 'Daily driver',
    accent: '#a1a1aa',
    emoji: '💻',
    link: 'https://www.apple.com/macbook-pro/',
    lead: 'The 14-inch workhorse everything gets built on.',
    body: [
      'Where all of it happens: every project, commit, and late-night build. The M4 Pro chews through local dev, a stack of agents, and video edits without the fans ever really showing up, and the battery outlasts my focus.',
    ],
    media: [],
  },
  {
    id: 'even-realities-g1',
    title: 'Even Realities G1',
    category: 'XR glasses',
    accent: '#a855f7',
    emoji: '🕶️',
    link: 'https://www.evenrealities.com',
    lead: 'Lightweight AR glasses with a subtle heads-up display.',
    body: [
      'Glasses that look like glasses but quietly show text in front of you. I am genuinely convinced ambient, hands-free reading is where computing is heading.',
      'I liked them enough that I built my own BookReader app for them, so I can read on a screen that sits in the world instead of pulling me into a phone.',
    ],
    media: [],
  },
  {
    id: 'kindle',
    title: 'Amazon Kindle',
    category: 'Reading',
    accent: '#f59e0b',
    emoji: '📖',
    link: 'https://www.amazon.com/kindle',
    lead: 'A dedicated, glare-free e-ink reader with weeks of battery.',
    body: [
      'It is the one screen that never pings me. No tabs, no notifications, no algorithm, just the book.',
      'Most of what I learn outside of building things, I read here. Taking the internet out of reading turned out to be the whole point.',
    ],
    media: [],
  },
  {
    id: 'xteink',
    title: 'Xteink 4',
    category: 'E-ink',
    accent: '#38bdf8',
    emoji: '🗒️',
    lead: 'A pocket colour e-ink device for reading and quick notes.',
    body: [
      'E-ink that fits in a pocket. I like the calm of a paper-like screen for notes and longer reads. It slows me down in the good way and keeps my eyes happier than another LCD.',
    ],
    media: [],
  },
  {
    id: 'xteink-3',
    title: 'Xteink 3',
    category: 'E-ink',
    accent: '#22d3ee',
    emoji: '📟',
    lead: 'The earlier pocket e-ink reader, the one that got me into it.',
    body: [
      'This is the device that sold me on pocket e-ink in the first place. It still earns its spot: a calm, paper-like screen I reach for when I want to read or jot something without falling into a glowing phone.',
    ],
    media: [],
  },
  {
    id: 'airpods-pro-3',
    title: 'AirPods Pro 3',
    category: 'Audio',
    accent: '#60a5fa',
    emoji: '🎧',
    link: 'https://www.apple.com/airpods-pro/',
    lead: 'Noise-cancelling earbuds that disappear into the day.',
    body: [
      'My focus bubble. Noise cancelling on, a long playlist or silence, and the room goes quiet. A big chunk of my deep-work hours run through these.',
      'Transparency mode is good enough that I barely bother taking them out.',
    ],
    media: [],
  },
  {
    id: 'pavlok',
    title: 'Pavlok',
    category: 'Quantified self',
    accent: '#ef4444',
    emoji: '⚡',
    link: 'https://pavlok.com',
    lead: 'A wristband that buzzes (or zaps) to break bad habits.',
    body: [
      'A literal electric nudge against my worst habits. It is half experiment, half accountability.',
      'I wire it into my own focus dashboard so getting caught slacking actually costs me something.',
    ],
    media: [],
  },
];
