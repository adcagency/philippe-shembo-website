import { NAV_ITEMS, HOME_PATH, pathFor } from '../data/nav-config.js';

const COPY = {
  fr: { skip: 'Aller au contenu', brandLabel: 'Accueil Philippe A. Shembo', menu: 'Menu', navLabel: 'Navigation principale', langLabel: 'Langue' },
  en: { skip: 'Skip to content', brandLabel: 'Philippe A. Shembo home', menu: 'Menu', navLabel: 'Primary navigation', langLabel: 'Language' }
};


export function renderSkipLink(lang) {
  return `<a class="skip-link" href="#main">${COPY[lang].skip}</a>`;
}

export function renderHeader({ lang, pageKey }) {
  const copy = COPY[lang];
  const homePath = HOME_PATH[lang];
  const navLinks = NAV_ITEMS.map((item) => {
    const { label, path } = item[lang];
    const current = pageKey === item.key ? ' aria-current="page"' : '';
    return `<li><a href="${path}"${current}>${label}</a></li>`;
  }).join('');
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const currentPath = pathFor(pageKey, lang);
  const otherPath = pathFor(pageKey, otherLang);
  const frPath = lang === 'fr' ? currentPath : otherPath;
  const enPath = lang === 'en' ? currentPath : otherPath;
  const frCurrent = lang === 'fr' ? ' aria-current="page"' : '';
  const enCurrent = lang === 'en' ? ' aria-current="page"' : '';
  return `<header class="site-header"><div class="shell header-inner">
      <a class="brand" href="${homePath}" aria-label="${copy.brandLabel}"><img src="/assets/brand/logo-pas.webp" width="2027" height="1077" alt="PAS Philippe Andy Shembo"></a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-navigation" data-menu-button>${copy.menu}</button>
      <nav class="site-nav" id="site-navigation" aria-label="${copy.navLabel}" data-navigation data-open="false"><ul>${navLinks}</ul></nav>
      <div class="language" aria-label="${copy.langLabel}">
        <details class="lang-dropdown">
          <summary class="lang-summary"><span>${lang.toUpperCase()}</span> <span class="lang-caret">▾</span></summary>
          <div class="lang-menu">
            <a href="${frPath}"${frCurrent}><span>FR</span> <span class="lang-name">Français</span></a>
            <a href="${enPath}"${enCurrent}><span>EN</span> <span class="lang-name">English</span></a>
          </div>
        </details>
      </div>
    </div></header>`;
}
