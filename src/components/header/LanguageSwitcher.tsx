import React from 'react';
import { LOCALES, Locale } from '../../config/locale';
import { useLocale } from '../../i18n/LocaleContext';
import { useT } from '../../i18n';

// Compact segmented control [EN | SK | CZ] that flips the whole site language.
// Buttons (not links): the URL does not change, only the active locale. Lives at
// the end of the nav, in the slot the theme toggle used to occupy.
const SHORT: Record<Locale, string> = { en: 'EN', sk: 'SK', cs: 'CZ' };

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();
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
          <button
            key={code}
            type="button"
            lang={code}
            className={`lang-switcher__option ${active ? 'lang-switcher__option--active' : ''}`}
            aria-pressed={active}
            aria-label={fullName[code]}
            title={fullName[code]}
            onClick={() => setLocale(code)}
          >
            {SHORT[code]}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
