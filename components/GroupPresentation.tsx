import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BrainCircuit, ChevronDown, Cloud, Code2, Flag, FlaskConical,
  Globe2, GraduationCap, HeartHandshake, Landmark, Network, Scale, Search,
  ShieldCheck, Store, type LucideIcon,
} from "lucide-react";

const domains: {
  brand: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { brand: "Software", name: "Logiciels et applications", description: "ERP, applications métier, e-gouvernement", icon: Code2, color: "software" },
  { brand: "AI", name: "Intelligence artificielle et données", description: "Analyse de données, assistants, cartographie", icon: BrainCircuit, color: "ai" },
  { brand: "Cloud", name: "Cloud et infrastructures", description: "Hébergement, réseaux, matériel", icon: Cloud, color: "cloud" },
  { brand: "Cyber", name: "Cybersécurité", description: "Audit, SOC, conformité", icon: ShieldCheck, color: "cyber" },
  { brand: "Academy", name: "Formation et compétences", description: "Formations certifiantes, coaching", icon: GraduationCap, color: "academy" },
  { brand: "Labs", name: "Recherche et innovation", description: "Prototypage, recherche appliquée", icon: FlaskConical, color: "labs" },
  { brand: "Capital", name: "Financement et investissement", description: "Paiement, financement, investissement", icon: Landmark, color: "capital" },
  { brand: "Market", name: "Marketplace", description: "Services numériques et produits", icon: Store, color: "market" },
  { brand: "Foundation", name: "Impact et ONG", description: "Programmes d’impact, ONG, bailleurs", icon: HeartHandshake, color: "foundation" },
];

const brief = [
  ["Domaines d’expertise", "9"],
  ["Pays représentés", "38"],
  ["Fournisseurs vérifiés", "1 240"],
  ["Langues de la plateforme", "2"],
];

const cityBlocks = [
  { x: 0, width: 36, height: 62 },
  { x: 38, width: 45, height: 98 },
  { x: 86, width: 34, height: 70 },
  { x: 123, width: 52, height: 126 },
  { x: 178, width: 38, height: 84 },
  { x: 219, width: 45, height: 148 },
  { x: 267, width: 35, height: 96 },
  { x: 304, width: 55, height: 120 },
  { x: 362, width: 38, height: 76 },
  { x: 403, width: 50, height: 137 },
  { x: 456, width: 36, height: 100 },
  { x: 494, width: 55, height: 156 },
  { x: 552, width: 42, height: 92 },
  { x: 597, width: 43, height: 114 },
];

function CityArtwork() {
  return (
    <svg className="group-city-art" viewBox="0 0 640 280" role="img" aria-label="Illustration abstraite d’une ville connectée">
      <defs>
        <linearGradient id="city-background" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#132b50" />
          <stop offset="1" stopColor="#0e2345" />
        </linearGradient>
      </defs>
      <rect width="640" height="280" fill="url(#city-background)" />
      {cityBlocks.map((building, index) => {
        const rows = Math.floor((building.height - 18) / 17);
        const columns = Math.floor((building.width - 12) / 15);
        return (
          <g key={building.x}>
            <rect
              x={building.x}
              y={280 - building.height}
              width={building.width}
              height={building.height}
              fill={index % 2 === 0 ? "#172f56" : "#142b51"}
            />
            {Array.from({ length: rows }, (_, row) =>
              Array.from({ length: columns }, (_, column) => {
                const variant = (row * 3 + column * 5 + index) % 13;
                const fill = variant === 0 ? "#00a676" : variant < 5 ? "#dce3ef" : "#536886";
                return (
                  <rect
                    key={`${row}-${column}`}
                    x={building.x + 8 + column * 15}
                    y={280 - building.height + 11 + row * 17}
                    width="5"
                    height="5"
                    fill={fill}
                  />
                );
              }),
            )}
          </g>
        );
      })}
      <path d="M0 266H640" stroke="#263d61" strokeWidth="2" />
    </svg>
  );
}

function PageHeader() {
  return (
    <header className="group-header">
      <div className="group-utility">
        <div className="group-container group-utility-inner">
          <span className="group-platform-label"><Globe2 size={12} aria-hidden="true" />Plateforme numérique Afrique et international</span>
          <div className="group-utility-actions">
            <Link href="/faq">Aide</Link>
            <Link href="/espace-fournisseur/inscription-professionnelle">Devenir fournisseur</Link>
            <span className="group-select-label" aria-disabled="true">FR <ChevronDown size={11} aria-hidden="true" /></span>
            <span className="group-select-label" aria-disabled="true">EUR € <ChevronDown size={11} aria-hidden="true" /></span>
          </div>
        </div>
      </div>
      <div className="group-nav-wrap">
        <div className="group-container group-nav-inner">
          <Link className="group-brand" href="/" aria-label="TechnologyTrade Group — accueil">
            <Image src="/brand/Logo_horizontal_couleur.svg" alt="TechnologyTrade Group" width={1221} height={382} priority />
          </Link>
          <nav className="group-nav" aria-label="Navigation principale">
            <Link href="/marketplace">Marketplace <ChevronDown size={11} aria-hidden="true" /></Link>
            <Link href="/opportunites">Opportunités</Link>
            <Link href="/ecosysteme">Écosystème</Link>
            <Link href="/ressources">Ressources <ChevronDown size={11} aria-hidden="true" /></Link>
            <Link className="group-nav-active" href="/presentation-du-groupe" aria-current="page">À propos <ChevronDown size={11} aria-hidden="true" /></Link>
          </nav>
          <div className="group-header-actions">
            <Link className="group-search-link" href="/marketplace/recherche" aria-label="Rechercher"><Search size={16} /></Link>
            <Link className="button button--outline" href="/espace-client/connexion">Se connecter</Link>
            <Link className="button button--primary" href="/demande/presentation-du-service">Exprimer un besoin</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Breadcrumbs() {
  return (
    <nav className="group-breadcrumbs" aria-label="Fil d’Ariane">
      <Link href="/">Accueil</Link>
      <span aria-hidden="true">›</span>
      <Link href="/presentation-du-groupe">À propos</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Présentation du groupe</span>
    </nav>
  );
}

function GroupFooter() {
  return (
    <>
      <section className="group-join" aria-labelledby="group-join-title">
        <div className="group-container group-join-inner">
          <div>
            <h2 id="group-join-title">Rejoindre l’écosystème</h2>
            <p>Entreprises, institutions, fournisseurs et partenaires : une seule inscription ouvre tous les espaces.</p>
          </div>
          <div className="group-join-actions">
            <Link className="button button--primary" href="/espace-client/inscription">Créer un compte</Link>
            <Link className="button button--on-dark" href="/contact">Nous contacter</Link>
          </div>
        </div>
      </section>
      <footer className="footer group-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label="TechnologyTrade Group — accueil">
              <Image src="/brand/Logo_horizontal_blanc.svg" alt="TechnologyTrade Group" width={1221} height={382} />
            </Link>
            <p>Relier les technologies, faire avancer le commerce, bâtir l’avenir de l’Afrique.</p>
            <div className="social-links" aria-label="Réseaux sociaux">
              <span aria-label="LinkedIn">in</span><span aria-label="Twitter">t</span><span aria-label="YouTube">▶</span><span aria-label="Facebook">f</span>
            </div>
          </div>
          <div className="footer-col"><h3>Plateforme</h3><ul><li><Link href="/marketplace">Marketplace</Link></li><li><Link href="/demande/presentation-du-service">Exprimer un besoin</Link></li><li><Link href="/opportunites">Opportunités</Link></li><li><Link href="/fonctionnement-de-la-plateforme">Fonctionnement</Link></li><li><Link href="/tarifs">Tarifs</Link></li><li><Link href="/espace-client/connexion">Espace client</Link></li></ul></div>
          <div className="footer-col"><h3>Écosystème</h3><ul><li><Link href="/marketplace">Fournisseurs</Link></li><li><Link href="/partenariats">Partenaires</Link></li><li><Link href="/opportunites">Startups</Link></li><li><Link href="/opportunites">Institutions</Link></li><li><Link href="/opportunites">ONG et programmes</Link></li><li><Link href="/espace-fournisseur/inscription-professionnelle">Devenir fournisseur</Link></li></ul></div>
          <div className="footer-col"><h3>Ressources</h3><ul><li><Link href="/ressources">Actualités</Link></li><li><Link href="/ressources">Études et rapports</Link></li><li><Link href="/ressources">Études de cas</Link></li><li><Link href="/ressources">Guides pratiques</Link></li><li><Link href="/ressources">Événements</Link></li></ul></div>
          <div className="footer-col"><h3>Groupe</h3><ul><li><Link href="/presentation-du-groupe">À propos</Link></li><li><Link href="/vision-et-mission">Vision et mission</Link></li><li><Link href="/gouvernance-et-equipe">Gouvernance</Link></li><li><Link href="/carrieres">Carrières</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 TechnologyTrade Group. Tous droits réservés.</span>
          <div className="footer-legal"><Link href="/conditions-utilisation">Conditions d’utilisation</Link><Link href="/politique-de-confidentialite">Politique de confidentialité</Link><Link href="/mentions-legales">Mentions légales</Link><Link href="/politique-de-confidentialite#cookies">Cookies</Link></div>
        </div>
      </footer>
    </>
  );
}

export default function GroupPresentation() {
  return (
    <>
      <PageHeader />
      <main>
        <section className="group-intro">
          <div className="group-container">
            <Breadcrumbs />
            <h1>Présentation de TechnologyTrade Group</h1>
            <p>Un groupe dédié à la construction du marché numérique africain et à son ouverture sur le marché international.</p>
          </div>
        </section>

        <section className="group-purpose" aria-labelledby="purpose-title">
          <div className="group-container">
            <div className="group-purpose-intro">
              <div>
                <p className="group-eyebrow">Notre raison d’être</p>
                <h2 id="purpose-title">Faire du numérique un moteur de commerce pour tout le continent</h2>
              </div>
              <div className="group-purpose-copy">
                <p>TechnologyTrade Group est né d’un constat simple : les solutions technologiques africaines existent, mais les acheteurs ont du mal à les trouver, à les comparer et à les acheter avec confiance.</p>
                <p>Nous construisons la plateforme qui relie ceux qui cherchent des solutions à ceux qui les conçoivent, et qui ouvre ces échanges aux autres continents.</p>
              </div>
            </div>
            <div className="group-principles">
              <article className="group-principle">
                <span className="group-principle-icon"><Network size={18} aria-hidden="true" /></span>
                <h3>Relier</h3>
                <p>Une place de marché qui rapproche acheteurs, fournisseurs, institutions et financeurs.</p>
              </article>
              <article className="group-principle">
                <span className="group-principle-icon"><Scale size={18} aria-hidden="true" /></span>
                <h3>Rendre le commerce simple</h3>
                <p>Un besoin décrit une fois, des devis comparables, un suivi jusqu’au contrat.</p>
              </article>
              <article className="group-principle">
                <span className="group-principle-icon"><Flag size={18} aria-hidden="true" /></span>
                <h3>Bâtir un avenir africain</h3>
                <p>Des opportunités ouvertes aux startups, aux PME et aux programmes d’impact.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="group-domains" aria-labelledby="domains-title">
          <div className="group-container">
            <div className="group-section-heading">
              <div>
                <h2 id="domains-title">Neuf domaines, une seule plateforme</h2>
                <p>L’architecture de marque du groupe structure le catalogue.</p>
              </div>
              <Link className="group-catalog-link" href="/marketplace">Voir le catalogue <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
            <div className="group-domain-grid">
              {domains.map(({ brand, name, description, icon: Icon, color }) => (
                <article className={`group-domain-card group-domain-card--${color}`} key={brand}>
                  <span className="group-domain-icon"><Icon size={18} aria-hidden="true" /></span>
                  <div className="group-domain-copy">
                    <span className="group-domain-brand">TechnologyTrade {brand}</span>
                    <h3>{name}</h3>
                  </div>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="group-brief" aria-label="Le groupe en bref">
          <div className="group-container group-brief-grid">
            <div className="group-city-panel"><CityArtwork /></div>
            <div className="group-stats-panel">
              <p className="group-stats-eyebrow">Le groupe en bref</p>
              <dl>
                {brief.map(([label, value]) => (
                  <div className="group-stat" key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <GroupFooter />
    </>
  );
}
