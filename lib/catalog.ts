export const searchTabs = ["Solutions", "Fournisseurs", "Opportunités"] as const;

export type SearchTab = (typeof searchTabs)[number];

export const categories = [
  "Logiciels et applications",
  "Intelligence artificielle et données",
  "Cloud et infrastructures",
  "Cybersécurité",
  "Formation et compétences",
  "Recherche et innovation",
  "Financement et investissement",
  "Marketplace",
  "Impact et ONG",
] as const;

export const countries = ["Congo", "Sénégal", "Côte d’Ivoire", "Nigéria", "Rwanda", "Mali", "Niger", "Burkina Faso"] as const;

export type CatalogItem = {
  tab: SearchTab;
  title: string;
  organization: string;
  category: string;
  country: string;
  description: string;
  href: string;
};

export const catalog: CatalogItem[] = [
  {
    tab: "Solutions",
    title: "Plateforme de gestion portuaire et des escales",
    organization: "Atlas Software Studio",
    category: categories[0],
    country: "Congo",
    description: "Gestion portuaire et des escales",
    href: "#offres",
  },
  {
    tab: "Solutions",
    title: "Cloud souverain en Afrique centrale",
    organization: "Kivu Cloud Systems",
    category: categories[2],
    country: "Rwanda",
    description: "Cloud souverain",
    href: "#offres",
  },
  {
    tab: "Solutions",
    title: "Audit de cybersécurité et tests d’intrusion",
    organization: "Sahel Cyber Défense",
    category: categories[3],
    country: "Sénégal",
    description: "Audit, cybersécurité et tests d’intrusion",
    href: "#offres",
  },
  {
    tab: "Solutions",
    title: "Assistant documentaire multilingue",
    organization: "Nexora Labs",
    category: categories[1],
    country: "Nigéria",
    description: "Assistant documentaire multilingue",
    href: "#offres",
  },
  {
    tab: "Fournisseurs",
    title: "Atlas Software Studio",
    organization: "Atlas Software Studio",
    category: categories[0],
    country: "Congo",
    description: "Solutions numériques · Casablanca",
    href: "#offres",
  },
  {
    tab: "Fournisseurs",
    title: "Kivu Cloud Systems",
    organization: "Kivu Cloud Systems",
    category: categories[2],
    country: "Rwanda",
    description: "Cloud et infrastructures",
    href: "#offres",
  },
  {
    tab: "Fournisseurs",
    title: "Sahel Cyber Défense",
    organization: "Sahel Cyber Défense",
    category: categories[3],
    country: "Sénégal",
    description: "Cybersécurité · Dakar",
    href: "#offres",
  },
  {
    tab: "Fournisseurs",
    title: "Nexora Labs",
    organization: "Nexora Labs",
    category: categories[1],
    country: "Nigéria",
    description: "Intelligence artificielle et données",
    href: "#offres",
  },
  {
    tab: "Opportunités",
    title: "Plateforme de paiement électronique des redevances portuaires",
    organization: "Office National des Ports du Lac",
    category: "Appel d’offres",
    country: "Congo",
    description: "250 000 – 400 000 € · Date limite 30 nov. 2026",
    href: "#opportunites",
  },
  {
    tab: "Opportunités",
    title: "Programme d’inclusion numérique des PME rurales",
    organization: "Fondation Horizon Afrique",
    category: "Appel à projets",
    country: "Multi-pays",
    description: "Subvention jusqu’à 80 000 € · Date limite 15 déc. 2026",
    href: "#opportunites",
  },
  {
    tab: "Opportunités",
    title: "Accélérateur Fintech Afrique de l’Ouest, cohorte 4",
    organization: "Atlantic Capital Partners",
    category: "Programme startups",
    country: "Sénégal, Côte d’Ivoire",
    description: "Investissement amorçage · Date limite 10 nov. 2026",
    href: "#opportunites",
  },
  {
    tab: "Opportunités",
    title: "Consortium de recherche en IA pour l’agriculture",
    organization: "Labs Consortium Sahel",
    category: "Projet collaboratif",
    country: "Mali, Niger, Burkina Faso",
    description: "Partenaires recherchés · Date limite 05 janv. 2027",
    href: "#opportunites",
  },
];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
}

export function filterCatalog(
  items: CatalogItem[],
  filters: { tab: SearchTab; query?: string; category?: string; country?: string },
): CatalogItem[] {
  const query = normalize(filters.query?.trim() ?? "");

  return items.filter((item) => {
    if (item.tab !== filters.tab) return false;
    if (filters.category && filters.category !== "Toutes les catégories" && item.category !== filters.category) return false;
    if (filters.country && filters.country !== "Tous les pays" && !item.country.split(",").some((country) => normalize(country.trim()) === normalize(filters.country!))) return false;
    if (!query) return true;

    return normalize([item.title, item.organization, item.category, item.country, item.description].join(" ")).includes(query);
  });
}



export function filterOfferCards<T extends { title: string }>(offers: T[], results: CatalogItem[] | null): T[] {
  if (results === null) return offers;
  const titles = new Set(results.map((item) => item.title));
  return offers.filter((offer) => titles.has(offer.title));
}
