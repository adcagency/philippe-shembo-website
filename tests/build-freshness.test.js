// tests/build-freshness.test.js
//
// Guards against `src/pages/*.js` (or partials/render-page/nav-config) being
// edited without re-running `npm run build`. Regenerates each of the 12 pages
// in memory, exactly like scripts/build-pages.mjs, and compares against the
// committed HTML file on disk. Fails loudly if they have diverged.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
    test(`committed HTML for "${page.key}" (${lang}) matches freshly rendered output`, async () => {
      const expected = renderPage({ lang, pageKey: page.key, ...page[lang] });
      const filePath = path.join(root, pathFor(page.key, lang), 'index.html');
      const actual = await readFile(filePath, 'utf8');
      assert.equal(
        actual,
        expected,
        `${path.relative(root, filePath)} is stale — run "npm run build" to regenerate it from src/pages/${page.key}.js`
      );
    });
  }
}
