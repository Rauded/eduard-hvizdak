// Scrapes Eduard's latest original posts from x.com/EduardHvizdak using a
// logged-in headless browser (no developer API), writes them to
// public/latest-tweets.json, and, if that file actually changed, commits and
// pushes just that file so Vercel redeploys. Meant to run from a local cron.
//
// One-time setup (opens a real window so you can log into X by hand; the
// session is saved to a persistent profile and reused on every later run):
//
//   node scripts/scrape-tweets.mjs --login
//
// Normal run (headless, reuses the saved session):
//
//   node scripts/scrape-tweets.mjs
//
// Flags:
//   --login       headful, so you can sign in once. Skips writing the JSON.
//   --no-push     scrape + write the file, but don't git commit/push.
//   --handle=x    scrape a different handle (default EduardHvizdak).

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
const OUT = join(REPO, 'public', 'latest-tweets.json');
const PROFILE = join(homedir(), '.portfolio-x-scraper', 'chrome-profile');

const args = process.argv.slice(2);
const LOGIN = args.includes('--login');
const NO_PUSH = args.includes('--no-push');
const HANDLE = (args.find((a) => a.startsWith('--handle=')) || '').split('=')[1] || 'EduardHvizdak';
const MAX = 6;

const log = (...m) => console.log('[scrape-tweets]', ...m);

async function main() {
  mkdirSync(PROFILE, { recursive: true });

  const browser = await puppeteer.launch({
    headless: LOGIN ? false : 'new',
    userDataDir: PROFILE,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
    defaultViewport: LOGIN ? null : { width: 1280, height: 2400 },
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/124.0 Safari/537.36'
    );

    if (LOGIN) {
      await page.goto('https://x.com/login', { waitUntil: 'domcontentloaded' });
      log('A browser window is open. Log into X, then press Enter here to save the session.');
      await new Promise((r) => process.stdin.once('data', r));
      log('Session saved to', PROFILE);
      return;
    }

    await page.goto(`https://x.com/${HANDLE}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // If the session died, the profile page redirects to a login wall and no
    // tweets render. Detect that and bail WITHOUT clobbering the good JSON.
    try {
      await page.waitForSelector('article[data-testid="tweet"]', { timeout: 30000 });
    } catch {
      throw new Error(
        'No tweets rendered. The saved X session is probably logged out. ' +
          'Re-run with --login to sign in again.'
      );
    }

    // Nudge a bit of lazy-loading so we reliably have more than the first post.
    await page.evaluate(() => window.scrollBy(0, 2000));
    await new Promise((r) => setTimeout(r, 1500));

    const tweets = await page.evaluate((handle) => {
      const out = [];
      const seen = new Set();
      const arts = Array.from(document.querySelectorAll('article[data-testid="tweet"]'));
      for (const art of arts) {
        const ctx = (art.querySelector('[data-testid="socialContext"]')?.textContent || '').toLowerCase();
        // Skip reposts/retweets and pinned tweets; we want fresh originals.
        if (ctx.includes('repost') || ctx.includes('pinned')) continue;
        // The status link that carries a <time> is the canonical permalink.
        const link = Array.from(art.querySelectorAll('a[href*="/status/"]')).find((a) =>
          a.querySelector('time')
        );
        if (!link) continue;
        const m = link.getAttribute('href').match(/\/([^/]+)\/status\/(\d+)/);
        if (!m) continue;
        const author = m[1];
        const id = m[2];
        // Only the profile owner's own posts (skips quoted/inline others).
        if (author.toLowerCase() !== handle.toLowerCase()) continue;
        if (seen.has(id)) continue;
        seen.add(id);
        out.push({ id, url: `https://x.com/${author}/status/${id}` });
      }
      return out;
    }, HANDLE);

    if (!tweets.length) {
      throw new Error('Found the profile but extracted zero original posts; leaving JSON untouched.');
    }

    const picked = tweets.slice(0, MAX);
    const payload = {
      handle: HANDLE,
      updated: new Date().toISOString(),
      tweets: picked,
    };

    // Only rewrite/commit when the actual tweet list changed (ignore the
    // timestamp), so an unchanged timeline doesn't trigger a pointless deploy.
    const prevIds = existsSync(OUT)
      ? JSON.stringify((JSON.parse(readFileSync(OUT, 'utf8')).tweets || []).map((t) => t.id))
      : null;
    const nextIds = JSON.stringify(picked.map((t) => t.id));

    if (prevIds === nextIds) {
      log(`No change (${picked.length} posts). Nothing to publish.`);
      return;
    }

    writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');
    log(`Wrote ${picked.length} posts to public/latest-tweets.json`);

    if (NO_PUSH) {
      log('--no-push set; skipping git.');
      return;
    }

    const git = (...a) => execFileSync('git', a, { cwd: REPO, stdio: 'pipe' }).toString().trim();
    git('add', 'public/latest-tweets.json');
    // Bail quietly if git sees nothing staged (e.g. only whitespace).
    const staged = execFileSync('git', ['diff', '--cached', '--name-only'], { cwd: REPO }).toString().trim();
    if (!staged) {
      log('Git has no staged change; skipping commit.');
      return;
    }
    git('commit', '-m', 'chore(now): sync latest X posts');
    git('push', 'origin', 'main');
    log('Committed and pushed. Vercel will redeploy.');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error('[scrape-tweets] ' + (e?.message || e));
  process.exit(1);
});
