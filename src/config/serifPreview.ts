// TEMPORARY serif preview switch.
// Lets us compare three strategies for the serif display headings across the
// three languages, to decide whether English should keep its own font:
//
//   'jeju'     the shipped default: English headings use Jeju Myeongjo, Slovak
//              and Czech use Source Serif 4 (Jeju has no accented glyphs). The
//              two serifs differ, so headings shift when switching to/from EN.
//   'source'   one serif for all languages: Source Serif 4 everywhere. No shift.
//   'playfair' one serif for all languages: Playfair Display everywhere. No
//              shift, keeps an elegant high-contrast display look.
//
// This is a throwaway control (a floating button, SerifPreviewSwitcher). Once a
// choice is made, delete this module, the switcher, the CSS preview block, and
// the Playfair @font-face/files, then bake the winner into --font-serif.
//
// Preview live with ?serif=source / ?serif=playfair / ?serif=jeju (or ?serif=reset).

export type SerifPreset = 'jeju' | 'source' | 'playfair';

export const SERIF_PRESETS: SerifPreset[] = ['jeju', 'source', 'playfair'];

const DEFAULT_SERIF: SerifPreset = 'jeju';

const STORAGE_KEY = 'serif-preview';

function isPreset(v: string | null): v is SerifPreset {
  return v === 'jeju' || v === 'source' || v === 'playfair';
}

export function getSerifPreset(): SerifPreset {
  if (typeof window === 'undefined') return DEFAULT_SERIF;
  try {
    const q = new URLSearchParams(window.location.search).get('serif');
    if (isPreset(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isPreset(saved)) return saved;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_SERIF;
}

// Mirror the choice onto <html data-serif>. 'jeju' is the attribute-less default
// (matches the shipped CSS and the prerender), so it removes the attribute.
export function applySerifPreset(preset: SerifPreset = getSerifPreset()): void {
  if (typeof document === 'undefined') return;
  if (preset === 'jeju') document.documentElement.removeAttribute('data-serif');
  else document.documentElement.setAttribute('data-serif', preset);
}

export function setSerifPreset(preset: SerifPreset): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, preset);
  } catch {
    /* ignore */
  }
  applySerifPreset(preset);
}
