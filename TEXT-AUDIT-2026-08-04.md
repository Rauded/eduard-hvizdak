# Text audit: what earns its place, what doesn't

Measured on the built site, 2026-08-04. Every number below is counted, not
estimated: `innerText` word counts and rendered pixel heights per section.

Mark the rows you want cut and I'll do it.

---

## The finding: the site is not text-heavy, it is height-heavy

This is the opposite of what it feels like, so the numbers matter.

| page | visible words | page height | px per word |
| --- | ---: | ---: | ---: |
| `/` | **746** | 9,017 px | 12.1 |
| `/services` | 1,704 | 10,914 px | 6.4 |
| `/now` | 141 | 1,814 px | 12.9 |
| `/things` | 469 | 3,269 px | 7.0 |
| a blog post | 787 | 8,308 px | 10.6 |

746 words is a *short* homepage. A normal landing page runs 400 to 800. The
reason people scroll past without reading is not that there is too much to
read, it is that there is 9,000 px of page wrapped around 746 words. Roughly
twelve pixels of scrolling per word. Cutting sentences will not fix that;
cutting **height** will.

So the ranking below scores two things separately: how much a block is worth
to a reader, and how much screen it costs.

---

## The three biggest wins, before the detail

**1. `/services` "Method" section: 4,203 px, 39% of the page.**
Five animated visualizations (adversarial review, parallel error clearing, CI
race to green, commit heatmap, git log replay) plus 783 words. Your own copy
says these show "a real, large-scale AI-assisted engineering effort, shown as
an example of how I run the work". A buyer cannot tell whose effort it is, and
it is not one of your named clients. It is the single most expensive thing on
the site and the least tied to proof. **Recommend: keep one visualization
(adversarial review, since it answers a real objection about AI-written code),
cut the other four.** Saves roughly 3,300 px.

**2. Homepage project section: 4,018 px, 45% of the page, for 321 words.**
Six cards at ~670 px each. Three would say the same thing about you in half
the space. **Recommend: feature three, move the rest behind a link.**

**3. `/services` demo section: 1,687 px for 176 words.**
Same problem, smaller. Worth keeping one demo, not three.

Those three changes remove about 6,000 px from the site without deleting a
single sentence you wrote.

---

## Ranked by signal

### Tier A: highest signal, keep and protect

| block | words | cost | why it earns it |
| --- | ---: | ---: | --- |
| `/now` "Currently building" cards | 72 | 293 px | Live Search Console impressions per product. Real numbers, updating themselves. The most convincing thing on the whole site. |
| Homepage client logo strip | 2 | 178 px | Five recognisable organisations for two words of copy. Best signal-to-height ratio anywhere. |
| Hero subhead | 25 | in hero | Says what you do and who for, in one sentence. |
| Resume bullets | 183 | 1,158 px | Specific systems, named tech, real scale (200k+ students, millions of contracts). |
| `/services` "Who this is for" | 42 | in hero | Lets a reader place themselves in ten seconds. New, and pulling weight. |
| `/services` FAQ | 146 | 708 px | Answers what hiring you is actually like. New. |
| `/services` process (4 steps) | 104 | 547 px | Fixed price, written scope, handover. This is what de-risks you. |
| Blog post bodies | ~640 each | varies | Your voice, your events. Not marketing. Leave alone. |

### Tier B: keep, but shorter

| block | words | cost | what to cut |
| --- | ---: | ---: | --- |
| About Me | 136 | 1,009 px | Four paragraphs where two would do. Paragraph 1 (positioning "between business and technology") and paragraph 2 (production AI agents) say almost the same thing. The reading/token-maxxing/Twitter line is the only personality on the page, so keep that one. **Cut to ~70 words.** |
| `/services` "What I do" (4 offers) | 145 | 439 px | Good structure, but each offer has a question, an outcome and a deliverables list. The deliverables lists are the weakest part. **Consider dropping the deliverables.** |
| `/services` "Why me" (4 proof bullets) | 82 | 320 px | Bullets 1 and 4 are strong (own products in production, direct access to the builder). Bullet 2 is a tech list that repeats the resume; bullet 3 is long. **Cut to 2 bullets.** |
| Project card descriptions | 321 total | 4,018 px | The text is fine. The *number of cards* is the problem. See win #2. |
| `/things` | 469 | 3,269 px | Fine as a personality page, but nobody arrives here to hire you. Low priority either way. |

### Tier C: low signal for the space it takes

| block | words | cost | verdict |
| --- | ---: | ---: | --- |
| `/services` Method section | 783 | **4,203 px** | See win #1. Four of the five visualizations show work a buyer cannot attribute to you. |
| `/services` demo section | 176 | **1,687 px** | Three demos where one would land the point. |
| Homepage section markers (01 ABOUT etc.) | 2 each | 82 px each, 328 px total | Nice typographic device, but four of them cost a third of a screen. Consider halving their vertical padding. |
| Tile wordmark band | 0 | 342 px | Zero words, a third of a screen, and currently faint enough to read as blank. Either make it visible or cut it. |
| `/now` LinkedIn embed | 4 | **680 px** | 680 px for a third-party widget, on your best page. It is 37% of `/now`. |

### Tier D: no reader value

| block | cost | verdict |
| --- | ---: | --- |
| Contact band repeated on both `/` and `/services` | 792 px each | Fine to keep both, but 792 px is a lot for a four-option wizard. Worth tightening. |
| `/services` hero + repeated CTA | 704 px | Now carries proof stats and the fit list, so this one is earning it. No action. |

---

## What I did NOT flag, deliberately

- **Blog posts.** You write those. Not my call, and the rule in `CLAUDE.md` is
  that they ship as you wrote them.
- **Case study text on project cards.** It is collapsed by default and always
  in the DOM for crawlers and LLMs. It costs a reader nothing and it is doing
  real SEO work. Leave it.
- **Resume bullets.** Dense, but dense with specifics. That is the good kind.

---

## If you only do one thing

Cut four of the five Method visualizations on `/services`. It is 39% of that
page, it is the section least connected to your named clients, and removing it
costs you nothing you can point at.
