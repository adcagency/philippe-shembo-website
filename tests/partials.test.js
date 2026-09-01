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
  assert.match(html, /href="\/en\/support\/"/);
  assert.match(html, /href="\/soutenir\/" aria-current="page"/);
  assert.match(html, /lang-dropdown/);
  assert.match(html, /lang-menu/);
});

test('renderFooter uses the given cross-language path, not a hash', () => {
  const html = renderFooter({ lang: 'fr', otherLangPath: '/en/contact/' });
  assert.match(html, /<a href="\/en\/contact\/">English version<\/a>/);
  assert.doesNotMatch(html, /data-language-link/);
});
