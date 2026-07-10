# Audit fixes todo (Fable agent reviews, 2026-07-11)

Three Fable agents audited eduardhvizdak.com: web-perf, web-design-guidelines, and SEO.
Every finding is captured below with its full description, file references, and fix.
Status legend: `[ ]` open, `[~]` in progress, `[x]` done and verified.

The single highest-leverage item appears in all three audits: the double-mounted,
always-autoplaying preview videos in `ProjectCard.tsx`. It is a perf catastrophe
(45 MB, LCP 14s), a UX bug, and it feeds the SEO prerender. Fix it first.

All paths are under `tjklint.github.io/`.

---

## STATUS after implementation (2026-07-11)

DONE and build-verified (CI=false npm run build, 11/11 prerendered):
A1 (video preload/IO/gate + re-encode 36MB->12MB), A2 (route code-splitting,
main chunk -63KB gzip), A3 (PNGs 10.6MB->3.9MB via resize), A4 (fonts removed),
B1, B2, B3, B4, B5, B6, B7, B9, B10, B11, B12, B13, B14, B15, B17,
C1 (verified single meta set per page), C2 (404 route + noindex snapshot),
C3, C4, C6 (code parts: h1->h2, sitemap lastmod).

NO ACTION NEEDED:
B8 (documented first-party decision), B16 (already fixed earlier via --text-faint
token #5f6e8b ~5:1).

REVIEW-FOUND ITEMS (two Fable review passes, empirical Puppeteer probes):
Fixed: soft-404 now serves /404 noindex (vercel.json), duplicate case-modal
portals stripped before hydrate, lazy-route teardown fixed (preload chunk before
hydrate), invisible skip link (white on navy), modal focus-trap body escape,
robots.txt vs noindex conflict.
OPEN (architectural, needs a decision): React #418/#423 hydration warnings fire
on every route. Root cause: the prerender writes a DOM snapshot with no React SSR
Suspense markers, so hydrateRoot cannot hydrate the <Suspense> boundary that the
A2 code-splitting introduced; React recovers by client-rendering the root. Also a
pre-existing homepage Paper-shader canvas-size mismatch. Content + SEO unaffected,
no visible teardown. Proper fix = streaming SSR in scripts/prerender.mjs, or drop
code-splitting, or render the hero shader client-only + scope Suspense off Home.
All carry visual/behaviour risk on the live hero; deferred for a user decision.

BLOCKED ON USER / EXTERNAL (cannot complete autonomously):
A5 (PostHog product decision), C5 (Slovak path-locales project + decision),
C6-www (307->308 is Vercel dashboard domain config, not repo code),
C7 (Wikidata Q-item, needs your account), C8/C9/C10 (content writing + GSC data).
GSC query export still needed from you to prioritize C7-C10.

---

## A. Performance (web-perf audit)

Baseline (Lighthouse 13.4, mobile, cold load): Performance 41/100, LCP 14.1s,
TBT 840ms, TTI 26.9s, page weight 52.4 MB / 76 requests. TTFB 20ms and CLS 0 are good.

- [ ] **A1 (HIGH) Preview videos: 37.6 MB of autoplay MP4s fetched twice (~45 MB of the 52 MB page).**
  The four preview videos (kouzelnici 12.0 MB, psychetab 9.3 MB, inzerpro 9.2 MB,
  newsmatics 7.2 MB) render with `autoPlay` and no `preload`. `ProjectCard.tsx`
  always mounts the case-modal portal (~line 225, "markup is ALWAYS mounted")
  containing a second `<ProjectMedia>`, so every video element exists twice and both
  autoplay. Lighthouse confirmed inzerpro.mp4 downloaded twice (9.16 + 8.99 MB). The
  LCP element is a hidden modal video at 14.1s. Fixes:
    - Add `preload="none"` (or `"metadata"`) plus `poster` to the `<video>` in
      `ProjectMedia` (~line 152); start playback via IntersectionObserver only when in
      view, pause offscreen.
    - Do NOT mount `ProjectMedia` inside the closed modal; keep SEO text always-mounted
      but gate the media on `open`.
    - Re-encode the clips (muted preview loops shown at ~620px card width): H.264 CRF 28
      scaled to 1280px (or AV1/HEVC with MP4 fallback) should get each under ~1.5 MB.
      Sources under `src/`, bundled to `/static/media/*.mp4`.
- [ ] **A2 (HIGH) Single 1,014 KB CRA JS bundle (316 KB brotli), 4.4s script eval, TBT 840ms, TTI 26.9s.**
  `react-scripts` builds everything into one `main.*.js`; Lighthouse flags 36% unused
  (~159 KB, ~830ms). Add route-level `React.lazy` splitting for blog, /now, /things,
  /resume, /services, /styleguide, and the `_21test` / `_bun` animated sections
  (devEditor should already be dev-only). Verify `contribution_map.tsx` dead code is
  not imported.
- [ ] **A3 (MEDIUM) 4.3 MB of oversized PNG screenshots (est. savings 4,302 KB).**
  StudyExe slideshow PNGs (`obsidian_theme_study_session_reading` 987 KB,
  `study_session_configuration` 657 KB, `red_cyberpunk_theme_dashboard` 574 KB,
  `cyberforest_theme` 539 KB, etc.), `nasadclaw-real-image.png` 418 KB,
  `picture_of_me.jpeg` 269 KB, `/blog/digital-fairness/youth-policy-dialogue.png` 871 KB.
  Convert to WebP/AVIF sized to display width (~620px) and add `loading="lazy"` to
  below-fold `<img>` (Slideshow and `pcard__img` in ProjectCard.tsx). Hero
  `hands-dither.png` is 48 KB, already fine.
- [ ] **A4 (MEDIUM) Render-blocking Google Fonts for an unused font.**
  `public/index.html` lines ~190-192 load JetBrains Mono from fonts.googleapis.com
  (~774ms blocking); grep finds zero references in `src/`. Type system is Geist-led,
  self-hosted woff2. Delete the `<link>` and its preconnects. (main.css blocks ~450ms;
  inlining critical CSS is optional polish later.)
- [ ] **A5 (LOW) PostHog extras (~99 KB: session recorder, surveys, dead-clicks) load at startup.**
  Fine to keep; disable session recording on the marketing site if unused. `/brand/*`
  and `/blog/*` public assets ship `max-age=0, must-revalidate` (Vercel default);
  hashed `/static/*` is already immutable.

---

## B. Accessibility and UX (web-design-guidelines audit)

Fix priority order given by the agent: B1, B2, B5, B6, B4, B3, then B9/B10.

### Real accessibility barriers

- [ ] **B1 Hamburger menu is a `<div onClick>`** with no keyboard support, `aria-label`,
  `aria-expanded`, or `aria-controls`. `src/components/header/header.tsx:51`,
  `src/components/header/header.scss:130`. Primary mobile nav control, unreachable by
  keyboard and invisible to screen readers. Make it
  `<button type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>`.
- [ ] **B2 Closed mobile nav stays in tab order.** Hidden by `right: -100%` only
  (`src/components/header/header.scss:64-79`), so on mobile a keyboard user tabs through
  8+ off-screen links. Add `visibility: hidden` when closed
  (`transition: right .3s, visibility 0s .3s`) or toggle `inert`. Also: Escape does not
  close the open menu.
- [ ] **B3 Case-study modal never moves focus in and has no focus trap.**
  `src/components/portfolio/ProjectCard.tsx:203-267`: Esc and restore-focus-on-close are
  handled (good), but on open focus stays on the trigger behind the overlay and Tab
  walks the background page while body scroll is locked. Focus the close button/panel on
  open and trap Tab inside `.case-modal__panel`, or set `inert` on the app root while
  open. Always-mounted `visibility:hidden` closed state
  (`PortfolioPage.scss:573-588`) is fine for tab order.
- [ ] **B4 `document.documentElement.lang` never updates on locale switch.**
  `public/index.html:2` hardcodes `lang="en"`; the SK/CZ switcher
  (`src/components/header/LanguageSwitcher.tsx`) changes content but not document
  language, so screen readers read Slovak with English pronunciation. Set
  `document.documentElement.lang = locale` in `src/i18n/LocaleContext.tsx`.
- [ ] **B5 No skip link and no `<main>` landmark.** Grep found neither; `Shell` in
  `src/App.tsx:99-106` renders `<Header/>{children}<Footer/>` with children in bare divs.
  Wrap `{children}` in `<main>` and add a "Skip to content" link as the first focusable
  element.
- [ ] **B6 `outline: none` on `:focus` without adequate replacement**, near-zero visible
  focus styles site-wide. `src/components/about/about.scss:305` kills the outline and
  only shifts border color (uses `:focus`, not `:focus-visible`). Only three
  `:focus-visible` rules exist (`src/styles/light.scss:261`,
  `src/components/resume/resume.scss:219`, `PortfolioPage.scss:497`); every CTA, nav
  link, lang-switcher button, slideshow dot, modal close button relies on the UA ring,
  easy to lose on navy. Add global
  `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` in
  `src/index.css`.
- [ ] **B7 GitHub contribution graph tooltip is mouse-only.**
  `src/components/now/NowPage.tsx:417-423`: day cells respond to
  `onMouseEnter/Move/Leave` only; no keyboard or touch access. Mitigated by
  `role="img"` + aria-label on the graph (line 411). If kept decorative, add
  `aria-hidden` to the cells; otherwise give cells `tabIndex` + `onFocus`.
- [ ] **B8 Case-study body injected via `dangerouslySetInnerHTML`**
  (`src/components/portfolio/ProjectCard.tsx:258`). First-party content, not an XSS
  emergency, but links inside cannot be audited for `rel`/target and it bypasses i18n
  escaping. Keep in mind, low priority.

### UX correctness

- [ ] **B9 Slideshow auto-advances forever with no pause** and ignores
  `prefers-reduced-motion` (`src/components/portfolio/ProjectCard.tsx:37-40`). Pause on
  hover/focus, skip the interval under reduced motion. Dot buttons likely below 24px
  minimum hit target.
- [ ] **B10 Hidden modal videos autoplay permanently.** `ProjectMedia` rendered twice per
  project (card + always-mounted modal, `ProjectCard.tsx:247-249`); the `useEffect` at
  lines 140-146 force-plays both, so every project video decodes twice for the page
  lifetime. Only render/play the modal copy while `open`, keeping SEO text sections
  mounted. (Same root cause as A1.)
- [ ] **B11 Header `goToSection` retry race** (`src/components/header/header.tsx:22-44`):
  `scrollToSection` runs before `navigate('/')` commits; works via the retry loop, but
  `location.hash` is never set so section state is not URL-reflected. Low priority.
- [ ] **B12 `transition: all`** at `src/components/header/header.scss:154`,
  `src/components/footer/footer.scss:86`, `src/components/about/about.scss:70`. Replace
  with explicit properties (color, background, border-color).
- [ ] **B13 Images without intrinsic `width`/`height`**: `about.tsx:37,45`, `NowPage.tsx`
  covers/thumbnails, `ProjectCard.tsx:45,169`. Layout-shift risk on slow networks;
  now-page skeletons mitigate there, the about highlight image does not. Add dimensions
  or `aspect-ratio` in CSS.
- [ ] **B14 `/styleguide` renders two `<h1>`** in the specimen (`StyleguidePage.tsx`
  STEPS: `t-display` and `t-h1` both use `tag: 'h1'`). Make specimen tags
  semantic-neutral (`p`/`div` with classes) since it is a visual QA page.
  (Also flagged by the SEO audit.)

### Nice-to-haves

- [ ] **B15 Global P/E hotkeys** (`src/components/hero/hero.tsx:367-377`): also bail when
  `(e.target as HTMLElement).isContentEditable` and when the key repeats. KeyChips
  correctly hidden on touch.
- [ ] **B16 Contrast on faint mono microcopy:** `--text-faint #7484a0` at 55% opacity for
  ruler labels (`hero.tsx:176-184`) is below AA, acceptable only because `aria-hidden`.
  Verify `.now-media__auto` and `SectionMarker` labels (`#7484a0` at ~0.7rem is ~3.7:1
  on white, below AA for small text) since those carry real information.
- [ ] **B17 Ellipsis/typography:** spot-check i18n dicts for `...` vs `…`. `tabular-nums`
  would help now-page stats (`now-stat__value`) and the GitHub count.

Confirmed already-good (no action): reduced-motion handling in hero sheen and 20+
files, language switcher (`aria-pressed`, `role="group"`), icon-only social links with
`aria-label`, `theme-color` handling, theme toggle hides while pinned.

---

## C. SEO (SEO audit)

GSC/Bing data was NOT reachable this session, so no ranking numbers. Foundation is
strong: Puppeteer prerenders 10 routes, per-page canonicals strip `?lang=`/`?mode=`,
Person/WebSite JSON-LD graph, llms.txt, robots.txt (AI crawlers allowed), sitemap and
rss present and current, GSC property verified.

- [ ] **C1 (HIGH, small fix) Duplicate meta tags on every inner page.**
  Static OG/description tags in `public/index.html` (lines ~24-48) are never removed by
  helmet, so prerendered inner pages ship two `og:title`, two `description`, two
  `og:url`, two `og:image`. Verified live: /services has the homepage `og:title` FIRST,
  then the correct one. Most social scrapers take the first tag, so sharing /services or
  a blog post shows the homepage card, and Google gets conflicting descriptions. Delete
  the static description/OG/Twitter block from index.html and let Home's `<Seo>` own the
  homepage tags (prerender bakes them in, nothing lost for crawlers).
  NOTE: overlaps A4 (same `<head>` block also holds the dead JetBrains font).
- [ ] **C2 Soft 404s.** `vercel.json` rewrite sends every unknown path to index.html with
  HTTP 200, serving the homepage prerender with `canonical: /`. Add a catch-all
  `<Route path="*">` rendering a NotFound page with `<Seo noindex>`; ideally prerender a
  /404 route with `meta robots noindex`.
- [ ] **C3 `/styleguide` is prerendered, indexable, and absent from the sitemap.**
  Internal QA page. Add `noindex` to its `<Seo>` in
  `src/components/styleguide/StyleguidePage.tsx` (precedent: /share-preview robots.txt
  disallow).
- [ ] **C4 `/services/ai-employee` serves the homepage static HTML** (canonical "/", no
  noindex) until JS runs. Client-side `noindex` works once rendered; if you want it
  unlisted-but-safe, prerender it with noindex baked in or add to robots.txt like
  /share-preview.
- [ ] **C5 Slovak content is invisible to search.** i18n is `?lang=sk` on the same URLs,
  canonicals strip the param, only English is prerendered. Clean (no dup-content risk)
  but zero Slovak search presence. Correct fix is path-based locales (`/sk/...`) with
  hreflang pairs, a real project not a tweak. DECISION NEEDED: only do if SK/CZ services
  traffic matters. Default: leave as-is.
- [ ] **C6 (MINOR) www redirect returns 307 (temporary) not 308/301;**
  `eduard-hvizdak.vercel.app` serves 200 duplicates (canonicals mitigate); homepage has
  3 `<h1>` (noscript h1 + hero h1 + section-title h1s, downgrade section titles to h2);
  sitemap main pages lack `lastmod`.

### Content / GEO opportunities (need GSC data to prioritize)

- [ ] **C7 Wikidata Q-item / knowledge panel** for the "Eduard Hvizdak" name query and AI
  identity. TODO already flagged in `public/index.html` line ~55. Highest-leverage single
  action for name-query ownership; `knowledge-panel-playbook` skill is built for it.
  NEEDS USER TIME.
- [ ] **C8 Answer-shaped blog posts**: "How I run RAG in production at InzerPro",
  "On-premise deployment: what it actually takes", "Bootstrapping a two-sided marketplace
  in CZ/SK". Each doubles as a citable AI source and links to product sites. NEEDS GSC +
  USER.
- [ ] **C9 Per-project case-study pages** (own URL, Article/SoftwareApplication schema)
  instead of only homepage cards; earn long-tail queries. NEEDS GSC + USER.
- [ ] **C10 /services FAQ + local intent** ("AI consulting Brno", "AI automation Czech
  Republic"): add an FAQPage section for snippets and AI citations. NEEDS GSC + USER.

**Blocked on user:** open GSC for the eduardhvizdak.com property (verified) and export
the query report, or reconnect the gsc MCP, to prioritize C7-C10.
