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
        'Grounded answers with <strong>no hallucination</strong> on university-specific facts; <strong>bilingual</strong> Czech and English retrieval; facts that must never be guessed (this year\'s deadlines, the right coordinator); and <strong>freshness</strong> as the source pages change. On top of that, the hardest part of any AI product: knowing whether it actually works, continuously, not just in a demo.',
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
      'Auto-renewal, bulk posting, and analytics for power sellers on Czech and Slovak second-hand marketplaces. The daily relisting runs on schedule instead of by hand. Hackathon build turned into side business with paying customers.',
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
        'Power sellers on Czech and Slovak <strong>second-hand marketplaces</strong> depend on listing freshness. Older listings sink, so high-volume sellers were <strong>re-listing dozens of ads by hand every day</strong>, and competitors still buried them overnight.',
      motivation:
        'InzerPro started at a <strong>hackathon</strong>. Resellers, e-shops and car dealers burned mornings on relisting: a scheduling problem a computer should own. The goal: give small sellers the <strong>automation, bulk posting and analytics</strong> the big marketplaces keep for themselves.',
      challenges:
        'The hard parts of any real SaaS: <strong>scheduled jobs</strong> that fire on time for every user, multi-account management, image handling and category rules that differ per marketplace, and <strong>Stripe billing</strong> with trials, upgrades and failed-payment recovery.',
      solution:
        'A <strong>Deno</strong> engine handles auto-renewal, scheduled re-posting and bulk listing across seller accounts. <strong>Supabase</strong> covers auth, Postgres and storage, <strong>Stripe</strong> subscriptions. A <strong>React</strong> dashboard manages listings and analytics; <strong>PostHog</strong> shows what drives retention. The relisting grind runs on autopilot.',
      story:
        'The weekend hackathon build is now a <strong>side business with paying customers</strong> at <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. I pitched it again at the <a href="/blog/zero-to-done">Zero to Done hackathon</a> in Brno: real customers, not a demo.',
    },
    subtitle_cs: 'SaaS, který provozuji vedle práce',
    description_cs:
      'Automatické obnovování, hromadné přidávání a analytika pro velké prodejce na českých a slovenských bazarových tržištích. Každodenní dřina s obnovováním inzerátů běží podle plánu místo ručně. Z hackathonu je dnes byznys vedle práce s platícími zákazníky.',
    caseStudy_cs: {
      problem:
        'Velcí prodejci na českých a slovenských <strong>bazarových tržištích</strong> stojí a padají s čerstvostí inzerátu. Starší inzeráty klesají dolů, takže prodejci s velkým objemem <strong>obnovovali desítky inzerátů ručně každý den</strong> a konkurence je přes noc stejně zasypala.',
      motivation:
        'InzerPro vzniklo na <strong>hackathonu</strong>. Second-handy, e-shopy a autobazary trávily rána obnovováním inzerátů: problém plánování, který má řešit počítač. Cíl: dát malým prodejcům <strong>automatizaci, hromadné přidávání a analytiku</strong>, jaké si velká tržiště nechávají pro sebe.',
      challenges:
        'Těžké části každého skutečného SaaS: spolehlivé <strong>naplánované úlohy</strong> spuštěné včas pro každého uživatele, správa více účtů, práce s obrázky a pravidla kategorií lišící se podle tržiště, a <strong>předplatné přes Stripe</strong> se zkušebními obdobími, upgrady a obnovou po neúspěšné platbě.',
      solution:
        'Engine na <strong>Deno</strong> zvládá obnovování, naplánované přidávání a hromadnou inzerci napříč účty prodejců. <strong>Supabase</strong> drží autentizaci, Postgres a úložiště, <strong>Stripe</strong> předplatné. <strong>React</strong> dashboard řeší správu inzerátů a analytiku; <strong>PostHog</strong> ukazuje, co drží zákazníky. Dřina s obnovováním běží na autopilotu.',
      story:
        'Z víkendového hackathonového projektu je dnes <strong>byznys vedle práce s platícími zákazníky</strong> na <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. Znovu jsem ho odprezentoval na <a href="/cs/blog/zero-to-done">hackathonu Zero to Done</a> v Brně: skuteční zákazníci, ne demo.',
    },
    subtitle_sk: 'SaaS, ktorý prevádzkujem popri práci',
    description_sk:
      'Automatické obnovovanie, hromadné pridávanie a analytika pre veľkých predajcov na českých a slovenských bazárových trhoviskách. Každodenná drina s obnovovaním inzerátov beží podľa plánu namiesto ručne. Z hackathonu je dnes popri práci biznis s platiacimi zákazníkmi.',
    caseStudy_sk: {
      problem:
        'Veľkí predajcovia na českých a slovenských <strong>bazárových trhoviskách</strong> stoja a padajú s čerstvosťou inzerátu. Staršie inzeráty klesajú nižšie, takže predajcovia s veľkým objemom <strong>obnovovali desiatky inzerátov ručne každý deň</strong> a konkurencia ich cez noc aj tak zasypala.',
      motivation:
        'InzerPro vzniklo na <strong>hackathone</strong>. Second-handy, e-shopy a autobazáre trávili rána obnovovaním inzerátov: problém plánovania, ktorý má riešiť počítač. Cieľ: dať malým predajcom <strong>automatizáciu, hromadné pridávanie a analytiku</strong>, aké si veľké trhoviská nechávajú pre seba.',
      challenges:
        'Náročné časti každého skutočného SaaS: spoľahlivé <strong>naplánované úlohy</strong> spustené načas pre každého používateľa, správa viacerých účtov, práca s obrázkami a pravidlá kategórií líšiace sa podľa trhoviska, a <strong>predplatné cez Stripe</strong> so skúšobnými obdobiami, upgradmi a obnovou po neúspešnej platbe.',
      solution:
        'Engine na <strong>Deno</strong> zvláda obnovovanie, naplánované pridávanie a hromadnú inzerciu naprieč účtami predajcov. <strong>Supabase</strong> drží autentifikáciu, Postgres a úložisko, <strong>Stripe</strong> predplatné. <strong>React</strong> dashboard rieši správu inzerátov a analytiku; <strong>PostHog</strong> ukazuje, čo drží zákazníkov. Drina s obnovovaním beží na autopilote.',
      story:
        'Z víkendového hackathonového projektu je dnes <strong>biznis popri práci s platiacimi zákazníkmi</strong> na <a href="https://www.inzerpro.cz" target="_blank" rel="noopener noreferrer">inzerpro.cz</a>. Znova som ho odprezentoval na <a href="/sk/blog/zero-to-done">hackathone Zero to Done</a> v Brne: skutoční zákazníci, nie demo.',
    },
  },
  {
    id: 'studyexe',
    number: '02',
    title: 'StudyExe',
    subtitle: 'Study tool I built for myself',
    description:
      'A study tool I built for myself to help with my ADHD. Takes advantage of body doubling, knowledge retrieval from memory, eye tracking, AI scoring of recall study tests. Flash card AI generation. Full screen lock to destroy distractions',
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
        'Most study apps measure <strong>time on screen</strong>, not learning. An <strong>ADHD</strong> brain can stare at an open textbook while nothing goes in. There is no honest signal for <strong>how much you retained</strong>.',
      motivation:
        'StudyExe comes from my own fight with focus and <strong>deep work</strong>. I wanted a tool that keeps my eyes on the page and <strong>proves</strong> the session worked. Recall, not minutes.',
      challenges:
        'Real-time <strong>eye tracking</strong> from a plain webcam is unforgiving. Detection had to be fast, survive head movement, lighting and glasses, and catch drift within seconds without false alarms. Add a true <strong>full-screen</strong> lock and an LLM that fairly <strong>scores active recall</strong>, all inside a <strong>Python</strong> / <strong>Tkinter</strong> desktop app.',
      solution:
        'Computer-vision <strong>gaze tracking</strong> alerts you 5 seconds after you look away. A full-screen lock removes distractions. <strong>AI-scored recall sessions</strong> on the <strong>OpenAI API</strong> test what you remember. Retention, not time served.',
      story:
        'Shipped as a desktop app with several themes (Obsidian, cyberpunk, cyberforest) at <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a>. A focus tool built by someone who needed it.',
    },
    subtitle_cs: 'Hluboká práce pro mozky s ADHD',
    description_cs:
      'Sledování očí přes webkameru vás upozorní 5 sekund po odvedení pohledu. Zámek celé obrazovky odstraní každé vyrušení. Testy vybavování hodnocené AI měří, co se uchytilo, ne odzírané minuty.',
    caseStudy_cs: {
      problem:
        'Většina studijních aplikací měří <strong>čas u obrazovky</strong>, ne učení. Mozek s <strong>ADHD</strong> dokáže zírat do otevřené učebnice, aniž by dovnitř cokoli šlo. Chybí poctivý signál, <strong>kolik jste si zapamatovali</strong>.',
      motivation:
        'StudyExe vzešlo z mého vlastního boje se soustředěním a <strong>hlubokou prací</strong>. Chtěl jsem nástroj, který mi drží oči na stránce a <strong>dokáže</strong>, jestli sezení zabralo. Vybavování, ne minuty.',
      challenges:
        '<strong>Sledování očí</strong> v reálném čase z obyčejné webkamery neodpouští. Detekce musela být rychlá, zvládnout pohyb hlavy, osvětlení i brýle a zachytit únik pozornosti během sekund bez falešných poplachů. K tomu opravdový zámek <strong>celé obrazovky</strong> a LLM, který férově <strong>hodnotí aktivní vybavování</strong>, to celé v aplikaci v <strong>Pythonu</strong> a <strong>Tkinteru</strong>.',
      solution:
        '<strong>Sledování pohledu</strong> počítačovým viděním vás upozorní 5 sekund poté, co se podíváte jinam. Zámek celé obrazovky odstraní vyrušení. <strong>Sezení s vybavováním hodnocená AI</strong> přes <strong>OpenAI API</strong> testují, co si pamatujete. Zapamatování, ne odseděný čas.',
      story:
        'Vyšlo jako desktopová aplikace s několika tématy (Obsidian, cyberpunk, cyberforest) na <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a>. Nástroj na soustředění od někoho, kdo ho potřeboval.',
    },
    subtitle_sk: 'Hlboká práca pre mozgy s ADHD',
    description_sk:
      'Sledovanie očí cez webkameru vás upozorní 5 sekúnd po odvedení pohľadu. Zámok celej obrazovky odstráni každé vyrušenie. Testy vybavovania hodnotené AI merajú, čo sa uchytilo, nie odsedené minúty.',
    caseStudy_sk: {
      problem:
        'Väčšina študijných aplikácií meria <strong>čas pred obrazovkou</strong>, nie učenie. Mozog s <strong>ADHD</strong> dokáže civieť do otvorenej učebnice bez toho, aby dovnútra čokoľvek išlo. Chýba úprimný signál, <strong>koľko ste si zapamätali</strong>.',
      motivation:
        'StudyExe vzišlo z môjho vlastného boja so sústredením a <strong>hlbokou prácou</strong>. Chcel som nástroj, ktorý mi drží oči na stránke a <strong>dokáže</strong>, či sedenie zabralo. Vybavovanie, nie minúty.',
      challenges:
        '<strong>Sledovanie očí</strong> v reálnom čase z obyčajnej webkamery neodpúšťa. Detekcia musela byť rýchla, zvládnuť pohyb hlavy, osvetlenie aj okuliare a zachytiť únik pozornosti v priebehu sekúnd bez falošných poplachov. K tomu skutočný zámok <strong>celej obrazovky</strong> a LLM, ktorý férovo <strong>hodnotí aktívne vybavovanie</strong>, to celé v aplikácii v <strong>Pythone</strong> a <strong>Tkinteri</strong>.',
      solution:
        '<strong>Sledovanie pohľadu</strong> počítačovým videním vás upozorní 5 sekúnd po tom, čo sa pozriete inam. Zámok celej obrazovky odstráni vyrušenia. <strong>Sedenia s vybavovaním hodnotené AI</strong> cez <strong>OpenAI API</strong> testujú, čo si pamätáte. Zapamätanie, nie odsedený čas.',
      story:
        'Vyšlo ako desktopová aplikácia s viacerými témami (Obsidian, cyberpunk, cyberforest) na <a href="https://www.studyexe.com" target="_blank" rel="noopener noreferrer">studyexe.com</a>. Nástroj na sústredenie od niekoho, kto ho potreboval.',
    },
  },
  {
    id: 'kouzelnici',
    number: '03',
    title: 'KouzelnikNaAkci.cz',
    subtitle: 'A directory for Czech & Slovak magicians',
    description:
      'Two-sided marketplace for hiring magicians in Czechia and Slovakia. Curated profiles, Stripe listings, automated email, 20+ city and occasion landing pages built for local search. Experimented with SEO, GEO, EMD here a lot.',
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
        'Booking a <strong>professional magician</strong> for a wedding, birthday, corporate event or kids\' party in Czechia or Slovakia had no good starting point. Performers sat on outdated sites and Facebook pages; organisers had nowhere central to <strong>compare and hire</strong> them.',
      motivation:
        'A <strong>two-sided marketplace</strong> gap with a <strong>local-SEO</strong> angle: high-intent searches like "magician for a party in Brno" and almost nobody ranking for them. Owning that traffic connects organisers and magicians.',
      challenges:
        'The <strong>cold-start chicken-and-egg problem</strong>: no organisers without performers, and vice versa. Plus real <strong>programmatic SEO</strong>: 20+ city × occasion landing pages that rank locally without becoming thin duplicate content, <strong>Stripe</strong> paid listings, automated transactional email.',
      solution:
        '<strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> with <strong>Tailwind CSS</strong> on <strong>Vercel</strong>: fast server-rendered, SEO-friendly pages. Curated profiles, <strong>Stripe</strong> listings, automated email, 20+ programmatic <strong>city & occasion landing pages</strong> tuned for local search.',
      story:
        'It runs today at <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a>, a small niche marketplace for the Czech and Slovak events scene.',
    },
    subtitle_cs: 'Katalog českých a slovenských kouzelníků',
    description_cs:
      'Oboustranné tržiště pro objednání kouzelníka v Česku a na Slovensku. Vybrané profily, inzeráty přes Stripe, automatizované e-maily, 20+ vstupních stránek pro města a příležitosti stavěných na lokální vyhledávání.',
    caseStudy_cs: {
      problem:
        'Kdo si chtěl v Česku nebo na Slovensku <strong>objednat profesionálního kouzelníka</strong> na svatbu, narozeniny, firemní akci nebo dětskou párty, neměl kde hledat. Vystupující byli roztroušení po zastaralých webech a Facebooku; organizátoři je neměli kde <strong>porovnat a najmout</strong>.',
      motivation:
        'Mezera pro <strong>oboustranné tržiště</strong> s <strong>lokálně-SEO</strong> úhlem: vyhledávání jako "kouzelník na oslavu v Brně", na která skoro nikdo nerankoval. Ovládnout ten provoz znamená propojit organizátory a kouzelníky.',
      challenges:
        '<strong>Problém studeného startu</strong>: žádní organizátoři bez vystupujících a naopak. K tomu <strong>programatické SEO</strong>: 20+ vstupních stránek pro města a příležitosti, které rankují lokálně a nezvrhnou se v tenký duplicitní obsah, placené inzeráty přes <strong>Stripe</strong>, automatizované transakční e-maily.',
      solution:
        '<strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> s <strong>Tailwind CSS</strong> na <strong>Vercelu</strong>: rychlé serverem renderované stránky přívětivé k SEO. Vybrané profily, inzeráty přes <strong>Stripe</strong>, automatizované e-maily, 20+ programatických <strong>stránek pro města a příležitosti</strong> laděných na lokální vyhledávání.',
      story:
        'Běží dnes na <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a>, malé nišové tržiště pro českou a slovenskou scénu akcí.',
    },
    subtitle_sk: 'Katalóg pre českých a slovenských kúzelníkov',
    description_sk:
      'Obojstranné trhovisko na objednanie kúzelníka v Česku a na Slovensku. Vybrané profily, inzeráty cez Stripe, automatizované e-maily, 20+ vstupných stránok pre mestá a príležitosti stavaných na lokálne vyhľadávanie.',
    caseStudy_sk: {
      problem:
        'Kto si chcel v Česku alebo na Slovensku <strong>objednať profesionálneho kúzelníka</strong> na svadbu, narodeniny, firemnú akciu alebo detskú párty, nemal kde hľadať. Účinkujúci boli roztrúsení po zastaraných weboch a Facebooku; organizátori ich nemali kde <strong>porovnať a najať</strong>.',
      motivation:
        'Medzera pre <strong>obojstranné trhovisko</strong> s <strong>lokálno-SEO</strong> uhlom: vyhľadávania ako "kúzelník na oslavu v Brne", na ktoré takmer nikto nerankoval. Ovládnuť tento dopyt znamená prepojiť organizátorov a kúzelníkov.',
      challenges:
        '<strong>Problém studeného štartu</strong>: žiadni organizátori bez účinkujúcich a naopak. K tomu <strong>programatické SEO</strong>: 20+ vstupných stránok pre mestá a príležitosti, ktoré rankujú lokálne a nezvrhnú sa na tenký duplicitný obsah, platené inzeráty cez <strong>Stripe</strong>, automatizované transakčné e-maily.',
      solution:
        '<strong>Next.js</strong> + <strong>React</strong> + <strong>TypeScript</strong> s <strong>Tailwind CSS</strong> na <strong>Verceli</strong>: rýchle serverom renderované stránky priateľské k SEO. Vybrané profily, inzeráty cez <strong>Stripe</strong>, automatizované e-maily, 20+ programatických <strong>stránok pre mestá a príležitosti</strong> ladených na lokálne vyhľadávanie.',
      story:
        'Beží dnes na <a href="https://www.kouzelniknaakci.cz" target="_blank" rel="noopener noreferrer">kouzelniknaakci.cz</a>, malé nišové trhovisko pre českú a slovenskú scénu akcií.',
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
        'The news tells you <strong>what</strong> happened, rarely <strong>where</strong> and <strong>when</strong>. Thousands of articles a day name places, but the geography stays locked in plain text, invisible on any map.',
      motivation:
        'At the <strong>Newsmatics Hackathon</strong> in Brno, my team <strong>MOGGERS</strong> set out to make news spatial ("news as geography") and build the whole <strong>NLP-to-visualisation</strong> pipeline in one weekend.',
      challenges:
        'Extracting locations meant <strong>named-entity recognition</strong> plus <strong>geographic disambiguation</strong>: is "Paris" the French capital or a town in Texas? Then matching against <strong>GeoNames</strong>, keeping extraction fast, rendering thousands of points on a 3D globe, and syncing a <strong>timeline playback</strong>, all before the deadline.',
      solution:
        'A <strong>Python</strong> pipeline with <strong>LangChain</strong> and <strong>NLP</strong> extracts locations, matches them to coordinates via the <strong>GeoNames</strong> gazetteer, and plots them on a 3D globe with <strong>Globe.gl</strong> in <strong>JavaScript</strong>. A timeline scrubber replays events across the world.',
      story:
        'One of the projects I\'m proudest of. Read the full weekend write-up in <a href="/blog/newsmatics-hackathon">my Newsmatics Hackathon story</a>.',
    },
    subtitle_cs: 'Zprávy jako geografie',
    description_cs:
      'Pomocí NLP vytahuje místa z novinových článků, páruje je s databází GeoNames a vykresluje na interaktivním 3D globusu. Časová osa přehrává světové události. Postaveno za jeden hackathonový víkend.',
    caseStudy_cs: {
      problem:
        'Zprávy řeknou, <strong>co</strong> se stalo, málokdy <strong>kde</strong> a <strong>kdy</strong>. Tisíce článků denně zmiňují místa, ale ta geografie zůstává zamčená v prostém textu, neviditelná na mapě.',
      motivation:
        'Na <strong>hackathonu Newsmatics</strong> v Brně si můj tým <strong>MOGGERS</strong> vzal za cíl udělat zprávy prostorové ("zprávy jako geografie") a postavit celou linku <strong>od NLP po vizualizaci</strong> za jeden víkend.',
      challenges:
        'Vytáhnout místa z článků znamenalo <strong>rozpoznávání pojmenovaných entit</strong> a <strong>geografickou disambiguaci</strong>: je "Paříž" francouzská metropole, nebo městečko v Texasu? Pak spárovat zmínky s <strong>GeoNames</strong>, udržet extrakci rychlou, vykreslit tisíce bodů na 3D globusu a sladit to s <strong>časovou osou</strong>, všechno do termínu.',
      solution:
        'Linka v <strong>Pythonu</strong> s <strong>LangChain</strong> a <strong>NLP</strong> vytahuje místa, páruje je se souřadnicemi přes rejstřík <strong>GeoNames</strong> a vykresluje je na 3D globusu s <strong>Globe.gl</strong> v <strong>JavaScriptu</strong>. Posuvník časové osy přehrává události po celém světě.',
      story:
        'Jeden z projektů, na které jsem nejpyšnější. Celý víkendový zápis je v <a href="/cs/blog/newsmatics-hackathon">mém příběhu z hackathonu Newsmatics</a>.',
    },
    subtitle_sk: 'Správy ako geografia',
    description_sk:
      'Pomocou NLP vyťahuje miesta z novinových článkov, páruje ich s databázou GeoNames a vykresľuje na interaktívnom 3D glóbuse. Časová os prehráva svetové udalosti. Postavené za jeden hackathonový víkend.',
    caseStudy_sk: {
      problem:
        'Správy povedia, <strong>čo</strong> sa stalo, málokedy <strong>kde</strong> a <strong>kedy</strong>. Tisíce článkov denne spomínajú miesta, ale tá geografia zostáva zamknutá v prostom texte, neviditeľná na mape.',
      motivation:
        'Na <strong>hackathone Newsmatics</strong> v Brne si môj tím <strong>MOGGERS</strong> dal za cieľ urobiť správy priestorové ("správy ako geografia") a postaviť celú linku <strong>od NLP po vizualizáciu</strong> za jeden víkend.',
      challenges:
        'Vytiahnuť miesta z článkov znamenalo <strong>rozpoznávanie pomenovaných entít</strong> a <strong>geografickú disambiguáciu</strong>: je "Paríž" francúzska metropola alebo mestečko v Texase? Potom spárovať zmienky s <strong>GeoNames</strong>, udržať extrakciu rýchlu, vykresliť tisíce bodov na 3D glóbuse a zladiť to s <strong>časovou osou</strong>, všetko do termínu.',
      solution:
        'Linka v <strong>Pythone</strong> s <strong>LangChain</strong> a <strong>NLP</strong> vyťahuje miesta, páruje ich so súradnicami cez register <strong>GeoNames</strong> a vykresľuje ich na 3D glóbuse s <strong>Globe.gl</strong> v <strong>JavaScripte</strong>. Posuvník časovej osi prehráva udalosti po celom svete.',
      story:
        'Jeden z projektov, na ktoré som najhrdší. Celý víkendový zápis je v <a href="/sk/blog/newsmatics-hackathon">mojom príbehu z hackathonu Newsmatics</a>.',
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
        'Most <strong>small and mid-sized businesses</strong> in Czechia and Slovakia know <strong>AI</strong> could help their teams. They cannot run a software project to get it, and they worry about <strong>data privacy</strong> in someone else\'s cloud.',
      motivation:
        'Remove every excuse a non-technical team has for skipping AI: no setup, no maintenance, no data leaving the building. A <strong>done-for-you, managed deployment</strong>, instead of another app to babysit.',
      challenges:
        '<strong>On-premise</strong> means real hardware: provisioning <strong>dedicated hardware</strong>, installing it at the client\'s office, <strong>InfoSec hardening</strong>, <strong>GDPR-friendly</strong> data handling so everything stays local. Then updates, maintenance, and the <strong>B2B SaaS</strong> side: contracts, billing, onboarding.',
      solution:
        'NasadClaw deploys the <strong>OpenClaw</strong> AI assistant: physical installation on dedicated hardware at the client\'s office, InfoSec hardening, ongoing maintenance. The product surface runs on <strong>Next.js</strong>, <strong>TypeScript</strong> and <strong>Tailwind CSS</strong>, with <strong>Stripe</strong> for payments and <strong>PostHog</strong> for analytics.',
      story:
        'Live as a <strong>B2B</strong> offering at <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a>: private, on-site AI for Czech and Slovak enterprises.',
    },
    subtitle_cs: 'AI infrastruktura pro české a slovenské firmy',
    description_cs:
      'AI asistent OpenClaw nasazený pro firemní týmy: instalace na vyhrazeném hardwaru v kanceláři klienta, zabezpečení z pohledu InfoSec, průběžná údržba. Žádná data neopouštějí budovu.',
    caseStudy_cs: {
      problem:
        'Většina <strong>malých a středních firem</strong> v Česku a na Slovensku ví, že <strong>AI</strong> by jejich týmům pomohla. Nemají kapacitu rozjet softwarový projekt a bojí se o <strong>ochranu dat</strong> v cizím cloudu.',
      motivation:
        'Odstranit každou výmluvu, proč netechnický tým AI nepřijme: žádné nastavování, žádná údržba, žádná data mimo budovu. <strong>Spravované nasazení na klíč</strong>, ne další aplikace na hlídání.',
      challenges:
        '<strong>On-premise</strong> znamená skutečný hardware: pořídit <strong>vyhrazený hardware</strong>, nainstalovat ho v kanceláři klienta, k tomu <strong>InfoSec hardening</strong> a nakládání s daty podle <strong>GDPR</strong>, aby všechno zůstalo lokální. Pak aktualizace, údržba a <strong>B2B SaaS</strong> stránka věci: smlouvy, fakturace, onboarding.',
      solution:
        'NasadClaw nasazuje AI asistenta <strong>OpenClaw</strong>: fyzická instalace na vyhrazeném hardwaru v kanceláři klienta, InfoSec hardening, průběžná údržba. Povrch produktu běží na <strong>Next.js</strong>, <strong>TypeScript</strong> a <strong>Tailwind CSS</strong>, se <strong>Stripe</strong> pro platby a <strong>PostHog</strong> pro analytiku.',
      story:
        'Běží jako <strong>B2B</strong> nabídka na <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a>: soukromá AI přímo v budově pro české a slovenské firmy.',
    },
    subtitle_sk: 'AI infraštruktúra pre české a slovenské firmy',
    description_sk:
      'AI asistent OpenClaw nasadený pre firemné tímy: inštalácia na vyhradenom hardvéri v kancelárii klienta, zabezpečenie z pohľadu InfoSec, priebežná údržba. Žiadne dáta neopúšťajú budovu.',
    caseStudy_sk: {
      problem:
        'Väčšina <strong>malých a stredných firiem</strong> v Česku a na Slovensku vie, že <strong>AI</strong> by ich tímom pomohla. Nemajú kapacitu rozbehnúť softvérový projekt a boja sa o <strong>ochranu dát</strong> v cudzom cloude.',
      motivation:
        'Odstrániť každú výhovorku, prečo netechnický tím AI neprijme: žiadne nastavovanie, žiadna údržba, žiadne dáta mimo budovy. <strong>Spravované nasadenie na kľúč</strong>, nie ďalšia aplikácia na stráženie.',
      challenges:
        '<strong>On-premise</strong> znamená skutočný hardvér: zaobstarať <strong>vyhradený hardvér</strong>, nainštalovať ho v kancelárii klienta, k tomu <strong>InfoSec hardening</strong> a narábanie s dátami podľa <strong>GDPR</strong>, aby všetko zostalo lokálne. Potom aktualizácie, údržba a <strong>B2B SaaS</strong> stránka veci: zmluvy, fakturácia, onboarding.',
      solution:
        'NasadClaw nasadzuje AI asistenta <strong>OpenClaw</strong>: fyzická inštalácia na vyhradenom hardvéri v kancelárii klienta, InfoSec hardening, priebežná údržba. Povrch produktu beží na <strong>Next.js</strong>, <strong>TypeScript</strong> a <strong>Tailwind CSS</strong>, so <strong>Stripe</strong> pre platby a <strong>PostHog</strong> pre analytiku.',
      story:
        'Beží ako <strong>B2B</strong> ponuka na <a href="https://www.nasadclaw.cz" target="_blank" rel="noopener noreferrer">nasadclaw.cz</a>: súkromná AI priamo v budove pre české a slovenské firmy.',
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
        'You open a new tab dozens of times a day and see the same generic default <strong>new tab page</strong>. Extensions that personalise it usually upload <strong>your photos</strong> to their cloud and track you.',
      motivation:
        'I wanted my browser to reflect my own <strong>aesthetic</strong>: rotating <strong>collage wallpapers</strong> from my personal image library, fully editable and <strong>private by design</strong>. No accounts, no cloud, no tracking.',
      challenges:
        'Chrome\'s <strong>Manifest V3</strong> brings real constraints: service workers, strict content-security policy, no persistent background. Full-resolution images on-device meant <strong>IndexedDB</strong> via <strong>LocalForage</strong>, kept smooth while users <strong>drag, resize, rotate and layer</strong> large images. And it had to pass <strong>Chrome Web Store</strong> review.',
      solution:
        'A <strong>Manifest V3 Chrome extension</strong> in <strong>JavaScript</strong> that replaces the new tab page with rotating, editable collages. Drag, resize, rotate, layer. Everything persists locally in <strong>IndexedDB</strong> through <strong>LocalForage</strong>: no cloud, no tracking, ever.',
      story:
        'Published on the <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, source on <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHub</a>.',
    },
    subtitle_cs: 'Váš prohlížeč, vaše estetika',
    description_cs:
      'Rozšíření do Chromu, které promění novou kartu v rotující koláže z vaší vlastní knihovny obrázků. Posunout, zvětšit, otočit, navrstvit. Všechno zůstává v IndexedDB: žádný cloud, žádné sledování.',
    caseStudy_cs: {
      problem:
        'Novou kartu otevíráte mnohokrát denně a vidíte pořád tu samou generickou výchozí <strong>stránku nové karty</strong>. Rozšíření, která ji personalizují, obvykle nahrávají <strong>vaše fotky</strong> do svého cloudu a sledují vás.',
      motivation:
        'Chtěl jsem, aby prohlížeč odrážel moji <strong>estetiku</strong>: rotující <strong>kolážové tapety</strong> z vlastní knihovny obrázků, plně upravitelné a <strong>soukromé už z principu</strong>. Žádné účty, žádný cloud, žádné sledování.',
      challenges:
        '<strong>Manifest V3</strong> v Chromu přináší reálná omezení: service workery, přísnou content-security policy, žádné trvalé pozadí. Obrázky v plném rozlišení na zařízení znamenaly <strong>IndexedDB</strong> přes <strong>LocalForage</strong> a plynulý výkon, i když uživatelé <strong>táhnou, zvětšují, otáčejí a vrství</strong> velké obrázky. A muselo to projít kontrolou <strong>Chrome Web Store</strong>.',
      solution:
        '<strong>Rozšíření do Chromu na Manifest V3</strong> v <strong>JavaScriptu</strong>, které nahradí novou kartu rotujícími, upravitelnými kolážemi. Posunout, zvětšit, otočit, navrstvit. Všechno se ukládá lokálně v <strong>IndexedDB</strong> přes <strong>LocalForage</strong>: žádný cloud, žádné sledování, nikdy.',
      story:
        'Publikované v <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, zdrojový kód na <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHubu</a>.',
    },
    subtitle_sk: 'Váš prehliadač, vaša estetika',
    description_sk:
      'Rozšírenie do Chrome, ktoré premení novú kartu na rotujúce koláže z vašej vlastnej knižnice obrázkov. Potiahnuť, zväčšiť, otočiť, navrstviť. Všetko zostáva v IndexedDB: žiadny cloud, žiadne sledovanie.',
    caseStudy_sk: {
      problem:
        'Novú kartu otvárate desiatky ráz denne a vidíte stále tú istú generickú predvolenú <strong>stránku novej karty</strong>. Rozšírenia, ktoré ju personalizujú, obvykle nahrávajú <strong>vaše fotky</strong> do svojho cloudu a sledujú vás.',
      motivation:
        'Chcel som, aby prehliadač odrážal moju <strong>estetiku</strong>: rotujúce <strong>kolážové tapety</strong> z vlastnej knižnice obrázkov, plne upraviteľné a <strong>súkromné už z princípu</strong>. Žiadne účty, žiadny cloud, žiadne sledovanie.',
      challenges:
        '<strong>Manifest V3</strong> v Chrome prináša reálne obmedzenia: service workery, prísnu content-security policy, žiadne trvalé pozadie. Obrázky v plnom rozlíšení na zariadení znamenali <strong>IndexedDB</strong> cez <strong>LocalForage</strong> a plynulý výkon, aj keď používatelia <strong>ťahajú, zväčšujú, otáčajú a vrstvia</strong> veľké obrázky. A muselo to prejsť kontrolou <strong>Chrome Web Store</strong>.',
      solution:
        '<strong>Rozšírenie do Chrome na Manifest V3</strong> v <strong>JavaScripte</strong>, ktoré nahradí novú kartu rotujúcimi, upraviteľnými kolážami. Potiahnuť, zväčšiť, otočiť, navrstviť. Všetko sa ukladá lokálne v <strong>IndexedDB</strong> cez <strong>LocalForage</strong>: žiadny cloud, žiadne sledovanie, nikdy.',
      story:
        'Publikované v <a href="https://chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao" target="_blank" rel="noopener noreferrer">Chrome Web Store</a>, zdrojový kód na <a href="https://github.com/Rauded/college_extension_chrome" target="_blank" rel="noopener noreferrer">GitHube</a>.',
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
