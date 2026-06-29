// Vercel serverless function — returns Eduard's GitHub contribution calendar
// (last 365 days) + total, via the public contributions API. No token needed.
const USER = 'Rauded';
const SRC = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`;

module.exports = async (req, res) => {
  try {
    const r = await fetch(SRC, { headers: { 'User-Agent': 'eduard-hvizdak.vercel.app' } });
    if (!r.ok) throw new Error(`GitHub contributions ${r.status}`);
    const data = await r.json();

    const contributions = Array.isArray(data.contributions) ? data.contributions : [];
    const total =
      (data.total && (data.total.lastYear ?? Object.values(data.total).reduce((a, b) => a + b, 0))) ||
      contributions.reduce((a, c) => a + (c.count || 0), 0);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ user: USER, total, contributions });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), total: null, contributions: [] });
  }
};
