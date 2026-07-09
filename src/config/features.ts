// Site feature flags. One place to turn in-progress features on or off without
// hunting through components.
//
// latestTweets: the auto-synced "Latest posts on X" section on /now, fed by the
//   local scraper (scripts/scrape-tweets.mjs) into public/latest-tweets.json.
//   Kept OFF until the scraper has been set up and we are happy with it.
//
// heroDither: the animated dither + ASCII-halftone flower behind the hero
//   (src/components/hero/AsciiDitherBackground.tsx). ON by default: it is the
//   shipped hero background. ?hero=off renders the hero without the canvas
//   (headline, role line, CTAs and terminal still show) as an escape hatch.
//
// HOW TO SHIP a flag to everyone: flip its DEFAULTS entry below (one line),
//   commit, push. Vercel redeploys.
//
// HOW TO PREVIEW LIVE without redeploying: add ?<param>=on to any URL, e.g.
//   eduardhvizdak.com/now?tweets=on or eduardhvizdak.com/?hero=off . The
//   choice is remembered as you click around. Use ?<param>=off to flip it, or
//   ?<param>=reset to clear the override and fall back to the default.

export type FeatureFlag = 'latestTweets' | 'heroDither';

const DEFAULTS: Record<FeatureFlag, boolean> = {
  latestTweets: false,
  heroDither: true,
};

// URL query param that overrides each flag, plus the localStorage key it is
// remembered under. Keeps the query names short and readable.
const PARAM: Record<FeatureFlag, string> = {
  latestTweets: 'tweets',
  heroDither: 'hero',
};

// Resolve a flag: URL query wins (on/off, and is remembered), then the last
// remembered choice, then the default. Guarded for prerender / SSR where
// window is absent.
export function isFeatureOn(flag: FeatureFlag): boolean {
  const def = DEFAULTS[flag];
  if (typeof window === 'undefined') return def;
  const param = PARAM[flag];
  const storageKey = `feature:${flag}`;
  try {
    const q = new URLSearchParams(window.location.search).get(param);
    if (q === 'on' || q === 'off') {
      window.localStorage.setItem(storageKey, q);
      return q === 'on';
    }
    if (q === 'reset') window.localStorage.removeItem(storageKey);
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'on' || saved === 'off') return saved === 'on';
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return def;
}
