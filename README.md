# TechnologyTrade Group

Prototype Next.js des parcours TechnologyTrade Group. Les références desktop des dossiers 01 à 09 sont intégrées : site institutionnel, marketplace, demande, espaces client et fournisseur, opportunités, ressources, administration et états d’interface. Les 7 planches du dossier 00 servent de système graphique partagé.

## Parcours disponibles

- Site public : accueil, présentation du groupe et pages institutionnelles.
- Gouvernance : portraits publics des membres présentés, servis depuis `public/members`.
- Marketplace : catalogues, recherche, filtres, détails d’offres et fournisseurs, comparaison, favoris, devis et démonstration.
- Demande : parcours guidé en sept étapes, confirmation et suivi.
- Espace client : inscription et connexion de démonstration, profil, demandes, devis, commandes, documents et paramètres.
- Espace fournisseur : inscription de démonstration, profil, catalogue, offres, demandes, devis, commandes et paramètres.
- Opportunités et ressources : appels d’offres et à projets, programmes, candidatures, actualités, études, guides et événements.
- Administration et états d’interface : écrans illustratifs accessibles par leurs routes dédiées; ils ne fournissent ni authentification ni fonctions privilégiées.

Les données et les textes d’exemple sont statiques et proviennent des maquettes. Les interactions sont des démonstrations locales : aucune demande, inscription, candidature, invitation, commande, téléversement ou message n’est transmis. Aucun paiement, service d’authentification ou backend n’est configuré. Les données de marketplace enregistrées pour les favoris et la comparaison restent dans le navigateur.

## Développement

- Node.js 24+
- `npm install`
- `npm run dev`

## Publication sur Vercel

Le projet doit être importé depuis le dépôt GitHub `technologytradegroup/site-TechnologyTrade-group`, à sa racine. Dans Vercel, créez un projet en important ce dépôt et conservez les réglages détectés pour Next.js :

- Répertoire racine : `./`
- Commande de build : `npm run build`
- Répertoire de sortie : valeur par défaut de Next.js
- Variables d’environnement : aucune requise pour cette démonstration

Déployez la branche `main`. Vercel prend en charge les routes Next.js du projet ; publier le code sur GitHub seul ne rend pas encore le site accessible. Chaque nouveau push sur `main` déclenchera ensuite un nouveau déploiement.

## Vérifications

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

## Marque et typographie

Montserrat est servie depuis `public/fonts`, sans requête à Google Fonts. Copyright 2024 The Montserrat.Git Project Authors (https://github.com/JulietaUla/Montserrat.git), sous licence SIL Open Font License 1.1. L’avis complet est conservé dans `public/fonts/OFL.txt`.

Les variantes SVG du logo utilisées dans l’interface sont les fichiers officiels fournis, copiés sans modification dans `public/brand`.
