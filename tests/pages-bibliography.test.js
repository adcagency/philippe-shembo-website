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
