# Services page consistency: handoff

Context for a fresh session. Goal: make `/services` visually consistent with the
rest of the site so every element speaks the same design language, same colors,
same type, and nothing looks pasted in from another site.

## 1. What the site is

- Personal portfolio for Eduard Hvizdak, live at **eduardhvizdak.com**.
- Create React App + TypeScript + SCSS. Icons via `react-icons/lu` (Lucide).
  Routing via react-router-dom.
- Repo: `~/portfolio/tjklint.github.io/`, remote `Rauded/eduard-hvizdak`, branch
  `main`. Push to `main` and Vercel auto-deploys (about 1 to 2 min). Hard-refresh
  to see changes (Cmd+Shift+R).
- Build check before pushing: `CI=true npm run build` (Vercel treats warnings as
  errors; plain `npm run build` uses CI=false and will hide lint failures).
- Read `CLAUDE.md` in the repo root for the full conventions.

## 2. The design language (the source of truth)

All design tokens live in **`src/index.css`**. No component should hardcode an
accent hex; everything reads these variables. The site is **light-only** right
now (dark mode pinned off in `src/components/theme/ThemeContext.tsx`).

Light theme tokens (`:root[data-theme='light']`):

- `--page-bg: #ffffff` (pure white canvas)
- `--surface: #f6f6f6` (raised surfaces / cards)
- `--surface-sunken: #eef0f2`
- `--text: #0e1320`, `--text-strong: #0a1530`, `--text-muted: #3e4b66`,
  `--text-faint: #7484a0`
- `--border: #e6e9ec` (quiet hairline), `--border-strong`
- `--accent: #182e5f` (deep navy, the ONE accent), `--accent-strong: #0f1f44`
- `--accent-text: #182e5f`, `--accent-text-soft: #3f5ba0`,
  `--accent-heading: #0f1f44`, `--accent-soft: #eaf0f8`, `--accent-ring: #c3d2ea`
- `--status-good: #1f8f4e` (the only green, one dot), `--status-warn`, `--status-bad`
- `--shadow-card`, `--shadow-accent` (neutral, soft, NOT glows)
- `--container-px: 64px` (24px on mobile)

Fonts (also in `src/index.css`, `--font-*`):

- `--font-body` is **General Sans** (all body/UI text)
- `--font-display` is **Jeju Myeongjo** (serif, the big headings)
- `--font-mono` is **Geist Mono** (eyebrows, labels, tags, metrics, ruler ticks)
- `--font-serif-reading` is Source Serif 4 (blog prose only). Inter and RobotoMono
  are legacy fallbacks; do not reach for them in new work.

De-slop rules (Eduard's standing preferences, enforced site-wide):

- One accent only: deep navy. **No indigo/violet, no second accent color.**
- **No decorative gradients.** Buttons and surfaces are flat fills. (Functional
  things like the hero halftone are fine; a gradient used as decoration is not.)
- **No glow box-shadows, no colored/accent shadows, no blurred glow blobs.**
  Neutral depth shadows (`--shadow-card`) are fine.
- Prose rule (applies to any copy you write): no em dashes or en dashes; avoid
  AI-tell phrasing.

## 3. How the rest of the site expresses that language

Look at these for the reference feel to match on /services:

- `src/components/hero/hero.tsx`: serif Jeju headline, navy CTAs (pill buttons),
  mono eyebrow/labels, hairline "blueprint" ruler details, one green status dot.
  This is the strongest statement of the house style.
- `src/components/about/`, `projects/`, `resume/`: cards with hairline borders,
  `--surface` fills, navy accent, mono labels. Project cards use the single site
  accent.
- Section markers (`SectionMarker`) use mono numbering (01/02/03).

Pattern to keep: white / `#f6f6f6` surfaces, hairline `--border`, navy accent used
sparingly, serif for headings, mono for small labels, generous spacing.

## 4. The services page today

Route `/services`, files:

- `src/components/services/ServicesPage.tsx`
- `src/components/services/services.scss`

It is in two halves.

### 4a. The original, on-brand part (KEEP)

These sections already use the token system and match the site:

- `services-hero` (eyebrow + serif title + lead + two pill CTAs)
- `services-signal` (deep navy band, the one bold moment)
- `services-block` + `services-grid` + `services-card` (the "What I do" cards)
- `services-proof` (checklist), `services-steps` (numbered process),
  `services-cta` (closing).

Content is real and good (real projects, real outcomes). This half is the
template the rest should conform to.

### 4b. The appended experiments (the inconsistency)

Two sets of components were appended for review and are the reason the page looks
"meshed together".

**`src/components/_21test/`**: mostly fine, closer to compliant.

- `Reveal` (scroll fade-in wrapper): pure utility, no color. Keep.
- `OrbitingStack`, `ServicesShowcase`: use `var(--accent)` and services tokens
  correctly, navy-aligned. Keep, maybe minor polish.
- `AgentPipeline`: token-aligned; only watch the subtle `box-shadow` on the core.
- `TechMarquee`, `ContactGradient`: used on the **home** page (already shipped).
  `ContactGradient` has an animated band; confirm it stays within the
  no-decorative-gradient rule.

**`src/components/_bun/`**: this is the main clash. All bun.com-inspired, dark
themed, off-palette, and several carry FAKE placeholder content.

| Component | Hardcoded background | Off-palette colors | Font | Problem |
|---|---|---|---|---|
| BunErrorsWorkflow | `#0b0c10` | amber/purple/green + glow | JetBrains Mono | dark + glow + fake commits |
| BunBenchmarkBars | `#14151b` | amber gradient `#f4b942`..`#f59e0b` | JetBrains Mono | dark + gradient + fake data |
| BunCommitsHeatmap | `#0b0c10` | purple..red..yellow spectrum | mono | dark + spectrum gradient + fake |
| BunCallout | `#1a1b23` | amber `#fbbf24`, teal `#34d399` | inherited | dark + non-navy accents |
| BunAdversarialReview | `#0b0c10` | rust `#d97757`, red/green | JetBrains Mono | dark + fake bug chat |
| BunGitLogAnimation | `#0b0c10` | pink/cyan/green diff | mono | dark + gradient + fake commits |
| BunTweetMarquee | glassy white overlay | uses `--accent` | inherited | **fake tweets** (invented people) |
| BunSectionHeading | none | navy, but `drop-shadow(2px 2px)` | `--font-display` | hard drop-shadow (glow-ish) |

Every `_bun` component ignores the token system, uses dark backgrounds, and most
have placeholder/fake content (invented testimonials, fake commit counts, fake
benchmarks). On a white navy site they read as a different website spliced in.

### 4c. `services.scss` token drift (small but worth fixing)

The stylesheet defines its OWN scoped variables and hardcodes values instead of
pointing at the global tokens. In light mode it sets:

- `--card-bg: #ffffff` (site surface is `#f6f6f6`; pick one and be consistent)
- `--heading: #0b0b0f` (global is `--text-strong: #0a1530` / `--accent-heading`)
- `--text: #1f2937` (global is `--text: #0e1320`)
- Plus dead dark-mode defaults at the top that never apply (light is pinned).

Retarget these at the global tokens so /services can never drift from the rest of
the site.

## 5. Recommended plan for the new session

1. **Decide the fate of `_bun`.** Two honest options:
   - **Remove them from `/services`** (cleanest, fastest path to consistency).
     They are impressive animations but they are a different design language and
     carry fake data. Delete the imports + JSX blocks in `ServicesPage.tsx`
     (roughly lines 15 to 24 imports and the tagged sections from about line 198
     down).
   - **Or restyle them into the system** if a specific one is worth keeping:
     drop the dark background (use `--page-bg` / `--surface`), remove gradients
     and glows, swap JetBrains Mono for `var(--font-mono)`, recolor every accent
     to navy tokens, and replace ALL fake content with real numbers/testimonials.
     This is a lot of work per component; only do it for ones that earn their keep.
2. **Fix `services.scss`** to reference global tokens (section 4c) and delete the
   unused dark-mode block.
3. **Normalize the kept `_21test` sections** so their card chrome (radius, border,
   surface, shadow) matches `services-card` exactly.
4. **Verify** with `CI=true npm run build`, then screenshot/preview `/services`,
   then push to `main`.

Ask Eduard which `_bun` sections (if any) he wants to keep before deleting, since
he specifically asked to add them. He may want the animation ideas rebuilt
on-brand rather than dropped.

## 6. Preview and ship

- Local: `npm start`, open `/services`.
- Home hero has URL switches (`?hero=`, `?mode=`); services has none.
- Build gate: `CI=true npm run build`.
- Ship: commit the specific files, `git push origin main`, tell Eduard to hard-refresh.
