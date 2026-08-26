// scripts/build-pages.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderPage } from '../src/build/render-page.js';
import { pathFor } from '../src/data/nav-config.js';
import { homePage } from '../src/pages/home.js';
import { aboutPage } from '../src/pages/about.js';
import { mediaPage } from '../src/pages/media.js';
import { bibliographyPage } from '../src/pages/bibliography.js';
import { supportPage } from '../src/pages/support.js';
import { contactPage } from '../src/pages/contact.js';

const root = process.cwd();
const PAGES = [homePage, aboutPage, mediaPage, bibliographyPage, supportPage, contactPage];

for (const page of PAGES) {
  for (const lang of ['fr', 'en']) {
    const html = renderPage({ lang, pageKey: page.key, ...page[lang] });
    const outputPath = path.join(root, pathFor(page.key, lang), 'index.html');
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
    console.log(`Wrote ${path.relative(root, outputPath)}`);
  }
}

console.log(`Generated ${PAGES.length * 2} pages`);
