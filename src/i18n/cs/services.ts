// Services page copy. Arrays (signals, services, steps) are zipped by index
// against icon/stat data that stays in the component.
const services = {
  featured: {
    eyebrow: 'Novinka',
    title: 'AI zaměstnanec pro celou firmu',
    body: 'Jeden agent napojený na všechny nástroje firmy, se kterým si tým jen píše. K dispozici je živá interaktivní ukázka.',
    cta: 'Zobrazit AI zaměstnance',
  },

  seoTitle: 'AI konzultace a automatizace',
  seoDescription:
    'AI konzultace a automatizace pro týmy: automatizace procesů, porozumění dokumentům a RAG, AI agenti a privátní on-premise nasazení. Eduard Hvižďák vše nadefinuje, postaví a dodá od začátku do konce.',

  heroEyebrow: 'AI konzultace a automatizace',
  heroTitle: 'Stavím AI systémy, které se samy zaplatí.',
  heroLead:
    'Pomáhám týmům nasadit AI na reálné problémy: automatizuju ruční práci, která je zdržuje, dělám z jejich dokumentů něco, v čem se dá vyhledávat, a nasazuju systémy, které spolehlivě běží v produkci. Nadefinuju, postavím a dodám od začátku do konce.',
  ctaConsult: 'Rezervovat konzultaci zdarma',
  ctaAltPrefix: 'Radši píšete? Napište mi na',
  ctaAltOr: 'nebo zavolejte na',
  ctaRepeatTitle: 'Máte proces, který by měl běžet sám?',

  sectionServices: 'Služby',
  sectionDemo: 'Naživo',
  sectionWhyMe: 'Proč já',
  sectionProcess: 'Postup',
  sectionMethod: 'Metoda',

  demoTitle: 'Podívejte se naživo',
  demoLead:
    'Živé interaktivní ukázky systémů, které stavím: pipeline agentů, běh fungujícího asistenta a nástroje, na které se napojuje.',

  signalKicker: 'Dodáno, v produkci, ve velkém',
  signals: [
    { value: 'Miliony', label: 'veřejných zakázek zařazených do kategorií a zpřístupněných k vyhledávání, paralelně' },
    { value: '200 tis.+', label: 'studentů využívá AI asistenta na 10 evropských univerzitách' },
    { value: 'Od začátku do konce', label: 'jeden člověk to nadefinuje, postaví, dodá a předá' },
  ],

  whatIDo: 'Co dělám',
  youGet: 'Dostanete',
  services: [
    {
      question: 'Pořád každé ráno kopírujete data mezi nástroji?',
      outcome:
        'Zautomatizuju celou rutinu od začátku do konce, aby běžela bez dohledu a člověka zavolala, jen když je ho opravdu potřeba.',
      deliverables: ['rozbor procesu', 'postavená a nasazená pipeline', 'upozornění při chybě', 'předávací dokumentace'],
    },
    {
      question: 'Deset let dokumentů a nikdo v nich nic nenajde?',
      outcome:
        'Zeptáte se běžnou řečí a dostanete odpověď s citací přesného zdroje, napříč vším, co jste kdy uložili.',
      deliverables: ['vyhledávání nad všemi dokumenty', 'odpovědi s citacemi', 'sada testů přesnosti'],
    },
    {
      question: 'Topíte se v práci, kterou by agent stihl přes noc?',
      outcome:
        'Předáte celý proces, ne chatovací okno: agent čte, zkoumá, ověřuje a jedná, a svou práci umí doložit.',
      deliverables: ['agentní workflow na míru', 'mantinely a logy', 'kontrola člověkem'],
    },
    {
      question: 'Nesmíte posílat data do cloudu?',
      outcome:
        'Stejná síla na vašem vlastním hardwaru: privátní modely, řízení přístupů a nic citlivého neopustí budovu.',
      deliverables: ['on-prem nasazení', 'auditní logy', 'žádný odtok dat'],
    },
  ],

  whyMe: 'Proč pracovat se mnou',
  proof: [
    'Reálné produkční systémy s platícími zákazníky (InzerPro, NasadClaw, KouzelnikNaAkci), ne dema, která po prezentaci zhasnou.',
    'RAG v praxi: vektorové vyhledávání, BM25, MMR retrieval a přeřazování přes LLM, k tomu ověřování faktů, aby odpovědi vycházely ze zdroje.',
    'Neefektní části jsou pořešené: naplánované úlohy, které se spustí včas, fakturace přes Stripe s trialy a řešením neúspěšných plateb, autentizace, rate limity, zabezpečení on-prem.',
    'Jeden člověk, od začátku do konce. Žádné vrstvy agentury, žádné předávání, žádný account manažer mezi vámi a člověkem, který píše kód.',
  ],

  howItWorks: 'Jak to probíhá',
  steps: [
    { title: 'Úvodní hovor', body: 'Krátký hovor, na kterém najdeme konkrétní úzké místo, koho pálí a kolik hodin nebo peněz doopravdy stojí dobrý výsledek.' },
    { title: 'Rozsah a pevná cena', body: 'Písemný rozsah s jedním jasným výstupem, harmonogramem a pevnou cenou. Přesně víte, co dostanete a kolik to stojí, ještě než začneme.' },
    { title: 'Stavím na očích', body: 'Stavím v krátkých cyklech a brzy ukazuju funkční software, takže korigujeme směr, dokud je změna ještě levná.' },
    { title: 'Nasazení a předání', body: 'Vše naběhne ve vašem prostředí, zdokumentované, s předáním, aby to váš tým uměl provozovat i beze mě na paušálu.' },
  ],

  howEyebrow: 'Pod kapotou',
  howTitle: 'Jak doopravdy stavím',
  howLead:
    'AI sama produkční software nedodá. Tohle jsou živé vizualizace reálné inženýrské práce s AI ve velkém, ukázka toho, jak vedu práci: spousta agentů paralelně, protivník, který loví každou chybu, a nic se nemergne, dokud to není všude zelené.',

  adversarialTitle: 'Protivnická revize',
  adversarialSubtitle: 'Jeden agent píše kód, druhý má za úkol ho zlomit. Takhle držím kód od AI poctivý, ještě než se vůbec dostane k vám.',
  errorsTitle: 'Chyby, odstraněné paralelně',
  errorsSubtitle: 'Tisíce chyb kompilátoru rozdělených mezi spoustu agentů a worktree, pak odbavených po dávkách. Takhle paralelizuju migraci, která by jednomu člověku zabrala měsíce.',
  greenTitle: 'Dodáno až když je zeleno',
  greenSubtitle: 'Každá změna dohnaná do zelena na všech platformách, než se dodá. Nic nejde do provozu na červeném buildu.',
  deliveryTitle: 'Dodávka, hodinu po hodině',
  deliverySubtitle: 'Aktivita commitů po hodinách během sprintu: jak vypadá vyrovnaná dodávka s vysokou propustností.',
  historyTitle: 'Celá historie, přehraná znovu',
  historySubtitle: 'Celá práce přehraná commit po commitu: rozsah změn za jedním dodaným výsledkem.',
};

export default services;
