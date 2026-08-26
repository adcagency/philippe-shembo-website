const frBookCard = (n) => `<article class="book"><img src="/assets/books/book-${n}.webp" width="1080" height="1080" alt="Couverture d’ouvrage de Philippe A. Shembo — titre à renseigner" loading="lazy" decoding="async"><div><h3>Titre à renseigner</h3><p>Fiche à renseigner</p></div></article>`;
const enBookCard = (n) => `<article class="book"><img src="/assets/books/book-${n}.webp" width="1080" height="1080" alt="Book cover by Philippe A. Shembo — title to be provided" loading="lazy" decoding="async"><div><h3>Title to be provided</h3><p>Details to be provided</p></div></article>`;
const NUMBERS = ['01', '02', '03', '04', '05', '06'];

export const bibliographyPage = {
  key: 'bibliography',
  fr: {
    title: 'Philippe A. Shembo | Bibliographie',
    description: 'Découvrez les ouvrages publiés par Philippe A. Shembo aux Éditions Lampe à mes Pieds.',
    ogTitle: 'Philippe A. Shembo | Bibliographie',
    ogDescription: 'Découvrez les ouvrages publiés par Philippe A. Shembo aux Éditions Lampe à mes Pieds.',
    bodyHtml: `      <section class="section section--sand"><div class="shell"><p class="eyebrow">Éditions Lampe à mes Pieds</p><h1 class="section-title">Des ouvrages pour grandir et agir.</h1><p class="section-intro">Une sélection visuelle. Les fiches, résumés et liens d’achat seront complétés par l’équipe éditoriale.</p><div class="books">
        ${NUMBERS.map(frBookCard).join('\n        ')}
      </div><p><a class="button" href="https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT" target="_blank" rel="noopener noreferrer">Découvrir les ouvrages</a></p></div></section>`
  },
  en: {
    title: 'Philippe A. Shembo | Bibliography',
    description: 'Discover the books published by Philippe A. Shembo through Lampe à mes Pieds Publishing.',
    ogTitle: 'Philippe A. Shembo | Bibliography',
    ogDescription: 'Discover the books published by Philippe A. Shembo through Lampe à mes Pieds Publishing.',
    bodyHtml: `      <section class="section section--sand"><div class="shell"><p class="eyebrow">Lampe à mes Pieds Publishing</p><h1 class="section-title">Books to grow and act.</h1><p class="section-intro">A visual selection. Book details and purchase links will be completed by the editorial team.</p><div class="books">
        ${NUMBERS.map(enBookCard).join('\n        ')}
      </div><p><a class="button" href="https://www.lampeamespieds.com/?category=pcol_01KXFST2DK0NQE5TAZWNY292GT" target="_blank" rel="noopener noreferrer">Discover the books</a></p></div></section>`
  }
};
