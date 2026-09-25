// tests/blog.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getBlogPosts, getBlogPostBySlug } from '../src/data/blog-service.js';
import { blogPage } from '../src/pages/blog.js';

test('getBlogPosts returns articles for french and english', () => {
  const frPosts = getBlogPosts('fr');
  const enPosts = getBlogPosts('en');

  assert.ok(Array.isArray(frPosts), 'French posts should be an array');
  assert.ok(Array.isArray(enPosts), 'English posts should be an array');

  for (const post of frPosts) {
    assert.ok(post.slug, 'Post must have a slug');
    assert.ok(post.title, 'Post must have a title');
    assert.ok(post.author, 'Post must have an author');
    assert.ok(post.category, 'Post must have a category');
    assert.ok(post.date, 'Post must have a date');
    assert.ok(post.excerpt, 'Post must have an excerpt');
    assert.ok(post.htmlContent, 'Post must have compiled htmlContent');
    assert.ok(post.readingTime, 'Post must have readingTime');
    assert.equal(post.lang, 'fr');
  }

  for (const post of enPosts) {
    assert.ok(post.title, 'English post must have a title');
    assert.equal(post.lang, 'en');
  }
});

test('getBlogPostBySlug resolves post correctly and returns null for unknown slug', () => {
  const missing = getBlogPostBySlug('article-qui-n-existe-pas', 'fr');
  assert.equal(missing, null);
});

test('blogPage has one h1 and valid bodyHtml for both languages', () => {
  assert.equal(blogPage.key, 'blog');
  for (const lang of ['fr', 'en']) {
    const data = blogPage[lang];
    assert.ok(data.title.length > 0);
    assert.ok(data.description.length > 0);
    assert.match(data.bodyHtml, /<h1 class="section-title">/);
    assert.match(data.bodyHtml, /class="blog-grid"/);
  }
});
