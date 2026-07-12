const services = {
  featured: {
    eyebrow: 'Novinka',
    title: 'AI zamestnanec pre celú firmu',
    body: 'Jeden agent napojený na všetky nástroje firmy, s ktorým sa tím len rozpráva. K dispozícii je živá interaktívna ukážka.',
    cta: 'Pozrieť AI zamestnanca',
  },

  seoTitle: 'AI konzultácie a automatizácia',
  seoDescription:
    'AI konzultácie a automatizácia pre tímy: automatizácia procesov, spracovanie dokumentov a RAG, AI agenti a súkromné nasadenie on-premise. Od návrhu cez vývoj až po odovzdanie realizuje Eduard Hvižďák.',

  heroEyebrow: 'AI konzultácie a automatizácia',
  heroTitle: 'Staviam AI systémy, ktoré sa zaplatia samy.',
  heroLead:
    'Pomáham tímom nasadiť AI na reálne problémy: automatizujem manuálnu prácu, ktorá ich spomaľuje, sprístupňujem odpovede z ich dokumentov a nasadzujem systémy, ktoré spoľahlivo bežia v produkcii. Od návrhu cez vývoj až po odovzdanie.',
  ctaConsult: 'Rezervovať bezplatnú konzultáciu',
  ctaAltPrefix: 'Radšej píšete? Napíšte mi na',
  ctaAltOr: 'alebo zavolajte na',
  ctaRepeatTitle: 'Máte proces, ktorý by mal bežať sám?',

  sectionServices: 'Služby',
  sectionDemo: 'Naživo',
  sectionWhyMe: 'Prečo ja',
  sectionProcess: 'Postup',
  sectionMethod: 'Metóda',

  demoTitle: 'Pozrite si to naživo',
  demoLead:
    'Živé interaktívne ukážky systémov, ktoré staviam: pipeline agentov, beh fungujúceho asistenta a nástroje, na ktoré sa napája.',

  signalKicker: 'Nasadené, v produkcii, vo veľkom rozsahu',
  signals: [
    { value: 'Milióny', label: 'verejných zmlúv paralelne zaradených do kategórií a sprístupnených na vyhľadávanie' },
    { value: '200k+', label: 'študentov na platforme digitálneho kampusu 10 európskych univerzít, kam som nasadil AI asistenta' },
    { value: 'Od začiatku po koniec', label: 'jeden človek to navrhne, postaví, nasadí a odovzdá' },
  ],

  whatIDo: 'Čo robím',
  youGet: 'Dostanete',
  services: [
    {
      question: 'Ešte stále každé ráno kopírujete dáta medzi nástrojmi?',
      outcome:
        'Zautomatizujem celú rutinu od začiatku po koniec, aby bežala bez dozoru a človeka zavolala len vtedy, keď ho naozaj treba.',
      deliverables: ['rozbor procesu', 'postavená a nasadená pipeline', 'notifikácie pri chybe', 'odovzdávacia dokumentácia'],
    },
    {
      question: 'Desať rokov dokumentov a nikto v nich nič nenájde?',
      outcome:
        'Spýtate sa bežným jazykom a dostanete odpoveď s citáciou presného zdroja, naprieč všetkým, čo ste kedy uložili.',
      deliverables: ['vyhľadávanie nad všetkými dokumentmi', 'odpovede s citáciami', 'sada testov presnosti'],
    },
    {
      question: 'Topíte sa v práci, ktorú by agent stihol cez noc?',
      outcome:
        'Odovzdáte celý proces, nie chatovacie okno: agent číta, skúma, overuje a koná, a svoju prácu vie ukázať.',
      deliverables: ['agentový workflow na mieru', 'mantinely a logy', 'kontrola človekom'],
    },
    {
      question: 'Nesmiete posielať dáta do cloudu?',
      outcome:
        'Rovnaká sila na vašom vlastnom hardvéri: súkromné modely, riadenie prístupov a nič citlivé neopustí budovu.',
      deliverables: ['on-prem nasadenie', 'auditné logy', 'žiadny odtok dát'],
    },
  ],

  whyMe: 'Prečo spolupracovať so mnou',
  proof: [
    'Vlastné produkty v produkcii: InzerPro (platiaci zákazníci), NasadClaw a KouzelnikNaAkci. Nie demá, ktoré po prezentácii zaniknú.',
    'RAG v ostrej prevádzke: vektorové vyhľadávanie, BM25, MMR retrieval a preraďovanie cez LLM, plus overovanie faktov, aby odpovede zostali podložené zdrojom.',
    'Vyriešené sú aj neatraktívne časti: naplánované úlohy, ktoré sa spustia načas, fakturácia cez Stripe so skúšobnými obdobiami a obnovou po neúspešnej platbe, autentifikácia, rate limity, hardening pre on-prem.',
    'Jeden človek, od začiatku po koniec. Žiadne vrstvy agentúry, žiadne odovzdávanie, žiadny account manažér medzi vami a človekom, ktorý píše kód.',
  ],

  howItWorks: 'Ako to prebieha',
  steps: [
    { title: 'Úvodný hovor', body: 'Krátky hovor, aby sme našli konkrétne úzke miesto, koho zaťažuje a akú hodnotu v hodinách či peniazoch má dobrý výsledok.' },
    { title: 'Rozsah a pevná cena', body: 'Písomný rozsah s jedným jasným výstupom, harmonogram a pevná cena. Presne viete, čo dostanete a koľko to stojí, ešte pred začiatkom.' },
    { title: 'Vývoj otvorene', body: 'Staviam v krátkych cykloch a fungujúci softvér ukazujem skoro, aby sme smer korigovali, kým je zmena ešte lacná.' },
    { title: 'Nasadenie a odovzdanie', body: 'Spustí sa vo vašom prostredí, zdokumentované, s odovzdaním, aby ho váš tím vedel prevádzkovať aj bezo mňa.' },
  ],

  howEyebrow: 'Pod kapotou',
  howTitle: 'Ako to naozaj staviam',
  howLead:
    'AI nenasadí produkčný softvér sama. Toto sú živé vizualizácie reálneho, rozsiahleho inžinierskeho projektu s pomocou AI, ukázané ako príklad toho, ako vediem prácu: veľa agentov paralelne, recenzent-protivník, ktorý loví každú chybu, a nič sa nezlúči, kým to nie je zelené všade.',

  adversarialTitle: 'Kontrola protivníkom',
  adversarialSubtitle: 'Jeden agent píše kód, druhý agent má za úlohu ho zlomiť. Takto udržím kód generovaný AI poctivý ešte predtým, než sa dostane k vám.',
  errorsTitle: 'Chyby, odstránené paralelne',
  errorsSubtitle: 'Tisíce chýb kompilátora rozdelené medzi mnoho agentov a worktree, potom odstránené po dávkach. Takto paralelizujem migráciu, ktorá by jednému človeku trvala mesiace.',
  greenTitle: 'Nasadené, len keď je zelené',
  greenSubtitle: 'Každá zmena pretekaná do zelenej naprieč všetkými platformami, ešte pred nasadením. Nič nejde do prevádzky na červenom builde.',
  deliveryTitle: 'Dodávka, hodinu po hodine',
  deliverySubtitle: 'Aktivita commitov po hodinách počas šprintu: ako vyzerá stabilné dodávanie s vysokou priepustnosťou.',
  historyTitle: 'Celá história, prehratá znovu',
  historySubtitle: 'Celý projekt prehratý commit po commite: rozsah zmien za jediným nasadeným výsledkom.',
};

export default services;
