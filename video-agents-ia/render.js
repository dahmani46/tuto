// Rend index.html image par image (Playwright) puis encode un MP4 (ffmpeg).
// Usage : node render.js <dossier_frames> <fichier_sortie.mp4>
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const FPS = 30;
const framesDir = process.argv[2] || path.join(__dirname, 'frames');
const outFile = process.argv[3] || path.join(__dirname, 'agents-ia.mp4');

(async () => {
  fs.mkdirSync(framesDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.join(__dirname, 'index.html'));
  await page.waitForFunction(() => typeof window.renderAt === 'function');
  // HIDE_MAN=1 : rend la scène sans le dessin (pour incruster une photo par-dessus)
  if (process.env.HIDE_MAN) await page.evaluate(() => { window.HIDE_MAN = true; });

  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * FPS);
  const canvas = page.locator('#scene');

  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.renderAt(t), f / FPS);
    await canvas.screenshot({ path: path.join(framesDir, `f${String(f).padStart(5, '0')}.png`) });
    if (f % 150 === 0) console.log(`frame ${f}/${total}`);
  }
  await browser.close();

  if (errors.length) throw new Error('Erreurs JS : ' + errors.join(' | '));

  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-framerate', String(FPS),
    '-i', path.join(framesDir, 'f%05d.png'),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    outFile
  ], { stdio: 'inherit' });
  console.log(`OK : ${outFile} (${total} images, ${duration}s à ${FPS} fps)`);
})().catch(e => { console.error(e); process.exit(1); });
