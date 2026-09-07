import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('site.js no longer contains the obsolete hash-preserving language-link logic', async () => {
  const source = await readFile('src/scripts/site.js', 'utf8');
  assert.ok(!source.includes('data-language-link'));
  assert.ok(!source.includes('window.location.hash'));
  assert.ok(source.includes('data-menu-button'));
});


