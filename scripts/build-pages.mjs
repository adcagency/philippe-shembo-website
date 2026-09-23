// scripts/build-pages.mjs
import { mkdir, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import { renderPage } from '../src/build/render-page.js';
import { pathFor } from '../src/data/nav-config.js';
import { homePage } from '../src/pages/home.js';
import { aboutPage } from '../src/pages/about.js';
import { mediaPage } from '../src/pages/media.js';
import { bibliographyPage } from '../src/pages/bibliography.js';
import { supportPage } from '../src/pages/support.js';
import { contactPage } from '../src/pages/contact.js';
import { legalPage } from '../src/pages/legal.js';
import { blogPage } from '../src/pages/blog.js';
import { createBlogPostPage } from '../src/pages/blog-post.js';
import { getBlogPosts } from '../src/data/blog-service.js';

const root = process.cwd();
const STATIC_PAGES = [homePage, aboutPage, mediaPage, bibliographyPage, blogPage, supportPage, contactPage, legalPage];

let totalGenerated = 0;

// 1. Pages statiques principales (Home, About, Media, Bibliography, Blog, Support, Contact, Legal)
for (const page of STATIC_PAGES) {
  for (const lang of ['fr', 'en']) {
    const html = renderPage({ lang, pageKey: page.key, ...page[lang] });
    const relPath = pathFor(page.key, lang);

    // Write to root
    const rootPath = path.join(root, relPath, 'index.html');
    await mkdir(path.dirname(rootPath), { recursive: true });
    await writeFile(rootPath, html, 'utf8');

    // Write to public/ for Vercel
    const publicPath = path.join(root, 'public', relPath, 'index.html');
    await mkdir(path.dirname(publicPath), { recursive: true });
    await writeFile(publicPath, html, 'utf8');

    totalGenerated++;
    console.log(`Wrote ${relPath}`);
  }
}

// 2. Articles individuels de blog
for (const lang of ['fr', 'en']) {
  const posts = getBlogPosts(lang);
  for (const post of posts) {
    const postPageData = createBlogPostPage(post, lang);
    const html = renderPage({ lang, ...postPageData });
    const relPath = pathFor('blog-post', lang, post.slug);

    // Write to root
    const rootPath = path.join(root, relPath, 'index.html');
    await mkdir(path.dirname(rootPath), { recursive: true });
    await writeFile(rootPath, html, 'utf8');

    // Write to public/ for Vercel
    const publicPath = path.join(root, 'public', relPath, 'index.html');
    await mkdir(path.dirname(publicPath), { recursive: true });
    await writeFile(publicPath, html, 'utf8');

    totalGenerated++;
    console.log(`Wrote article ${relPath}`);
  }
}

// 3. S'assurer que admin/ est aussi présent à la racine pour "npm run serve"
await cp(path.join(root, 'public', 'admin'), path.join(root, 'admin'), { recursive: true });

// Ensure src/ (styles & scripts) is copied to public/src/
await cp(path.join(root, 'src'), path.join(root, 'public', 'src'), { recursive: true });

// Ensure robots.txt, sitemap.xml and og/ exist at root for static server
await cp(path.join(root, 'public', 'robots.txt'), path.join(root, 'robots.txt'));
await cp(path.join(root, 'public', 'sitemap.xml'), path.join(root, 'sitemap.xml'));
await cp(path.join(root, 'public', 'og'), path.join(root, 'og'), { recursive: true });

console.log(`Successfully generated ${totalGenerated} pages (including blog posts).`);
