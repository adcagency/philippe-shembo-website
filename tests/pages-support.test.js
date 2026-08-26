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
