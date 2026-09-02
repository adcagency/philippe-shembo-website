# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Fidèles et chrétiens francophones / anglophones :** Cherchent des prédications édifiantes, des enseignements bibliques et des ressources pour nourrir leur foi.
- **Lecteurs et chercheurs spirituels :** Découvrent les écrits, livres et publications pastorales de Philippe A. Shembo (via les Éditions Lampe à mes Pieds).
- **Partenaires et donateurs :** Souhaitent soutenir activement l'expansion du ministère, l'implantation d'églises et les œuvres missionnaires par des canaux de paiement sécurisés et transparents.
- **Responsables d'églises et organisateurs d'événements :** Souhaitent entrer en contact officiel avec le pasteur pour des conférences, séminaires ou invitations ministérielles.

## Product Purpose

Fournir une présence numérique officielle, bilingue (français/anglais), digne et inspirante pour le ministère de Philippe A. Shembo. Le site articule sa vision (« Équiper une génération pour influencer son temps »), diffuse ses enseignements (prédications vidéo), valorise sa bibliographie et permet un soutien financier et des prises de contact fiables.

## Positioning

Un ministère pastoral solide, posé et crédible, articulé autour de l'enseignement biblique approfondi et de l'implantation chrétienne (Maroc, RDC), sans recours à des artifices sensationnalistes, des superlatifs non vérifiables ou des compteurs factices.

## Operating Context

- Site web statique bilingue (12 pages HTML générées pour 6 surfaces logiques : Accueil, À propos / Ministère, Espace Médias / Prédications, Bibliographie / Livres, Soutenir, Contact).
- Accessible sur tous navigateurs modernes, desktop et mobile (responsive de 375px à 1440px+).
- Indexation SEO et performance maximale sans dépendance à des frameworks lourds ou du JavaScript bloquant.

## Capabilities and Constraints

- **Bilinguisme intégral FR / EN** sans traduction automatique à la volée (pages statiques pré-générées par `scripts/build-pages.mjs`).
- **Politique stricte sur les données non vérifiées :** Utilisation systématique du placeholder textuel `[À renseigner]` pour les coordonnées bancaires, mobile money, liens d'achats individuels et emails non confirmés. Aucun lien actif ou formulaire de paiement par carte sur le site.
- **Zéro dépendance d'exécution externe :** Amélioration progressive uniquement (`src/scripts/site.js`), contenu accessible et indexable sans JS.
- **Respect de la vie privée :** Pas d'intégration d'analytics (GA4) sans bandeau de consentement préalable ; aucune donnée sensible transmise.

## Brand Commitments

- **Devise :** « Équiper une génération pour influencer son temps » / "Equipping a generation to influence its time".
- **Identité visuelle :** Violet royal (`#4B0082`), Or champagne (`#D4AF37`), Sable clair (`#EAEAEA`), Encre/Charbon (`#1C1C1C`), Blanc pur (`#FFFFFF`).
- **Typographie :** *Playfair Display* (titres éditoriaux), *Lato* (texte courant), *Antonio* (étiquettes en capitales).
- **Canaux officiels :** YouTube (@andyphilippeshembo), Facebook, Instagram, LinkedIn.

## Evidence on Hand

- Photographie portrait officielle : `Ressources/Photos/RL819-Photo Philippe.png`.
- Logos et motifs officiels : `Ressources/Logos/` et `Ressources/MOTIFS/`.
- 14 couvertures d'ouvrages sources : `Ressources/Livres/`.
- Spécifications de design et plans d'implémentation archivés dans `docs/superpowers/`.

## Product Principles

1. **Vérité et sobriété :** N'afficher que des faits, chiffres et coordonnées vérifiables ; afficher explicitement `[À renseigner]` pour tout champ non validé plutôt que d'inventer du contenu.
2. **Accessibilité et dignité :** Contraste élevé (WCAG AA), navigation au clavier irréprochable, performance de chargement instantanée et design raffiné digne de la mission pastorale.
3. **Autonomie et pérennité :** Architecture statique pure, sans coût d'infrastructure lourd, facilement maintenable et régénérable.
4. **Parité linguistique :** Chaque page, titre, méta-donnée et élément d'action en français possède son équivalent exact et soigné en anglais.

## Accessibility & Inclusion

- Conformité WCAG 2.1 niveau AA (contraste minimal 4.5:1 pour le texte normal, 3:1 pour les composants graphiques).
- Navigation complète au clavier avec indicateur de focus distinct (`:focus-visible`) et lien d'évitement (`skip-link`).
- Support natif de `prefers-reduced-motion` pour toutes les transitions.
- Cibles tactiles d'au moins 44 × 44 px sur mobile.
