import sharp from 'sharp';

const jobs = [
  ['public/banner-setup.jpg', 1600, 84],
  ['public/banner-tips.jpg', 1600, 84],
  ['public/banner-miku-current.png', 1600, 85],
  ['public/banner-miku-oldd.png', 1600, 85],
  ['public/diary.jpg', 1600, 84],
  ['public/Banner-Arnold24x24.png', 1920, 85],
  ['public/deep-sea-girl.jpg', 480, 82],
];

for (const [f, w, q] of jobs) {
  const out = f.replace(/\.(png|jpe?g)$/i, '.webp');
  const info = await sharp(f, { failOn: 'none' })
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: q, effort: 4 })
    .toFile(out);
  console.log(`${f} -> ${(info.size / 1024).toFixed(0)}KB`);
}
