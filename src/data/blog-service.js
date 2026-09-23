// src/data/blog-service.js
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true
});

/**
 * Lit tous les articles de blog pour une langue donnée ('fr' ou 'en')
 * @param {'fr' | 'en'} lang
 * @returns {Array<{ slug: string, lang: string, title: string, date: string, formattedDate: string, author: string, category: string, coverImage: string, excerpt: string, htmlContent: string, readingTime: string }>}
 */
export function getBlogPosts(lang = 'fr') {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const pattern = new RegExp(`\\.(${lang})\\.md$`);
  const postFiles = files.filter((f) => pattern.test(f));

  const posts = postFiles.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(rawContent);
    const slug = file.replace(`.${lang}.md`, '');

    // Formattage date
    const dateObj = data.date ? new Date(data.date) : new Date();
    const formattedDate = dateObj.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Estimation temps de lecture (200 mots / min)
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    const readingTime = lang === 'fr' ? `${minutes} min de lecture` : `${minutes} min read`;

    const htmlContent = marked.parse(content);

    return {
      slug,
      lang,
      title: data.title || '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      formattedDate,
      author: data.author || 'Apôtre Philippe Andy Shembo',
      category: data.category || 'Enseignement',
      coverImage: data.coverImage || '/assets/portraits/philippe-shembo-hero.webp',
      excerpt: data.excerpt || '',
      htmlContent,
      readingTime
    };
  });

  // Tri antéchronologique (les plus récents en premier)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Récupère un article par son slug et sa langue
 */
export function getBlogPostBySlug(slug, lang = 'fr') {
  const posts = getBlogPosts(lang);
  return posts.find((p) => p.slug === slug) || null;
}
