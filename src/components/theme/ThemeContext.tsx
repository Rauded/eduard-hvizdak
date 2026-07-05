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
  light: '#f2f2ee',
  dark: '#09090b',
};

// Single site-wide light/dark source of truth. Persists to localStorage and
// mirrors the choice onto <html data-theme>, so the shared header/footer, the
// home page, and every sub-page (blog/now/things) all theme from one place and
// stay in sync live. First-time visitors follow their OS preference; after that
// their explicit choice wins. SSR/prerender-safe.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Design v2 experiment: the paper/ink/orange language is a single locked
  // theme. We pin the existing 'light' scope so every [data-theme='light']
  // selector keeps working, and the header hides its toggle.
  const [theme] = useState<SiteTheme>('light');

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', CHROME_COLOR[theme]);
  }, [theme]);

  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
