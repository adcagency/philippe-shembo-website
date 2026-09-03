import { HOME_PATH, pathFor } from '../data/nav-config.js';
import { SITE_CONTENT } from '../data/site-content.js';
import { renderSkipLink, renderHeader } from '../partials/header.js';
import { renderFooter } from '../partials/footer.js';

const SITE_ORIGIN = 'https://philippeshembo.com';

function generateJsonLd({ lang, pageKey, canonical, title, description }) {
  const graph = [
    {
      '@type': 'Person',
      '@id': `${SITE_ORIGIN}/#person`,
      name: 'Philippe A. Shembo',
      url: SITE_ORIGIN,
      image: `${SITE_ORIGIN}/assets/portraits/philippe-shembo-hero.webp`,
      jobTitle: lang === 'fr' ? 'Pasteur, auteur et formateur' : 'Pastor, author and trainer',
      description: lang === 'fr'
        ? 'Apôtre et pasteur, fondateur des Éditions Lampe à mes Pieds, responsable de la Famille des Assemblées Chrétiennes au Maroc et des Églises Grâce Déployée.'
        : 'Apostle and pastor, founder of Lampe à mes Pieds Publishing, leader of the Christian Assemblies Family in Morocco and Grâce Déployée churches.',
      knowsLanguage: ['fr', 'en'],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Université Chouaïb Doukkali'
      },
      affiliation: [
        {
          '@type': 'Organization',
          name: 'Famille des Assemblées Chrétiennes au Maroc'
        },
        {
          '@type': 'Organization',
          name: 'Églises Grâce Déployée'
        }
      ],
      sameAs: Object.values(SITE_CONTENT.social)
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'Apôtre Philippe A. Shembo',
      description: lang === 'fr'
        ? 'Site officiel du ministère de Philippe A. Shembo : prédications, enseignements et ouvrages.'
        : 'Official website of Philippe A. Shembo ministry: sermons, teachings and publications.',
      inLanguage: ['fr', 'en']
    }
  ];

  if (pageKey !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'fr' ? 'Accueil' : 'Home',
          item: `${SITE_ORIGIN}${lang === 'fr' ? '/' : '/en/'}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title.split('|')[0].trim(),
          item: canonical
        }
      ]
    });
  }

  if (pageKey === 'about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: description
    });
  } else if (pageKey === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: description
    });
  }

  if (pageKey === 'bibliography') {
    graph.push({
      '@type': 'ItemList',
      name: lang === 'fr' ? 'Ouvrages de Philippe A. Shembo' : 'Books by Philippe A. Shembo',
      itemListElement: SITE_CONTENT.books.map((book, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Book',
          name: book.title,
          description: book.description,
          image: `${SITE_ORIGIN}${book.image.replace('.png', '.webp')}`,
          author: {
            '@type': 'Person',
            name: 'Philippe A. Shembo'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Éditions Lampe à mes Pieds'
          },
          inLanguage: 'fr'
        }
      }))
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  });
}

const HERO_PRELOADS = {
  home: '/assets/portraits/philippe-shembo-hero.webp',
  about: '/assets/portraits/philippe-shembo-couple.webp'
};

export function renderPage({ lang, pageKey, title, description, ogTitle, ogDescription, bodyHtml }) {
  const path = pathFor(pageKey, lang);
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const otherPath = pathFor(pageKey, otherLang);
  const canonical = `${SITE_ORIGIN}${path}`;
  const frPath = lang === 'fr' ? path : otherPath;
  const enPath = lang === 'en' ? path : otherPath;
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const skipLink = renderSkipLink(lang);
  const header = renderHeader({ lang, pageKey });
  const footer = renderFooter({ lang, otherLangPath: otherPath });
  const jsonLd = generateJsonLd({ lang, pageKey, canonical, title, description });
  const heroPreload = HERO_PRELOADS[pageKey]
    ? `\n    <link rel="preload" href="${HERO_PRELOADS[pageKey]}" as="image" fetchpriority="high">`
    : '';

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512">
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">${heroPreload}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="fr" href="${SITE_ORIGIN}${frPath}">
    <link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${enPath}">
    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${frPath}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${ogLocale}">
    <meta property="og:site_name" content="Apôtre Philippe A. Shembo">
    <meta property="og:title" content="${ogTitle}">
    <meta property="og:description" content="${ogDescription}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_ORIGIN}/og/philippe-shembo-${lang}.png">
    <meta property="og:image:secure_url" content="${SITE_ORIGIN}/og/philippe-shembo-${lang}.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${lang === 'fr' ? 'Apôtre Philippe A. Shembo — Pasteur, Auteur, Formateur' : 'Apostle Philippe A. Shembo — Pastor, Author, Trainer'}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${ogTitle}">
    <meta name="twitter:description" content="${ogDescription}">
    <meta name="twitter:image" content="${SITE_ORIGIN}/og/philippe-shembo-${lang}.png">
    <meta name="twitter:image:alt" content="${lang === 'fr' ? 'Apôtre Philippe A. Shembo — Pasteur, Auteur, Formateur' : 'Apostle Philippe A. Shembo — Pastor, Author, Trainer'}">
    <link rel="stylesheet" href="/src/styles/main.css">
    <script type="application/ld+json">${jsonLd}</script>
    <script type="speculationrules">
      {
        "prerender": [
          {
            "where": { "href_matches": "/*" },
            "eagerness": "moderate"
          }
        ]
      }
    </script>
  </head>
  <body>
    ${skipLink}
    ${header}
    <main id="main" tabindex="-1">
${bodyHtml}
    </main>
    ${footer}
    <script type="module" src="/src/scripts/site.js"></script>
  </body>
</html>
`;
}
