export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  thumbnail?: string; // cover image for the blog listing card
  content: string; // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'newsmatics-hackathon',
    title: 'Newsmatics Hackathon',
    date: '2026-06-27',
    category: 'Hackathons & Builds',
    excerpt:
      'I spent a hackathon with team MOGGERS building Newsmatics Globe — a pipeline that pulls locations out of news articles and plots them on an interactive 3D globe. Here is how the weekend went, from the first line of code to the award ceremony.',
    thumbnail: '/blog/newsmatics/group.jpg',
    content: `
      <p>I took part in the <strong>Newsmatics Hackathon</strong> in Brno with my team <strong>MOGGERS</strong>, where we built <strong>Newsmatics Globe</strong> — a geolocation pipeline that extracts locations from news articles via NLP, matches them against the GeoNames database, and visualises them on an interactive 3D globe, with timeline playback so you can watch events unfold across the world. You can read more about the project itself on my <a href="/portfolio">portfolio page</a> (look for <strong>Newsmatics Globe</strong>).</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/group.jpg" alt="Full group photo of all Newsmatics Hackathon participants" class="blog-img" />
        <figcaption>Everyone who took part in the Newsmatics Hackathon.</figcaption>
      </figure>

      <h2>The Build</h2>
      <p>Most of the weekend looked exactly like this — heads down, laptops open, coffee and energy drinks within reach, working through the pipeline piece by piece. We split the work between the NLP extraction, the GeoNames matching, and the front-end globe, then spent the back half of the event stitching it all together and tuning the timeline playback.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/working.jpg" alt="Working at the hackathon — coding on laptops with a teammate" class="blog-img" />
      </figure>

      <h2>Team MOGGERS</h2>
      <p>We competed as <strong>MOGGERS</strong> — three of us, each owning a different part of the stack. Pitching the globe to the judges with a live timeline running was the moment everything we'd built that weekend finally clicked into one demo.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/team.jpg" alt="Team MOGGERS portrait at the Newsmatics Hackathon" class="blog-img" />
      </figure>

      <h2>The Award Ceremony</h2>
      <p>The event wrapped up with an award ceremony and certificates for the teams. Standing up there with the organisers and the other participants was a great way to close out an intense couple of days.</p>

      <figure class="blog-figure">
        <img src="/blog/newsmatics/awards.jpg" alt="Award ceremony at the Newsmatics Hackathon with participants holding certificates" class="blog-img" />
      </figure>

      <h2>Final Thoughts</h2>
      <p>Hackathons are still my favourite way to build — a tight deadline, a real problem, and a small team that has to figure it out fast. Newsmatics Globe started as a weekend project here and ended up as one of the things I'm most proud of. Thanks to <strong>Newsmatics</strong> for putting on the event.</p>
      <p>Want the technical details? Head over to the <a href="/portfolio">portfolio</a> and find <strong>Newsmatics Globe</strong>.</p>
      <p><em>Eduard Hviždák</em></p>

      <p style="margin-top: 2.5em; font-size: 0.8em; opacity: 0.55;">
        <strong>Newsmatics Hackathon</strong> · Brno<br/>
        Team MOGGERS · Project: Newsmatics Globe
      </p>
    `,
  },
  {
    slug: 'digital-fairness-act-youth-dialogue',
    title: 'Talking the Digital Fairness Act with Commissioner McGrath',
    date: '2026-06-25',
    category: 'Tech & Policy',
    excerpt:
      'I joined a European Commission Youth Policy Dialogue in Ljubljana with EU Commissioner Michael McGrath, where we worked through what the upcoming Digital Fairness Act should actually do about deceptive design, pricing, and digital contracts.',
    thumbnail: '/blog/digital-fairness/youth-policy-dialogue.png',
    content: `
      <p>I took part in a <strong>European Commission Youth Policy Dialogue</strong> in <strong>Ljubljana</strong>, sitting down with <strong>EU Commissioner Michael McGrath</strong> to talk about the <strong>Digital Fairness Act</strong> — the EU's upcoming push to clean up how online services treat people. It was one of those rare moments where the conversation about regulation happens <em>with</em> the people it's meant to protect, not just about them.</p>

      <figure class="blog-figure">
        <img src="/blog/digital-fairness/youth-policy-dialogue.png" alt="Youth Policy Dialogue on the Digital Fairness Act with Commissioner Michael McGrath in Ljubljana" class="blog-img" />
      </figure>

      <h2>What We Worked On</h2>
      <p>Rather than abstract talking points, we mapped out concrete asks across three areas — <strong>pricing, marketing practices, and digital contracts</strong>. The themes that kept coming up: <strong>prohibiting deceptive practices and dark patterns</strong>, <strong>standardised requirements</strong> so users actually understand what they're agreeing to, and <strong>real-currency pricing</strong> instead of the in-app token systems designed to obscure how much you're really spending.</p>

      <h2>Why It Matters</h2>
      <p>So much of the modern web is built to nudge, pressure, and quietly extract — manipulative defaults, fake urgency, subscriptions that are easy to start and almost impossible to cancel. As someone who builds software, I care a lot about where the line sits between good design and exploitative design. Getting to argue that line directly with the Commissioner shaping the legislation was a real privilege.</p>

      <h2>Final Thoughts</h2>
      <p>I came away convinced that youth input on digital policy isn't a box-ticking exercise — the people who grew up inside these systems often see the manipulation most clearly. Thanks to the <strong>European Commission</strong> and Commissioner <strong>Michael McGrath</strong> for genuinely listening.</p>
      <p><em>Eduard Hviždák</em></p>

      <p style="margin-top: 2.5em; font-size: 0.8em; opacity: 0.55;">
        <strong>Youth Policy Dialogue — Digital Fairness Act</strong> · Ljubljana, Slovenia<br/>
        With European Commissioner Michael McGrath · European Commission
      </p>
    `,
  },
  {
    slug: 'zero-to-done',
    title: 'Zero to Done: Pitching InzerPro at a Startup-Build Hackathon',
    date: '2026-06-08',
    category: 'Hackathons & Builds',
    excerpt:
      'I spent a weekend in Brno at Zero to Done — the first run of a different kind of hackathon, where the goal was not a demo but a real startup: get customers, test the product, prove value. I brought InzerPro, and it was one of the best events I have done.',
    content: `
      <p>I spent a weekend in Brno at <strong>Zero to Done</strong> — and it was genuinely one of the best events I've taken part in. It was the <strong>very first run</strong> of the event, put together by <strong>Petr Sochora</strong> and the team at <a href="https://www.mimedigital.cz/" target="_blank" rel="noopener noreferrer">mime digital</a>, who hosted everyone in their office in the centre of Brno. A room full of founders, builders, and mentors, all in for a few intense days. You can find the event at <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>.</p>

      <h2>A Different Kind of Hackathon</h2>
      <p>What made it stand out is that it <strong>wasn't a hackathon just for fun</strong>. It was a <strong>startup-build event</strong> — the bar wasn't "ship a cool demo," it was "build a real business." Over the weekend everyone was expected to actually <strong>get customers, test the product with real users, and prove there was value people would pay for</strong>. Investors were in the room, and the real question wasn't who won an audience vote — it was which teams were worth continuing to work with afterwards. That framing changed everything about how you spent your time.</p>

      <h2>I Brought InzerPro</h2>
      <p>I came and presented <strong>InzerPro</strong>, my classifieds-automation product, and used the weekend to push it forward the way the event wanted — talking to potential customers, testing, and sharpening the pitch instead of just adding features. Working on a real product I already care about, in a room full of people doing the same, made the whole thing click.</p>

      <h2>High Quality, Top to Bottom</h2>
      <p>The thing that surprised me most was how <strong>high quality</strong> the whole event was — both the execution and the people. The organisation was tight, the program was well thought out, and there were a lot of <strong>genuinely impressive projects</strong> being built around me. I walked away with a huge amount of <strong>concrete, practical advice</strong>: how to price on value rather than cost, why showing the product to 20 people beats adding 20 features, that "great idea!" means nothing until someone actually pays, and that a pivot isn't a failure. The kind of feedback you only get from people who've actually done it.</p>

      <h2>Final Thoughts</h2>
      <p>Huge thanks to <strong>Petr Sochora</strong> and the <strong>mime digital</strong> team for hosting and for setting the bar this high on a first run. Events that push you toward real customers instead of just a demo are rare, and this one nailed it — I'd do it again in a heartbeat.</p>
      <p>Curious about the product I brought? Head to my <a href="/portfolio">portfolio</a> and look for <strong>InzerPro</strong>.</p>
      <p><em>Eduard Hviždák</em></p>

      <p style="margin-top: 2.5em; font-size: 0.8em; opacity: 0.55;">
        <strong>Zero to Done</strong> · Brno, Czech Republic<br/>
        Hosted by mime digital · Project: InzerPro · <a href="https://zero-to-done.com/" target="_blank" rel="noopener noreferrer">zero-to-done.com</a>
      </p>
    `,
  },
  {
    slug: 'erasmus-bridges-not-walls',
    title: 'Erasmus+ Bridges, Not Walls Experience',
    date: '2026-05-06',
    category: 'Life & Travel',
    excerpt:
      'We took part in the Bridges not Walls Erasmus+ Youth exchange in Lithuania — a week of non-formal education, cultural nights, and human connection across six Eastern European countries.',
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
      <p><em>Eduard Hviždák</em></p>

      <p style="margin-top: 2.5em; font-size: 0.8em; opacity: 0.55;">
        <strong>Bridges, Not Walls</strong> – Erasmus+ Youth Exchange · 20–29.04.2026, Luoba, Lithuania<br/>
        Countries: Lithuania, Ukraine, Slovakia, Romania, Poland, Bulgaria<br/>
        Funded by the Erasmus+ Programme of the European Union.<br/>
        #BridgesNotWalls #ErasmusPlus #YouthExchange
      </p>
    `,
  },
];
