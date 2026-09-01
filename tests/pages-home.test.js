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

test('home page links to key section pages', () => {
  assert.match(homePage.fr.bodyHtml, /href="\/a-propos\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/espace-medias\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/bibliographie\/"/);
  assert.match(homePage.fr.bodyHtml, /href="\/contact\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/about\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/media\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/bibliography\/"/);
  assert.match(homePage.en.bodyHtml, /href="\/en\/contact\/"/);
});
