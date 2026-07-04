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
//
// heroAscii: experimental animated dither/ASCII canvas background in the home
//   hero (AsciiDitherBackground). Preview with ?hero=on; pick the render style
//   with ?heroMode=dither or ?heroMode=ascii (see heroMode below).

export type FeatureFlag = 'latestTweets' | 'heroAscii';

const DEFAULTS: Record<FeatureFlag, boolean> = {
  latestTweets: false,
  // Default ON only on the experiment/hero-dither branch so the Vercel
  // preview shows the effect without query params. Keep false on main.
  heroAscii: true,
};

// URL query param that overrides each flag, plus the localStorage key it is
// remembered under. Keeps the query names short and readable.
const PARAM: Record<FeatureFlag, string> = {
  latestTweets: 'tweets',
  heroAscii: 'hero',
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

// Render style for the heroAscii experiment. Same cascade as isFeatureOn:
// ?heroMode=dither|ascii wins and is remembered, ?heroMode=reset clears the
// saved choice, otherwise the last remembered choice, then the default.
export type HeroMode = 'dither' | 'ascii';

export function heroMode(): HeroMode {
  if (typeof window === 'undefined') return 'dither';
  try {
    const q = new URLSearchParams(window.location.search).get('heroMode');
    if (q === 'dither' || q === 'ascii') {
      window.localStorage.setItem('feature:heroMode', q);
      return q;
    }
    if (q === 'reset') window.localStorage.removeItem('feature:heroMode');
    const saved = window.localStorage.getItem('feature:heroMode');
    if (saved === 'dither' || saved === 'ascii') return saved;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return 'dither';
}
