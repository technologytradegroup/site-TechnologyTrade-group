import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const component = readFileSync(fileURLToPath(new URL("components/AdminAndStatePages.tsx", root)), "utf8");
const adminRoutes = ["tableau-de-bord", "utilisateurs", "organisations", "fournisseurs", "moderation-des-offres", "categories", "demandes", "opportunites", "contenus-editoriaux", "roles-et-permissions", "parametres-generaux", "statistiques", "journaux-d-activite"];
const stateRoutes = ["recherche-sans-resultat", "catalogue-vide", "chargement", "erreur-serveur", "page-introuvable", "acces-non-autorise", "formulaire-invalide", "confirmation-avant-action", "notifications", "succes-confirmation", "tableau-de-bord-vide", "etats-des-composants"];

test("publishes all 13 administration routes and stable French slugs", () => {
  const list = component.split("export const stateScreens")[0];
  const slugs = [...list.matchAll(/\{slug:"([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(slugs, adminRoutes);
  assert.match(readFileSync(fileURLToPath(new URL("app/administration/[slug]/page.tsx", root)), "utf8"), /dynamicParams = false/);
  assert.match(component, /href=\{`\/administration\/\$\{item\.slug\}`/);
});

test("publishes all 12 interface-state routes", () => {
  const list = component.split("export const stateScreens")[1].split("const groups")[0];
  const slugs = [...list.matchAll(/slug:"([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(slugs, stateRoutes);
  assert.match(readFileSync(fileURLToPath(new URL("app/etats/[slug]/page.tsx", root)), "utf8"), /dynamicParams = false/);
});

test("keeps demo screens local, non-privileged and non-destructive", () => {
  assert.match(component, /<h1>\{screen\?\.title\}<\/h1>/);
  assert.match(component, /sans authentification/);
  assert.match(component, /aucune permission n’est appliquée/);
  assert.match(component, /Aucune offre, aucun compte ou aucune donnée ne sera modifié ou supprimé/);
  assert.doesNotMatch(component, /\b(fetch|localStorage|sessionStorage)\s*\(/);
  assert.doesNotMatch(component, /@\[domain\]|192\.168\./i);
});

test("includes accessible labels and feedback for interactive examples", () => {
  for (const marker of ['aria-label="Menu d’administration"', 'aria-current=', 'role="alert"', 'role="status"', 'role="dialog"', 'aria-modal="true"', 'aria-invalid=']) assert.ok(component.includes(marker), `Missing accessibility marker: ${marker}`);
});
