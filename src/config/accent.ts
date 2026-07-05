// ─── Site accent switch ────────────────────────────────────────────────────
// One place that decides the site's accent color. The actual palettes live in
// src/index.css as [data-accent] token presets; this module only resolves
// WHICH preset is active and mirrors it onto <html data-accent>.
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_ACCENT below (one line).
//
// HOW TO COMPARE CANDIDATES LIVE (no redeploy): add ?accent=emerald (or teal,
// amber, rose, blue) to any URL, e.g. eduardhvizdak.com/?accent=emerald. The
// choice is remembered as you click around; use ?accent=reset to clear it and
// fall back to the default.

export type AccentPreset = 'blue' | 'emerald' | 'teal' | 'amber' | 'rose';

const PRESETS: AccentPreset[] = ['blue', 'emerald', 'teal', 'amber', 'rose'];

const DEFAULT_ACCENT: AccentPreset = 'blue';

const STORAGE_KEY = 'accent-preset';

// Resolve the active preset: URL query wins (and is remembered), then the last
// remembered choice, then the default. Guarded so it is safe during
// prerender / SSR where window is absent.
export function getAccentPreset(): AccentPreset {
  if (typeof window === 'undefined') return DEFAULT_ACCENT;
  try {
    const q = new URLSearchParams(window.location.search).get('accent');
    if (q && (PRESETS as string[]).includes(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q as AccentPreset;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (PRESETS as string[]).includes(saved)) return saved as AccentPreset;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_ACCENT;
}

// Mirror the active preset onto <html data-accent> so the CSS token presets in
// src/index.css apply. 'blue' is the tokens' default, so it clears the attr.
export function applyAccentPreset(): void {
  if (typeof document === 'undefined') return;
  const preset = getAccentPreset();
  if (preset === 'blue') document.documentElement.removeAttribute('data-accent');
  else document.documentElement.setAttribute('data-accent', preset);
}
