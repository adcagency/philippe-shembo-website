# Navigation multi-pages — Philippe A. Shembo

## Objectif

Remplacer la navigation par ancres (`#ministry`, `#sermons`, `#books`, `#support`, `#contact`) de la landing bilingue par une navigation multi-pages classique, une page HTML distincte par section, à l'image du pattern observé sur des sites de référence du même type (pages séparées par chemin, ex. `/a-propos/`, `/videos/`, `/faire-un-don/` sur yvancastanou.com, et `/a-propos/`, `/espace-medias/`, bibliographie sur marcellotunasi.org — pattern de navigation et libellés uniquement, aucune reprise de design, texte ou visuel de ces sites, conformément à la règle du spec initial interdisant l'imitation directe).

## Contexte

Le spec initial (`2026-08-26-philippe-shembo-landing-design.md`) et son implémentation (`2026-08-26-philippe-shembo-landing-implementation.md`) définissaient une page unique par langue avec sections ancrées. Ce document amende cette décision : les sections de contenu deviennent des pages dédiées, avec leurs propres métadonnées SEO (canonical, hreflang, Open Graph). La page d'accueil devient une page de synthèse (hero, repères, vision, aperçu de chaque section) qui renvoie vers les pages dédiées.

## Périmètre : 12 pages statiques

| Page | Label nav FR | Label nav EN | Chemin FR | Chemin EN |
|---|---|---|---|---|
| Accueil | Accueil | Home | `/` (`index.html`) | `/en/` (`en/index.html`) |
| À propos (+ biographie/parcours) | À Propos | About | `/a-propos/` | `/en/about/` |
| Prédications | Espace Médias | Media | `/espace-medias/` | `/en/media/` |
| Livres | Bibliographie | Bibliography | `/bibliographie/` | `/en/bibliography/` |
| Soutenir | Soutenir | Support | `/soutenir/` | `/en/support/` |
| Contact | Contact | Contact | `/contact/` | `/en/contact/` |

Labels inspirés (nommage uniquement, pas le design) des menus observés sur yvancastanou.com et marcellotunasi.org : « À Propos », « Espace Médias », « Bibliographie ».

Convention d'URL : dossier + `index.html`, cohérente avec le pattern déjà utilisé par `/en/` pour la langue. Chaque URL FR a une URL EN miroir exacte pour le sélecteur de langue et les balises `hreflang`.

### Répartition du contenu existant

- **Accueil** garde : hero (`h1`, résumé, actions), repères chiffrés (2007/2008/17/4), citation de vision. Ajoute une grille d'aperçu des 5 sections (titre + une phrase + lien « En savoir plus » vers la page dédiée), remplaçant le contenu détaillé actuellement embarqué.
- **À propos** reprend les 4 cartes de mission existantes (section « Ministère » actuelle) et absorbe la section « Parcours » (texte biographique + timeline Oct. 2007 / Juin 2008 / Aujourd'hui), aujourd'hui sur l'accueil.
- **Espace Médias (prédications), Bibliographie (livres), Soutenir, Contact** reprennent tel quel le contenu de section correspondant actuellement sur la page unique (grilles, placeholders `[À renseigner]`, CTA), sans changement de contenu éditorial.

## Arborescence des fichiers générés

```text
index.html
a-propos/index.html
espace-medias/index.html
bibliographie/index.html
soutenir/index.html
contact/index.html
en/index.html
en/about/index.html
en/media/index.html
en/bibliography/index.html
en/support/index.html
en/contact/index.html
```

Ces 12 fichiers sont des artefacts **générés puis committés** au même titre que `index.html` aujourd'hui — pas de dossier `dist/` séparé, pas de changement à `npm run serve` (qui continue de servir la racine du dépôt telle quelle). La discipline de régénération suit le même modèle que `npm run assets` déjà en place : après toute modification des partials, du nav ou du contenu par page, on relance le script de build avant de committer.

## Pipeline de génération

- Nouveau script `scripts/build-pages.mjs` (Node, aucun framework, aucune dépendance de template engine).
- Nouveaux modules `src/partials/header.mjs` et `src/partials/footer.mjs` : fonctions `renderHeader({ lang, activePath })` / `renderFooter({ lang })` retournant du HTML sous forme de chaîne. Fonctions plutôt que fichiers HTML statiques car le texte (labels de nav, mentions de pied de page) diffère par langue.
- Une table de configuration de navigation (labels + chemins FR et EN, associée par clé de section) sert à la fois à générer le menu et à calculer la correspondance de langue par page (le sélecteur FR/EN sur `/a-propos/` doit pointer vers `/en/about/`, pas vers `/en/`).
- Le contenu propre à chaque page (titres, paragraphes, cartes) reste écrit à la main dans des modules de contenu sous `src/pages/` (un module par page logique, réutilisé pour FR et EN avec les textes traduits séparément — pas de traduction automatique).
- Le HTML produit reste strictement statique : aucun JavaScript de templating côté client, page entièrement indexable sans JS, exactement comme aujourd'hui.

## Navigation et accessibilité

- Les liens du menu (`#ministry` → `/a-propos/`, `#sermons` → `/espace-medias/`, `#books` → `/bibliographie/`, etc.) et les CTA internes (bouton hero « Découvrir le ministère », bouton « Contacter le ministère » sur la page Soutenir, etc.) pointent vers les chemins de page réels.
- Le lien de nav correspondant à la page courante reçoit `aria-current="page"` et le style existant `.language a[aria-current='page']` (couleur or) est étendu à `.site-nav a[aria-current='page']`, pour indiquer visuellement la position courante — absent aujourd'hui pour les sections, possible désormais que chaque section est une vraie page.
- `src/scripts/site.js` : la logique qui recopiait le `#hash` courant sur le lien de langue est supprimée (obsolète, plus d'ancre partagée entre pages) ; le script ne garde que le toggle du menu mobile et la fermeture au clavier (`Escape`), avec le correctif déjà appliqué (n'agit que si le menu est ouvert).

## SEO

- Chaque page a son propre `<title>`, sa méta description, son `canonical`, ses balises `hreflang` (fr / en / x-default) pointant vers sa page miroir exacte, et ses balises Open Graph (titre/description traduits, `og:url` propre).
- Le JSON-LD `Person` est conservé identique sur les 12 pages (coût négligeable, cohérence avec l'existant).
- `public/sitemap.xml` liste les 12 URLs, chacune avec ses 3 alternates `hreflang`.
- `public/robots.txt` ne change pas (règle générique + référence au sitemap).

## Tests

- `tests/landing.spec.js` : remplacé par une liste de pages `[{ path, lang }, ...]` (12 entrées) parcourue pour vérifier, par page : un seul `h1`, présence du lien d'évitement, attribut `lang` correct, présence d'un `link[rel="canonical"]`. Un test dédié vérifie, pour chaque paire FR/EN, que le lien de langue sur la page FR pointe vers la page EN miroir attendue (et réciproquement).
- `tests/site-content.test.js` : inchangé (il teste `src/data/site-content.js` et `docs/publishing-checklist.md`, dont les chemins ne bougent pas).

## Documents à mettre à jour

- `CLAUDE.md` : la description d'architecture actuelle (« deux documents HTML indépendants », « pas de build ») devient inexacte et doit être réécrite pour refléter le pipeline de génération, la liste des 12 pages et le nouveau script `npm run build`.
- `docs/publishing-checklist.md` : les emplacements de valeurs à confirmer (bibliographie, soutenir, espace médias, contact) doivent référencer les nouvelles pages dédiées plutôt que « section de la page unique ».

## Hors périmètre

- Aucun changement de contenu éditorial au-delà de la réorganisation (pas de nouveau texte, pas de nouvelle donnée business).
- Pas de reprise de design, de mise en page ou de texte d'un site tiers — seul le principe de navigation par pages séparées est repris.
- Pas d'introduction d'un générateur de site statique tiers (Eleventy, Astro, etc.) ; le script de build reste un script Node minimal maison, cohérent avec la contrainte « dependency-light » du plan initial.
