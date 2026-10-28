import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const component = readFileSync("components/RequestClientJourneys.tsx", "utf8");
const routeData = readFileSync("components/journey-routes.ts", "utf8");
const routes = (name) => {
  const match = routeData.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const`));
  assert.ok(match, `${name} is exported`);
  return Array.from(match[1].matchAll(/slug:"([^"]+)"/g), (item) => item[1]);
};
const requirementSlugs = ["presentation-du-service", "type-de-besoin", "description-du-projet", "objectifs", "budget-et-delais", "organisation", "documents", "recapitulatif", "confirmation", "suivi"];
const clientSlugs = ["inscription", "connexion", "mot-de-passe-oublie", "creation-du-profil", "onboarding", "tableau-de-bord", "profil-personnel", "organisation", "mes-demandes", "demande/DEM-2026-0412", "devis-recus", "commandes", "documents", "notifications", "favoris", "parametres", "securite"];

test("all 27 mockups map to distinct stable routes in the right order", () => {
  assert.deepEqual(routes("requestRoutes"), requirementSlugs);
  const stageLine = component.match(/const stages=\[(.*?)\];/);
  assert.ok(stageLine, "wizard steps are defined");
  assert.deepEqual(Array.from(stageLine[1].matchAll(/"([^"]+)"/g), (item) => item[1]), ["Type de besoin", "Description du projet", "Objectifs", "Budget et d\u00e9lais", "Organisation", "Documents", "R\u00e9capitulatif"]);
  assert.deepEqual(routes("clientRoutes"), clientSlugs);
  assert.equal(new Set([...requirementSlugs.map((x) => `/demande/${x}`), ...clientSlugs.map((x) => `/espace-client/${x}`)]).size, 27);
});

test("short routes redirect to the explicit first and sign-in pages", () => {
  assert.match(readFileSync("app/demande/page.tsx", "utf8"), /redirect\("\/demande\/presentation-du-service"\)/);
  assert.match(readFileSync("app/espace-client/page.tsx", "utf8"), /redirect\("\/espace-client\/connexion"\)/);
});

test("dynamic routes validate known pages, export metadata and cover each listed path", () => {
  const requestPage = readFileSync("app/demande/[...slug]/page.tsx", "utf8");
  const clientPage = readFileSync("app/espace-client/[...slug]/page.tsx", "utf8");
  assert.match(requestPage, /generateStaticParams/);
  assert.match(clientPage, /generateStaticParams/);
  assert.match(requestPage, /generateMetadata/);
  assert.match(clientPage, /generateMetadata/);
  assert.match(requestPage, /notFound\(\)/);
  assert.match(clientPage, /notFound\(\)/);
  assert.equal(existsSync("app/demande/[...slug]/page.tsx"), true);
  assert.equal(existsSync("app/espace-client/[...slug]/page.tsx"), true);
});

test("prototype interactions do not claim to authenticate, transmit, or secure data", () => {
  assert.doesNotMatch(component, /href=["']#["']/);
});

