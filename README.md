# Philippe A. Shembo — Landing bilingue

Site vitrine statique (FR/EN) pour le ministère de Philippe A. Shembo. Aucun framework, aucun build : `index.html` (FR, `/`) et `en/index.html` (EN, `/en/`) sont deux documents HTML indépendants.

## Commandes locales

- `npm install` — installe les dépendances (`@playwright/test`, `sharp`, `serve`).
- `npm test` — exécute `tests/site-content.test.js` (contrat de contenu contre `src/data/site-content.js`).
- `npm run test:e2e` — tests navigateur Playwright (`tests/landing.spec.js`), servis sur `http://127.0.0.1:4173`.
- `npm run serve` — sert la racine du dépôt sur le port 4173.
- `npm run assets` — régénère `public/assets/` à partir de `Ressources/` (copie + dérivés `.webp` via `sharp`). À relancer après toute modification des fichiers sous `Ressources/`.

## Pipeline d'assets et propriété des fichiers

- `Ressources/` — fichiers sources originaux fournis par le client (photos, logos, motifs, couvertures). Ne jamais modifier ces fichiers en place.
- `public/assets/` — sortie générée par `scripts/optimize-assets.mjs`, ignorée par git (`.gitignore`), régénérable à tout moment via `npm run assets`.
- `src/data/site-content.js` — contrat de contenu (URLs sociales, 14 livres, placeholders de soutien/contact). N'est pas injecté dans le HTML au rendu ; toute donnée éditoriale doit être mise à jour à la fois ici et dans le texte codé en dur des deux fichiers HTML.
- `src/styles/main.css` — feuille de style unique, tokens en variables CSS.
- `src/scripts/site.js` — seul JavaScript du site, amélioration progressive uniquement (menu mobile, liens de langue).

## Déploiement

- HTTPS obligatoire ; prévoir des redirections 301 cohérentes (ex. `www` → domaine canonique) une fois le nom de domaine final choisi.
- `public/robots.txt` et `public/sitemap.xml` contiennent le domaine placeholder `example.org` : à remplacer par le domaine réel avant mise en production (voir `docs/publishing-checklist.md`).
- Vérifier `index.html` et `en/index.html` : balises `canonical`, `hreflang`, Open Graph et JSON-LD doivent référencer le domaine final.

## Mesure : Search Console et GA4

- **Google Search Console** : vérifier la propriété de domaine après mise en ligne, soumettre `sitemap.xml`. Sert à mesurer l'indexation et les requêtes de recherche.
- **Google Analytics 4** : activer uniquement après mise en place d'un bandeau de consentement et d'une politique de confidentialité conforme aux juridictions des visiteurs.
- Événements GA4 minimaux, sans donnée bancaire ni contenu de formulaire transmis à l'outil :
  1. Consultation d'une prédication
  2. Clic vers un livre
  3. Clic vers un réseau social
  4. Ouverture d'un moyen de soutien
  5. Clic sur le contact
  6. Changement de langue

## Documentation associée

- Spec : `docs/superpowers/specs/2026-08-26-philippe-shembo-landing-design.md`
- Plan d'implémentation : `docs/superpowers/plans/2026-08-26-philippe-shembo-landing-implementation.md`
- Checklist avant publication : `docs/publishing-checklist.md`
