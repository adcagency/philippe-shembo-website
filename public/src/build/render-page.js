import { HOME_PATH, pathFor } from '../data/nav-config.js';
import { SITE_CONTENT } from '../data/site-content.js';
import { renderSkipLink, renderHeader } from '../partials/header.js';
import { renderFooter } from '../partials/footer.js';

const SITE_ORIGIN = 'https://example.org';

function jsonLdPerson(lang) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Philippe A. Shembo',
    jobTitle: lang === 'fr' ? 'Pasteur, auteur et formateur' : 'Pastor, author and trainer',
    sameAs: Object.values(SITE_CONTENT.social)
  });
}

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

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512">
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
    <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="fr" href="${SITE_ORIGIN}${frPath}">
    <link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${enPath}">
    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${HOME_PATH.fr}">
    <meta property="og:type" content="website"><meta property="og:locale" content="${ogLocale}"><meta property="og:title" content="${ogTitle}"><meta property="og:description" content="${ogDescription}"><meta property="og:url" content="${canonical}">
    <link rel="stylesheet" href="/src/styles/main.css">
    <script type="application/ld+json">${jsonLdPerson(lang)}</script>
  </head>
  <body>
    ${skipLink}
    ${header}
    <main id="main">
${bodyHtml}
    </main>
    ${footer}
    <script type="module" src="/src/scripts/site.js"></script>
  </body>
</html>
`;
}
