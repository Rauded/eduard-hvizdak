// ═══════════════════════════════════════════════════════════════
//  Shared project data: single source of truth for the homepage
//  Projects section AND the /portfolio page.
// ═══════════════════════════════════════════════════════════════

// ─── Safe asset loader ───────────────────────────────────────────
// require() throws at build time if the file is missing, which would
// break the whole bundle. assetSafe() swallows that so we can declare
// a video "slot" (e.g. inzerpro.mp4) before the file exists; the card
// falls back to a poster/placeholder until the real file is dropped in.
export function asset(path: string): string {
  return require(`../../assets/projects/${path}`);
}

export function assetSafe(path: string): string | null {
  try {
    return require(`../../assets/projects/${path}`);
  } catch {
    return null;
  }
}

// ─── Types ───────────────────────────────────────────────────────
export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo';
  // Optional brand favicon (path under public/) shown on the link instead of
  // the generic arrow, e.g. the destination site's own icon.
  favicon?: string;
}

export interface ProjectMedia {
  type: 'video' | 'slideshow' | 'image' | 'concept' | 'placeholder';
  video?: string | null;
  poster?: string;
  images?: string[];
}

// A keyword-rich case study that is ALWAYS rendered into the DOM (collapsed
// visually, but present in the HTML) so search engines, LLM crawlers, and GEO
// indexers get the full problem→solution narrative + tech keywords for every
// project, whether or not a visitor clicks to expand it.
export interface CaseStudy {
  problem: string;     // what problem it solves / the pain
  motivation: string;  // the "why" behind building it
  challenges: string;  // what went wrong / hard parts we hit
  solution: string;    // how it actually got solved (tech, keywords)
  story?: string;      // where it happened / the human story
}

export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  media: ProjectMedia;
  accent: string;
  reversed: boolean;
  caseStudy?: CaseStudy;
  hidden?: boolean; // kept in data but not rendered (toggle to re-enable)
  // Slovak content variants. When present and the active locale is 'sk',
  // localizeProject() swaps these in for the base fields. Czech falls back to
  // English until translated. Title, tags, links and asset paths never localize.
  subtitle_sk?: string;
  description_sk?: string;
  caseStudy_sk?: CaseStudy;
  // Czech content variants, same idea as the `_sk` fields above.
  subtitle_cs?: string;
  description_cs?: string;
  caseStudy_cs?: CaseStudy;
}

// ─── Projects ────────────────────────────────────────────────────
export const PROJECTS: PortfolioProject[] = [
  {
    id: 'czs-muni-chatbot',
    number: '01',
    title: 'Masaryk University AI Assistant',
    subtitle: 'A source-cited chatbot, live on a university\'s official site',
    description:
      'A bilingual AI assistant on Masaryk University\'s official study-abroad pages. It answers students\' Erasmus and internship questions grounded only in the university\'s own content, cites every source, and stays current as those pages change. I also built the continuous evaluation system that proves it works: 15,362 graded runs, roughly 90 percent accuracy, hallucinations near 1 percent, all on one small server.',
    tags: ['RAG', 'OpenSearch', 'FastAPI', 'DeepSeek / CERIT', 'Voyage AI', 'Python', 'Evaluation'],
    links: [
      { label: 'Read the case study', url: '/projects/czs-muni-chatbot', type: 'demo' },
      { label: 'See it live on czs.muni.cz', url: 'https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa', type: 'demo' },
    ],
    media: {
      type: 'image',
      images: [asset('czs/widget-open.jpg')],
    },
    accent: '#182e5f',
    reversed: false,
    // Hidden from the homepage Projects section for now; still live at its own
    // /projects/czs-muni-chatbot page and linked from /services. Flip to false
    // (and renumber) to feature it on the homepage again.
    hidden: true,
    caseStudy: {
      problem:
        'Masaryk University\'s <strong>Centre for International Cooperation (CZS)</strong> runs study-abroad programs for thousands of students. The information they need (Erasmus+ deadlines, required documents, stipend rules, faculty coordinators) lives across more than <strong>300 Czech and English pages</strong> and changes constantly, so students email the same procedural questions again and again and staff answer them by hand. An off-the-shelf chatbot was not an option: on an <strong>official university site</strong>, a confident wrong answer is worse than no answer, and a generic language model will happily invent university rules.',
      motivation:
        'The goal was an assistant CZS could put its name on: one that only says what the university\'s own pages say, <strong>cites where it got every claim</strong>, answers in the student\'s language, and stays current when a page changes. That meant grounding, not guessing, and it meant being able to <strong>prove</strong> the thing was right before it went live in front of real students.',
      challenges:
        'Grounded answers with <strong>no hallucination</strong> on university-specific facts; <strong>bilingual</strong> Czech and English retrieval; facts that must never be guessed (this year\'s deadlines, the right coordinator); <strong>freshness</strong> as the source pages change; and doing all of it on a <strong>single 8 GB server</strong>. On top of that, the hardest part of any AI product: knowing whether it actually works, continuously, not just in a demo.',
      solution:
        'I built a hybrid <strong>RAG</strong> pipeline on self-hosted <strong>OpenSearch</strong>: BM25 and dense vectors fused with RRF, reranked by two models, with heading-aware <strong>parent-child chunking</strong>, a query classifier, an <strong>answerability gate</strong> with corrective re-retrieval, and deterministic injection of verified deadlines and contacts. Generation runs on <strong>DeepSeek via CERIT</strong> (Czech national academic AI infrastructure), embeddings and reranking on <strong>Voyage AI</strong>. <strong>changedetection.io</strong> watches all 778 source URLs and re-indexes on change. A <strong>continuous evaluation</strong> harness grades answers against the sources around the clock (15,362 runs, 37 cycles, roughly 90 percent accuracy, hallucinations near 1 percent), and a full admin suite lets CZS staff review conversations, flag answers, manage sources, and approve mined FAQs.',
      story:
        'It is live now on the CZS study-abroad pages at <a href="https://czs.muni.cz/cs/student-mu/studijni-pobyty/erasmus-evropa" target="_blank" rel="noopener noreferrer">czs.muni.cz</a>. Read the full <a href="/projects/czs-muni-chatbot">case study</a> for the architecture, the evaluation numbers, and the before-and-after wins.',
    },
  },
  {
    id: 'inzerpro',
    number: '01',
    title: 'InzerPro',
    subtitle: 'A SaaS I run on the side',
    description:
      'Keeps power sellers\' listings at the top of Bazoš.cz and Bazoš.sk: scheduled re-posting, bulk upload, analytics. Bazoš has no public API, so the engine drives the live site. Hackathon build turned side business with paying customers.',
    tags: ['React', 'Supabase', 'Stripe', 'Deno', 'PostHog', 'SaaS', 'Hackathon'],
    links: [
      { label: 'www.inzerpro.cz', url: 'https://www.inzerpro.cz', type: 'demo', favicon: '/brand/sites/inzerpro.svg' },
    ],
    media: {
      type: 'video',
      video: assetSafe('inzerpro.mp4'),
      poster: asset('inzerpro-poster.jpg'),
    },
    accent: '#3b82f6',
    reversed: false,
    caseStudy: {
      problem:
        'Power sellers on the <strong>Bazoš.cz</strong> and <strong>Bazoš.sk</strong> classifieds live and die by listing position. On Bazoš the only way to climb back to the top of a category is to delete an ad and re-post it, so high-volume sellers were manually <strong>re-listing dozens of classified ads every single day</strong>, an endless copy-paste-delete-repost grind that ate hours and still let competitors bury them overnight.',
      motivation:
        'InzerPro started as a <strong>hackathon</strong> project. I watched second-hand resellers, e-shops and car dealers burn their mornings on this repetitive relisting busywork and realised the whole thing was a scheduling problem a computer should own. The goal: give small sellers the same <strong>automation, bulk posting and analytics</strong> the big marketplaces keep for themselves.',
      challenges:
        'Bazoš has <strong>no public API</strong>, so everything had to be driven through the live site, which meant wrestling with session and cookie handling, image uploads, category rules, CAPTCHAs, anti-bot rate limiting and listing caps without ever getting accounts flagged. On top of that sat the hard parts of any real SaaS: reliable scheduled jobs that fire on time for every user, multi-account management, and <strong>Stripe subscription billing</strong> with trials, upgrades and failed-payment recovery.',
      solution:
        'I built an automation engine on <strong>Deno</strong> that handles auto-renewal, scheduled re-posting and bulk listing across multiple seller accounts, backed by <strong>Supabase</strong> for auth, Postgres data and storage, <strong>Stripe</strong> for subscriptions, and a fast <strong>React</strong> dashboard for managing listings and reading performance analytics. <strong>PostHog</strong> tracks product usage so I can see exactly which features drive retention. The result keeps a seller’s ads parked at the top automatically: the relisting grind, fully on autopilot.',
      story:
        'What began as a weekend hackathon build is now a real <strong>side business with paying customers</strong> at <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. I later pitched it again at the <a href="/blog/zero-to-done">Zero to Done startup-build hackathon</a> in Brno, where the whole point was getting real customers, not just shipping a demo.',
    },
    subtitle_cs: 'SaaS, který provozuji vedle práce',
    description_cs:
      'Drží inzeráty velkých prodejců nahoře na Bazoš.cz a Bazoš.sk: naplánované přidávání, hromadný upload, analytika. Bazoš nemá veřejné API, engine řídí živý web. Z hackathonu je dnes byznys vedle práce s platícími zákazníky.',
    caseStudy_cs: {
      problem:
        'Velcí prodejci na inzertních portálech <strong>Bazoš.cz</strong> a <strong>Bazoš.sk</strong> žijí a padají s pozicí inzerátu. Na Bazoši se dá vyšplhat zpátky na vrchol kategorie jedině tak, že inzerát smažete a přidáte ho znovu, takže prodejci s velkým objemem ručně <strong>znovu přidávali desítky inzerátů každý jediný den</strong>. Nekonečná dřina kopírování, mazání a opětovného přidávání, která spolykala hodiny a konkurence je stejně přes noc zasypala.',
      motivation:
        'InzerPro vzniklo jako projekt na <strong>hackathonu</strong>. Díval jsem se, jak prodejci second-handu, e-shopy a autobazary promarní rána touhle opakovanou robotou s obnovováním inzerátů, a došlo mi, že celé je to problém plánování, který by měl vlastnit počítač. Cíl: dát malým prodejcům stejnou <strong>automatizaci, hromadné přidávání a analytiku</strong>, jakou si velká tržiště nechávají pro sebe.',
      challenges:
        'Bazoš nemá <strong>žádné veřejné API</strong>, takže se všechno muselo řídit přes živý web. To znamenalo boj se správou relací a cookies, nahráváním obrázků, pravidly kategorií, CAPTCHA, omezováním frekvence proti botům a limity na počet inzerátů, a to všechno bez toho, aby se účty někdy označily jako podezřelé. Na to se navrstvily těžké části každého skutečného SaaS: spolehlivé naplánované úlohy, které se spustí včas pro každého uživatele, správa více účtů a <strong>předplatné přes Stripe</strong> se zkušebními obdobími, přechody na vyšší plány a obnovou po neúspěšné platbě.',
      solution:
        'Postavil jsem automatizační engine na <strong>Deno</strong>, který zvládá automatické obnovování, naplánované opětovné přidávání a hromadné inzerování napříč více účty prodejců. Podpírá ho <strong>Supabase</strong> pro autentizaci, data v Postgresu a úložiště, <strong>Stripe</strong> pro předplatné a rychlý <strong>React</strong> dashboard na správu inzerátů a čtení analytiky výkonu. <strong>PostHog</strong> sleduje používání produktu, takže přesně vidím, které funkce drží zákazníky. Výsledek automaticky drží inzeráty prodejce zaparkované nahoře: dřina s obnovováním, celá na autopilotu.',
      story:
        'Z toho, co vzniklo o víkendu na hackathonu, je dnes skutečný <strong>byznys vedle práce s platícími zákazníky</strong> na <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. Později jsem ho znovu odprezentoval na <a href="/cs/blog/zero-to-done">hackathonu Zero to Done</a> v Brně, kde celá pointa byla získat skutečné zákazníky, ne jen vypustit ukázku.',
    },
    subtitle_sk: 'SaaS, ktorý prevádzkujem popri práci',
    description_sk:
      'Drží inzeráty veľkých predajcov na vrchu Bazoš.cz a Bazoš.sk: naplánované pridávanie, hromadný upload, analytika. Bazoš nemá verejné API, engine riadi živý web. Z hackathonu je dnes popri práci biznis s platiacimi zákazníkmi.',
    caseStudy_sk: {
      problem:
        'Veľkí predajcovia na inzertných portáloch <strong>Bazoš.cz</strong> a <strong>Bazoš.sk</strong> žijú a padajú s pozíciou inzerátu. Na Bazoši sa dá vyšplhať späť na vrch kategórie jedine tak, že inzerát zmažete a pridáte nanovo, takže predajcovia s veľkým objemom ručne <strong>opätovne pridávali desiatky inzerátov každý jeden deň</strong>. Nekonečná drina kopírovania, mazania a pridávania, ktorá zožrala hodiny a konkurencia ich aj tak cez noc zasypala.',
      motivation:
        'InzerPro vzniklo ako projekt na <strong>hackathone</strong>. Sledoval som, ako predajcovia second-handu, e-shopy a autobazáre premárnia rána na tejto opakovanej robote s obnovovaním inzerátov, a uvedomil som si, že celé je to problém plánovania, ktorý by mal vlastniť počítač. Cieľ: dať malým predajcom rovnakú <strong>automatizáciu, hromadné pridávanie a analytiku</strong>, akú si veľké trhoviská nechávajú pre seba.',
      challenges:
        'Bazoš nemá <strong>žiadne verejné API</strong>, takže všetko sa muselo riadiť cez živú stránku. To znamenalo boj so správou relácií a cookies, nahrávaním obrázkov, pravidlami kategórií, CAPTCHA, obmedzovaním frekvencie proti botom a limitmi na počet inzerátov, a to všetko bez toho, aby sa účty niekedy označili ako podozrivé. Na to sa nabalili náročné časti každého skutočného SaaS: spoľahlivé naplánované úlohy, ktoré sa spustia načas pre každého používateľa, správa viacerých účtov a <strong>predplatné cez Stripe</strong> so skúšobnými obdobiami, prechodmi na vyššie plány a obnovou po neúspešnej platbe.',
      solution:
        'Postavil som automatizačný engine na <strong>Deno</strong>, ktorý zvláda automatické obnovovanie, naplánované opätovné pridávanie a hromadné inzerovanie naprieč viacerými účtami predajcov. Podopiera ho <strong>Supabase</strong> pre autentifikáciu, dáta v Postgrese a úložisko, <strong>Stripe</strong> pre predplatné a rýchly <strong>React</strong> dashboard na správu inzerátov a čítanie analytiky výkonu. <strong>PostHog</strong> sleduje používanie produktu, takže presne vidím, ktoré funkcie držia zákazníkov. Výsledok automaticky drží inzeráty predajcu zaparkované na vrchu: drina s obnovovaním, celá na autopilote.',
      story:
        'Z toho, čo vzniklo cez víkend na hackathone, je dnes skutočný <strong>biznis popri práci s platiacimi zákazníkmi</strong> na <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. Neskôr som ho znova odprezentoval na <a href="/sk/blog/zero-to-done">hackathone Zero to Done</a> v Brne, kde celá pointa bola získať skutočných zákazníkov, nielen vypustiť ukážku.',
    },
  },
  {
    id: 'studyexe',
    number: '02',
    title: 'StudyExe',
    subtitle: 'Deep work for ADHD brains',
    description:
      'Webcam eye tracking flags you 5 seconds after your gaze drifts. Full-screen lock removes every distraction. AI-scored recall tests measure what stuck, not minutes stared.',
    tags: ['Python', 'OpenAI API', 'Eye Tracking', 'Tkinter', 'Desktop App', 'AI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
      { label: 'www.studyexe.com', url: 'https://www.studyexe.com', type: 'demo', favicon: '/brand/sites/studyexe.svg' },
    ],
    media: {
      type: 'slideshow',
      video: assetSafe('studyexe.mp4'), // upgrades to video if dropped in
      images: [
        asset('obsidian_theme_dashboard.png'),
        asset('obsidian_theme_study_session_reading.png'),
        asset('obsidian_theme_score.png'),
        asset('red_cyberpunk_theme_dashboard.png'),
        asset('cyberforest_theme.png'),
        asset('obsidian_theme_study_session_configuration.png'),
      ],
    },
    accent: '#0ea5e9',
    reversed: true,
    caseStudy: {
      problem:
        'Most study apps measure the wrong thing: <strong>time on screen</strong>, not learning. For an <strong>ADHD</strong> brain, an open textbook and a wandering gaze can look identical to "studying" while nothing actually goes in. The real problems are silent attention drift and the total absence of any honest signal for <strong>how much you actually retained</strong>.',
      motivation:
        'I built StudyExe out of my own fight with focus and <strong>deep work</strong>. I wanted a tool that didn’t just block distractions but actively kept my eyes on the page and then <strong>proved</strong> whether the session worked, measuring recall, not minutes.',
      challenges:
        'Real-time <strong>eye tracking</strong> from a plain webcam is unforgiving: gaze detection had to be fast and low-latency, robust to head movement, lighting and glasses, and tuned to avoid false "you looked away" alarms while still catching genuine drift within seconds. Locking the screen into a true distraction-free <strong>full-screen</strong> mode on desktop, and getting an LLM to fairly <strong>score active recall</strong> against the source material, were each their own rabbit holes, all inside a <strong>Python</strong> / <strong>Tkinter</strong> desktop app.',
      solution:
        'StudyExe uses computer-vision <strong>gaze tracking</strong> to alert you after just 5 seconds of looking away, a full-screen lock that removes every distraction, and <strong>AI-scored recall sessions</strong> powered by the <strong>OpenAI API</strong> that test what you actually remember. Instead of rewarding time served, it rewards retention, turning studying into a measurable feedback loop.',
      story:
        'It shipped as a polished desktop app with several themes (Obsidian, cyberpunk, cyberforest) at <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a>, a focus tool built by someone who genuinely needed it.',
    },
    subtitle_cs: 'Hluboká práce pro mozky s ADHD',
    description_cs:
      'Sledování očí přes webkameru vás upozorní 5 sekund po odvedení pohledu. Zámek celé obrazovky odstraní každé vyrušení. Testy vybavování hodnocené AI měří, co se uchytilo, ne odzírané minuty.',
    caseStudy_cs: {
      problem:
        'Většina studijních aplikací měří špatnou věc: <strong>čas u obrazovky</strong>, ne učení. Pro mozek s <strong>ADHD</strong> může otevřená učebnice a bloudící pohled vypadat stejně jako "studium", přitom dovnitř ve skutečnosti nic nejde. Skutečné problémy jsou tichý únik pozornosti a úplná absence jakéhokoli poctivého signálu o tom, <strong>kolik jste si opravdu zapamatovali</strong>.',
      motivation:
        'StudyExe jsem postavil z vlastního boje se soustředěním a <strong>hlubokou prací</strong>. Chtěl jsem nástroj, který nejen blokuje vyrušení, ale aktivně mi drží oči na stránce a pak <strong>dokáže</strong>, jestli sezení zabralo, tedy měří vybavování z paměti, ne minuty.',
      challenges:
        '<strong>Sledování očí</strong> v reálném čase z obyčejné webkamery neodpouští: detekce pohledu musela být rychlá a s nízkou odezvou, odolná vůči pohybu hlavy, osvětlení a brýlím a vyladěná tak, aby se vyhnula falešným poplachům "podívali jste se jinam" a přitom zachytila skutečný únik pozornosti během sekund. Uzamčení obrazovky do opravdu bezrušivého režimu <strong>celé obrazovky</strong> na počítači a přimět LLM, aby férově <strong>hodnotil aktivní vybavování</strong> oproti zdrojovému materiálu, byly každé samostatnou králičí norou, a to všechno uvnitř desktopové aplikace v <strong>Pythonu</strong> a <strong>Tkinteru</strong>.',
      solution:
        'StudyExe využívá <strong>sledování pohledu</strong> pomocí počítačového vidění, aby vás upozornilo už po 5 sekundách, kdy se díváte jinam, uzamčení celé obrazovky, které odstraní každé vyrušení, a <strong>sezení s vybavováním hodnocená AI</strong> poháněná přes <strong>OpenAI API</strong>, která testují, co si opravdu pamatujete. Místo odměňování odseděného času odměňuje zapamatování a mění studium na měřitelnou zpětnou vazbu.',
      story:
        'Vypustil jsem to jako vypiplanou desktopovou aplikaci s několika tématy (Obsidian, cyberpunk, cyberforest) na <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a>, nástroj na soustředění postavený někým, kdo ho opravdu potřeboval.',
    },
    subtitle_sk: 'Hlboká práca pre mozgy s ADHD',
    description_sk:
      'Sledovanie očí cez webkameru vás upozorní 5 sekúnd po odvedení pohľadu. Zámok celej obrazovky odstráni každé vyrušenie. Testy vybavovania hodnotené AI merajú, čo sa uchytilo, nie odsedené minúty.',
    caseStudy_sk: {
      problem:
        'Väčšina študijných aplikácií meria nesprávnu vec: <strong>čas pred obrazovkou</strong>, nie učenie. Pre mozog s <strong>ADHD</strong> môže otvorená učebnica a blúdiaci pohľad vyzerať rovnako ako "štúdium", pričom v skutočnosti dovnútra nič nejde. Skutočné problémy sú tichý únik pozornosti a úplná absencia akéhokoľvek úprimného signálu o tom, <strong>koľko ste si naozaj zapamätali</strong>.',
      motivation:
        'StudyExe som postavil z vlastného boja so sústredením a <strong>hlbokou prácou</strong>. Chcel som nástroj, ktorý nielen blokuje vyrušenia, ale aktívne mi drží oči na stránke a potom <strong>dokáže</strong>, či sedenie zabralo, teda meria vybavovanie z pamäte, nie minúty.',
      challenges:
        '<strong>Sledovanie očí</strong> v reálnom čase z obyčajnej webkamery neodpúšťa: detekcia pohľadu musela byť rýchla a s nízkou odozvou, odolná voči pohybu hlavy, osvetleniu a okuliarom a vyladená tak, aby sa vyhla falošným poplachom "pozreli ste sa preč" a pritom zachytila skutočný únik pozornosti v priebehu sekúnd. Uzamknutie obrazovky do naozaj bezrušivého režimu <strong>celej obrazovky</strong> na počítači a prinútenie LLM férovo <strong>hodnotiť aktívne vybavovanie</strong> oproti zdrojovému materiálu boli každé samostatnou zajačou norou, a to všetko vnútri desktopovej aplikácie v <strong>Pythone</strong> a <strong>Tkinteri</strong>.',
      solution:
        'StudyExe využíva <strong>sledovanie pohľadu</strong> pomocou počítačového videnia, aby vás upozornilo už po 5 sekundách odvrátenia pohľadu, uzamknutie celej obrazovky, ktoré odstráni každé vyrušenie, a <strong>sedenia s vybavovaním hodnotené AI</strong> poháňané cez <strong>OpenAI API</strong>, ktoré testujú, čo si naozaj pamätáte. Namiesto odmeňovania odsedeného času odmeňuje zapamätanie a mení štúdium na merateľnú spätnú väzbu.',
      story:
        'Vypustil som to ako vypiplanú desktopovú aplikáciu s viacerými témami (Obsidian, cyberpunk, cyberforest) na <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a>, nástroj na sústredenie postavený niekým, kto ho naozaj potreboval.',
    },
  },
  {
    id: 'kouzelnici',
    number: '03',
    title: 'KouzelnikNaAkci.cz',
    subtitle: 'A directory for Czech & Slovak magicians',
    description:
      'Two-sided marketplace for hiring magicians in Czechia and Slovakia. Curated profiles, Stripe listings, automated email, 20+ city and occasion landing pages built for local search.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    links: [
      { label: 'www.kouzelniknaakci.cz', url: 'https://www.kouzelniknaakci.cz', type: 'demo', favicon: '/brand/sites/kouzelniknaakci.svg' },
    ],
    media: {
      type: 'video',
      video: assetSafe('kouzelnici.mp4'),
      poster: asset('kouzelnici-poster.jpg'),
    },
    accent: '#ec4899',
    reversed: false,
    caseStudy: {
      problem:
        'If you need to <strong>book a professional magician</strong> for a wedding, birthday, corporate event or kids’ party in the Czech Republic or Slovakia, there was no good place to look. Performers were scattered across outdated personal sites and Facebook pages, and event organisers had no central, trustworthy way to compare and hire them: a classic fragmented local market.',
      motivation:
        'I saw a textbook <strong>two-sided marketplace</strong> gap with a strong <strong>local-SEO</strong> angle: high-intent searches like "magician for a party in Brno" with almost no one ranking properly for them. Owning that search traffic could connect organisers and magicians far better than the status quo.',
      challenges:
        'Marketplaces have the classic <strong>cold-start chicken-and-egg problem</strong>: no organisers without performers, no performers without organisers. On top of that I needed real <strong>programmatic SEO</strong>: generating and maintaining 20+ city × occasion landing pages that rank locally without turning into thin duplicate content, plus <strong>Stripe</strong> paid listings and reliable automated transactional email for enquiries.',
      solution:
        'I built it on <strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> with <strong>Tailwind CSS</strong>, deployed on <strong>Vercel</strong> for fast server-rendered, SEO-friendly pages. It has curated performer profiles, <strong>Stripe-powered</strong> listings, automated email notifications, and 20+ programmatic <strong>city & occasion landing pages</strong> tuned for local search, so the right magician shows up exactly when someone searches for one.',
      story:
        'It runs today at <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a>, a small but genuinely useful niche marketplace serving the Czech and Slovak events scene.',
    },
    subtitle_cs: 'Katalog českých a slovenských kouzelníků',
    description_cs:
      'Oboustranné tržiště pro objednání kouzelníka v Česku a na Slovensku. Vybrané profily, inzeráty přes Stripe, automatizované e-maily, 20+ vstupních stránek pro města a příležitosti stavěných na lokální vyhledávání.',
    caseStudy_cs: {
      problem:
        'Pokud si v Česku nebo na Slovensku potřebujete <strong>objednat profesionálního kouzelníka</strong> na svatbu, oslavu narozenin, firemní akci nebo dětskou párty, nebylo kde hledat. Vystupující byli roztroušení po zastaralých osobních stránkách a facebookových profilech a organizátoři akcí neměli centrální, důvěryhodné místo, kde je porovnat a najmout: klasický roztříštěný lokální trh.',
      motivation:
        'Viděl jsem učebnicovou mezeru pro <strong>oboustranné tržiště</strong> se silným <strong>lokálně-SEO</strong> úhlem: vyhledávání s vysokým záměrem jako "kouzelník na oslavu v Brně", na která skoro nikdo pořádně nerankoval. Ovládnutí tohohle vyhledávacího provozu mohlo spojit organizátory a kouzelníky mnohem líp než dosavadní stav.',
      challenges:
        'Tržiště mají klasický <strong>problém studeného startu, slepice a vejce</strong>: žádní organizátoři bez vystupujících, žádní vystupující bez organizátorů. Navíc jsem potřeboval skutečné <strong>programatické SEO</strong>: vytvořit a udržovat 20+ vstupních stránek kombinujících město a příležitost, které rankují lokálně, aniž by se změnily v tenký duplicitní obsah, plus placené inzeráty přes <strong>Stripe</strong> a spolehlivé automatizované transakční e-maily pro poptávky.',
      solution:
        'Postavil jsem to na <strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> s <strong>Tailwind CSS</strong>, nasazené na <strong>Vercel</strong> pro rychlé serverem renderované stránky přátelské k SEO. Má vybrané profily vystupujících, inzeráty <strong>poháněné přes Stripe</strong>, automatizovaná e-mailová upozornění a 20+ programatických <strong>vstupních stránek pro města a příležitosti</strong> vyladěných na lokální vyhledávání, aby se správný kouzelník ukázal přesně tehdy, když ho někdo hledá.',
      story:
        'Běží dnes na <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a>, malé, ale opravdu užitečné nišové tržiště sloužící české a slovenské scéně akcí.',
    },
    subtitle_sk: 'Katalóg pre českých a slovenských kúzelníkov',
    description_sk:
      'Obojstranné trhovisko na objednanie kúzelníka v Česku a na Slovensku. Vybrané profily, inzeráty cez Stripe, automatizované e-maily, 20+ vstupných stránok pre mestá a príležitosti stavaných na lokálne vyhľadávanie.',
    caseStudy_sk: {
      problem:
        'Ak si v Česku alebo na Slovensku potrebujete <strong>objednať profesionálneho kúzelníka</strong> na svadbu, oslavu narodenín, firemnú akciu alebo detskú párty, nebolo kde hľadať. Účinkujúci boli roztrúsení po zastaraných osobných stránkach a facebookových profiloch a organizátori akcií nemali centrálne, dôveryhodné miesto, kde ich porovnať a najať: klasický roztrieštený lokálny trh.',
      motivation:
        'Videl som učebnicovú medzeru pre <strong>obojstranné trhovisko</strong> so silným <strong>lokálno-SEO</strong> uhlom: vyhľadávania s vysokým zámerom ako "kúzelník na oslavu v Brne", na ktoré takmer nikto poriadne nerankoval. Ovládnutie tohto vyhľadávacieho dopytu mohlo spojiť organizátorov a kúzelníkov oveľa lepšie než dovtedajší stav.',
      challenges:
        'Trhoviská majú klasický <strong>problém studeného štartu, sliepka a vajce</strong>: žiadni organizátori bez účinkujúcich, žiadni účinkujúci bez organizátorov. Navrch som potreboval skutočné <strong>programatické SEO</strong>: vytvoriť a udržiavať 20+ vstupných stránok kombinujúcich mesto a príležitosť, ktoré rankujú lokálne bez toho, aby sa zmenili na tenký duplicitný obsah, plus platené inzeráty cez <strong>Stripe</strong> a spoľahlivé automatizované transakčné e-maily pre dopyty.',
      solution:
        'Postavil som to na <strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> s <strong>Tailwind CSS</strong>, nasadené na <strong>Vercel</strong> pre rýchle serverom renderované stránky priateľské k SEO. Má vybrané profily účinkujúcich, inzeráty <strong>poháňané cez Stripe</strong>, automatizované e-mailové upozornenia a 20+ programatických <strong>vstupných stránok pre mestá a príležitosti</strong> vyladených na lokálne vyhľadávanie, aby sa správny kúzelník ukázal presne vtedy, keď ho niekto hľadá.',
      story:
        'Beží dnes na <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a>, malé, ale naozaj užitočné nišové trhovisko slúžiace českej a slovenskej scéne akcií.',
    },
  },
  {
    id: 'newsmatics',
    number: '04',
    title: 'Newsmatics Globe',
    subtitle: 'News as geography',
    description:
      'Extracts place names from news articles with NLP, resolves them against GeoNames, and plots them on an interactive 3D globe. Timeline playback replays world events. Built in one hackathon weekend.',
    tags: ['Python', 'JavaScript', 'Globe.gl', 'LangChain', 'NLP', 'Data Viz', 'Hackathon'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
      { label: 'Hackathon Story', url: '/blog/newsmatics-hackathon', type: 'demo' },
    ],
    media: {
      type: 'video',
      video: asset('newsmatics-hackathon.mp4'),
      poster: asset('newsmatics-hackathon-group.jpg'),
    },
    accent: '#10b981',
    reversed: true,
    caseStudy: {
      problem:
        'The news tells you <strong>what</strong> happened but makes it hard to feel <strong>where</strong> and <strong>when</strong> it happened. Thousands of articles a day reference places, but that geography is locked inside plain text; there was no easy way to watch global events light up across a map over time.',
      motivation:
        'At the <strong>Newsmatics Hackathon</strong> in Brno, my team <strong>MOGGERS</strong> wanted to turn the firehose of news into something spatial and alive ("news as geography") and prove we could build the whole <strong>NLP-to-visualisation</strong> pipeline in a single weekend.',
      challenges:
        'Pulling locations out of messy article text meant real <strong>named-entity recognition</strong> and the nasty problem of <strong>geographic disambiguation</strong>: is "Paris" the French capital or a town in Texas? Matching those mentions against the <strong>GeoNames</strong> database accurately, keeping the extraction pipeline fast, rendering thousands of points smoothly on a 3D globe, and syncing it all to a <strong>timeline playback</strong> (all against a hard hackathon deadline) were the core battles.',
      solution:
        'We built a <strong>Python</strong> pipeline using <strong>LangChain</strong> and <strong>NLP</strong> to extract locations from articles, matched them to coordinates via the <strong>GeoNames</strong> gazetteer, and visualised everything on an interactive 3D globe with <strong>Globe.gl</strong> in <strong>JavaScript</strong>. A timeline scrubber lets you watch events unfold across the world in real time, turning raw news into an explorable <strong>data-visualisation</strong>.',
      story:
        'Newsmatics Globe is one of the projects I’m proudest of. Read the full weekend write-up in <a href="/blog/newsmatics-hackathon">my Newsmatics Hackathon story</a>.',
    },
    subtitle_cs: 'Zprávy jako geografie',
    description_cs:
      'Pomocí NLP vytahuje místa z novinových článků, páruje je s databází GeoNames a vykresluje na interaktivním 3D globusu. Časová osa přehrává světové události. Postaveno za jeden hackathonový víkend.',
    caseStudy_cs: {
      problem:
        'Zprávy vám řeknou, <strong>co</strong> se stalo, ale ztěžují vnímání toho, <strong>kde</strong> a <strong>kdy</strong> se to stalo. Tisíce článků denně zmiňují místa, jenže tahle geografie je uzamčená uvnitř čistého textu; nebyl jednoduchý způsob, jak sledovat, jak se globální události rozsvěcejí na mapě v čase.',
      motivation:
        'Na <strong>hackathonu Newsmatics</strong> v Brně chtěl můj tým <strong>MOGGERS</strong> proměnit příval zpráv v něco prostorového a živého ("zprávy jako geografie") a dokázat, že umíme postavit celou linku <strong>od NLP po vizualizaci</strong> za jediný víkend.',
      challenges:
        'Vytahování míst z neuspořádaného textu článků znamenalo skutečné <strong>rozpoznávání pojmenovaných entit</strong> a nepříjemný problém <strong>geografické disambiguace</strong>: je "Paříž" francouzská metropole, nebo městečko v Texasu? Přesné párování těchhle zmínek oproti databázi <strong>GeoNames</strong>, udržení extrakční linky rychlé, plynulé vykreslení tisíců bodů na 3D globusu a sesynchronizování toho všeho s <strong>přehráváním časové osy</strong> (a to všechno proti tvrdému termínu hackathonu) byly hlavní boje.',
      solution:
        'Postavili jsme linku v <strong>Pythonu</strong> pomocí <strong>LangChain</strong> a <strong>NLP</strong> na vytahování míst z článků, spárovali jsme je se souřadnicemi přes rejstřík <strong>GeoNames</strong> a všechno jsme zobrazili na interaktivním 3D globusu s <strong>Globe.gl</strong> v <strong>JavaScriptu</strong>. Posuvník časové osy vám dá sledovat, jak se události odvíjejí po celém světě v reálném čase, a mění surové zprávy v prozkoumatelnou <strong>datovou vizualizaci</strong>.',
      story:
        'Newsmatics Globe je jeden z projektů, na které jsem nejpyšnější. Celý víkendový zápis si přečtěte v <a href="/cs/blog/newsmatics-hackathon">mém příběhu z hackathonu Newsmatics</a>.',
    },
    subtitle_sk: 'Správy ako geografia',
    description_sk:
      'Pomocou NLP vyťahuje miesta z novinových článkov, páruje ich s databázou GeoNames a vykresľuje na interaktívnom 3D glóbuse. Časová os prehráva svetové udalosti. Postavené za jeden hackathonový víkend.',
    caseStudy_sk: {
      problem:
        'Správy vám povedia, <strong>čo</strong> sa stalo, ale sťažujú vnímanie toho, <strong>kde</strong> a <strong>kedy</strong> sa to stalo. Tisíce článkov denne spomínajú miesta, no táto geografia je uzamknutá vnútri čistého textu; nebol jednoduchý spôsob, ako sledovať, ako sa globálne udalosti rozsvecujú na mape v čase.',
      motivation:
        'Na <strong>hackathone Newsmatics</strong> v Brne chcel môj tím <strong>MOGGERS</strong> premeniť príval správ na niečo priestorové a živé ("správy ako geografia") a dokázať, že vieme postaviť celú linku <strong>od NLP po vizualizáciu</strong> za jediný víkend.',
      challenges:
        'Vyťahovanie miest z neusporiadaného textu článkov znamenalo skutočné <strong>rozpoznávanie pomenovaných entít</strong> a nepríjemný problém <strong>geografickej disambiguácie</strong>: je "Paríž" francúzska metropola alebo mestečko v Texase? Presné párovanie týchto zmienok oproti databáze <strong>GeoNames</strong>, udržanie extrakčnej linky rýchlej, plynulé vykreslenie tisícov bodov na 3D glóbuse a zosynchronizovanie toho všetkého s <strong>prehrávaním časovej osi</strong> (a to všetko oproti tvrdému termínu hackathonu) boli hlavné boje.',
      solution:
        'Postavili sme linku v <strong>Pythone</strong> pomocou <strong>LangChain</strong> a <strong>NLP</strong> na vyťahovanie miest z článkov, spárovali sme ich so súradnicami cez register <strong>GeoNames</strong> a všetko sme zobrazili na interaktívnom 3D glóbuse s <strong>Globe.gl</strong> v <strong>JavaScripte</strong>. Posuvník časovej osi vám dá sledovať, ako sa udalosti odvíjajú po celom svete v reálnom čase, a mení surové správy na preskúmateľnú <strong>dátovú vizualizáciu</strong>.',
      story:
        'Newsmatics Globe je jeden z projektov, na ktoré som najhrdší. Celý víkendový zápis si prečítajte v <a href="/sk/blog/newsmatics-hackathon">mojom príbehu z hackathonu Newsmatics</a>.',
    },
  },
  {
    id: 'nasadclaw',
    number: '05',
    title: 'NasadClaw',
    subtitle: 'AI infrastructure for Czech & Slovak enterprises',
    description:
      "OpenClaw AI assistant deployed for business teams: installed on dedicated hardware in the client's office, InfoSec hardened, maintained. No data leaves the building.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostHog', 'B2B', 'SaaS'],
    links: [
      { label: 'www.nasadclaw.cz', url: 'https://www.nasadclaw.cz', type: 'demo', favicon: '/brand/sites/nasadclaw.png' },
    ],
    media: {
      type: 'image',
      video: assetSafe('nasadclaw.mp4'), // upgrades to video if dropped in
      images: [asset('nasadclaw-real-image.png')],
    },
    accent: '#e11d48',
    reversed: false,
    caseStudy: {
      problem:
        'Most <strong>small and mid-sized businesses</strong> in the Czech Republic and Slovakia know <strong>AI</strong> could give their teams real leverage, but they can’t realistically run a new software project to get it, and many are rightly nervous about <strong>data privacy</strong> and sending sensitive company data into someone else’s cloud.',
      motivation:
        'I wanted to remove every excuse a non-technical team has for not adopting AI: no setup, no maintenance burden, no data leaving the building. Deliver the leverage as a <strong>done-for-you, managed deployment</strong> rather than yet another app they have to learn and babysit.',
      challenges:
        'Going <strong>on-premise</strong> instead of pure cloud means real-world hardware: provisioning <strong>dedicated hardware</strong>, physically installing it at a client’s office, and doing serious <strong>InfoSec hardening</strong> and <strong>GDPR-friendly</strong> data handling so everything stays local. Then there’s the ongoing reliability, updates and maintenance, plus the <strong>B2B SaaS</strong> machinery of contracts, billing and onboarding for non-technical buyers.',
      solution:
        'NasadClaw is the professional deployment of the <strong>OpenClaw</strong> AI assistant for business teams: physical installation on dedicated hardware at the client’s office, full InfoSec hardening, and ongoing maintenance, so teams get value from day one. The product surface (marketing site, dashboard and billing) runs on <strong>Next.js</strong>, <strong>TypeScript</strong> and <strong>Tailwind CSS</strong>, with <strong>Stripe</strong> for payments and <strong>PostHog</strong> for analytics.',
      story:
        'It’s live as a <strong>B2B</strong> offering at <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a>, bringing private, on-site AI to Czech and Slovak enterprises.',
    },
    subtitle_cs: 'AI infrastruktura pro české a slovenské firmy',
    description_cs:
      'AI asistent OpenClaw nasazený pro firemní týmy: instalace na vyhrazeném hardwaru v kanceláři klienta, zabezpečení z pohledu InfoSec, průběžná údržba. Žádná data neopouštějí budovu.',
    caseStudy_cs: {
      problem:
        'Většina <strong>malých a středních firem</strong> v Česku a na Slovensku ví, že <strong>AI</strong> by jejich týmům mohla dát skutečnou páku, ale reálně nedokážou rozjet nový softwarový projekt, aby ji získali, a mnohé jsou právem nervózní z <strong>ochrany dat</strong> a posílání citlivých firemních údajů do cizího cloudu.',
      motivation:
        'Chtěl jsem odstranit každou výmluvu, kterou netechnický tým má pro to, aby AI nepřijal: žádné nastavování, žádná zátěž s údržbou, žádná data opouštějící budovu. Doručit páku jako <strong>nasazení na klíč, spravované za vás</strong>, a ne jako další aplikaci, kterou se musí učit a hlídat.',
      challenges:
        'Jít <strong>on-premise</strong> místo čistého cloudu znamená hardware z reálného světa: pořízení <strong>vyhrazeného hardwaru</strong>, jeho fyzickou instalaci v kanceláři klienta a seriózní práci na <strong>zabezpečení z pohledu InfoSec</strong> a <strong>nakládání s daty přátelském ke GDPR</strong>, aby všechno zůstalo lokální. Pak je tu průběžná spolehlivost, aktualizace a údržba, plus mašinerie <strong>B2B SaaS</strong> smluv, fakturace a onboardingu pro netechnické kupující.',
      solution:
        'NasadClaw je profesionální nasazení AI asistenta <strong>OpenClaw</strong> pro firemní týmy: fyzická instalace na vyhrazeném hardwaru v kanceláři klienta, plné zabezpečení z pohledu InfoSec a průběžná údržba, takže týmy mají přínos od prvního dne. Povrch produktu (marketingová stránka, dashboard a fakturace) běží na <strong>Next.js</strong>, <strong>TypeScript</strong> a <strong>Tailwind CSS</strong>, se <strong>Stripe</strong> pro platby a <strong>PostHog</strong> pro analytiku.',
      story:
        'Je v provozu jako <strong>B2B</strong> nabídka na <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a> a přináší soukromou AI přímo na místě českým a slovenským firmám.',
    },
    subtitle_sk: 'AI infraštruktúra pre české a slovenské firmy',
    description_sk:
      'AI asistent OpenClaw nasadený pre firemné tímy: inštalácia na vyhradenom hardvéri v kancelárii klienta, zabezpečenie z pohľadu InfoSec, priebežná údržba. Žiadne dáta neopúšťajú budovu.',
    caseStudy_sk: {
      problem:
        'Väčšina <strong>malých a stredných firiem</strong> v Česku a na Slovensku vie, že <strong>AI</strong> by ich tímom mohla dať skutočnú páku, ale reálne nedokážu rozbehnúť nový softvérový projekt, aby ju získali, a mnohé sú právom nervózne z <strong>ochrany dát</strong> a posielania citlivých firemných údajov do cudzieho cloudu.',
      motivation:
        'Chcel som odstrániť každú výhovorku, ktorú netechnický tím má pre neprijatie AI: žiadne nastavovanie, žiadna záťaž s údržbou, žiadne dáta opúšťajúce budovu. Doručiť páku ako <strong>nasadenie na kľúč, spravované za vás</strong>, a nie ako ďalšiu aplikáciu, ktorú sa musia učiť a strážiť.',
      challenges:
        'Ísť <strong>on-premise</strong> namiesto čistého cloudu znamená hardvér z reálneho sveta: zaobstaranie <strong>vyhradeného hardvéru</strong>, jeho fyzickú inštaláciu v kancelárii klienta a serióznu prácu na <strong>zabezpečení z pohľadu InfoSec</strong> a <strong>narábaní s dátami priateľskom ku GDPR</strong>, aby všetko zostalo lokálne. Potom je tu priebežná spoľahlivosť, aktualizácie a údržba, plus mašinéria <strong>B2B SaaS</strong> zmlúv, fakturácie a onboardingu pre netechnických kupujúcich.',
      solution:
        'NasadClaw je profesionálne nasadenie AI asistenta <strong>OpenClaw</strong> pre firemné tímy: fyzická inštalácia na vyhradenom hardvéri v kancelárii klienta, plné zabezpečenie z pohľadu InfoSec a priebežná údržba, takže tímy majú prínos od prvého dňa. Povrch produktu (marketingová stránka, dashboard a fakturácia) beží na <strong>Next.js</strong>, <strong>TypeScript</strong> a <strong>Tailwind CSS</strong>, so <strong>Stripe</strong> pre platby a <strong>PostHog</strong> pre analytiku.',
      story:
        'Je v prevádzke ako <strong>B2B</strong> ponuka na <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a> a prináša súkromnú AI priamo na mieste českým a slovenským firmám.',
    },
  },
  {
    id: 'psychetab',
    number: '06',
    title: 'PsycheTab',
    subtitle: 'Your browser, your aesthetic',
    description:
      'Chrome extension that turns the new tab page into rotating collages from your own image library. Drag, resize, rotate, layer. Everything stays in IndexedDB: no cloud, no tracking.',
    tags: ['JavaScript', 'Manifest V3', 'LocalForage', 'IndexedDB', 'Chrome Extension'],
    links: [
      { label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao', type: 'demo', favicon: '/brand/sites/psychetab.jpg' },
      { label: 'GitHub', url: 'https://github.com/Rauded/college_extension_chrome', type: 'github' },
    ],
    media: {
      type: 'video',
      video: asset('psychetab-demo.mp4'),
      poster: asset('psychetab-main.png'),
    },
    accent: '#f59e0b',
    reversed: true,
    caseStudy: {
      problem:
        'You open a new browser tab dozens of times a day and stare at the same generic, soulless default <strong>new tab page</strong>. There was no simple way to make that moment <em>yours</em> with your own images, and the personalisation extensions that do exist usually want to upload your photos to their cloud and track you.',
      motivation:
        'I wanted my browser to reflect my own <strong>aesthetic</strong>: rotating <strong>collage wallpapers</strong> built from my personal image library, fully editable, and crucially <strong>private by design</strong>: no accounts, no cloud, no tracking, every byte staying on my own machine.',
      challenges:
        'Chrome’s <strong>Manifest V3</strong> brings real constraints: service workers, strict content-security policy, and no easy persistent background. Storing a library of full-resolution images entirely on-device meant leaning on <strong>IndexedDB</strong> (via <strong>LocalForage</strong>) and keeping performance smooth while users <strong>drag, resize, rotate and layer</strong> many large images on a canvas. And it all had to pass <strong>Chrome Web Store</strong> review.',
      solution:
        'PsycheTab is a <strong>Manifest V3 Chrome extension</strong> written in <strong>JavaScript</strong> that replaces the new tab page with rotating, editable collages. Each piece can be dragged, resized, rotated and layered, and everything is persisted locally in <strong>IndexedDB</strong> through <strong>LocalForage</strong>: no cloud, no tracking, ever. Your browser, your aesthetic, your data.',
      story:
        'It’s published and installable on the <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, with the source on <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHub</a>.',
    },
    subtitle_cs: 'Váš prohlížeč, vaše estetika',
    description_cs:
      'Rozšíření do Chromu, které promění novou kartu v rotující koláže z vaší vlastní knihovny obrázků. Posunout, zvětšit, otočit, navrstvit. Všechno zůstává v IndexedDB: žádný cloud, žádné sledování.',
    caseStudy_cs: {
      problem:
        'Novou kartu prohlížeče otevíráte mnohokrát denně a zíráte na tu samou generickou, bezduchou výchozí <strong>stránku nové karty</strong>. Nebyl jednoduchý způsob, jak si tuhle chvíli udělat <em>vlastní</em> s vlastními obrázky, a personalizační rozšíření, která existují, obvykle chtějí nahrát vaše fotky do svého cloudu a sledovat vás.',
      motivation:
        'Chtěl jsem, aby můj prohlížeč odrážel moji vlastní <strong>estetiku</strong>: rotující <strong>kolážové tapety</strong> sestavené z mojí osobní knihovny obrázků, plně upravitelné a hlavně <strong>soukromé už z principu</strong>: žádné účty, žádný cloud, žádné sledování, každý bajt zůstává na mém vlastním počítači.',
      challenges:
        '<strong>Manifest V3</strong> v Chromu přináší skutečná omezení: service workery, přísnou politiku bezpečnosti obsahu a žádné jednoduché trvalé pozadí. Uložení knihovny obrázků v plném rozlišení celé na zařízení znamenalo opřít se o <strong>IndexedDB</strong> (přes <strong>LocalForage</strong>) a udržet plynulý výkon, zatímco uživatelé <strong>táhnou, mění velikost, otáčejí a vrství</strong> spoustu velkých obrázků na plátně. A to všechno muselo projít kontrolou <strong>Chrome Web Store</strong>.',
      solution:
        'PsycheTab je <strong>rozšíření do Chromu na Manifest V3</strong> napsané v <strong>JavaScriptu</strong>, které nahradí stránku nové karty rotujícími, upravitelnými kolážemi. Každý kousek se dá posunout, zvětšit, otočit a navrstvit a všechno se ukládá lokálně v <strong>IndexedDB</strong> přes <strong>LocalForage</strong>: žádný cloud, žádné sledování, nikdy. Váš prohlížeč, vaše estetika, vaše data.',
      story:
        'Je publikované a instalovatelné v <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, se zdrojovým kódem na <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHubu</a>.',
    },
    subtitle_sk: 'Váš prehliadač, vaša estetika',
    description_sk:
      'Rozšírenie do Chrome, ktoré premení novú kartu na rotujúce koláže z vašej vlastnej knižnice obrázkov. Potiahnuť, zväčšiť, otočiť, navrstviť. Všetko zostáva v IndexedDB: žiadny cloud, žiadne sledovanie.',
    caseStudy_sk: {
      problem:
        'Novú kartu prehliadača otvárate desiatky ráz denne a civíte na tú istú generickú, bezduchú predvolenú <strong>stránku novej karty</strong>. Nebol jednoduchý spôsob, ako si túto chvíľu spraviť <em>vlastnou</em> s vlastnými obrázkami, a personalizačné rozšírenia, ktoré existujú, obvykle chcú nahrať vaše fotky do svojho cloudu a sledovať vás.',
      motivation:
        'Chcel som, aby môj prehliadač odrážal moju vlastnú <strong>estetiku</strong>: rotujúce <strong>kolážové tapety</strong> zostavené z mojej osobnej knižnice obrázkov, plne upraviteľné a hlavne <strong>súkromné už z princípu</strong>: žiadne účty, žiadny cloud, žiadne sledovanie, každý bajt zostáva na mojom vlastnom počítači.',
      challenges:
        '<strong>Manifest V3</strong> v Chrome prináša skutočné obmedzenia: service workery, prísnu politiku bezpečnosti obsahu a žiadne jednoduché trvalé pozadie. Uloženie knižnice obrázkov v plnom rozlíšení celkom na zariadení znamenalo oprieť sa o <strong>IndexedDB</strong> (cez <strong>LocalForage</strong>) a udržať plynulý výkon, kým používatelia <strong>ťahajú, menia veľkosť, otáčajú a vrstvia</strong> mnoho veľkých obrázkov na plátne. A to všetko muselo prejsť kontrolou <strong>Chrome Web Store</strong>.',
      solution:
        'PsycheTab je <strong>rozšírenie do Chrome na Manifest V3</strong> napísané v <strong>JavaScripte</strong>, ktoré nahradí stránku novej karty rotujúcimi, upraviteľnými kolážami. Každý kúsok sa dá potiahnuť, zmeniť mu veľkosť, otočiť ho a navrstviť, a všetko sa ukladá lokálne v <strong>IndexedDB</strong> cez <strong>LocalForage</strong>: žiadny cloud, žiadne sledovanie, nikdy. Váš prehliadač, vaša estetika, vaše dáta.',
      story:
        'Je publikované a inštalovateľné v <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, so zdrojovým kódom na <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHube</a>.',
    },
  },
  {
    id: 'mindtype',
    number: '07',
    title: 'MindType',
    subtitle: 'Cognitive conditioning, one keystroke at a time',
    description:
      'Not a typing app, but a psychological practice. Choose an identity pack (Stoic, CEO, athlete) and type curated quotes against the clock to condition how you think. Streaks, shareable session cards, and progress tracking turn mindset work into a daily habit.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Stripe'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
    ],
    media: {
      type: 'placeholder',
      video: assetSafe('mindtype.mp4'),
    },
    accent: '#14b8a6',
    reversed: false,
    hidden: true,
  },
  {
    id: 'bookreader-xr',
    number: '08',
    title: 'BookReader for Even Realities G1',
    subtitle: 'Read books on XR glasses',
    description:
      'A reading app for the Even Realities G1 extended-reality glasses, built on MentaOS (the open-source OS for XR glasses). Upload a book, read it hands-free on the display, and the app tracks progress and bookmarks, with optimised text rendering for a tiny screen and limited input.',
    tags: ['JavaScript', 'MentaOS', 'XR', 'Extended Reality', 'Productivity'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Rauded', type: 'github' },
    ],
    media: {
      type: 'concept',
    },
    accent: '#38bdf8',
    reversed: true,
    hidden: true,
  },
];

// Renumber + fix alternating layout so the list stays correct no matter
// which projects are hidden. This is the list both pages actually render.
export const VISIBLE_PROJECTS: PortfolioProject[] = PROJECTS
  .filter(p => !p.hidden)
  .map((p, i) => ({
    ...p,
    number: String(i + 1).padStart(2, '0'),
    reversed: i % 2 === 1,
  }));

// Swap in the localized content variants for the active locale. Only the
// reader-facing prose localizes here (subtitle, description, case study); title,
// tags, links and asset paths are intentionally left untouched. Each field falls
// back to English when its variant is missing.
export function localizeProject(p: PortfolioProject, locale: 'en' | 'sk' | 'cs'): PortfolioProject {
  if (locale === 'cs') {
    return {
      ...p,
      subtitle: p.subtitle_cs ?? p.subtitle,
      description: p.description_cs ?? p.description,
      caseStudy: p.caseStudy_cs ?? p.caseStudy,
    };
  }
  if (locale === 'sk') {
    return {
      ...p,
      subtitle: p.subtitle_sk ?? p.subtitle,
      description: p.description_sk ?? p.description,
      caseStudy: p.caseStudy_sk ?? p.caseStudy,
    };
  }
  return p;
}
