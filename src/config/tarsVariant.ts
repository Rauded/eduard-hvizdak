// ─── TARS hero display switch ──────────────────────────────────────────────
// One place that decides how the hero's TARS patrol animation is framed.
// The variants themselves live in src/components/hero/hero.tsx; this module
// only resolves WHICH one is active.
//
//   'terminal' → the original macOS-style terminal window
//   'card'     → a quiet dark tile: same dark focal object, no window chrome
//   'bare'     → TARS walks directly on the page, no container at all
//   'floor'    → bare, plus a hairline floor under his feet
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_VARIANT below.
//
// HOW TO COMPARE LIVE (no redeploy): add ?tars=card (or bare, floor,
// terminal) to any URL. The choice is remembered as you click around;
// use ?tars=reset to clear it and fall back to the default.

export type TarsVariant = 'terminal' | 'card' | 'bare' | 'floor';

const VARIANTS: TarsVariant[] = ['terminal', 'card', 'bare', 'floor'];

const DEFAULT_VARIANT: TarsVariant = 'terminal';

const STORAGE_KEY = 'tars-variant';

export function getTarsVariant(): TarsVariant {
  if (typeof window === 'undefined') return DEFAULT_VARIANT;
  try {
    const q = new URLSearchParams(window.location.search).get('tars');
    if (q && (VARIANTS as string[]).includes(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q as TarsVariant;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (VARIANTS as string[]).includes(saved)) return saved as TarsVariant;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_VARIANT;
}
