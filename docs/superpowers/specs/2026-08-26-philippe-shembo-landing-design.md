# Landing bilingue — Philippe A. Shembo

## Objectif

Présenter de façon crédible et inspirante le ministère de Philippe A. Shembo. La page doit amener le visiteur à découvrir la vision, écouter les prédications, explorer les ouvrages, suivre les réseaux et soutenir le ministère par un moyen de paiement tiers sécurisé.

## Positionnement éditorial

**Promesse :** « Équiper une génération pour influencer son temps. »

Le ton est pastoral, posé et accessible. Le site met d'abord en valeur le ministère et ses œuvres, puis propose les actions utiles. Il évite les superlatifs non vérifiables, compteurs artificiels, témoignages inventés et demandes de don sans destination ou prestataire explicite.

## Public et langues

- Français : langue par défaut, `/`.
- Anglais : traduction éditoriale complète, `/en/`.
- Cibles : fidèles, personnes découvrant le ministère, lecteurs, partenaires et organisateurs souhaitant contacter le pasteur.
- Le changement de langue conserve la section lorsque possible et ne dépend pas de JavaScript pour être indexable.

## Structure de la page

1. **En-tête** — logo PAS, navigation ancrée : Accueil, Ministère, Prédications, Livres, Soutenir, Contact ; sélecteur FR/EN ; bouton « Soutenir le ministère ».
2. **Hero** — portrait officiel de Philippe A. Shembo, titre `h1`, phrase de vision, actions « Découvrir le ministère » et « Voir les prédications ». Sans carrousel.
3. **Repères** — appel pastoral en octobre 2007, pasteur depuis juin 2008, 17 ouvrages, quatre domaines de mission. Les chiffres sont libellés et sourcés par la biographie fournie.
4. **Vision** — texte éditorial court sur Royaume de Dieu, formation et influence positive de cette génération.
5. **Ministères** — quatre cartes : Famille des Assemblées Chrétiennes au Maroc ; Églises Grâce Déployée ; Charisma Source Abondante en RDC ; Éditions Lampe à mes Pieds. Chaque carte a rôle et lien vérifié lorsque disponible.
6. **Prédications récentes** — trois vidéos YouTube officielles, titre, date, miniature et lien vers chaîne. Données chargées depuis YouTube ou un fichier de contenu révisable ; aucun titre fictif.
7. **Ouvrages** — sélection visuelle de six couvertures provenant des ressources ; bouton individuel d'achat et accès à collection sur Lampe à mes Pieds. Chaque carte contient des champs explicites : titre `[À renseigner]`, résumé `[À renseigner]`, URL d'achat `[À renseigner]`. Le lien de collection fourni reste disponible comme solution temporaire.
8. **Soutenir le ministère** — section incitative fondée sur l'impact du ministère, avec moyens renseignés par l'équipe : virement bancaire (banque, titulaire, IBAN, BIC/SWIFT), mobile money (opérateur, numéro, bénéficiaire) et autre moyen sécurisé (nom, URL, devise). Chaque valeur porte placeholder `[À renseigner]` jusqu'à validation. Aucun formulaire de carte bancaire sur site.
9. **Biographie** — biographie complète, parcours, mariage avec Inès Désirée Shembo et quatre enfants, à présenter avec retenue et sans exposition d'informations privées supplémentaires.
10. **Contact et réseaux** — YouTube, Facebook, Instagram, LinkedIn ; formulaire accessible ou coordonnées si elles sont communiquées.
11. **Pied de page** — liens institutionnels, mentions légales, confidentialité, copyright, langue.

## Identité visuelle

- Couleurs : violet royal `#4B0082`, champagne gold `#D4AF37`, sable `#EAEAEA`, charbon `#1C1C1C`, blanc `#FFFFFF`.
- Or réservé aux accents, filets et boutons contrôlés ; jamais texte courant sur blanc, faute de contraste suffisant.
- Titres : Playfair Display Bold (choix retenu pour cohérence éditoriale). Corps : Lato. Antonio reste utilisable pour petits libellés en capitales.
- Layout aéré, grille claire, détails dorés discrets, motifs PAS utilisés comme texture basse intensité. Pas d'imitation directe de Marcello Tunasi ou Yvan Castanou.
- Interactions légères de 200–250 ms, respect de `prefers-reduced-motion`, focus clavier nettement visible.
- Responsive vérifié à 375, 768, 1024 et 1440 px ; cibles tactiles minimales 44 px.

## Ressources fournies

- Portrait : `Ressources/Photos/RL819-Photo Philippe.png`.
- Logo PAS : `Ressources/Logos/`.
- Motifs : `Ressources/MOTIFS/`.
- 14 couvertures d'ouvrages : `Ressources/Livres/`.

Le portrait a un fond clair irrégulier ; le hero utilisera un masque ou un fond violet dédié, sans altérer le visage ni présenter une retouche comme photographie documentaire.

## SEO technique et éditorial

- Une unique balise `h1` par langue ; hiérarchie de `h2`/`h3` cohérente ; textes réels dans HTML, pas intégrés dans images.
- Titres et méta descriptions uniques FR/EN, par exemple :
  - FR titre : `Philippe A. Shembo | Ministère, prédications et ouvrages`
  - EN titre : `Philippe A. Shembo | Ministry, sermons and books`
- Balises `canonical` par URL, `hreflang="fr"`, `hreflang="en"` et `hreflang="x-default"`.
- JSON-LD `Person` pour Philippe A. Shembo, avec `sameAs` réseaux officiels ; `Organization` seulement après validation des coordonnées publiques des organisations concernées ; `VideoObject` et `Book` seulement avec URL, image et données vérifiées.
- Open Graph et cartes sociales par langue, image 1200 × 630 optimisée et description spécifique.
- Images WebP/AVIF dérivées, dimensions déclarées, `alt` contextuel, chargement différé hors hero, sans dégrader les fichiers originaux.
- `sitemap.xml`, `robots.txt`, manifest, favicon, HTTPS et redirections 301 cohérentes.
- Mesure Core Web Vitals : image hero optimisée, polices `display=swap`, JavaScript minimal, aucune dépendance lourde pour l'animation.
- Outil retenu : Google Search Console et Google Analytics 4, activés après choix du domaine. Search Console mesure indexation et requêtes ; GA4 mesure trafic et actions utiles. Bandeau de consentement et politique de confidentialité requis avant activation, selon juridictions des visiteurs.
- Événements GA4 minimaux : consultation de prédication, clic vers livre, clic réseau social, ouverture moyen de soutien, clic contact et changement de langue. Aucun contenu de formulaire, donnée bancaire ou information sensible n'est envoyé à l'outil.

## Intégrations et données

- YouTube : canal `@andyphilippeshembo`, liens sortants explicites, intégration `youtube-nocookie.com` si vidéo embarquée.
- Réseaux :
  - Facebook : `https://www.facebook.com/PasteurPhilippeShembo`
  - Instagram : `https://www.instagram.com/pasteur.philippe.a.shembo/`
  - LinkedIn : `https://www.linkedin.com/in/philippe-a-shembo-28920733b/`
  - YouTube : `https://www.youtube.com/@andyphilippeshembo`
- Livres : lien de collection fourni vers Lampe à mes Pieds. Placeholders par ouvrage : titre, résumé et URL d'achat `[À renseigner]`.
- Dons : placeholders par moyen : banque, titulaire/bénéficiaire, IBAN, BIC/SWIFT, opérateur mobile money, numéro, devise, URL éventuelle et instructions `[À renseigner]`. Reçu fiscal et politique de remboursement affichés seulement s'ils sont applicables et validés.

## Accessibilité, fiabilité et contrôle qualité

- Contraste AA minimum 4.5:1 pour texte normal, composants non textuels 3:1, navigation clavier complète et lien d'évitement.
- Liens externes reconnaissables ; vidéos ne démarrent jamais automatiquement ; aucune information essentielle uniquement par couleur.
- Formulaire : labels visibles, messages d'erreur proches des champs, protection anti-spam sans rendre le formulaire inutilisable.
- Vérifications avant livraison : liens, versions FR/EN, métadonnées, données structurées avec validateur Schema.org, responsivité, performance Lighthouse, capture des erreurs 404.

## Hors périmètre initial

- Paiement natif, espace membre, blog et CMS complet.
- Automatisation non supervisée de traductions ou récupération de vidéos.
- Inventaire intégral des 17 livres tant que métadonnées et URL individuelles ne sont pas fournies.

## Décisions à obtenir avant publication

1. Coordonnées bancaires, bénéficiaires et mobile money exacts.
2. Adresse e-mail ou solution de contact officielle.
3. Titres, descriptions et liens individuels des ouvrages sélectionnés.
4. Autorisation de publier biographie familiale telle que fournie.
5. Nom de domaine final ; création Search Console et GA4 après mise en ligne.
