// Slovenský preklad /now stránky a widgetu bežiacich agentov. Živé hodnoty
// z API (mená, názvy repozitárov, text tweetov, počty príspevkov) sa
// neprekladajú, prekladá sa iba statické UI okolo nich.
const now = {
  seo: {
    title: 'Teraz',
    description:
      'Čomu sa Eduard Hvižďák práve venuje: aktuálne projekty a k tomu, čo číta a pozerá.',
  },
  hero: {
    kicker: '/now',
    title: 'Čo práve robím',
  },
  focus: {
    aria: 'Čomu sa práve venujem',
    expertA: 'Som ',
    expertRole: 'AI inžinier',
    expertB: ' a väčšinu času venujem stavbe ',
    studentA: 'Dokončujem si ',
    studentBsc: 'bakalára z informatiky',
    studentB: ' na Masarykovej univerzite a pracujem ako ',
    studentRole: 'AI inžinier',
    studentC: '. Väčšinu času venujem stavbe ',
    agentsBold: 'AI agentov a agentických systémov',
    mid:
      ': automatizácie, orchestrácia viacerých agentov a všetko naokolo, čo ich udržiava v chode. Skúsil som si rozbehnúť aj pár vlastných SaaS produktov a ten, ktorý stále beží, je ',
    outro:
      '. Popri tom, skôr ako doplnok než hlavná práca, robím AI konzultácie plus automatizáciu a nasadzovanie AI, len ja, žiadna firma za tým.',
  },
  building: {
    title: 'Práve staviam',
    logoAlt: 'logo',
    impressionsTitle: 'zobrazení vo vyhľadávaní Google za posledných 28 dní',
    impressionsShort: 'zobrazení vo vyhľadávaní / 28 d',
    inzerpro: {
      tagline:
        'Platforma na hromadné inzerovanie a automatizáciu pre české a slovenské bazáre.',
      status: 'V prevádzke · platiaci zákazníci',
    },
    kouzelnik: {
      tagline:
        'Trhovisko, ktoré spája organizátorov akcií s kúzelníkmi po Česku a Slovensku, a zároveň moje živé pieskovisko na experimenty so SEO, GEO a online reklamou.',
      status: 'V prevádzke · trhovisko + marketingové laboratórium',
    },
    nasadclaw: {
      tagline:
        'Prezentačný web pre moje AI konzultácie, automatizáciu a nasadzovanie, kde si o tom ľudia prečítajú a ozvú sa mi.',
      status: 'V prevádzke · web so službami',
    },
  },
  github: {
    title: 'Na GitHube',
    countSuffix: 'príspevkov za posledný rok',
    aria: 'príspevkov na GitHube za posledný rok',
    onDate: 'dňa',
    contribOne: 'príspevok',
    contribFew: 'príspevky',
    contribMany: 'príspevkov',
  },
  stats: {
    aria: 'Živé štatistiky sústredenia z môjho dashboardu',
    focus: 'Sústredený tento týždeň',
    pomodoros: 'Zaznamenané pomodorá',
    streak: 'Séria sústredenia',
    screen: 'Čas pri obrazovke / týždeň',
    slacking: 'Prichytený pri flákaní',
    daysSuffix: ' dní',
  },
  media: {
    readingTitle: 'Práve čítam',
    readingAuto: 'Automaticky synchronizované z Goodreads',
    watchedTitle: 'Nedávno videné',
    watchedAuto: 'Automaticky synchronizované z Letterboxd',
    animeTitle: 'Nedávno videné anime',
    animeAuto: 'Automaticky synchronizované z MyAnimeList',
    videoTitle: 'Najnovšie video',
    views: 'zhliadnutí',
    linkedinTitle: 'Najnovšie z LinkedInu',
    tweetsTitle: 'Najnovšie príspevky na X',
    favTweetsTitle: 'Obľúbené príspevky na X',
    favTweetsAuto: 'na X',
  },
  foot: {
    location: 'Brno, Česko',
    clockTip: 'Môj miestny čas v Brne',
    updated: 'Aktualizované',
    lastUpdated: 'júl 2026',
  },
  agents: {
    title: 'Bežiace agenty',
    auto: 'Autonómne · bežia sami',
    live: 'naživo',
    idle: 'nečinné',
    sectionAria: 'Moje bežiace AI agenty',
    activityAria: 'najnovšia aktivita',
    lead:
      'Živý pohľad na AI agentov, ktorých mám bežať na pozadí: čo práve každý z nich rieši, aký model ho poháňa a čo už stihol odovzdať.',
    statusRunning: 'Beží',
    statusIdle: 'Nečinný',
    statusDone: 'Hotovo',
    statusError: 'Chyba',
    up: 'beží',
    sleeping: 'spí',
    lastRun: 'posledný beh',
    tasksDone: 'úloh hotových',
    tokToday: 'tok. dnes',
    log: 'log',
    shipped: 'Odovzdané',
  },
};

export default now;
