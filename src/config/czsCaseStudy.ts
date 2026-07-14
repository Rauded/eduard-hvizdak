// Kill switch for the CZS Masaryk University case study.
// false = the /projects/czs-muni-chatbot route 404s and the services page
// hides its case study card, while all code and copy stay in the repo.
// Hidden on 2026-07-12 pending written permission from CZS/MUNI to name
// them and use the university logo. Flip to true once permission arrives,
// and restore the entries in scripts/prerender.mjs and scripts/gen-sitemap.mjs.
export const SHOW_CZS_CASE_STUDY = false;
