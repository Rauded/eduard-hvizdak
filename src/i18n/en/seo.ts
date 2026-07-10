// SEO namespace: per-page <title> and meta description strings, plus the
// og:locale value. Keyed by page so react-helmet-async can swap them live for
// human visitors when the language changes. Crawlers still index the English
// prerender (the in-place toggle does not create alternate URLs).
const seo = {
  ogLocale: 'en_US',
  homeDescription:
    'AI engineer and indie founder. I build production AI systems (RAG pipelines, multi-agent tooling) and run real SaaS products: InzerPro, NasadClaw, KouzelnikNaAkci.',
};

export default seo;
