# Multi-Page Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the anchor-based single-page navigation (`#ministry`, `#sermons`, `#books`, `#support`, `#contact`) with 12 statically generated HTML pages (6 logical pages × FR/EN), assembled by a small Node build script from shared header/footer partials and per-page content modules, with correct per-page SEO metadata and no in-page anchors in the nav.

**Architecture:** A `renderPage()` function combines a shared header partial, footer partial, and per-page body HTML into a full static HTML document, resolving canonical/hreflang/OG metadata and cross-language paths from a single nav-config data module. `scripts/build-pages.mjs` iterates all pages × both languages and writes the generated HTML directly to its final served path (e.g. `a-propos/index.html`), the same way `index.html` is committed today — no separate `dist/` folder, no change to `npm run serve`.

**Tech Stack:** Plain Node.js ES modules (`type: module` already set in `package.json`), `node:test` for unit tests, Playwright for browser tests. No template engine, no static-site-generator dependency.

**Spec:** `docs/superpowers/specs/2026-08-26-multi-page-navigation-design.md`

## Global Constraints

- No framework, no template engine, no third-party static-site generator — the build script is a plain Node script, consistent with the project's existing `scripts/optimize-assets.mjs`.
- Generated page HTML files are committed at their final served paths (like `index.html` today), not written to a gitignored `dist/` folder.
- **This project has no git repository initialized** (confirmed `fatal: not a git repository`). Every task below omits the "Commit" step from the standard task template for this reason — do not run `git add`/`git commit` unless the user has since initialized a repository and told you to.
- Colors, fonts and placeholder policy from `CLAUDE.md` still apply unchanged: violet `#4B0082`, gold `#D4AF37`, sand `#EAEAEA`, ink `#1C1C1C`, white `#FFFFFF`; Playfair Display (headings), Lato (body), Antonio (uppercase labels); any unconfirmed business value stays the literal string `[À renseigner]` and must never render as an active link.
- No new editorial content is invented — all page copy is moved verbatim from the current `index.html` / `en/index.html`, only reorganized, retitled at the H1 level, and re-linked.
- Node's built-in test runner discovers files by suffix, not by import — `*.test.js` files are picked up by `node --test tests/`, while Playwright's `*.spec.js` files are not, so the two test kinds coexist safely in the same `tests/` directory.

---

## Task 1: Navigation config module

**Files:**
- Create: `src/data/nav-config.js`
- Test: `tests/nav-config.test.js`
- Modify: `package.json` (test script must discover all `*.test.js` files, not just one hardcoded path)

**Interfaces:**
- Produces: `NAV_ITEMS` (array of `{ key, fr: { label, path }, en: { label, path } }`), `HOME_PATH` (`{ fr: '/', en: '/en/' }`), and `pathFor(pageKey, lang)` (returns the path for `'home'` or any `NAV_ITEMS[].key`, throws on an unknown key) — imported by every later task instead of each redefining the same lookup.

- [ ] **Step 1: Write the failing test**

```js
// tests/nav-config.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { NAV_ITEMS, HOME_PATH, pathFor } from '../src/data/nav-config.js';

test('nav config has exactly the five section pages with fr/en paths', () => {
  assert.equal(NAV_ITEMS.length, 5);
  const keys = NAV_ITEMS.map((item) => item.key).sort();
  assert.deepEqual(keys, ['about', 'bibliography', 'contact', 'media', 'support']);
  for (const item of NAV_ITEMS) {
    assert.ok(item.fr.path.startsWith('/') && item.fr.path.endsWith('/'));
    assert.ok(item.en.path.startsWith('/en/') && item.en.path.endsWith('/'));
    assert.ok(item.fr.label.length > 0);
    assert.ok(item.en.label.length > 0);
  }
  assert.equal(HOME_PATH.fr, '/');
  assert.equal(HOME_PATH.en, '/en/');
});

test('pathFor resolves home and section pages, and throws on an unknown key', () => {
  assert.equal(pathFor('home', 'fr'), '/');
  assert.equal(pathFor('home', 'en'), '/en/');
  assert.equal(pathFor('about', 'fr'), '/a-propos/');
  assert.equal(pathFor('about', 'en'), '/en/about/');
  assert.throws(() => pathFor('nope', 'fr'));
});

test('nav paths use the agreed slugs', () => {
  const byKey = Object.fromEntries(NAV_ITEMS.map((item) => [item.key, item]));
  assert.equal(byKey.about.fr.path, '/a-propos/');
  assert.equal(byKey.about.en.path, '/en/about/');
  assert.equal(byKey.media.fr.path, '/espace-medias/');
  assert.equal(byKey.media.en.path, '/en/media/');
  assert.equal(byKey.bibliography.fr.path, '/bibliographie/');
  assert.equal(byKey.bibliography.en.path, '/en/bibliography/');
  assert.equal(byKey.support.fr.path, '/soutenir/');
  assert.equal(byKey.support.en.path, '/en/support/');
  assert.equal(byKey.contact.fr.path, '/contact/');
  assert.equal(byKey.contact.en.path, '/en/contact/');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/nav-config.test.js`
Expected: FAIL because `src/data/nav-config.js` does not exist.

- [ ] **Step 3: Update package.json test script to discover all test files**

In `package.json`, change:

```json
"test": "node --test tests/site-content.test.js",
```

to:

```json
"test": "node --test tests/",
```

- [ ] **Step 4: Create the nav config module**

```js
// src/data/nav-config.js
export const HOME_PATH = { fr: '/', en: '/en/' };

export const NAV_ITEMS = [
  { key: 'about', fr: { label: 'À Propos', path: '/a-propos/' }, en: { label: 'About', path: '/en/about/' } },
  { key: 'media', fr: { label: 'Espace Médias', path: '/espace-medias/' }, en: { label: 'Media', path: '/en/media/' } },
  { key: 'bibliography', fr: { label: 'Bibliographie', path: '/bibliographie/' }, en: { label: 'Bibliography', path: '/en/bibliography/' } },
  { key: 'support', fr: { label: 'Soutenir', path: '/soutenir/' }, en: { label: 'Support', path: '/en/support/' } },
  { key: 'contact', fr: { label: 'Contact', path: '/contact/' }, en: { label: 'Contact', path: '/en/contact/' } }
];

export function pathFor(pageKey, lang) {
  if (pageKey === 'home') return HOME_PATH[lang];
  const item = NAV_ITEMS.find((entry) => entry.key === pageKey);
  if (!item) throw new Error(`Unknown pageKey: ${pageKey}`);
  return item[lang].path;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS (all three tests in `tests/nav-config.test.js`, plus the pre-existing `tests/site-content.test.js` tests, now discovered via the directory form).

---

## Task 2: Header and footer partials, with active-page styling

**Files:**
- Create: `src/partials/header.js`
- Create: `src/partials/footer.js`
- Test: `tests/partials.test.js`
- Modify: `src/styles/main.css`

**Interfaces:**
- Consumes: `NAV_ITEMS`, `HOME_PATH` from `src/data/nav-config.js` (Task 1).
- Produces: `renderSkipLink(lang)`, `renderHeader({ lang, pageKey })`, `renderFooter({ lang, otherLangPath })` — all return HTML strings. `pageKey` is `'home'` or one of the five `NAV_ITEMS[].key` values. Used by `render-page.js` in Task 4.

- [ ] **Step 1: Write the failing test**

```js
// tests/partials.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { renderSkipLink, renderHeader } from '../src/partials/header.js';
import { renderFooter } from '../src/partials/footer.js';

test('renderSkipLink uses the right label per language', () => {
  assert.match(renderSkipLink('fr'), /Aller au contenu/);
  assert.match(renderSkipLink('en'), /Skip to content/);
});

test('renderHeader marks the current page with aria-current and links to real paths', () => {
  const html = renderHeader({ lang: 'fr', pageKey: 'about' });
  assert.match(html, /<a href="\/a-propos\/" aria-current="page">À Propos<\/a>/);
  assert.match(html, /<a href="\/espace-medias\/">Espace Médias<\/a>/);
  assert.doesNotMatch(html, /href="#/);
});

test('renderHeader brand link points at the home page for the language', () => {
  const fr = renderHeader({ lang: 'fr', pageKey: 'home' });
  assert.match(fr, /<a class="brand" href="\/"/);
  const en = renderHeader({ lang: 'en', pageKey: 'home' });
  assert.match(en, /<a class="brand" href="\/en\/"/);
});

test('renderHeader language links point at the given page in the other language', () => {
  const html = renderHeader({ lang: 'fr', pageKey: 'support' });
  assert.match(html, /<a href="\/en\/support\/">EN<\/a>/);
  assert.match(html, /<a href="\/soutenir\/" aria-current="page">FR<\/a>/);
});

test('renderFooter uses the given cross-language path, not a hash', () => {
  const html = renderFooter({ lang: 'fr', otherLangPath: '/en/contact/' });
  assert.match(html, /<a href="\/en\/contact\/">English version<\/a>/);
  assert.doesNotMatch(html, /data-language-link/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/partials.test.js`
Expected: FAIL because `src/partials/header.js` and `src/partials/footer.js` do not exist.

- [ ] **Step 3: Implement the header partial**

```js
// src/partials/header.js
import { NAV_ITEMS, HOME_PATH, pathFor } from '../data/nav-config.js';

const COPY = {
  fr: { skip: 'Aller au contenu', brandLabel: 'Accueil Philippe A. Shembo', menu: 'Menu', navLabel: 'Navigation principale', langLabel: 'Langue' },
  en: { skip: 'Skip to content', brandLabel: 'Philippe A. Shembo home', menu: 'Menu', navLabel: 'Primary navigation', langLabel: 'Language' }
};

export function renderSkipLink(lang) {
  return `<a class="skip-link" href="#main">${COPY[lang].skip}</a>`;
}

export function renderHeader({ lang, pageKey }) {
  const copy = COPY[lang];
  const homePath = HOME_PATH[lang];
  const navLinks = NAV_ITEMS.map((item) => {
    const { label, path } = item[lang];
    const current = pageKey === item.key ? ' aria-current="page"' : '';
    return `<li><a href="${path}"${current}>${label}</a></li>`;
  }).join('');
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const currentPath = pathFor(pageKey, lang);
  const otherPath = pathFor(pageKey, otherLang);
  const frPath = lang === 'fr' ? currentPath : otherPath;
  const enPath = lang === 'en' ? currentPath : otherPath;
  const frCurrent = lang === 'fr' ? ' aria-current="page"' : '';
  const enCurrent = lang === 'en' ? ' aria-current="page"' : '';
  return `<header class="site-header"><div class="shell header-inner">
      <a class="brand" href="${homePath}" aria-label="${copy.brandLabel}"><img src="/assets/brand/logo-pas.webp" width="2027" height="1077" alt="PAS Philippe Andy Shembo"></a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-navigation" data-menu-button>${copy.menu}</button>
      <nav class="site-nav" id="site-navigation" aria-label="${copy.navLabel}" data-navigation data-open="false"><ul>${navLinks}</ul></nav>
      <div class="language" aria-label="${copy.langLabel}"><a href="${frPath}"${frCurrent}>FR</a><span aria-hidden="true">/</span><a href="${enPath}"${enCurrent}>EN</a></div>
    </div></header>`;
}
```

- [ ] **Step 4: Implement the footer partial**

```js
// src/partials/footer.js
const COPY = {
  fr: { rights: '© 2026 Philippe A. Shembo. Tous droits réservés.', switchLabel: 'English version', legal: 'Mentions légales à renseigner' },
  en: { rights: '© 2026 Philippe A. Shembo. All rights reserved.', switchLabel: 'Version française', legal: 'Legal notice to be provided' }
};

export function renderFooter({ lang, otherLangPath }) {
  const copy = COPY[lang];
  return `<footer class="site-footer"><div class="shell footer-inner"><p>${copy.rights}</p><p><a href="${otherLangPath}">${copy.switchLabel}</a> · ${copy.legal}</p></div></footer>`;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Add active-page nav styling to main.css**

In `src/styles/main.css`, right after the existing line:

```css
.language a[aria-current='page'] { color: var(--gold); font-weight: 900; }
```

add:

```css
.site-nav a[aria-current='page'] { color: var(--gold); font-weight: 900; }
```

No test for this line (pure visual styling); verified visually in Task 12.

---

## Task 3: Simplify site.js (drop obsolete hash-preserving logic)

**Files:**
- Modify: `src/scripts/site.js`
- Test: `tests/site-script.test.js`

**Interfaces:**
- No change to the module's public behavior consumed by other tasks — this only removes dead code that assumed all language links shared one page with different anchors.

- [ ] **Step 1: Write the failing test**

```js
// tests/site-script.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('site.js no longer contains the obsolete hash-preserving language-link logic', async () => {
  const source = await readFile('src/scripts/site.js', 'utf8');
  assert.ok(!source.includes('data-language-link'));
  assert.ok(!source.includes('window.location.hash'));
  assert.ok(source.includes('data-menu-button'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site-script.test.js`
Expected: FAIL — current `src/scripts/site.js` still contains the `data-language-link` block.

- [ ] **Step 3: Remove the obsolete block**

Replace the full contents of `src/scripts/site.js` with:

```js
const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.dataset.open = String(!open);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.dataset.open === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.dataset.open = 'false';
      menuButton.focus();
    }
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 4: Page assembly function (`renderPage`)

**Files:**
- Create: `src/build/render-page.js`
- Test: `tests/render-page.test.js`

**Interfaces:**
- Consumes: `NAV_ITEMS`, `HOME_PATH` (Task 1), `renderSkipLink`, `renderHeader` (Task 2), `renderFooter` (Task 2), `SITE_CONTENT.social` (existing `src/data/site-content.js`).
- Produces: `renderPage({ lang, pageKey, title, description, ogTitle, ogDescription, bodyHtml })` → full HTML document string. This is the single function `scripts/build-pages.mjs` (Task 11) calls once per page × language.

- [ ] **Step 1: Write the failing test**

```js
// tests/render-page.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/build/render-page.js';

const base = {
  title: 'Titre de test',
  description: 'Description de test',
  ogTitle: 'Titre OG',
  ogDescription: 'Description OG',
  bodyHtml: '<section><h1>Contenu</h1></section>'
};

test('renderPage produces a full document with correct lang, canonical and hreflang', () => {
  const html = renderPage({ lang: 'fr', pageKey: 'about', ...base });
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<html lang="fr">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.org\/a-propos\/">/);
  assert.match(html, /<link rel="alternate" hreflang="fr" href="https:\/\/example\.org\/a-propos\/">/);
  assert.match(html, /<link rel="alternate" hreflang="en" href="https:\/\/example\.org\/en\/about\/">/);
  assert.match(html, /<link rel="alternate" hreflang="x-default" href="https:\/\/example\.org\/">/);
  assert.match(html, /<title>Titre de test<\/title>/);
  assert.match(html, /<section><h1>Contenu<\/h1><\/section>/);
  assert.match(html, /src="\/src\/scripts\/site\.js"/);
});

test('renderPage resolves the home page path correctly', () => {
  const html = renderPage({ lang: 'en', pageKey: 'home', ...base });
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.org\/en\/">/);
});

test('renderPage embeds a Person JSON-LD block using the official social URLs', () => {
  const html = renderPage({ lang: 'fr', pageKey: 'contact', ...base });
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@andyphilippeshembo/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/render-page.test.js`
Expected: FAIL because `src/build/render-page.js` does not exist.

- [ ] **Step 3: Implement render-page.js**

```js
// src/build/render-page.js
import { HOME_PATH, pathFor } from '../data/nav-config.js';
import { SITE_CONTENT } from '../data/site-content.js';
import { renderSkipLink, renderHeader } from '../partials/header.js';
import { renderFooter } from '../partials/footer.js';

const SITE_ORIGIN = 'https://example.org';

function jsonLdPerson(lang) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Philippe A. Shembo',
    jobTitle: lang === 'fr' ? 'Pasteur, auteur et formateur' : 'Pastor, author and trainer',
    sameAs: Object.values(SITE_CONTENT.social)
  });
}

export function renderPage({ lang, pageKey, title, description, ogTitle, ogDescription, bodyHtml }) {
  const path = pathFor(pageKey, lang);
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const otherPath = pathFor(pageKey, otherLang);
  const canonical = `${SITE_ORIGIN}${path}`;
  const frPath = lang === 'fr' ? path : otherPath;
  const enPath = lang === 'en' ? path : otherPath;
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const skipLink = renderSkipLink(lang);
  const header = renderHeader({ lang, pageKey });
  const footer = renderFooter({ lang, otherLangPath: otherPath });

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="fr" href="${SITE_ORIGIN}${frPath}">
    <link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${enPath}">
    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${HOME_PATH.fr}">
    <meta property="og:type" content="website"><meta property="og:locale" content="${ogLocale}"><meta property="og:title" content="${ogTitle}"><meta property="og:description" content="${ogDescription}"><meta property="og:url" content="${canonical}">
    <link rel="stylesheet" href="/src/styles/main.css">
    <script type="application/ld+json">${jsonLdPerson(lang)}</script>
  </head>
  <body>
    ${skipLink}
    ${header}
    <main id="main">
${bodyHtml}
    </main>
    ${footer}
    <script type="module" src="/src/scripts/site.js"></script>
  </body>
</html>
`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 5: Home page content module

**Files:**
- Create: `src/pages/home.js`
- Test: `tests/pages-home.test.js`
- Modify: `src/styles/main.css` (add `.overview-grid` / `.overview-card` / `.overview-link`)

**Interfaces:**
- Produces: `homePage = { key: 'home', fr: { title, description, ogTitle, ogDescription, bodyHtml }, en: { ... } }`, consumed by `scripts/build-pages.mjs` (Task 11).

- [ ] **Step 1: Write the failing test**

```js
// tests/pages-home.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { homePage } from '../src/pages/home.js';

test('home page content has no anchor-based hrefs and exactly one h1 per language', () => {
  assert.equal(homePage.key, 'home');
  for (const lang of ['fr', 'en']) {
    const page = homePage[lang];
    assert.ok(page.title.length > 0);
    assert.ok(page.description.length > 0);
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.ok(!page.bodyHtml.includes('href="#'));
  }
});

test('home page links to all five section pages', () => {
  assert.match(homePage.fr.bodyHtml, /href="\/a-propos\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/espace-medias\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/bibliographie\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/soutenir\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/contact\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/about\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/media\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/bibliography\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/support\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/contact\/"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/pages-home.test.js`
Expected: FAIL because `src/pages/home.js` does not exist.

- [ ] **Step 3: Implement the home page content module**

```js
// src/pages/home.js
export const homePage = {
  key: 'home',
  fr: {
    title: 'Philippe A. Shembo | Ministère, prédications et ouvrages',
    description: 'Découvrez le ministère, les prédications et les ouvrages de Philippe A. Shembo, pasteur, auteur et formateur.',
    ogTitle: 'Philippe A. Shembo | Ministère, prédications et ouvrages',
    ogDescription: 'Découvrez le ministère, les prédications et les ouvrages de Philippe A. Shembo.',
    bodyHtml: `      <section class="hero"><div class="shell hero-grid">
        <div class="hero-copy"><p class="eyebrow">Pasteur · Auteur · Formateur</p><h1>Équiper une génération pour influencer son temps.</h1><p class="hero-summary">Découvrez le ministère, les enseignements et les ouvrages de Philippe A. Shembo.</p><div class="actions"><a class="button" href="/a-propos/">Découvrir le ministère</a><a class="button button--ghost" href="/espace-medias/">Voir les prédications</a></div></div>
        <figure class="hero-portrait"><img src="/assets/portraits/philippe-shembo-hero.webp" width="667" height="1000" alt="Portrait du Pasteur Philippe A. Shembo"></figure>
      </div></section>
      <section class="section"><div class="shell"><div class="metrics" aria-label="Repères du ministère"><div class="metric"><strong>2007</strong><span>Appel pastoral</span></div><div class="metric"><strong>2008</strong><span>Pasteur depuis juin</span></div><div class="metric"><strong>17</strong><span>Ouvrages publiés</span></div><div class="metric"><strong>4</strong><span>Axes de mission</span></div></div></div></section>
      <section class="section section--sand"><div class="shell vision-grid"><div><p class="eyebrow">Une vision</p><h2 class="section-title">Le Royaume de Dieu, vécu et transmis.</h2></div><blockquote class="quote">« Former des hommes et des femmes afin d’influencer positivement cette génération. »</blockquote></div></section>
      <section class="section"><div class="shell"><p class="eyebrow">Explorer</p><h2 class="section-title">Le ministère en un coup d’œil.</h2><div class="overview-grid">
        <article class="overview-card"><h3>À Propos</h3><p>Ministère, missions et parcours pastoral.</p><a class="overview-link" href="/a-propos/">En savoir plus</a></article>
        <article class="overview-card"><h3>Espace Médias</h3><p>Les prédications récentes de Philippe A. Shembo.</p><a class="overview-link" href="/espace-medias/">En savoir plus</a></article>
        <article class="overview-card"><h3>Bibliographie</h3><p>Les ouvrages publiés aux Éditions Lampe à mes Pieds.</p><a class="overview-link" href="/bibliographie/">En savoir plus</a></article>
        <article class="overview-card"><h3>Soutenir</h3><p>Porter plus loin la vision du ministère.</p><a class="overview-link" href="/soutenir/">En savoir plus</a></article>
        <article class="overview-card"><h3>Contact</h3><p>Suivre le ministère et rester en lien.</p><a class="overview-link" href="/contact/">En savoir plus</a></article>
      </div></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Ministry, sermons and books',
    description: 'Discover the ministry, sermons and books of Philippe A. Shembo, pastor, author and trainer.',
    ogTitle: 'Philippe A. Shembo | Ministry, sermons and books',
    ogDescription: 'Discover the ministry, sermons and books of Philippe A. Shembo.',
    bodyHtml: `      <section class="hero"><div class="shell hero-grid">
        <div class="hero-copy"><p class="eyebrow">Pastor · Author · Trainer</p><h1>Equipping a generation to influence its time.</h1><p class="hero-summary">Discover the ministry, teachings and books of Philippe A. Shembo.</p><div class="actions"><a class="button" href="/en/about/">Discover the ministry</a><a class="button button--ghost" href="/en/media/">Watch sermons</a></div></div>
        <figure class="hero-portrait"><img src="/assets/portraits/philippe-shembo-hero.webp" width="667" height="1000" alt="Portrait of Pastor Philippe A. Shembo"></figure>
      </div></section>
      <section class="section"><div class="shell"><div class="metrics" aria-label="Ministry milestones"><div class="metric"><strong>2007</strong><span>Pastoral calling</span></div><div class="metric"><strong>2008</strong><span>Pastor since June</span></div><div class="metric"><strong>17</strong><span>Published books</span></div><div class="metric"><strong>4</strong><span>Ministry areas</span></div></div></div></section>
      <section class="section section--sand"><div class="shell vision-grid"><div><p class="eyebrow">A vision</p><h2 class="section-title">God’s Kingdom, lived and shared.</h2></div><blockquote class="quote">“Training men and women to positively influence this generation.”</blockquote></div></section>
      <section class="section"><div class="shell"><p class="eyebrow">Explore</p><h2 class="section-title">The ministry at a glance.</h2><div class="overview-grid">
        <article class="overview-card"><h3>About</h3><p>Ministry, missions and pastoral journey.</p><a class="overview-link" href="/en/about/">Learn more</a></article>
        <article class="overview-card"><h3>Media</h3><p>Philippe A. Shembo's recent sermons.</p><a class="overview-link" href="/en/media/">Learn more</a></article>
        <article class="overview-card"><h3>Bibliography</h3><p>Books published through Lampe à mes Pieds Publishing.</p><a class="overview-link" href="/en/bibliography/">Learn more</a></article>
        <article class="overview-card"><h3>Support</h3><p>Carry the ministry's vision further.</p><a class="overview-link" href="/en/support/">Learn more</a></article>
        <article class="overview-card"><h3>Contact</h3><p>Follow the ministry and stay in touch.</p><a class="overview-link" href="/en/contact/">Learn more</a></article>
      </div></div></section>`
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Add overview grid styling to main.css**

In `src/styles/main.css`, after the `.quote { ... }` rule, add:

```css
.overview-grid { display: grid; gap: 1rem; }
.overview-card { padding: 1.5rem; border: 1px solid var(--line); background: var(--paper); }
.overview-card h3 { margin: 0 0 .5rem; color: var(--violet); font: 800 1.3rem/1.15 var(--serif); }
.overview-card p { margin: 0 0 1rem; color: var(--muted); }
.overview-link { font-weight: 900; color: var(--violet); text-decoration: underline; text-underline-offset: .18em; }
```

In the `@media (min-width: 680px)` block, add `.overview-grid` to the existing selector list so it reads:

```css
.cards, .sermon-grid, .support-grid, .overview-grid { grid-template-columns: repeat(2, 1fr); }
```

(replacing the current `.cards, .sermon-grid, .support-grid { grid-template-columns: repeat(2, 1fr); }` line)

In the `@media (min-width: 900px)` block, add:

```css
.overview-grid { grid-template-columns: repeat(3, 1fr); }
```

---

## Task 6: About page content module (ministry + biography)

**Files:**
- Create: `src/pages/about.js`
- Test: `tests/pages-about.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/pages-about.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { aboutPage } from '../src/pages/about.js';

test('about page has one h1, the four mission cards and the biography timeline', () => {
  assert.equal(aboutPage.key, 'about');
  for (const lang of ['fr', 'en']) {
    const page = aboutPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.equal((page.bodyHtml.match(/mission-card/g) || []).length, 4);
    assert.ok(page.bodyHtml.includes('timeline'));
    assert.ok(!page.bodyHtml.includes('href="#'));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/pages-about.test.js`
Expected: FAIL because `src/pages/about.js` does not exist.

- [ ] **Step 3: Implement the about page content module**

```js
// src/pages/about.js
export const aboutPage = {
  key: 'about',
  fr: {
    title: 'Philippe A. Shembo | Ministère et parcours pastoral',
    description: 'Découvrez le ministère de Philippe A. Shembo : missions, Églises accompagnées et parcours pastoral depuis 2007.',
    ogTitle: 'Philippe A. Shembo | Ministère et parcours pastoral',
    ogDescription: 'Découvrez le ministère de Philippe A. Shembo : missions, Églises accompagnées et parcours pastoral depuis 2007.',
    bodyHtml: `      <section class="section"><div class="shell"><p class="eyebrow">Ministère</p><h1 class="section-title">Servir, former, bâtir.</h1><p class="section-intro">La vision se déploie au Maroc, en République Démocratique du Congo et partout où des croyants sont appelés à faire rayonner leur foi dans la société.</p><div class="cards">
        <article class="mission-card"><h3>Assemblées Chrétiennes</h3><p>Apôtre et responsable de la Famille des Assemblées Chrétiennes, une famille d’Églises au Maroc.</p></article>
        <article class="mission-card"><h3>Grâce Déployée</h3><p>Pasteur visionnaire des Églises Grâce Déployée, au service d’une communauté vivante et équipée.</p></article>
        <article class="mission-card"><h3>Charisma Source Abondante</h3><p>Fondateur d’une ONG/ASBL œuvrant en République Démocratique du Congo.</p></article>
        <article class="mission-card"><h3>Lampe à mes Pieds</h3><p>Fondateur des Éditions Lampe à mes Pieds, maison d’édition de ses ouvrages.</p></article>
      </div></div></section>
      <section class="section section--sand"><div class="shell bio-grid"><div><p class="eyebrow">Parcours</p><h2 class="section-title">Une vocation au service des Églises.</h2><p class="section-intro">Diplômé en Mathématiques de l’Université Chouaïb Doukkali à El Jadida au Maroc, Philippe A. Shembo a répondu à l’appel pastoral en octobre 2007, avant de devenir Pasteur en juin 2008.</p></div><div class="timeline"><div class="timeline-item"><time datetime="2007-10">Oct. 2007</time><p>Réponse à l’appel pastoral.</p></div><div class="timeline-item"><time datetime="2008-06">Juin 2008</time><p>Début du ministère pastoral.</p></div><div class="timeline-item"><time>Aujourd’hui</time><p>Ministère d’enseignement, accompagnement des Églises et développement d’œuvres au Maroc et en RDC.</p></div></div></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Ministry and pastoral journey',
    description: "Discover Philippe A. Shembo's ministry: missions, churches served and pastoral journey since 2007.",
    ogTitle: 'Philippe A. Shembo | Ministry and pastoral journey',
    ogDescription: "Discover Philippe A. Shembo's ministry: missions, churches served and pastoral journey since 2007.",
    bodyHtml: `      <section class="section"><div class="shell"><p class="eyebrow">Ministry</p><h1 class="section-title">Serving, training, building.</h1><p class="section-intro">This vision unfolds in Morocco, the Democratic Republic of Congo and wherever believers are called to make their faith shine in society.</p><div class="cards">
        <article class="mission-card"><h3>Christian Assemblies</h3><p>Apostle and leader of the Christian Assemblies Family, a family of churches in Morocco.</p></article>
        <article class="mission-card"><h3>Grâce Déployée</h3><p>Visionary pastor of the Grâce Déployée churches, serving a vibrant and equipped community.</p></article>
        <article class="mission-card"><h3>Charisma Source Abondante</h3><p>Founder of an NGO/association working in the Democratic Republic of Congo.</p></article>
        <article class="mission-card"><h3>Lampe à mes Pieds</h3><p>Founder of Lampe à mes Pieds Publishing, publishing house for his books.</p></article>
      </div></div></section>
      <section class="section section--sand"><div class="shell bio-grid"><div><p class="eyebrow">Journey</p><h2 class="section-title">A calling in service of churches.</h2><p class="section-intro">A Mathematics graduate from Chouaïb Doukkali University in El Jadida, Morocco, Philippe A. Shembo responded to a pastoral call in October 2007 and became a pastor in June 2008.</p></div><div class="timeline"><div class="timeline-item"><time datetime="2007-10">Oct. 2007</time><p>Response to the pastoral calling.</p></div><div class="timeline-item"><time datetime="2008-06">June 2008</time><p>Beginning of pastoral ministry.</p></div><div class="timeline-item"><time>Today</time><p>Teaching ministry, church support and development of works in Morocco and the DRC.</p></div></div></div></section>`
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 7: Media page content module (sermons)

**Files:**
- Create: `src/pages/media.js`
- Test: `tests/pages-media.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/pages-media.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaPage } from '../src/pages/media.js';

test('media page has one h1 and three sermon cards linking to the official channel only', () => {
  assert.equal(mediaPage.key, 'media');
  for (const lang of ['fr', 'en']) {
    const page = mediaPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.equal((page.bodyHtml.match(/class="sermon"/g) || []).length, 3);
    const hrefs = page.bodyHtml.match(/href="([^"]+)"/g);
    for (const href of hrefs) {
      assert.match(href, /youtube\.com\/@andyphilippeshembo/);
    }
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/pages-media.test.js`
Expected: FAIL because `src/pages/media.js` does not exist.

- [ ] **Step 3: Implement the media page content module**

```js
// src/pages/media.js
export const mediaPage = {
  key: 'media',
  fr: {
    title: 'Philippe A. Shembo | Prédications',
    description: 'Retrouvez les prédications récentes de Philippe A. Shembo sur la chaîne officielle YouTube.',
    ogTitle: 'Philippe A. Shembo | Prédications',
    ogDescription: 'Retrouvez les prédications récentes de Philippe A. Shembo sur la chaîne officielle YouTube.',
    bodyHtml: `      <section class="section section--violet"><div class="shell"><p class="eyebrow">Médias</p><h1 class="section-title">Prédications récentes</h1><p class="section-intro">Retrouvez les messages publiés sur la chaîne officielle de Philippe A. Shembo.</p><div class="sermon-grid">
        <a class="sermon" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer"><span>Prédication récente</span><h3>Titre à renseigner</h3></a>
        <a class="sermon" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer"><span>Prédication récente</span><h3>Titre à renseigner</h3></a>
        <a class="sermon" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer"><span>Prédication récente</span><h3>Titre à renseigner</h3></a>
      </div><p><a class="button button--ghost" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">Visiter la chaîne YouTube</a></p></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Sermons',
    description: "Find Philippe A. Shembo's recent sermons on the official YouTube channel.",
    ogTitle: 'Philippe A. Shembo | Sermons',
    ogDescription: "Find Philippe A. Shembo's recent sermons on the official YouTube channel.",
    bodyHtml: `      <section class="section section--violet"><div class="shell"><p class="eyebrow">Media</p><h1 class="section-title">Recent sermons</h1><p class="section-intro">Find messages published on Philippe A. Shembo’s official channel.</p><div class="sermon-grid">
        <a class="sermon" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer"><span>Recent sermon</span><h3>Title to be provided</h3></a>
        <a class="sermon" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer"><span>Recent sermon</span><h3>Title to be provided</h3></a>
        <a class="sermon" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer"><span>Recent sermon</span><h3>Title to be provided</h3></a>
      </div><p><a class="button button--ghost" href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">Visit YouTube channel</a></p></div></section>`
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 8: Bibliography page content module (books)

**Files:**
- Create: `src/pages/bibliography.js`
- Test: `tests/pages-bibliography.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/pages-bibliography.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { bibliographyPage } from '../src/pages/bibliography.js';

test('bibliography page has one h1 and six lazy-loaded book covers', () => {
  assert.equal(bibliographyPage.key, 'bibliography');
  for (const lang of ['fr', 'en']) {
    const page = bibliographyPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.equal((page.bodyHtml.match(/class="book"/g) || []).length, 6);
    assert.equal((page.bodyHtml.match(/loading="lazy"/g) || []).length, 6);
    assert.match(page.bodyHtml, /lampeamespieds\.com/);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/pages-bibliography.test.js`
Expected: FAIL because `src/pages/bibliography.js` does not exist.

- [ ] **Step 3: Implement the bibliography page content module**

```js
// src/pages/bibliography.js
const frBookCard = (n) => `<article class="book"><img src="/assets/books/book-${n}.webp" width="1080" height="1080" alt="Couverture d’ouvrage de Philippe A. Shembo — titre à renseigner" loading="lazy" decoding="async"><div><h3>Titre à renseigner</h3><p>Fiche à renseigner</p></div></article>`;
const enBookCard = (n) => `<article class="book"><img src="/assets/books/book-${n}.webp" width="1080" height="1080" alt="Book cover by Philippe A. Shembo — title to be provided" loading="lazy" decoding="async"><div><h3>Title to be provided</h3><p>Details to be provided</p></div></article>`;
const NUMBERS = ['01', '02', '03', '04', '05', '06'];

export const bibliographyPage = {
  key: 'bibliography',
  fr: {
    title: 'Philippe A. Shembo | Bibliographie',
    description: 'Découvrez les ouvrages publiés par Philippe A. Shembo aux Éditions Lampe à mes Pieds.',
    ogTitle: 'Philippe A. Shembo | Bibliographie',
    ogDescription: 'Découvrez les ouvrages publiés par Philippe A. Shembo aux Éditions Lampe à mes Pieds.',
    bodyHtml: `      <section class="section section--sand"><div class="shell"><p class="eyebrow">Éditions Lampe à mes Pieds</p><h1 class="section-title">Des ouvrages pour grandir et agir.</h1><p class="section-intro">Une sélection visuelle. Les fiches, résumés et liens d’achat seront complétés par l’équipe éditoriale.</p><div class="books">
        ${NUMBERS.map(frBookCard).join('\n        ')}
      </div><p><a class="button" href="https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT" target="_blank" rel="noopener noreferrer">Découvrir les ouvrages</a></p></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Bibliography',
    description: 'Discover the books published by Philippe A. Shembo through Lampe à mes Pieds Publishing.',
    ogTitle: 'Philippe A. Shembo | Bibliography',
    ogDescription: 'Discover the books published by Philippe A. Shembo through Lampe à mes Pieds Publishing.',
    bodyHtml: `      <section class="section section--sand"><div class="shell"><p class="eyebrow">Lampe à mes Pieds Publishing</p><h1 class="section-title">Books to grow and act.</h1><p class="section-intro">A visual selection. Book details and purchase links will be completed by the editorial team.</p><div class="books">
        ${NUMBERS.map(enBookCard).join('\n        ')}
      </div><p><a class="button" href="https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT" target="_blank" rel="noopener noreferrer">Discover the books</a></p></div></section>`
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 9: Support page content module

**Files:**
- Create: `src/pages/support.js`
- Test: `tests/pages-support.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/pages-support.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { supportPage } from '../src/pages/support.js';

test('support page keeps all placeholders as plain text and links contact as a real page', () => {
  assert.equal(supportPage.key, 'support');
  for (const lang of ['fr', 'en']) {
    const page = supportPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.equal((page.bodyHtml.match(/class="support-card"/g) || []).length, 3);
    assert.ok(!page.bodyHtml.includes('href="#'));
  }
  assert.match(supportPage.fr.bodyHtml, /href="\/contact\/"/);
  assert.match(supportPage.en.bodyHtml, /href="\/en\/contact\/"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/pages-support.test.js`
Expected: FAIL because `src/pages/support.js` does not exist.

- [ ] **Step 3: Implement the support page content module**

```js
// src/pages/support.js
export const supportPage = {
  key: 'support',
  fr: {
    title: 'Philippe A. Shembo | Soutenir le ministère',
    description: 'Soutenez le ministère de Philippe A. Shembo : moyens de soutien vérifiés par l’équipe.',
    ogTitle: 'Philippe A. Shembo | Soutenir le ministère',
    ogDescription: 'Soutenez le ministère de Philippe A. Shembo : moyens de soutien vérifiés par l’équipe.',
    bodyHtml: `      <section class="section section--violet"><div class="shell"><p class="eyebrow">Soutenir le ministère</p><h1 class="section-title">Porter plus loin la vision.</h1><p class="section-intro">Votre soutien contribue au rayonnement du ministère, à la formation et aux œuvres menées sur le terrain. Utilisez uniquement les coordonnées confirmées par l’équipe.</p><div class="support-grid">
        <article class="support-card"><h3>Virement bancaire</h3><dl><dt>Banque</dt><dd>[À renseigner]</dd><dt>Titulaire</dt><dd>[À renseigner]</dd><dt>IBAN</dt><dd>[À renseigner]</dd><dt>BIC / SWIFT</dt><dd>[À renseigner]</dd></dl></article>
        <article class="support-card"><h3>Mobile money</h3><dl><dt>Opérateur</dt><dd>[À renseigner]</dd><dt>Numéro</dt><dd>[À renseigner]</dd><dt>Bénéficiaire</dt><dd>[À renseigner]</dd></dl></article>
        <article class="support-card"><h3>Autre moyen</h3><dl><dt>Nom</dt><dd>[À renseigner]</dd><dt>Devise</dt><dd>[À renseigner]</dd><dt>Instructions</dt><dd>[À renseigner]</dd></dl></article>
      </div><p class="support-note">Avant tout versement, vérifiez les coordonnées auprès du ministère. Aucune information de carte bancaire n’est demandée sur ce site.</p><p><a class="button" href="/contact/">Contacter le ministère</a></p></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Support the ministry',
    description: "Support Philippe A. Shembo's ministry through means verified by the team.",
    ogTitle: 'Philippe A. Shembo | Support the ministry',
    ogDescription: "Support Philippe A. Shembo's ministry through means verified by the team.",
    bodyHtml: `      <section class="section section--violet"><div class="shell"><p class="eyebrow">Support the ministry</p><h1 class="section-title">Carry the vision further.</h1><p class="section-intro">Your support contributes to the ministry’s reach, training and works on the ground. Use only details confirmed by the ministry team.</p><div class="support-grid">
        <article class="support-card"><h3>Bank transfer</h3><dl><dt>Bank</dt><dd>[To be provided]</dd><dt>Account holder</dt><dd>[To be provided]</dd><dt>IBAN</dt><dd>[To be provided]</dd><dt>BIC / SWIFT</dt><dd>[To be provided]</dd></dl></article>
        <article class="support-card"><h3>Mobile money</h3><dl><dt>Operator</dt><dd>[To be provided]</dd><dt>Number</dt><dd>[To be provided]</dd><dt>Beneficiary</dt><dd>[To be provided]</dd></dl></article>
        <article class="support-card"><h3>Other method</h3><dl><dt>Name</dt><dd>[To be provided]</dd><dt>Currency</dt><dd>[To be provided]</dd><dt>Instructions</dt><dd>[To be provided]</dd></dl></article>
      </div><p class="support-note">Before giving, confirm these details directly with the ministry. This website never requests card details.</p><p><a class="button" href="/en/contact/">Contact the ministry</a></p></div></section>`
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 10: Contact page content module

**Files:**
- Create: `src/pages/contact.js`
- Test: `tests/pages-contact.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/pages-contact.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { contactPage } from '../src/pages/contact.js';

test('contact page has one h1 and all four official social links', () => {
  assert.equal(contactPage.key, 'contact');
  for (const lang of ['fr', 'en']) {
    const page = contactPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.match(page.bodyHtml, /youtube\.com\/@andyphilippeshembo/);
    assert.match(page.bodyHtml, /facebook\.com\/PasteurPhilippeShembo/);
    assert.match(page.bodyHtml, /instagram\.com\/pasteur\.philippe\.a\.shembo/);
    assert.match(page.bodyHtml, /linkedin\.com\/in\/philippe-a-shembo-28920733b/);
    assert.ok(page.bodyHtml.includes('[À renseigner]') || page.bodyHtml.includes('[To be provided]'));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/pages-contact.test.js`
Expected: FAIL because `src/pages/contact.js` does not exist.

- [ ] **Step 3: Implement the contact page content module**

```js
// src/pages/contact.js
export const contactPage = {
  key: 'contact',
  fr: {
    title: 'Philippe A. Shembo | Contact',
    description: 'Contactez le ministère de Philippe A. Shembo ou suivez-le sur les réseaux officiels.',
    ogTitle: 'Philippe A. Shembo | Contact',
    ogDescription: 'Contactez le ministère de Philippe A. Shembo ou suivez-le sur les réseaux officiels.',
    bodyHtml: `      <section class="section section--sand"><div class="shell contact-box"><p class="eyebrow">Restons connectés</p><h1>Suivez le ministère et restons en lien.</h1><p>Pour toute demande officielle, invitation ou renseignement, les coordonnées de contact seront ajoutées par l’équipe du ministère.</p><p><strong>Contact :</strong> [À renseigner]</p><div class="socials"><a href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">YouTube</a><a href="https://www.facebook.com/PasteurPhilippeShembo" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.instagram.com/pasteur.philippe.a.shembo/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.linkedin.com/in/philippe-a-shembo-28920733b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Contact',
    description: "Contact Philippe A. Shembo's ministry or follow official social channels.",
    ogTitle: 'Philippe A. Shembo | Contact',
    ogDescription: "Contact Philippe A. Shembo's ministry or follow official social channels.",
    bodyHtml: `      <section class="section section--sand"><div class="shell contact-box"><p class="eyebrow">Stay connected</p><h1>Follow the ministry and stay in touch.</h1><p>For official requests, invitations or information, contact details will be added by the ministry team.</p><p><strong>Contact:</strong> [To be provided]</p><div class="socials"><a href="https://www.youtube.com/@andyphilippeshembo" target="_blank" rel="noopener noreferrer">YouTube</a><a href="https://www.facebook.com/PasteurPhilippeShembo" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.instagram.com/pasteur.philippe.a.shembo/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.linkedin.com/in/philippe-a-shembo-28920733b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></section>`
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

---

## Task 11: Build script — generate all 12 pages

**Files:**
- Create: `scripts/build-pages.mjs`
- Modify: `package.json` (add `"build"` script)

**Interfaces:**
- Consumes: `renderPage` (Task 4), `NAV_ITEMS`/`HOME_PATH` (Task 1), all six page content modules (Tasks 5–10).
- Produces: the 12 generated HTML files on disk, at their final served paths.

- [ ] **Step 1: Implement the build script**

```js
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
```

- [ ] **Step 2: Add the build script to package.json**

In `package.json`, add a `"build"` entry to `"scripts"`:

```json
"build": "node scripts/build-pages.mjs",
```

- [ ] **Step 3: Run the build**

Run: `npm run build`
Expected: Output lists 12 written files ending with `Generated 12 pages`, and `index.html`, `en/index.html`, `a-propos/index.html`, `espace-medias/index.html`, `bibliographie/index.html`, `soutenir/index.html`, `contact/index.html`, `en/about/index.html`, `en/media/index.html`, `en/bibliography/index.html`, `en/support/index.html`, `en/contact/index.html` all exist on disk.

- [ ] **Step 4: Spot-check two generated files by hand**

Open `a-propos/index.html` and confirm: `<html lang="fr">`, a single `<h1>Servir, former, bâtir.</h1>`, the header nav shows `À Propos` with `aria-current="page"`, and the language switcher link points to `/en/about/`.

Open `en/support/index.html` and confirm: `<html lang="en">`, the "Contact the ministry" button links to `/en/contact/` (not `#contact`), and the language switcher points to `/soutenir/`.

---

## Task 12: Replace landing.spec.js with the multi-page test suite

**Files:**
- Modify: `tests/landing.spec.js`

**Interfaces:**
- None — this is the end-to-end verification of Tasks 1–11 together.

- [ ] **Step 1: Replace the file contents**

```js
// tests/landing.spec.js
import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', lang: 'fr' },
  { path: '/a-propos/', lang: 'fr' },
  { path: '/espace-medias/', lang: 'fr' },
  { path: '/bibliographie/', lang: 'fr' },
  { path: '/soutenir/', lang: 'fr' },
  { path: '/contact/', lang: 'fr' },
  { path: '/en/', lang: 'en' },
  { path: '/en/about/', lang: 'en' },
  { path: '/en/media/', lang: 'en' },
  { path: '/en/bibliography/', lang: 'en' },
  { path: '/en/support/', lang: 'en' },
  { path: '/en/contact/', lang: 'en' }
];

for (const { path: pagePath, lang } of PAGES) {
  test(`${pagePath} has a single h1, skip link, correct lang and canonical`, async ({ page }) => {
    await page.goto(pagePath);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('a.skip-link')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
}

const LANGUAGE_PAIRS = [
  ['/', '/en/'],
  ['/a-propos/', '/en/about/'],
  ['/espace-medias/', '/en/media/'],
  ['/bibliographie/', '/en/bibliography/'],
  ['/soutenir/', '/en/support/'],
  ['/contact/', '/en/contact/']
];

for (const [frPath, enPath] of LANGUAGE_PAIRS) {
  test(`language switch on ${frPath} maps to ${enPath}`, async ({ page }) => {
    await page.goto(frPath);
    await expect(page.locator('.language a', { hasText: 'EN' })).toHaveAttribute('href', enPath);
    await page.goto(enPath);
    await expect(page.locator('.language a', { hasText: 'FR' })).toHaveAttribute('href', frPath);
  });
}

test('French home nav has no anchor links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href^="#"]')).toHaveCount(0);
});

test('nav highlights the current page with aria-current', async ({ page }) => {
  await page.goto('/a-propos/');
  await expect(page.locator('nav a[href="/a-propos/"]')).toHaveAttribute('aria-current', 'page');
});
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test && npx playwright test`
Expected: PASS — all `node:test` files (Tasks 1–10) and all Playwright tests (12 structural checks, 6 language-mapping checks, 1 no-anchor check, 1 aria-current check) pass.

---

## Task 13: Update the sitemap for 12 URLs

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Replace the file contents**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Replace example.org before production -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.org/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/a-propos/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/a-propos/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/about/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/espace-medias/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/espace-medias/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/media/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/bibliographie/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/bibliographie/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/bibliography/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/soutenir/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/soutenir/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/support/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/contact/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/contact/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/contact/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/en/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/en/about/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/a-propos/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/about/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/en/media/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/espace-medias/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/media/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/en/bibliography/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/bibliographie/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/bibliography/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/en/support/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/soutenir/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/support/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
  <url>
    <loc>https://example.org/en/contact/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.org/contact/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://example.org/en/contact/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.org/" />
  </url>
</urlset>
```

No automated test for this file (static XML, not exercised by the browser test suite); verify by eye that all 12 `<loc>` entries match the paths used in Task 12's `PAGES` array.

---

## Task 14: Update documentation (CLAUDE.md, publishing checklist, README)

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/publishing-checklist.md`
- Modify: `README.md`

- [ ] **Step 1: Rewrite the architecture section of CLAUDE.md**

Replace the paragraph starting "Bilingual (FR/EN) static ministry landing site..." through the end of the "What this is" section, and the "Architecture" section's first two bullets, with:

```markdown
## What this is

Bilingual (FR/EN) static ministry site for Philippe A. Shembo. 12 HTML pages (6 logical pages × FR/EN) are generated by `scripts/build-pages.mjs` from shared header/footer partials and per-page content modules, then committed at their final served paths — no framework, no template engine, no separate `dist/` output. Run `npm run build` after any change to `src/partials/`, `src/data/nav-config.js`, or any `src/pages/*.js` module, before committing.

Spec and plan (authoritative for editorial rules, placeholder policy, and design tokens): `docs/superpowers/specs/2026-08-26-philippe-shembo-landing-design.md`, `docs/superpowers/specs/2026-08-26-multi-page-navigation-design.md`, and their paired implementation plans in `docs/superpowers/plans/`.
```

And replace the first two bullets of "Architecture" with:

```markdown
- `scripts/build-pages.mjs` — generates all 12 pages by calling `renderPage()` (`src/build/render-page.js`) once per page × language, writing each to its final served path (e.g. `a-propos/index.html`). Run `npm run build` before serving or committing after any content/nav/partial change.
- `src/data/nav-config.js` — single source of truth for the 5 section pages' nav labels and FR/EN paths, plus the home path. `src/partials/header.js` and `src/partials/footer.js` render the shared chrome from it. `src/pages/*.js` hold the per-page title/description/OG/body content for each of the 6 logical pages (home, about, media, bibliography, support, contact), written by hand in both languages (no automated translation).
```

- [ ] **Step 2: Update docs/publishing-checklist.md locations**

In the "Valeurs à confirmer" table, update the "Emplacement(s)" column:

- Row **Email de contact**: change to `src/pages/contact.js`, `contact/index.html`/`en/contact/index.html`
- Row **Banque**: change to `src/pages/support.js`, `soutenir/index.html`/`en/support/index.html`
- Row **Mobile money**: change to `src/pages/support.js`, `soutenir/index.html`/`en/support/index.html`
- Row **Autre moyen de soutien**: change to `src/pages/support.js`
- Row **book URL**: change to `src/pages/bibliography.js`, `bibliographie/index.html`/`en/bibliography/index.html`
- Row **sermon URL**: change to `src/pages/media.js`, `espace-medias/index.html`/`en/media/index.html`

- [ ] **Step 3: Update README.md commands and pipeline description**

In the "Commandes locales" list, add after the `npm run assets` line:

```markdown
- `npm run build` — régénère les 12 pages HTML (`scripts/build-pages.mjs`) à partir de `src/partials/`, `src/data/nav-config.js` et `src/pages/*.js`. À relancer avant de committer tout changement de navigation, de pied de page ou de contenu de page.
```

In the "Pipeline d'assets et propriété des fichiers" list, add a bullet:

```markdown
- `src/pages/*.js`, `src/partials/*.js`, `src/build/render-page.js` — source de vérité du contenu et de l'assemblage des pages ; `scripts/build-pages.mjs` les combine pour écrire les 12 fichiers HTML finaux (committés, pas dans un dossier `dist/`).
```

- [ ] **Step 4: Verify the checklist test still passes**

Run: `npm test`
Expected: PASS — `editor checklist names every production-only value` in `tests/site-content.test.js` still matches `domain`, `iban`, `mobile money`, `email`, `book url`, `sermon url` as substrings of the updated checklist (the table's value-description column text is unchanged; only the location column changed).

---

## Task 15: Final full verification

**Files:** none (verification only)

- [ ] **Step 1: Regenerate assets and pages, then run every test**

Run:

```bash
npm run assets
npm run build
npm test
npx playwright test
```

Expected: `npm run assets` reports 17 copied resources; `npm run build` reports `Generated 12 pages`; `npm test` passes every `tests/*.test.js` file (nav-config, partials, site-script, render-page, pages-home, pages-about, pages-media, pages-bibliography, pages-support, pages-contact, site-content); `npx playwright test` passes all Task 12 tests.

- [ ] **Step 2: Manual smoke check**

Run `npm run serve`, then in a browser visit `/`, click through to each of the 5 nav links, confirm each lands on a real page (URL bar shows a path, not a `#fragment`), the active nav item is highlighted gold, and the FR/EN switcher on a subpage (e.g. `/soutenir/`) lands on the correct mirrored subpage (`/en/support/`), not the other language's home page.
