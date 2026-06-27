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

## Sprint 1 — Foundations (low effort, high impact)
- [ ] **Analytics:** add `@vercel/analytics` (and/or PostHog). Know when someone visits.
- [ ] **OG + Twitter meta** per page (`og:title/description/image` 1200×630, `twitter:card=summary_large_image`). Biggest "looks unprofessional" gap — links currently unfurl as naked URLs.
- [ ] **JSON-LD `Person` schema** on home (name, url, `sameAs` socials, `jobTitle`, `alumniOf` Masaryk, `knowsAbout`). Reuse a stable `@id` as author on blog posts → Google merges you into one entity.
- [ ] **`BlogPosting` JSON-LD** per post.
- [ ] **sitemap.xml + robots.txt + RSS feed** (`/rss.xml`).
- [ ] **Canonical tags** on every page (required before any cross-posting).
- [ ] **Real contact CTA** — a "Work with me / Let's talk" block + booking link (Cal.com) instead of a buried mailto. You sell B2B + run a marketplace; make the next step obvious.
- [ ] **Custom domain** — buy `eduardhvizdak.com` (or similar), point Vercel at it.
- [ ] ⚠️ **SEO caveat:** CRA + `HashRouter` is weak for crawlers/unfurlers. Either add `react-helmet-async` + prerender (`react-snap`), switch to `BrowserRouter`, or plan a Next.js/Vite-SSG migration (makes every item above clean). Track as its own decision below.

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
2. [ ] **Letterboxd** (films) — RSS (`letterboxd.com/USERNAME/rss/`) → small `/api` parser (CORS/XML). *Need Eduard's username.*
3. [ ] **Goodreads** (currently-reading / recently-read) — RSS still works → `/api` parser. *Need username + Eduard to clean the shelf first.*

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
