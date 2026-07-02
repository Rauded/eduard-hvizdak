# "Latest posts on X" on /now

An auto-synced section on the `/now` page that shows my most recent original
posts from [x.com/EduardHvizdak](https://x.com/EduardHvizdak). It is separate
from the hand-picked **Favourite posts on X** section (which stays manual).

**Status: built but OFF by default (feature flag).** The scraper has not been
set up yet and the section is not shown live. This doc is how to turn it on
later.

---

## How it works

There is no free X/Twitter API for reading a timeline anymore, so instead of an
`api/` serverless function (like YouTube, GitHub, Letterboxd use), this feed is
produced by a small scraper that runs on my own Mac using my logged-in browser
session. No developer API, no API keys.

The flow:

1. **Scrape (local).** `scripts/scrape-tweets.mjs` opens `x.com/EduardHvizdak`
   in a headless Chrome (Puppeteer, already a repo dependency) using a saved,
   logged-in profile. It reads the newest posts from the page, keeping only my
   own original posts (it skips reposts, pinned, and replies), and takes the
   top 6.
2. **Publish.** It writes those tweet URLs to `public/latest-tweets.json`. If
   the list actually changed since last time, it `git commit`s just that file
   and `git push`es to `main`, which makes Vercel redeploy. If nothing changed,
   it does nothing (no pointless deploys).
3. **Render.** On the site, `NowPage.tsx` fetches `/latest-tweets.json` and
   renders each URL with the existing official `Tweet` embed component. The
   section hides itself when the list is empty.
4. **Schedule.** A macOS `launchd` job runs the scraper once a day at 09:00.

Safety: if the saved session is logged out, or the page markup changes and no
posts are found, the scraper stops and does **not** overwrite the JSON, so the
live section never gets wiped by a bad run. You just re-run the login step.

### Files

| File | What it is |
| --- | --- |
| `scripts/scrape-tweets.mjs` | The scraper (login, scrape, write JSON, commit + push). |
| `scripts/run-scrape-tweets.sh` | Wrapper the cron runs (sets PATH, cd into repo, logs output). |
| `scripts/com.eduard.scrape-tweets.plist` | The launchd daily-job definition. |
| `public/latest-tweets.json` | The published data (`{ handle, updated, tweets: [{id, url}] }`). |
| `src/config/features.ts` | The `latestTweets` feature flag (default off). |
| `src/components/now/NowPage.tsx` | Fetches the JSON and renders the section. |

State it writes lives outside the repo, under `~/.portfolio-x-scraper/`:
the logged-in Chrome profile and the run logs.

---

## The feature flag

The section is gated by the `latestTweets` flag in `src/config/features.ts`,
which is `false` by default, so it is not visible to anyone yet.

- **Preview it live (no redeploy):** add `?tweets=on` to the URL, e.g.
  `eduard-hvizdak.vercel.app/now?tweets=on`. The choice is remembered as you
  click around. Use `?tweets=off` to hide it again, or `?tweets=reset` to clear
  the override.
- **Ship it to everyone:** in `src/config/features.ts` set
  `latestTweets: true` in `DEFAULTS`, then `CI=false npm run build`, commit,
  and push. Vercel redeploys.

Note: previewing with `?tweets=on` only helps once `public/latest-tweets.json`
actually has tweets in it, which happens after the first real scraper run below.

---

## One-time setup (run these when you are ready)

From the repo root (`~/Desktop/Projects/portfolio/tjklint.github.io`):

```bash
# 1. Log into X once. This opens a real browser window; sign in, then press
#    Enter back in the terminal to save the session. It is stored under
#    ~/.portfolio-x-scraper/chrome-profile and reused by every later run.
node scripts/scrape-tweets.mjs --login

# 2. Do a real run: scrape, write public/latest-tweets.json, commit + push.
#    (Add --no-push if you want to scrape and inspect the JSON without pushing.)
node scripts/scrape-tweets.mjs

# 3. Install the daily cron (runs at 09:00 local time).
mkdir -p ~/.portfolio-x-scraper
cp scripts/com.eduard.scrape-tweets.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.eduard.scrape-tweets.plist
```

Then flip the feature flag on (see "Ship it to everyone" above) so the section
shows for real, hard-refresh `/now` with Cmd+Shift+R, and you are done.

### Running / testing the cron by hand

```bash
# Fire the scheduled job immediately, without waiting for 09:00:
launchctl start com.eduard.scrape-tweets

# Watch what it did:
tail -f ~/.portfolio-x-scraper/scrape.log
```

### Uninstall / stop the cron

```bash
launchctl unload ~/Library/LaunchAgents/com.eduard.scrape-tweets.plist
rm ~/Library/LaunchAgents/com.eduard.scrape-tweets.plist
```

---

## Troubleshooting

- **"No tweets rendered ... probably logged out."** The saved session expired.
  Re-run `node scripts/scrape-tweets.mjs --login` and sign in again.
- **"extracted zero original posts."** X likely changed their page markup, or
  the profile only has reposts/replies near the top. The JSON is left untouched.
  Check the selectors in `scrape-tweets.mjs` (the `article[data-testid="tweet"]`
  and `/status/` link logic).
- **Cron did not run.** launchd only fires while the Mac is awake; if it was
  asleep at 09:00 it runs at the next wake. Confirm it is loaded with
  `launchctl list | grep scrape-tweets`, and check
  `~/.portfolio-x-scraper/launchd.err.log`.
- **A run pushed but the site did not update.** Give Vercel a minute, then
  hard-refresh (Cmd+Shift+R). The scraper only pushes when the tweet list
  changed, so an unchanged timeline correctly produces no deploy.
- **Change how often it runs.** Edit `StartCalendarInterval` in the plist, then
  `launchctl unload` and `launchctl load` it again.
- **Change how many tweets show.** Edit `const MAX = 6` in `scrape-tweets.mjs`.
