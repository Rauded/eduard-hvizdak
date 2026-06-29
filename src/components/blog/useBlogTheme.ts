import { useEffect, useState } from 'react';

export type BlogTheme = 'light' | 'dark';

const THEME_KEY = 'blog-theme';

// Shared light/dark reading preference for the whole blog (feed + articles),
// persisted to localStorage so the choice carries across pages and devices.
export function useBlogTheme(): [BlogTheme, () => void] {
  const [theme, setTheme] = useState<BlogTheme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const v = window.localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggle];
}
