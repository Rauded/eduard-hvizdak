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
      <p>From <strong>20 to 29 April 2026</strong>, I had the privilege of taking part in <strong>Bridges, Not Walls</strong> — an Erasmus+ Youth Exchange hosted in <strong>Luoba, Lithuania</strong>. I was sent there by my organisation <strong>YouthFully Yours</strong>, and the whole project was organised by the incredible team at <strong>VšĮ Džiaugsmo slėnis</strong>. The idea behind the project was simple but powerful: learn how to build bridges with people — across cultures, backgrounds, and experiences — and walk away with stronger empathy and communication skills. Nine days later, I can say it delivered on every front.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo2.jpg" alt="Full group of Erasmus+ participants holding the Erasmus+ flag" class="blog-img" />
      </figure>

      <h2>How It Worked</h2>
      <p>The whole week was built around non-formal education, which I honestly think is the best way to actually learn something. Each country's team prepared their own activity and taught it to everyone else — so we weren't just passive listeners, we were both students and teachers at the same time. The topics were genuinely interesting: <strong>active listening</strong>, identity, the impact of social media, conflict resolution. Every session blended theory with hands-on practice, so you didn't just hear about something — you immediately had to try it. It made everything stick in a way that a classroom lecture never could.</p>

      <h2>The Countries</h2>
      <p>Six countries came together for this exchange: <strong>Slovakia, Poland, Bulgaria, Ukraine, Romania, and Lithuania</strong>. It's a very Eastern European mix, and some people might wonder whether that limits the diversity of perspectives. In my experience, it was actually the opposite — the shared cultural undertone made it easier to open up, while the differences between each nation were still fascinating and very real. I came home knowing so much more about each of these countries than I did before.</p>

      <h2>The Venue</h2>
      <p>We stayed at a stunning location in the Lithuanian countryside — a place that apparently doubles as a wedding venue when it's not hosting groups of young Europeans. There was an artificial lake, open nature all around, and comfortable rooms. After full days of workshops and activities, having that space to breathe and decompress made a real difference. Some of my favourite conversations happened on evening walks around the venue.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo3.jpg" alt="Group photo at sunset at the venue in Lithuania" class="blog-img" />
      </figure>

      <h2>Cultural Nights</h2>
      <p>Honestly, the Cultural Nights were the highlight of the whole exchange for me. Each country took an evening to present their culture — food, music, dance, traditions, history. The energy in the room on those nights was something else entirely.</p>
      <p>For the <strong>Slovak Cultural Night</strong>, our team put a lot of heart into it. We wanted to show more than just tourist-brochure Slovakia — so we included traditions from Slovak Christmas, the burning of <em>Morena</em> (a traditional spring ritual), a folk dance, and a singing performance. Watching the other participants genuinely engage with things that are so personal to us was a moment I won't forget.</p>

      <figure class="blog-figure">
        <img src="/blog/erasmus/photo1.jpg" alt="Slovak team preparing food for the Cultural Night" class="blog-img" />
      </figure>

      <h2>Final Thoughts</h2>
      <p>This was one of those experiences that's hard to put into words without sounding like a cliché — but it genuinely changed how I think about connection and empathy. I met people I hope to stay in touch with for years. I learned things about myself and about six different countries. And I came home with a much stronger belief that projects like this matter.</p>
      <p>Huge thank you to <strong>YouthFully Yours</strong> for sending me, and to <strong>VšĮ Džiaugsmo slėnis</strong> (<a href="https://www.instagram.com/dziaugsmoslenis/" target="_blank" rel="noopener noreferrer">@dziaugsmoslenis</a>) for organising an unforgettable week.</p>
      <p><em>— Eduard Hviždák</em></p>

      <p style="margin-top: 2.5em; font-size: 0.8em; opacity: 0.55;">
        <strong>Bridges, Not Walls</strong> – Erasmus+ Youth Exchange · 20–29.04.2026, Luoba, Lithuania<br/>
        Countries: Lithuania, Ukraine, Slovakia, Romania, Poland, Bulgaria<br/>
        Funded by the Erasmus+ Programme of the European Union.<br/>
        #BridgesNotWalls #ErasmusPlus #YouthExchange
      </p>
    `,
  },
];
