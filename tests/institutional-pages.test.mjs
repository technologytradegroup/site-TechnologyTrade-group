import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const routes = [
  ["vision-et-mission", "vision"],
  ["fonctionnement-de-la-plateforme", "fonctionnement"],
  ["solutions-et-services", "solutions"],
  ["ecosysteme", "ecosysteme"],
  ["partenariats", "partenariats"],
  ["contact", "contact"],
  ["faq", "faq"],
  ["conditions-utilisation", "conditions"],
  ["politique-de-confidentialite", "confidentialite"],
  ["gouvernance-et-equipe", "gouvernance"],
  ["carrieres", "carrieres"],
  ["tarifs", "tarifs"],
  ["mentions-legales", "mentions"],
];

test("each remaining institutional mockup has a dedicated app route", () => {
  for (const [path, id] of routes) {
    const route = readFileSync(`app/${path}/page.tsx`, "utf8");
    assert.match(route, new RegExp(`InstitutionalPage id="${id}"`));
    assert.match(route, new RegExp(`institutionalMetadata\\("${id}"\\)`));
  }
});

test("institutional pages use the shared shell and original brand assets", () => {
  const component = readFileSync("components/InstitutionalPages.tsx", "utf8");
  assert.match(component, /Logo_horizontal_couleur\.svg/);
  assert.match(component, /Logo_horizontal_blanc\.svg/);
  assert.match(component, /Aucune donnée n’a été transmise/);
  assert.equal(existsSync("app/presentation-du-groupe/page.tsx"), true);
  assert.equal(existsSync("app/page.tsx"), true);
});
