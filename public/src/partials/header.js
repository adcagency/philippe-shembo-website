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
  const whatsappIcon = `<svg class="announcement-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.975L1.921 22l5.165-1.352a9.96 9.96 0 0 0 4.926 1.302h.004c5.505 0 9.99-4.478 9.99-9.982C21.996 6.456 17.518 2 12.012 2zM12.014 20.301h-.003a8.312 8.312 0 0 1-4.237-1.155l-.304-.18-3.147.825.84-3.069-.197-.313a8.32 8.32 0 0 1-1.272-4.432c.002-4.593 3.738-8.333 8.336-8.333 4.592 0 8.327 3.743 8.327 8.337s-3.736 8.32-8.343 8.32zm4.582-6.26c-.251-.125-1.488-.735-1.718-.819-.23-.084-.397-.125-.565.126-.167.25-.648.819-.795.986-.146.167-.293.188-.544.063-2.138-1.07-3.411-2.996-3.83-3.722-.146-.252-.016-.388.11-.513.112-.112.25-.293.376-.439.126-.146.167-.251.251-.418.084-.167.042-.314-.021-.439-.063-.125-.565-1.36-.773-1.862-.2-.49-.405-.424-.565-.432l-.48-.008c-.167 0-.439.063-.67.314-.23.251-.879.858-.879 2.093s.901 2.428 1.026 2.595c.126.167 1.77 2.702 4.288 3.791 1.703.737 2.404.795 3.195.669.588-.093 1.488-.607 1.698-1.193.21-.586.21-1.088.146-1.193-.062-.104-.229-.167-.48-.292z"/></svg>`;

  const announcementItem = `<span class="announcement-item">${whatsappIcon}<span class="announcement-text">${announcementText}</span><span class="announcement-cta">${announcementCta} <span aria-hidden="true">→</span></span></span><span class="announcement-divider" aria-hidden="true">✦</span>`;

  return `<div class="announcement-bar">
      <a href="${whatsapp}" target="_blank" rel="noopener noreferrer" class="announcement-marquee" aria-label="${announcementText} — ${announcementCta}">
        <div class="announcement-track">
          <div class="announcement-group">${announcementItem}${announcementItem}</div>
          <div class="announcement-group" aria-hidden="true">${announcementItem}${announcementItem}</div>
        </div>
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
