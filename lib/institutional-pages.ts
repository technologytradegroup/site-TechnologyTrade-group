export const pages = {
  vision: { title: "Vision et mission", description: "Pourquoi TechnologyTrade Group existe et où le groupe veut aller.", href: "/vision-et-mission", parent: "À propos" },
  fonctionnement: { title: "Comment fonctionne la plateforme", description: "De l’expression du besoin au contrat : trois parcours simples, des règles claires.", href: "/fonctionnement-de-la-plateforme", parent: "Plateforme" },
  solutions: { title: "Solutions et services", description: "Tout ce que TechnologyTrade Group met à disposition des entreprises, des institutions et des fournisseurs.", href: "/solutions-et-services", parent: "Plateforme" },
  ecosysteme: { title: "L’écosystème TechnologyTrade", description: "Des acteurs du numérique de tout le continent, reliés entre eux et avec leurs partenaires internationaux.", href: "/ecosysteme", parent: "Écosystème" },
  partenariats: { title: "Partenariats", description: "Institutions, entreprises technologiques, financeurs et universités : plusieurs façons de construire ensemble.", href: "/partenariats", parent: "Écosystème" },
  contact: { title: "Contact", description: "Une question, un projet, une proposition ? Choisissez le bon interlocuteur ou écrivez-nous directement.", href: "/contact", parent: "Contact" },
  faq: { title: "Foire aux questions", description: "Les réponses aux questions les plus fréquentes des acheteurs, des fournisseurs et des partenaires.", href: "/faq", parent: "Aide" },
  conditions: { title: "Conditions d’utilisation", description: "Les règles qui encadrent l’accès à la plateforme et son utilisation.", href: "/conditions-utilisation", parent: "Informations légales" },
  confidentialite: { title: "Politique de confidentialité", description: "Comment TechnologyTrade Group collecte, utilise et protège vos données.", href: "/politique-de-confidentialite", parent: "Informations légales" },
  gouvernance: { title: "Gouvernance et équipe", description: "Une équipe pluridisciplinaire et des instances indépendantes au service de la plateforme.", href: "/gouvernance-et-equipe", parent: "À propos" },
  carrieres: { title: "Carrières", description: "Rejoignez l’équipe qui construit la plateforme du marché numérique africain.", href: "/carrieres", parent: "À propos" },
  tarifs: { title: "Tarifs et commissions", description: "Gratuit pour les acheteurs. Des plans simples pour les fournisseurs, sans frais cachés.", href: "/tarifs", parent: "Plateforme" },
  mentions: { title: "Mentions légales", description: "Informations sur l’éditeur et l’hébergeur du site.", href: "/mentions-legales", parent: "Informations légales" },
} as const;

export type PageId = keyof typeof pages;

export function institutionalMetadata(id: PageId) {
  return { title: `${pages[id].title} — TechnologyTrade Group`, description: pages[id].description };
}
