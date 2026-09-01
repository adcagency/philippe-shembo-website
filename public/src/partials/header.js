import { NAV_ITEMS, HOME_PATH, pathFor } from '../data/nav-config.js';

const COPY = {
  fr: { skip: 'Aller au contenu', brandLabel: 'Accueil Philippe A. Shembo', menu: 'Menu', navLabel: 'Navigation principale', langLabel: 'Langue' },
  en: { skip: 'Skip to content', brandLabel: 'Philippe A. Shembo home', menu: 'Menu', navLabel: 'Primary navigation', langLabel: 'Language' }
};

const FLAGS = {
  fr: `<svg class="flag-icon" width="18" height="13" viewBox="0 0 640 480" aria-hidden="true"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#00267f" d="M0 0h213.3v480H0z"/><path fill="#f31830" d="M426.7 0H640v480H426.7z"/></g></svg>`,
  en: `<svg class="flag-icon" width="18" height="13" viewBox="0 0 640 480" aria-hidden="true"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 245 180L565 0h75v60L400 240l240 180v60h-75L320 300 75 480H0v-60l240-180L0 60V0z"/><path fill="#C8102E" d="m424 288 216 162v30h-40L360 300zm-208-96L0 30V0h40l240 180zM640 0v30L400 210l16-30zm-400 270-16 30L0 450v-30z"/><path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/><path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z"/></svg>`
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
          <summary class="lang-summary">${FLAGS[lang]} <span>${lang.toUpperCase()}</span> <span class="lang-caret">▾</span></summary>
          <div class="lang-menu">
            <a href="${frPath}"${frCurrent}>${FLAGS.fr} <span>FR</span> <span class="lang-name">Français</span></a>
            <a href="${enPath}"${enCurrent}>${FLAGS.en} <span>EN</span> <span class="lang-name">English</span></a>
          </div>
        </details>
      </div>
    </div></header>`;
}
