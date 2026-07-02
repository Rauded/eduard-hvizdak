// Vercel serverless function — returns Eduard's latest YouTube uploads from the
// channel RSS feed (browser-CORS-blocked, so the /now page calls this instead).
const CHANNEL_ID = 'UCGRsqTO8lOtioIzShbD2W7g'; // youtube.com/@eduardhvizdak
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const grab = (block, re) => {
  const m = block.match(re);
  return m ? m[1].trim() : '';
};

module.exports = async (req, res) => {
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': 'eduard-hvizdak.vercel.app' } });
    if (!r.ok) throw new Error(`YouTube ${r.status}`);
    const xml = await r.text();

    const items = xml
      .split('<entry>')
      .slice(1)
      .map((block) => {
        const id = grab(block, /<yt:videoId>([^<]+)<\/yt:videoId>/);
        const viewsRaw = grab(block, /<media:statistics\s+views="(\d+)"/);
        return {
          id,
          title: grab(block, /<title>([^<]+)<\/title>/),
          published: grab(block, /<published>([^<]+)<\/published>/),
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
          thumbnailFallback: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          views: viewsRaw ? Number(viewsRaw) : null,
        };
      })
      .filter((v) => v.id)
      .slice(0, 4);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), items: [] });
  }
};
