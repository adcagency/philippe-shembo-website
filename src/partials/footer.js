const COPY = {
  fr: { rights: '© 2026 Philippe A. Shembo. Tous droits réservés.', switchLabel: 'English version', legal: 'Mentions légales à renseigner' },
  en: { rights: '© 2026 Philippe A. Shembo. All rights reserved.', switchLabel: 'Version française', legal: 'Legal notice to be provided' }
};

export function renderFooter({ lang, otherLangPath }) {
  const copy = COPY[lang];
  return `<footer class="site-footer"><div class="shell footer-inner"><p>${copy.rights}</p><p><a href="${otherLangPath}">${copy.switchLabel}</a> · ${copy.legal}</p></div></footer>`;
}
