# Philippe A. Shembo Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, accessible French/English ministry landing page that presents Philippe A. Shembo’s work, sermons, books, support details, and official networks.

**Architecture:** Use a dependency-light static site: two complete HTML documents, a shared CSS design system, a tiny JavaScript module for navigation and language-preserving anchors, and a central content module. Keep all publishable assets under `public/assets/`, copied from the user-provided source folder without modifying originals. Generate sitemap, robots and schema in static files so indexing works without JavaScript.

**Tech Stack:** HTML5, CSS custom properties, native JavaScript ES modules, Node.js built-in test runner, Playwright for browser smoke tests, Sharp for reproducible WebP/AVIF derivatives.

**Spec:** `docs/superpowers/specs/2026-08-26-philippe-shembo-landing-design.md`

## Global Constraints

- Default language is French at `/`; English is `/en/`, with canonical and reciprocal `hreflang` tags.
- Use only provided portrait, logo, motifs and book covers; never modify the original `Ressources/` files.
- Use `#4B0082`, `#D4AF37`, `#EAEAEA`, `#1C1C1C`, `#FFFFFF`; do not use gold normal text on white.
- Use Playfair Display for headings and Lato for body copy; use Antonio only for uppercase labels.
- Every contributor-supplied business value uses the literal marker `[À renseigner]` until supplied: book title, description, purchase URL, bank and mobile money details, email/contact endpoint and domain.
- Do not invent sermons, testimonials, prices, donation instructions, book metadata, contact data or legal claims.
- Support must never collect card details; it presents verified bank/mobile-money values or routes to contact.
- Meet WCAG AA normal-text contrast, keyboard navigation, a skip link, visible focus and `prefers-reduced-motion` support.
- Test at 375, 768, 1024 and 1440 CSS pixels; avoid CLS by declaring image dimensions/aspect ratios.

---

## File Structure

```text
public/
  assets/
    brand/logo-pas.png
    portraits/philippe-shembo-hero.png
    patterns/pas-pattern-01.png
    books/book-01.png … book-14.png
    og/philippe-shembo-fr.png
    og/philippe-shembo-en.png
  favicon.svg
  robots.txt
  sitemap.xml
src/
  data/site-content.js
  scripts/site.js
  styles/main.css
index.html
en/index.html
package.json
tests/site-content.test.js
tests/landing.spec.js
scripts/optimize-assets.mjs
```

`site-content.js` is the only source of repeatable editorial data. `site.js` owns only progressive enhancements. HTML owns semantic structure and can be read/indexed with JavaScript disabled. `main.css` owns tokens, layout and responsive behavior. `optimize-assets.mjs` copies source files into the publish directory and emits optimized derivatives; source images remain untouched.

### Task 1: Create reproducible static-site workspace and asset pipeline

**Files:**
- Create: `package.json`
- Create: `scripts/optimize-assets.mjs`
- Create: `src/data/site-content.js`
- Create: `tests/site-content.test.js`
- Create: `.gitignore`

**Interfaces:**
- Produces `SITE_CONTENT` exported by `src/data/site-content.js`.
- `SITE_CONTENT.support` has keys `bank`, `mobileMoney`, `other`, each containing literal `[À renseigner]` values.
- `npm run assets` generates all files under `public/assets/` from `Ressources/`.

- [ ] **Step 1: Write failing content-contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONTENT } from '../src/data/site-content.js';

test('content contains only official social URLs and explicit unfinished values', () => {
  assert.equal(SITE_CONTENT.social.youtube, 'https://www.youtube.com/@andyphilippeshembo');
  assert.equal(SITE_CONTENT.books.length, 14);
  assert.equal(SITE_CONTENT.support.bank.iban, '[À renseigner]');
  assert.equal(SITE_CONTENT.contact.email, '[À renseigner]');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site-content.test.js`

Expected: FAIL because `src/data/site-content.js` does not exist.

- [ ] **Step 3: Add package scripts and minimal content module**

```json
{
  "type": "module",
  "scripts": {
    "assets": "node scripts/optimize-assets.mjs",
    "test": "node --test tests/site-content.test.js",
    "test:e2e": "playwright test",
    "serve": "npx serve . -l 4173"
  },
  "devDependencies": { "@playwright/test": "^1.55.0", "sharp": "^0.34.3", "serve": "^14.2.4" }
}
```

```js
export const SITE_CONTENT = {
  social: {
    facebook: 'https://www.facebook.com/PasteurPhilippeShembo',
    instagram: 'https://www.instagram.com/pasteur.philippe.a.shembo/',
    linkedin: 'https://www.linkedin.com/in/philippe-a-shembo-28920733b/',
    youtube: 'https://www.youtube.com/@andyphilippeshembo'
  },
  books: Array.from({ length: 14 }, (_, index) => ({
    image: `/assets/books/book-${String(index + 1).padStart(2, '0')}.png`,
    title: '[À renseigner]', description: '[À renseigner]', url: '[À renseigner]'
  })),
  support: {
    bank: { bank: '[À renseigner]', holder: '[À renseigner]', iban: '[À renseigner]', swift: '[À renseigner]' },
    mobileMoney: { operator: '[À renseigner]', number: '[À renseigner]', beneficiary: '[À renseigner]' },
    other: { name: '[À renseigner]', url: '[À renseigner]', currency: '[À renseigner]' }
  },
  contact: { email: '[À renseigner]' }
};
```

- [ ] **Step 4: Implement deterministic copying and optimization**

`optimize-assets.mjs` must map the portrait to `portraits/philippe-shembo-hero.png`, first logo to `brand/logo-pas.png`, first motif to `patterns/pas-pattern-01.png`, and `42.png` through `94.png` to `books/book-01.png` through `books/book-14.png`. It creates parent directories, copies original PNG files, and creates WebP derivatives with `sharp().webp({ quality: 82 })`. It must throw a clear error if a required resource is missing.

- [ ] **Step 5: Run contract test and asset pipeline**

Run: `npm install && npm test && npm run assets`

Expected: PASS. `public/assets/` contains 17 copied PNG resources and matching `.webp` derivatives.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .gitignore scripts/ src/data/ tests/ public/assets/
git commit -m "chore: scaffold landing content and assets"
```

### Task 2: Build shared visual system and accessible responsive layout

**Files:**
- Create: `src/styles/main.css`
- Create: `index.html`
- Create: `en/index.html`
- Create: `src/scripts/site.js`

**Interfaces:**
- Both HTML pages import `/src/styles/main.css` and `/src/scripts/site.js`.
- Every navigation target uses an existing section ID: `ministry`, `sermons`, `books`, `support`, `contact`.
- `data-i18n-url` gives matching language-path and matching fragment.

- [ ] **Step 1: Write failing structural browser test**

```js
import { test, expect } from '@playwright/test';

test('French landing has semantic navigation and a single h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('a[href="#ministry"]')).toBeVisible();
  await expect(page.locator('a.skip-link')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/landing.spec.js`

Expected: FAIL because landing documents do not exist.

- [ ] **Step 3: Implement semantic HTML shells**

Both pages contain, in this order: skip link; sticky header; `main`; hero; metrics; vision; ministry cards; sermon region; book region; support region; biography; contact; footer. Use semantic `header`, `nav`, `section`, `article`, `figure`, `footer`; use one `h1`; use `h2` for each section. Include `lang`, viewport, canonical, reciprocal `hreflang`, unique title, meta description, Open Graph tags and static JSON-LD Person data.

French hero copy:

```html
<p class="eyebrow">Pasteur · Auteur · Formateur</p>
<h1>Équiper une génération pour influencer son temps.</h1>
<p>Découvrez le ministère, les enseignements et les ouvrages de Philippe A. Shembo.</p>
```

English hero copy:

```html
<p class="eyebrow">Pastor · Author · Trainer</p>
<h1>Equipping a generation to influence its time.</h1>
<p>Discover the ministry, teachings and books of Philippe A. Shembo.</p>
```

- [ ] **Step 4: Implement token-based CSS**

Define `:root` tokens for supplied colors, fonts, spacing and focus ring. Import Playfair Display, Lato and Antonio using one Google Fonts request with `display=swap`. Use CSS Grid for hero and ministry cards; a horizontal book rail that becomes a grid at 768 px; a mobile menu at `max-width: 767px`; declared portrait aspect ratio `667 / 1000`; `@media (prefers-reduced-motion: reduce)` disabling smooth scrolling and transition animation.

- [ ] **Step 5: Implement progressive enhancement script**

`site.js` toggles one mobile navigation button with `aria-expanded`, closes it on `Escape`, and updates same-page language links to preserve current anchor. It must not insert content or hide any content required for indexing.

- [ ] **Step 6: Run browser test and visual breakpoints**

Run: `npx playwright test tests/landing.spec.js --project=chromium`

Expected: PASS. Capture screenshots at 375, 768, 1024 and 1440 px; confirm no horizontal overflow and visible focus after keyboard Tab.

- [ ] **Step 7: Commit**

```bash
git add index.html en/index.html src/styles/main.css src/scripts/site.js tests/landing.spec.js
git commit -m "feat: add responsive bilingual landing shell"
```

### Task 3: Populate verified ministry, books, support and network sections

**Files:**
- Modify: `index.html`
- Modify: `en/index.html`
- Modify: `src/data/site-content.js`
- Modify: `tests/site-content.test.js`

**Interfaces:**
- Reads static text from `SITE_CONTENT` only for social URLs, book cards and support detail placeholders.
- Exposes external links with `target="_blank" rel="noopener noreferrer"` and a visible external-link label.

- [ ] **Step 1: Write failing content-safety test**

```js
test('support and book placeholders remain explicit until an editor changes them', () => {
  assert.ok(SITE_CONTENT.books.every((book) => book.url === '[À renseigner]'));
  assert.equal(SITE_CONTENT.support.mobileMoney.number, '[À renseigner]');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site-content.test.js`

Expected: FAIL until the content module is rendered and test includes the required assertions.

- [ ] **Step 3: Add accurate ministry content**

Write four ministry cards using the supplied biography only: Famille des Assemblées Chrétiennes au Maroc; Églises Grâce Déployée; Charisma Source Abondante in Democratic Republic of Congo; Éditions Lampe à mes Pieds. Add a timeline for October 2007 pastoral call and June 2008 pastorate. Display "17 ouvrages" as supplied, even while 14 covers are available locally; do not claim 14 is the complete catalogue.

- [ ] **Step 4: Render books and support safely**

Render six featured cover images with alt text `Couverture d'ouvrage de Philippe A. Shembo — titre à renseigner`; provide collection link `https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT`; render all missing individual values as readable `[À renseigner]` labels, not clickable dead links. Support section prints each safe placeholder with `aria-label`, and its CTA links to `#contact` until a confirmed external provider URL exists.

- [ ] **Step 5: Add official social links and contact placeholder**

Use all four official social URLs from `SITE_CONTENT`. Display email value only if it is not `[À renseigner]`; otherwise show `Contact : [À renseigner]` and no `mailto:` link.

- [ ] **Step 6: Run tests and manual link audit**

Run: `npm test && npx playwright test`

Expected: PASS. Manually confirm no purchase, payment or email placeholder is an active hyperlink.

- [ ] **Step 7: Commit**

```bash
git add index.html en/index.html src/data/site-content.js tests/site-content.test.js
git commit -m "feat: add ministry content and safe support placeholders"
```

### Task 4: Add sermons, SEO artifacts, legal baseline and performance checks

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/favicon.svg`
- Create: `public/og/README.md`
- Modify: `index.html`
- Modify: `en/index.html`
- Modify: `tests/landing.spec.js`

**Interfaces:**
- `robots.txt` points to absolute final sitemap URL only after final domain is supplied; before then it contains the literal comment `# Replace example.org before production` and example URL.
- Sermon cards link to official YouTube channel and contain no invented title, date or thumbnail.

- [ ] **Step 1: Write failing SEO test**

```js
test('English page declares canonical and alternate French page', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/landing.spec.js -g "English page declares"`

Expected: FAIL until metadata is present.

- [ ] **Step 3: Add sermon-safe section**

Add three cards labelled `Prédication récente — à renseigner` / `Recent sermon — to be provided`, each linking only to official YouTube channel. No iframe is added until three specific official video URLs are provided. Add CTA to channel.

- [ ] **Step 4: Add crawlers and sharing files**

Create a placeholder sitemap containing both `https://example.org/` and `https://example.org/en/`, each with `hreflang` alternatives. Create robots file allowing `/` and pointing at `https://example.org/sitemap.xml` with a replacement comment. Add minimal violet-and-gold SVG favicon. Document required 1200×630 French and English OG images in `public/og/README.md`; do not fabricate social card image.

- [ ] **Step 5: Verify SEO, accessibility and performance**

Run: `npm test && npx playwright test && npx lighthouse http://localhost:4173 --only-categories=performance,accessibility,seo --output=html --output-path=artifacts/lighthouse-fr.html`

Expected: all tests PASS; Lighthouse accessibility and SEO scores at least 90; performance bottlenecks documented and fixed if introduced by page code.

- [ ] **Step 6: Commit**

```bash
git add public/ index.html en/index.html tests/landing.spec.js artifacts/lighthouse-fr.html
git commit -m "feat: add SEO and sermon discovery baseline"
```

### Task 5: Publish-readiness review

**Files:**
- Create: `docs/publishing-checklist.md`
- Modify: `README.md`

**Interfaces:**
- Checklist identifies values an editor must replace before production, with exact data-module paths and HTML locations.

- [ ] **Step 1: Write failing readiness assertion**

```js
test('editor checklist names every production-only value', async () => {
  const checklist = await readFile('docs/publishing-checklist.md', 'utf8');
  for (const item of ['domain', 'IBAN', 'mobile money', 'email', 'book URL', 'sermon URL']) {
    assert.match(checklist.toLowerCase(), new RegExp(item));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site-content.test.js`

Expected: FAIL until checklist exists and is imported by the test.

- [ ] **Step 3: Document deployment and measurement handover**

`README.md` must document local commands, asset pipeline, file ownership, deployment requirement for HTTPS and redirects, Search Console domain-property verification, GA4 activation after consent, and the six privacy-safe GA4 events defined in the spec. `publishing-checklist.md` must require confirmation of all placeholders before production and tell editor not to publish bank/mobile money details unverified.

- [ ] **Step 4: Run final verification**

Run: `npm run assets && npm test && npx playwright test && npx lighthouse http://localhost:4173 --only-categories=performance,accessibility,seo`

Expected: asset generation succeeds, all tests pass, no active placeholder purchase/payment/email link exists, French and English pages have valid language metadata.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/publishing-checklist.md tests/site-content.test.js
git commit -m "docs: add landing publication checklist"
```

## Plan Self-Review

- Spec coverage: Tasks 1–5 cover bilingual pages, supplied visual identity, resource organization, ministry content, books, sermons, support, social/contact, SEO, analytics handover, accessibility and performance.
- Known staged values: support, contact, individual book links, individual sermon URLs, OG image and final domain remain literal editor-provided values by explicit product decision; no task fabricates them.
- Repository constraint: workspace currently has no Git repository. Commit steps become applicable only after `git init` is explicitly authorized or a repository is supplied.
