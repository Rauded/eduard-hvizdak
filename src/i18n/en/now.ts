// /now page + the "Agents running" widget. Prose that carries inline tags
// (links, <strong> spans) is split into keyed segments; the tags stay in the
// component. Live API values (usernames, repo names, tweet text, contribution
// counts) are NOT translated: only the static UI chrome around them is.
const now = {
  seo: {
    title: 'Now',
    description:
      "What Eduard Hvizdak is focused on right now: current projects, plus what he's reading and watching.",
  },
  hero: {
    kicker: '/now',
    title: "What I'm doing now",
  },
  focus: {
    aria: "What I'm focused on right now",
    expertA: "I'm an ",
    expertRole: 'AI engineer',
    expertB: ', and most of my time goes into building ',
    studentA: "I'm wrapping up my ",
    studentBsc: 'BSc in Computer Science',
    studentB: ' at Masaryk University and working as an ',
    studentRole: 'AI engineer',
    studentC: '. Most of my time goes into building ',
    agentsBold: 'AI agents and agentic systems',
    mid:
      ": automations, multi-agent orchestration, and the wiring that keeps them running. I've also had a go at running a few SaaS products of my own, and the one still going is ",
    outro:
      '. On the side, more of an extra than a main job, I do AI consultations plus automation and AI implementation work, just me, no company behind it.',
  },
  building: {
    title: 'Currently building',
    logoAlt: 'logo',
    impressionsTitle: 'Google Search impressions in the last 28 days',
    impressionsShort: 'search impressions / 28d',
    inzerpro: {
      tagline:
        'A cross-listing and automation platform for Czech and Slovak second-hand marketplaces.',
      status: 'Live · paying customers',
    },
    kouzelnik: {
      tagline:
        'A marketplace connecting event organisers with magicians across Czechia and Slovakia, and where I sharpen my SEO and online-marketing craft on a real product.',
      status: 'Live · growing',
    },
    nasadclaw: {
      tagline:
        'A front-end brochure site for my AI consulting, automation, and deployment work, where people can read up and get in touch.',
      status: 'Live · services site',
    },
  },
  github: {
    title: 'On GitHub',
    countSuffix: 'contributions in the last year',
    aria: 'GitHub contributions in the last year',
    onDate: 'on',
    contribOne: 'contribution',
    contribFew: 'contributions',
    contribMany: 'contributions',
  },
  stats: {
    aria: 'Live focus stats from my dashboard',
    focus: 'Focused this week',
    pomodoros: 'Pomodoros logged',
    streak: 'Focus streak',
    screen: 'Screen time / week',
    slacking: 'Times caught slacking',
    daysSuffix: ' days',
  },
  media: {
    readingTitle: 'Reading now',
    readingAuto: 'Auto-synced from Goodreads',
    watchedTitle: 'Recently watched',
    watchedAuto: 'Auto-synced from Letterboxd',
    animeTitle: 'Recently watched anime',
    animeAuto: 'Auto-synced from MyAnimeList',
    videoTitle: 'Latest video',
    views: 'views',
    linkedinTitle: 'Latest from LinkedIn',
    tweetsTitle: 'Latest posts on X',
    favTweetsTitle: 'Favourite posts on X',
    favTweetsAuto: 'on X',
  },
  foot: {
    location: 'Brno, Czech Republic',
    clockTip: 'My local time in Brno',
    updated: 'Updated',
    lastUpdated: 'July 2026',
  },
  agents: {
    title: 'Agents running',
    auto: 'Autonomous · self-running',
    live: 'live',
    idle: 'idle',
    sectionAria: 'My AI agents running',
    activityAria: 'latest activity',
    lead:
      "A live look at the AI agents I have running in the background: what each one is working on right now, the model behind it, and what it's already shipped.",
    statusRunning: 'Running',
    statusIdle: 'Idle',
    statusDone: 'Done',
    statusError: 'Error',
    up: 'up',
    sleeping: 'sleeping',
    lastRun: 'last run',
    tasksDone: 'tasks done',
    tokToday: 'tok today',
    log: 'log',
    shipped: 'Shipped',
  },
};

export default now;
