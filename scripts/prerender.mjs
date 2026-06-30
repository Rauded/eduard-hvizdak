// ─────────────────────────────────────────────────────────────────────────────
// prerender.mjs — bakes each route's fully-rendered HTML into the build output
// so non-JS crawlers and AI search engines (and social/OG bots) see real content
// instead of an empty <div id="root">. Runs as part of `npm run build`.
//
// Technique = the same one react-snap uses (headless Chromium snapshots the
// rendered DOM), but with a modern, Apple-Silicon-compatible Puppeteer that we
// fully control. The client then HYDRATES this HTML (see src/index.tsx).
//
// SAFETY: any failure here (e.g. Chromium can't launch in a CI sandbox) is
// caught and the process exits 0 — the deploy still ships as a normal SPA.
// ─────────────────────────────────────────────────────────────────────────────
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.resolve(__dirname, '..', 'build');
const PORT = 45678;

// Routes to prerender. Dynamic data (/now feeds, etc.) hydrates client-side;
// the static text (projects, case studies, blog posts, bio, things) bakes in.
const ROUTES = [
  '/',
  '/blog',
  '/now',
  '/things',
  '/blog/newsmatics-hackathon',
  '/blog/digital-fairness-act-youth-dialogue',
  '/blog/zero-to-done',
  '/blog/erasmus-bridges-not-walls',
];

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.ico': 'image/x-icon',
  '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain',
};

async function main() {
  if (!fs.existsSync(path.join(BUILD, 'index.html'))) {
    console.warn('[prerender] no build/index.html — skipping');
    return;
  }
  // Serve the PRISTINE shell for every route so each page boots fresh; serve
  // real files for assets. We never serve the snapshots we write back to disk.
  const TEMPLATE = fs.readFileSync(path.join(BUILD, 'index.html'));
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent((req.url || '/').split('?')[0]);
    const fp = path.join(BUILD, p);
    const ext = path.extname(fp);
    if (p !== '/' && ext && fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(fp).pipe(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(TEMPLATE);
  });
  await new Promise((r) => server.listen(PORT, r));

  // Launch Chromium. On Vercel/Lambda (Linux build container that lacks the
  // shared libs bundled Chromium needs) use @sparticuz/chromium + puppeteer-core;
  // locally use full Puppeteer's own Chromium (works on macOS/Apple-Silicon).
  const onServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  let browser;
  try {
    if (onServerless) {
      const chromium = (await import('@sparticuz/chromium')).default;
      const puppeteerCore = (await import('puppeteer-core')).default;
      browser = await puppeteerCore.launch({
        args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      const puppeteer = (await import('puppeteer')).default;
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    }
  } catch (e) {
    console.warn('[prerender] could not launch Chromium — skipping:', e.message);
    server.close();
    return;
  }

  let ok = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 1600 });
      // Block third-party requests so networkidle is reached and nothing hangs
      // on twitter/youtube/linkedin/posthog embeds.
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        const u = r.url();
        if (u.startsWith(`http://127.0.0.1:${PORT}`) || u.startsWith('data:')) r.continue();
        else r.abort();
      });

      // domcontentloaded (not networkidle) because autoplay videos + the PDF
      // viewer keep the network busy forever; we instead wait for React to mount.
      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForFunction(
        () => { const r = document.getElementById('root'); return r && r.children.length > 0; },
        { timeout: 20000 }
      );
      // Trigger scroll-reveal IntersectionObservers, then return to top.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 25));
        }
        window.scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 300));

      const html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML);
      const outPath = route === '/'
        ? path.join(BUILD, 'index.html')
        : path.join(BUILD, route, 'index.html');
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      ok++;
      console.log(`[prerender] ${route} -> ${path.relative(BUILD, outPath)}`);
    } catch (e) {
      console.warn(`[prerender] ${route} failed: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done — ${ok}/${ROUTES.length} routes prerendered`);
}

main().catch((e) => {
  console.warn('[prerender] skipped (non-fatal):', e && e.message);
  process.exit(0); // never break the deploy
});
