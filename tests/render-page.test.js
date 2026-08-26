import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/build/render-page.js';

const base = {
  title: 'Titre de test',
  description: 'Description de test',
  ogTitle: 'Titre OG',
  ogDescription: 'Description OG',
  bodyHtml: '<section><h1>Contenu</h1></section>'
};

test('renderPage produces a full document with correct lang, canonical and hreflang', () => {
  const html = renderPage({ lang: 'fr', pageKey: 'about', ...base });
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<html lang="fr">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.org\/a-propos\/">/);
  assert.match(html, /<link rel="alternate" hreflang="fr" href="https:\/\/example\.org\/a-propos\/">/);
  assert.match(html, /<link rel="alternate" hreflang="en" href="https:\/\/example\.org\/en\/about\/">/);
  assert.match(html, /<link rel="alternate" hreflang="x-default" href="https:\/\/example\.org\/">/);
  assert.match(html, /<title>Titre de test<\/title>/);
  assert.match(html, /<section><h1>Contenu<\/h1><\/section>/);
  assert.match(html, /src="\/src\/scripts\/site\.js"/);
});

test('renderPage resolves the home page path correctly', () => {
  const html = renderPage({ lang: 'en', pageKey: 'home', ...base });
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.org\/en\/">/);
});

test('renderPage embeds a Person JSON-LD block using the official social URLs', () => {
  const html = renderPage({ lang: 'fr', pageKey: 'contact', ...base });
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@andyphilippeshembo/);
});
