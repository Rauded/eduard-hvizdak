// hero-shots.mjs: screenshot every hero variant (?variant=N) for design review.
// Serves the built site locally, drives headless Chromium with software WebGL
// so the Paper shaders actually render, and writes PNGs to the output dir.
//
// Usage: node scripts/hero-shots.mjs "<outDir>" <count>
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.resolve(__dirname, '..', 'build');
const PORT = 45690;
const OUT = process.argv[2] || path.resolve(__dirname, '..', 'hero-shots');
const COUNT = parseInt(process.argv[3] || '14', 10);

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(BUILD, url);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(BUILD, 'index.html');
  const ext = path.extname(file).toLowerCase();
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await new Promise((r) => server.listen(PORT, r));
  console.log('[shots] serving build on', PORT, 'out:', OUT);

  const puppeteer = (await import('puppeteer')).default;
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      '--enable-webgl',
      '--window-size=1512,1000',
    ],
  });

  for (let i = 1; i <= COUNT; i++) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1512, height: 1000, deviceScaleFactor: 2 });
    try {
      await page.goto(`http://127.0.0.1:${PORT}/?variant=${i}`, {
        waitUntil: 'domcontentloaded', timeout: 30000,
      });
      await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve())).catch(() => {});
      await sleep(7000);
      const out = path.join(OUT, `variant-${String(i).padStart(2, '0')}.png`);
      await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1512, height: 1000 } });
      console.log('[shots] variant', i, 'saved', path.basename(out));
    } catch (e) {
      console.warn('[shots] variant', i, 'FAILED:', e.message);
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('[shots] done');
}

main().catch((e) => { console.error(e); process.exit(1); });
