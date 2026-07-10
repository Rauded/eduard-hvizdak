// Site language switch.
// One place that decides which language the whole site renders in:
//
//   'en' : English (the default; what the prerender bakes and what crawlers see)
//   'sk' : Slovak (full translation)
//   'cs' : Czech (present and selectable, but falls back to English until the
//          Czech dictionaries are filled in)
//
// This mirrors the same pattern as src/config/typeface.ts and positioning.ts:
// the URL query wins and is remembered, then the last remembered choice, then
// the default. Unlike those (which only flip a <html> data-attribute), the
// language also has to re-render React components, so the source of truth is the
// LocaleProvider context in src/i18n/LocaleContext.tsx. This module just does
// the storage + URL resolution and mirrors the choice onto <html lang>.
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_LOCALE below.
//
// HOW TO COMPARE LIVE (no redeploy): add ?lang=sk (or ?lang=cs / ?lang=en) to
// any URL. The choice is remembered as you click around; ?lang=reset clears it.

export type Locale = 'en' | 'sk' | 'cs';

export const LOCALES: Locale[] = ['en', 'sk', 'cs'];

export const DEFAULT_LOCALE: Locale = 'en';

const STORAGE_KEY = 'site-locale';

function isLocale(v: string | null): v is Locale {
  return v === 'en' || v === 'sk' || v === 'cs';
}

// Resolve the active locale. Guarded so it is safe during prerender / SSR where
// window is absent. That path always returns English, which is why the baked
// HTML is English.
export function getLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_LOCALE;
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
