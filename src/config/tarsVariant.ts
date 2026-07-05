// ─── TARS hero display switch ──────────────────────────────────────────────
// One place that decides how the hero's right-hand visual is framed.
// The variants themselves live in src/components/hero/hero.tsx; this module
// only resolves WHICH one is active.
//
//   'terminal' → the macOS-style terminal window (default)
//   'grid'     → dark tile with a faint engineering grid fading upward
//   'space'    → dark tile with a sparse starfield, TARS on a floor line
//   'rose'     → no TARS: the blue halftone flower bloom fills the hero
//   'combo'    → everything at once: flower bloom behind the hero, and the
//                terminal's screen becomes a starfield + grid floor scene
//   'edges'    → embroidery: smaller blooms cropped in from the hero's
//                edges behind the standard terminal
//   'symbols'  → no TARS: the flower bloom again, but rebuilt as a symbol
//                halftone (dots / rings / frames per brightness band, after
//                arlan.me/vault/sandbox) instead of the fine dither
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_VARIANT below.
//
// HOW TO COMPARE LIVE (no redeploy): add ?tars=grid (or space, rose,
// terminal) to any URL. The choice is remembered as you click around;
// use ?tars=reset to clear it and fall back to the default.

export type TarsVariant = 'terminal' | 'grid' | 'space' | 'rose' | 'combo' | 'edges' | 'symbols';

const VARIANTS: TarsVariant[] = ['terminal', 'grid', 'space', 'rose', 'combo', 'edges', 'symbols'];

const DEFAULT_VARIANT: TarsVariant = 'terminal';

const STORAGE_KEY = 'tars-variant';

export function getTarsVariant(): TarsVariant {
  if (typeof window === 'undefined') return DEFAULT_VARIANT;
  try {
    let q = new URLSearchParams(window.location.search).get('tars');
    if (q === 'rose-dither') q = 'rose'; // old preview URLs keep working
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
