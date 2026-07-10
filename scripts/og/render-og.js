// Renders scripts/og/og-card.html to public/og-image.png (1200x630) with
// Puppeteer. The card mirrors the live hero (navy on white, reaching-hands
// halftone, blueprint frame). Run: node scripts/og/render-og.js
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..', '..');
const FONT_DIR = path.join(ROOT, 'src', 'fonts');
const CARD = path.join(__dirname, 'og-card.html');
const OUT = path.join(ROOT, 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2; // render at 2x for crisp text, PNG stays 1200x630 on downscale

(async () => {
  // Substitute the absolute font dir and write a temp file next to the card so
  // the relative hands-dither.png still resolves. goto (not setContent) keeps
  // the base URL, so all relative and file:// assets load cleanly.
  const html = fs
    .readFileSync(CARD, 'utf8')
    .replace(/FONT_DIR/g, 'file://' + FONT_DIR);
  const TMP = path.join(__dirname, '.og-card.rendered.html');
  fs.writeFileSync(TMP, html);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: SCALE });
    await page.goto('file://' + TMP, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    // Wait for the Paper Shaders dither canvas to actually paint (esm.sh load).
    await page.waitForFunction(() => window.__ditherReady === true, { timeout: 20000 });
    await new Promise((r) => setTimeout(r, 300)); // let the frozen frame settle

    const el = await page.$('.card');
    const buf = await el.screenshot({ type: 'png' });

    // The 2x element screenshot is 2400x1260; downscale to 1200x630 with sharp
    // if available, else write as-is (still valid, just larger).
    let out = buf;
    try {
      const sharp = require('sharp');
      out = await sharp(buf).resize(WIDTH, HEIGHT).png({ compressionLevel: 9 }).toBuffer();
    } catch (e) {
      console.warn('sharp not available, writing 2x screenshot as-is');
    }
    fs.writeFileSync(OUT, out);
    console.log('Wrote', OUT, `(${out.length} bytes)`);
    try { fs.unlinkSync(TMP); } catch (e) {}
  } finally {
    await browser.close();
  }
})();
