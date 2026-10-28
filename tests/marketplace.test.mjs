import assert from "node:assert/strict";
import test from "node:test";
import { marketRoutes, offers } from "../lib/marketplace.ts";
import { readFileSync } from "node:fs";

test("the 16 Marketplace mockups map to unique live app routes", () => {
  assert.equal(marketRoutes.length, 16);
  assert.equal(new Set(marketRoutes.map((route) => route.path)).size, 16);
  for (const route of marketRoutes) assert.ok(route.path.startsWith("/marketplace"));
});

test("every displayed offer has its own real detail route", () => {
  assert.equal(new Set(offers.map((offer) => offer.id)).size, offers.length);
  for (const offer of offers) assert.equal(offer.href, `/marketplace/offres/${offer.id}`);
});

test("request and confirmation copy makes the local-only behavior explicit", () => {
  const component = readFileSync("components/MarketplacePages.tsx", "utf8");
  assert.match(component, /aucune réservation ni donnée ne sera envoyée/i);
  assert.match(component, /aucun e-mail, notification ou message n’a été envoyé/i);
  assert.match(component, /Enregistrer la demande localement/);
});
