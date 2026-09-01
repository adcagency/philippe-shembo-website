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
    assert.match(page.bodyHtml, /mailto:contact@philippeshembo\.com/);
  }
});
