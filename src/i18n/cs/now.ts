// /now page + the "Agents running" widget. Prose that carries inline tags
// (links, <strong> spans) is split into keyed segments; the tags stay in the
// component. Live API values (usernames, repo names, tweet text, contribution
// counts) are NOT translated: only the static UI chrome around them is.
const now = {
  seo: {
    title: 'Teď',
    description:
      'Čemu se Eduard Hvižďák věnuje právě teď: aktuální projekty a k tomu co čte a na co se dívá.',
  },
  hero: {
    kicker: '/now',
    title: 'Čemu se věnuju teď',
  },
  focus: {
    aria: 'Na co se právě teď soustředím',
    expertA: 'Jsem ',
    expertRole: 'AI inženýr',
    expertB: ' a většina mého času jde do stavění ',
    studentA: 'Dokončuju ',
    studentBsc: 'bakaláře z informatiky',
    studentB: ' na Masarykově univerzitě a pracuju jako ',
    studentRole: 'AI inženýr',
    studentC: '. Většina mého času jde do stavění ',
    agentsBold: 'AI agentů a agentních systémů',
    mid:
      ': automatizace, orchestrace více agentů a propojení, které je udrží v běhu. Zkusil jsem si i provozovat pár vlastních SaaS produktů a ten, který stále běží, je ',
    outro:
      '. Vedle toho, spíš jako doplněk než hlavní práce, dělám AI konzultace a k tomu automatizace a nasazování AI, jen já, žádná firma za tím.',
  },
  building: {
    title: 'Právě stavím',
    logoAlt: 'logo',
    impressionsTitle: 'Zobrazení v Google vyhledávání za posledních 28 dní',
    impressionsShort: 'zobrazení ve vyhledávání / 28 dní',
    inzerpro: {
      tagline:
        'Platforma pro hromadné inzerování a automatizaci na českých a slovenských bazarech.',
      status: 'Živě · platící zákazníci',
    },
    kouzelnik: {
      tagline:
        'Marketplace, který spojuje pořadatele akcí s kouzelníky po Česku a Slovensku, a zároveň moje živá pískoviště pro experimenty s SEO, GEO a online reklamou.',
      status: 'Živě · marketplace + marketingová laboratoř',
    },
    nasadclaw: {
      tagline:
        'Prezentační web pro moji práci s AI konzultacemi, automatizací a nasazováním, kde si o tom lidé přečtou a ozvou se.',
      status: 'Živě · web se službami',
    },
  },
  github: {
    title: 'Na GitHubu',
    countSuffix: 'příspěvků za poslední rok',
    aria: 'Příspěvky na GitHubu za poslední rok',
    onDate: 'dne',
    contribOne: 'příspěvek',
    contribFew: 'příspěvky',
    contribMany: 'příspěvků',
  },
  stats: {
    aria: 'Živé statistiky soustředění z mého dashboardu',
    focus: 'Soustředění tento týden',
    pomodoros: 'Zapsaných pomodor',
    streak: 'Série soustředění',
    screen: 'Čas u obrazovky / týden',
    slacking: 'Kolikrát přistižen při lenošení',
    daysSuffix: ' dní',
  },
  media: {
    readingTitle: 'Právě čtu',
    readingAuto: 'Automaticky synchronizováno z Goodreads',
    watchedTitle: 'Nedávno zhlédnuto',
    watchedAuto: 'Automaticky synchronizováno z Letterboxd',
    animeTitle: 'Nedávno zhlédnuté anime',
    animeAuto: 'Automaticky synchronizováno z MyAnimeList',
    videoTitle: 'Poslední video',
    views: 'zhlédnutí',
    linkedinTitle: 'Poslední z LinkedInu',
    tweetsTitle: 'Poslední příspěvky na X',
    favTweetsTitle: 'Oblíbené příspěvky na X',
    favTweetsAuto: 'na X',
  },
  foot: {
    location: 'Brno, Česká republika',
    clockTip: 'Můj místní čas v Brně',
    updated: 'Aktualizováno',
    lastUpdated: 'červenec 2026',
  },
  agents: {
    title: 'Běžící agenti',
    auto: 'Autonomní · běží sami',
    live: 'živě',
    idle: 'nečinný',
    sectionAria: 'Moji běžící AI agenti',
    activityAria: 'poslední aktivita',
    lead:
      'Živý pohled na AI agenty, které mám spuštěné na pozadí: na čem každý z nich právě pracuje, jaký model za ním stojí a co už zvládl dodat.',
    statusRunning: 'Běží',
    statusIdle: 'Nečinný',
    statusDone: 'Hotovo',
    statusError: 'Chyba',
    up: 'v běhu',
    sleeping: 'spí',
    lastRun: 'poslední běh',
    tasksDone: 'hotových úkolů',
    tokToday: 'tokenů dnes',
    log: 'log',
    shipped: 'Dodáno',
  },
};

export default now;
