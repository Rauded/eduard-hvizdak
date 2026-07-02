// Vercel serverless function: returns 28-day Google Search Console totals
// (impressions + clicks) per property, for the /now "Currently building" cards.
//
// Auth: a Google service account with read access to each Search Console
// property. Paste the service-account JSON key into the Vercel env var
// GSC_SERVICE_ACCOUNT (raw JSON or base64). No npm deps: the JWT is signed
// with Node's built-in crypto, so nothing to install.
//
// Until the env var is set, this returns { configured: false, items: [] } and
// the /now cards simply show no number (graceful, same as the other feeds).
const crypto = require('crypto');

// Allowlist: only these domains are ever exposed publicly. Matched as a
// substring against each GSC property's siteUrl (handles sc-domain: form).
const SITES = [
  { match: 'inzerpro.cz', label: 'InzerPro' },
  { match: 'kouzelniknaakci.cz', label: 'KouzelníkNaAkci' },
  { match: 'nasadclaw.cz', label: 'NasadClaw' },
];

const b64url = (input) =>
  Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  }));
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = b64url(signer.sign(sa.private_key));
  const assertion = `${header}.${claim}.${signature}`;

  const r = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!r.ok) throw new Error(`token ${r.status}`);
  return (await r.json()).access_token;
}

const ymd = (ms) => new Date(ms).toISOString().slice(0, 10);

module.exports = async (req, res) => {
  try {
    const raw = process.env.GSC_SERVICE_ACCOUNT;
    if (!raw) {
      res.setHeader('Cache-Control', 's-maxage=300');
      return res.status(200).json({ configured: false, items: [] });
    }
    const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    const sa = JSON.parse(json);
    if (sa.private_key && sa.private_key.includes('\\n')) {
      sa.private_key = sa.private_key.replace(/\\n/g, '\n');
    }

    const token = await getAccessToken(sa);
    const H = { Authorization: `Bearer ${token}` };

    const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', { headers: H });
    const sites = (await sitesRes.json()).siteEntry || [];

    // GSC data lags ~2-3 days; use a 28-day window ending 2 days ago.
    const end = ymd(Date.now() - 2 * 86400000);
    const start = ymd(Date.now() - 29 * 86400000);

    const items = [];
    for (const cfg of SITES) {
      const entry = sites.find(
        (s) => s.siteUrl.includes(cfg.match) && s.permissionLevel !== 'siteUnverifiedUser'
      );
      if (!entry) continue;
      const q = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(entry.siteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: { ...H, 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate: start, endDate: end }),
        }
      );
      if (!q.ok) continue;
      const row = ((await q.json()).rows || [])[0];
      if (!row) continue;
      items.push({
        label: cfg.label,
        domain: cfg.match,
        impressions: Math.round(row.impressions),
        clicks: Math.round(row.clicks),
      });
    }

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({ configured: true, window: { start, end }, items });
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e), items: [] });
  }
};
