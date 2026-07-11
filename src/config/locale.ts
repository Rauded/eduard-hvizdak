// Site language switch. One place that decides which language the whole site
// renders in:
//
//   'en' : English (the default; lives at the site ROOT, unprefixed URLs)
//   'sk' : Slovak (full translation; lives under /sk)
//   'cs' : Czech (full translation; lives under /cs)
//
// The locale is derived from the URL PATH (the crawlable source of truth): see
// getLocaleFromPath below and LocaleProvider in src/i18n/LocaleContext.tsx. The
// path segment IS the locale code, so hreflang, canonical, and <html lang> all
// derive from it with no mapping layer. localStorage only remembers a preference
// (saveLocale); it never drives what a crawler sees.
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_LOCALE below.
//
// LEGACY: old ?lang=sk / ?lang=reset links still work: LegacyLangRedirect in
// App.tsx client-redirects them to the equivalent /sk path.

export type Locale = 'en' | 'sk' | 'cs';

export const LOCALES: Locale[] = ['en', 'sk', 'cs'];

export const DEFAULT_LOCALE: Locale = 'en';

const STORAGE_KEY = 'site-locale';

export function isLocale(v: string | null | undefined): v is Locale {
  return v === 'en' || v === 'sk' || v === 'cs';
}

// ── Path-based locale (the crawlable source of truth) ────────────────────────
// English lives at the site root (unprefixed, unchanged URLs). Slovak and Czech
// live under /sk and /cs. The path segment IS the locale code, so hreflang and
// <html lang> derive from it with no mapping layer.

// Which locale a pathname belongs to: '/sk' or '/sk/...' -> 'sk', same for cs.
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  return isLocale(seg) && seg !== 'en' ? seg : 'en';
}

// Remove the locale prefix, returning the canonical English-shaped path.
// '/sk/blog' -> '/blog', '/sk' -> '/', English paths pass through unchanged.
export function stripLocale(pathname: string): string {
  const seg = pathname.split('/')[1];
  if (seg === 'sk' || seg === 'cs') {
    const rest = pathname.slice(seg.length + 1); // drop '/sk'
    return rest === '' ? '/' : rest;
  }
  return pathname || '/';
}

// Add the locale prefix to a locale-less path. This is the ONE helper every link,
// canonical, hreflang, sitemap entry, and prerender route goes through, so all
// prefixed URLs are generated identically (reciprocity by construction).
// en -> unchanged; sk/cs -> '/sk' + path (home is '/sk', not '/sk/').
export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'en') return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

// Persist a choice made through the header switcher and mirror it immediately.
export function saveLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode; the in-memory context state still carries the choice */
  }
  applyLocale(locale);
}

// Mirror the active locale onto <html lang> so the document advertises the right
// language to the browser and assistive tech.
export function applyLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', locale);
}
