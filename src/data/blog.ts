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
      <p>We took part in the <strong>Bridges not Walls</strong> Erasmus+ Youth exchange project in Lithuania from <strong>21 April to 29 April 2026</strong>. The goal of the project was to learn how to build bridges — connecting with people and their unique situations, creating understanding, and building empathy skills.</p>

      <h2>How It Worked</h2>
      <p>The project was rooted in non-formal education. Each participating team prepared an activity to teach the other participants about a specific topic they considered themselves experts on. The participants took this responsibility seriously, and every activity was packed with depth and intention — covering topics ranging from <strong>active listening</strong> and identity discussion all the way to debating the effects of social media.</p>
      <p>Each activity blended theory with practice, so participants could immediately begin applying the new knowledge or techniques they had just learned.</p>

      <h2>The Countries</h2>
      <p>The participating countries were <strong>Slovakia, Poland, Bulgaria, Ukraine, Romania, and Lithuania</strong> — a very Eastern European lineup. But we believe that homogeneity made our experience more special and unique, bringing a shared cultural undertone while still revealing fascinating differences between each nation.</p>

      <h2>The Venue</h2>
      <p>The project took place in the Lithuanian countryside at a beautiful location that doubles as a wedding venue when it is not hosting Erasmus youngsters. The venue featured an artificial lake, gorgeous and vast nature, and comfortable rooms with double beds — so everyone had plenty of space to rest and recharge.</p>

      <h2>Cultural Nights</h2>
      <p>The most memorable moments for most of us were the <strong>Cultural Nights</strong>, when each country prepared a dinner and cultural presentation full of traditional dances, food, and history.</p>
      <p>The Slovak Cultural Night was especially memorable. We worked extra hard to include dinner practices from Slovak Christmas and other Slovak traditions. We prepared the burning of <em>Morena</em>, a traditional Slovak dance, and a singing performance. Our presentation was packed with everything that makes Slovakia the interesting and unique country it is to us.</p>

      <h2>Final Thoughts</h2>
      <p>Overall, this project was an amazing experience. I am sure everyone will remember it for a long time and look back on it with nothing but positive thoughts whenever it crosses their mind. Projects like this remind us how much we gain when we choose curiosity over walls — and connection over distance.</p>
    `,
  },
];
