import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Locale, getLocaleFromPath, stripLocale, localizedPath, saveLocale } from '../config/locale';

// Single site-wide language source of truth, now derived from the URL PATH so it
// is deterministic and crawlable: /sk/... renders Slovak, /cs/... Czech, root is
// English. No useState and no flip-on-mount, so the prerender (headless Chromium
// visiting /sk/blog) and the client hydration agree exactly. Switching language
// is a navigation to the same page under the other prefix.
//
// MUST be mounted INSIDE <Router> (it calls useLocation/useNavigate).

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
});

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const locale = getLocaleFromPath(pathname);

  // Keep the document language in sync for screen readers (Helmet's <html lang>
  // in Seo.tsx agrees; this guarantees it even on views without <Seo>).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    saveLocale(next); // remember the preference (does not drive crawlable state)
    navigate(localizedPath(stripLocale(pathname), next) + search + hash);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => useContext(LocaleContext);
