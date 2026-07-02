// ═══════════════════════════════════════════════════════════════
//  Favourite Things: the tech (and gear) Eduard actually loves.
//  Personal page; add/reorder freely. `image` is optional; until a
//  real photo is dropped in, the card shows the emoji tile.
// ═══════════════════════════════════════════════════════════════

export interface Thing {
  id: string;
  name: string;
  category: string;
  blurb: string; // what it is, in a line
  why: string;   // why I love it (the personal bit)
  link?: string;
  accent: string;
  emoji: string;     // visual fallback when there's no photo
  image?: string;    // optional: src/assets/things/<file>.jpg
}

export const THINGS: Thing[] = [
  {
    id: 'kindle',
    name: 'Amazon Kindle',
    category: 'Reading',
    blurb: 'A dedicated, glare-free e-ink reader with weeks of battery.',
    why: 'It is the one screen that never pings me. No tabs, no notifications, no algorithm, just the book. Most of what I learn outside of building things, I read here.',
    link: 'https://www.amazon.com/kindle',
    accent: '#f59e0b',
    emoji: '📖',
  },
  {
    id: 'xteink',
    name: 'Xteink 4',
    category: 'E-ink',
    blurb: 'A pocket colour e-ink device for reading and quick notes.',
    why: 'E-ink that fits in a pocket. I like the calm of a paper-like screen for notes and longer reads. It slows me down in the good way and keeps my eyes happier than another LCD.',
    accent: '#38bdf8',
    emoji: '🗒️',
  },
  {
    id: 'xteink-3',
    name: 'Xteink 3',
    category: 'E-ink',
    blurb: 'The earlier pocket e-ink reader, the one that got me into it.',
    why: 'This is the device that sold me on pocket e-ink in the first place. It still earns its spot: a calm, paper-like screen I reach for when I want to read or jot something without falling into a glowing phone.',
    accent: '#22d3ee',
    emoji: '📟',
  },
  {
    id: 'even-realities-g1',
    name: 'Even Realities G1',
    category: 'XR glasses',
    blurb: 'Lightweight AR glasses with a subtle heads-up display.',
    why: 'Glasses that look like glasses but quietly show text in front of you. I am genuinely convinced ambient, hands-free reading is where computing is heading. I even built a BookReader app for them.',
    link: 'https://www.evenrealities.com',
    accent: '#a855f7',
    emoji: '🕶️',
  },
  {
    id: 'pavlok',
    name: 'Pavlok',
    category: 'Quantified self',
    blurb: 'A wristband that buzzes (or zaps) to break bad habits.',
    why: 'A literal electric nudge against my worst habits. It is half experiment, half accountability: I wire it into my own focus dashboard so getting caught slacking actually costs me something.',
    link: 'https://pavlok.com',
    accent: '#ef4444',
    emoji: '⚡',
  },
  {
    id: 'airpods-pro-3',
    name: 'AirPods Pro 3',
    category: 'Audio',
    blurb: 'Noise-cancelling earbuds that disappear into the day.',
    why: 'My focus bubble. Noise cancelling on, a long playlist or silence, and the room goes quiet, and a big chunk of my deep-work hours run through these. Transparency mode is good enough that I barely bother taking them out.',
    link: 'https://www.apple.com/airpods-pro/',
    accent: '#60a5fa',
    emoji: '🎧',
  },
  {
    id: 'macbook-pro-m4-pro',
    name: 'MacBook Pro (M4 Pro)',
    category: 'Daily driver',
    blurb: 'The 14-inch workhorse everything gets built on.',
    why: 'Where all of it happens: every project, commit, and late-night build. The M4 Pro chews through local dev, a stack of agents, and video edits without the fans ever really showing up, and the battery outlasts my focus.',
    link: 'https://www.apple.com/macbook-pro/',
    accent: '#a1a1aa',
    emoji: '💻',
  },
];
