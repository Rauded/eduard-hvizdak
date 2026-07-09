# Typography style guide

The one type system for eduardhvizdak.com. Geist leads. Every heading,
paragraph, and label composes the tokens below instead of hardcoding sizes, so
the site reads consistently from page to page.

Live specimen: **`/styleguide`** renders every style and reads its computed
values back from the page, so it can never drift from the real CSS. Use it for
visual QA after any type change.

## Font roles

| Token | Family | Where it is used | Defined in |
|-------|--------|------------------|------------|
| `--font-body` / `--font-sans` / `--font-geist` | **Geist Sans** | Body copy, UI, and all headings (default) | `src/index.css` |
| `--font-display` | **Geist Sans** (default) or **Jeju Myeongjo** serif (`?type=serif`) | Big display headings | `src/index.css` |
| `--font-mono` | **Geist Mono** | Logo, eyebrows, tags, labels, code, terminal chrome | `src/index.css` |
| `--font-pixel` | **Geist Pixel** (Square) | Sparingly: wordmark, one hero accent, big numerals | `src/index.css` |
| `--font-serif` | **Jeju Myeongjo** | `.serif-accent` (one italic word in a headline) | `src/index.css` |
| `--font-serif-reading` | **Source Serif 4** | Blog article prose (serif reading mode) | `src/index.css` |

Font-family is assigned centrally in `src/styles/typography.scss` with
`!important`, so component SCSS never needs to set a family. Do not set
`font-family` in component SCSS.

## Type scale

Sizes are fluid (`clamp()`) so headings breathe on desktop and stay legible on
phones without per-component media queries. Tokens live in
`src/styles/typescale.scss`; each has a matching `.t-*` utility class.

| Style | Class | Size token | Weight | Line height | Tracking |
|-------|-------|-----------|--------|-------------|----------|
| Display | `.t-display` | `clamp(2.5rem, 5.5vw, 4rem)` | 600 | 1.05 | -0.02em |
| Heading 1 | `.t-h1` | `clamp(2rem, 4vw, 3rem)` | 600 | 1.15 | -0.01em |
| Heading 2 | `.t-h2` | `clamp(1.5rem, 2.6vw, 2rem)` | 600 | 1.15 | -0.01em |
| Heading 3 | `.t-h3` | `clamp(1.25rem, 1.8vw, 1.5rem)` | 600 | 1.15 | -0.01em |
| Heading 4 | `.t-h4` | `1.125rem` | 600 | 1.3 | -0.01em |
| Heading 5 | `.t-h5` | `1rem` | 500 | 1.3 | 0 |
| Heading 6 | `.t-h6` | `0.875rem` | 500 | 1.3 | 0 |
| Lead | `.t-lead` | `clamp(1.125rem, 1.6vw, 1.25rem)` | 400 | 1.3 | 0 |
| Body | `.t-body` | `1rem` | 400 | 1.6 | 0 |
| Small | `.t-small` | `0.875rem` | 400 | 1.3 | 0 |
| Caption | `.t-caption` | `0.75rem` | 400 | 1.3 | 0 |
| Label | `.t-label` | `0.75rem` (mono, uppercase) | 500 | - | 0.08em |
| Mono | `.t-mono` | `0.875rem` (mono) | 400 | - | 0 |

Bare `h1`-`h6` and `body` tags get sane defaults from these tokens too, so even
unstyled markup lands on-scale.

## Switchable display face

Both looks are kept and switchable. Everything reads `--font-display`, so one
switch flips the whole site.

- **Default:** Jeju Myeongjo **serif** headings over a General Sans body (the
  humandelta look). This is the attribute-less default, so prerendered pages
  paint it with no flash.
- **Preview Geist live:** append `?type=geist` to any URL. The choice is
  remembered as you click around.
- **Clear it:** `?type=reset`.
- **Change the default for everyone:** flip `DEFAULT_TYPE` in
  `src/config/typeface.ts` (`'serif'` or `'geist'`).

Serif is the default, so heading weights default to 400 (Jeju ships one weight;
anything bolder is faux-bold and smears). Geist mode (`?type=geist`) bumps
headings to 600 and swaps body + headings to Geist Sans.

## Geist Pixel rules

Geist Pixel is a display texture, not a text face. Apply the `.pixel-accent`
class only in these spots:

1. A wordmark / logo moment.
2. A single hero accent word.
3. Big numerals (section indices, stat figures) at large sizes.

Never use it for body copy, paragraphs, or ordinary headings. It ships in five
shapes (Square, Grid, Line, Circle, Triangle) in the `vercel/geist-font` repo;
the site loads **Square** (the most legible). Swap the `@font-face` src in
`src/index.css` to try another shape.

## How to add a new text style

1. Add a size/weight/leading/tracking token to `:root` in
   `src/styles/typescale.scss`.
2. Add a matching `.t-*` utility class in the same file.
3. Add a row for it to the `/styleguide` page (`STEPS` array in
   `src/components/styleguide/StyleguidePage.tsx`) so it is documented and QA'd.
4. Update the table above.

## Fallbacks and cleanup notes

- **RobotoMono** stays declared in `src/index.css` purely as a `--font-mono`
  fallback. Its `@font-face` set loads lazily only if Geist Mono fails, so it
  costs nothing at runtime. Kept as a one-line revert target.
- **Inter** and **Source Serif 4** power the blog reading-font toggle (sans vs
  serif reading mode); they are intentionally kept.
- **General Sans** is retained as a body fallback and as the body face in serif
  mode.
