export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string; // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'erasmus-bridges-not-walls',
    title: 'Erasmus+ Bridges, Not Walls Experience',
    date: '2026-05-06',
    category: 'Life & Travel',
    excerpt:
      'We took part in the Bridges not Walls Erasmus+ Youth exchange in Lithuania — a week of non-formal education, cultural nights, and human connection across six Eastern European countries.',
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
