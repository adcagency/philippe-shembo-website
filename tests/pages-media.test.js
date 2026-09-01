// tests/pages-media.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaPage } from '../src/pages/media.js';

test('media page has one h1 and sermon cards linking to the official channel only', () => {
  assert.equal(mediaPage.key, 'media');
  for (const lang of ['fr', 'en']) {
    const page = mediaPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.ok((page.bodyHtml.match(/class="sermon-card-modern/g) || []).length >= 4);
    const hrefs = page.bodyHtml.match(/href="([^"]+)"/g);
    for (const href of hrefs) {
      assert.match(href, /youtube\.com\/@andyphilippeshembo/);
    }
  }
});
