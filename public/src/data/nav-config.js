export const HOME_PATH = { fr: '/', en: '/en/' };
export const LEGAL_PATH = { fr: '/mentions-legales/', en: '/en/legal/' };

export const NAV_ITEMS = [
  { key: 'about', fr: { label: 'À Propos', path: '/a-propos/' }, en: { label: 'About', path: '/en/about/' } },
  { key: 'media', fr: { label: 'Espace Médias', path: '/espace-medias/' }, en: { label: 'Media', path: '/en/media/' } },
  { key: 'bibliography', fr: { label: 'Bibliographie', path: '/bibliographie/' }, en: { label: 'Bibliography', path: '/en/bibliography/' } },
  { key: 'support', fr: { label: 'Soutenir', path: '/soutenir/' }, en: { label: 'Support', path: '/en/support/' } },
  { key: 'contact', fr: { label: 'Contact', path: '/contact/' }, en: { label: 'Contact', path: '/en/contact/' } }
];

export function pathFor(pageKey, lang) {
  if (pageKey === 'home') return HOME_PATH[lang];
  if (pageKey === 'legal') return LEGAL_PATH[lang];
  const item = NAV_ITEMS.find((entry) => entry.key === pageKey);
  if (!item) throw new Error(`Unknown pageKey: ${pageKey}`);
  return item[lang].path;
}
