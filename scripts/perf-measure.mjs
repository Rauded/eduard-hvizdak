// Frozen perf harness. Serves build/ and loads each route cold in headless
// Chrome at a phone viewport, then reports what the page actually fetched.
// Sizes are brotli of the file on disk, so the numbers do not depend on the
// server or on timing.
//
//   node scripts/perf-measure.mjs            table
//   node scripts/perf-measure.mjs --json     machine readable
//   PERF_ROUTES=/,/blog node scripts/perf-measure.mjs
//   node scripts/perf-measure.mjs --serve 4173   only serve build/ (used by perf-lighthouse.sh)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import puppeteer from 'puppeteer';

const BUILD = path.resolve('build');
const ROUTES = (process.env.PERF_ROUTES || '/,/projects/inzerpro,/blog/zero-to-done,/services').split(',');
const TEXT = /\.(js|css|html|json|svg|xml|txt)$/;
const KIND = [
  [/\.js$/, 'js'],
  [/\.css$/, 'css'],
  [/\.(png|jpe?g|gif|webp|avif|svg|ico)$/, 'img'],
  [/\.(woff2?|ttf|otf)$/, 'font'],
  [/\.(mp4|webm|mov)$/, 'media'],
];

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  for (const candidate of [clean, path.join(clean, 'index.html')]) {
    const file = path.join(BUILD, candidate);
    if (file.startsWith(BUILD) && fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return path.join(BUILD, 'index.html');
}

const wireSize = new Map();
function sizeOf(file) {
  if (!wireSize.has(file)) {
    const body = fs.readFileSync(file);
    wireSize.set(file, TEXT.test(file) ? zlib.brotliCompressSync(body).length : body.length);
  }
  return wireSize.get(file);
}

const MIME = { js: 'text/javascript', css: 'text/css', html: 'text/html', json: 'application/json', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif', woff2: 'font/woff2', woff: 'font/woff', mp4: 'video/mp4', pdf: 'application/pdf' };

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  res.setHeader('content-type', MIME[path.extname(file).slice(1)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
const serveAt = process.argv.indexOf('--serve');
await new Promise((r) => server.listen(serveAt > -1 ? Number(process.argv[serveAt + 1]) : 0, r));
if (serveAt > -1) await new Promise(() => {});
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const results = [];
for (const route of ROUTES) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  const cdp = await page.createCDPSession();
  await cdp.send('Browser.setDownloadBehavior', { behavior: 'deny' });
  const row = { route, js: 0, css: 0, img: 0, font: 0, media: 0, other: 0, total: 0, requests: 0, thirdParty: 0, errors: 0 };
  const seen = new Set();
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.startsWith('data:') || url.startsWith('blob:')) return req.continue();
    if (!url.startsWith(origin)) {
      row.thirdParty += 1;
      return req.abort();
    }
    const file = resolveFile(new URL(url).pathname);
    if (!seen.has(file)) {
      seen.add(file);
      const bytes = sizeOf(file);
      const kind = file.endsWith('index.html') ? 'other' : (KIND.find(([re]) => re.test(file)) || [0, 'other'])[1];
      row[kind] += bytes;
      row.total += bytes;
      row.requests += 1;
    }
    req.continue();
  });
  page.on('pageerror', () => { row.errors += 1; });
  await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 60000 });
  row.dom = await page.evaluate(() => document.querySelectorAll('*').length);
  results.push(row);
  await context.close();
}
await browser.close();
server.close();

const sum = (k) => results.reduce((a, r) => a + r[k], 0);
const summary = { js: sum('js'), css: sum('css'), img: sum('img'), font: sum('font'), media: sum('media'), total: sum('total'), requests: sum('requests'), thirdParty: sum('thirdParty'), errors: sum('errors') };

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ results, summary }, null, 2));
} else {
  console.table(results);
  console.log('SUM over routes (brotli bytes):', JSON.stringify(summary));
}
