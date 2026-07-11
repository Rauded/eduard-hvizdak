# SEO / account tasks needing a logged-in human (deferred)

These came out of the 2026-07-11 audit. They need Google / Vercel / Wikidata
account access, so they were not done in a coding session. Not being worked on
right now; documented here so they are not lost.

## 1. Register eduardhvizdak.com in Google Search Console (highest priority)
The live domain may not be measured at all. An old property
`https://eduard-hvizdak.vercel.app/` exists but has near-zero data; the real
domain's search data is unaccounted for.
- Google account: rafajel999@gmail.com
- search.google.com/search-console -> Add property -> Domain -> `eduardhvizdak.com`
  (verify via DNS TXT; a URL-prefix property may verify instantly since
  `public/googled4b21e60c5c21687.html` is already served).
- Then Sitemaps -> submit `sitemap.xml`.
- Done when: property verified and sitemap status "Success".

## 2. Grant the automation service account read access
So GSC data can be pulled programmatically.
- In the eduardhvizdak.com property -> Settings -> Users and permissions -> Add
  user -> `claude-mcp@inzerdesk.iam.gserviceaccount.com` -> Full (or Restricted).
- Done when: the service account appears in the users list. (That account already
  has access to inzerpro.cz, kouzelniknaakci.cz, and the old vercel.app property.)

## 3. Make the www redirect permanent (301/308, not 307)
Audit found `www.eduardhvizdak.com` returns a temporary 307.
- Vercel dashboard -> project -> Settings -> Domains: primary = eduardhvizdak.com,
  www redirects to it (permanent).
- Done when: `curl -sI https://www.eduardhvizdak.com/` returns 308/301 with
  `location: https://eduardhvizdak.com/`.

## 4. Create the Wikidata item for Eduard Hvizdak (knowledge-panel groundwork)
Highest-leverage single action for owning the "Eduard Hvizdak" name query and
AI-search identity. The site JSON-LD already has a `sameAs` slot waiting for the
Wikidata URL (TODO in `public/index.html`, near the Person @graph block).
- Needs a Wikidata login. Mind notability rules; cite external coverage
  (press, the Digital Fairness Act Youth Policy Dialogue, etc.).
- Create item: instance of `human`, occupation software engineer / entrepreneur,
  official website `https://eduardhvizdak.com`, with references.
- Record the resulting `Q...` id; a coding session then adds it to the Person
  `sameAs` array on the site.
- There is a local `knowledge-panel-playbook` skill for a guided version.

## Notes
- GSC is reachable now via the `claude-mcp@inzerdesk...` service account
  (`~/.claude/mcp.json` gscServer, or query the API directly). Once task 2 is
  done, the coding session can pull real eduardhvizdak.com query/page data and
  turn the content ideas (blog posts, case-study pages, /services FAQ) into a
  priority list backed by real impressions. Content is blocked on that data.
- PostHog session recording: DONE (disabled in src/index.tsx, 2026-07-11).
- Slovak + Czech path-based locales (/sk, /cz): IN PROGRESS in code (2026-07-11).
