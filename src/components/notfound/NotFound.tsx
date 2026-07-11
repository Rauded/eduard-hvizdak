import React from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import Seo from '../../seo/Seo';
import LocaleLink from '../common/LocaleLink';
import { useT } from '../../i18n';
import './notfound.scss';

// Catch-all route. The SPA rewrite still returns HTTP 200 for unknown paths
// (a real 404 status would need hosting-level config), but the noindex tag
// keeps these soft-404s out of search and AI crawlers. Copy is localized so the
// baked /sk/404 and /cs/404 pages match their <html lang>.
const NotFound: React.FC = () => {
  const t = useT('notfound');
  return (
    <>
      <Seo title={t.title} description={t.text} path="/404" noindex />
      <section className="notfound">
        <p className="notfound__code">{t.code}</p>
        <h1 className="notfound__title">{t.title}</h1>
        <p className="notfound__text">{t.text}</p>
        <LocaleLink to="/" className="notfound__cta">
          <LuArrowLeft aria-hidden="true" />
          {t.cta}
        </LocaleLink>
      </section>
    </>
  );
};

export default NotFound;
