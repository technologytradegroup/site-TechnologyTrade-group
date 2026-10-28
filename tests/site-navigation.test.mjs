import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { clientRoutes, requestRoutes } from "../components/journey-routes.ts";
import { pages } from "../lib/institutional-pages.ts";
import { marketRoutes, offers } from "../lib/marketplace.ts";
import { routePaths } from "../lib/opportunity-content-routes.ts";
import { supplierRoutes } from "../lib/supplier-workspace.ts";

const routes = new Set([
  "/",
  "/presentation-du-groupe",
  "/demande",
  "/espace-client",
  ...Object.values(pages).map((page) => page.href),
  ...marketRoutes.map((route) => route.path),
  ...offers.map((offer) => offer.href),
  ...requestRoutes.map((route) => `/demande/${route.slug}`),
  ...clientRoutes.map((route) => `/espace-client/${route.slug}`),
  ...supplierRoutes.map((route) => route.path),
  ...Object.values(routePaths),
]);

const sharedShells = [
  "components/HomeExperience.tsx",
  "components/GroupPresentation.tsx",
  "components/InstitutionalPages.tsx",
  "components/MarketplacePages.tsx",
];

test("static internal links in the shared site shells resolve to published routes", () => {
  for (const sourcePath of sharedShells) {
    const source = readFileSync(sourcePath, "utf8");
    const paths = [...source.matchAll(/\bhref=["'](\/[^"'#?]*)/g)].map((match) => match[1]);
    for (const path of paths) {
      assert.ok(routes.has(path), `${sourcePath} links to an unpublished route: ${path}`);
    }
  }
});

test("institutional navigation links lead to the implemented destinations", () => {
  for (const path of ["/marketplace", "/opportunites", "/ressources", "/presentation-du-groupe", "/demande/presentation-du-service", "/espace-client/connexion", "/espace-fournisseur/inscription-professionnelle"]) {
    assert.ok(routes.has(path), `Missing destination ${path}`);
  }
});
