// Slovak copy for the CZS (Masaryk University) AI assistant case study. Same
// keys and array lengths as en/czsChatbot.ts (arrays replace the English ones
// wholesale, so a missing item drops an element). mix[].fmt and mix[].n are
// logic values and stay as in English. Numbers are the English ones with
// Slovak separators: non-breaking space ( ) for thousands, decimal comma.
// dashboards.items[].title are the names of the dashboard screens and stay in
// English, same as the labels inside the screens.
const czsChatbot = {
  back: 'Späť na služby',
  seo: {
    title: 'AI asistent pre Masarykovu univerzitu (CZS), prípadová štúdia',
    description:
      'Dvojjazyčný AI asistent s citovanými zdrojmi, naživo na stránkach Masarykovej univerzity o štúdiu v zahraničí. 15 362 hodnotených evaluačných behov, presnosť približne 90 percent, halucinácie okolo 1 percenta.',
  },
  hero: {
    eyebrow: 'Prípadová štúdia · Masarykova univerzita, CZS',
    title: 'Odpovede boli na webe. Zamestnanci aj tak odpovedali ručne.',
    lead:
      'Asistent, ktorý na oficiálnom webe Masarykovej univerzity odpovedá na otázky o štúdiu v zahraničí, vychádza z vlastných stránok univerzity a každú odpoveď doloží zdrojom.',
    live: 'Pozrite si to naživo na stránke Erasmus',
    liveUrl: 'https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa',
    figureCaption: 'Produkčný widget na oficiálnom webe CZS, nie prototyp.',
    book: 'Dohodnúť si úvodný hovor',
    email: 'Napíšte mi',
    meta: [
      { k: 'Pre koho', v: 'Masarykova univerzita, CZS' },
      { k: 'Rola', v: 'Sólo inžinier, od návrhu po produkciu' },
      { k: 'Stav', v: 'Naživo na czs.muni.cz' },
    ],
  },
  metrics: [
    { value: '15 362', label: 'hodnotených evaluačných behov' },
    { value: '~90%', label: 'nameraná presnosť odpovedí' },
    { value: '~1%', label: 'nameraná miera halucinácií' },
    { value: '778', label: 'monitorovaných zdrojových stránok' },
  ],
  problem: {
    kicker: '01 / Problém',
    title: '778 zdrojov, jedna schránka.',
    body: 'Pravidlá žijú v <strong>778 neustále sa meniacich zdrojoch</strong> v češtine a angličtine a na každú otázku študenta sa odpovedalo <strong>ručne, e-mail po e-maile</strong>.',
    corpusLabel: 'Zdrojový korpus, CS + EN',
    mix: [
      { fmt: 'web', k: 'webových stránok', n: 530, short: '530 web' },
      { fmt: 'pdf', k: 'PDF', n: 174, short: '174 PDF' },
      { fmt: 'docx', k: 'docx', n: 60, short: '' },
      { fmt: 'video', k: 'prepisy videí', n: 3, short: '' },
    ],
    before: 'Predtým: každá otázka zodpovedaná ručne, e-mailom',
  },
  product: {
    kicker: '02 / Produkt',
    title: 'Pýtajte sa po česky alebo anglicky. Dostanete odpoveď s dôkazmi.',
    body: [
      'Odpovedá na otázky o štúdiu v zahraničí <strong>po česky alebo anglicky</strong>, vychádza z vyhľadaných zdrojov CZS a <strong>cituje ich</strong>, takže každé tvrdenie sa dá vystopovať k stránke. Fakty, ktoré sa nesmú hádať (aktuálny dátum, termíny, kontakty), pochádzajú z <strong>deterministických volaní nástrojov</strong>, nie z pamäte modelu.',
    ],
    captionWidgetLive: 'Otvorí sa s upozornením na AI a navrhnutými otázkami, v jazyku študenta.',
    captionAnswerLive: 'Skutočná odpoveď citujúca 11 pomenovaných zdrojových dokumentov, so spätnou väzbou, ktorá ide na kontrolu človekom.',
    answerHeading: 'Tá istá odpoveď, po anglicky',
    answerQuestion: 'Čo potrebujem odovzdať do výberového konania Erasmus+?',
    answerBody: 'Dokumenty do výberového konania Erasmus+ sa líšia podľa fakulty, ale vo všeobecnosti budete potrebovať:',
    answerList: ['Prihláška', 'Motivačný list', 'Doklad o jazykovej úrovni', 'Výpis známok'],
    answerSources: 'Zdroje (11)',
    answerCaption: 'Každé tvrdenie podložené citovaným zdrojom CZS.',
  },
  architecture: {
    kicker: '03 / Systém',
    title: 'Pipeline za priamou odpoveďou',
    body: [
      'Každá otázka sa klasifikuje a potom zodpovie z <strong>hybridného OpenSearch retrievalu</strong> (BM25 plus husté vektory Voyage, spojené cez RRF, dva rerankery, MMR) nad <strong>parent-child indexom</strong>, ktorý rešpektuje nadpisy, s <strong>bránou zodpovedateľnosti v štýle CRAG</strong>, ktorá pri slabom kontexte vyhľadáva znovu. Overené fakty pochádzajú z <strong>deterministických volaní nástrojov</strong>, odpovede sa streamujú cez SSE z <strong>DeepSeek-v3.2 na CERIT</strong>.',
    ],
    stepsLabel: 'Cesta jednej otázky',
    steps: [
      { k: 'Otázka', v: 'po česky alebo anglicky' },
      { k: 'Klasifikácia', v: 'zámer, entity, jazyk' },
      { k: 'Hybridné vyhľadávanie', v: 'BM25 plus vektory, spojené' },
      { k: 'Rerank', v: 'dva modely, diverzifikované' },
      { k: 'Brána zodpovedateľnosti', v: 'pri slabom kontexte hľadá znovu' },
      { k: 'Volanie nástroja', v: 'overené termíny, kontakty, dátum' },
      { k: 'Generovanie', v: 'DeepSeek na CERIT' },
      { k: 'Citovaná odpoveď', v: 'streamovaná so zdrojmi' },
    ],
    freshnessLabel: 'Slučka aktuálnosti',
    freshness: 'Monitor zmien sleduje všetkých <strong>778 zdrojov</strong>. Každá zmena spustí <strong>webhook</strong>, ktorý preindexuje len danú stránku, a <strong>denná úloha</strong> prejde zvyšok, takže bot nikdy nezastará.',
    stackLabel: 'Stack',
    stack: ['Python', 'FastAPI', 'OpenSearch', 'Voyage AI', 'DeepSeek cez CERIT', 'PostHog', 'nginx'],
  },
  evaluation: {
    kicker: '05 / Evaluácia',
    title: 'Merané, nie dojmy',
    body: [
      'Priebežný harness <strong>LLM-as-judge</strong> hodnotí doménové otázky z FAQ CZS (skutočné historické plus generované) oproti zdrojom na presnosť, podloženosť a halucinácie. Naprieč <strong>37 cyklami</strong> a <strong>15 362 behmi</strong> bolo <strong>10 438</strong> hodnotiteľných odpovedí: <strong>84 percent získalo 9 alebo 10</strong>, priemer <strong>9,0</strong>, podloženosť <strong>8,6</strong>, halucinácie <strong>okolo 1 percenta</strong>.',
    ],
    chartTitle: 'Ako dopadlo 10 438 hodnotených odpovedí',
    chartAccuracy: 'skóre 9 alebo 10',
    chartHallucination: 'skóre 0 až 8',
    chartAxisY: 'odpovede',
    chartAxisX: 'skóre odpovede / 10',
    chartMean: 'priemer 9,0',
    chartCaption: 'Rozdelenie presnosti naprieč 10 438 hodnotiteľnými odpoveďami z 15 362 posudzovaných behov. Správny zdroj sa objaví medzi top výsledkami retrievalu v 92 percentách prípadov, oproti 79 pred parent-child indexom.',
  },
  golden: {
    kicker: '04 / Slučka spätnej väzby',
    title: 'Každá schválená odpoveď robí tú ďalšiu okamžitou.',
    intro:
      'CZS odovzdalo svoj archív skutočných otázok študentov s <strong>overenými odpoveďami</strong>; systém každú novú odpoveď vracia späť do tohto archívu.',
    statNum: '707',
    statDen: '/ 715',
    statLabel: 'párov Q&A overených zamestnancami',
    statSub: '8 povýšených zo živých chatov',
    nodes: [
      { k: 'Nová otázka', v: 'kontrola rozsahu + zhoda s FAQ' },
      { k: 'Známa a overená?', v: 'vráti ju, alebo pripraví návrh zo zdrojov' },
      { k: 'Kontrola zamestnancom', v: 'úprava, schválenie' },
      { k: 'Zlatý pár', v: 'pridá sa do overeného FAQ' },
    ],
    loopLabel: 'Každé schválenie rozširuje overenú sadu',
    closer: '707 zo 715 párov už zamestnanci overili a slučka toto číslo len zvyšuje.',
  },
  wins: {
    kicker: '06 / Iterácia',
    title: 'Čo meranie naozaj zachytí',
    intro: 'Nič z toho sa pri bežnom testovaní neukázalo.',
    items: [
      {
        tag: 'Pravidlá doplňujúcich otázok',
        before: '4,9',
        after: '7,95',
        scale: 'presnosť odpovede / 10',
        title: 'Bot vypočúval študentov.',
        body:
          'Evaluácia ukázala, že <strong>18,6 percenta</strong> otázok dostalo namiesto odpovede protiotázku; prepísal som pravidlá doplňujúcich otázok a zlepšenie som overil <strong>A/B evaluáciou</strong>.',
      },
      {
        tag: 'Retrieval index',
        before: '0,79',
        after: '0,92',
        scale: 'správny zdroj v top 7 výsledkoch',
        title: 'Malé chunky na hľadanie, celé sekcie na odpoveď.',
        body:
          'Postavil som <strong>parent-child index</strong>: zhoda sa hľadá na malých, presných pasážach a potom sa rozšíri na celú sekciu, aby model odpovedal s úplným kontextom. Správna stránka sa teraz dostane medzi top výsledky v <strong>92 percentách</strong> prípadov, oproti <strong>79</strong>.',
      },
      {
        tag: 'Rýchlosť odpovede',
        before: '15,0 s',
        after: '10,6 s',
        scale: 'medián (p50) latencie odpovede',
        title: 'Rýchlejšie, pri vyššej presnosti.',
        body:
          'Ten istý redizajn retrievalu skrátil medián latencie odpovede o <strong>4,4 sekundy</strong>, pričom presnosť odpovedí stúpla, neklesla. Lepší kontext sa k modelu dostal v menšom počte čistejších pasáží.',
      },
    ],
  },
  dashboards: {
    kicker: '07 / Prevádzka',
    title: 'Toto prevádzkujú zamestnanci CZS. Nie ja.',
    intro:
      'Zamestnanci vidia <strong>každú konverzáciu</strong>, skontrolujú čokoľvek sporné a aktualizujú znalostnú bázu <strong>bez zásahu do kódu</strong>.',
    items: [
      {
        title: 'Conversation Database',
        caption:
          'Každá otázka a odpoveď s istotou, zdrojmi, spätnou väzbou a časom odpovede; s vyhľadávaním.',
      },
      {
        title: 'Flagged & Resolved',
        caption:
          'Odpovede s palcom dole a nízkou istotou tu čakajú na overenie zamestnancom.',
      },
      {
        title: 'Manage Sources',
        caption:
          'Všetkých 778 monitorovaných stránok so stavom detekcie zmien, plus manuálne nahrávanie.',
      },
      {
        title: 'FAQ Review',
        caption:
          'Kandidáti na FAQ vyťažení zo skutočných konverzácií; nič sa nepridá bez schválenia človekom.',
      },
    ],
    note: 'Tu zobrazené obrazovky sú ilustračné ukážky s vymyslenými príkladovými dátami; skutočné dashboardy sú za prihlásením pre zamestnancov.',
    closer: 'AI navrhuje, ľudia rozhodujú; CZS dostáva ovládanie, nie zmluvu o podpore.',
  },
  privacy: {
    kicker: '08 / Súkromie',
    title: 'Súkromné už v základe',
    body: [
      'Žiadny účet, <strong>žiadne zbieranie osobných údajov</strong>. Konverzácie sa logujú na kontrolu kvality.',
      'Všetko beží na <strong>vyhradenom serveri pre univerzitu</strong>, nie na zdieľanej AI službe tretej strany, a bot číta len verejné stránky CZS.',
    ],
  },
  cta: {
    eyebrow: 'Prijímam nové projekty',
    title: 'Máte web plný odpovedí, ktoré nikto nevie nájsť?',
    body:
      'Ak sa používatelia stále pýtajú na to, čo váš web už zodpovedá, postavím asistenta, ktorý tú medzeru zavrie, aj meranie, ktoré dokazuje, že funguje.',
    book: 'Dohodnúť si úvodný hovor',
    email: 'Napíšte mi',
    outcome: 'Asistent, ktorého ovláda váš tím, s číslami, ktoré dokazujú, že funguje.',
  },
};

export default czsChatbot;
