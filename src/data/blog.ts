export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  thumbnail?: string; // cover image for the blog listing card
  content: string; // HTML string
  pinned?: boolean; // surfaced as the featured post on the blog feed
  footnote?: string; // event/credits dateline, rendered consistently after the article
  // Slovak translations. Applied by localizeBlogPost() when locale === 'sk'.
  title_sk?: string;
  excerpt_sk?: string;
  category_sk?: string;
  content_sk?: string;
  footnote_sk?: string;
  // Czech translations. Applied by localizeBlogPost() when locale === 'cs'.
  title_cs?: string;
  excerpt_cs?: string;
  category_cs?: string;
  content_cs?: string;
  footnote_cs?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'newsmatics-hackathon',
    title: 'Newsmatics Hackathon',
    date: '2026-02-27',
    category: 'Hackathons & Builds',
    excerpt:
      'I spent a weekend hacking with team MOGGERS on Newsmatics Globe, a pipeline that pulls locations out of news articles and plots them on an interactive 3D globe. Here is how the weekend went.',
    thumbnail: '/blog/newsmatics/group.jpg',
    content: `
      <p>On <strong>27-28 February 2026</strong> I took part in the <strong><a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">Newsmatics Hackathon</a></strong> in Brno with my team, <strong>MOGGERS</strong>. We built <strong>Newsmatics Globe</strong>, a geolocation pipeline: it pulls place names out of news articles with NLP, matches them against the GeoNames database, and plots them on an interactive 3D globe. There's a timeline you can scrub to watch events spread across the map. If you want the detail on the project itself, it's in the <a href="/#projects">projects on my homepage</a> (look for <strong>Newsmatics Globe</strong>).</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/group.jpg" alt="Full group photo of all Newsmatics Hackathon participants" class="blog-img" />
        <figcaption>Everyone who took part in the Newsmatics Hackathon.</figcaption>
      </figure>

      <h2>The Build</h2>
      <p>Most of the weekend looked exactly like this: laptops open, too much coffee, working through the pipeline piece by piece. We split the work three ways, one of us on the NLP extraction, one on the GeoNames matching, one on the front-end globe. The back half of the event was mostly stitching it together and tuning the timeline.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/working.jpg" alt="Working at the hackathon, coding on laptops with a teammate" class="blog-img" />
      </figure>

      <h2>Team MOGGERS</h2>
      <p>We competed as <strong>MOGGERS</strong>, three of us, each owning a different part of the stack. Pitching the globe to the judges with the timeline running live was the moment everything we'd built that weekend finally clicked into one demo.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/team.jpg" alt="Team MOGGERS portrait at the Newsmatics Hackathon" class="blog-img" />
      </figure>

      <h2>The Award Ceremony</h2>
      <p>The event wrapped up with an award ceremony and certificates for the teams. Standing up there with the organisers and the other participants was a great way to close out an intense couple of days.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/awards.jpg" alt="Award ceremony at the Newsmatics Hackathon with participants holding certificates" class="blog-img" />
      </figure>

      <h2>Final Thoughts</h2>
      <p>Hackathons are still my favourite way to build. You get a tight deadline, a real problem, and a small team that has to figure it out fast. Newsmatics Globe started as a weekend project here and turned into one of the things I'm most proud of. Thanks to <strong>Newsmatics</strong> for putting it on. Their official recap is on the <a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">Newsmatics Hackathon 2026 page</a>.</p>
      <p>Want the technical details? Head over to the <a href="/#projects">projects on my homepage</a> and find <strong>Newsmatics Globe</strong>.</p>
    `,
    footnote:
      'Newsmatics Hackathon · Brno, Czech Republic · 27-28 February 2026<br/>Team MOGGERS · Project: Newsmatics Globe · <a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">newsmatics.com</a>',
    title_sk: 'Newsmatics Hackathon',
    category_sk: 'Hackathony a projekty',
    excerpt_sk:
      'Strávil som víkend hackovaním s tímom MOGGERS na projekte Newsmatics Globe, čo je pipeline, ktorý ťahá lokality z novinových článkov a zakresľuje ich na interaktívny 3D glóbus. Takto ten víkend prebehol.',
    content_sk: `
      <p>V dňoch <strong>27. až 28. februára 2026</strong> som sa zúčastnil <strong><a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">Newsmatics Hackathonu</a></strong> v Brne s mojím tímom <strong>MOGGERS</strong>. Postavili sme <strong>Newsmatics Globe</strong>, geolokačný pipeline: pomocou NLP ťahá názvy miest z novinových článkov, páruje ich s databázou GeoNames a zakresľuje ich na interaktívny 3D glóbus. Je tam časová os, ktorou môžeš posúvať a sledovať, ako sa udalosti šíria po mape. Ak chceš detaily o samotnom projekte, nájdeš ich medzi <a href="/#projects">projektmi na mojej domovskej stránke</a> (hľadaj <strong>Newsmatics Globe</strong>).</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/group.jpg" alt="Skupinová fotka všetkých účastníkov Newsmatics Hackathonu" class="blog-img" />
        <figcaption>Všetci, ktorí sa zúčastnili Newsmatics Hackathonu.</figcaption>
      </figure>

      <h2>Ako sme to stavali</h2>
      <p>Väčšina víkendu vyzerala presne takto: otvorené notebooky, priveľa kávy, prechádzali sme pipeline kúsok po kúsku. Prácu sme si rozdelili na tri časti, jeden z nás robil na NLP extrakcii, druhý na párovaní s GeoNames a tretí na frontendovom glóbuse. Druhá polovica akcie bola hlavne o zošívaní všetkého dokopy a ladení časovej osi.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/working.jpg" alt="Práca na hackathone, programovanie na notebookoch s kolegom z tímu" class="blog-img" />
      </figure>

      <h2>Tím MOGGERS</h2>
      <p>Súťažili sme ako <strong>MOGGERS</strong>, traja, každý mal na starosti inú časť stacku. Keď sme glóbus prezentovali porote a časová os bežala naživo, v tej chvíli všetko, čo sme cez víkend postavili, konečne zapadlo do jedného dema.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/team.jpg" alt="Portrét tímu MOGGERS na Newsmatics Hackathone" class="blog-img" />
      </figure>

      <h2>Vyhlásenie výsledkov</h2>
      <p>Akcia sa zavŕšila vyhlásením výsledkov a certifikátmi pre tímy. Stáť tam hore s organizátormi a ostatnými účastníkmi bol skvelý spôsob, ako uzavrieť náročných pár dní.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/awards.jpg" alt="Vyhlásenie výsledkov na Newsmatics Hackathone, účastníci držia certifikáty" class="blog-img" />
      </figure>

      <h2>Na záver</h2>
      <p>Hackathony sú stále môj obľúbený spôsob, ako niečo postaviť. Dostaneš tesný termín, reálny problém a malý tím, ktorý to musí rýchlo vyriešiť. Newsmatics Globe začal ako víkendový projekt práve tu a vyrástol z neho jeden z výsledkov, na ktoré som najviac hrdý. Ďakujem <strong>Newsmatics</strong> za zorganizovanie. Ich oficiálne zhrnutie nájdeš na <a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">stránke Newsmatics Hackathon 2026</a>.</p>
      <p>Chceš technické detaily? Zájdi na <a href="/#projects">projekty na mojej domovskej stránke</a> a nájdi <strong>Newsmatics Globe</strong>.</p>
    `,
    footnote_sk:
      'Newsmatics Hackathon · Brno, Česká republika · 27. až 28. februára 2026<br/>Tím MOGGERS · Projekt: Newsmatics Globe · <a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">newsmatics.com</a>',
    title_cs: 'Newsmatics Hackathon',
    category_cs: 'Hackathony a projekty',
    excerpt_cs:
      'Strávil jsem víkend hackováním s týmem MOGGERS na projektu Newsmatics Globe, což je pipeline, který tahá lokality z novinových článků a zakresluje je na interaktivní 3D glóbus. Takhle ten víkend proběhl.',
    content_cs: `
      <p>Ve dnech <strong>27. až 28. února 2026</strong> jsem se zúčastnil <strong><a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">Newsmatics Hackathonu</a></strong> v Brně se svým týmem <strong>MOGGERS</strong>. Postavili jsme <strong>Newsmatics Globe</strong>, geolokační pipeline: pomocí NLP tahá názvy míst z novinových článků, páruje je s databází GeoNames a zakresluje je na interaktivní 3D glóbus. Je tam časová osa, kterou můžeš posouvat a sledovat, jak se události šíří po mapě. Pokud chceš detaily o samotném projektu, najdeš je mezi <a href="/#projects">projekty na mé domovské stránce</a> (hledej <strong>Newsmatics Globe</strong>).</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/group.jpg" alt="Skupinová fotka všech účastníků Newsmatics Hackathonu" class="blog-img" />
        <figcaption>Všichni, kdo se zúčastnili Newsmatics Hackathonu.</figcaption>
      </figure>

      <h2>Jak jsme to stavěli</h2>
      <p>Většina víkendu vypadala přesně takhle: otevřené notebooky, příliš mnoho kávy, procházeli jsme pipeline kousek po kousku. Práci jsme si rozdělili na tři části, jeden z nás dělal na NLP extrakci, druhý na párování s GeoNames a třetí na frontendovém glóbusu. Druhá polovina akce byla hlavně o sešívání všeho dohromady a ladění časové osy.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/working.jpg" alt="Práce na hackathonu, programování na noteboocích s kolegou z týmu" class="blog-img" />
      </figure>

      <h2>Tým MOGGERS</h2>
      <p>Soutěžili jsme jako <strong>MOGGERS</strong>, tři, každý měl na starosti jinou část stacku. Když jsme glóbus prezentovali porotě a časová osa běžela naživo, v tu chvíli všechno, co jsme přes víkend postavili, konečně zapadlo do jednoho dema.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/team.jpg" alt="Portrét týmu MOGGERS na Newsmatics Hackathonu" class="blog-img" />
      </figure>

      <h2>Vyhlášení výsledků</h2>
      <p>Akce se završila vyhlášením výsledků a certifikáty pro týmy. Stát tam nahoře s organizátory a ostatními účastníky byl skvělý způsob, jak uzavřít náročných pár dní.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/awards.jpg" alt="Vyhlášení výsledků na Newsmatics Hackathonu, účastníci drží certifikáty" class="blog-img" />
      </figure>

      <h2>Na závěr</h2>
      <p>Hackathony jsou pořád můj oblíbený způsob, jak něco postavit. Dostaneš těsný termín, reálný problém a malý tým, který to musí rychle vyřešit. Newsmatics Globe začal jako víkendový projekt právě tady a vyrostl z něj jeden z výsledků, na které jsem nejvíc hrdý. Děkuji <strong>Newsmatics</strong> za zorganizování. Jejich oficiální shrnutí najdeš na <a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">stránce Newsmatics Hackathon 2026</a>.</p>
      <p>Chceš technické detaily? Zajdi na <a href="/#projects">projekty na mé domovské stránce</a> a najdi <strong>Newsmatics Globe</strong>.</p>
    `,
    footnote_cs:
      'Newsmatics Hackathon · Brno, Česká republika · 27. až 28. února 2026<br/>Tým MOGGERS · Projekt: Newsmatics Globe · <a href="https://www.newsmatics.com/news-index/hackathon-2026" target="_blank" rel="noopener noreferrer">newsmatics.com</a>',
  },
  {
    slug: 'digital-fairness-act-youth-dialogue',
    title: 'Invited by the European Commission to discuss the Digital Fairness Act With EU Commissioner Michael McGrath',
    date: '2026-06-25',
    category: 'Tech & Policy',
    pinned: true,
    excerpt:
      'I joined a European Commission Youth Policy Dialogue in Ljubljana with EU Commissioner Michael McGrath, where we worked through what the upcoming Digital Fairness Act should actually do about deceptive design, pricing, and digital contracts.',
    thumbnail: '/blog/digital-fairness/youth-policy-dialogue.png',
    content: `
      <p>I took part in a <strong>European Commission Youth Policy Dialogue</strong> in <strong>Ljubljana</strong> and sat down with <strong>EU Commissioner Michael McGrath</strong> to talk about the <strong>Digital Fairness Act</strong>, the EU's upcoming push to clean up how online services treat people. What stuck with me was that the conversation about the rules happened <em>with</em> the people they're meant to protect, not just about them.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/youth-policy-dialogue.png" alt="Youth Policy Dialogue on the Digital Fairness Act with Commissioner Michael McGrath in Ljubljana" class="blog-img" />
      </figure>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-03.jpg" alt="Open Q&amp;A with the panel during the Digital Fairness Act dialogue, Commissioner McGrath listening" class="blog-img" />
        <figcaption>The open Q&amp;A with the panel, Commissioner McGrath listening on the right.</figcaption>
      </figure>

      <h2>What We Worked On</h2>
      <p>Instead of abstract talking points, we mapped out concrete asks across <strong>pricing, marketing practices, and digital contracts</strong>. A few themes kept coming up. Ban <strong>deceptive practices and dark patterns</strong>. Set <strong>standardised requirements</strong> so people actually understand what they're agreeing to. And price things in <strong>real currency</strong> instead of the in-app token systems built to hide how much you're really spending.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-05.jpg" alt="Working group mapping deceptive design and dark patterns for the Digital Fairness Act" class="blog-img" />
        <figcaption>In our working group, with the "Dark Patterns" board on the table and the Digital Fairness principles in hand.</figcaption>
      </figure>

      <figure class="blog-figure">
        <video class="blog-video" controls preload="metadata" playsinline poster="/blog/digital-fairness/df-wetalk-poster.jpg">
          <source src="/blog/digital-fairness/df-wetalk.mp4" type="video/mp4" />
        </video>
        <figcaption>A few moments from the day: the roundtables, the side conversations, the open discussion.</figcaption>
      </figure>

      <h2>Why It Matters</h2>
      <p>So much of the modern web is built to nudge and pressure you into things: manipulative defaults, fake urgency, subscriptions that take one click to start and a support ticket to cancel. I build software, so I think a lot about where the line sits between good design and design that just exploits people. Getting to argue that line with the person actually shaping the legislation is not something I expected to be doing this year.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-02.jpg" alt="Eduard Hvizdak listening during a session of the Youth Policy Dialogue" class="blog-img" />
        <figcaption>Listening in during one of the sessions.</figcaption>
      </figure>

      <h2>Final Thoughts</h2>
      <p>I left convinced that youth input on digital policy isn't just a box-ticking exercise. The people who grew up inside these systems tend to spot the manipulation fastest. Thanks to the <strong>European Commission</strong> and Commissioner <strong>Michael McGrath</strong> for actually listening.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-01.jpg" alt="Group photo of the young participants with Commissioner Michael McGrath in Ljubljana" class="blog-img" />
        <figcaption>The full group of young participants with Commissioner Michael McGrath in Ljubljana.</figcaption>
      </figure>
    `,
    footnote:
      'Youth Policy Dialogue: Digital Fairness Act · Ljubljana, Slovenia<br/>With European Commissioner Michael McGrath · European Commission',
    title_sk:
      'Európska komisia ma pozvala diskutovať o Digital Fairness Act s eurokomisárom Michaelom McGrathom',
    category_sk: 'Tech a politika',
    excerpt_sk:
      'Zapojil som sa do Youth Policy Dialogue Európskej komisie v Ľubľane s eurokomisárom Michaelom McGrathom, kde sme rozoberali, čo by pripravovaný Digital Fairness Act mal reálne robiť s klamlivým dizajnom, cenotvorbou a digitálnymi zmluvami.',
    content_sk: `
      <p>Zúčastnil som sa <strong>Youth Policy Dialogue Európskej komisie</strong> v <strong>Ľubľane</strong> a sadol si s <strong>eurokomisárom Michaelom McGrathom</strong>, aby sme sa rozprávali o <strong>Digital Fairness Act</strong>, pripravovanej snahe EÚ upratať to, ako online služby zaobchádzajú s ľuďmi. Najviac mi utkvelo, že rozhovor o pravidlách prebiehal <em>s</em> ľuďmi, ktorých majú chrániť, nielen o nich.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/youth-policy-dialogue.png" alt="Youth Policy Dialogue o Digital Fairness Act s komisárom Michaelom McGrathom v Ľubľane" class="blog-img" />
      </figure>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-03.jpg" alt="Otvorené Q&amp;A s panelom počas dialógu o Digital Fairness Act, komisár McGrath počúva" class="blog-img" />
        <figcaption>Otvorené Q&amp;A s panelom, komisár McGrath počúva vpravo.</figcaption>
      </figure>

      <h2>Na čom sme pracovali</h2>
      <p>Namiesto abstraktných téz sme zmapovali konkrétne požiadavky naprieč <strong>cenotvorbou, marketingovými praktikami a digitálnymi zmluvami</strong>. Opakovalo sa pár tém. Zakázať <strong>klamlivé praktiky a temné vzory (dark patterns)</strong>. Nastaviť <strong>štandardizované požiadavky</strong>, aby ľudia naozaj rozumeli, s čím súhlasia. A uvádzať ceny v <strong>reálnej mene</strong> namiesto systémov herných tokenov v aplikáciách, ktoré majú skryť, koľko v skutočnosti míňaš.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-05.jpg" alt="Pracovná skupina mapuje klamlivý dizajn a dark patterns pre Digital Fairness Act" class="blog-img" />
        <figcaption>V našej pracovnej skupine, s tabuľou "Dark Patterns" na stole a princípmi Digital Fairness v ruke.</figcaption>
      </figure>

      <figure class="blog-figure">
        <video class="blog-video" controls preload="metadata" playsinline poster="/blog/digital-fairness/df-wetalk-poster.jpg">
          <source src="/blog/digital-fairness/df-wetalk.mp4" type="video/mp4" />
        </video>
        <figcaption>Pár momentov z dňa: okrúhle stoly, rozhovory bokom, otvorená diskusia.</figcaption>
      </figure>

      <h2>Prečo na tom záleží</h2>
      <p>Veľká časť moderného webu je postavená tak, aby ťa postrkovala a tlačila do vecí: manipulatívne predvolené nastavenia, falošná naliehavosť, predplatné, ktoré spustíš jedným klikom a na zrušenie potrebuješ ticket na podporu. Vyvíjam softvér, takže veľa premýšľam o tom, kde je hranica medzi dobrým dizajnom a dizajnom, ktorý ľudí len zneužíva. Že sa o tejto hranici môžem hádať s človekom, ktorý reálne tvorí legislatívu, som tento rok nečakal.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-02.jpg" alt="Eduard Hvizdák počúva počas jednej zo sekcií Youth Policy Dialogue" class="blog-img" />
        <figcaption>Počúvam počas jednej zo sekcií.</figcaption>
      </figure>

      <h2>Na záver</h2>
      <p>Odchádzal som s presvedčením, že hlas mladých v digitálnej politike nie je len formalita pre odškrtnutie políčka. Ľudia, ktorí vyrástli vo vnútri týchto systémov, väčšinou odhalia manipuláciu najrýchlejšie. Ďakujem <strong>Európskej komisii</strong> a komisárovi <strong>Michaelovi McGrathovi</strong>, že naozaj počúvali.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-01.jpg" alt="Skupinová fotka mladých účastníkov s komisárom Michaelom McGrathom v Ľubľane" class="blog-img" />
        <figcaption>Celá skupina mladých účastníkov s komisárom Michaelom McGrathom v Ľubľane.</figcaption>
      </figure>
    `,
    footnote_sk:
      'Youth Policy Dialogue: Digital Fairness Act · Ľubľana, Slovinsko<br/>S eurokomisárom Michaelom McGrathom · Európska komisia',
    title_cs:
      'Evropská komise mě pozvala diskutovat o Digital Fairness Act s eurokomisařem Michaelem McGrathem',
    category_cs: 'Tech a politika',
    excerpt_cs:
      'Zapojil jsem se do Youth Policy Dialogue Evropské komise v Lublani s eurokomisařem Michaelem McGrathem, kde jsme probírali, co by připravovaný Digital Fairness Act měl reálně dělat s klamavým designem, tvorbou cen a digitálními smlouvami.',
    content_cs: `
      <p>Zúčastnil jsem se <strong>Youth Policy Dialogue Evropské komise</strong> v <strong>Lublani</strong> a sedl si s <strong>eurokomisařem Michaelem McGrathem</strong>, abychom se bavili o <strong>Digital Fairness Act</strong>, připravované snaze EU uklidit to, jak online služby zacházejí s lidmi. Nejvíc mi utkvělo, že rozhovor o pravidlech probíhal <em>s</em> lidmi, které mají chránit, nejen o nich.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/youth-policy-dialogue.png" alt="Youth Policy Dialogue o Digital Fairness Act s komisařem Michaelem McGrathem v Lublani" class="blog-img" />
      </figure>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-03.jpg" alt="Otevřené Q&amp;A s panelem během dialogu o Digital Fairness Act, komisař McGrath poslouchá" class="blog-img" />
        <figcaption>Otevřené Q&amp;A s panelem, komisař McGrath poslouchá vpravo.</figcaption>
      </figure>

      <h2>Na čem jsme pracovali</h2>
      <p>Místo abstraktních tezí jsme zmapovali konkrétní požadavky napříč <strong>tvorbou cen, marketingovými praktikami a digitálními smlouvami</strong>. Opakovalo se pár témat. Zakázat <strong>klamavé praktiky a temné vzory (dark patterns)</strong>. Nastavit <strong>standardizované požadavky</strong>, aby lidé opravdu rozuměli, s čím souhlasí. A uvádět ceny v <strong>reálné měně</strong> místo systémů herních tokenů v aplikacích, které mají skrýt, kolik ve skutečnosti utrácíš.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-05.jpg" alt="Pracovní skupina mapuje klamavý design a dark patterns pro Digital Fairness Act" class="blog-img" />
        <figcaption>V naší pracovní skupině, s tabulí "Dark Patterns" na stole a principy Digital Fairness v ruce.</figcaption>
      </figure>

      <figure class="blog-figure">
        <video class="blog-video" controls preload="metadata" playsinline poster="/blog/digital-fairness/df-wetalk-poster.jpg">
          <source src="/blog/digital-fairness/df-wetalk.mp4" type="video/mp4" />
        </video>
        <figcaption>Pár momentů ze dne: kulaté stoly, rozhovory bokem, otevřená diskuse.</figcaption>
      </figure>

      <h2>Proč na tom záleží</h2>
      <p>Velká část moderního webu je postavená tak, aby tě popostrkovala a tlačila do věcí: manipulativní výchozí nastavení, falešná naléhavost, předplatné, které spustíš jedním kliknutím a na zrušení potřebuješ ticket na podporu. Vyvíjím software, takže hodně přemýšlím o tom, kde je hranice mezi dobrým designem a designem, který lidi jen zneužívá. Že se o téhle hranici můžu přít s člověkem, který reálně tvoří legislativu, jsem letos nečekal.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-02.jpg" alt="Eduard Hvizdák poslouchá během jedné ze sekcí Youth Policy Dialogue" class="blog-img" />
        <figcaption>Poslouchám během jedné ze sekcí.</figcaption>
      </figure>

      <h2>Na závěr</h2>
      <p>Odcházel jsem s přesvědčením, že hlas mladých v digitální politice není jen formalita pro odškrtnutí políčka. Lidé, kteří vyrostli uvnitř těchto systémů, většinou odhalí manipulaci nejrychleji. Děkuji <strong>Evropské komisi</strong> a komisaři <strong>Michaelu McGrathovi</strong>, že opravdu poslouchali.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/df-01.jpg" alt="Skupinová fotka mladých účastníků s komisařem Michaelem McGrathem v Lublani" class="blog-img" />
        <figcaption>Celá skupina mladých účastníků s komisařem Michaelem McGrathem v Lublani.</figcaption>
      </figure>
    `,
    footnote_cs:
      'Youth Policy Dialogue: Digital Fairness Act · Lublaň, Slovinsko<br/>S eurokomisařem Michaelem McGrathem · Evropská komise',
  },
  {
    slug: 'zero-to-done',
    title: 'Zero to Done: Pitching InzerPro at a Startup Hackathon',
    date: '2026-06-08',
    category: 'Hackathons & Builds',
    excerpt:
      'A weekend in Brno at Zero to Done, the startup-build hackathon created by angel investor Petr Sochora and hosted at mime digital, one of the fastest-growing e-commerce agencies in the Czech Republic. The goal was not a demo but a real MVP people would pay for. I brought InzerPro and walked it through with mime digital founder and CEO Michal Mervart.',
    thumbnail: '/blog/zero-to-done/fireside.jpg',
    content: `
      <p>I spent a weekend in Brno at <strong>Zero to Done</strong>, and it's one of the best events I've taken part in. It was the <strong>very first run</strong>, put together by <strong><a href="https://www.linkedin.com/in/petr-sochora/" target="_blank" rel="noopener noreferrer">Petr Sochora</a></strong>, an angel investor and the finance and acquisition partner at <a href="https://www.mimedigital.cz/" target="_blank" rel="noopener noreferrer">mime digital</a>, who ran the whole thing out of mime digital's own office in the centre of Brno. mime digital is one of the <strong>fastest-growing e-commerce agencies in the Czech Republic</strong>: a Shoptet Premium partner, one of only four certified Shopify agencies in the country, and more than <strong>800 e-shops</strong> built by a 40-strong team under founder and CEO <strong><a href="https://cz.linkedin.com/in/michalmervart" target="_blank" rel="noopener noreferrer">Michal Mervart</a></strong>. The premise is right there on the banner, <em>Máš nápad, ale nevíš kde začít?</em> (Got an idea, but don't know where to start?), and the answer they hand you is blunt: build a real MVP in a single weekend. It lives at <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/fireside.jpg" alt="Fireside talk on stage at Zero to Done with the audience watching" class="blog-img" />
        <figcaption>One of the fireside talks. A lot of the value was in these sessions and the founders and investors running them.</figcaption>
      </figure>

      <h2>A Different Kind of Hackathon</h2>
      <p>What made it stand out is that it <strong>wasn't a hackathon for fun</strong>. It was a <strong>startup-build event</strong>. The bar wasn't "ship a cool demo," it was "build something people would actually pay for." Over the weekend you were expected to go talk to customers, test the product with real users, and show there was real demand. Investors were in the room, so it wasn't about winning an audience vote. It was about which teams were worth working with after the weekend ended. That changed how you spent every hour.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/demo-day.jpg" alt="The whole room gathered on couches watching teams present" class="blog-img" />
        <figcaption>Pitch time, with the whole room, mentors and investors included, watching teams present.</figcaption>
      </figure>

      <h2>I Brought InzerPro</h2>
      <p>I brought <strong>InzerPro</strong>, my classifieds-automation product, and used the weekend the way the event wanted: talking to potential customers, testing, and sharpening the pitch instead of just adding features. The highlight was sitting down with <strong>Michal Mervart</strong>, mime digital's founder and CEO, and walking him through the product line by line. Working on something I already care about, in a room full of people doing the same, made the whole thing click.</p>

      <figure class="blog-figure">
        <video class="blog-video" autoplay muted loop playsinline preload="metadata" poster="/blog/zero-to-done/build-montage-poster.jpg">
          <source src="/blog/zero-to-done/build-montage.mp4" type="video/mp4" />
        </video>
        <figcaption>Discussing InzerPro with <strong>Michal Mervart</strong>, founder and CEO of mime digital.</figcaption>
      </figure>

      <h2>High Quality, Top to Bottom</h2>
      <p>What surprised me most was how good the whole thing was, both the execution and the people. The organisation was tight, the program was well thought out, and there were a lot of <strong>genuinely impressive projects</strong> being built around me. Between <strong>Petr Sochora</strong> and the other mentors, I walked away with a pile of <strong>concrete advice</strong>: price on value, not cost; showing the product to 20 people beats adding 20 features; "great idea!" means nothing until someone actually pays; a pivot isn't a failure. The kind of feedback you only get from people who've actually built and sold things.</p>

      <h2>Off the Clock</h2>
      <p>The office had a rooftop terrace, and that's where most of the breaks happened. Some of the better conversations of the weekend were up there in the sun, away from the laptops.</p>

      <figure class="blog-figure">
        <video class="blog-video blog-video--portrait" autoplay muted loop playsinline preload="metadata" poster="/blog/zero-to-done/rooftop-poster.jpg">
          <source src="/blog/zero-to-done/rooftop.mp4" type="video/mp4" />
        </video>
        <figcaption>The view from mime digital's rooftop, over Brno.</figcaption>
      </figure>

      <h2>Final Thoughts</h2>
      <p>Huge thanks to <strong>Petr Sochora</strong> for creating Zero to Done, and to <strong>Michal Mervart</strong> and the whole <strong>mime digital</strong> team for hosting and setting the bar this high on a first run. Events that push you toward real customers instead of a demo are rare, and this one nailed it. I'd do it again in a heartbeat.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/group.jpg" alt="The full Zero to Done cohort posing on the rooftop" class="blog-img" />
      </figure>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/group-celebrate.jpg" alt="The same Zero to Done cohort on the rooftop with hands raised" class="blog-img" />
        <figcaption>The whole cohort on the roof, one weekend in.</figcaption>
      </figure>

      <p>Curious about the product I brought? Head to my <a href="/#projects">projects on my homepage</a> and look for <strong>InzerPro</strong>.</p>
    `,
    footnote:
      'Zero to Done · Brno, Czech Republic · Created by Petr Sochora (angel investor, mime digital)<br/>Hosted at mime digital · Founder and CEO Michal Mervart · Project: InzerPro · <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>',
    title_sk: 'Zero to Done: Ako som prezentoval InzerPro na startupovom hackathone',
    category_sk: 'Hackathony a projekty',
    excerpt_sk:
      'Víkend v Brne na Zero to Done, startupovom hackathone, ktorý vytvoril anjelský investor Petr Sochora a hostila ho mime digital, jedna z najrýchlejšie rastúcich e-commerce agentúr v Česku. Cieľom nebolo demo, ale reálne MVP, za ktoré by ľudia zaplatili. Priniesol som InzerPro a prešiel som ho so zakladateľom a CEO mime digital Michalom Mervartom.',
    content_sk: `
      <p>Strávil som víkend v Brne na <strong>Zero to Done</strong> a je to jedna z najlepších akcií, akých som sa zúčastnil. Bol to <strong>úplne prvý ročník</strong>, ktorý dal dokopy <strong><a href="https://www.linkedin.com/in/petr-sochora/" target="_blank" rel="noopener noreferrer">Petr Sochora</a></strong>, anjelský investor a finančný a akvizičný partner v <a href="https://www.mimedigital.cz/" target="_blank" rel="noopener noreferrer">mime digital</a>, ktorý celé podujatie viedol priamo z kancelárie mime digital v centre Brna. mime digital je jedna z <strong>najrýchlejšie rastúcich e-commerce agentúr v Česku</strong>: Shoptet Premium partner, jedna z len štyroch certifikovaných Shopify agentúr v krajine a viac než <strong>800 e-shopov</strong> postavených 40-členným tímom pod vedením zakladateľa a CEO <strong><a href="https://cz.linkedin.com/in/michalmervart" target="_blank" rel="noopener noreferrer">Michala Mervarta</a></strong>. Premisa je priamo na banneri, <em>Máš nápad, ale nevíš kde začít?</em> (Máš nápad, ale nevieš, kde začať?), a odpoveď, ktorú ti dajú, je priama: postav reálne MVP za jediný víkend. Nájdeš ho na <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/fireside.jpg" alt="Fireside rozhovor na pódiu na Zero to Done, publikum sleduje" class="blog-img" />
        <figcaption>Jeden z fireside rozhovorov. Veľa hodnoty bolo práve v týchto sekciách a v zakladateľoch a investoroch, ktorí ich viedli.</figcaption>
      </figure>

      <h2>Iný druh hackathonu</h2>
      <p>Čím vynikal, je to, že to <strong>nebol hackathon pre zábavu</strong>. Bola to <strong>akcia na stavbu startupu</strong>. Latka nebola "vypustiť super demo", ale "postaviť niečo, za čo by ľudia naozaj zaplatili". Cez víkend sa od teba čakalo, že pôjdeš hovoriť so zákazníkmi, otestuješ produkt s reálnymi používateľmi a ukážeš, že existuje reálny dopyt. V miestnosti boli investori, takže nešlo o víťazstvo v hlasovaní publika. Šlo o to, s ktorými tímami sa oplatí pracovať aj po skončení víkendu. To zmenilo, ako si trávil každú hodinu.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/demo-day.jpg" alt="Celá miestnosť pokope na gaučoch sleduje, ako tímy prezentujú" class="blog-img" />
        <figcaption>Čas na pitch, celá miestnosť vrátane mentorov a investorov sleduje, ako tímy prezentujú.</figcaption>
      </figure>

      <h2>Priniesol som InzerPro</h2>
      <p>Priniesol som <strong>InzerPro</strong>, môj produkt na automatizáciu inzerátov, a víkend som využil tak, ako to akcia chcela: rozhovormi s potenciálnymi zákazníkmi, testovaním a brúsením pitchu namiesto pridávania funkcií. Vrcholom bolo, keď som si sadol s <strong>Michalom Mervartom</strong>, zakladateľom a CEO mime digital, a prešiel som s ním produkt riadok po riadku. Pracovať na niečom, na čom mi už záleží, v miestnosti plnej ľudí, ktorí robia to isté, to celé pospájalo.</p>

      <figure class="blog-figure">
        <video class="blog-video" autoplay muted loop playsinline preload="metadata" poster="/blog/zero-to-done/build-montage-poster.jpg">
          <source src="/blog/zero-to-done/build-montage.mp4" type="video/mp4" />
        </video>
        <figcaption>Rozoberám InzerPro s <strong>Michalom Mervartom</strong>, zakladateľom a CEO mime digital.</figcaption>
      </figure>

      <h2>Vysoká kvalita, od začiatku do konca</h2>
      <p>Najviac ma prekvapilo, aké dobré to celé bolo, prevedenie aj ľudia. Organizácia bola precízna, program dobre premyslený a okolo mňa vznikalo veľa <strong>naozaj pôsobivých projektov</strong>. Od <strong>Petra Sochoru</strong> a ostatných mentorov som odišiel s kopou <strong>konkrétnych rád</strong>: cenu stavaj na hodnote, nie na nákladoch; ukázať produkt 20 ľuďom je viac než pridať 20 funkcií; "skvelý nápad!" neznamená nič, kým niekto naozaj nezaplatí; pivot nie je zlyhanie. Taká spätná väzba, akú dostaneš len od ľudí, ktorí naozaj niečo postavili a predali.</p>

      <h2>Mimo programu</h2>
      <p>Kancelária mala strešnú terasu a práve tam sa odohrala väčšina prestávok. Niektoré z lepších rozhovorov víkendu boli hore na slnku, ďalej od notebookov.</p>

      <figure class="blog-figure">
        <video class="blog-video blog-video--portrait" autoplay muted loop playsinline preload="metadata" poster="/blog/zero-to-done/rooftop-poster.jpg">
          <source src="/blog/zero-to-done/rooftop.mp4" type="video/mp4" />
        </video>
        <figcaption>Výhľad zo strechy mime digital na Brno.</figcaption>
      </figure>

      <h2>Na záver</h2>
      <p>Veľká vďaka <strong>Petrovi Sochorovi</strong> za vytvorenie Zero to Done a <strong>Michalovi Mervartovi</strong> a celému tímu <strong>mime digital</strong> za hostenie a za to, že hneď pri prvom ročníku nastavili latku takto vysoko. Akcie, ktoré ťa tlačia k reálnym zákazníkom namiesto dema, sú vzácne a táto to trafila presne. Bez váhania by som išiel znova.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/group.jpg" alt="Celá skupina Zero to Done pózuje na streche" class="blog-img" />
      </figure>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/group-celebrate.jpg" alt="Tá istá skupina Zero to Done na streche so zdvihnutými rukami" class="blog-img" />
        <figcaption>Celá skupina na streche, po jednom spoločnom víkende.</figcaption>
      </figure>

      <p>Zaujíma ťa produkt, ktorý som priniesol? Zájdi na <a href="/#projects">projekty na mojej domovskej stránke</a> a hľadaj <strong>InzerPro</strong>.</p>
    `,
    footnote_sk:
      'Zero to Done · Brno, Česká republika · Vytvoril Petr Sochora (anjelský investor, mime digital)<br/>Hostila mime digital · Zakladateľ a CEO Michal Mervart · Projekt: InzerPro · <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>',
    title_cs: 'Zero to Done: Jak jsem prezentoval InzerPro na startupovém hackathonu',
    category_cs: 'Hackathony a projekty',
    excerpt_cs:
      'Víkend v Brně na Zero to Done, startupovém hackathonu, který vytvořil andělský investor Petr Sochora a hostila ho mime digital, jedna z nejrychleji rostoucích e-commerce agentur v Česku. Cílem nebylo demo, ale reálné MVP, za které by lidé zaplatili. Přinesl jsem InzerPro a prošel jsem ho se zakladatelem a CEO mime digital Michalem Mervartem.',
    content_cs: `
      <p>Strávil jsem víkend v Brně na <strong>Zero to Done</strong> a je to jedna z nejlepších akcí, jakých jsem se zúčastnil. Byl to <strong>úplně první ročník</strong>, který dal dohromady <strong><a href="https://www.linkedin.com/in/petr-sochora/" target="_blank" rel="noopener noreferrer">Petr Sochora</a></strong>, andělský investor a finanční a akviziční partner v <a href="https://www.mimedigital.cz/" target="_blank" rel="noopener noreferrer">mime digital</a>, který celou akci vedl přímo z kanceláře mime digital v centru Brna. mime digital je jedna z <strong>nejrychleji rostoucích e-commerce agentur v Česku</strong>: Shoptet Premium partner, jedna z pouhých čtyř certifikovaných Shopify agentur v zemi a víc než <strong>800 e-shopů</strong> postavených 40členným týmem pod vedením zakladatele a CEO <strong><a href="https://cz.linkedin.com/in/michalmervart" target="_blank" rel="noopener noreferrer">Michala Mervarta</a></strong>. Premisa je přímo na banneru, <em>Máš nápad, ale nevíš kde začít?</em> (Máš nápad, ale nevíš, kde začít?), a odpověď, kterou ti dají, je přímá: postav reálné MVP za jediný víkend. Najdeš ho na <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/fireside.jpg" alt="Fireside rozhovor na pódiu na Zero to Done, publikum sleduje" class="blog-img" />
        <figcaption>Jeden z fireside rozhovorů. Hodně hodnoty bylo právě v těchto sekcích a v zakladatelích a investorech, kteří je vedli.</figcaption>
      </figure>

      <h2>Jiný druh hackathonu</h2>
      <p>Čím vynikal, je to, že to <strong>nebyl hackathon pro zábavu</strong>. Byla to <strong>akce na stavbu startupu</strong>. Laťka nebyla "vypustit super demo", ale "postavit něco, za co by lidé opravdu zaplatili". Přes víkend se od tebe čekalo, že půjdeš mluvit se zákazníky, otestuješ produkt s reálnými uživateli a ukážeš, že existuje reálná poptávka. V místnosti byli investoři, takže nešlo o vítězství v hlasování publika. Šlo o to, se kterými týmy se vyplatí pracovat i po skončení víkendu. To změnilo, jak jsi trávil každou hodinu.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/demo-day.jpg" alt="Celá místnost pohromadě na gaučích sleduje, jak týmy prezentují" class="blog-img" />
        <figcaption>Čas na pitch, celá místnost včetně mentorů a investorů sleduje, jak týmy prezentují.</figcaption>
      </figure>

      <h2>Přinesl jsem InzerPro</h2>
      <p>Přinesl jsem <strong>InzerPro</strong>, můj produkt na automatizaci inzerátů, a víkend jsem využil tak, jak to akce chtěla: rozhovory s potenciálními zákazníky, testováním a broušením pitche místo přidávání funkcí. Vrcholem bylo, když jsem si sedl s <strong>Michalem Mervartem</strong>, zakladatelem a CEO mime digital, a prošel jsem s ním produkt řádek po řádku. Pracovat na něčem, na čem mi už záleží, v místnosti plné lidí, kteří dělají totéž, to celé propojilo.</p>

      <figure class="blog-figure">
        <video class="blog-video" autoplay muted loop playsinline preload="metadata" poster="/blog/zero-to-done/build-montage-poster.jpg">
          <source src="/blog/zero-to-done/build-montage.mp4" type="video/mp4" />
        </video>
        <figcaption>Rozebírám InzerPro s <strong>Michalem Mervartem</strong>, zakladatelem a CEO mime digital.</figcaption>
      </figure>

      <h2>Vysoká kvalita, od začátku do konce</h2>
      <p>Nejvíc mě překvapilo, jak dobré to celé bylo, provedení i lidé. Organizace byla precizní, program dobře promyšlený a kolem mě vznikalo hodně <strong>opravdu působivých projektů</strong>. Od <strong>Petra Sochory</strong> a ostatních mentorů jsem odešel s kupou <strong>konkrétních rad</strong>: cenu stav na hodnotě, ne na nákladech; ukázat produkt 20 lidem je víc než přidat 20 funkcí; "skvělý nápad!" neznamená nic, dokud někdo opravdu nezaplatí; pivot není selhání. Taková zpětná vazba, jakou dostaneš jen od lidí, kteří opravdu něco postavili a prodali.</p>

      <h2>Mimo program</h2>
      <p>Kancelář měla střešní terasu a právě tam se odehrála většina přestávek. Některé z lepších rozhovorů víkendu byly nahoře na slunci, dál od notebooků.</p>

      <figure class="blog-figure">
        <video class="blog-video blog-video--portrait" autoplay muted loop playsinline preload="metadata" poster="/blog/zero-to-done/rooftop-poster.jpg">
          <source src="/blog/zero-to-done/rooftop.mp4" type="video/mp4" />
        </video>
        <figcaption>Výhled ze střechy mime digital na Brno.</figcaption>
      </figure>

      <h2>Na závěr</h2>
      <p>Velký dík <strong>Petru Sochorovi</strong> za vytvoření Zero to Done a <strong>Michalu Mervartovi</strong> a celému týmu <strong>mime digital</strong> za hostování a za to, že hned při prvním ročníku nastavili laťku takhle vysoko. Akce, které tě tlačí k reálným zákazníkům místo dema, jsou vzácné a tahle to trefila přesně. Bez váhání bych šel znovu.</p>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/group.jpg" alt="Celá skupina Zero to Done pózuje na střeše" class="blog-img" />
      </figure>

      <figure class="blog-figure">
        <img src="/blog/zero-to-done/group-celebrate.jpg" alt="Tatáž skupina Zero to Done na střeše se zdviženýma rukama" class="blog-img" />
        <figcaption>Celá skupina na střeše, po jednom společném víkendu.</figcaption>
      </figure>

      <p>Zajímá tě produkt, který jsem přinesl? Zajdi na <a href="/#projects">projekty na mé domovské stránce</a> a hledej <strong>InzerPro</strong>.</p>
    `,
    footnote_cs:
      'Zero to Done · Brno, Česká republika · Vytvořil Petr Sochora (andělský investor, mime digital)<br/>Hostila mime digital · Zakladatel a CEO Michal Mervart · Projekt: InzerPro · <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>',
  },
  {
    slug: 'erasmus-bridges-not-walls',
    title: 'Erasmus+ Bridges, Not Walls Experience',
    date: '2026-05-06',
    category: 'Life & Travel',
    excerpt:
      'We took part in the Bridges not Walls Erasmus+ Youth exchange in Lithuania, a week of non-formal education, cultural nights, and human connection across six Eastern European countries.',
    thumbnail: '/blog/erasmus/photo2.jpg',
    content: `
      <p>From <strong>20 to 29 April 2026</strong>, I took part in <strong>Bridges, Not Walls</strong>, an Erasmus+ Youth Exchange in <strong>Luoba, Lithuania</strong>. I got there through my organisation <strong>YouthFully Yours</strong>, and the project itself was put together by <strong>VšĮ Džiaugsmo slėnis</strong>. The whole point was to get better at connecting with people across different cultures and backgrounds, and to build empathy in a very hands-on way. Nine days later, I can say it worked.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo2.jpg" alt="Full group of Erasmus+ participants holding the Erasmus+ flag" class="blog-img" />
      </figure>

      <h2>How It Worked</h2>
      <p>The week ran on non-formal education, which in practice meant each country prepared an activity and ran it for everyone else. So one day you were teaching, the next you were learning from someone else's workshop. The topics ranged from <strong>active listening</strong> and identity to social media and conflict. Every session had a practical part so you actually had to apply what you were learning, not just sit and listen. That format made a big difference in how much I took away from it.</p>

      <h2>The Countries</h2>
      <p>Six countries were part of this: <strong>Slovakia, Poland, Bulgaria, Ukraine, Romania, and Lithuania</strong>. All Eastern European, which some people might see as limiting, but for me it was actually a plus. There was enough common ground to connect quickly, and still plenty of differences between each country that made every conversation interesting. I came back knowing a lot more about all of them.</p>

      <h2>The Venue</h2>
      <p>We stayed at a place in the Lithuanian countryside that also works as a wedding venue. Artificial lake nearby, a lot of open space, good rooms. After long workshop days it was nice to just go for a walk outside. Some of the best conversations I had during that week happened in the evenings around the venue.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo3.jpg" alt="Group photo at sunset at the venue in Lithuania" class="blog-img" />
      </figure>

      <h2>Cultural Nights</h2>
      <p>The Cultural Nights were my favourite part. Each country got an evening to show off their culture through food, music, dance and whatever else they wanted to bring. The room always had a different feel on those nights.</p>
      <p>For the <strong>Slovak Cultural Night</strong>, we wanted to go beyond the obvious stuff and show what Slovakia actually feels like. We cooked traditional food, did the burning of <em>Morena</em>, performed a folk dance, and sang. Seeing people from Ukraine or Romania or Bulgaria genuinely curious about our traditions was something I did not expect to feel as much as I did.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo1.jpg" alt="Slovak team preparing food for the Cultural Night" class="blog-img" />
      </figure>

      <h2>Final Thoughts</h2>
      <p>I came back from Lithuania with a different perspective on a few things. Not in a dramatic way, just the quiet kind where you realise you think about something slightly differently than before. I met people I want to stay in touch with, and I got to share a part of Slovak culture with people who had never encountered it before. That alone made the whole trip worth it.</p>
      <p>Thanks to <strong>YouthFully Yours</strong> for sending me, and to <strong>VšĮ Džiaugsmo slėnis</strong> (<a href="https://www.instagram.com/dziaugsmoslenis/" target="_blank" rel="noopener noreferrer">@dziaugsmoslenis</a>) for putting it all together.</p>
    `,
    footnote:
      'Bridges, Not Walls – Erasmus+ Youth Exchange · 20–29.04.2026, Luoba, Lithuania<br/>Countries: Lithuania, Ukraine, Slovakia, Romania, Poland, Bulgaria<br/>Funded by the Erasmus+ Programme of the European Union.<br/>#BridgesNotWalls #ErasmusPlus #YouthExchange',
    title_sk: 'Skúsenosť z Erasmus+ Bridges, Not Walls',
    category_sk: 'Život a cestovanie',
    excerpt_sk:
      'Zúčastnili sme sa mládežníckej výmeny Erasmus+ Bridges not Walls v Litve, týždňa neformálneho vzdelávania, kultúrnych večerov a ľudského prepojenia naprieč šiestimi východoeurópskymi krajinami.',
    content_sk: `
      <p>Od <strong>20. do 29. apríla 2026</strong> som sa zúčastnil <strong>Bridges, Not Walls</strong>, mládežníckej výmeny Erasmus+ v <strong>Luobe, Litva</strong>. Dostal som sa tam cez moju organizáciu <strong>YouthFully Yours</strong> a samotný projekt dala dokopy <strong>VšĮ Džiaugsmo slėnis</strong>. Celé to bolo o tom naučiť sa lepšie spájať s ľuďmi naprieč rôznymi kultúrami a prostrediami a budovať empatiu veľmi prakticky. O deväť dní neskôr môžem povedať, že to fungovalo.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo2.jpg" alt="Celá skupina účastníkov Erasmus+ drží vlajku Erasmus+" class="blog-img" />
      </figure>

      <h2>Ako to prebiehalo</h2>
      <p>Týždeň fungoval na neformálnom vzdelávaní, čo v praxi znamenalo, že každá krajina pripravila aktivitu a odviedla ju pre všetkých ostatných. Takže jeden deň si učil, ďalší si sa učil z workshopu niekoho iného. Témy siahali od <strong>aktívneho počúvania</strong> a identity až po sociálne siete a konflikt. Každá sekcia mala praktickú časť, takže si naozaj musel použiť to, čo si sa učil, nielen sedieť a počúvať. Ten formát výrazne ovplyvnil, koľko som si z toho odniesol.</p>

      <h2>Krajiny</h2>
      <p>Zapojených bolo šesť krajín: <strong>Slovensko, Poľsko, Bulharsko, Ukrajina, Rumunsko a Litva</strong>. Všetky východoeurópske, čo niekto môže vnímať ako obmedzenie, ale pre mňa to bolo skôr plus. Bolo dosť spoločného, aby sme sa rýchlo spojili, a zároveň dosť rozdielov medzi jednotlivými krajinami, vďaka ktorým bol každý rozhovor zaujímavý. Vrátil som sa s oveľa väčším prehľadom o nich všetkých.</p>

      <h2>Miesto</h2>
      <p>Bývali sme na mieste na litovskom vidieku, ktoré slúži aj ako svadobné miesto. Neďaleko umelé jazero, veľa otvoreného priestoru, dobré izby. Po dlhých dňoch workshopov bolo príjemné len tak si vyjsť von na prechádzku. Niektoré z najlepších rozhovorov toho týždňa sa odohrali večer v okolí miesta.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo3.jpg" alt="Skupinová fotka pri západe slnka na mieste v Litve" class="blog-img" />
      </figure>

      <h2>Kultúrne večery</h2>
      <p>Kultúrne večery boli moja obľúbená časť. Každá krajina dostala večer, aby predviedla svoju kultúru cez jedlo, hudbu, tanec a čokoľvek ďalšie, čo chcela priniesť. Miestnosť mala počas tých večerov vždy iný nádych.</p>
      <p>Na <strong>slovenský kultúrny večer</strong> sme chceli ísť za rámec toho očividného a ukázať, aké Slovensko naozaj je. Uvarili sme tradičné jedlo, spravili sme pálenie <em>Moreny</em>, zatancovali ľudový tanec a spievali. Vidieť ľudí z Ukrajiny, Rumunska či Bulharska úprimne zvedavých na naše tradície bolo niečo, čo som nečakal, že ma tak zasiahne.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo1.jpg" alt="Slovenský tím pripravuje jedlo na kultúrny večer" class="blog-img" />
      </figure>

      <h2>Na záver</h2>
      <p>Z Litvy som sa vrátil s iným pohľadom na pár vecí. Nie dramaticky, len tým tichým spôsobom, keď si uvedomíš, že o niečom premýšľaš trochu inak než predtým. Spoznal som ľudí, s ktorými chcem zostať v kontakte, a mohol som podeliť sa o kúsok slovenskej kultúry s ľuďmi, ktorí sa s ňou nikdy predtým nestretli. Už len to celý výlet stálo za to.</p>
      <p>Ďakujem <strong>YouthFully Yours</strong>, že ma vyslali, a <strong>VšĮ Džiaugsmo slėnis</strong> (<a href="https://www.instagram.com/dziaugsmoslenis/" target="_blank" rel="noopener noreferrer">@dziaugsmoslenis</a>) za to, že to celé dali dokopy.</p>
    `,
    footnote_sk:
      'Bridges, Not Walls, mládežnícka výmena Erasmus+ · 20. - 29. 4. 2026, Luoba, Litva<br/>Krajiny: Litva, Ukrajina, Slovensko, Rumunsko, Poľsko, Bulharsko<br/>Financované z programu Erasmus+ Európskej únie.<br/>#BridgesNotWalls #ErasmusPlus #YouthExchange',
    title_cs: 'Zkušenost z Erasmus+ Bridges, Not Walls',
    category_cs: 'Život a cestování',
    excerpt_cs:
      'Zúčastnili jsme se mládežnické výměny Erasmus+ Bridges not Walls v Litvě, týdne neformálního vzdělávání, kulturních večerů a lidského propojení napříč šesti východoevropskými zeměmi.',
    content_cs: `
      <p>Od <strong>20. do 29. dubna 2026</strong> jsem se zúčastnil <strong>Bridges, Not Walls</strong>, mládežnické výměny Erasmus+ v <strong>Luobě, Litva</strong>. Dostal jsem se tam přes svou organizaci <strong>YouthFully Yours</strong> a samotný projekt dala dohromady <strong>VšĮ Džiaugsmo slėnis</strong>. Celé to bylo o tom naučit se lépe spojovat s lidmi napříč různými kulturami a prostředími a budovat empatii velmi prakticky. O devět dní později můžu říct, že to fungovalo.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo2.jpg" alt="Celá skupina účastníků Erasmus+ drží vlajku Erasmus+" class="blog-img" />
      </figure>

      <h2>Jak to probíhalo</h2>
      <p>Týden fungoval na neformálním vzdělávání, což v praxi znamenalo, že každá země připravila aktivitu a odvedla ji pro všechny ostatní. Takže jeden den jsi učil, další ses učil z workshopu někoho jiného. Témata sahala od <strong>aktivního naslouchání</strong> a identity až po sociální sítě a konflikt. Každá sekce měla praktickou část, takže jsi opravdu musel použít to, co ses učil, nejen sedět a poslouchat. Ten formát výrazně ovlivnil, kolik jsem si z toho odnesl.</p>

      <h2>Země</h2>
      <p>Zapojeno bylo šest zemí: <strong>Slovensko, Polsko, Bulharsko, Ukrajina, Rumunsko a Litva</strong>. Všechny východoevropské, což někdo může vnímat jako omezení, ale pro mě to bylo spíš plus. Bylo dost společného, abychom se rychle spojili, a zároveň dost rozdílů mezi jednotlivými zeměmi, díky kterým byl každý rozhovor zajímavý. Vrátil jsem se s mnohem větším přehledem o nich všech.</p>

      <h2>Místo</h2>
      <p>Bydleli jsme na místě na litevském venkově, které slouží i jako svatební místo. Nedaleko umělé jezero, hodně otevřeného prostoru, dobré pokoje. Po dlouhých dnech workshopů bylo příjemné jen tak si vyjít ven na procházku. Některé z nejlepších rozhovorů toho týdne se odehrály večer v okolí toho místa.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo3.jpg" alt="Skupinová fotka při západu slunce na místě v Litvě" class="blog-img" />
      </figure>

      <h2>Kulturní večery</h2>
      <p>Kulturní večery byly moje oblíbená část. Každá země dostala večer, aby předvedla svou kulturu přes jídlo, hudbu, tanec a cokoli dalšího, co chtěla přinést. Místnost měla během těch večerů vždycky jiný nádech.</p>
      <p>Na <strong>slovenský kulturní večer</strong> jsme chtěli jít za rámec toho očividného a ukázat, jaké Slovensko doopravdy je. Uvařili jsme tradiční jídlo, udělali jsme pálení <em>Morany</em>, zatančili lidový tanec a zpívali. Vidět lidi z Ukrajiny, Rumunska či Bulharska upřímně zvědavé na naše tradice bylo něco, co jsem nečekal, že mě tak zasáhne.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo1.jpg" alt="Slovenský tým připravuje jídlo na kulturní večer" class="blog-img" />
      </figure>

      <h2>Na závěr</h2>
      <p>Z Litvy jsem se vrátil s jiným pohledem na pár věcí. Ne dramaticky, jen tím tichým způsobem, kdy si uvědomíš, že o něčem přemýšlíš trochu jinak než předtím. Poznal jsem lidi, se kterými chci zůstat v kontaktu, a mohl jsem se podělit o kousek slovenské kultury s lidmi, kteří se s ní nikdy předtím nesetkali. Už jen to za celý výlet stálo.</p>
      <p>Děkuji <strong>YouthFully Yours</strong>, že mě vyslali, a <strong>VšĮ Džiaugsmo slėnis</strong> (<a href="https://www.instagram.com/dziaugsmoslenis/" target="_blank" rel="noopener noreferrer">@dziaugsmoslenis</a>) za to, že to celé daly dohromady.</p>
    `,
    footnote_cs:
      'Bridges, Not Walls, mládežnická výměna Erasmus+ · 20. - 29. 4. 2026, Luoba, Litva<br/>Země: Litva, Ukrajina, Slovensko, Rumunsko, Polsko, Bulharsko<br/>Financováno z programu Erasmus+ Evropské unie.<br/>#BridgesNotWalls #ErasmusPlus #YouthExchange',
  },
];

export function localizeBlogPost(p: BlogPost, locale: 'en' | 'sk' | 'cs'): BlogPost {
  if (locale === 'cs') {
    return {
      ...p,
      title: p.title_cs ?? p.title,
      excerpt: p.excerpt_cs ?? p.excerpt,
      category: p.category_cs ?? p.category,
      content: p.content_cs ?? p.content,
      footnote: p.footnote_cs ?? p.footnote,
    };
  }
  if (locale === 'sk') {
    return {
      ...p,
      title: p.title_sk ?? p.title,
      excerpt: p.excerpt_sk ?? p.excerpt,
      category: p.category_sk ?? p.category,
      content: p.content_sk ?? p.content,
      footnote: p.footnote_sk ?? p.footnote,
    };
  }
  return p;
}
