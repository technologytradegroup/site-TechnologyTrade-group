# Kit logo TechnologyTrade Group - README technique

Dossier à ouvrir dans Illustrator / Affinity / Inkscape / Figma. **Le logo n'a pas été redessiné** : il est vectorisé par contours à partir du fichier fourni (`00_Source_Originale/`), puis décliné sans modifier ses formes, ses proportions ni ses couleurs d'origine.

## 1. Contenu

| Dossier | Contenu |
|---|---|
| `00_Source_Originale/` | PNG fourni (370 x 109 px, **conservé tel quel**) et sa version à fond transparent (370 x 109 px natif) |
| `SVG/` | 18 déclinaisons + `TTG_Logo_SOURCE_MAITRE.svg` (calques nommés : Symbole, Filet, Nom de marque, Slogan, Repères masqués) |
| `PDF/` | mêmes 18 déclinaisons, vectorielles, CMJN (valeurs de la planche), aucune police déclarée |
| `EPS/` | mêmes 18 déclinaisons, PostScript niveau 2, CMJN, sans transparence |
| `PNG/` | mêmes 18 déclinaisons, **fond transparent**, 300 ppp (symbole 1200 px, nom 1600 px, autres 2400 px de large) |
| `Apercus/` | `Planche_variantes.png` ; `Comparaison_original_vs_vectorisation.png` (original x4 / vecteur / différence) |
| `Scripts/` | `Convertir_SVG_en_AI.jsx` (script Illustrator, **non testé dans Adobe**) |
| `Polices_Montserrat_OFL/` | Montserrat (licence OFL) : utilisée pour le slogan et les textes des autres supports, **pas** pour le nom de marque |
| `Rapport_fidelite_vectorisation.json` | mesures de fidélité et contrôles EPS/PDF |

## 2. Nomenclature

`<disposition>_<variante>.<ext>` - **ne pas renommer** les fichiers (les gabarits du kit les référencent).

- **Dispositions** : `Logo_principal` (celle du fichier fourni : symbole + filet + nom en deux lignes), `Symbole` (symbole seul), `Nom_de_marque` (texte seul), `Logo_horizontal` (une ligne, comme l'exemple « HORIZONTAL » de la planche : voir réserve 3 du §4), `Logo_principal_avec_slogan` (couleur et blanc).
- **Variantes** : `couleur`, `noir`, `monochrome`, `blanc`.

## 3. Ouvrir / éditer

1. **Illustrator** : ouvrir le SVG, PDF ou EPS (File > Open). Les chemins sont des formes remplies, groupées et nommées (`Segment_01_marine`, `Filet_separateur`, `Ligne1_TechnologyTrade_lettre_01`...). Pour obtenir un `.ai`, enregistrer sous : *File > Save As > Adobe Illustrator (.ai)*. `Scripts/Convertir_SVG_en_AI.jsx` automatise cette opération (File > Scripts > Other Script) mais **n'a pas été exécuté dans Adobe** dans cet environnement.
2. **Inkscape / Affinity / Figma** : importer le SVG.
3. **Fichiers « blanc » PDF/EPS** : ils embarquent un rectangle Deep Navy (pour être visibles dans les visionneuses). Supprimer ce rectangle pour poser le logo sur un autre fond ; les SVG et PNG « blanc » sont, eux, transparents.
4. **Couleurs** : modifier uniquement par les variantes fournies. Valeurs CMJN : voir la charte graphique.

## 4. Fidélité et limites (à lire)

1. **Pas de fichier `.ai` natif** : impossible à produire dans cet environnement. Alternatives livrées : SVG, PDF vectoriel, EPS, script JSX.
2. **Source en basse résolution (370 x 109 px)** : le tracé suit les bords de la source ; l'écart mesuré est de 3,2 / 255 en moyenne par pixel et 0,44 % des pixels dépassent 40 / 255 (IoU = 0,978). Voir `Apercus/Comparaison_original_vs_vectorisation.png`.
3. **Variante `Logo_horizontal` (une ligne)** : la planche de référence en montre un exemple « HORIZONTAL » (symbole + filet + « TechnologyTrade Group » sur une ligne), mais à très petite taille et sans fichier source. Elle est reconstituée ici en plaçant côte à côte les contours déjà tracés de « TechnologyTrade » et « Group » ; l'espacement entre les deux mots est **mesuré sur la planche, donc approximatif**. Aucune lettre n'est redessinée.
4. **Pas de version verticale** : absente de la référence, donc non inventée.
5. **Couleurs** : le logo fourni contient du Deep Navy mesuré (RVB 9/23/56) et un vert mesuré (RVB 13/146/100) ; la planche documente Deep Navy (10/29/61) et Emerald Green (0/166/118). L'écart du vert est signalé dans la charte ; le logo `couleur` conserve les valeurs **mesurées** du fichier fourni, les supports (cartes, badge, etc.) utilisent les valeurs **documentées**.
6. **Variantes `noir` / `monochrome`** : valeurs dérivées (Graphite RVB 30/30/30 ; gris RVB 120/120/120), non documentées dans la planche.
7. **Contrôle EPS** : lu et rastérisé par un interpréteur interne limité aux opérateurs émis (pas d'Adobe, pas de Ghostscript) ; IoU 0,97 - 1,00 vs rendu de référence (les écarts des versions « blanc » viennent du rectangle de fond navy).
8. **PDF** : non certifiés PDF/X ; CMJN en valeurs directes (sans profil ICC incorporé).
