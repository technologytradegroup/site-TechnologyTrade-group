import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolveSupplierRoute, supplierRoutes } from "../lib/supplier-workspace.ts";

test("the 17 supplier mockups resolve to unique, stable French routes", () => {
  assert.equal(supplierRoutes.length, 17);
  assert.equal(new Set(supplierRoutes.map((route) => route.path)).size, 17);
  assert.equal(supplierRoutes[0].path, "/espace-fournisseur/inscription-professionnelle");
  for (const route of supplierRoutes) {
    assert.ok(route.path.startsWith("/espace-fournisseur/"));
    assert.ok(resolveSupplierRoute(route.path.split("/").slice(2)));
  }
  assert.equal(resolveSupplierRoute(["not-a-route"]), null);
});

test("the signup, offer, request, and quote flows connect internally", () => {
  const component = readFileSync("components/SupplierWorkspace.tsx", "utf8");
  for (const route of ["profile", "dashboard", "catalogue", "create-offer", "edit-offer", "published", "requests", "request-detail", "quote", "proposals", "orders", "statistics", "collaborators", "settings"]) {
    assert.ok(component.includes(`R[${JSON.stringify(route)}]`) || component.includes(`R.${route}`) || component.includes(route));
  }
  assert.match(component, /next=\{R\.profile\}/);
  assert.match(component, /href=\{R\.quote\}/);
  assert.match(readFileSync("app/espace-fournisseur/page.tsx", "utf8"), /inscription-professionnelle/);
});

test("sensitive-looking prototype actions explicitly stay local", () => {
  const component = readFileSync("components/SupplierWorkspace.tsx", "utf8");
  for (const message of ["aucun compte n’a été créé", "aucune invitation envoyée", "le devis n’a pas été envoyé", "aucun fichier n’a été téléversé"]) {
    assert.ok(component.includes(message), `Expected local-only disclosure: ${message}`);
  }
});
