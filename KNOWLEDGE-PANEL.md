# Google Knowledge Panel — playbook for Eduard Hvižďák

Goal: get Google to show a **Knowledge Panel** (the info box on the right of search
results) when someone searches **"Eduard Hvižďák"**, and become the canonical, citable
source about you for AI engines (ChatGPT / Perplexity / Claude).

Method adapted from Ben Sigman's writeup (benobi.one/panel). His single highest-impact
step was the **Wikimedia Commons headshot + Wikidata P18** — until that was set, no panel.

> **Reality check (read this first).** Google only instantiates a panel for entities it
> considers *notable*. Ben had published books + Forbes coverage. You have shipped products
> and hackathon wins but likely little independent press yet. Everything below maximizes your
> odds and is worth doing anyway (it wins name-search + AI citations regardless), but the
> panel itself is **not guaranteed** and may need 1–2 pieces of independent coverage that
> name you (see §6). Plan ~5–10 weeks of waiting after all signals are in.

---

## ✅ Already done in code (shipped on the site)

These are live in the repo — you don't need to touch them:

- **JSON-LD `@graph`** in `public/index.html`: one `Person` (@id `#person`) linked by `@id`
  to a `WebSite` and to each product (`InzerPro`, `NasadClaw`, `KouzelníkNaAkci`, `StudyExe`,
  `PsycheTab`) as `SoftwareApplication`/`WebApplication`. Includes `homeLocation` Brno,
  `alumniOf` Masaryk, `knowsAbout`, `image` (headshot), and `sameAs` → GitHub / LinkedIn / X.
- **Headshot at a stable URL**: `https://eduard-hvizdak.vercel.app/eduard-hvizdak.jpg`.
- **`og:site_name` + `<title>` = your name**; `twitter:site`/`twitter:creator` = `@EduardHvizdak`.
- **`<noscript>` bio fallback** so non-JS AI crawlers read a real bio + links.
- **`llms.txt`** at site root (the "AI agents" file) with your bio, products, and links.
- **`robots.txt`** explicitly allowing AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).

**One code TODO remains, and only after you create Wikidata (Step 2):** paste your Wikidata
Q-URL into the Person `sameAs` array in `public/index.html` (there's a `TODO` comment marking
the spot). That bidirectional bridge (site → Wikidata AND Wikidata → site) is the key link.

---

## 1. Lock your canonical identity (do this first — consistency is the whole game)

Google cross-references your profiles to confirm you're one entity. Pick ONE version of each
fact and make every profile say **exactly** the same thing. Use this block verbatim:

- **Name:** Eduard Hvižďák
- **Handle:** EduardHvizdak (X), Rauded (GitHub)
- **Title:** AI Engineer & Founder
- **Location:** Brno, Czech Republic
- **Short bio (X / about fields):**
  AI engineer & founder in Brno. Building production AI systems (RAG, multi-agent) and SaaS — InzerPro, NasadClaw, KouzelníkNaAkci. CS @ Masaryk University.
- **Long bio (LinkedIn About / site):**
  Eduard Hvižďák is an AI engineer and indie founder based in Brno, Czech Republic. He builds production AI systems — retrieval-augmented generation (RAG), multi-agent pipelines, and large-scale document analysis — and runs SaaS products including InzerPro, NasadClaw, and KouzelníkNaAkci. He is a Computer Science student at Masaryk University.

**Update these to match (same name, title, location, bio everywhere):**
- [ ] LinkedIn — headline = "AI Engineer & Founder", location = Brno, About = long bio
- [ ] X/Twitter `@EduardHvizdak` — name "Eduard Hvižďák", location Brno, bio = short bio, website link → your site
- [ ] GitHub `Rauded` — name, bio, location Brno, website link → your site
- [ ] about.me (create one) — same name/title/location
- [ ] (optional) Crunchbase person page for InzerPro/NasadClaw founder

---

## 2. Create your Wikidata item (the entity Google reads)

> ⚠️ **Golden rule: every statement needs a `reference URL (P854)`.** Unreferenced biographical
> items get nominated for deletion within days. No reference → don't add the statement yet.

**Warm up the account first:** new Wikidata accounts are spam-filtered. Make 5–10 small edits to
*existing* items (fix a missing ISBN, add a label) before creating your own item.

**Create:** https://www.wikidata.org/wiki/Special:NewItem
- Label: `Eduard Hvižďák`
- Description: `Czech-based software engineer and founder` (keep it plain — no "leading/best")
- Aliases: `Eduard Hvizdak`, `EduardHvizdak`, `Rauded`

**Statements to add (each needs a P854 reference — see the source column):**

| Property | Value | Reference URL (P854) |
|---|---|---|
| instance of (P31) | human (Q5) | your /about or any profile |
| occupation (P106) | software engineer (Q82594) | your site / LinkedIn |
| occupation (P106) | entrepreneur (Q131524) | your site / a company page |
| educated at (P69) | Masaryk University (Q909066) | muni.cz or LinkedIn education |
| residence (P551) | Brno (Q14960) | your site / X location |
| official website (P856) | https://eduard-hvizdak.vercel.app | (the site itself) |
| X username (P2002) | EduardHvizdak | https://x.com/EduardHvizdak |
| GitHub username (P2037) | Rauded | https://github.com/Rauded |
| LinkedIn profile ID (P6634) | eduard-hvizdak | your LinkedIn URL |
| notable work (P800) | → InzerPro item (create it) | inzerpro.cz / press |
| notable work (P800) | → NasadClaw item (create it) | nasadclaw.cz |

Add **retrieved (P813) = today** alongside each P854 (the UI prompts you).

**For each notable work**, create a small Wikidata item first (Label = product name,
Description = e.g. "classifieds automation SaaS", instance of (P31) → software (Q7397) or
web service, official website (P856) → product URL, referenced), then link it from your
person item via P800.

**Then close the loop (the code TODO):** copy your new `https://www.wikidata.org/wiki/Q……`
URL into the Person `sameAs` array in `public/index.html`, commit, push.

---

## 3. Wikimedia Commons headshot + P18 (Ben's #1 lever)

1. Go to https://commons.wikimedia.org/wiki/Special:UploadWizard
2. Upload your headshot. Select **"This is entirely my own work"** → license **CC-BY-SA 4.0**.
   (You can reuse `public/eduard-hvizdak.jpg` from this repo, or a higher-res original.)
3. Descriptive filename: `Eduard Hvizdak 2026.jpg`.
4. Back on your Wikidata item: add property **image (P18)** → paste that filename.

Google often pulls the panel photo straight from P18. Ben's panel appeared ~5 weeks after this.

---

## 4. Google Search Console (verify + nudge)

1. https://search.google.com/search-console → add property.
   - Easiest here: **URL-prefix** property `https://eduard-hvizdak.vercel.app/` verified via the
     HTML-tag method (paste the meta tag — tell me the value and I'll add it to `index.html`),
     or via a DNS TXT record if you control a custom domain later.
2. Submit sitemap: `https://eduard-hvizdak.vercel.app/sitemap.xml`.
3. URL Inspection → **Request Indexing** on `/`, `/portfolio`, `/blog`, `/now` — and re-run it
   every time you change the schema (especially after adding the Wikidata URL in Step 2).

---

## 5. Validate after each change

- **Schema.org validator:** https://validator.schema.org/ → paste your URL. Aim 0 errors / 0 warnings.
- **Google Rich Results Test:** https://search.google.com/test/rich-results — Person + WebSite
  are read but won't "light up" (normal); SoftwareApplication may show as eligible. Append
  `?v=2` to the URL to bust Google's cached result when retesting.
- Vercel serves fresh on each deploy (no Cloudflare/Fastly purge dance needed here).

---

## 6. If the panel doesn't appear: strengthen notability

The schema/Wikidata/Commons combo is the *mechanism*; **notability** is the *fuel*. To add it:
- Get **independent coverage that names you**: a dev.to / Medium guest post that profiles you,
  a podcast appearance, a university or hackathon writeup, a startup-directory feature, press
  about InzerPro/NasadClaw. Even 1–2 solid pieces materially raise the odds — and each becomes
  a valid Wikidata P854 reference.
- List products on directories AI engines synthesize from (Product Hunt, relevant CZ/SK startup
  lists). These also feed the entity graph.

---

## Timeline (Ben's benchmark)

- ~10 weeks from bare-schema start → panel live.
- ~5–6 weeks from "all signals in place" (Wikidata + Commons P18 + consistency) → panel live.
- **Don't tweak schema during the wait** — once a panel is live, edits can cause Google to retract it.

## What to skip (Ben's mistakes)
- LLM-drafted Wikipedia article → flagged on sight, declined (his was). Wikipedia is optional; the
  schema + Wikidata + image combo was sufficient for him.
- "Best / leading / pioneering" in your own bios → reviewers strip these; they weaken trust.
- Company Wikidata items with no independent press → deletion-bait.
