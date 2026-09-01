import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SITE_CONTENT } from '../src/data/site-content.js';

test('content contains only official social URLs and explicit unfinished values', () => {
  assert.equal(SITE_CONTENT.social.youtube, 'https://www.youtube.com/@andyphilippeshembo');
  assert.equal(SITE_CONTENT.books.length, 14);
  assert.equal(SITE_CONTENT.support.bank.iban, 'À venir');
  assert.equal(SITE_CONTENT.contact.email, 'contact@philippeshembo.com');
});

test('support and book purchase URLs remain explicit until an editor changes them', () => {
  assert.ok(SITE_CONTENT.books.every((book) => book.url === 'À venir'));
  assert.ok(SITE_CONTENT.books.every((book) => book.title !== 'À venir'));
  assert.equal(SITE_CONTENT.support.mobileMoney.number, 'À venir');
});

test('editor checklist names every production-only value', async () => {
  const checklist = (await readFile('docs/publishing-checklist.md', 'utf8')).toLowerCase();
  for (const item of ['domain', 'iban', 'mobile money', 'email', 'book url', 'sermon url']) {
    assert.match(checklist, new RegExp(item));
  }
});
