import { readdirSync, existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const removed = [];
const kept = [];

for (const f of readdirSync(publicDir)) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  const base = f.replace(/\.(png|jpe?g)$/i, '');
  const webp = join(publicDir, base + '.webp');
  if (existsSync(webp)) {
    unlinkSync(join(publicDir, f));
    removed.push(f);
  } else {
    kept.push(f);
  }
}

console.log(`Removed ${removed.length} originals:`);
console.log(removed.join('\n'));
console.log(`\nKept ${kept.length} (no webp sibling):`);
console.log(kept.join(', '));
