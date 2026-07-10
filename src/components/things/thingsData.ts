// ═══════════════════════════════════════════════════════════════
//  "Tech I love": one chapter per thing I actually use and love,
//  written like a blog post, your own words plus your own photos
//  and videos.
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
//
//  SLOVAK: each chapter carries optional `category_sk`, `lead_sk`,
//  `body_sk` (and media `caption_sk`) variants. localizeChapter() below
//  swaps them in when the active locale is Slovak; Czech falls back to
//  English until it is translated. Product names, ids, links, accents
//  and media src stay language-neutral.
// ═══════════════════════════════════════════════════════════════

export interface Media {
  type: 'image' | 'video';
  src: string;
  caption?: string;
  caption_sk?: string;
  poster?: string; // optional still frame for videos
}

export interface Chapter {
  id: string;
  title: string;       // chapter heading, e.g. "Even Realities G1"
  category: string;    // small kicker, e.g. "XR glasses"
  category_sk?: string;
  accent: string;
  link?: string;
  lead: string;        // one-line summary under the title
  lead_sk?: string;
  body: string[];      // paragraphs: your personal take
  body_sk?: string[];
  media: Media[];      // photos / videos accompanying the chapter
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'macbook-pro-m4-pro',
    title: 'MacBook Pro (M4 Pro)',
    category: 'Daily driver',
    category_sk: 'Každodenný pomocník',
    accent: '#a1a1aa',
    link: 'https://www.apple.com/macbook-pro/',
    lead: 'The 14-inch workhorse everything gets built on.',
    lead_sk: '14-palcový ťahúň, na ktorom sa všetko postaví.',
    body: [
      'Where all of it happens: every project, commit, and late-night build. The M4 Pro chews through local dev, a stack of agents, and video edits without the fans ever really showing up, and the battery outlasts my focus.',
    ],
    body_sk: [
      'Miesto, kde sa to celé deje: každý projekt, commit aj nočný build. M4 Pro si poradí s lokálnym vývojom, kopou agentov aj strihom videa bez toho, aby sa ventilátory vôbec ozvali, a batéria vydrží dlhšie než moja sústredenosť.',
    ],
    media: [],
  },
  {
    id: 'even-realities-g1',
    title: 'Even Realities G1',
    category: 'XR glasses',
    category_sk: 'XR okuliare',
    accent: '#34d399',
    link: 'https://www.evenrealities.com',
    lead: 'Lightweight AR glasses with a subtle heads-up display.',
    lead_sk: 'Ľahké AR okuliare s nenápadným priehľadovým displejom.',
    body: [
      'Glasses that look like glasses but quietly show text in front of you. I am genuinely convinced ambient, hands-free reading is where computing is heading.',
      'I liked them enough that I built my own BookReader app for them, so I can read on a screen that sits in the world instead of pulling me into a phone.',
    ],
    body_sk: [
      'Okuliare, ktoré vyzerajú ako okuliare, no ticho vám pred očami zobrazujú text. Naozaj som presvedčený, že ambientné čítanie bez použitia rúk je smer, ktorým sa počítače uberajú.',
      'Páčili sa mi natoľko, že som si k nim naprogramoval vlastnú aplikáciu BookReader, aby som mohol čítať na obrazovke, ktorá je súčasťou sveta okolo, a nie ma vťahuje do telefónu.',
    ],
    media: [],
  },
  {
    id: 'kindle',
    title: 'Amazon Kindle',
    category: 'Reading',
    category_sk: 'Čítanie',
    accent: '#f59e0b',
    link: 'https://www.amazon.com/kindle',
    lead: 'A dedicated, glare-free e-ink reader with weeks of battery.',
    lead_sk: 'Vyhradená čítačka e-ink bez odleskov s výdržou na týždne.',
    body: [
      'It is the one screen that never pings me. No tabs, no notifications, no algorithm, just the book.',
      'Most of what I learn outside of building things, I read here. Taking the internet out of reading turned out to be the whole point.',
    ],
    body_sk: [
      'Je to jediná obrazovka, ktorá ma nikdy neupozorňuje. Žiadne karty, žiadne notifikácie, žiadny algoritmus, len kniha.',
      'Väčšinu toho, čo sa naučím mimo tvorby vecí, prečítam práve tu. Vypnúť internet z čítania sa ukázalo ako celý zmysel.',
    ],
    media: [],
  },
  {
    id: 'xteink',
    title: 'Xteink 4',
    category: 'E-ink',
    category_sk: 'E-ink',
    accent: '#38bdf8',
    lead: 'A pocket colour e-ink device for reading and quick notes.',
    lead_sk: 'Vreckové farebné e-ink zariadenie na čítanie a rýchle poznámky.',
    body: [
      'E-ink that fits in a pocket. I like the calm of a paper-like screen for notes and longer reads. It slows me down in the good way and keeps my eyes happier than another LCD.',
    ],
    body_sk: [
      'E-ink, ktorý sa zmestí do vrecka. Mám rád pokoj papieru pripomínajúcej obrazovky pri poznámkach aj dlhšom čítaní. Spomalí ma v tom dobrom zmysle a moje oči sú spokojnejšie než pri ďalšom LCD.',
    ],
    media: [],
  },
  {
    id: 'xteink-3',
    title: 'Xteink 3',
    category: 'E-ink',
    category_sk: 'E-ink',
    accent: '#22d3ee',
    lead: 'The earlier pocket e-ink reader, the one that got me into it.',
    lead_sk: 'Staršia vrecková čítačka e-ink, tá, ktorá ma k tomu priviedla.',
    body: [
      'This is the device that sold me on pocket e-ink in the first place. It still earns its spot: a calm, paper-like screen I reach for when I want to read or jot something without falling into a glowing phone.',
    ],
    body_sk: [
      'Toto je zariadenie, ktoré ma pre vreckový e-ink získalo úplne prvé. Stále si zaslúži svoje miesto: pokojná obrazovka pripomínajúca papier, po ktorej siahnem, keď si chcem čítať alebo si niečo poznačiť bez toho, aby som spadol do žiariaceho telefónu.',
    ],
    media: [],
  },
  {
    id: 'airpods-pro-3',
    title: 'AirPods Pro 3',
    category: 'Audio',
    category_sk: 'Zvuk',
    accent: '#60a5fa',
    link: 'https://www.apple.com/airpods-pro/',
    lead: 'Noise-cancelling earbuds that disappear into the day.',
    lead_sk: 'Slúchadlá s potlačením hluku, ktoré splynú s dňom.',
    body: [
      'My focus bubble. Noise cancelling on, a long playlist or silence, and the room goes quiet. A big chunk of my deep-work hours run through these.',
      'Transparency mode is good enough that I barely bother taking them out.',
    ],
    body_sk: [
      'Moja bublina sústredenia. Zapnem potlačenie hluku, dlhý playlist alebo ticho, a miestnosť stíchne. Veľká časť mojich hodín hlbokej práce prejde cez tieto slúchadlá.',
      'Režim priepustnosti je taký dobrý, že sa mi ich takmer neoplatí vyberať.',
    ],
    media: [],
  },
  {
    id: 'pavlok',
    title: 'Pavlok',
    category: 'Quantified self',
    category_sk: 'Kvantifikované ja',
    accent: '#ef4444',
    link: 'https://pavlok.com',
    lead: 'A wristband that buzzes (or zaps) to break bad habits.',
    lead_sk: 'Náramok, ktorý zavibruje (alebo dá impulz), aby zlomil zlé návyky.',
    body: [
      'A literal electric nudge against my worst habits. It is half experiment, half accountability.',
      'I wire it into my own focus dashboard so getting caught slacking actually costs me something.',
    ],
    body_sk: [
      'Doslova elektrické postrčenie proti mojim najhorším návykom. Napoly experiment, napoly zodpovednosť.',
      'Prepojím ho s vlastným dashboardom sústredenia, takže ma prichytenie pri flákaní naozaj niečo stojí.',
    ],
    media: [],
  },
];

// Swap the Slovak variant fields in when the active locale is Slovak.
// Czech falls back to English until it is translated. Structural fields
// (id, title, accent, link, media.src) stay language-neutral.
export function localizeChapter(c: Chapter, locale: 'en' | 'sk' | 'cs'): Chapter {
  if (locale !== 'sk') return c;
  return {
    ...c,
    category: c.category_sk ?? c.category,
    lead: c.lead_sk ?? c.lead,
    body: c.body_sk ?? c.body,
    media: c.media.map((m) => ({ ...m, caption: m.caption_sk ?? m.caption })),
  };
}
