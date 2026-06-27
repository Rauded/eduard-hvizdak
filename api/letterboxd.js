// Vercel serverless function — proxies + parses Eduard's Letterboxd RSS feed
// (the feed blocks browser CORS, so the /now page calls this instead).
const FEED = 'https://letterboxd.com/Rauded/rss/';

const strip = (s) => (s || '').replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '').trim();
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? strip(m[1]) : '';
}

module.exports = async (req, res) => {
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': 'eduard-hvizdak.vercel.app' } });
    if (!r.ok) throw new Error(`Letterboxd ${r.status}`);
    const xml = await r.text();

    const items = xml
      .split('<item>')
      .slice(1)
      .map((block) => {
        const posterM = block.match(/<img src="([^"]+)"/);
        const rating = tag(block, 'letterboxd:memberRating');
        return {
          title: tag(block, 'letterboxd:filmTitle') || tag(block, 'title'),
          year: tag(block, 'letterboxd:filmYear'),
          rating: rating ? Number(rating) : null,
          link: tag(block, 'link'),
          poster: posterM ? posterM[1] : '',
          watched: tag(block, 'letterboxd:watchedDate'),
        };
      })
      .filter((f) => f.title && f.poster)
      .slice(0, 6);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), items: [] });
  }
};
