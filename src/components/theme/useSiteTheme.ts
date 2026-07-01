import { useEffect, useState } from 'react';

export type SiteTheme = 'light' | 'dark';

const THEME_KEY = 'site-theme';

// Site-wide light/dark preference for the home page shell, persisted to
// localStorage. Defaults to 'light' — the professional first impression — and
// is SSR/prerender-safe (guards `window`). Mirrors the blog's useBlogTheme so
// the two systems feel consistent.
export function useSiteTheme(): [SiteTheme, () => void] {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    const v = window.localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'light';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggle];
}
