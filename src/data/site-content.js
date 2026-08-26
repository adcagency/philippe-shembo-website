export const SITE_CONTENT = {
  social: {
    facebook: 'https://www.facebook.com/PasteurPhilippeShembo',
    instagram: 'https://www.instagram.com/pasteur.philippe.a.shembo/',
    linkedin: 'https://www.linkedin.com/in/philippe-a-shembo-28920733b/',
    youtube: 'https://www.youtube.com/@andyphilippeshembo'
  },
  books: Array.from({ length: 14 }, (_, index) => ({
    image: `/assets/books/book-${String(index + 1).padStart(2, '0')}.png`,
    title: '[À renseigner]',
    description: '[À renseigner]',
    url: '[À renseigner]'
  })),
  support: {
    bank: {
      bank: '[À renseigner]',
      holder: '[À renseigner]',
      iban: '[À renseigner]',
      swift: '[À renseigner]'
    },
    mobileMoney: {
      operator: '[À renseigner]',
      number: '[À renseigner]',
      beneficiary: '[À renseigner]'
    },
    other: {
      name: '[À renseigner]',
      url: '[À renseigner]',
      currency: '[À renseigner]'
    }
  },
  contact: { email: '[À renseigner]' }
};
