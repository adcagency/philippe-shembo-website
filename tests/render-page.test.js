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
  assert.match(html, /<link rel="canonical" href="https:\/\/philippeshembo\.com\/a-propos\/">/);
  assert.match(html, /<link rel="alternate" hreflang="fr" href="https:\/\/philippeshembo\.com\/a-propos\/">/);
  assert.match(html, /<link rel="alternate" hreflang="en" href="https:\/\/philippeshembo\.com\/en\/about\/">/);
  assert.match(html, /<link rel="alternate" hreflang="x-default" href="https:\/\/philippeshembo\.com\/a-propos\/">/);
  assert.match(html, /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/);
  assert.match(html, /<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=/);
  assert.match(html, /<title>Titre de test<\/title>/);
  assert.match(html, /<section><h1>Contenu<\/h1><\/section>/);
  assert.match(html, /src="\/src\/scripts\/site\.js"/);
});

test('renderPage resolves the home page path correctly', () => {
  const html = renderPage({ lang: 'en', pageKey: 'home', ...base });
  assert.match(html, /<link rel="canonical" href="https:\/\/philippeshembo\.com\/en\/">/);
  assert.match(html, /<link rel="alternate" hreflang="x-default" href="https:\/\/philippeshembo\.com\/">/);
});

test('renderPage embeds a Person JSON-LD block using the official social URLs', () => {
  const html = renderPage({ lang: 'fr', pageKey: 'contact', ...base });
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@andyphilippeshembo/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"@type":"ContactPage"/);
  assert.match(html, /"knowsLanguage":\["fr","en"\]/);
});

test('renderPage includes robots meta directive and high-res Open Graph / Twitter tags', () => {
  const htmlFr = renderPage({ lang: 'fr', pageKey: 'home', ...base });
  assert.match(htmlFr, /<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">/);
  assert.match(htmlFr, /<meta property="og:image" content="https:\/\/philippeshembo\.com\/og\/philippe-shembo-fr\.png">/);
  assert.match(htmlFr, /<meta property="og:image:width" content="1200">/);
  assert.match(htmlFr, /<meta property="og:image:height" content="630">/);
  assert.match(htmlFr, /<meta name="twitter:card" content="summary_large_image">/);
  assert.match(htmlFr, /<meta name="twitter:image" content="https:\/\/philippeshembo\.com\/og\/philippe-shembo-fr\.png">/);

  const htmlEn = renderPage({ lang: 'en', pageKey: 'home', ...base });
  assert.match(htmlEn, /<meta property="og:image" content="https:\/\/philippeshembo\.com\/og\/philippe-shembo-en\.png">/);
  assert.match(htmlEn, /<meta name="twitter:image" content="https:\/\/philippeshembo\.com\/og\/philippe-shembo-en\.png">/);
});


