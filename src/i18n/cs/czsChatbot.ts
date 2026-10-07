// Czech copy for the CZS (Masaryk University) AI assistant case study. Same
// keys and array lengths as en/czsChatbot.ts (arrays replace the English ones
// wholesale, so a missing item drops an element). mix[].fmt and mix[].n are
// logic values and stay as in English. Numbers are the English ones with
// Czech separators: non-breaking space ( ) for thousands, decimal comma.
// dashboards.items[].title are the names of the dashboard screens and stay in
// English, same as the labels inside the screens.
const czsChatbot = {
  back: 'Zpět na služby',
  seo: {
    title: 'AI asistent pro Masarykovu univerzitu (CZS), případová studie',
    description:
      'Dvojjazyčný AI asistent s citovanými zdroji, naživo na stránkách Masarykovy univerzity o studiu v zahraničí. 15 362 hodnocených evaluačních běhů, přesnost přibližně 90 procent, halucinace kolem 1 procenta.',
  },
  hero: {
    eyebrow: 'Případová studie · Masarykova univerzita, CZS',
    title: 'Odpovědi byly na webu. Zaměstnanci stejně odpovídali ručně.',
    lead:
      'Asistent, který na oficiálním webu Masarykovy univerzity odpovídá na otázky o studiu v zahraničí, vychází z vlastních stránek univerzity a každou odpověď doloží zdrojem.',
    live: 'Podívejte se naživo na stránce Erasmus',
    liveUrl: 'https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa',
    figureCaption: 'Produkční widget na oficiálním webu CZS, ne prototyp.',
    book: 'Rezervovat úvodní hovor',
    email: 'Napište mi',
    meta: [
      { k: 'Pro koho', v: 'Masarykova univerzita, CZS' },
      { k: 'Role', v: 'Sólo inženýr, od návrhu po produkci' },
      { k: 'Stav', v: 'Naživo na czs.muni.cz' },
    ],
  },
  metrics: [
    { value: '15 362', label: 'hodnocených evaluačních běhů' },
    { value: '~90%', label: 'naměřená přesnost odpovědí' },
    { value: '~1%', label: 'naměřená míra halucinací' },
    { value: '778', label: 'monitorovaných zdrojových stránek' },
  ],
  problem: {
    kicker: '01 / Problém',
    title: '778 zdrojů, jedna schránka.',
    body: 'Pravidla žijí v <strong>778 neustále se měnících zdrojích</strong> v češtině a angličtině a na každou otázku studenta se odpovídalo <strong>ručně, e-mail po e-mailu</strong>.',
    corpusLabel: 'Zdrojový korpus, CS + EN',
    mix: [
      { fmt: 'web', k: 'webových stránek', n: 530, short: '530 web' },
      { fmt: 'pdf', k: 'PDF', n: 174, short: '174 PDF' },
      { fmt: 'docx', k: 'docx', n: 60, short: '' },
      { fmt: 'video', k: 'přepisy videí', n: 3, short: '' },
    ],
    before: 'Předtím: každá otázka zodpovězená ručně, e-mailem',
  },
  product: {
    kicker: '02 / Produkt',
    title: 'Ptejte se česky nebo anglicky. Dostanete odpověď s důkazy.',
    body: [
      'Odpovídá na otázky o studiu v zahraničí <strong>česky nebo anglicky</strong>, vychází z vyhledaných zdrojů CZS a <strong>cituje je</strong>, takže každé tvrzení jde dohledat ke stránce. Fakta, která se nesmí hádat (aktuální datum, termíny, kontakty), pocházejí z <strong>deterministických volání nástrojů</strong>, ne z paměti modelu.',
    ],
    captionWidgetLive: 'Otevře se s upozorněním na AI a navrženými otázkami, v jazyce studenta.',
    captionAnswerLive: 'Skutečná odpověď citující 11 pojmenovaných zdrojových dokumentů, se zpětnou vazbou, která jde na kontrolu člověkem.',
    answerHeading: 'Stejná odpověď, anglicky',
    answerQuestion: 'Co musím odevzdat do výběrového řízení Erasmus+?',
    answerBody: 'Dokumenty do výběrového řízení Erasmus+ se liší podle fakulty, ale obecně budete potřebovat:',
    answerList: ['Přihláška', 'Motivační dopis', 'Doklad o jazykové úrovni', 'Výpis známek'],
    answerSources: 'Zdroje (11)',
    answerCaption: 'Každé tvrzení podložené citovaným zdrojem CZS.',
  },
  architecture: {
    kicker: '03 / Systém',
    title: 'Pipeline za přímou odpovědí',
    body: [
      'Každá otázka se klasifikuje a pak zodpoví z <strong>hybridního OpenSearch retrievalu</strong> (BM25 plus husté vektory Voyage, spojené přes RRF, dva rerankery, MMR) nad <strong>parent-child indexem</strong>, který respektuje nadpisy, s <strong>bránou zodpověditelnosti ve stylu CRAG</strong>, která při slabém kontextu vyhledává znovu. Ověřená fakta pocházejí z <strong>deterministických volání nástrojů</strong>, odpovědi se streamují přes SSE z <strong>DeepSeek-v3.2 na CERIT</strong>.',
    ],
    stepsLabel: 'Cesta jedné otázky',
    steps: [
      { k: 'Otázka', v: 'česky nebo anglicky' },
      { k: 'Klasifikace', v: 'záměr, entity, jazyk' },
      { k: 'Hybridní vyhledávání', v: 'BM25 plus vektory, spojené' },
      { k: 'Rerank', v: 'dva modely, diverzifikované' },
      { k: 'Brána zodpověditelnosti', v: 'při slabém kontextu hledá znovu' },
      { k: 'Volání nástroje', v: 'ověřené termíny, kontakty, datum' },
      { k: 'Generování', v: 'DeepSeek na CERIT' },
      { k: 'Citovaná odpověď', v: 'streamovaná se zdroji' },
    ],
    freshnessLabel: 'Smyčka aktuálnosti',
    freshness: 'Monitor změn sleduje všech <strong>778 zdrojů</strong>. Každá změna spustí <strong>webhook</strong>, který přeindexuje jen danou stránku, a <strong>denní úloha</strong> projde zbytek, takže bot nikdy nezastará.',
    stackLabel: 'Stack',
    stack: ['Python', 'FastAPI', 'OpenSearch', 'Voyage AI', 'DeepSeek přes CERIT', 'PostHog', 'nginx'],
  },
  evaluation: {
    kicker: '05 / Evaluace',
    title: 'Měřeno, ne dojmy',
    body: [
      'Průběžný harness <strong>LLM-as-judge</strong> hodnotí doménové otázky z FAQ CZS (skutečné historické plus generované) proti zdrojům na přesnost, podloženost a halucinace. Napříč <strong>37 cykly</strong> a <strong>15 362 běhy</strong> bylo <strong>10 438</strong> hodnotitelných odpovědí: <strong>84 procent získalo 9 nebo 10</strong>, průměr <strong>9,0</strong>, podloženost <strong>8,6</strong>, halucinace <strong>kolem 1 procenta</strong>.',
    ],
    chartTitle: 'Jak dopadlo 10 438 hodnocených odpovědí',
    chartAccuracy: 'skóre 9 nebo 10',
    chartHallucination: 'skóre 0 až 8',
    chartAxisY: 'odpovědi',
    chartAxisX: 'skóre odpovědi / 10',
    chartMean: 'průměr 9,0',
    chartCaption: 'Rozdělení přesnosti napříč 10 438 hodnotitelnými odpověďmi z 15 362 posuzovaných běhů. Správný zdroj se objeví mezi top výsledky retrievalu v 92 procentech případů, oproti 79 před parent-child indexem.',
  },
  golden: {
    kicker: '04 / Smyčka zpětné vazby',
    title: 'Každá schválená odpověď dělá tu další okamžitou.',
    intro:
      'CZS předalo svůj archiv skutečných otázek studentů s <strong>ověřenými odpověďmi</strong>; systém každou novou odpověď vrací zpět do tohoto archivu.',
    statNum: '707',
    statDen: '/ 715',
    statLabel: 'párů Q&A ověřených zaměstnanci',
    statSub: '8 povýšených ze živých chatů',
    nodes: [
      { k: 'Nová otázka', v: 'kontrola rozsahu + shoda s FAQ' },
      { k: 'Známá a ověřená?', v: 'vrátí ji, nebo připraví návrh ze zdrojů' },
      { k: 'Kontrola zaměstnancem', v: 'úprava, schválení' },
      { k: 'Zlatý pár', v: 'přidá se do ověřeného FAQ' },
    ],
    loopLabel: 'Každé schválení rozšiřuje ověřenou sadu',
    closer: '707 ze 715 párů už zaměstnanci ověřili a smyčka to číslo jen zvyšuje.',
  },
  wins: {
    kicker: '06 / Iterace',
    title: 'Co měření doopravdy zachytí',
    intro: 'Nic z toho se při běžném testování neukázalo.',
    items: [
      {
        tag: 'Pravidla doplňujících otázek',
        before: '4,9',
        after: '7,95',
        scale: 'přesnost odpovědi / 10',
        title: 'Bot vyslýchal studenty.',
        body:
          'Evaluace ukázala, že <strong>18,6 procenta</strong> otázek dostalo místo odpovědi protiotázku; přepsal jsem pravidla doplňujících otázek a zlepšení ověřil <strong>A/B evaluací</strong>.',
      },
      {
        tag: 'Retrieval index',
        before: '0,79',
        after: '0,92',
        scale: 'správný zdroj v top 7 výsledcích',
        title: 'Malé chunky na hledání, celé sekce na odpověď.',
        body:
          'Postavil jsem <strong>parent-child index</strong>: shoda se hledá na malých, přesných pasážích a pak se rozšíří na celou sekci, aby model odpovídal s úplným kontextem. Správná stránka se teď dostane mezi top výsledky v <strong>92 procentech</strong> případů, oproti <strong>79</strong>.',
      },
      {
        tag: 'Rychlost odpovědi',
        before: '15,0 s',
        after: '10,6 s',
        scale: 'medián (p50) latence odpovědi',
        title: 'Rychleji, při vyšší přesnosti.',
        body:
          'Stejný redesign retrievalu zkrátil medián latence odpovědi o <strong>4,4 sekundy</strong>, přičemž přesnost odpovědí stoupla, neklesla. Lepší kontext se k modelu dostal v menším počtu čistších pasáží.',
      },
    ],
  },
  dashboards: {
    kicker: '07 / Provoz',
    title: 'Tohle provozují zaměstnanci CZS. Ne já.',
    intro:
      'Zaměstnanci vidí <strong>každou konverzaci</strong>, zkontrolují cokoli sporného a aktualizují znalostní bázi <strong>bez zásahu do kódu</strong>.',
    items: [
      {
        title: 'Conversation Database',
        caption:
          'Každá otázka a odpověď s jistotou, zdroji, zpětnou vazbou a časem odpovědi; s vyhledáváním.',
      },
      {
        title: 'Flagged & Resolved',
        caption:
          'Odpovědi s palcem dolů a nízkou jistotou tu čekají na ověření zaměstnancem.',
      },
      {
        title: 'Manage Sources',
        caption:
          'Všech 778 monitorovaných stránek se stavem detekce změn, plus ruční nahrávání.',
      },
      {
        title: 'FAQ Review',
        caption:
          'Kandidáti na FAQ vytěžení ze skutečných konverzací; nic se nepřidá bez schválení člověkem.',
      },
    ],
    note: 'Zde zobrazené obrazovky jsou ilustrační ukázky s vymyšlenými příkladovými daty; skutečné dashboardy jsou za přihlášením pro zaměstnance.',
    closer: 'AI navrhuje, lidé rozhodují; CZS dostává ovládání, ne smlouvu o podpoře.',
  },
  privacy: {
    kicker: '08 / Soukromí',
    title: 'Soukromé už v základu',
    body: [
      'Žádný účet, <strong>žádný sběr osobních údajů</strong>. Konverzace se logují kvůli kontrole kvality.',
      'Vše běží na <strong>vyhrazeném serveru pro univerzitu</strong>, ne na sdílené AI službě třetí strany, a bot čte jen veřejné stránky CZS.',
    ],
  },
  cta: {
    eyebrow: 'Přijímám nové projekty',
    title: 'Máte web plný odpovědí, které nikdo neumí najít?',
    body:
      'Pokud se uživatelé pořád ptají na to, co váš web už zodpovídá, postavím asistenta, který tu mezeru zavře, i měření, které dokazuje, že funguje.',
    book: 'Rezervovat úvodní hovor',
    email: 'Napište mi',
    outcome: 'Asistent, kterého ovládá váš tým, s čísly, která dokazují, že funguje.',
  },
};

export default czsChatbot;
