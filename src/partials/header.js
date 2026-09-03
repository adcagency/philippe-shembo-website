import { NAV_ITEMS, HOME_PATH, pathFor } from '../data/nav-config.js';
import { SITE_CONTENT } from '../data/site-content.js';

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
    const isExternal = path.startsWith('http');
    const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const current = (!isExternal && pageKey === item.key) ? ' aria-current="page"' : '';
    return `<li><a href="${path}"${current}${externalAttrs}>${label}</a></li>`;
  }).join('');
  const otherLang = lang === 'fr' ? 'en' : 'fr';
  const currentPath = pathFor(pageKey, lang);
  const otherPath = pathFor(pageKey, otherLang);
  const frPath = lang === 'fr' ? currentPath : otherPath;
  const enPath = lang === 'en' ? currentPath : otherPath;
  const frCurrent = lang === 'fr' ? ' aria-current="page"' : '';
  const enCurrent = lang === 'en' ? ' aria-current="page"' : '';
  
  const announcementText = lang === 'fr' 
    ? "Recevez chaque semaine des encouragements et messages d'édification." 
    : "Receive weekly encouragements and messages of edification.";
  const announcementCta = lang === 'fr' ? "Rejoindre sur WhatsApp" : "Join on WhatsApp";
  const { whatsapp } = SITE_CONTENT.social;

  return `<div class="announcement-bar">
      <a href="${whatsapp}" target="_blank" rel="noopener noreferrer">
        <span class="announcement-text">${announcementText}</span>
        <span class="announcement-cta">${announcementCta} <span aria-hidden="true">→</span></span>
      </a>
    </div>
    <header class="site-header"><div class="shell header-inner">
      <a class="brand" href="${homePath}" aria-label="${copy.brandLabel}"><img src="/assets/brand/logo-pas.webp" width="2027" height="1077" alt="PAS Philippe Andy Shembo"></a>
      <button class="menu-button" type="button" aria-label="${copy.menu}" aria-expanded="false" aria-controls="site-navigation" data-menu-button>
        <svg class="hamburger" viewBox="0 0 24 24" aria-hidden="true">
          <rect class="line line-top" x="4" y="6" width="16" height="1.5" rx="0.75"></rect>
          <rect class="line line-middle" x="4" y="11.25" width="16" height="1.5" rx="0.75"></rect>
          <rect class="line line-bottom" x="4" y="16.5" width="16" height="1.5" rx="0.75"></rect>
        </svg>
      </button>
      <nav class="site-nav" id="site-navigation" aria-label="${copy.navLabel}" data-navigation data-open="false">
        <ul>${navLinks}</ul>
        <div class="language" aria-label="${copy.langLabel}">
          <details class="lang-dropdown">
            <summary class="lang-summary"><span class="lang-current"><span class="lang-prefix">${copy.langLabel} : </span>${lang.toUpperCase()}</span> <span class="lang-caret" aria-hidden="true">▾</span></summary>
            <div class="lang-menu">
              <a href="${frPath}"${frCurrent}><span>FR</span> <span class="lang-name">Français</span></a>
              <a href="${enPath}"${enCurrent}><span>EN</span> <span class="lang-name">English</span></a>
            </div>
          </details>
        </div>
      </nav>
    </div></header>`;
}
