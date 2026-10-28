export type Offer = {
  id: string;
  title: string;
  provider: string;
  monogram: string;
  category: string;
  type: string;
  price: string;
  unit: string;
  rating: string;
  reviews: string;
  city: string;
  country: string;
  art: "dashboard" | "cloud" | "security" | "assistant" | "training" | "sunburst";
  href: string;
  summary: string;
};

export const offers: Offer[] = [
  { id: "gestion-portuaire", title: "Plateforme de gestion portuaire et des escales", provider: "Atlas Software Studio", monogram: "AS", category: "Logiciels", type: "Logiciel", price: "3 900 €", unit: "par an", rating: "4.8", reviews: "126", city: "Casablanca", country: "Maroc", art: "dashboard", href: "/marketplace/offres/gestion-portuaire", summary: "Une plateforme unique pour suivre les navires, planifier les quais, gérer les escales et facturer les prestations portuaires." },
  { id: "cloud-souverain", title: "Cloud souverain en Afrique centrale", provider: "Kivu Cloud Systems", monogram: "KC", category: "Cloud", type: "Solution", price: "480 €", unit: "par mois", rating: "4.7", reviews: "84", city: "Kigali", country: "Rwanda", art: "cloud", href: "/marketplace/offres/cloud-souverain", summary: "" },
  { id: "audit-cybersecurite", title: "Audit de cybersécurité et tests d’intrusion", provider: "Sahel Cyber Défense", monogram: "SC", category: "Cybersécurité", type: "Service", price: "6 500 €", unit: "par mission", rating: "4.9", reviews: "61", city: "Dakar", country: "Sénégal", art: "security", href: "/marketplace/offres/audit-cybersecurite", summary: "Évaluation complète de votre exposition avec plan de remédiation priorisé." },
  { id: "assistant-documentaire", title: "Assistant documentaire multilingue", provider: "Nexora Labs", monogram: "NL", category: "IA et données", type: "Solution", price: "Sur devis", unit: "", rating: "4.6", reviews: "38", city: "Lagos", country: "Nigéria", art: "assistant", href: "/marketplace/offres/assistant-documentaire", summary: "Assistant documentaire multilingue" },
  { id: "erp-pme", title: "ERP modulaire pour PME : comptabilité, stock, paie", provider: "Mara ERP Solutions", monogram: "ME", category: "Logiciels", type: "Logiciel", price: "29 €", unit: "par utilisateur / mois", rating: "4.6", reviews: "174", city: "Nairobi", country: "Kenya", art: "dashboard", href: "/marketplace/offres/erp-pme", summary: "ERP modulaire pour PME : comptabilité, stock, paie" },
  { id: "portail-eservices", title: "Portail e-services pour administrations publiques", provider: "Lumen GovTech", monogram: "LG", category: "Logiciels", type: "Solution", price: "Sur devis", unit: "", rating: "4.7", reviews: "57", city: "Accra", country: "Ghana", art: "sunburst", href: "/marketplace/offres/portail-eservices", summary: "Portail e-services pour administrations publiques" },
  { id: "paiement-mobile", title: "Application mobile de paiement marchand", provider: "Kasai Fintech Works", monogram: "KF", category: "Finance", type: "Logiciel", price: "12 000 €", unit: "licence", rating: "4.4", reviews: "22", city: "Kinshasa", country: "Congo", art: "dashboard", href: "/marketplace/offres/paiement-mobile", summary: "Application mobile de paiement marchand" },
  { id: "sig-collectivites", title: "Système d’information géographique pour collectivités", provider: "Zambezi Data Partners", monogram: "ZD", category: "IA et données", type: "Solution", price: "8 200 €", unit: "par an", rating: "4.5", reviews: "29", city: "Lusaka", country: "Zambie", art: "assistant", href: "/marketplace/offres/sig-collectivites", summary: "Système d’information géographique pour collectivités" },
  { id: "programme-data", title: "Programme Data Analytics pour cadres", provider: "Baobab Digital Academy", monogram: "BD", category: "Formation", type: "Service", price: "1 450 €", unit: "par participant", rating: "4.7", reviews: "212", city: "Abidjan", country: "Côte d’Ivoire", art: "training", href: "/marketplace/offres/programme-data", summary: "Cinq jours pour maîtriser l’analyse de données et les tableaux de bord décisionnels." },
  { id: "soc", title: "Centre d’opérations de sécurité managé (SOC)", provider: "Sahel Cyber Défense", monogram: "SC", category: "Cybersécurité", type: "Service", price: "3 100 €", unit: "par mois", rating: "4.9", reviews: "61", city: "Dakar", country: "Sénégal", art: "security", href: "/marketplace/offres/soc", summary: "Surveillance continue de vos systèmes et réponse aux incidents." },
  { id: "developpement-mobile", title: "Développement d’application mobile sur mesure", provider: "Mara ERP Solutions", monogram: "ME", category: "Logiciels", type: "Service", price: "15 000 €", unit: "par projet", rating: "4.6", reviews: "174", city: "Nairobi", country: "Kenya", art: "dashboard", href: "/marketplace/offres/developpement-mobile", summary: "Développement d’application mobile sur mesure" },
  { id: "systeme-portuaire", title: "Système d’information géographique pour collectivités", provider: "Zambezi Data Partners", monogram: "ZD", category: "IA et données", type: "Solution", price: "8 200 €", unit: "par an", rating: "4.5", reviews: "29", city: "Lusaka", country: "Zambie", art: "assistant", href: "/marketplace/offres/systeme-portuaire", summary: "" },
  { id: "reseau-wifi", title: "Réseau Wi-Fi et liaison VSAT pour sites isolés", provider: "Bassin Telecom Services", monogram: "BT", category: "Cloud", type: "Produit", price: "2 300 €", unit: "par site", rating: "4.5", reviews: "93", city: "Brazzaville", country: "Congo", art: "cloud", href: "/marketplace/offres/reseau-wifi", summary: "Kit complet de connectivité avec installation et maintenance sur site." },
  { id: "pare-feu", title: "Pare-feu nouvelle génération pour réseaux d’entreprise", provider: "Sahel Cyber Défense", monogram: "SC", category: "Cybersécurité", type: "Produit", price: "3 400 €", unit: "par unité", rating: "4.9", reviews: "61", city: "Dakar", country: "Sénégal", art: "security", href: "/marketplace/offres/pare-feu", summary: "Protection du périmètre et inspection du trafic chiffré." },
  { id: "serveurs-rack", title: "Serveurs rack et stockage pour salle informatique", provider: "Bassin Telecom Services", monogram: "BT", category: "Cloud", type: "Produit", price: "7 800 €", unit: "par unité", rating: "4.5", reviews: "93", city: "Brazzaville", country: "Congo", art: "assistant", href: "/marketplace/offres/serveurs-rack", summary: "Configuration clé en main avec installation et mise en service." },
  { id: "routeurs-wifi", title: "Routeurs et points d’accès Wi-Fi 6 pour campus", provider: "Bassin Telecom Services", monogram: "BT", category: "Cloud", type: "Produit", price: "1 150 €", unit: "par site", rating: "4.5", reviews: "93", city: "Brazzaville", country: "Congo", art: "cloud", href: "/marketplace/offres/routeurs-wifi", summary: "Couverture haute densité pour universités, hôpitaux et zones portuaires." },
  { id: "onduleurs", title: "Onduleurs et alimentation solaire pour salles serveurs", provider: "Kivu Cloud Systems", monogram: "KC", category: "Cloud", type: "Produit", price: "5 600 €", unit: "par unité", rating: "4.7", reviews: "84", city: "Kigali", country: "Rwanda", art: "training", href: "/marketplace/offres/onduleurs", summary: "Continuité de service avec batteries lithium et suivi à distance." },
  { id: "postes-durcis", title: "Postes de travail durcis pour environnements chauds", provider: "Mara ERP Solutions", monogram: "ME", category: "Logiciels", type: "Produit", price: "890 €", unit: "par poste", rating: "4.6", reviews: "174", city: "Nairobi", country: "Kenya", art: "assistant", href: "/marketplace/offres/postes-durcis", summary: "Ordinateurs robustes, chiffrés et gérés à distance." },
];

export const suppliers = [
  { name: "Atlas Software Studio", monogram: "AS", city: "Casablanca, Maroc", expertise: "Éditeur de logiciels", rating: "4.8", reviews: "126" },
  { name: "Kivu Cloud Systems", monogram: "KC", city: "Kigali, Rwanda", expertise: "Hébergement et infrastructures", rating: "4.7", reviews: "84" },
  { name: "Sahel Cyber Défense", monogram: "SC", city: "Dakar, Sénégal", expertise: "Cybersécurité", rating: "4.9", reviews: "61" },
  { name: "Baobab Digital Academy", monogram: "BD", city: "Abidjan, Côte d’Ivoire", expertise: "Formation", rating: "4.7", reviews: "212" },
];

export const initialFavoriteIds = ["gestion-portuaire", "cloud-souverain", "audit-cybersecurite", "paiement-mobile", "sig-collectivites", "erp-pme"];
export const initialCompareIds = ["gestion-portuaire", "erp-pme", "portail-eservices"];

export const marketRoutes = [
  { id: "home", path: "/marketplace", title: "Marketplace numérique", description: "Parcourez des solutions numériques, services et produits proposés par des fournisseurs de la marketplace." },
  { id: "services", path: "/marketplace/services", title: "Services numériques", description: "Audit, intégration, développement sur mesure, formation et assistance : découvrez les services numériques." },
  { id: "logiciels", path: "/marketplace/logiciels", title: "Logiciels et applications", description: "ERP, applications métier, plateformes de paiement et tableaux de bord, en abonnement ou en licence." },
  { id: "solutions", path: "/marketplace/solutions", title: "Solutions technologiques", description: "Des solutions qui combinent logiciels, infrastructures et accompagnement." },
  { id: "produits", path: "/marketplace/produits", title: "Produits et matériel", description: "Serveurs, équipements réseau, sécurité et connectivité, avec installation et maintenance." },
  { id: "categories", path: "/marketplace/categories", title: "Navigation par catégories", description: "Explorez les domaines et sous-catégories de la marketplace." },
  { id: "recherche", path: "/marketplace/recherche", title: "Recherche globale", description: "Recherchez des offres et fournisseurs dans la marketplace TechnologyTrade Group." },
  { id: "resultats", path: "/marketplace/resultats", title: "Résultats de recherche", description: "Parcourez les offres, fournisseurs et ressources qui correspondent à votre recherche." },
  { id: "filtres", path: "/marketplace/filtres", title: "Filtres avancés", description: "Affinez votre recherche par budget, tarification, caractéristiques et certification." },
  { id: "detail", path: "/marketplace/offres/gestion-portuaire", title: "Plateforme de gestion portuaire et des escales", description: "Détails de la plateforme de gestion portuaire et des escales proposée par Atlas Software Studio." },
  { id: "fournisseur", path: "/marketplace/fournisseurs/atlas-software-studio", title: "Atlas Software Studio — Fournisseur", description: "Présentation du fournisseur Atlas Software Studio, ses offres et informations de vérification." },
  { id: "comparaison", path: "/marketplace/comparaison", title: "Comparer des solutions", description: "Comparez les prix, fonctionnalités et évaluations des solutions sélectionnées." },
  { id: "favoris", path: "/marketplace/favoris", title: "Mes favoris", description: "Retrouvez les offres et fournisseurs que vous avez enregistrés localement." },
  { id: "devis", path: "/marketplace/demande-de-devis", title: "Demander un devis", description: "Préparez localement une demande de devis pour une offre de la marketplace." },
  { id: "demonstration", path: "/marketplace/demande-de-demonstration", title: "Demander une démonstration", description: "Choisissez des préférences pour une démonstration fictive en visioconférence." },
  { id: "confirmation", path: "/marketplace/confirmation", title: "Confirmation de demande — démonstration", description: "Récapitulatif local d’une demande de démonstration, sans envoi réseau." },
] as const;

export function findMarketplacePage(path: string) {
  return marketRoutes.find((route) => route.path === path);
}
