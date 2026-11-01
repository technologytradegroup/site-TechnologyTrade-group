# TechnologyTrade Group

Prototype Next.js des parcours TechnologyTrade Group. Les références desktop des dossiers 01 à 09 sont intégrées : site institutionnel, marketplace, demande, espaces client et fournisseur, opportunités, ressources, administration et états d’interface. Les 7 planches du dossier 00 servent de système graphique partagé.

## Parcours disponibles

- Site public : accueil, présentation du groupe et pages institutionnelles.
- Gouvernance : portraits publics des membres présentés, servis depuis `public/members`.
- Marketplace : catalogues, recherche, filtres, détails d’offres et fournisseurs, comparaison, favoris, devis et démonstration.
- Demande : parcours guidé en sept étapes, confirmation et suivi.
- Espace client : parcours illustratifs; inscription, connexion et réinitialisation de mot de passe via Supabase Auth lorsque le backend est configuré.
- Espace fournisseur : parcours illustratifs; inscription professionnelle via Supabase Auth lorsque le backend est configuré.
- Opportunités et ressources : appels d’offres et à projets, programmes, candidatures, actualités, études, guides et événements.
- Administration et états d’interface : les routes `/administration/...` restent des écrans illustratifs sans données privilégiées. La nouvelle route `/admin` est séparée et exige une session Supabase ainsi que la permission `admin.access`.

Les données de marketplace et les contenus d’exemple restent issus des maquettes. Lorsque Supabase n’est pas configuré, les parcours gardent leur fonctionnement de démonstration locale. Le projet Supabase `lfzxrsxhnrzezqdmejwe` est configuré localement dans `.env.local` (ignoré par Git). Les deux migrations ont été appliquées via l’éditeur SQL : le socle initial compte 15 tables et la migration institutionnelle ajoute 22 tables, toutes les 22 avec RLS activé. Cette vérification confirme le schéma et l’activation des politiques, mais ne remplace pas encore un test complet des permissions avec plusieurs comptes. L’administration `/admin` vérifie la session et la permission `admin.access`, puis affiche des indicateurs autorisés réellement lus depuis Supabase; les formulaires de gestion ne sont pas encore connectés. Le domaine de production fourni est configuré comme URL du site et de redirection dans Supabase Auth. Les trois variables publiques requises sont aussi configurées dans l’environnement Production de Vercel; les environnements Preview et Development restent distincts. Le compte super-administrateur proposé n’apparaissait pas dans les utilisateurs Supabase et l’invitation n’a pas été confirmée comme envoyée; aucun rôle `super_admin` n’a été attribué. Aucun secret n’est fourni dans le dépôt.

## Développement

- Node.js 24+
- `npm install`
- `npm run dev`

## Backend Supabase (fondations appliquées)

Le dépôt contient deux migrations additives : la première définit les profils, organisations, offres marketplace, demandes, devis, opportunités, contenus, notifications et journaux d’audit; la seconde ajoute l’administration institutionnelle, les neuf piliers officiels en brouillon, les partenaires, le catalogue propre à TTG, les tarifs et les demandes de devis. Elles ont été appliquées au projet Supabase ci-dessus. Les 22 tables de la migration institutionnelle ont toutes RLS activé; la validation d’accès avec plusieurs utilisateurs reste à faire. Les formulaires d’inscription, de connexion et de réinitialisation utilisent Supabase Auth quand les variables publiques sont présentes. L’absence de session sur `/admin` renvoie à la connexion; la permission reste contrôlée côté serveur.

1. Pour un autre environnement, copiez `.env.example` vers `.env.local`, puis renseignez `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` et `NEXT_PUBLIC_SITE_URL`. La configuration du dépôt local existe déjà. La clé `service_role` ne doit jamais être ajoutée à `NEXT_PUBLIC_*`, à un fichier suivi par Git, ni au navigateur.
2. Dans Supabase Auth, l’URL du site est `https://site-technology-trade-group.vercel.app` et les redirections autorisées incluent `http://localhost:3000/**` et `https://site-technology-trade-group.vercel.app/**`. L’environnement Production Vercel utilise la même URL dans `NEXT_PUBLIC_SITE_URL`; configurez un projet Supabase distinct avant d’activer Preview ou Development.
3. Les migrations sont déjà appliquées sur le projet lié. Ne les rejouez pas sur cette base. Pour une nouvelle base, appliquez dans l’ordre `supabase/migrations/20261101170000_initial_backend.sql`, puis `supabase/migrations/20261101190000_enterprise_foundation.sql`.
4. Pour accorder le premier rôle d’administration, créez puis confirmez le compte par le parcours Auth, puis exécutez depuis l’éditeur SQL Supabase (pas depuis le site), en remplaçant l’adresse par celle de ce compte. Le compte communiqué pour cette mise en service n’apparaissait pas dans la liste des utilisateurs Supabase au dernier contrôle :

   ```sql
   insert into public.platform_admins (user_id, role)
   select id, 'super_admin'
   from auth.users
   where email = 'admin@example.com'
   on conflict (user_id) do update set role = excluded.role;
   ```

5. Lancez `npm run dev`, puis ouvrez `/admin`. Vérifiez l’inscription par e-mail, la confirmation, la connexion, la réinitialisation, la déconnexion et le refus d’accès pour un compte sans permission.

Sans configuration Supabase, `/admin` affiche un état explicite et ne révèle aucune donnée. Les espaces client et fournisseur restent des maquettes; les écrans de gestion CRUD, le stockage privé des documents, le flux public de demande de devis et les workflows métier restent à implémenter. Les fondations ne sont pas encore un backend de production : configurez les redirections Auth, attribuez un rôle administrateur explicitement, puis validez les politiques avec plusieurs rôles avant toute mise en service.

## Publication sur Vercel

Le projet de production est accessible à `https://site-technology-trade-group.vercel.app`. Après publication, la route `/admin` redirige bien une session absente vers la connexion; aucun compte super-administrateur n’est encore autorisé. Le projet est importé depuis le dépôt GitHub `technologytradegroup/site-TechnologyTrade-group`, à sa racine. Les variables Supabase sont définies pour Production dans Vercel; conservez les réglages détectés pour Next.js :

- Répertoire racine : `./`
- Commande de build : `npm run build`
- Répertoire de sortie : valeur par défaut de Next.js
- Variables d’environnement pour le backend : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` et `NEXT_PUBLIC_SITE_URL` sont configurées pour Production. Configurez Preview/Development uniquement avec un projet de test et ses propres clés. N’ajoutez jamais de clé `service_role` au client ou au dépôt.

Déployez la branche `main`. Vercel prend en charge les routes Next.js du projet ; publier le code sur GitHub seul ne rend pas encore le site accessible. Chaque nouveau push sur `main` déclenchera ensuite un nouveau déploiement.

## Vérifications

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

## Marque et typographie

Montserrat est servie depuis `public/fonts`, sans requête à Google Fonts. Copyright 2024 The Montserrat.Git Project Authors (https://github.com/JulietaUla/Montserrat.git), sous licence SIL Open Font License 1.1. L’avis complet est conservé dans `public/fonts/OFL.txt`.

Les variantes SVG du logo utilisées dans l’interface sont les fichiers officiels fournis, copiés sans modification dans `public/brand`.
