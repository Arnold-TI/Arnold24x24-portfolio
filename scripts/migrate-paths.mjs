/**
 * One-off script: rewrite local image paths (.png/.jpg -> .webp) in lib/data/*.ts
 * ONLY when a .webp sibling exists in /public. Run: node scripts/migrate-paths.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const files = [
  fileURLToPath(new URL('../lib/data/skins.ts', import.meta.url)),
  fileURLToPath(new URL('../lib/data/setup.ts', import.meta.url)),
];

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const replaced = original.replace(/"(\/[^"]+)\.(?:png|jpe?g)"/g, (match, path) => {
    const webp = join(publicDir, path + '.webp');
    return existsSync(webp) ? `"${path}.webp"` : match;
  });
  if (replaced !== original) {
    writeFileSync(file, replaced);
    console.log(`Updated ${file.split(/[\\/]/).pop()}`);
  } else {
    console.log(`No changes in ${file.split(/[\\/]/).pop()}`);
  }
}
