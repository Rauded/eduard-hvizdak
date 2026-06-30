// Vercel serverless function — proxies + parses Eduard's MyAnimeList RSS
// feed of recent anime-list updates (type=rw). Browser CORS blocks the
// feed, so the /now page calls this instead. MAL RSS has no cover images,
// so cards fall back to title/status only.
const FEED = 'https://myanimelist.net/rss.php?type=rw&u=rauded';

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
    if (!r.ok) throw new Error(`MyAnimeList ${r.status}`);
    const xml = await r.text();

    const items = xml
      .split('<item>')
      .slice(1)
      .map((block) => {
        const raw = tag(block, 'title');
        // Titles look like "One Piece - TV" — strip the trailing media-type
        // suffix (TV / Movie / OVA / ONA / Special / Music …) for a clean
        // title. The watch status ("Watching - 844 of ? episodes") lives in
        // the <description> instead.
        const title = raw.replace(
          /\s-\s(TV(?:\sSpecial)?|Movie|OVA|ONA|Special|Music|PV|CM|Unknown)\s*$/i,
          ''
        ).trim();
        return {
          title: title || raw,
          status: tag(block, 'description'),
          link: tag(block, 'link'),
          cover: '', // MAL RSS does not expose a poster image
        };
      })
      .filter((a) => a.title)
      .slice(0, 8);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), items: [] });
  }
};
