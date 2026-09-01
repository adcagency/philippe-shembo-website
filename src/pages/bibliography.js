import { SITE_CONTENT } from '../data/site-content.js';

const INITIAL_COUNT = 6;

const renderBookCards = (lang, isHidden) => SITE_CONTENT.books.map((book, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const imgUrl = `/assets/books/book-${num}.webp`;
  const alt = lang === 'fr' ? `Couverture : ${book.title}` : `Cover: ${book.title}`;
  const hidden = idx >= INITIAL_COUNT ? ` data-book-hidden style="display:none"` : '';
  const bookShopUrl = (book.url && book.url !== '[À renseigner]' && book.url !== 'À venir' && book.url !== '') ? book.url : 'https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT';
  return `<a href="${bookShopUrl}" class="book reveal-on-scroll" target="_blank" rel="noopener noreferrer"${hidden}><img src="${imgUrl}" width="1080" height="1080" alt="${alt}" loading="lazy" decoding="async"><div><h2>${book.title}</h2></div></a>`;
}).join('\n        ');

const frShowMore = `<div class="text-center margin-top-md" data-show-more-wrap><button class="button button--outline" type="button" data-show-more>Voir plus d'ouvrages</button></div>`;
const enShowMore = `<div class="text-center margin-top-md" data-show-more-wrap><button class="button button--outline" type="button" data-show-more>Show more books</button></div>`;

export const bibliographyPage = {
  key: 'bibliography',
  fr: {
    title: 'Apôtre Philippe A. Shembo | Bibliographie et Ouvrages',
    description: 'Découvrez la collection complète des livres et manuels publiés par Philippe A. Shembo aux Éditions Lampe à mes Pieds.',
    ogTitle: 'Apôtre Philippe A. Shembo | Bibliographie et Ouvrages',
    ogDescription: 'Découvrez la collection complète des livres et manuels publiés par Philippe A. Shembo aux Éditions Lampe à mes Pieds.',
    bodyHtml: `      <section class="section section--sand"><div class="shell"><p class="eyebrow">Éditions Lampe à mes Pieds</p><h1 class="section-title reveal-on-scroll">Des ouvrages pour fortifier la foi et transformer les vies.</h1><p class="section-intro reveal-on-scroll">Découvrez les collections pastorales, manuels d'édification, ouvrages sur le mariage et la guérison intérieure écrits par l'Apôtre Philippe A. Shembo.</p><div class="books">
        ${renderBookCards('fr')}
      </div>${frShowMore}<p class="margin-top-md text-center reveal-on-scroll"><a class="button" href="https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT" target="_blank" rel="noopener noreferrer">Commander sur la boutique officielle</a></p></div></section>`
  },
  en: {
    title: 'Apostle Philippe A. Shembo | Bibliography and Books',
    description: 'Discover the complete collection of books and manuals written by Apostle Philippe A. Shembo published by Lampe à mes Pieds.',
    ogTitle: 'Apostle Philippe A. Shembo | Bibliography and Books',
    ogDescription: 'Discover the complete collection of books and manuals written by Apostle Philippe A. Shembo published by Lampe à mes Pieds.',
    bodyHtml: `      <section class="section section--sand"><div class="shell"><p class="eyebrow">Lampe à mes Pieds Publishing</p><h1 class="section-title reveal-on-scroll">Books to strengthen faith and transform lives.</h1><p class="section-intro reveal-on-scroll">Explore pastoral collections, teachings, marriage guidance, and inner healing books by Apostle Philippe A. Shembo.</p><div class="books">
        ${renderBookCards('en')}
      </div>${enShowMore}<p class="margin-top-md text-center reveal-on-scroll"><a class="button" href="https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT" target="_blank" rel="noopener noreferrer">Order on Official Bookstore</a></p></div></section>`
  }
};
