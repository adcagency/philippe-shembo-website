// tests/pages-contact.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { contactPage } from '../src/pages/contact.js';

test('contact page has one h1, a contact form, and official email', () => {
  assert.equal(contactPage.key, 'contact');
  for (const lang of ['fr', 'en']) {
    const page = contactPage[lang];
    assert.equal((page.bodyHtml.match(/<h1/g) || []).length, 1);
    assert.match(page.bodyHtml, /<form/);
    assert.match(page.bodyHtml, /mailto:contact@philippeshembo\.com/);
  }
});
