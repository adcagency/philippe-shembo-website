// src/pages/blog.js
import { getBlogPosts } from '../data/blog-service.js';

function renderPostCards(lang) {
  const posts = getBlogPosts(lang);
  if (posts.length === 0) {
    return lang === 'fr'
      ? `<p class="text-center">Aucun article publié pour le moment.</p>`
      : `<p class="text-center">No articles published yet.</p>`;
  }

  return posts.map((post) => {
    const postUrl = lang === 'fr' ? `/blog/${post.slug}/` : `/en/blog/${post.slug}/`;
    const readLabel = lang === 'fr' ? "Lire l'article" : "Read article";
    return `
      <article class="blog-card reveal-on-scroll">
        <a href="${postUrl}" class="blog-card-media" aria-label="${post.title}">
          <img src="${post.coverImage}" alt="${post.title}" width="600" height="400" loading="lazy" decoding="async">
          <span class="blog-card-badge">${post.category}</span>
        </a>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <time datetime="${post.date}">${post.formattedDate}</time>
            <span aria-hidden="true">•</span>
            <span>${post.readingTime}</span>
          </div>
          <h2 class="blog-card-title">
            <a href="${postUrl}">${post.title}</a>
          </h2>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-card-footer">
            <a href="${postUrl}" class="button button--secondary button--sm">${readLabel} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </article>
    `;
  }).join('\n');
}

export const blogPage = {
  key: 'blog',
  fr: {
    title: 'Apôtre Philippe Andy Shembo | Blog, Enseignements & Méditations',
    description: 'Articles, méditations bibliques et enseignements spirituels de l’Apôtre Philippe Andy Shembo pour affermir votre foi et votre marche chrétienne.',
    ogTitle: 'Blog & Méditations | Apôtre Philippe Andy Shembo',
    ogDescription: 'Retrouvez les enseignements et pensées pastorales de l’Apôtre Philippe Andy Shembo.',
    bodyHtml: `      <section class="section section--sand">
        <div class="shell">
          <header class="section-head text-center">
            <span class="badge">Édification &amp; Réflexions</span>
            <h1 class="section-title">Blog &amp; Enseignements</h1>
            <p class="section-intro">Découvrez les écrits, méditations pastorales et clés spirituelles partagés par l'Apôtre Philippe Andy Shembo pour éclairer votre quotidien et fortifier votre communion avec Dieu.</p>
          </header>
          <div class="blog-grid">
            ${renderPostCards('fr')}
          </div>
        </div>
      </section>`
  },
  en: {
    title: 'Apostle Philippe Andy Shembo | Blog, Teachings & Meditations',
    description: 'Spiritual insights, biblical meditations and teachings from Apostle Philippe Andy Shembo to empower your faith and spiritual journey.',
    ogTitle: 'Blog & Meditations | Apostle Philippe Andy Shembo',
    ogDescription: 'Explore spiritual teachings and pastoral reflections from Apostle Philippe Andy Shembo.',
    bodyHtml: `      <section class="section section--sand">
        <div class="shell">
          <header class="section-head text-center">
            <span class="badge">Edification &amp; Insights</span>
            <h1 class="section-title">Blog &amp; Teachings</h1>
            <p class="section-intro">Explore writings, pastoral reflections and spiritual wisdom shared by Apostle Philippe Andy Shembo to illuminate your daily walk and deepen your fellowship with God.</p>
          </header>
          <div class="blog-grid">
            ${renderPostCards('en')}
          </div>
        </div>
      </section>`
  }
};
