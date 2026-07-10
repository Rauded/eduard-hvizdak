// Unlisted AI-employee proposal page. Text-only: icons, on/off flags, and the
// featured/number metadata stay in the component; every visible string lives
// here. Lists are arrays so a locale override replaces them wholesale.
const aiEmployee = {
  seo: {
    title: 'AI zaměstnanec pro celou vaši firmu',
    description:
      'Jeden AI agent napojený na celou vaši firmu, se kterým váš tým chatuje, který zkoumá napříč všemi nástroji, vytváří hotovou práci a běží bezpečně s přístupem po jednotlivých uživatelích a s kompletní auditní stopou.',
  },
  hero: {
    eyebrow: 'Soukromá nabídka · AI zaměstnanec',
    title: 'Jeden AI agent, který zná celou vaši firmu.',
    lead:
      'Ne další chatbot přišroubovaný k jedné aplikaci. Jeden agent, se kterým celý váš tým mluví ve Slacku i na webu, napojený na nástroje, které už používáte, který zkoumá napříč všemi, vytvoří hotovou práci a dělá to v bezpečnostním modelu, který vaše IT může schválit.',
    book: 'Rezervovat úvodní hovor',
    email: 'Napište mi',
    call: 'Zavolejte',
  },
  what: {
    title: 'Co vlastně dělá',
  },
  capabilities: [
    {
      title: 'Zeptejte se ho na cokoli o firmě',
      body: 'Jedno pole pro chat ve Slacku i na webu. Ví, kde odpověď leží, vytáhne ji ze správného systému a odpoví s připojeným zdrojem.',
    },
    {
      title: 'Zkoumá napříč všemi nástroji naráz',
      body: 'Otázka, která dřív znamenala projít pět aplikací a napsat třem lidem, je zodpovězená za minutu, se stopou, kde všude se hledalo.',
    },
    {
      title: 'Vytvoří hotový výstup',
      body: 'Aktualizovaná prezentace, návrh odpovědi na smlouvu, vyplněné RFP, shrnutí tiketu. Reálný výstup zpět ve vašich nástrojích, ne chatová zpráva, která vám říká, co změnit.',
    },
    {
      title: 'Jedná dřív, než ho o to požádáte',
      body: 'Přijde tiket, dorazí recenze, blíží se termín. Udělá první průchod a člověka zapojí, jen když je opravdu potřeba úsudek.',
    },
  ],
  connectors: {
    kicker: 'Napojí se na nástroje, které už používáte',
    note: 'Pokud to má API nebo přihlášení, skoro určitě to jde napojit. Tohle jsou ty běžné; váš přesný stack nadefinujeme v úvodní fázi.',
    labels: [
      'Slack',
      'E-mail',
      'GitHub',
      'CRM',
      'Tabulky',
      'Drive / Docs',
      'Vaše databáze',
      'Helpdesk',
      'Kalendář',
      'Interní wiki',
    ],
  },
  security: {
    eyebrow: 'Ta část, díky které řeknete ano',
    title: 'Postaveno tak, aby se mu dalo svěřit vše',
    lead:
      'Dát jednomu agentovi dosah přes celou firmu je bezpečné jen se správnými mantinely. Ty jsou nezpochybnitelné a jsou tam od prvního dne, ne přišroubované později.',
    cards: [
      {
        title: 'Dědí přístup každého člověka',
        body: 'Agent vidí jen to, co daný zaměstnanec už vidět smí. Nikdo nedostane zadní vrátka k datům, která by sám neotevřel.',
      },
      {
        title: 'Každá akce je zalogovaná',
        body: 'Kompletní auditní stopa toho, co se přečetlo, co se udělalo a jménem koho. Vždy zodpovíte otázku „kdo se toho dotkl a kdy“.',
      },
      {
        title: 'Pravidla vynucená v každém kroku',
        body: 'Citlivé systémy a data zákazníků jsou ohrazené pravidly, která se kontrolují při každém volání nástroje, ne ponechané na tom, aby si je model zapamatoval.',
      },
      {
        title: 'Běží tam, kde jsou vaše data',
        body: 'V cloudu, ve vašem vlastním tenantu, nebo plně na vašich serverech pro regulovanou práci. Nic citlivého nemusí opustit vaši budovu. V základu v EU a s ohledem na GDPR.',
      },
    ],
  },
  process: {
    title: 'Jak spolupráce probíhá',
    steps: [
      {
        title: 'Úvodní workshop',
        dur: '0. týden, půl dne',
        body: 'Zmapujeme práci, kterou váš tým opravdu dělá, nástroje, kterých se ta práce dotýká, a kde utíkají hodiny. Vybereme jeden vlajkový proces, na kterém přínos nejdřív dokážeme, a shodneme se, kolik má dobrý výsledek za hodnotu.',
      },
      {
        title: 'Rozsah, bezpečnostní revize, pevná cena',
        dur: '0.-1. týden',
        body: 'Dostanete písemný rozsah: které systémy se napojí, kdo dostane přístup, bezpečnostní model, jednu měřitelnou metriku úspěchu, harmonogram a pevnou cenu. Vaše IT schválí přístupy dřív, než se cokoli napojí.',
      },
      {
        title: 'Stavba pilotu',
        dur: '1.-3. týden',
        body: 'Napojím první nástroje, postavím agenta ve Slacku i na webu za přístupovou bránou a dodám vlajkový proces. Používáte ho a dáváte zpětnou vazbu, dokud je změna ještě levná.',
      },
      {
        title: 'Nasazení do celé firmy',
        dur: '3.-10. týden',
        body: 'Rozšíříme to: víc konektorů, víc procesů, proaktivní automatizace, zápis výstupů zpět do vašich systémů. Přístupy, auditní logování a kontrola nákladů se s rostoucí plochou utužují.',
      },
      {
        title: 'Předání a péče',
        dur: 'Průběžně',
        body: 'Zdokumentované, se zaškolením vašeho týmu, aby to běželo beze mě. Pak volitelný plán péče drží konektory zdravé, ladí náklady a přidává nové procesy, jak je objevujete.',
      },
    ],
  },
  pricing: {
    title: 'Investice',
    lead:
      'Pevné ceny, písemně nadefinované, než začneme. Čísla jsou výchozím bodem; přesnou částku určí úvodní hovor. Spotřeba modelu se vždy účtuje v nákladové ceně, s měřičem, který vidíte.',
    tiers: [
      {
        name: 'Důkaz přínosu',
        tag: 'Začněte tady',
        price: 'od 4 900 €',
        priceNote: 'pevná, jednorázová',
        dur: '~3 týdny',
        blurb: 'Dokažte, že to na jednom procesu ušetří reálné hodiny, ještě před větším závazkem.',
        features: [
          'Jeden tým, jeden vlajkový proces',
          'Až 3 napojené nástroje',
          'Chat ve Slacku i na webu',
          'Přístup po uživatelích + auditní logování',
          'Měřeno proti jedné metrice úspěchu',
          'Nasazení do celé firmy',
          'Proaktivní automatizace',
          'Průběžná péče',
        ],
        cta: 'Rezervovat úvodní hovor',
      },
      {
        name: 'Nasazení do firmy',
        tag: 'Většina týmů',
        price: 'od 18 000 €',
        priceNote: 'pevná, projekt',
        dur: '6 až 10 týdnů',
        blurb: 'Jeden agent napříč celou firmou, napojený na váš stack a předaný vašemu týmu.',
        features: [
          'Jediný agent pro celou firmu',
          'Až ~8 napojených nástrojů',
          'Zabezpečená přístupová brána + kompletní auditní stopa',
          'Proaktivní automatizace',
          'Zapisuje hotové výstupy zpět do vašich nástrojů',
          'Možnost nasazení on-prem / ve vašem tenantu',
          'Zaškolení týmu + kompletní dokumentace k předání',
          'Vše z Důkazu přínosu',
        ],
        cta: 'Rezervovat úvodní hovor',
      },
      {
        name: 'Péče a růst',
        tag: 'Po spuštění',
        price: 'od 1 900 €',
        priceNote: 'měsíčně',
        dur: 'průběžně, zrušíte kdykoli',
        blurb: 'Udržuje to zdravé a rostoucí: nové procesy, ladění nákladů, monitoring, měsíční report o výsledcích.',
        features: [
          'Konektory funkční i při změnách vašich nástrojů',
          'Každý měsíc přidané nové procesy',
          'Směrování modelů + optimalizace nákladů',
          'Monitoring, dostupnost a triáž chyb',
          'Měsíční report o výsledcích',
          'Přednostní přístup ke mně',
          'Spotřeba modelu / API účtovaná v nákladové ceně',
          'Žádné vázání, zrušíte kdykoli',
        ],
        cta: 'Přidat po dokončení stavby',
      },
    ],
  },
  provide: {
    title: 'Co dodáte vy',
    items: [
      'Rozhodovatele, který může schválit, na které systémy se agent napojí.',
      'Administrátorský nebo API přístup k nástrojům v rozsahu (Slack, e-mail, CRM, dokumenty, databáze a tak dál), udělený přes váš běžný IT proces.',
      'Jednoho člověka za tým, který pojmenuje procesy, jež žerou nejvíc času.',
      'Krátký seznam toho, co se počítá za citlivá data, ať to správně ohradíme.',
      'Schválení bezpečnostního modelu, než cokoli naběhne.',
    ],
  },
  faq: {
    title: 'Otázky, které si nejspíš kladete',
    items: [
      {
        q: 'Jsou naše data v bezpečí, když jeden agent vidí všechno?',
        a: 'Nikdy nevidí víc, než už vidí člověk, který ho používá. Přístup se dědí po jednotlivých zaměstnancích, každá akce je zalogovaná, pravidla se vynucují při každém volání nástroje, a pro regulovanou práci běží celé na vaší vlastní infrastruktuře, takže nic citlivého neopustí vaši budovu.',
      },
      {
        q: 'Musíme nahradit naše současné nástroje?',
        a: 'Ne. Agent leží nad vašimi stávajícími nástroji. GitHub drží kód, vaše CRM drží klienty, váš disk drží dokumenty. Agent je vrstva, která z nich čte a do nich zapisuje.',
      },
      {
        q: 'Kolik stojí provoz, když je hotový?',
        a: 'Dvě věci: volitelný plán péče a spotřeba modelu účtovaná v nákladové ceně. Spotřeba roste s tím, jak moc se na to tým spoléhá. Nastavím směrování tak, aby každý úkol použil nejlevnější model, který ho zvládne dobře, a čísla vám ukážu.',
      },
      {
        q: 'Co když se pilot neosvědčí?',
        a: 'Přesně proto se začíná malým a pevně naceněným krokem. Dostanete funkční systém a jasný přehled o ušetřených hodinách, než se rozhodnete, zda ho nasadit do celé firmy. Žádné výdaje s otevřeným koncem.',
      },
    ],
  },
};

export default aiEmployee;
