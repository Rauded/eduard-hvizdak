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
      <p>I took part in the <strong>Newsmatics Hackathon</strong> in Brno with my team <strong>MOGGERS</strong>, where we built <strong>Newsmatics Globe</strong> — a geolocation pipeline that extracts locations from news articles via NLP, matches them against the GeoNames database, and visualises them on an interactive 3D globe, with timeline playback so you can watch events unfold across the world. You can read more about the project itself on my <a href="#/portfolio">portfolio page</a> (look for <strong>Newsmatics Globe</strong>).</p>

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
      <p>Want the technical details? Head over to the <a href="#/portfolio">portfolio</a> and find <strong>Newsmatics Globe</strong>.</p>
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
