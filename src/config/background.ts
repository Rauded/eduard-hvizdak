// ─── Site background switch ────────────────────────────────────────────────
// Decides whether the site-wide ASCII flower embroidery layer renders behind
// every page (src/components/background/SiteEmbroidery.tsx).
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_BG below.
//
// HOW TO COMPARE LIVE (no redeploy): ?bg=off hides it, ?bg=embroidery shows
// it. The choice is remembered as you click around; ?bg=reset clears it.

export type BackgroundPreset = 'embroidery' | 'off';

const PRESETS: BackgroundPreset[] = ['embroidery', 'off'];

// experiment/humandelta: the clean white canvas is the point, so the
// embroidery layer defaults off. Compare live with ?bg=embroidery.
const DEFAULT_BG: BackgroundPreset = 'off';

const STORAGE_KEY = 'bg-preset';

export function getBackgroundPreset(): BackgroundPreset {
  if (typeof window === 'undefined') return DEFAULT_BG;
  try {
    const q = new URLSearchParams(window.location.search).get('bg');
    if (q && (PRESETS as string[]).includes(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q as BackgroundPreset;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (PRESETS as string[]).includes(saved)) return saved as BackgroundPreset;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_BG;
}
