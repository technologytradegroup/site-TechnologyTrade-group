export type SupplierPageId = "account" | "profile" | "dashboard" | "services" | "portfolio" | "catalogue" | "create-offer" | "edit-offer" | "published" | "requests" | "request-detail" | "quote" | "proposals" | "orders" | "statistics" | "collaborators" | "settings";
export const supplierRoutes: { path: string; title: string; id: SupplierPageId }[] = [
  { path: "/espace-fournisseur/inscription-professionnelle", title: "Inscription professionnelle", id: "account" },
  { path: "/espace-fournisseur/profil-entreprise", title: "Profil de l’entreprise", id: "profile" },
  { path: "/espace-fournisseur/tableau-de-bord", title: "Tableau de bord", id: "dashboard" },
  { path: "/espace-fournisseur/services", title: "Services", id: "services" },
  { path: "/espace-fournisseur/portfolio", title: "Portfolio", id: "portfolio" },
  { path: "/espace-fournisseur/catalogue", title: "Catalogue", id: "catalogue" },
  { path: "/espace-fournisseur/creer-une-offre", title: "Créer une offre", id: "create-offer" },
  { path: "/espace-fournisseur/modifier-une-offre", title: "Modifier l’offre", id: "edit-offer" },
  { path: "/espace-fournisseur/offres-publiees", title: "Offres publiées", id: "published" },
  { path: "/espace-fournisseur/demandes-recues", title: "Demandes reçues", id: "requests" },
  { path: "/espace-fournisseur/demandes-recues/modernisation-gestion-escales", title: "Modernisation du système de gestion des escales", id: "request-detail" },
  { path: "/espace-fournisseur/preparer-un-devis", title: "Préparer un devis", id: "quote" },
  { path: "/espace-fournisseur/propositions-commerciales", title: "Propositions commerciales", id: "proposals" },
  { path: "/espace-fournisseur/commandes-et-prestations", title: "Commandes et prestations", id: "orders" },
  { path: "/espace-fournisseur/statistiques", title: "Statistiques", id: "statistics" },
  { path: "/espace-fournisseur/collaborateurs", title: "Collaborateurs", id: "collaborators" },
  { path: "/espace-fournisseur/parametres-professionnels", title: "Paramètres professionnels", id: "settings" },
];
export function resolveSupplierRoute(slug: string[]) {
  const path = `/espace-fournisseur/${slug.join("/")}`;
  return supplierRoutes.find((route) => route.path === path) ?? null;
}
