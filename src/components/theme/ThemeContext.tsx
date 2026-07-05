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
  light: '#ffffff',
  dark: '#09090b',
};

// Single site-wide light/dark source of truth. Persists to localStorage and
// mirrors the choice onto <html data-theme>, so the shared header/footer, the
// home page, and every sub-page (blog/now/things) all theme from one place and
// stay in sync live. First-time visitors follow their OS preference; after that
// their explicit choice wins. SSR/prerender-safe.
// experiment/humandelta: light mode is pinned. Dark mode on this branch still
// carries the legacy hardcoded palette, so the experiment ships light only.
// Restore the commented initializer below to unpin.
const THEME_PINNED = true;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (THEME_PINNED) return 'light';
    if (typeof window === 'undefined') return 'light';
    const v = window.localStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark') return v;
    // No saved choice yet, so respect the OS setting on first visit.
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (!THEME_PINNED) window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', CHROME_COLOR[theme]);
  }, [theme]);

  const toggleTheme = () => {
    if (THEME_PINNED) return;
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
