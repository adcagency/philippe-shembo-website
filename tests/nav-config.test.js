// tests/nav-config.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { NAV_ITEMS, HOME_PATH, pathFor } from '../src/data/nav-config.js';

test('nav config has the section pages including blog with fr/en paths', () => {
  assert.equal(NAV_ITEMS.length, 6);
  const keys = NAV_ITEMS.map((item) => item.key).sort();
  assert.deepEqual(keys, ['about', 'bibliography', 'blog', 'contact', 'media', 'support']);
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
  assert.equal(pathFor('legal', 'fr'), '/mentions-legales/');
  assert.equal(pathFor('legal', 'en'), '/en/legal/');
  assert.equal(pathFor('about', 'fr'), '/a-propos/');
  assert.equal(pathFor('about', 'en'), '/en/about/');
  assert.equal(pathFor('blog', 'fr'), '/blog/');
  assert.equal(pathFor('blog', 'en'), '/en/blog/');
  assert.equal(pathFor('blog-post', 'fr', 'mon-article'), '/blog/mon-article/');
  assert.equal(pathFor('blog-post', 'en', 'my-post'), '/en/blog/my-post/');
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
  assert.equal(byKey.blog.fr.path, '/blog/');
  assert.equal(byKey.blog.en.path, '/en/blog/');
  assert.equal(byKey.support.fr.path, '/soutenir/');
  assert.equal(byKey.support.en.path, '/en/support/');
  assert.equal(byKey.contact.fr.path, '/contact/');
  assert.equal(byKey.contact.en.path, '/en/contact/');
});
