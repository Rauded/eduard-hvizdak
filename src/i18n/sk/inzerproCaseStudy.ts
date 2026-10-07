// Slovak copy for the InzerPro case study. Same keys and array lengths as
// en/inzerproCaseStudy.ts (arrays replace the English ones wholesale, so a
// missing item drops an element). marketplaces[].id and .badge are logic keys
// and stay as in English. The rule from the English file applies here too:
// never describe how the marketplace integrations work. Thousands are written
// with a non-breaking space ( ).
const inzerproCaseStudy = {
  back: 'Späť na projekty',
  seo: {
    title: 'InzerPro: automatické pridávanie inzerátov na trhoviská, prípadová štúdia',
    description:
      'SaaS, ktorý pridáva, obnovuje a maže inzeráty na 4 českých a slovenských trhoviskách bez verejného API. Postavil a prevádzkuje ho jeden človek, každú hodinu sa monitoruje a každú noc testuje na živých weboch.',
  },
  hero: {
    eyebrow: 'Prípadová štúdia · InzerPro, vlastný produkt',
    title: 'Jeden inzerát. Každé trhovisko. Podľa plánu.',
    lead:
      'Na českých a slovenských bazárových trhoviskách rozhoduje o viditeľnosti vek inzerátu a veľkí predajcovia každé ráno ručne obnovovali desiatky inzerátov. InzerPro to robí za nich, bez dozoru.',
    live: 'Pozrite si to naživo na inzerpro.cz',
    liveUrl: 'https://www.inzerpro.cz',
    figureCaption: 'Produkčný dashboard: jeden inzerát, pridávaný a obnovovaný naprieč trhoviskami podľa plánu.',
    book: 'Dohodnúť si úvodný hovor',
    email: 'Napíšte mi',
    meta: [
      { k: 'Pre koho', v: 'Veľkí predajcovia na trhoviskách' },
      { k: 'Rola', v: 'Sólo zakladateľ, od návrhu po produkciu' },
      { k: 'Stav', v: 'Naživo na inzerpro.cz, platiaci zákazníci' },
    ],
  },
  metrics: [
    { value: '4', label: 'trhoviská plne automatizované' },
    { value: '~165', label: 'kategórií, jeden výber pre všetky' },
    { value: '24/7', label: 'naplánované pridávanie bez dozoru' },
    { value: '1', label: 'človek, od návrhu po on-call' },
  ],
  problem: {
    kicker: '01 / Problém',
    title: 'Nové inzeráty sú hore. Staré klesajú.',
    body:
      'Second-handy, malé e-shopy a autobazáre <strong>každý deň ručne mazali a nanovo pridávali desiatky inzerátov</strong> a konkurencia ich cez noc aj tak zasypala. Trhoviská predávajú platenú propagáciu, ale malým predajcom nedávajú <strong>vôbec žiadnu automatizáciu</strong>: ani jedno nemá verejné API.',
    corpusLabel: 'Trhoviská, na ktoré InzerPro pridáva inzeráty',
    marketplaces: [
      { id: 'bazos-cz', name: 'Bazoš.cz', detail: 'najväčšie české trhovisko, plne automatizované', badge: 'live' },
      { id: 'bazos-sk', name: 'Bazoš.sk', detail: 'slovenská obdoba, plne automatizovaná', badge: 'live' },
      { id: 'bazar-cz', name: 'Bazar.cz', detail: 'pridávanie, obnovovanie a mazanie podľa plánu', badge: 'live' },
      { id: 'bazar-sk', name: 'Bazar.sk', detail: 'pridávanie, obnovovanie a mazanie podľa plánu', badge: 'live' },
      { id: 'aukro', name: 'Aukro', detail: 'oficiálny partner, spúšťa sa v bete', badge: 'beta' },
    ],
    before: 'Predtým: každý inzerát ručne zmazať a nanovo pridať, trhovisko po trhovisku',
  },
  fanout: {
    kicker: '02 / Produkt',
    title: 'Napíšte ho raz.',
    lead: 'Vyberte trhoviská. InzerPro pridáva, obnovuje a maže všade, podľa plánu.',
    card: {
      photoAlt: 'Ukážková fotka inzerátu: iPhone 13',
      listingTitle: 'iPhone 13, 128 GB',
      price: '9 990 Kč',
      pill: 'obnovuje sa denne · 06:00',
    },
    statusPosted: 'pridané',
    statusBeta: 'beta',
    hard: [
      { lead: 'Žiadne trhovisko neponúka API.', rest: 'Každé napojenie je postavené od nuly a udržiavané pri živote, ako sa weby menia.' },
      { lead: 'Päť stromov kategórií, jeden výber.', rest: 'Samotné Aukro má ~5 800 kategórií; prevodná tabuľka ich zlúči do ~165 a opravy sú úpravy dát, nie releasy.' },
      { lead: 'Každý web niečo odmietne.', rest: 'Fotky, sekcie a limity sa líšia podľa trhoviska; inzeráty sa každému prispôsobia automaticky.' },
    ],
  },
  day: {
    kicker: '03 / Plán',
    title: 'Ráno beží samo.',
    railStart: '00:00',
    railEnd: '24:00',
    events: {
      test: 'nočný test pridáva skutočné inzeráty',
      reposts: 'spúšťajú sa obnovenia',
      canary: 'kontrola stavu, každú hodinu',
      wake: '07:30 · predajca vstáva, už je hore',
    },
  },
  ops: {
    kicker: '04 / Spoľahlivosť',
    title: 'Keď sa niečo pokazí, viem to prvý.',
    lead:
      'InzerPro sa testuje samo v produkcii: každú noc pridáva skutočné inzeráty na živé trhoviská a každú hodinu kontroluje celú cestu pridania. Jeden e-mail, keď sa niečo pokazí, jeden, keď sa to obnoví. Zákazníci si málokedy všimnú jedno či druhé.',
    jobsTitle: 'Naplánované úlohy',
    jobsCaption: 'Ukážka s príkladovými dátami; skutočný dashboard je za prihlásením do aplikácie.',
    uptime: {
      down: 'výpadok · 1 e-mail',
      back: 'obnovené · 1 e-mail',
      caption: 'Upozornenia len pri zmene: šesťhodinový výpadok sú dva e-maily, nie šesť.',
    },
    stats: [
      { value: '41', label: 'tabuliek, všetky s row-level security' },
      { value: '34', label: 'edge funkcií spúšťa každú úlohu' },
      { value: '141', label: 'nasadených databázových migrácií' },
      { value: '133', label: 'unit testov pri každom pushi' },
      { value: '14', label: 'živých scenárov beží každú noc' },
      { value: '55k', label: 'riadkov kódu, jeden autor' },
    ],
    statsCaption: 'Nočná sada dokonca podpisuje skutočné Stripe webhooky: od checkoutu po zmenu tarify, overené v testovacom režime.',
  },
  partner: {
    kicker: '05 / Partnerstvo',
    title: 'Aukro nám dalo oficiálny prístup k API.',
    lead:
      'Aukro je najväčšie aukčné trhovisko v Česku a automatizáciu nedávajú len tak hocikomu, videli, čo InzerPro robí, a v júni 2026 nám dali API.',
    card: {
      name: 'Aukro',
      tag: 'Oficiálny prístup k API',
      since: 'Od júna 2026',
      stats: [
        { value: '#1', label: 'aukčné trhovisko v Česku' },
        { value: '4M+', label: 'registrovaných používateľov' },
        { value: '2003', label: 'obchoduje sa od roku' },
        { value: '~5 800', label: 'kategórií v ich strome' },
      ],
    },
    certTitle: 'Prešli sme ich certifikáciou, každým krokom',
    cert: [
      'Prihlásenie do účtu',
      'Strom kategórií',
      'Povinné atribúty',
      'Nahranie fotiek',
      'Inzerát vytvorený',
      'Cena upravená',
      'Inzerát ukončený',
    ],
    certCaption:
      'Celý proces inzerátu prešiel na certifikačnom prostredí Aukra. Najprv beta predajcovia, potom všetci.',
    rows: [
      { lead: 'Aukro prišlo za nami.', rest: 'Zoznámila nás česká e-commerce agentúra a ich obchodníci nám prístup k API ponúkli, nemuseli sme na to tlačiť.' },
      { lead: 'Jedno skutočné API, štyri postavené ručne.', rest: 'Aukro je tu jediné trhovisko, ktoré vôbec má API, zvyšok sme postavili sami a udržiavame pri živote, ako sa weby menia.' },
      { lead: '5 800 kategórií do 165.', rest: 'Len ich strom kategórií je tridsaťkrát väčší než výber, ktorý vidí predajca, zmapovali sme ho raz a držíme ho ako dáta.' },
    ],
  },
  depth: {
    kicker: '06 / Viac než obnovovanie',
    title: 'Obnovovanie priviedlo predajcov. Rástlo to ďalej.',
    lead: 'Obrazovky nižšie sú z vlastného demo režimu produktu.',
    items: [
      {
        title: 'Trendy trhu',
        caption: 'Živá história cien, skóre dopytu a odporúčaná cena pre akýkoľvek produkt, ktorý predajca zadá.',
      },
      {
        title: 'CRM kupujúcich',
        caption: 'Každá konverzácia sledovaná na kanbane od prvej správy po predaj, naprieč všetkými trhoviskami.',
      },
      {
        title: 'Ochrana pred podvodmi',
        caption: 'Kupujúci sa preverujú v českej databáze podvodov podvodnabazaru.cz; známi podvodníci sú označení priamo počas chatu.',
      },
    ],
  },
  cta: {
    eyebrow: 'Prijímam nové projekty',
    title: 'Máte proces, ktorý má riešiť počítač?',
    body:
      'InzerPro automatizuje ručný každodenný proces od začiatku po koniec, s platiacimi zákazníkmi. Ak váš tím páli hodiny na takejto práci, postavím systém, ktorý ju prevezme.',
    book: 'Dohodnúť si úvodný hovor',
    email: 'Napíšte mi',
    outcome: 'Proces, ktorý beží sám, s monitoringom, ktorý to dokazuje.',
  },
};

export default inzerproCaseStudy;
