import React, { createContext, useContext, useEffect, useState } from 'react';

export type SiteTheme = 'light' | 'dark';

const THEME_KEY = 'site-theme';

type ThemeContextValue = {
  theme: SiteTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

// Browser-chrome colours (mobile address bar) per theme — kept in sync with the
// page so the bar never clashes with the canvas.
const CHROME_COLOR: Record<SiteTheme, string> = {
  light: '#fafafa',
  dark: '#0a0a0b',
};

// Single site-wide light/dark source of truth. Persists to localStorage and
// mirrors the choice onto <html data-theme>, so the shared header/footer, the
// home page, and every sub-page (blog/now/things) all theme from one place and
// stay in sync live. First-time visitors follow their OS preference; after that
// their explicit choice wins. SSR/prerender-safe.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const v = window.localStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark') return v;
    // No saved choice yet: respect the OS setting on first visit, default dark.
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', CHROME_COLOR[theme]);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
