import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, getLocale, saveLocale } from '../config/locale';

// Single site-wide language source of truth. Mirrors the ThemeContext shape.
// The initial value is read synchronously from getLocale() in the lazy useState
// initializer, so the very first client render is already in the right language
// (no post-mount language flip). The prerendered HTML is always English because
// getLocale() returns 'en' when window/localStorage carry no choice.

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
});

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale());

  useEffect(() => {
    saveLocale(locale);
    // Keep the document language in sync so screen readers apply the right
    // pronunciation rules (Helmet also sets this on pages that render <Seo>,
    // this guarantees it for any view and on every switch).
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => useContext(LocaleContext);
