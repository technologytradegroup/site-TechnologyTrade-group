import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { routePaths } from "../lib/opportunity-content-routes.ts";

const cases = [
  ["opportunites", "opportunities", "06_01_Explorer_opportunites_Desktop.png"],
  ["opportunites/appels-a-projets", "projects", "06_02_Appels_projets_Desktop.png"],
  ["opportunites/appels-doffres", "tenders", "06_03_Appels_offres_Desktop.png"],
  ["opportunites/projets-collaboratifs", "collaborations", "06_04_Projets_collaboratifs_Desktop.png"],
  ["opportunites/recherche-partenaires", "partners", "06_05_Recherche_partenaires_Desktop.png"],
  ["opportunites/programmes-startups", "startups", "06_06_Programmes_startups_Desktop.png"],
  ["opportunites/opportunites-professionnelles", "careers", "06_07_Opportunites_professionnelles_Desktop.png"],
  ["opportunites/detail-appel-doffres", "detail", "06_08_Detail_opportunite_Desktop.png"],
  ["opportunites/candidature", "application", "06_09_Candidature_Desktop.png"],
  ["ressources/actualites", "news", "07_01_Actualites_Desktop.png"],
  ["ressources/actualites/cloud-souverain", "article", "07_02_Article_Desktop.png"],
  ["ressources", "catalogue", "07_03_Catalogue_ressources_Desktop.png"],
  ["ressources/etudes-rapports", "studies", "07_04_Etudes_rapports_Desktop.png"],
  ["ressources/etudes-de-cas", "case-studies", "07_05_Etudes_de_cas_Desktop.png"],
  ["ressources/guides-pratiques", "guides", "07_06_Guides_pratiques_Desktop.png"],
  ["ressources/publications-institutionnelles", "institutional", "07_07_Publications_institutionnelles_Desktop.png"],
  ["ressources/evenements", "events", "07_08_Evenements_Desktop.png"],
  ["ressources/archives", "archives", "07_09_Archives_filtres_Desktop.png"],
];
const source = readFileSync("components/OpportunityAndContentPages.tsx", "utf8");

test("each of the 18 desktop mockups has a dedicated French route", () => {
  assert.equal(cases.length, 18);
  for (const [path, page, screenshot] of cases) {
    const file = `app/${path}/page.tsx`;
    assert.equal(existsSync(file), true, `Missing /${path} for ${screenshot}`);
    const imageDir = path.startsWith("opportunites") ? "TTG_UIUX_06-Opportunites/06-Opportunites" : "TTG_UIUX_07-Contenus/07-Contenus";
    assert.equal(existsSync(`${imageDir}/${screenshot}`), true, `Missing source capture ${screenshot}`);
    assert.match(readFileSync(file, "utf8"), new RegExp(`page="${page}"`));
    assert.equal(routePaths[page], `/${path}`, `Exported route differs for ${screenshot}`);
  }
});

test("journey links target routes in the exported route map", () => {
  for (const id of ["detail", "application", "news", "article", "archives", "catalogue", "opportunities", "tenders", "studies", "case-studies", "guides", "institutional", "events"]) {
    const route = cases.find(([, page]) => page === id);
    assert.ok(route, `No route exists for ${id}`);
    assert.equal(routePaths[id], `/${route[0]}`, `The route map omits ${route[0]}`);
  }
  for (const id of ["detail", "application", "article", "archives"]) {
    assert.ok(source.includes(`href={routePaths.${id}}`), `No functional journey link to ${id}`);
  }
  assert.doesNotMatch(source, /href\s*=\s*["']#["']/);
});




