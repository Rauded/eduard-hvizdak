import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocale } from '../i18n/LocaleContext';
import { Locale } from '../config/locale';

// og:locale advertises the language the page is currently rendered in. The
// in-place toggle does not create alternate URLs, so there is no hreflang set;
// this just keeps the social-preview locale honest for human visitors.
const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  sk: 'sk_SK',
  cs: 'cs_CZ',
};

// Canonical base. Swap this single constant when a custom domain lands.
export const SITE_URL = 'https://eduardhvizdak.com';
// ?v=2 busts social-scraper caches after the hero-matched card refresh (2026-07).
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png?v=2`;
// Stable @id so blog-post authors resolve to one Person entity (see index.html).
export const PERSON_ID = `${SITE_URL}/#person`;

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. '/blog'
  image?: string; // absolute, or root-relative ("/blog/x.jpg")
  type?: 'website' | 'article';
  jsonLd?: object | object[];
  noindex?: boolean; // unlisted pages: keep out of search + AI crawlers
}

const fullTitle = (t: string) => (t === 'Eduard Hvizdak' ? t : `${t} · Eduard Hvizdak`);
const abs = (img?: string) =>
  !img ? DEFAULT_OG_IMAGE : img.startsWith('http') ? img : `${SITE_URL}${img}`;

const Seo: React.FC<SeoProps> = ({ title, description, path, image, type = 'website', jsonLd, noindex }) => {
  const { locale } = useLocale();
  const url = `${SITE_URL}${path}`;
  const t = fullTitle(title);
  const img = abs(image);
  return (
    <Helmet>
      <html lang={locale} />
      <title>{t}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {noindex && <meta name="googlebot" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      <meta property="og:site_name" content="Eduard Hvizdak" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@EduardHvizdak" />
      <meta name="twitter:creator" content="@EduardHvizdak" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
