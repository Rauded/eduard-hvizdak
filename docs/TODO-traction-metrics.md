# TODO — Selective traction metrics

**Status:** parked on purpose. Eduard wants this, but the numbers aren't strong
enough to show yet. Implement once there's real traction worth displaying.

## Why park it
Weak or empty metrics read *worse* than no metrics — "3 users" undersells. Wait
until at least a couple of these are genuinely impressive, then turn it on.

## What to show (honest signals, not vanity)
Pick the 3–4 that look strongest at the time. Income/MRR stays **private**.
- **Paying customers** — count (e.g. "12 paying customers") once it's meaningful.
- **Listings auto-posted / processed** — InzerPro's cumulative volume (big number, safe to show).
- **Live since** — "InzerPro live since 2025" (longevity = credibility).
- **Uptime** — if tracked (e.g. 99.9%).
- **Products shipped** — "3 SaaS products in production" (already true).
- Optional per-product: active users this month, repeat-usage/retention.

## Where it goes
A compact **"Traction" strip** on the homepage, ideally right under (or inside) a
"What I'm building" products section — above the long Projects showcase. Big
numbers + tiny labels, same restrained indigo style. Keep it to one row.

## Implementation sketch (when ready)
- Hardcode first (a small `TRACTION` array in a new `src/components/traction/`),
  since these change rarely and "live" counters that show small numbers look bad.
- Later, if a number is worth auto-updating (e.g. listings posted), expose a
  sanitized count via a Vercel function (`api/inzerpro-stats.js`) like the other
  `/api/*` feeds — **never** expose revenue.
- Prerendering already bakes homepage content into static HTML, so hardcoded
  numbers are crawlable for free.

## Trigger to revisit
Check back when InzerPro / NasadClaw / KouzelníkNaAkci have numbers Eduard is
proud to show publicly. Until then, leave this off the site.

## Related
- See `ROADMAP.md` → Sprint 2 ("What I'm building" + traction).
- Pairs with the still-open **products / "What I'm building" strip**.
