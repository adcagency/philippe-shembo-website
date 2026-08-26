# Checklist avant publication

Ne pas publier ce site en production tant que chaque valeur ci-dessous n'a pas été confirmée par le ministère. Ne jamais publier de coordonnées bancaires ou de mobile money non vérifiées : en cas de doute, laisser le placeholder `[À renseigner]` plutôt que d'inventer ou de deviner une valeur.

## Valeurs à confirmer

| Valeur | Emplacement(s) | Statut |
|---|---|---|
| **Domain** final (remplace `example.org`) | `index.html`, `en/index.html` (canonical, hreflang, OG), `public/robots.txt`, `public/sitemap.xml` | À renseigner |
| Email de contact | `src/data/site-content.js` (`SITE_CONTENT.contact.email`), `index.html`/`en/index.html` section Contact | À renseigner |
| Banque (nom, titulaire, **IBAN**, BIC/SWIFT) | `src/data/site-content.js` (`SITE_CONTENT.support.bank`), section Soutenir des deux HTML | À renseigner |
| **Mobile money** (opérateur, numéro, bénéficiaire) | `src/data/site-content.js` (`SITE_CONTENT.support.mobileMoney`), section Soutenir des deux HTML | À renseigner |
| Autre moyen de soutien (nom, URL, devise) | `src/data/site-content.js` (`SITE_CONTENT.support.other`) | À renseigner |
| Titre, résumé et **book URL** (URL d'achat individuelle) par ouvrage | `src/data/site-content.js` (`SITE_CONTENT.books[].title/description/url`), section Livres des deux HTML | À renseigner (14 entrées) |
| Titre, date et **sermon URL** individuelle par prédication | Section Prédications des deux HTML (actuellement liens génériques vers la chaîne) | À renseigner (3 entrées) |
| Images Open Graph 1200×630 (FR/EN) | `public/og/README.md`, `og:image` dans les deux HTML | À renseigner |
| Mentions légales | Pied de page des deux HTML | À renseigner |

## Règles de sécurité du contenu

- Toute valeur marquée `[À renseigner]` doit rester du texte simple, jamais un lien actif (`mailto:`, URL d'achat, lien de paiement).
- Aucune information de carte bancaire n'est demandée ni affichée sur le site.
- Ne pas publier de coordonnées bancaires ou mobile money sans confirmation écrite de l'équipe du ministère.

## Vérifications finales avant mise en ligne

- [ ] `npm run assets && npm test && npx playwright test` passent sans échec.
- [ ] Aucun lien actif ne pointe vers un placeholder d'achat, de paiement ou d'email.
- [ ] `public/robots.txt` et `public/sitemap.xml` référencent le domaine final, plus `example.org`.
- [ ] Search Console : propriété de domaine vérifiée, sitemap soumis.
- [ ] GA4 activé uniquement après bandeau de consentement et politique de confidentialité en place.
- [ ] FR et EN vérifiés en parallèle (structure, ancres de navigation, métadonnées).
