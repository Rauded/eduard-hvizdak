# CLAUDE.md — Eduard Hvižďák Personal Website

Guidance for Claude Code when working in this repo. Read this before making changes.

## Roadmap
Improvement ideas, gaps, and the prioritized TODO list live in **`ROADMAP.md`** (analytics, SEO/OG,
`/now` + `/uses`, personal tracker widgets, founder/traction sections, "Elsewhere" links). Check it
before proposing new features.

## What this is
Personal portfolio / website for **Eduard Hvižďák** — live at **eduardhvizdak.com** (Vercel, old
`eduard-hvizdak.vercel.app` subdomain redirects/serves the same deploy).
Forked from the `tjklint` portfolio template. Create React App (CRA) + TypeScript + SCSS.
Icons via **react-icons**. Routing via **react-router-dom**.

- Repo: `~/portfolio/tjklint.github.io/`
- Remote: `https://github.com/Rauded/eduard-hvizdak` (branch `main`)
- Hosting: **Vercel**, auto-deploys on push to `main` via Vercel's GitHub integration
  (independent of any repo workflow). Just push to `main`.
- The template's GitHub Pages deploy was removed (2026-06-27): deleted
  `.github/workflows/deploy.yml` and the `predeploy`/`deploy` (gh-pages) npm scripts. It was
  running on every push and **failing**, sending "GitHub Pages failed to deploy" emails, while
  Vercel was the real (successful) host. Do NOT re-add a Pages workflow.

## Deploy workflow (how we ship every change)
1. Make the change.
2. `CI=false npm run build` to confirm it compiles (CRA treats warnings as errors under CI).
3. `git add` the specific files, commit, `git push origin main`.
4. Vercel auto-deploys (~1–2 min). Tell Eduard to **hard-refresh (Cmd+Shift+R)** — he has
   repeatedly seen stale cached versions and thought a change "didn't deploy". When in doubt,
   verify the live bundle actually contains the change rather than assuming cache:
   `curl -s https://eduardhvizdak.com/ | grep -oE 'main\.[a-z0-9]+\.js'` then grep that
   bundle for a class name or string you added.

## Conventions & decisions (follow these)
- **Icons: use `react-icons/lu` (Lucide).** Lucide is the house icon set — clean, professional,
  industry-standard (Vercel/Linear/Supabase use it). Do NOT use text-glyph arrows like `→`/`↗`;
  they read as amateurish. Example: `import { LuArrowRight } from 'react-icons/lu'`.
- **Styling:** component-scoped SCSS files next to each component (`component/component.scss`),
  BEM-ish naming (`block__element`, `block--modifier`). Brand color is indigo/violet
  (`#6366f1`, `#818cf8`, `#a5b4fc`, `#c7d2fe`) on a near-black background. Monospace display font.
- **Resume data** lives in `src/data/resume.json` (typed by `src/components/resume/resumetypes.tsx`).
  Each experience entry can carry a `website` field → company name renders as a Lucide-arrow link
  via `src/components/resume/visualaid.tsx`. A parenthetical in a company label (e.g.
  "@EDUC Alliance (European Digital University Alliance)") is auto-split onto a second muted line
  by `splitCompany()` so long names don't wrap mid-phrase.
- **Images in `public/`:** `.gitignore` has a blanket `*.png` rule. New public PNGs are silently
  ignored and will 404 in production. Blog images are whitelisted via `!/public/blog/**/*.png`.
  If you add a public image elsewhere, add a matching `!` exception AND confirm it's tracked
  (`git ls-files <path>`). This bit us once — the Digital Fairness highlight image existed
  locally but was never committed, so it showed as broken alt-text in production.

## The "Recent Highlight" card (`src/components/about/`)
This is the Digital Fairness Act feature on the About/home view. Eduard iterated on it a lot;
the agreed final design:
- **Side-by-side layout** (`.about-highlight` is `flex-direction: row`, `align-items: center`).
  Mobile (<768px) stacks vertically.
- **Image left, fully visible.** It's an Instagram screenshot — the whole post must show,
  *including the official account header* (`michaelmcgratheu and evropska_komisija`) and caption,
  because that authenticity is the point. So: `object-fit: contain`, natural ratio, **no cropping
  aspect-ratio, no hover zoom** (zoom clipped the header). Image width `clamp(300px, 46%, 440px)`
  to stay large but responsive.
- **Minimal dead space.** Card capped at `max-width: 840px`, centered; text padding kept tight;
  text vertically centered next to the image.
- **Copy is short and professional.** Title states the invitation by the European Commission to
  discuss the Digital Fairness Act; one supporting line names Commissioner Michael McGrath and the
  Youth Policy Dialogue initiative. Do not pad it back out with extra detail.
- **CTA is a prominent button, not a flat link.** `.about-highlight__cta` is a filled gradient
  indigo pill, bold white text, Lucide `LuArrowRight` that slides on hover, lift + glow. A muted
  text link "scrolls past"; the button must obviously read as the click target.

## How Eduard works (preferences)
- Wants things to **pop / be eye-catching / look professional** — lean bold and confident, not
  timid. When he says something "doesn't pop", make it a real visual element (button, larger,
  contrast), not a subtle tweak.
- He reviews via screenshots and gives directional feedback ("too big", "more obvious",
  "vertical not horizontal"). Make the change, ship it, and tell him to hard-refresh.
- Always **commit + push + deploy** as part of "doing the change" — he expects to view it live.

## Copy style: jamny-style (added 2026-07-12)
Eduard wants all site copy modeled on jakubjamny.com: minimal text, numbers instead of
adjectives, production proof, nothing AI-sounding. Before writing or rewriting ANY copy
in this repo, use the `jamny-style` skill (`~/.claude/skills/jamny-style/`) and see the
extraction pack + adaptation plan at `~/Desktop/Projects/jakubjamny-inspiration/`
(start with `analysis/adaptation-plan.md`). Homepage word budget: under 500 words.
