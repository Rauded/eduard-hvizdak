// Czech copy for the InzerPro case study. Same keys and array lengths as
// en/inzerproCaseStudy.ts (arrays replace the English ones wholesale, so a
// missing item drops an element). marketplaces[].id and .badge are logic keys
// and stay as in English. The rule from the English file applies here too:
// never describe how the marketplace integrations work. Thousands are written
// with a non-breaking space ( ).
const inzerproCaseStudy = {
  back: 'Zpět na projekty',
  seo: {
    title: 'InzerPro: automatické přidávání inzerátů na tržiště, případová studie',
    description:
      'SaaS, který přidává, obnovuje a maže inzeráty na 4 českých a slovenských tržištích bez veřejného API. Postavil a provozuje ho jeden člověk, každou hodinu se monitoruje a každou noc testuje na živých webech.',
  },
  hero: {
    eyebrow: 'Případová studie · InzerPro, vlastní produkt',
    title: 'Jeden inzerát. Každé tržiště. Podle plánu.',
    lead:
      'Na českých a slovenských bazarových tržištích rozhoduje o viditelnosti stáří inzerátu a velcí prodejci každé ráno ručně obnovovali desítky inzerátů. InzerPro to dělá za ně, bez dozoru.',
    live: 'Podívejte se naživo na inzerpro.cz',
    liveUrl: 'https://www.inzerpro.cz',
    figureCaption: 'Produkční dashboard: jeden inzerát, přidávaný a obnovovaný napříč tržišti podle plánu.',
    book: 'Rezervovat úvodní hovor',
    email: 'Napište mi',
    meta: [
      { k: 'Pro koho', v: 'Velcí prodejci na tržištích' },
      { k: 'Role', v: 'Sólo zakladatel, od návrhu po produkci' },
      { k: 'Stav', v: 'Naživo na inzerpro.cz, platící zákazníci' },
    ],
  },
  metrics: [
    { value: '4', label: 'tržiště plně automatizovaná' },
    { value: '~165', label: 'kategorií, jeden výběr pro všechna' },
    { value: '24/7', label: 'naplánované přidávání bez dozoru' },
    { value: '1', label: 'člověk, od návrhu po on-call' },
  ],
  problem: {
    kicker: '01 / Problém',
    title: 'Nové inzeráty jsou nahoře. Staré klesají.',
    body:
      'Second-handy, malé e-shopy a autobazary <strong>každý den ručně mazaly a znovu přidávaly desítky inzerátů</strong> a konkurence je přes noc stejně zasypala. Tržiště prodávají placenou propagaci, ale malým prodejcům nedávají <strong>vůbec žádnou automatizaci</strong>: ani jedno nemá veřejné API.',
    corpusLabel: 'Tržiště, na která InzerPro přidává inzeráty',
    marketplaces: [
      { id: 'bazos-cz', name: 'Bazoš.cz', detail: 'největší české tržiště, plně automatizované', badge: 'live' },
      { id: 'bazos-sk', name: 'Bazoš.sk', detail: 'slovenská obdoba, plně automatizovaná', badge: 'live' },
      { id: 'bazar-cz', name: 'Bazar.cz', detail: 'přidávání, obnovování a mazání podle plánu', badge: 'live' },
      { id: 'bazar-sk', name: 'Bazar.sk', detail: 'přidávání, obnovování a mazání podle plánu', badge: 'live' },
      { id: 'aukro', name: 'Aukro', detail: 'oficiální partner, spouští se v betě', badge: 'beta' },
    ],
    before: 'Předtím: každý inzerát ručně smazat a znovu přidat, tržiště po tržišti',
  },
  fanout: {
    kicker: '02 / Produkt',
    title: 'Napište ho jednou.',
    lead: 'Vyberte tržiště. InzerPro přidává, obnovuje a maže všude, podle plánu.',
    card: {
      photoAlt: 'Ukázková fotka inzerátu: iPhone 13',
      listingTitle: 'iPhone 13, 128 GB',
      price: '9 990 Kč',
      pill: 'obnovuje se denně · 06:00',
    },
    statusPosted: 'přidáno',
    statusBeta: 'beta',
    hard: [
      { lead: 'Žádné tržiště nenabízí API.', rest: 'Každé napojení je postavené od nuly a udržované při životě, jak se weby mění.' },
      { lead: 'Pět stromů kategorií, jeden výběr.', rest: 'Samotné Aukro má ~5 800 kategorií; převodní tabulka je sloučí do ~165 a opravy jsou úpravy dat, ne releasy.' },
      { lead: 'Každý web něco odmítne.', rest: 'Fotky, sekce a limity se liší podle tržiště; inzeráty se každému přizpůsobí automaticky.' },
    ],
  },
  day: {
    kicker: '03 / Plán',
    title: 'Ráno běží samo.',
    railStart: '00:00',
    railEnd: '24:00',
    events: {
      test: 'noční test přidává skutečné inzeráty',
      reposts: 'spouštějí se obnovení',
      canary: 'kontrola stavu, každou hodinu',
      wake: '07:30 · prodejce vstává, už je nahoře',
    },
  },
  ops: {
    kicker: '04 / Spolehlivost',
    title: 'Když se něco rozbije, vím to první.',
    lead:
      'InzerPro se testuje samo v produkci: každou noc přidává skutečné inzeráty na živá tržiště a každou hodinu kontroluje celou cestu přidání. Jeden e-mail, když se něco rozbije, jeden, když se to obnoví. Zákazníci si málokdy všimnou jednoho či druhého.',
    jobsTitle: 'Naplánované úlohy',
    jobsCaption: 'Ukázka s příkladovými daty; skutečný dashboard je za přihlášením do aplikace.',
    uptime: {
      down: 'výpadek · 1 e-mail',
      back: 'obnoveno · 1 e-mail',
      caption: 'Upozornění jen při změně: šestihodinový výpadek jsou dva e-maily, ne šest.',
    },
    stats: [
      { value: '41', label: 'tabulek, všechny s row-level security' },
      { value: '34', label: 'edge funkcí spouští každou úlohu' },
      { value: '141', label: 'nasazených databázových migrací' },
      { value: '133', label: 'unit testů při každém pushi' },
      { value: '14', label: 'živých scénářů běží každou noc' },
      { value: '55 tis.', label: 'řádků kódu, jeden autor' },
    ],
    statsCaption: 'Noční sada dokonce podepisuje skutečné Stripe webhooky: od checkoutu po změnu tarifu, ověřeno v testovacím režimu.',
  },
  partner: {
    kicker: '05 / Partnerství',
    title: 'Aukro nám dalo oficiální přístup k API.',
    lead:
      'Aukro je největší aukční tržiště v Česku a automatizaci nedávají jen tak někomu, viděli, co InzerPro dělá, a v červnu 2026 nám dali API.',
    card: {
      name: 'Aukro',
      tag: 'Oficiální přístup k API',
      since: 'Od června 2026',
      stats: [
        { value: '#1', label: 'aukční tržiště v Česku' },
        { value: '4 mil.+', label: 'registrovaných uživatelů' },
        { value: '2003', label: 'obchoduje se od roku' },
        { value: '~5 800', label: 'kategorií v jejich stromu' },
      ],
    },
    certTitle: 'Prošli jsme jejich certifikací, každým krokem',
    cert: [
      'Přihlášení k účtu',
      'Strom kategorií',
      'Povinné atributy',
      'Nahrání fotek',
      'Inzerát vytvořen',
      'Cena upravena',
      'Inzerát ukončen',
    ],
    certCaption:
      'Celý proces inzerátu prošel na certifikačním prostředí Aukra. Nejdřív beta prodejci, potom všichni.',
    rows: [
      { lead: 'Aukro přišlo za námi.', rest: 'Seznámila nás česká e-commerce agentura a jejich obchodníci nám přístup k API nabídli, nemuseli jsme na to tlačit.' },
      { lead: 'Jedno skutečné API, čtyři postavená ručně.', rest: 'Aukro je tu jediné tržiště, které vůbec má API, zbytek jsme postavili sami a udržujeme při životě, jak se weby mění.' },
      { lead: '5 800 kategorií do 165.', rest: 'Jen jejich strom kategorií je třicetkrát větší než výběr, který vidí prodejce, zmapovali jsme ho jednou a držíme ho jako data.' },
    ],
  },
  depth: {
    kicker: '06 / Víc než obnovování',
    title: 'Obnovování přivedlo prodejce. Rostlo to dál.',
    lead: 'Obrazovky níže jsou z vlastního demo režimu produktu.',
    items: [
      {
        title: 'Trendy trhu',
        caption: 'Živá historie cen, skóre poptávky a doporučená cena pro jakýkoli produkt, který prodejce zadá.',
      },
      {
        title: 'CRM kupujících',
        caption: 'Každá konverzace sledovaná na kanbanu od první zprávy po prodej, napříč všemi tržišti.',
      },
      {
        title: 'Ochrana před podvody',
        caption: 'Kupující se prověřují v české databázi podvodů podvodnabazaru.cz; známí podvodníci jsou označeni přímo během chatu.',
      },
    ],
  },
  cta: {
    eyebrow: 'Přijímám nové projekty',
    title: 'Máte proces, který má řešit počítač?',
    body:
      'InzerPro automatizuje ruční každodenní proces od začátku do konce, s platícími zákazníky. Pokud váš tým pálí hodiny na takové práci, postavím systém, který ji převezme.',
    book: 'Rezervovat úvodní hovor',
    email: 'Napište mi',
    outcome: 'Proces, který běží sám, s monitoringem, který to dokazuje.',
  },
};

export default inzerproCaseStudy;
