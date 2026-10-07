// ─────────────────────────────────────────────────────────────────────────────
// prerender.mjs — bakes each route's fully-rendered HTML into the build output
// so non-JS crawlers and AI search engines (and social/OG bots) see real content
// instead of an empty <div id="root">. Runs as part of `npm run build`.
//
// Headless Chromium boots the app on each route, then the app string-renders
// itself (window.__renderStatic in src/index.tsx) and that markup is baked into
// #root; <head> and the rest of <body> come from the live page. The client then
// HYDRATES this HTML (see src/index.tsx).
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
  '/services',
  '/references',
  '/projects/czs-muni-chatbot',
  '/projects/inzerpro',
  '/styleguide',
  '/404',
  '/blog/newsmatics-hackathon',
  '/blog/digital-fairness-act-youth-dialogue',
  '/blog/zero-to-done',
  '/blog/erasmus-bridges-not-walls',
  '/blog/fintech-unbundled-prague',
];

// Bake every route in all three locales. English stays at the root; sk/cs get
// their path prefix (mirrors localizedPath() in src/config/locale.ts). The
// path-derived LocaleContext renders the right language from the URL alone, so
// no extra signalling is needed here beyond visiting the prefixed path.
const LOCALES = ['en', 'sk', 'cs'];
const ALL_ROUTES = LOCALES.flatMap((l) =>
  ROUTES.map((r) => (l === 'en' ? r : `/${l}${r === '/' ? '' : r}`))
);
const expectedLang = (route) => {
  const seg = route.split('/')[1];
  return seg === 'sk' || seg === 'cs' ? seg : 'en';
};

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
  for (const route of ALL_ROUTES) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 1600 });
      // Headless Chrome cannot render the embedded CV PDF inline, so by default
      // it saved a copy to ~/Downloads on every prerender of that route.
      const cdp = await page.createCDPSession();
      await cdp.send('Browser.setDownloadBehavior', { behavior: 'deny' });
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
      // Sub-pages are React.lazy chunks rendered inside a <Suspense fallback={null}>,
      // so #root has children (the header) before the page content exists. Wait for
      // <main id="main-content"> to actually fill, otherwise we would bake empty
      // inner pages and lose all their indexable text.
      await page.waitForFunction(
        () => {
          const m = document.getElementById('main-content');
          return m && m.children.length > 0;
        },
        // 45s: the sk/cs services pages (heaviest lazy chunks, all the demos)
        // were missing a 20s window on a loaded machine.
        { timeout: 45000 }
      );
      // Scroll through once so whatever loads on scroll (lazy chunks and their
      // stylesheets, late fonts) is in <head> and in the font list below.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 25));
        }
        window.scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 300));

      // Bake React's own first render, not a snapshot of the live DOM. The live
      // DOM is the state after effects ran (canvases a shader library mounted,
      // reveal classes, a ticking clock) and carries no Suspense markers, so
      // hydrating it failed on every route (#418, then #423) and React threw
      // the baked tree away. The app is still mounted and has already loaded
      // this route's chunks and dictionaries, so the string render is complete;
      // rendering it also registers the first render's styled-components rules
      // for the step below.
      const markup = await page.evaluate(() => window.__renderStatic());
      if (markup.includes('<!--$!-->')) throw new Error('a Suspense boundary was still pending');

      // styled-components inserts its rules through the CSSOM in production, so
      // its <style> tag serializes empty and the baked markup would paint with
      // sc-* class names that match nothing until the bundle boots (on the home
      // page: the hero art at its natural 1600px, twice, pushing the page down).
      // Write the live rules out as text in a tag of our own, placed where the
      // library's tag sits so the cascade order is unchanged. The library
      // ignores it and injects the same rules again once it runs.
      await page.evaluate(() => {
        const tags = [...document.querySelectorAll('style[data-styled]')];
        const css = tags.flatMap((s) => [...(s.sheet ? s.sheet.cssRules : [])].map((r) => r.cssText)).join('');
        if (!css) return;
        const baked = document.createElement('style');
        baked.setAttribute('data-baked-styled', '');
        baked.textContent = css;
        tags[0].parentNode.insertBefore(baked, tags[0]);
      });

      await page.evaluate((m) => { document.getElementById('root').innerHTML = m; }, markup);

      // A video poster cannot be lazy, so every poster in the baked HTML is
      // fetched at parse time and competes with the first screen for bandwidth
      // (four posters, 288 KB, on the home page). Park the poster in
      // data-poster on play-on-scroll (preload="none") videos that start below
      // this tall prerender viewport, so none can be on a visitor's first
      // screen; src/index.tsx puts it back as soon as the app boots.
      await page.evaluate(() => {
        for (const v of document.querySelectorAll('video[poster][preload="none"]')) {
          if (v.getBoundingClientRect().top + window.scrollY > window.innerHeight) {
            v.dataset.poster = v.getAttribute('poster');
            v.removeAttribute('poster');
          }
        }
      });

      // Web fonts are only discovered at first layout, so the first frame paints
      // in the fallback face and reflows when they land (on a blog post that
      // swap is the whole layout shift score). Preload the faces this page
      // actually fetched so they are there for the first frame.
      await page.evaluate(() => {
        const fonts = new Set(
          performance.getEntriesByType('resource').map((r) => new URL(r.name).pathname).filter((p) => p.endsWith('.woff2'))
        );
        for (const href of fonts) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = '';
          link.href = href;
          document.head.appendChild(link);
        }
      });

      let html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML);
      // The baked markup is already the finished page, so let the browser paint
      // it before the bundle runs. A deferred script that is cached (or arrives
      // with the HTML) evaluates before the first frame and holds that frame
      // back for the whole boot. Keep the early fetch with a low priority
      // preload (the priority a deferred script has), and start the script from
      // the end of <body> once the first contentful paint is reported. Hidden
      // tabs never paint and old browsers do not report paints, so both boot at
      // once; the timer covers a first paint that is itself held up by slow CSS.
      html = html.replace(
        /<script defer="defer" src="(\/static\/js\/main\.[^"]+\.js)"><\/script>([\s\S]*)<\/body>/,
        (_, src, rest) =>
          `<link rel="preload" as="script" fetchpriority="low" href="${src}">${rest}<script>!function(){var d=document,s=d.createElement("script"),go=function(){go=function(){};d.head.appendChild(s)};s.src="${src}";try{if(d.hidden||PerformanceObserver.supportedEntryTypes.indexOf("paint")<0)throw 0;new PerformanceObserver(function(l){l.getEntriesByName("first-contentful-paint").length&&go()}).observe({type:"paint",buffered:!0});setTimeout(go,1500)}catch(e){go()}}()</script></body>`
      );
      // Cheap insurance: make sure a /sk or /cs route actually baked in that
      // language (path-derived locale), not English.
      const bakedLang = await page.evaluate(() => document.documentElement.lang);
      const want = expectedLang(route);
      if (bakedLang !== want) {
        console.warn(`[prerender] WARNING ${route}: baked lang="${bakedLang}", expected "${want}"`);
      }
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
  console.log(`[prerender] done: ${ok}/${ALL_ROUTES.length} routes prerendered`);
}

main().catch((e) => {
  console.warn('[prerender] skipped (non-fatal):', e && e.message);
  process.exit(0); // never break the deploy
});
