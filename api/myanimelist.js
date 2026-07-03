// Vercel serverless function — proxies + parses Eduard's MyAnimeList RSS
// feed of recent anime-list updates (type=rw), then enriches each entry with
// its real cover poster from the Jikan API (MAL RSS itself exposes no images).
// Browser CORS blocks both, so the /now page calls this instead.
const FEED = 'https://myanimelist.net/rss.php?type=rw&u=rauded';
const UA = 'eduardhvizdak.com';

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Look up a single anime's poster via Jikan (the public MAL API mirror).
// Retries once on a rate-limit/transient failure so fewer covers fall back.
async function jikanCover(id, attempt = 0) {
  try {
    const r = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { headers: { 'User-Agent': UA } });
    if (r.status === 429 && attempt < 1) {
      await sleep(900);
      return jikanCover(id, attempt + 1);
    }
    if (!r.ok) return '';
    const j = await r.json();
    const img = j && j.data && j.data.images && j.data.images.jpg;
    return (img && (img.image_url || img.large_image_url)) || '';
  } catch {
    if (attempt < 1) {
      await sleep(900);
      return jikanCover(id, attempt + 1);
    }
    return '';
  }
}

module.exports = async (req, res) => {
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': UA } });
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
        const title = raw
          .replace(/\s-\s(TV(?:\sSpecial)?|Movie|OVA|ONA|Special|Music|PV|CM|Unknown)\s*$/i, '')
          .trim();
        const link = tag(block, 'link');
        const idMatch = link.match(/\/anime\/(\d+)/);
        return {
          title: title || raw,
          status: tag(block, 'description'),
          link,
          id: idMatch ? idMatch[1] : '',
          cover: '',
        };
      })
      .filter((a) => a.title)
      .slice(0, 6); // match the films/books rows so it stays a single row

    // Enrich with cover posters from Jikan, in small batches so we stay under
    // its rate limit (~3 req/s). Any lookup that fails just leaves cover ''.
    const BATCH = 2;
    for (let i = 0; i < items.length; i += BATCH) {
      const slice = items.slice(i, i + BATCH);
      const covers = await Promise.all(
        slice.map((a) => (a.id ? jikanCover(a.id) : Promise.resolve('')))
      );
      slice.forEach((a, k) => { a.cover = covers[k]; });
      if (i + BATCH < items.length) await sleep(700);
    }

    // Strip the internal id before returning.
    const payload = items.map(({ id, ...rest }) => rest);

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({ items: payload });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), items: [] });
  }
};
