import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOCALES, Locale, localizedPath, stripLocale, saveLocale } from '../../config/locale';
import { useLocale } from '../../i18n/LocaleContext';
import { useT } from '../../i18n';

// Compact segmented control [EN | SK | CZ] that flips the whole site language.
// Real <Link>s now (not buttons): each points at the SAME page under the other
// locale prefix, so they are crawlable alternate links and work without JS. The
// onClick just remembers the preference; the navigation is the href.
const SHORT: Record<Locale, string> = { en: 'EN', sk: 'SK', cs: 'CZ' };

const LanguageSwitcher: React.FC = () => {
  const { locale } = useLocale();
  const { pathname, search, hash } = useLocation();
  const bare = stripLocale(pathname);
  const t = useT('header');
  const fullName: Record<Locale, string> = {
    en: t.language.en,
    sk: t.language.sk,
    cs: t.language.cs,
  };

  return (
    <div className="lang-switcher" role="group" aria-label={t.language.label}>
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            to={localizedPath(bare, code) + search + hash}
            lang={code}
            className={`lang-switcher__option ${active ? 'lang-switcher__option--active' : ''}`}
            aria-current={active ? 'true' : undefined}
            aria-label={fullName[code]}
            title={fullName[code]}
            onClick={() => saveLocale(code)}
          >
            {SHORT[code]}
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
