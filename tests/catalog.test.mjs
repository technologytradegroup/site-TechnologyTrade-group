import assert from "node:assert/strict";
import test from "node:test";
import { catalog, filterCatalog, filterOfferCards } from "../lib/catalog.ts";

test("filters local solutions by accent-insensitive text", () => {
  const results = filterCatalog(catalog, { tab: "Solutions", query: "cybersecurite" });
  assert.equal(results.length, 1);
  assert.equal(results[0].title, "Audit de cybersécurité et tests d’intrusion");
});

test("filters by tab, category, and country", () => {
  const results = filterCatalog(catalog, {
    tab: "Fournisseurs",
    category: "Cloud et infrastructures",
    country: "Rwanda",
  });
  assert.deepEqual(results.map((item) => item.title), ["Kivu Cloud Systems"]);
});

test("filters multi-country opportunities by an individual country", () => {
  const results = filterCatalog(catalog, { tab: "Opportunités", country: "Côte d’Ivoire" });
  assert.deepEqual(results.map((item) => item.title), ["Accélérateur Fintech Afrique de l’Ouest, cohorte 4"]);
});

test("does not return entries from another tab", () => {
  assert.deepEqual(filterCatalog(catalog, { tab: "Opportunités", query: "Atlas" }), []);
});

test("filters the displayed Nexora Labs supplier", () => {
  const results = filterCatalog(catalog, { tab: "Fournisseurs", query: "Nexora Labs" });
  assert.equal(results.length, 1);
  assert.equal(results[0].title, "Nexora Labs");
});


test("filters displayed solution cards and restores them when filters are cleared", () => {
  const displayedOffers = catalog.filter((item) => item.tab === "Solutions");
  const cloudResults = filterCatalog(catalog, { tab: "Solutions", query: "Cloud" });

  assert.deepEqual(filterOfferCards(displayedOffers, cloudResults).map((item) => item.title), [
    "Cloud souverain en Afrique centrale",
  ]);
  assert.equal(filterOfferCards(displayedOffers, []).length, 0);
  assert.equal(filterOfferCards(displayedOffers, null).length, 4);
});
