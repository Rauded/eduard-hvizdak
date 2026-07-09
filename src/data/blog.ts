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
  },
];
