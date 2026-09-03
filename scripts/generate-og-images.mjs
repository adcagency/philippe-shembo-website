import sharp from 'sharp';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = process.cwd();
const photoPath = path.join(root, 'Ressources/Photos/philippe-shembo-portrait-bleu.jpg');
const logoPath = path.join(root, 'Ressources/Logos/f34990080.png');

async function createOgImage(lang) {
  const width = 1200;
  const height = 630;
  
  // Crop & resize portrait for right side
  const portraitWidth = 520;
  const portraitHeight = 630;
  const portraitBuffer = await sharp(photoPath)
    .resize(portraitWidth, portraitHeight, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Extract logo mark
  const logoBuffer = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: 2027, height: 830 })
    .resize(220, 90, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const isFr = lang === 'fr';
  const eyebrow = isFr ? 'PASTEUR · AUTEUR · FORMATEUR' : 'PASTOR · AUTHOR · TRAINER';
  const name = 'PHILIPPE A. SHEMBO';
  const tagline = isFr
    ? '« Équiper une génération pour influencer son temps »'
    : '“Equipping a generation to influence its time”';
  const subtitle = isFr
    ? 'Ministère, prédications, enseignements et ouvrages'
    : 'Ministry, sermons, teachings and publications';

  // Base background
  const bgSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#140026" />
          <stop offset="55%" stop-color="#20003B" />
          <stop offset="100%" stop-color="#2D064B" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGradient)" />
    </svg>
  `);

  // Soft fade mask for portrait left edge
  const fadeSvg = Buffer.from(`
    <svg width="${portraitWidth}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="portraitFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#140026" stop-opacity="1" />
          <stop offset="25%" stop-color="#140026" stop-opacity="0.85" />
          <stop offset="70%" stop-color="#140026" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${portraitWidth}" height="${height}" fill="url(#portraitFade)" />
    </svg>
  `);

  // Text overlay
  const textSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Gold accent lines -->
      <line x1="80" y1="75" x2="170" y2="75" stroke="#D4AF37" stroke-width="2.5" />
      <rect x="80" y="540" width="${width - 160}" height="1" fill="#D4AF37" opacity="0.35" />

      <!-- Eyebrow -->
      <text x="80" y="125" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="3" fill="#D4AF37">${eyebrow}</text>
      
      <!-- Name -->
      <text x="80" y="215" font-family="'Cinzel', Georgia, serif" font-size="52" font-weight="700" letter-spacing="2" fill="#FFFFFF">${name}</text>
      
      <!-- Tagline -->
      <text x="80" y="290" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-style="italic" fill="#EAEAEA">${tagline}</text>
      
      <!-- Subtitle -->
      <text x="80" y="365" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" font-weight="400" fill="#B8B5C7">${subtitle}</text>

      <!-- Domain footer -->
      <text x="80" y="580" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="1" fill="#D4AF37">philippeshembo.com</text>
    </svg>
  `);

  const portraitLeft = width - portraitWidth;
  const outDirPublic = path.join(root, 'public/og');
  const outDirRoot = path.join(root, 'og');
  await mkdir(outDirPublic, { recursive: true });
  await mkdir(outDirRoot, { recursive: true });

  const filename = `philippe-shembo-${lang}.png`;

  const finalImage = await sharp(bgSvg)
    .composite([
      { input: portraitBuffer, left: portraitLeft, top: 0, blend: 'over' },
      { input: fadeSvg, left: portraitLeft, top: 0, blend: 'over' },
      { input: textSvg, left: 0, top: 0, blend: 'over' },
      { input: logoBuffer, left: 80, top: 415, blend: 'over' }
    ])
    .png({ quality: 90 })
    .toBuffer();

  await sharp(finalImage).toFile(path.join(outDirPublic, filename));
  await sharp(finalImage).toFile(path.join(outDirRoot, filename));
  console.log(`Generated ${filename} in public/og/ and og/`);
}

await createOgImage('fr');
await createOgImage('en');
