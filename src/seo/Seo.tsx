import React from 'react';
import { Helmet } from 'react-helmet-async';

// Canonical base. Swap this single constant when a custom domain lands.
export const SITE_URL = 'https://eduard-hvizdak.vercel.app';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
// Stable @id so blog-post authors resolve to one Person entity (see index.html).
export const PERSON_ID = `${SITE_URL}/#person`;

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. '/blog'
  image?: string; // absolute, or root-relative ("/blog/x.jpg")
  type?: 'website' | 'article';
  jsonLd?: object | object[];
}

const fullTitle = (t: string) => (t === 'Eduard Hvizdak' ? t : `${t} · Eduard Hvizdak`);
const abs = (img?: string) =>
  !img ? DEFAULT_OG_IMAGE : img.startsWith('http') ? img : `${SITE_URL}${img}`;

const Seo: React.FC<SeoProps> = ({ title, description, path, image, type = 'website', jsonLd }) => {
  const url = `${SITE_URL}${path}`;
  const t = fullTitle(title);
  const img = abs(image);
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Eduard Hvizdak" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
