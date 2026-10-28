"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { MapArtwork } from "./MapArtwork";
import { pages, type PageId } from "../lib/institutional-pages";
import {
  ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, CalendarDays, ChartNoAxesColumn,
  Check, ChevronDown, CircleCheck, Cloud, Code2, Eye, FileText, FlaskConical, Globe2, GraduationCap,
  Handshake, HeartHandshake, Info, Landmark, Leaf, LockKeyhole, Mail, MapPin, Menu,
  MessageCircle, Network, Phone, Rocket, Scale, Search, Send, ShieldCheck, Sparkles,
  Store, Wallet, X, type LucideIcon,
} from "lucide-react";

type IconType = LucideIcon;

const iconBox = (Icon: IconType) => <span className="institutional-icon"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span>;

export function InstitutionalHeader({ current }: { current: PageId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["Marketplace", "/marketplace", false],
    ["Opportunités", "/opportunites", false],
    ["Écosystème", "/ecosysteme", true],
    ["Ressources", "/ressources", true],
    ["À propos", "/presentation-du-groupe", true],
  ] as const;
  return <header className="institutional-header">
    <div className="institutional-utility"><div className="institutional-container utility-inner">
      <span><Globe2 size={12} aria-hidden="true" /> Plateforme numérique Afrique et international</span>
      <div><Link href="/faq">Aide</Link><Link href="/espace-fournisseur/inscription-professionnelle">Devenir fournisseur</Link><span>FR <ChevronDown size={10} /></span><span>EUR € <ChevronDown size={10} /></span></div>
    </div></div>
    <div className="institutional-nav-wrap"><div className="institutional-container institutional-nav-row">
      <Link className="institutional-brand" href="/" aria-label="TechnologyTrade Group — accueil"><Image src="/brand/Logo_horizontal_couleur.svg" alt="TechnologyTrade Group" width={1221} height={382} priority /></Link>
      <nav className={`institutional-nav${menuOpen ? " is-open" : ""}`} aria-label="Navigation principale">
        {nav.map(([label, href, chevron]) => {
          const className = (current === "ecosysteme" && label === "Écosystème") || (["fonctionnement", "solutions", "tarifs"].includes(current) && label === "Marketplace") || (["vision", "gouvernance", "carrieres"].includes(current) && label === "À propos") ? "is-active" : undefined;
          return href ? <Link key={label} className={className} href={href}>{label}{chevron && <ChevronDown size={11} aria-hidden="true" />}</Link> : <span key={label} className={className} aria-disabled="true">{label}</span>;
        })}
      </nav>
      <div className="institutional-actions"><Link className="institutional-search" href="/marketplace/recherche" aria-label="Rechercher dans la marketplace"><Search size={16} /></Link><Link className="button button--outline" href="/espace-client/connexion">Se connecter</Link><Link className="button button--primary" href="/demande/presentation-du-service">Exprimer un besoin</Link></div>
      <button className="institutional-menu" type="button" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
    </div></div>
  </header>;
}

export function InstitutionalFooter() {
  return <footer className="institutional-footer">
    <div className="institutional-container institutional-footer-main">
      <div className="institutional-footer-brand"><Link href="/" aria-label="TechnologyTrade Group — accueil"><Image src="/brand/Logo_horizontal_blanc.svg" alt="TechnologyTrade Group" width={1221} height={382} /></Link><p>Relier les technologies, faire avancer le commerce, bâtir l’avenir de l’Afrique.</p><div className="institutional-social" aria-label="Réseaux sociaux non disponibles"><span>in</span><span>𝕏</span><span>▶</span><span>f</span></div></div>
      <FooterColumn title="Plateforme" links={[["Marketplace", "/marketplace"], ["Exprimer un besoin", "/demande/presentation-du-service"], ["Opportunités", "/opportunites"], ["Fonctionnement", "/fonctionnement-de-la-plateforme"], ["Tarifs", "/tarifs"]]} />
      <FooterColumn title="Écosystème" links={[["Fournisseurs", "/marketplace/fournisseurs/atlas-software-studio"], ["Partenaires", "/partenariats"], ["Startups", "/opportunites"], ["Institutions", "/opportunites"], ["ONG et programmes", "/opportunites"]]} />
      <FooterColumn title="Ressources" links={[["Actualités", "/ressources"], ["Études et rapports", "/ressources"], ["Études de cas", "/ressources"], ["Guides pratiques", "/ressources"], ["Événements", "/ressources"]]} />
      <FooterColumn title="Groupe" links={[["À propos", "/presentation-du-groupe"], ["Vision et mission", "/vision-et-mission"], ["Gouvernance", "/gouvernance-et-equipe"], ["Carrières", "/carrieres"], ["Contact", "/contact"]]} />
    </div>
    <div className="institutional-legal"><div className="institutional-container"><span>© 2026 TechnologyTrade Group. Tous droits réservés.</span><nav aria-label="Informations légales"><Link href="/conditions-utilisation">Conditions d’utilisation</Link><Link href="/politique-de-confidentialite">Politique de confidentialité</Link><Link href="/mentions-legales">Mentions légales</Link><Link href="/politique-de-confidentialite">Cookies</Link></nav></div></div>
  </footer>;
}

function FooterColumn({ title, links }: { title: string; links: [string, string | null][] }) {
  return <div className="institutional-footer-column"><h2>{title}</h2>{links.map(([label, href]) => href ? <Link key={label} href={href}>{label}</Link> : <span key={label} aria-disabled="true">{label}</span>)}</div>;
}

function PageIntro({ id }: { id: PageId }) {
  const page = pages[id];
  const legal = id === "conditions" || id === "mentions";
  return <section className="institutional-intro"><div className="institutional-container">
    <nav className="institutional-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>›</span>{id === "contact" ? <span aria-current="page">Contact</span> : id === "ecosysteme" ? <span aria-current="page">Écosystème</span> : <>{page.parent === "Informations légales" ? <Link href="/mentions-legales">Informations légales</Link> : page.parent === "À propos" ? <Link href="/presentation-du-groupe">À propos</Link> : page.parent === "Plateforme" ? <Link href="/fonctionnement-de-la-plateforme">Plateforme</Link> : page.parent === "Écosystème" ? <Link href="/ecosysteme">Écosystème</Link> : <Link href="/faq">{page.parent}</Link>}<span>›</span><span aria-current="page">{id === "faq" ? "FAQ" : id === "fonctionnement" ? "Fonctionnement" : page.title}</span></>}</nav>
    <div className="institutional-intro-content"><div><h1>{page.title}</h1><p>{page.description}</p></div>{legal && <span className="institutional-updated"><CalendarDays size={13} /> Dernière mise à jour : 15 octobre 2026</span>}</div>
  </div></section>;
}

function Card({ icon: Icon, title, children, className = "" }: { icon?: IconType; title: string; children: React.ReactNode; className?: string }) {
  return <article className={`institutional-card ${className}`}>{Icon && iconBox(Icon)}<h3>{title}</h3>{children}</article>;
}

const faqPreview = [
  ["La plateforme est-elle gratuite pour les acheteurs ?", "Oui. L’expression d’un besoin, la consultation du catalogue et la demande de devis sont gratuites."],
  ["Comment les fournisseurs sont-ils sélectionnés ?", ""],
  ["Puis-je comparer plusieurs devis ?", ""],
  ["Dans quelles langues puis-je utiliser la plateforme ?", ""],
];

function Vision() {
  const values = [[BadgeCheck, "Confiance", "Fournisseurs vérifiés, avis authentifiés, règles de médiation publiques."], [Eye, "Transparence", "Des critères clairs, des tarifs lisibles, des délais annoncés."], [Handshake, "Coopération", "Chaque échange doit créer de la valeur des deux côtés."], [Leaf, "Impact", "Les projets sont jugés aussi sur leur effet local durable."]] as const;
  const milestones = [["2026", "Lancement", "Marketplace, expression des besoins et espaces clients."], ["2027", "Extension", "Opportunités, appels d’offres et programmes startups."], ["2028", "Intégration", "Paiement sécurisé et contrats numériques."], ["2030", "Rayonnement", "Hub entre l’Afrique et les autres continents."]] as const;
  const commitments = [[ShieldCheck, "Sécurité des échanges", "Données hébergées sur le continent, chiffrement et contrôle d’accès."], [Scale, "Équité d’accès", "Mêmes règles pour les startups et les grands groupes."], [Sparkles, "Multilinguisme", "Plateforme en français et en anglais, d’autres langues à venir."]] as const;
  return <>
    <main className="institutional-container institutional-section vision-main">
      <div className="vision-feature-grid"><article className="vision-feature vision-feature--dark"><span>Vision</span><h2>Un marché numérique africain intégré, compétitif et ouvert sur le monde.</h2><div className="vision-rays" aria-hidden="true" /></article><article className="vision-feature vision-feature--light"><span>Mission</span><h2>Rendre chaque solution technologique visible, comparable et accessible.</h2><p>Nous réunissons les besoins et les offres, nous réduisons le temps entre l’idée et le contrat, et nous accompagnons les acteurs qui construisent l’économie numérique.</p></article></div>
      <section className="vision-subsection"><p className="institutional-eyebrow">Nos valeurs</p><h2>Ce qui guide chaque décision</h2><div className="vision-values">{values.map(([Icon, title, text]) => <div key={title}>{iconBox(Icon)}<h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="vision-subsection"><p className="institutional-eyebrow">Feuille de route</p><h2>Les prochaines étapes</h2><div className="vision-roadmap">{milestones.map(([year, title, text], index) => <article key={year} className={index === 0 ? "is-current" : ""}><h3>{year}</h3><strong>{title}</strong><p>{text}</p></article>)}</div></section>
    </main>
    <section className="vision-commitments"><div className="institutional-container"><h2>Nos engagements</h2><div>{commitments.map(([Icon, title, text]) => <Card key={title} icon={Icon} title={title}><p>{text}</p></Card>)}</div></div></section>
    <JoinBanner title="Contribuer à la vision" description="Partenaires, fournisseurs et institutions : construisons ensemble le marché numérique africain." action="Devenir partenaire" href="/partenariats" />
  </>;
}

const processGroups = [
  { icon: Building2, title: "Entreprises et institutions", steps: ["Créez votre compte et le profil de votre organisation", "Exprimez un besoin ou explorez le catalogue", "Comparez les devis et échangez avec les fournisseurs", "Contractualisez et suivez la prestation"], action: "Créer un compte client", href: "/espace-client/connexion" },
  { icon: BriefcaseBusiness, title: "Fournisseurs et prestataires", steps: ["Déposez votre dossier de vérification", "Publiez votre vitrine, vos services et vos offres", "Recevez des demandes qualifiées et envoyez vos devis", "Livrez, facturez et collectez les avis"], action: "Devenir fournisseur", href: "/espace-fournisseur/inscription-professionnelle" },
  { icon: Rocket, title: "Porteurs de projets et startups", steps: ["Explorez les appels à projets et programmes", "Déposez une candidature ou manifestez votre intérêt", "Trouvez des partenaires et des financeurs", "Suivez vos candidatures depuis votre espace"], action: "Explorer les opportunités", href: "/opportunites" },
];
function Functioning() {
  const assurances = [[BadgeCheck, "Fournisseurs vérifiés", "Existence légale, références et solidité financière contrôlées avant publication."], [LockKeyhole, "Échanges sécurisés", "Messages, documents et devis restent dans la plateforme."], [MessageCircle, "Réponse garantie", "Les fournisseurs s’engagent à répondre sous cinq jours ouvrés."], [Scale, "Médiation", "En cas de désaccord, un médiateur indépendant intervient."]] as const;
  const [open, setOpen] = useState(0);
  return <>
    <main className="institutional-container institutional-section"><div className="centered-heading"><h2>Trois parcours, une même logique</h2><p>Selon votre rôle, la plateforme vous guide de la découverte jusqu’au contrat.</p></div><div className="process-grid">{processGroups.map(({ icon: Icon, title, steps, action, href }) => <Card key={title} icon={Icon} title={title} className="process-card"><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>{href ? <Link className="button button--outline" href={href}>{action}</Link> : <button className="button button--outline" type="button" disabled title="Cette destination n’est pas incluse dans ce lot.">{action}</button>}</Card>)}</div></main>
    <section className="process-assurances"><div className="institutional-container"><div><p className="institutional-eyebrow">Garanties</p><h2>Un cadre qui protège chaque partie</h2><p>Les règles sont les mêmes pour tous et publiées à l’avance.</p></div><div className="assurance-grid">{assurances.map(([Icon, title, text]) => <article key={title}>{iconBox(Icon)}<h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="institutional-container process-faq"><div><h2>Questions fréquentes</h2><p>Retrouvez toutes les réponses dans la FAQ.</p><Link className="text-link" href="/faq">Voir la FAQ <ArrowRight size={14} /></Link></div><div className="process-accordion">{faqPreview.map(([question, answer], index) => <div key={question} className="institutional-accordion"><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>{question}<span>{open === index ? "−" : "+"}</span></button>{open === index && answer && <p>{answer}</p>}</div>)}</div></section>
    <JoinBanner title="Commencez par votre besoin" description="Décrivez votre projet en quinze minutes environ et recevez vos premiers devis." action="Exprimer un besoin" href="/demande/presentation-du-service" secondary="Explorer la marketplace" secondaryHref="/marketplace" />
  </>;
}

const services = [
  [FileText, "Expression de besoin", "Un parcours guidé pour formuler un projet et recevoir des devis comparables.", "/fonctionnement-de-la-plateforme"],
  [Store, "Marketplace", "Catalogue de logiciels, services, solutions et produits de fournisseurs vérifiés.", "/tarifs"],
  [Handshake, "Mise en relation", "Un conseiller identifie et sollicite les fournisseurs adaptés à votre projet.", "/contact"],
  [Scale, "Appels d’offres", "Publication, réception et comparaison des réponses dans un cadre sécurisé.", "/partenariats"],
  [GraduationCap, "Accompagnement", "Cahier des charges, cadrage, suivi de projet et conduite du changement.", "/contact"],
  [ChartNoAxesColumn, "Études et veille", "Rapports de marché, baromètres et études de cas sur le numérique africain.", "/ecosysteme"],
] as const;
const domains = [
  [Code2, "TechnologyTrade Software", "Logiciels et applications", "ERP, applications métier, e-gouvernement", "software"],
  [Sparkles, "TechnologyTrade AI", "Intelligence artificielle et données", "Analyse de données, assistants, cartographie", "ai"],
  [Cloud, "TechnologyTrade Cloud", "Cloud et infrastructures", "Hébergement, réseaux, matériel", "cloud"],
  [ShieldCheck, "TechnologyTrade Cyber", "Cybersécurité", "Audit, SOC, conformité", "cyber"],
  [GraduationCap, "TechnologyTrade Academy", "Formation et compétences", "Formations certifiantes, coaching", "academy"],
  [FlaskConical, "TechnologyTrade Labs", "Recherche et innovation", "Prototypage, recherche appliquée", "labs"],
  [Landmark, "TechnologyTrade Capital", "Financement et investissement", "Paiement, financement, investissement", "capital"],
  [Store, "TechnologyTrade Market", "Marketplace", "Services numériques et produits", "market"],
  [HeartHandshake, "TechnologyTrade Foundation", "Impact et ONG", "Programmes d’impact, ONG, bailleurs", "foundation"],
] as const;
function Solutions() {
  return <>
    <main className="institutional-container institutional-section"><div className="service-grid">{services.map(([Icon, title, text, href]) => <Card key={title} icon={Icon} title={title}><p>{text}</p><Link className="text-link" href={href}>En savoir plus <ArrowRight size={14} /></Link></Card>)}</div></main>
    <section className="domain-section"><div className="institutional-container"><h2>Les neuf domaines couverts</h2><p>Chaque domaine correspond à une marque du groupe et à une famille d’offres.</p><div className="domain-grid">{domains.map(([Icon, brand, title, description, color]) => <article className={`domain-item domain-item--${color}`} key={brand}>{iconBox(Icon)}<div><span>{brand}</span><h3>{title}</h3></div><p>{description}</p></article>)}</div></div></section>
    <JoinBanner title="Vous ne trouvez pas votre solution ?" description="Décrivez votre besoin, nous sollicitons les bons fournisseurs." action="Exprimer un besoin" href="/demande/presentation-du-service" />
  </>;
}

const ecosystemActors = [[Building2, "Entreprises", "640"], [Landmark, "Institutions publiques", "86"], [BriefcaseBusiness, "Fournisseurs", "1 240"], [Rocket, "Startups", "310"], [HeartHandshake, "ONG et bailleurs", "74"], [GraduationCap, "Universités et centres", "42"]] as const;
const hubs = [["Afrique de l’Ouest", "Dakar · Abidjan · Lagos"], ["Afrique du Nord", "Casablanca · Le Caire"], ["Afrique centrale", "Brazzaville · Douala"], ["Afrique de l’Est", "Nairobi · Kigali · Addis-Abeba"], ["Afrique australe", "Johannesburg · Lusaka"]] as const;
function Ecosystem() {
  const names = ["Casablanca", "Le Caire", "Dakar", "Abidjan", "Lagos", "Douala", "Brazzaville", "Kigali", "Nairobi", "Addis-Abeba", "Johannesburg"];
  return <>
    <section className="institutional-container institutional-section actor-section"><div><h2>Qui compose l’écosystème</h2><p>Six familles d’acteurs interagissent sur la plateforme.</p></div><div className="actor-stats">{ecosystemActors.map(([Icon, label, value]) => <article key={label}>{iconBox(Icon)}<h3>{label}</h3><strong>{value}</strong></article>)}</div></section>
    <section className="hub-section"><div className="institutional-container hub-grid"><div><p className="institutional-eyebrow">Hubs régionaux</p><h2>Cinq pôles pour animer le continent</h2><p>Chaque hub regroupe fournisseurs, acheteurs et partenaires d’une région et relaie les opportunités.</p><ul>{hubs.map(([region, cities]) => <li key={region}><strong>{region}</strong><span>{cities}</span></li>)}</ul></div><div className="hub-map" role="img" aria-label="Carte de l’Afrique et des villes des hubs régionaux"><MapArtwork variant="ecosystem" />{names.map((name, index) => <span className={`hub-city hub-city--${index}`} key={name}><i />{name}</span>)}</div></div></section>
    <section className="institutional-container ecosystem-brands"><p>Ils construisent l’écosystème</p><div>{["Atlas", "Kivu", "Sahel", "Nexora", "Baobab", "Zambezi", "Mara", "Lumen"].map(name => <span key={name}>{name}</span>)}</div></section>
    <JoinBanner title="Rejoignez l’écosystème" description="Inscrivez votre organisation et accédez au catalogue, aux opportunités et aux partenaires." action="Créer un compte" disabled secondary="Devenir partenaire" secondaryHref="/partenariats" />
  </>;
}

const partnerTypes = [
  [Landmark, "Institutionnel", "Ministères, agences et organisations régionales : programmes numériques et appels d’offres publics."],
  [Network, "Technologique", "Éditeurs, opérateurs et constructeurs : intégration au catalogue et co-développement."],
  [Wallet, "Financier", "Banques, fonds et bailleurs : financement de projets et de startups."],
  [GraduationCap, "Académique", "Universités et centres de recherche : formation, laboratoires et études."],
] as const;
function Partnership() {
  const benefits = [["Visibilité auprès des acheteurs", "Page partenaire, mise en avant dans les opportunités et les études."], ["Accès aux données de marché", "Indicateurs sur la demande, les budgets et les délais."], ["Programmes conjoints", "Co-organisation d’événements, d’appels à projets et de formations."], ["Gouvernance partagée", "Participation aux comités consultatifs par région et par domaine."]] as const;
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <>
    <main className="institutional-container institutional-section"><div className="partner-type-grid">{partnerTypes.map(([Icon, title, text]) => <Card key={title} icon={Icon} title={title}><p>{text}</p></Card>)}</div></main>
    <section className="partner-content"><div className="institutional-container partner-content-grid"><div><p className="institutional-eyebrow">Pourquoi s’associer</p><h2>Ce que le partenariat apporte</h2><ul className="benefit-list">{benefits.map(([title, text]) => <li key={title}><CircleCheck size={20} /><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div>
      <form className="institutional-form partner-form" onSubmit={submit}><h2>Proposer un partenariat</h2><p>Notre équipe vous répond sous cinq jours ouvrés.</p><label>Organisation <em>*</em><input required placeholder="Nom de l’organisation" /></label><label>Type de partenariat <em>*</em><select required defaultValue=""><option value="" disabled>Choisir</option>{partnerTypes.map(([, type]) => <option key={type}>{type}</option>)}</select></label><label>Contact <em>*</em><input type="email" required placeholder="Nom et adresse e-mail" /></label><label>Votre proposition<textarea placeholder="Décrivez en quelques lignes l’objet du partenariat" /></label><button className="button button--primary" type="submit">Envoyer la proposition</button>{sent && <p className="form-status" role="status">Votre proposition est enregistrée dans cette démonstration. Aucun message n’a été envoyé.</p>}</form>
    </div></section>
  </>;
}

const subjectOptions = ["Question sur un devis"];
function Contact() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  const contacts = [[Mail, "Questions générales", "contact@[domaine]"], [BriefcaseBusiness, "Fournisseurs", "fournisseurs@[domaine]"], [Landmark, "Institutions et partenaires", "partenariats@[domaine]"], [Phone, "Téléphone", "+[indicatif] [numéro]"]] as const;
  return <>
    <main className="institutional-container institutional-section contact-grid">
      <form className="institutional-form contact-form" onSubmit={submit}><h2>Écrivez-nous</h2><div className="form-two-columns"><label>Nom complet <em>*</em><input required placeholder="Prénom et nom" /></label><label>Adresse e-mail <em>*</em><input type="email" required placeholder="adresse@organisation.org" /></label><label>Organisation<input placeholder="Nom de l’organisation" /></label><label>Vous êtes <em>*</em><select required defaultValue=""><option value="" disabled>Choisir un profil</option><option>Acheteur</option><option>Fournisseur</option><option>Partenaire</option></select></label></div><label>Objet de votre message <em>*</em><select defaultValue={subjectOptions[0]}>{subjectOptions.map(subject => <option key={subject}>{subject}</option>)}</select></label><label>Message <em>*</em><textarea required placeholder="Décrivez votre demande..." /></label><label className="consent"><input type="checkbox" required defaultChecked /><span>J’accepte que mes informations soient utilisées pour répondre à ma demande.</span></label><div className="contact-submit"><button className="button button--primary" type="submit"><Send size={16} />Envoyer le message</button><span>Réponse sous deux jours ouvrés</span></div>{sent && <p className="form-status" role="status">Votre message a été enregistré dans cette démonstration. Aucune donnée n’a été transmise.</p>}</form>
      <aside className="contact-aside"><div className="contact-details">{contacts.map(([Icon, title, text]) => <div key={title}>{iconBox(Icon)}<h3>{title}</h3><p>{text}</p></div>)}</div><div className="contact-hours"><h3>Horaires</h3><p>Du lundi au vendredi, 8 h – 17 h (heure de Brazzaville)</p></div><div className="contact-note"><Info size={18} /><p>Les adresses et numéros définitifs sont à confirmer avant la mise en ligne.</p></div></aside>
    </main>
    <section className="contact-offices"><div className="institutional-container"><h2>Nos bureaux</h2><div>{[1, 2, 3].map(number => <article key={number}><div className="office-art"><span /><span /><span /></div><p>Adresse à compléter</p></article>)}</div></div></section>
  </>;
}

const faqSections = [
  { title: "Démarrer", count: "12", icon: Rocket, items: [] },
  { title: "Exprimer un besoin", count: "9", icon: FileText, items: [] },
  { title: "Marketplace", count: "14", icon: Store, items: [["Comment comparer plusieurs offres ?", "Ajoutez jusqu’à quatre offres à la comparaison depuis le catalogue. Le tableau compare prix, délais, conditions, avis et fonctionnalités côte à côte. Vous pouvez ensuite demander un devis à chacun des fournisseurs sélectionnés."], ["Que signifie le badge « Fournisseur vérifié » ?", ""], ["Puis-je demander une démonstration avant d’acheter ?", ""], ["Les prix affichés incluent-ils les taxes ?", ""], ["Comment sont notés les fournisseurs ?", ""], ["Puis-je enregistrer une recherche pour la retrouver ?", ""]] },
  { title: "Fournisseurs", count: "11", icon: BriefcaseBusiness, items: [] },
  { title: "Paiement et contrats", count: "8", icon: Wallet, items: [] },
  { title: "Compte et sécurité", count: "7", icon: ShieldCheck, items: [] },
] as const;
function FAQ() {
  const [selected, setSelected] = useState("Marketplace");
  const [expanded, setExpanded] = useState(0);
  const [query, setQuery] = useState("");
  const section = faqSections.find(item => item.title === selected) ?? faqSections[2];
  const questions = useMemo(() => section.items.filter(([question]) => question.toLowerCase().includes(query.trim().toLowerCase())), [section, query]);
  return <>
    <section className="faq-search-band"><div className="institutional-container faq-search-inner"><p>{pages.faq.description}</p><form onSubmit={event => event.preventDefault()}><Search size={18} /><input aria-label="Rechercher une question" value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher une question..." /><button className="button button--primary">Rechercher</button></form></div></section>
    <main className="institutional-container institutional-section faq-layout"><nav className="faq-categories" aria-label="Catégories FAQ">{faqSections.map(({ icon: Icon, title, count }) => <button className={selected === title ? "is-selected" : ""} key={title} onClick={() => { setSelected(title); setExpanded(0); }} aria-pressed={selected === title}><Icon size={17} />{title}<span>{count}</span></button>)}</nav><section className="faq-questions"><div className="faq-section-title"><h2>{section.title}</h2><span>{selected === "Marketplace" ? "14" : section.count} questions</span></div>{questions.length ? questions.map(([question, answer], index) => <div className="institutional-accordion" key={question}><button aria-expanded={expanded === index} onClick={() => setExpanded(expanded === index ? -1 : index)}>{question}<span>{expanded === index ? "−" : "+"}</span></button>{expanded === index && answer && <p>{answer}</p>}</div>) : query ? <p className="faq-empty">Aucune question ne correspond à cette recherche.</p> : null}</section></main>
    <section className="faq-support"><div className="institutional-container"><div><h2>Vous n’avez pas trouvé votre réponse ?</h2><p>Notre équipe répond sous deux jours ouvrés.</p></div><div><Link href="/contact" className="button button--dark"><MessageCircle size={16} />Contacter le support</Link><Link href="/fonctionnement-de-la-plateforme" className="button button--outline">Consulter les guides</Link></div></div></section>
  </>;
}

const terms = [
  ["Objet et champ d’application", "La présente section décrit les règles applicables à l’utilisation de la plateforme par les acheteurs, les fournisseurs et les visiteurs. Elle précise les droits, les obligations et les responsabilités de chaque partie. Le contenu juridique définitif sera fourni par le conseil de TechnologyTrade Group ; ce texte illustre la mise en page."],
  ["Création et gestion du compte", ""], ["Rôles : acheteur, fournisseur, partenaire", ""], ["Publication des offres et des besoins", ""], ["Devis, commandes et prestations", ""], ["Propriété intellectuelle", ""], ["Responsabilités et garanties", ""], ["Médiation et droit applicable", ""],
] as const;
const privacy = [
  ["Données collectées", ""], ["Finalités et bases légales", ""], ["Partage avec les fournisseurs", ""], ["Hébergement et sécurité", ""], ["Durée de conservation", ""], ["Vos droits", ""], ["Cookies et traceurs", ""], ["Contact du délégué à la protection des données", ""],
] as const;
const legalInfo = [
  ["Éditeur du site", ""], ["Directeur de la publication", ""], ["Hébergeur", ""], ["Propriété intellectuelle", ""], ["Données personnelles", ""], ["Crédits", ""],
] as const;
const legalCopy = "La présente section décrit les règles applicables à l’utilisation de la plateforme par les acheteurs, les fournisseurs et les visiteurs. Elle précise les droits, les obligations et les responsabilités de chaque partie. Le contenu juridique définitif sera fourni par le conseil de TechnologyTrade Group ; ce texte illustre la mise en page.";
function LegalDocument({ id }: { id: "conditions" | "confidentialite" | "mentions" }) {
  const entries = id === "conditions" ? terms : id === "confidentialite" ? privacy : legalInfo;
  const [active, setActive] = useState(0);
  return <main className="institutional-container legal-layout"><aside><span>Sommaire</span><nav>{entries.map(([title], index) => <a className={active === index ? "is-active" : ""} href={`#legal-${index + 1}`} key={title} onClick={() => setActive(index)}>{index + 1}. {title}</a>)}</nav><div className="legal-help"><strong>Besoin d’aide ?</strong><p>Contactez notre équipe juridique.</p><Link href="/contact" className="button button--outline">Nous écrire</Link></div></aside><article>{entries.map(([title, text], index) => <section id={`legal-${index + 1}`} key={title} onMouseEnter={() => setActive(index)}><h2>{index + 1}. {title}</h2><p>{text || legalCopy}</p></section>)}</article></main>;
}

const leaders = [
  ["MO", "Mireille Okoumou", "Directrice générale", "Direction générale"],
  ["SA", "Samuel Adjei", "Directeur de la marketplace", "Marketplace"],
  ["FD", "Fatou Diallo", "Directrice technique", "Technologie"],
  ["JB", "Jean-Baptiste M.", "Chief Executive Officer", "Partenariats"],
  ["AK", "Aminata Konaté", "Directrice des opérations", "Opérations"],
  ["ET", "Eric Tshibangu", "Directeur financier", "Finance"],
] as const;
const boards = [["Conseil d’administration", "Orientations stratégiques et contrôle"], ["Comité d’éthique et de conformité", "Vérification des fournisseurs, médiation"], ["Comités régionaux", "Cinq comités consultatifs"]] as const;
function Governance() {
  return <><main className="institutional-container institutional-section leaders-section"><p className="institutional-eyebrow">Équipe de direction</p><h2>Les personnes qui pilotent le groupe</h2><div className="leader-grid">{leaders.map(([initials, name, role, team]) => <article key={name}><div className="leader-art"><span>{initials}</span></div><h3>{name}</h3><p>{role}</p><small>{team}</small></article>)}</div></main><section className="governance-section"><div className="institutional-container"><div><h2>Gouvernance</h2><p>Trois instances garantissent l’indépendance et la qualité de la plateforme.</p></div><div className="governance-boards">{boards.map(([title, desc]) => <article key={title}><Scale size={20} /><div><h3>{title}</h3><p>{desc}</p></div><span>Composition</span></article>)}</div></div></section></>;
}

const jobs = [
  ["Product designer senior", "Brazzaville · Hybride", "Produit", "CDI"],
  ["Ingénieur logiciel full stack", "Lagos · Hybride", "Technologie", "CDI"],
  ["Responsable partenariats institutionnels", "Brazzaville", "Partenariats", "CDI"],
  ["Analyste données de marché", "Nairobi · À distance", "Études", "CDD 12 mois"],
  ["Chargé de vérification des fournisseurs", "Dakar", "Opérations", "CDI"],
  ["Responsable support clients", "Abidjan", "Opérations", "CDI"],
] as const;
function Careers() {
  const teams = ["Toutes les équipes", "Produit", "Technologie", "Opérations", "Partenariats"];
  const [active, setActive] = useState(teams[0]);
  const shown = jobs.filter(job => active === teams[0] || job[2] === active);
  const benefits = [[Rocket, "Un projet fondateur", "Construire la plateforme du marché numérique africain."], [Globe2, "Une équipe répartie", "Quatre hubs, deux langues, des horaires flexibles."], [GraduationCap, "Progression", "Budget de formation et mentorat pour chaque collaborateur."]] as const;
  return <><main className="institutional-container careers-main"><h2>{shown.length} postes ouverts</h2><div className="career-filters" role="group" aria-label="Filtrer les offres par équipe">{teams.map(team => <button key={team} className={active === team ? "is-active" : ""} aria-pressed={active === team} onClick={() => setActive(team)}>{team}</button>)}</div><div className="job-list">{shown.map(([title, location, team, contract]) => <article key={title}><div><h3>{title}</h3><p><MapPin size={13} />{location}</p></div><span>{team}</span><small>{contract}</small><button type="button" disabled aria-label={`Candidature pour ${title} indisponible`} title="Les détails des postes et candidatures ne sont pas disponibles dans cette maquette."><ArrowRight size={18} /></button></article>)}</div></main><section className="career-benefits"><div className="institutional-container"><h2>Pourquoi nous rejoindre</h2><div>{benefits.map(([Icon, title, text]) => <article key={title}>{iconBox(Icon)}<h3>{title}</h3><p>{text}</p></article>)}</div></div></section></>;
}

const plans = [
  { name: "Découverte", description: "Pour publier votre vitrine et recevoir vos premières demandes.", monthly: 0, priceSuffix: "pour toujours", features: ["Profil d’entreprise vérifié", "3 offres publiées", "Réponse à 5 demandes par mois", "Commission de 6 % sur les contrats"] },
  { name: "Professionnel", description: "Pour les fournisseurs qui veulent développer leur activité.", monthly: 89, priceSuffix: "par mois", features: ["Offres illimitées", "Demandes illimitées", "Statistiques détaillées", "Jusqu’à 5 collaborateurs", "Commission de 4 % sur les contrats"], featured: true },
  { name: "Entreprise", description: "Pour les groupes et les éditeurs à forte activité.", monthly: null, priceSuffix: "", features: ["Collaborateurs illimités", "API et intégrations", "Conseiller dédié", "Commission négociée", "Contrat-cadre"] },
] as const;
function Pricing() {
  const [annual, setAnnual] = useState(false);
  const comparisons = [["Offres publiées", "3", "Illimitées", "Illimitées"], ["Demandes reçues", "5 / mois", "Illimitées", "Illimitées"], ["Collaborateurs", "1", "5", "Illimités"], ["Statistiques", "Basiques", "Détaillées", "Personnalisées"], ["Commission", "6 %", "4 %", "Négociée"]] as const;
  return <>
    <main className="institutional-container pricing-main">
      <div className="billing-toggle" role="group" aria-label="Période de facturation">
        <button className={!annual ? "is-active" : ""} aria-pressed={!annual} onClick={() => setAnnual(false)}>Mensuel</button>
        <button className={annual ? "is-active" : ""} aria-pressed={annual} onClick={() => setAnnual(true)}>Annuel · 2 mois offerts</button>
      </div>
      <div className="pricing-grid">{plans.map(plan => {
        const featured = "featured" in plan && plan.featured;
        return <article className={`pricing-card${featured ? " is-featured" : ""}`} key={plan.name}>
          {featured && <span className="plan-badge">Le plus choisi</span>}
          <h2>{plan.name}</h2><p>{plan.description}</p>
          <div className="plan-price">{plan.monthly === null ? "Sur devis" : <>{annual && plan.monthly > 0 ? plan.monthly * 10 : plan.monthly} €<small>{annual && plan.monthly > 0 ? "par an" : plan.priceSuffix}</small></>}</div>
          <button className={`button ${featured ? "button--primary" : "button--outline"}`} disabled title="Le choix d’un abonnement nécessite un parcours qui n’est pas inclus dans ce prototype.">{plan.name === "Entreprise" ? "Parler à un conseiller" : featured ? "Essayer 30 jours" : "Choisir"}</button>
          <ul>{plan.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
        </article>;
      })}</div>
      <section className="buyers-free"><h2>Les acheteurs ne paient rien</h2><p>L’expression d’un besoin, la consultation du catalogue et la demande de devis sont gratuites pour les entreprises, les institutions et les ONG.</p></section>
    </main>
    <section className="pricing-comparison"><div className="institutional-container"><h2>Comparer les plans</h2><div className="comparison-scroll"><table><thead><tr>{["Fonctionnalité", "Découverte", "Professionnel", "Entreprise"].map(item => <th key={item}>{item}</th>)}</tr></thead><tbody>{comparisons.map(([name, basic, pro, enterprise]) => <tr key={name}>{[name, basic, pro, enterprise].map((value, index) => <td key={`${name}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div></section>
  </>;
}

function JoinBanner({ title, description, action, href, disabled = false, secondary, secondaryHref }: { title: string; description: string; action: string; href?: string; disabled?: boolean; secondary?: string; secondaryHref?: string }) {
  const isDisabled = disabled || !href;
  return <section className="institutional-join"><div className="institutional-container"><div><h2>{title}</h2><p>{description}</p></div><div>{isDisabled ? <button className="button button--primary" type="button" disabled title="Cette destination n’est pas incluse dans ce lot.">{action}</button> : <Link className="button button--primary" href={href}>{action}</Link>}{secondary && secondaryHref && <Link className="button button--on-dark" href={secondaryHref}>{secondary}</Link>}</div></div></section>;
}

export function InstitutionalPage({ id }: { id: PageId }) {
  const body = {
    vision: <Vision />,
    fonctionnement: <Functioning />,
    solutions: <Solutions />,
    ecosysteme: <Ecosystem />,
    partenariats: <Partnership />,
    contact: <Contact />,
    faq: <FAQ />,
    conditions: <LegalDocument id="conditions" />,
    confidentialite: <LegalDocument id="confidentialite" />,
    gouvernance: <Governance />,
    carrieres: <Careers />,
    tarifs: <Pricing />,
    mentions: <LegalDocument id="mentions" />,
  } satisfies Record<PageId, React.ReactNode>;
  return <div className="institutional-page"><InstitutionalHeader current={id} /><PageIntro id={id} />{body[id]}<InstitutionalFooter /></div>;
}
