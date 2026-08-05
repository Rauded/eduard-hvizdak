// Kill switch for the CZS Masaryk University case study.
// false = the /projects/czs-muni-chatbot route 404s and the services page
// hides its case study card, while all code and copy stay in the repo.
// Hidden on 2026-07-12 pending permission from CZS/MUNI; unhidden on
// 2026-08-05 on Eduard's go-ahead. If it ever needs to disappear again,
// flip to false and re-comment the entries in scripts/prerender.mjs and
// scripts/gen-sitemap.mjs.
export const SHOW_CZS_CASE_STUDY = true;
