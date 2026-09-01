import { cp, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceRoot = path.join(root, 'Ressources');
const outputRoots = [
  path.join(root, 'assets'),
  path.join(root, 'public', 'assets')
];
const bookNumbers = [42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94];

const assets = [
  ['Photos/philippe-shembo-portrait-bleu.jpg', 'portraits/philippe-shembo-hero.jpg'],
  ['Photos/philippe-shembo-costume-sable.jpg', 'portraits/philippe-shembo-about.jpg'],
  ['Photos/philippe-shembo-et-epouse.jpg', 'portraits/philippe-shembo-couple.jpg'],
  ['Photos/philippe-shembo-blazer-sourire.jpg', 'portraits/philippe-shembo-portrait-sourire.jpg'],
  ['Photos/philippe-shembo-chemise-rayee.jpg', 'portraits/philippe-shembo-chemise.jpg'],
  ['Photos/RL819-Photo Philippe.png', 'portraits/philippe-shembo-archive.png'],
  ['Logos/f34990080.png', 'brand/logo-pas.png'],
  ['MOTIFS/f35219456.png', 'patterns/pas-pattern-01.png'],
  ...bookNumbers.map((number, index) => [
    `Livres/${number}.png`,
    `books/book-${String(index + 1).padStart(2, '0')}.png`
  ])
];

for (const [sourceRelative, outputRelative] of assets) {
  const source = path.join(sourceRoot, sourceRelative);
  try {
    await access(source, constants.R_OK);
  } catch {
    throw new Error(`Ressource requise introuvable : ${sourceRelative}`);
  }

  for (const outDir of outputRoots) {
    const output = path.join(outDir, outputRelative);
    await mkdir(path.dirname(output), { recursive: true });
    await cp(source, output);
    await sharp(source).webp({ quality: 84 }).toFile(output.replace(/\.(png|jpe?g)$/i, '.webp'));
  }
}

// Generate favicons from PAS monogram
const logoSource = path.join(sourceRoot, 'Logos/f34990080.png');
const pasMarkBuffer = await sharp(logoSource)
  .extract({ left: 0, top: 0, width: 2027, height: 830 })
  .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

const size = 512;
const radius = 100;
const svgBg = Buffer.from(
  `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">` +
  `<defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">` +
  `<stop offset="0%" stop-color="#22003D" /><stop offset="100%" stop-color="#160029" />` +
  `</linearGradient></defs>` +
  `<rect x="8" y="8" width="${size - 16}" height="${size - 16}" rx="${radius}" ry="${radius}" fill="url(#grad)" stroke="#D4AF37" stroke-width="12" />` +
  `</svg>`
);

const favicon512 = await sharp(svgBg)
  .composite([{ input: pasMarkBuffer, gravity: 'center' }])
  .png()
  .toBuffer();

const faviconOutputs = [root, path.join(root, 'public')];
for (const dir of faviconOutputs) {
  await sharp(favicon512).resize(512, 512).png().toFile(path.join(dir, 'favicon.png'));
  await sharp(favicon512).resize(180, 180).png().toFile(path.join(dir, 'apple-touch-icon.png'));
  await sharp(favicon512).resize(32, 32).png().toFile(path.join(dir, 'favicon-32x32.png'));
  await sharp(favicon512).resize(16, 16).png().toFile(path.join(dir, 'favicon-16x16.png'));
  await sharp(favicon512).resize(32, 32).png().toFile(path.join(dir, 'favicon.ico'));
}

// Generate SVG favicon as well
const svgFaviconContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="fav-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22003D" />
      <stop offset="100%" stop-color="#160029" />
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="496" height="496" rx="100" ry="100" fill="url(#fav-bg)" stroke="#D4AF37" stroke-width="12" />
  <image href="data:image/png;base64,${pasMarkBuffer.toString('base64')}" x="36" y="36" width="440" height="440" />
</svg>`;

import { writeFile } from 'node:fs/promises';
for (const dir of faviconOutputs) {
  await writeFile(path.join(dir, 'favicon.svg'), svgFaviconContent, 'utf8');
}

console.log(`Assets and favicons generated in root and public/`);
