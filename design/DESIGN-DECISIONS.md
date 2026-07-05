# Design Decisions Log

A running record of visual-design directions we have tried for this site, what was
kept, and what was rejected, so we do not re-litigate the same ideas. Update this
whenever a design direction is accepted or rejected.

Last updated: 2026-07-03.

## What this site has to do (the bar every design choice must clear)

1. **Convert visitors into leads / consultation bookings.** This is the primary job.
2. **Look professional and impressive** ("a consultant charging $300+/hr, not $30").
3. **Not look AI-generated / "vibe coded".**

## Principles that WORKED (keep these)

- **No gradients, no glow / gradient shadows.** The old `135deg` purple page-gradient,
  gradient-filled CTA "pills", and colored `box-shadow` glows all read as AI-generated.
  Prefer flat fills and neutral shadows.
- **Keep the TARS terminal as a dark focal object** (works on both light and dark pages).
- **One accent, used sparingly** (links, CTAs, active nav, the terminal prompt), not
  painted across headings and everything else.
- **Keep the mono terminal signature** (RobotoMono). Self-host fonts.

## Color directions TRIED and REJECTED

| # | Direction | Dark base | Light base | Accent | Verdict |
|---|-----------|-----------|------------|--------|---------|
| 1 | Pure monochrome, no accent | `#0e0e10` | `#fafaf8` | none (ink / white) | REJECTED: too bland |
| 2 | Warm near-monochrome | `#14120f` | `#f6f3ec` | warm sand `#cdb892` / warm umber `#6e5844` | REJECTED: disliked the warm colors |
| 3 | Navy + teal (B. Chiang lineage) | `#0f172a` | `#f8fafc` | teal `#2dd4bf` / `#0d9488` | REJECTED |
| 4 | Graphite + emerald (terminal-native) | `#0b0f0d` | `#fafaf9` | emerald `#34d399` / `#059669` | REJECTED |

## Fonts TRIED

- **Space Grotesk** (display): REJECTED. Reads as the "tech-startup / AI-default" look
  (the ui-ux-pro-max database literally files it under its "Tech Startup / AI products"
  pairing).
- **Fraunces** (characterful serif, display): used in directions 2 to 4 but never judged
  on its own; dropped together with those palettes.
- **Original / current:** Source Serif 4 headings, Inter body, RobotoMono for mono +
  terminal.

## The generic-AI accent to AVOID

- Indigo `#6366f1` and flat blue `#3b82f6` / `#2563eb` are the exact tokens most
  AI-generated Tailwind sites ship. On the ORIGINAL site these were the "vibe coded"
  complaint.
- KNOWN TENSION: we have currently reverted TO the original blue by request (see below),
  so "blue accent" is back in place even though it was the first thing disliked. This is
  an unresolved question, not a settled decision.

## Research: what respected portfolios actually use (2026)

- **Pattern:** a rich dark base (deep navy / deep-ocean, not flat black) OR a clean light
  base, plus ONE distinctive, non-indigo accent used sparingly.
- **Real examples:** Brittany Chiang navy `#11172a` + teal `#599692`; Jean de Dieu navy
  `#111827` + emerald `#01c16a`; Josh W. Comeau near-black `#0d0f12` + magenta `#c91b68`;
  Ryan Jacobson black/white + violet `#6049ea`.
- **Consultants specifically:** cool tones (blue / green / teal) signal trust and
  expertise; the palette should look "$300/hr, not $30".
- **Conversion is a bigger lever than color.** The sequence that converts: a value-prop
  hero headline about the client's outcome (not just a name), social proof (logos or
  testimonials with headshots + names + titles; pages with social proof convert ~12.5%
  vs ~11.4% without), and a repeated action-first CTA ("Book a call") at hero, mid-page,
  and bottom.
- Sources: webportfolios.dev, uisurgeon.com, launchadvisor.co, unbounce.com, cxl.com.

## Still OPEN / undecided

- **The accent direction is unresolved.** Monochrome, warm, teal, and emerald were all
  rejected; reverted to the original blue for now. A future attempt should probably try a
  genuinely different accent (or a different visual concept altogether), rather than
  another variation on "dark base + one cool accent".
- **Conversion structure not built yet:** value-prop hero headline, social proof, and
  repeated CTAs are the highest-impact unbuilt work.

## Where the experiments live

- Isolated git worktree **`redesign/no-slop`** (at `../redesign-no-slop`). Uncommitted.
  Contains the full CSS-variable token architecture, gradient/glow removal, the Fraunces
  setup, and the graphite/emerald palette. Reusable if we revisit; safe to delete with
  `git worktree remove ../redesign-no-slop && git branch -D redesign/no-slop`.
- Anti-AI-look skills referenced during this exploration: `ui-ux-pro-max`,
  `frontend-design`, `taste-skill`, `impeccable`, `humanizer`.
