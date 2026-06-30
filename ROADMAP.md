# Portfolio Roadmap & Ideas — eduard-hvizdak.vercel.app

Living TODO for improving the personal site. Checkboxes = not done yet. Created 2026-06-27.
See `CLAUDE.md` for build/deploy conventions.

## Positioning (the one idea behind everything)
Eduard is a rare combo: a **2026 grad who is also a shipping founder with paying customers**
(InzerPro, NasadClaw, KouzelníkNaAkci) plus hackathons + real AI engineering (RAG, multi-agent).
Most student portfolios are project galleries. This site should read as a **founder-engineer who
builds real businesses**. That framing drives the priorities below.

---

## Current state (audit, 2026-06-27)
- **Stack:** Create React App + TypeScript + SCSS, `HashRouter` (URLs look like `/#/blog`), Vercel hosting.
- **Pages:** `/` (hero, social links, projects, about, embedded CV PDF), `/portfolio` (rich project cards), `/blog`, `/blog/:slug`.
- **Blog:** single collection with a per-post `category` field. One post so far (Newsmatics Hackathon).
- **Social links:** GitHub, LinkedIn, email only.
- **Gaps confirmed:** ❌ no analytics, ❌ no OG/Twitter meta, ❌ no JSON-LD, ❌ no sitemap/robots/RSS,
  ❌ no light mode, ❌ no contact CTA beyond a mailto, ❌ no `/now` or `/uses`, ❌ no custom domain
  (on a `vercel.app` subdomain — undersells a founder), ❌ no traction/metrics section.

### Decision: Articles vs Blog → **keep ONE blog, use categories**
Do **not** split a separate `/articles` page. One person, limited writing volume → two half-empty
sections read as abandoned. Canonical senior-dev pattern: **one source of truth on your own domain**,
then syndicate full copies to dev.to/Medium/Hashnode with `rel=canonical` back here (dev.to can
auto-set canonical on RSS import). "Articles" vs "notes" = a **category filter**, not a page. If
long-form ever justifies it, surface a filtered view (`/blog?category=engineering`) labeled "Writing"
in the nav — still one collection, one RSS feed.

### Decision: Analytics → **yes, add it (we currently track nothing)**
We are not tracking visits at all. Add **Vercel Analytics** (privacy-friendly, 2-line install) +/or
**PostHog** (Eduard already uses PostHog for InzerPro — reuse the muscle memory for funnels/heatmaps).
This is Sprint 1.

---

## Sprint 1 — Foundations (DONE 2026-06-28, pending 2 inputs + deploy verify)
- [x] **Clean URLs** — `HashRouter` → `BrowserRouter` + `vercel.json` SPA rewrite (excludes `/api`). Fixed 2 hardcoded `#/portfolio` links in `blog.ts`.
- [x] **Analytics: PostHog** — `posthog-js` in `src/index.tsx`, env-gated (`REACT_APP_POSTHOG_KEY`), manual `$pageview` on route change (`src/App.tsx`). ⏳ **needs the project key set in Vercel env** to start collecting (EU host default).
- [x] **OG + Twitter meta** — static homepage card in `public/index.html` + branded `public/og-image.png` (1200×630) + per-page via `react-helmet-async` (`src/seo/Seo.tsx`, used on every page).
- [x] **JSON-LD `Person`** in `index.html` (stable `@id` `…/#person`) + **`BlogPosting`** per post (`BlogPostPage.tsx`, author refs the Person @id).
- [x] **sitemap.xml + robots.txt + RSS** (`public/sitemap.xml`, `public/rss.xml`, robots Sitemap line). Hand-maintained — **update both when adding a blog post.**
- [x] **Canonical tags** — every page via `<Seo>` (base `SITE_URL` in `src/seo/Seo.tsx`).
- [x] **Contact CTA** — `src/components/contact/` "Let's work together" section (email pill + Book-15-min). ⏳ **set `REACT_APP_BOOKING_URL`** in Vercel to show the booking button (Cal.com/Calendly).
- [ ] **Custom domain** — deferred (canonical currently `eduard-hvizdak.vercel.app`; swap `SITE_URL` + index.html + sitemap/rss when bought).
- **Deferred (needs prerender/framework move):** per-**post** social-card unfurling on LinkedIn/X (helmet is client-rendered; Google sees it, social bots don't). Homepage card works for the most-shared link.

### ✅ PostHog + booking wired (2026-06-28)
PostHog now points at its **own** project — "Eduard Hvizdak Personal / Portfolio" (id 211425), key
`phc_oMcK…` (EU host) in `src/analytics.ts`. Booking link `https://cal.com/eduardhv/30min` ("Book 30
min") in `src/components/contact/contact.tsx`. Both overridable via Vercel env
(`REACT_APP_POSTHOG_KEY` / `REACT_APP_POSTHOG_HOST` / `REACT_APP_BOOKING_URL`).

### ✅ Contact consolidated (2026-06-28)
Removed the redundant standalone "Find me on" `SocialLinks` card from the home — the "Let's work
together" contact section is now the single reach-me hub (Email + Book 30 min + GitHub/LinkedIn icons).
Footer keeps its baseline social links. `social_links.tsx` left in repo (unused) in case it's wanted back.

### Polish & fixes (rolling)
- [x] **Hackathon Story link** — Newsmatics project's "Hackathon Story" link was `#/blog/newsmatics-hackathon` (dead HashRouter URL after the BrowserRouter migration). Fixed to `/blog/newsmatics-hackathon` so it links from the project (`projectsData.tsx`).
- [x] **PsycheTab Chrome Web Store link** — added next to GitHub on the PsycheTab project (`chromewebstore.google.com/detail/psychetab/pggjodgkdanopccgkgiongeddplopbao`).
- [x] **Add blog for "Zero to Done"** — DONE. Post `zero-to-done` (slug) in `blog.ts`, dated 2026-06-08, links to `zero-to-done.com`. Story: presented InzerPro at the first run of the Zero to Done startup-build hackathon, hosted by Petr Sochora + mime digital in Brno — a "get real customers, not a demo" event, high quality, lots of advice. Added to `sitemap.xml` + `rss.xml`. No photos yet (organisers said end of June) → text-only, no thumbnail; add a cover later when photos arrive.
- [ ] **Make it look good on mobile too** — full responsive pass across pages (projects, `/now`, contact, blog).
- [x] **Expandable project case studies (SEO/GEO)** — DONE. Each visible project has a keyword-rich `caseStudy` (problem / motivation / challenges / solution / story) in `projectsData.tsx`, rendered by `ProjectCard.tsx` inside a "Read the full story" expander. The body is **always in the DOM** (collapsed via CSS `grid-template-rows: 0fr→1fr`, not conditionally rendered) so crawlers/LLMs get the full narrative + tech keywords whether or not a human expands it. Appears on both `/` and `/portfolio` (shared card).
- [x] **Official Goodreads/Letterboxd brand marks on `/now`** — DONE. Replaced the indigo monochrome icons with the real logos in official colours: Goodreads brown "g" on a cream badge, Letterboxd's three official dots (orange #FF8000 / green #00E054 / blue #40BCF4) on a dark badge (`.brandmark` in `now.scss`). Per Eduard, **removed the links to his Letterboxd/Goodreads profiles** — the "Auto-synced from …" labels are now plain text.

## Sprint 2 — Founder credibility & depth
- [ ] **Products / "What I'm building" section** above projects: InzerPro, NasadClaw, KouzelníkNaAkci — one-line value prop + status (live, paying customers) + your role (founder, solo eng).
- [ ] **Selective traction metrics** (honest, current): paying customers, listings auto-posted, live-since date, uptime. Show traction *signals*, not necessarily exact MRR.
- [ ] **1–2 case-study deep-dives** (problem → constraints → what you built → architecture diagram → **outcome with numbers**). This is what reads as senior vs junior.
- [ ] **Dark/light toggle** (extract SCSS to CSS variables; persist choice). Baseline expectation in 2026.
- [ ] **Expand project context** — for each flagship, state what *you* did (honest attribution on team/hackathon work).

## Sprint 3 — Personality & craft
- [ ] **`/now` page** (see nownownow.com) — "what I'm focused on right now." Perfect for a founder juggling 3 products + thesis. List on nownownow.com for a backlink.
- [ ] **`/uses` page** (uses.tech) — hardware, editor, AI/RAG stack, deploy tools. Recruiters & devs want your stack; long-tail SEO. List on uses.tech.
- [ ] **Personal tracker widgets** (the "what I'm tracking" idea) — see dedicated section below.
- [ ] **Command palette (Cmd-K)** via `kbar`/`cmdk` — pure signal-of-craft.
- [ ] **Per-post OG images** auto-generated with `@vercel/og`.

## Later / only-if-sustained
- [ ] Newsletter (Buttondown/Resend) — only if you'll actually send.
- [ ] Testimonials — 2–4 real quotes from paying customers/teammates (real only).
- [ ] Guestbook (on-brand for indie hackers).
- [ ] Speaking/talks, press/"as seen in" — only if real, don't pad.

---

## 📥 Backlog synced from `goals.md` (2026-06-30)
Pulled the **portfolio-relevant, not-yet-done** items out of the Obsidian
`Dashboard - Project/goals.md` + `To-Do General.md` so they live in one place. (Items already
shipped in goals.md — hackathon-story link, Zero-to-Done blog, PsycheTab store link, real
Goodreads/Letterboxd marks, books→media swap, "what's running" showcase — are intentionally omitted.)

### ⭐ Personal **tech / gear page** (the main new ask)
- [ ] **Build a "Gear" / personal-tech page** — the kit Eduard actually loves: **Kindle**, **Xteink
  e-ink reader**, **AR / "reality" glasses**, **Pavlok** electric-shock wristband, etc. This is the
  planned **`/uses` page** (uses.tech) realised in Eduard's own voice — not a dry spec list but
  "tech I'm into & why," one short blurb per device. Doubles as personality signal **and**
  long-tail SEO. List on uses.tech for a backlink once live. (Replaces the abstract Sprint-3 `/uses`
  bullet + goals.md "add a tech page / tech blog post" line.)
  - Decide: dedicated `/uses` (or `/gear`) page vs a tagged blog post. Recommend a **page** (evergreen,
    linkable in nav) and optionally a deeper blog post per gadget later.

### Content & copy
- [ ] **Rewrite/shorten the hero bio next to the photo** — quiz Eduard on personal-vs-professional
  tone; it should lead with **founder-with-paying-customers + real CS/AI dev skills** (InzerPro,
  hackathons, DIY/hackerspaces), be eye-catching and high-signal, not a wall of text. (goals.md)
- [ ] **Whole-site balance audit** — "too much or too little?" Lean the *first impression*
  professional/career; keep personal stuff (reading/watching/gear/now) on dedicated pages so it
  enriches without diluting. Spotify already cut; Goodreads/Letterboxd kept. (goals.md)
- [ ] **Record real videos / demos for the portfolio projects** — short screen-capture or talking-head
  demos per flagship product. Highest-effort, highest-credibility. (goals.md)

### Structure & polish
- [ ] **Project "story" → dedicated case-study page** instead of the inline text expander — but keep
  the narrative **crawlable/indexable** (real route + server-readable text, not JS-gated). (goals.md)
- [ ] **Fix project-card link & title styling** — the "Website" link, "Read the full story" link, and
  project **title colours** currently read sloppy/low-quality. Make links obvious Lucide-arrow pills;
  fix title contrast/weight. (goals.md — recurring complaint)
- [ ] **Full mobile responsive pass** (also already in Sprint-1 polish) — re-verify projects, `/now`,
  contact, blog, and the new gear page on phone widths. (goals.md)
- [ ] **Evaluate reactbits.dev/showcase** components for tasteful motion/polish — adopt only what fits
  the restrained indigo aesthetic. (goals.md)
- [ ] **Review the @bensig personal-site idea** — https://x.com/bensig/status/2070737149666926645 —
  decide if the pattern is worth borrowing. (goals.md)

### More "elsewhere" / live embeds (extends the /now work we just shipped)
- [ ] **Add real favourite tweets to the `/now` X section** — the embed component is built but
  `FAVOURITE_TWEETS` still holds a placeholder (`jack/status/20`); paste real tweet URLs or hide the
  section until then. (loose end from this session + goals.md "embedded tweets")
- [ ] **Instagram on `/now`** — LinkedIn + YouTube are done; IG remains. ⚠️ Personal IG has **no clean
  public feed API** (needs a Business/Creator account + Graph API token, or a curated manual embed
  like LinkedIn). Likely do the **manual-embed** route. (goals.md)
- [ ] **Add MyAnimeList to the `/now` media row** — same pattern as Goodreads/Letterboxd: MAL exposes
  per-user RSS (`myanimelist.net/rss.php?type=rw&u=<user>`) → a small `api/myanimelist.js` Vercel fn
  → "Recently watched anime" card. (goals.md)

---

## 🎭 What a portfolio needs — professional credibility **and** personality (reference)
Eduard asked how to appeal to *both* career/professional viewers **and** people sizing up culture-fit /
personality. The site should serve both without compromising the founder-engineer first impression.

**A) Professional / career signal (recruiters, founders, clients — keep above the fold):**
- One-line **positioning headline** ("founder-engineer shipping real SaaS with paying customers").
- **Proof of shipped products + traction** (live products, paying customers, listings posted, uptime).
- **Case studies with outcomes/numbers**, not just screenshots; architecture depth for the AI work.
- **Tech stack / `/uses`**, CV/résumé, and a **clear contact CTA** (email + book-a-call — done).
- **Craft cues:** fast load, clean URLs, mobile-perfect, OG/SEO, GitHub graph, LinkedIn — done/ongoing.

**B) Personality / culture-fit (people getting to know *you* — let it live on dedicated pages):**
- **`/now`** (current focus) + **gear/`/uses`** page — already core to the plan.
- **What you read/watch** (Goodreads/Letterboxd — done), and **MyAnimeList** (planned).
- **Writing with a real voice** (the blog — keep the humanized tone), incl. a personal/origin story.
- **Interests & DIY** — hackerspaces, hardware tinkering, the Pavlok/quantified-self angle.
- **A touch of whimsy** + **favourite tweets**, photos, location/timezone ("Brno, CET").

**Balance rule:** lead professional on `/` (positioning, products, traction, contact); route personality
to `/now`, `/uses`/gear, and the blog — so it *adds* dimension instead of muddying the pitch.

---

## 🎯 Personal tracker widgets — "what I'm currently into / tracking"
The idea Eduard liked: personal sites that show live "trackers" (Spotify, coding time, screen time…)
to show personality. Research done 2026-06-27. **Frame all of these inside a `/now` page.**
Stack note: CRA + Vercel = we get `/api/*` serverless functions + Vercel Cron for the OAuth/secret ones.

**DECISIONS (2026-06-27, Eduard):** ❌ NO Discord/Lanyard, ❌ NO Spotify, ❌ NO chess.
✅ Letterboxd + Goodreads (Eduard will clean his Goodreads "read" shelf first).
⭐ **Primary source = Eduard's own local `dashboard` project** (see below) — far more unique & authentic than WakaTime.

**⚠️ WakaTime caveat — does it track Claude Code terminal time? Basically NO.** WakaTime tracks via
**editor plugins** that emit "heartbeats" on activity *inside a supported editor* (typing/saving in
VS Code, Cursor, JetBrains…). It does **not** track terminal usage, and when **Claude Code edits files
on disk from the terminal**, no editor heartbeat fires → that work is **not counted**. There are hacky
shell/terminal trackers but they're unreliable. Since Eduard codes heavily via Claude Code, WakaTime
would **undercount badly** → **skip it in favour of the dashboard** (which sees real screen/focus time).

**Eduard OK'd all 4 dashboard metrics public:** focus hours/week, pomodoros + streak, screen time/week, "caught slacking" (zaps). Income stays private.

**Chosen tracker shortlist:**
1. [x] **`/now` page + "Coding & focus" pipeline BUILT** (preview-only at `/#/now`, not in nav yet):
   - Site: `src/components/now/NowPage.tsx` reads `public/now-data.json` (5 stat cards + hand-written "now" intro, graceful "—" empty state).
   - Generator: `~/Desktop/Projects/dashboard/scripts/now-summary.ts` (`bun scripts/now-summary.ts`) reads `~/.dashboard/dashboard.db`, writes the sanitized JSON straight into the portfolio's `public/now-data.json`. Zaps are derived from `activity_logs` distraction rows (no zap table exists).
   - ⚠️ **BLOCKER — dashboard is dormant:** DB has only ~34 activity logs (May 31) + 2 focus sessions (May 17, 0 completed pomodoros). Stats render empty until the **vision monitor runs regularly** and pomodoros actually get logged. TODO: [ ] run the dashboard collector, [ ] re-run generator, [ ] commit/push to publish, [ ] then add `/now` to the header nav.
2. [x] **Letterboxd** (films) — DONE. `api/letterboxd.js` (Vercel fn) parses `letterboxd.com/Rauded/rss/` → "Recently watched" poster grid on `/now`.
3. [x] **Goodreads** (currently-reading) — DONE. `api/goodreads.js` parses the **currently-reading** shelf (user `126181458`) → "Reading now" cover grid. The "read" shelf is intentionally NOT used (awkward books) — safe to leave as-is.

**`/now` is now LIVE in the nav** (Home · About · Projects · Resume · Blog · **Now**). It shows
Reading now + Recently watched (real data via the two Vercel functions). The focus-stats block is
**hidden until the dashboard syncs** real numbers (see blocker above), so the page reads complete
today and the stats appear automatically once data flows.

**2026-06-28 update:** Removed the hand-written 3-paragraph intro (degree/products/Pavlok dashboard
blurb) at Eduard's request. Each media section now carries its **brand icon** (`SiGoodreads` /
`SiLetterboxd` from `react-icons/si`) + an **"Auto-synced from Goodreads/Letterboxd"** link
(`.now-media__head` + `.now-media__auto`) so visitors know the lists update themselves (the two Vercel
fns re-parse the RSS feeds live on every request — zero manual upkeep).

**Ideas to expand `/now` later (researched — pick what's authentic):**
- [ ] **Short "currently" intro, rewritten** — a 1–2 line honest status (not the removed blurb) if the
  page feels thin once focus-stats are still hidden. Keep it short.
- [ ] **Focus / coding stats** (the blocked dashboard pipeline above) — the highest-signal addition;
  needs the vision monitor running regularly. Hidden gracefully until then.
- [ ] **GitHub activity** — public, CORS-friendly contribution/streak image card or a "recently pushed"
  repos list (pure client-side, no key). Good founder signal.
- [ ] **Now playing / recent tracks** — only if Eduard wants music; needs Spotify OAuth refresh token
  (he previously said *no Spotify*, so likely skip).
- [ ] **Latest blog post** auto-pulled onto `/now` (already have `blog.ts` + `rss.xml`).
- [ ] **"Currently building"** mini-card per active product (InzerPro / NasadClaw / KouzelníkNaAkci)
  with a one-line live status — overlaps with the Sprint-2 traction section.
- [ ] **Last commit / last deploy** timestamp from the dashboard or GitHub API ("shipped X ago").
- [ ] **Location / timezone** line ("Brno, CET") for the founder-juggling-things vibe.

### The `dashboard` → site data bridge (how to surface local data publicly)
The dashboard is a local Bun backend (`~/Desktop/Projects/dashboard/backend`, `localhost:3001`, SQLite)
with endpoints incl. `/api/screen-time/weekly`, `/api/focus`, `/api/habits`, `/api/vision/stats`,
`/api/income/*` (Stripe+Fio — **PRIVATE, do not publish**). To show selected aggregates on the Vercel site:
- [ ] **Decide what's public** (e.g. focus hours/week, productivity score, pomodoros, habit streak, zap count). **Income stays private.**
- [ ] Add a small job in the dashboard (or a Vercel cron) that **pushes a sanitized summary JSON** to a public place the site can read (GitHub Gist / repo JSON / Vercel KV / Edge Config).
- [ ] Build the `/now` "Coding & focus" card to fetch that summary.

**Implementation rule of thumb:**
- Public/CORS-friendly (Lanyard, chess.com, Lichess, WakaTime-embed, GitHub image cards) → **pure client-side React**.
- Secret key / refresh token (Spotify, Strava, Steam, Oura, RescueTime, Last.fm-hidden) → **`/api/<name>.ts` serverless fn + Vercel env var**; OAuth ones (Spotify, Strava, Whoop) also need a one-time refresh-token mint.
- Vercel Cron optional — only to cache RSS/feeds.

**Self-tracked data (harder, do later):**
- [ ] Decide which of these Eduard *personally tracks already* on PC/phone and wants to surface.
- WakaTime needs the editor plugin running; RescueTime needs its desktop agent; Oura/Whoop need the worn device; **Apple Health / iOS Screen Time have NO public API** (custom on-device Shortcuts/Health-Auto-Export pipeline → our own endpoint; high effort, brittle); **StoryGraph has no API/RSS** (manual only).
- [ ] **RESEARCH/GATHER:** what is Eduard already tracking anywhere (PC, phone, wearables, apps) that we could expose? → fills the `/now` widgets with authentic data.

---

## 🔗 Links to other sites of mine (TODO + gather)
Expand the social/links footer beyond GitHub/LinkedIn/email into a richer "elsewhere" section.
- [ ] **GATHER full list of Eduard's URLs/handles** and decide which to show. Known so far:
  - InzerPro — https://www.inzerpro.cz
  - NasadClaw — https://www.nasadclaw.cz
  - KouzelníkNaAkci — https://www.kouzelniknaakci.cz
  - GitHub — https://github.com/Rauded
  - LinkedIn — https://www.linkedin.com/in/eduard-hvizdak
- [ ] **OPEN QUESTIONS for Eduard:** X/Twitter handle? dev.to/Medium/Hashnode? YouTube? Instagram? Personal email vs business? StudyExe / MindType / PsycheTab / other side projects to link? Any community profiles (Indie Hackers, Product Hunt)?
- [ ] Build an "Elsewhere / Find me on" component (icons + labels) once the list is confirmed.

---

## ✨ Unique-to-Eduard differentiators (things others can't copy)
- **Real paying-customer SaaS** front-and-center (almost no grad has this) — the strongest moat.
- **AI architecture diagrams** of his actual RAG / multi-agent pipelines (depth, not logos).
- **Build-in-public narrative** — lessons from pricing/churn/hard technical problems on real products.
- **Operational maturity** — runs production with Stripe/Supabase/PostHog/Sentry; say so.
- **Bilingual CZ/SK market context** — products serve a specific real market, not a generic demo.

---

## Reference sites to borrow patterns from
leerob.com (structure, /stack, one-blog) · brittanychiang.com (restrained design, project context) ·
joshwcomeau.com (writing-as-portfolio, whimsy) · cassidoo.co (human + professional) ·
levels.io & marclou.com (founder/build-in-public, product-first — closest analogs).

---

## Open questions to confirm before building
1. Which Sprint 1 items first? (Recommend: analytics + OG/meta + contact CTA as the opening batch.)
2. Custom domain — buy one? which?
3. Which tracker widgets do you want, and what do you already track? (Drives `/now`.)
4. Full list of your other sites/handles for the "Elsewhere" section.
5. Appetite for a CRA → Next.js/Vite-SSG migration (makes SEO/OG/RSS clean), or patch CRA with helmet+prerender?
