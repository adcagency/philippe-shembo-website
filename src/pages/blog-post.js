// src/pages/blog-post.js

/**
 * Génère l'objet page pour un article donné
 * @param {Object} post L'article issu de blog-service.js
 * @param {'fr' | 'en'} lang
 */
export function createBlogPostPage(post, lang) {
  const backLabel = lang === 'fr' ? '← Retour à tous les articles' : '← Back to all articles';
  const backUrl = lang === 'fr' ? '/blog/' : '/en/blog/';
  const publishedLabel = lang === 'fr' ? 'Publié le' : 'Published on';
  const authorLabel = lang === 'fr' ? 'Par' : 'By';
  const shareLabel = lang === 'fr' ? 'Partager cet enseignement :' : 'Share this message:';

  const bodyHtml = `      <article class="article-detail">
        <header class="article-header">
          <div class="shell article-shell">
            <div class="margin-bottom-sm">
              <a href="${backUrl}" class="article-back-link">${backLabel}</a>
            </div>
            <span class="badge">${post.category}</span>
            <h1 class="article-title">${post.title}</h1>
            <div class="article-meta">
              <span><strong>${authorLabel}</strong> ${post.author}</span>
              <span aria-hidden="true">•</span>
              <time datetime="${post.date}">${publishedLabel} ${post.formattedDate}</time>
              <span aria-hidden="true">•</span>
              <span>${post.readingTime}</span>
            </div>
          </div>
        </header>

        ${post.coverImage ? `
        <div class="article-cover-wrap shell article-shell">
          <img src="${post.coverImage}" alt="${post.title}" class="article-cover-img" width="1200" height="630" fetchpriority="high">
        </div>` : ''}

        <div class="shell article-shell">
          <div class="article-prose reveal-on-scroll">
            ${post.htmlContent}
          </div>

          <footer class="article-footer">
            <div class="article-share">
              <p class="article-share-title"><strong>${shareLabel}</strong></p>
              <div class="article-share-links">
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - https://philippeshembo.com' + (lang === 'fr' ? '/blog/' : '/en/blog/') + post.slug + '/')}" target="_blank" rel="noopener noreferrer" class="button button--secondary button--sm">
                  WhatsApp
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://philippeshembo.com' + (lang === 'fr' ? '/blog/' : '/en/blog/') + post.slug + '/')}" target="_blank" rel="noopener noreferrer" class="button button--outline button--sm">
                  Facebook
                </a>
              </div>
            </div>

            <div class="margin-top-lg text-center">
              <a href="${backUrl}" class="button button--outline">${backLabel}</a>
            </div>
          </footer>
        </div>
      </article>`;

  return {
    pageKey: 'blog-post',
    slug: post.slug,
    title: `${post.title} | Apôtre Philippe Andy Shembo`,
    description: post.excerpt,
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogImage: post.coverImage,
    postDate: post.date,
    author: post.author,
    bodyHtml
  };
}
