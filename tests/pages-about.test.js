// tests/pages-about.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { aboutPage } from '../src/pages/about.js';

test('about page has one h1, couple portrait, and narrative paragraphs without hash links', () => {
  assert.equal(aboutPage.key, 'about');
  for (const lang of ['fr', 'en']) {
    const page = aboutPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.ok(page.bodyHtml.includes('about-family-grid'));
    assert.ok(page.bodyHtml.includes('philippe-shembo-couple.webp'));
    assert.ok(page.bodyHtml.includes('about-copy'));
    assert.ok(!page.bodyHtml.includes('href="#'));
  }
});
