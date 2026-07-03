// Site feature flags. One place to turn in-progress features on or off without
// hunting through components.
//
// latestTweets: the auto-synced "Latest posts on X" section on /now, fed by the
//   local scraper (scripts/scrape-tweets.mjs) into public/latest-tweets.json.
//   Kept OFF until the scraper has been set up and we are happy with it.
//
// HOW TO SHIP IT to everyone: flip DEFAULTS.latestTweets to true below (one
//   line), commit, push. Vercel redeploys.
//
// HOW TO PREVIEW IT LIVE without redeploying: add ?tweets=on to any URL, e.g.
//   eduardhvizdak.com/now?tweets=on . The choice is remembered as you
//   click around. Use ?tweets=off to hide it again, or ?tweets=reset to clear
//   the override and fall back to the default.

export type FeatureFlag = 'latestTweets';

const DEFAULTS: Record<FeatureFlag, boolean> = {
  latestTweets: false,
};

// URL query param that overrides each flag, plus the localStorage key it is
// remembered under. Keeps the query names short and readable.
const PARAM: Record<FeatureFlag, string> = {
  latestTweets: 'tweets',
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
