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

// Single site-wide light/dark source of truth. Persists to localStorage and
// mirrors the choice onto <html data-theme>, so the shared header/footer, the
// home page, and every sub-page (blog/now/things) all theme from one place and
// stay in sync live. Defaults to 'light' — the professional first impression —
// and is SSR/prerender-safe.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    const v = window.localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'light';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
