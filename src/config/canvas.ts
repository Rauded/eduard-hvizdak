// ─── Light-mode canvas switch ──────────────────────────────────────────────
// Decides the light theme's page canvas. The palettes live in src/index.css
// as [data-canvas] token presets; this module resolves WHICH one is active
// and mirrors it onto <html data-canvas>. Dark mode ignores it.
//
//   'default' → the cool off-white (#fafaf8)
//   'paper'   → warm beige paper look
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_CANVAS below.
//
// HOW TO COMPARE LIVE (no redeploy): add ?canvas=paper to any URL. The choice
// is remembered as you click around; ?canvas=reset clears it.

export type CanvasPreset = 'default' | 'paper';

const PRESETS: CanvasPreset[] = ['default', 'paper'];

const DEFAULT_CANVAS: CanvasPreset = 'default';

const STORAGE_KEY = 'canvas-preset';

export function getCanvasPreset(): CanvasPreset {
  if (typeof window === 'undefined') return DEFAULT_CANVAS;
  try {
    const q = new URLSearchParams(window.location.search).get('canvas');
    if (q && (PRESETS as string[]).includes(q)) {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q as CanvasPreset;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (PRESETS as string[]).includes(saved)) return saved as CanvasPreset;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_CANVAS;
}

export function applyCanvasPreset(): void {
  if (typeof document === 'undefined') return;
  const preset = getCanvasPreset();
  if (preset === 'default') document.documentElement.removeAttribute('data-canvas');
  else document.documentElement.setAttribute('data-canvas', preset);
}
