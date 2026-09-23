export const HOME_PATH = { fr: '/', en: '/en/' };
export const LEGAL_PATH = { fr: '/mentions-legales/', en: '/en/legal/' };
export const BLOG_PATH = { fr: '/blog/', en: '/en/blog/' };

export const NAV_ITEMS = [
  { key: 'about', fr: { label: 'À Propos', path: '/a-propos/' }, en: { label: 'About', path: '/en/about/' } },
  { key: 'media', fr: { label: 'Espace Médias', path: '/espace-medias/' }, en: { label: 'Media', path: '/en/media/' } },
  { key: 'bibliography', fr: { label: 'Bibliographie', path: '/bibliographie/' }, en: { label: 'Bibliography', path: '/en/bibliography/' } },
  { key: 'blog', fr: { label: 'Blog', path: '/blog/' }, en: { label: 'Blog', path: '/en/blog/' } },
  { key: 'support', fr: { label: 'Soutenir', path: '/soutenir/' }, en: { label: 'Support', path: '/en/support/' } },
  { key: 'contact', fr: { label: 'Contact', path: '/contact/' }, en: { label: 'Contact', path: '/en/contact/' } }
];

export function pathFor(pageKey, lang, slug) {
  if (pageKey === 'home') return HOME_PATH[lang];
  if (pageKey === 'legal') return LEGAL_PATH[lang];
  if (pageKey === 'blog') return BLOG_PATH[lang];
  if (pageKey === 'blog-post') {
    if (!slug) throw new Error('Slug is required for blog-post path');
    return lang === 'fr' ? `/blog/${slug}/` : `/en/blog/${slug}/`;
  }
  const item = NAV_ITEMS.find((entry) => entry.key === pageKey);
  if (!item) throw new Error(`Unknown pageKey: ${pageKey}`);
  return item[lang].path;
}
