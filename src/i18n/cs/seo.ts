// SEO namespace: per-page <title> and meta description strings, plus the
// og:locale value. Keyed by page so react-helmet-async can swap them live for
// human visitors when the language changes. Crawlers still index the English
// prerender (the in-place toggle does not create alternate URLs).
const seo = {
  ogLocale: 'cs_CZ',
  homeDescription:
    'AI inženýr. Stavím produkční AI systémy pro firmy: automatizace, agenty, práci s dokumenty. Vedle toho provozuji InzerPro, SaaS s platícími zákazníky.',
};

export default seo;
