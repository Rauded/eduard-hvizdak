// ─── Site positioning switch ──────────────────────────────────────────────
// One place that decides how Eduard is presented across the whole site:
//
//   'expert'  → no "student / BSc" framing. Reads as an AI engineer, founder
//               and consultant. Aimed at international / corporate clients who
//               are hiring an expert, not a student.
//   'student' → the original framing that keeps the CS-student / BSc line.
//
// HOW TO CHANGE THE DEFAULT for everyone: flip DEFAULT_MODE below (one line).
//
// HOW TO COMPARE BOTH VERSIONS LIVE (no redeploy): add ?mode=expert or
// ?mode=student to any URL, e.g. eduardhvizdak.com/?mode=student. The
// choice is remembered as you click around; use ?mode=reset to clear it and
// fall back to the default.

export type PositioningMode = 'expert' | 'student';

const DEFAULT_MODE: PositioningMode = 'expert';

const STORAGE_KEY = 'positioning-mode';

// Resolve the active mode: URL query wins (and is remembered), then the last
// remembered choice, then the default. Guarded so it is safe during
// prerender / SSR where window is absent.
export function getPositioningMode(): PositioningMode {
  if (typeof window === 'undefined') return DEFAULT_MODE;
  try {
    const q = new URLSearchParams(window.location.search).get('mode');
    if (q === 'expert' || q === 'student') {
      window.localStorage.setItem(STORAGE_KEY, q);
      return q;
    }
    if (q === 'reset') window.localStorage.removeItem(STORAGE_KEY);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'expert' || saved === 'student') return saved;
  } catch {
    /* localStorage can throw in private mode; fall through to default */
  }
  return DEFAULT_MODE;
}

// Convenience: true when we should hide the student framing.
export const isExpertMode = (): boolean => getPositioningMode() === 'expert';
