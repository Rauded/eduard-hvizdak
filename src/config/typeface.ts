// ─── Display typeface switch ────────────────────────────────────────────────
// Decides which face drives the big display headings. The families live in
// src/index.css as --font-display; this module resolves WHICH preset is active
// and mirrors it onto <html data-type>. The type scale (sizes/weights) reads
// the same tokens, so nothing else needs to know which face is on.
//
//   'serif' → Jeju Myeongjo serif headings (the default, no attribute)
//   'geist' → Geist Sans headings (opt in via <html data-type="geist">)
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_TYPE below.
//
// HOW TO COMPARE LIVE (no redeploy): add ?type=geist to any URL. The choice is
// remembered as you click around; ?type=reset clears it back to the default.

export type TypePreset = 'geist' | 'serif';

const PRESETS: TypePreset[] = ['geist', 'serif'];

const DEFAULT_TYPE: TypePreset = 'serif';

const STORAGE_KEY = 'type-preset';

export function getTypePreset(): TypePreset {
  if (typeof window === 'undefined') return DEFAULT_TYPE;
  try {
    const q = new URLSearchParams(window.location.search).get('type');
    if (q && (PRESETS as string[]).includes(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q as TypePreset;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (PRESETS as string[]).includes(saved)) return saved as TypePreset;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_TYPE;
}

export function applyTypePreset(): void {
  if (typeof document === 'undefined') return;
  const preset = getTypePreset();
  // Serif is the attribute-less default (matches the prerendered CSS, no flash);
  // Geist is the opt-in override.
  if (preset === 'serif') document.documentElement.removeAttribute('data-type');
  else document.documentElement.setAttribute('data-type', 'geist');
}
