/**
 * One-off script: compress heavy images in /public to high-quality webp.
 * Keeps original files; writes new .webp siblings. Run: node scripts/compress-images.mjs
 */
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const targets = [
  // (filename, maxWidth, quality)
  ['banner-setup.jpg', 1600, 82],
  ['banner-tips.jpg', 1600, 82],
  ['banner-miku-current.png', 1600, 85],
  ['banner-miku-oldd.png', 1600, 85],
  ['diary.jpg', 1600, 82],
  ['Banner-Arnold24x24.png', 1920, 85],
];

// All setup item images + config screenshots
const setupImgs = [
  'mouse.jpg', 'teclado.jpg', 'mousepad.jpg', 'monitor.jpg', 'camera.jpg',
  'microphone.png', 'switches_keyboard.jpg', 'keypad_sayo.jpg',
  'mouse-config1.png', 'mouse-config2.png', 'mouse-config3.png', 'mouse-config4.png',
  'teclado-config1.png', 'teclado-config2.png', 'teclado-config3.png', 'keypad-config.png',
];

// All skin banners + skin previews (img) + screenshots
const skinFiles = readdirSync(publicDir)
  .filter((f) => /^skin\d+\.(png|jpg)$/.test(f) || /^banner-skin\d+\.(png|jpg)$/.test(f) || /^ss\d+-\d+\.png$/.test(f));

const files = [...targets.map(([f]) => f), ...setupImgs, ...skinFiles]
  .map((f) => join(publicDir, f))
  .filter((p) => statSync(p).isFile());

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = statSync(file).size;
  totalBefore += before;

  const name = file.split('/').pop();
  const isBanner = name.startsWith('banner-') || name.startsWith('Banner-') || name === 'diary.jpg';
  const maxWidth = isBanner ? 1600 : 1200;

  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const info = await sharp(file, { failOn: 'none' })
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: isBanner ? 84 : 80, effort: 4 })
    .toFile(out);

  const after = info.size;
  totalAfter += after;

  console.log(
    `${name.padEnd(28)} ${(before / 1024).toFixed(0).padStart(6)}KB -> ${(after / 1024).toFixed(0).padStart(6)}KB  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`
  );
}

console.log(`\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
