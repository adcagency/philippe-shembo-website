import { cp, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceRoot = path.join(root, 'Ressources');
const outputRoot = path.join(root, 'public', 'assets');
const bookNumbers = [42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94];

const assets = [
  ['Photos/RL819-Photo Philippe.png', 'portraits/philippe-shembo-hero.png'],
  ['Logos/f34990080.png', 'brand/logo-pas.png'],
  ['MOTIFS/f35219456.png', 'patterns/pas-pattern-01.png'],
  ...bookNumbers.map((number, index) => [
    `Livres/${number}.png`,
    `books/book-${String(index + 1).padStart(2, '0')}.png`
  ])
];

for (const [sourceRelative, outputRelative] of assets) {
  const source = path.join(sourceRoot, sourceRelative);
  const output = path.join(outputRoot, outputRelative);
  try {
    await access(source, constants.R_OK);
  } catch {
    throw new Error(`Ressource requise introuvable : ${sourceRelative}`);
  }
  await mkdir(path.dirname(output), { recursive: true });
  await cp(source, output);
  await sharp(source).webp({ quality: 82 }).toFile(output.replace(/\.png$/i, '.webp'));
}

console.log(`Assets generated in ${outputRoot}`);
