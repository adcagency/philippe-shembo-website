// scripts/build-pages.mjs
import { mkdir, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import { renderPage } from '../src/build/render-page.js';
import { pathFor } from '../src/data/nav-config.js';
import { homePage } from '../src/pages/home.js';
import { aboutPage } from '../src/pages/about.js';
import { mediaPage } from '../src/pages/media.js';
import { bibliographyPage } from '../src/pages/bibliography.js';
import { supportPage } from '../src/pages/support.js';
import { contactPage } from '../src/pages/contact.js';
import { legalPage } from '../src/pages/legal.js';

const root = process.cwd();
const PAGES = [homePage, aboutPage, mediaPage, bibliographyPage, supportPage, contactPage, legalPage];

for (const page of PAGES) {
  for (const lang of ['fr', 'en']) {
    const html = renderPage({ lang, pageKey: page.key, ...page[lang] });
    const relPath = pathFor(page.key, lang);
    
    // Write to root
    const rootPath = path.join(root, relPath, 'index.html');
    await mkdir(path.dirname(rootPath), { recursive: true });
    await writeFile(rootPath, html, 'utf8');

    // Write to public/ for Vercel
    const publicPath = path.join(root, 'public', relPath, 'index.html');
    await mkdir(path.dirname(publicPath), { recursive: true });
    await writeFile(publicPath, html, 'utf8');

    console.log(`Wrote ${relPath}`);
  }
}

// Ensure src/ (styles & scripts) is copied to public/src/
await cp(path.join(root, 'src'), path.join(root, 'public', 'src'), { recursive: true });

// Ensure robots.txt and sitemap.xml exist at root for static server
await cp(path.join(root, 'public', 'robots.txt'), path.join(root, 'robots.txt'));
await cp(path.join(root, 'public', 'sitemap.xml'), path.join(root, 'sitemap.xml'));

console.log(`Generated ${PAGES.length * 2} pages`);
