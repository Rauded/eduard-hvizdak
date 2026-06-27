// Vercel serverless function — proxies + parses Eduard's Goodreads
// "currently-reading" shelf RSS (avoids browser CORS; "read" shelf is
// intentionally NOT used).
const FEED =
  'https://www.goodreads.com/review/list_rss/126181458?shelf=currently-reading';

const strip = (s) =>
  (s || '')
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .trim();
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? strip(m[1]) : '';
}

module.exports = async (req, res) => {
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': 'eduard-hvizdak.vercel.app' } });
    if (!r.ok) throw new Error(`Goodreads ${r.status}`);
    const xml = await r.text();

    const items = xml
      .split('<item>')
      .slice(1)
      .map((block) => ({
        title: tag(block, 'title'),
        author: tag(block, 'author_name'),
        cover: tag(block, 'book_large_image_url') || tag(block, 'book_image_url'),
        link: tag(block, 'link'),
      }))
      .filter((b) => b.title)
      .slice(0, 6);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), items: [] });
  }
};
