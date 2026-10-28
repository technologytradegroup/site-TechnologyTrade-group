"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState, type KeyboardEvent, type FormEvent, type RefObject } from "react";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Building2, CheckCircle2, ChevronDown, Cloud,
  Coins, FileCheck2, FileText, GraduationCap, Heart, HeartHandshake, Lightbulb, MapPin,
  Menu, MessageCircle, Network, Search, ShieldCheck, Sparkles, Store, X, type LucideIcon,
} from "lucide-react";
import { MapArtwork } from "./MapArtwork";
import {
  catalog, categories, countries, filterCatalog, filterOfferCards, searchTabs,
  type CatalogItem, type SearchTab,
} from "../lib/catalog";

const domains: { name: string; count: string; description: string; icon: LucideIcon; style: string }[] = [
  { name: "Logiciels et applications", count: "412 offres", description: "ERP, applications métier, e-commerce", icon: FileText, style: "software" },
  { name: "Intelligence artificielle et données", count: "186 offres", description: "Analyse de données, assistants, cartographie", icon: BrainCircuit, style: "ai" },
  { name: "Cloud et infrastructures", count: "268 offres", description: "Hébergement, réseaux, matériel", icon: Cloud, style: "cloud" },
  { name: "Cybersécurité", count: "143 offres", description: "Audit, SOC, conformité", icon: ShieldCheck, style: "cyber" },
  { name: "Formation et compétences", count: "97 offres", description: "Formations certifiantes, coaching", icon: GraduationCap, style: "training" },
  { name: "Recherche et innovation", count: "54 offres", description: "Prototypage, recherche appliquée", icon: Lightbulb, style: "research" },
  { name: "Financement et investissement", count: "71 offres", description: "Financement, investissement", icon: Coins, style: "invest" },
  { name: "Marketplace", count: "320 offres", description: "Services numériques et produits", icon: Store, style: "market" },
  { name: "Impact et ONG", count: "38 offres", description: "Programmes d’impact, ONG, bailleurs", icon: HeartHandshake, style: "impact" },
];

const offers = [
  { title: "Plateforme de gestion portuaire et des escales", provider: "Atlas Software Studio", category: "Logiciels", domain: "Logiciel", priceLabel: "À partir de", price: "3 900 €", unit: "par an", rating: "4.8", reviews: "126", city: "Casablanca", monogram: "AS", art: "dashboard" },
  { title: "Cloud souverain en Afrique centrale", provider: "Kivu Cloud Systems", category: "Cloud", domain: "Solution", priceLabel: "À partir de", price: "480 €", unit: "par mois", rating: "4.7", reviews: "84", city: "Kigali", monogram: "KC", art: "cloud" },
  { title: "Audit de cybersécurité et tests d’intrusion", provider: "Sahel Cyber Défense", category: "Cybersécurité", domain: "Service", priceLabel: "À partir de", price: "6 500 €", unit: "par mission", rating: "4.9", reviews: "61", city: "Dakar", monogram: "SC", art: "security" },
  { title: "Assistant documentaire multilingue", provider: "Nexora Labs", category: "IA et données", domain: "Solution", priceLabel: "Tarification", price: "Sur devis", unit: "", rating: "4.6", reviews: "38", city: "Lagos", monogram: "NX", art: "assistant" },
];

const opportunities = [
  { type: "Appel d’offres", title: "Plateforme de paiement électronique des redevances portuaires", description: "Office National des Ports du Lac · Congo", budget: "250 000 – 400 000 €", date: "30 nov. 2026", href: "/opportunites/detail-appel-doffres" },
  { type: "Appel à projets", title: "Programme d’inclusion numérique des PME rurales", description: "Fondation Horizon Afrique · Multi-pays", budget: "Subvention jusqu’à 80 000 €", date: "15 déc. 2026", href: "/opportunites/appels-a-projets" },
  { type: "Programme startups", title: "Accélérateur Fintech Afrique de l’Ouest, cohorte 4", description: "Atlantic Capital Partners · Sénégal, Côte d’Ivoire", budget: "Investissement amorçage", date: "10 nov. 2026", href: "/opportunites/programmes-startups" },
  { type: "Projet collaboratif", title: "Consortium de recherche en IA pour l’agriculture", description: "Labs Consortium Sahel · Mali, Niger, Burkina Faso", budget: "Partenaires recherchés", date: "05 janv. 2027", href: "/opportunites/projets-collaboratifs" },
];

const quickSearches = [
  { label: "Logiciels", query: "Logiciels", icon: FileCheck2 },
  { label: "Cloud", query: "Cloud", icon: Cloud },
  { label: "Cybersécurité", query: "Cybersécurité", icon: ShieldCheck },
  { label: "Intelligence artificielle", query: "Intelligence artificielle", icon: BrainCircuit },
  { label: "Formation", query: "Formation", icon: GraduationCap },
];

const steps = [
  { title: "Exprimez votre besoin", body: "Un formulaire guidé en sept étapes décrit votre projet, votre budget et vos délais." },
  { title: "Recevez des propositions", body: "Les fournisseurs qualifiés répondent avec un devis détaillé, sans jargon opaque." },
  { title: "Comparez et échangez", body: "Comparez les offres côte à côte et posez vos questions depuis votre espace." },
  { title: "Contractualisez et suivez", body: "Validez le devis, suivez la prestation et centralisez les documents." },
];

function Header({ onSearch }: { onSearch: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const links = [
    ["Marketplace", "/marketplace"], ["Opportunités", "/opportunites"], ["Écosystème", "/ecosysteme"],
    ["Ressources", "/ressources"], ["À propos", "/presentation-du-groupe"],
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#accueil" aria-label="TechnologyTrade Group — accueil" onClick={closeMenu}>
          <Image src="/brand/Logo_horizontal_blanc.svg" alt="TechnologyTrade Group" width={1221} height={382} priority />
        </a>
        <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}` } aria-label="Navigation principale">
          {links.map(([label, href]) => <Link key={label} href={href} onClick={closeMenu}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button search-launch" type="button" aria-label="Aller à la recherche" onClick={onSearch}><Search size={16} /></button>
          <Link className="button button--on-dark login-button" href="/espace-client/connexion">Se connecter</Link>
          <Link className="button button--primary header-cta" href="/demande/presentation-du-service">Exprimer un besoin</Link>
          <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export type SearchPanelHandle = { runQuery: (value: string) => void };

const SearchPanel = forwardRef<SearchPanelHandle, { onSearchRef: RefObject<HTMLInputElement | null>; onResultsChange: (results: CatalogItem[] | null, tab: SearchTab) => void }>(function SearchPanel({ onSearchRef, onResultsChange }, ref) {
  const [activeTab, setActiveTab] = useState<SearchTab>("Solutions");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes les catégories");
  const [country, setCountry] = useState("Tous les pays");
  const [results, setResults] = useState<CatalogItem[] | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    runQuery(value: string) {
      setActiveTab("Solutions");
      setQuery(value);
      setCategory("Toutes les catégories");
      setCountry("Tous les pays");
      const nextResults = filterCatalog(catalog, { tab: "Solutions", query: value });
      setResults(nextResults);
      onResultsChange(nextResults, "Solutions");
    },
  }), [onResultsChange]);

  function submit(event?: FormEvent<HTMLFormElement>, search = query) {
    event?.preventDefault();
    const nextResults = filterCatalog(catalog, { tab: activeTab, query: search, category, country });
    setResults(nextResults);
    onResultsChange(nextResults, activeTab);
  }

  function changeTab(tab: SearchTab, index: number) {
    setActiveTab(tab);
    setResults(null);
    onResultsChange(null, tab);
    tabRefs.current[index]?.focus();
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % searchTabs.length;
    else if (event.key === "ArrowLeft") next = (index + searchTabs.length - 1) % searchTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = searchTabs.length - 1;
    else return;
    event.preventDefault();
    changeTab(searchTabs[next], next);
  }

  function runQuickSearch(value: string) {
    setQuery(value);
    setCategory("Toutes les catégories");
    setCountry("Tous les pays");
    const nextResults = filterCatalog(catalog, { tab: activeTab, query: value });
    setResults(nextResults);
    onResultsChange(nextResults, activeTab);
  }

  return (
    <div className="search-panel" id="recherche">
      <div className="search-tabs" role="tablist" aria-label="Type de recherche">
        {searchTabs.map((tab, index) => (
          <button key={tab} ref={(element) => { tabRefs.current[index] = element; }} className="search-tab" id={`tab-${index}`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="search-panel" tabIndex={activeTab === tab ? 0 : -1} onClick={() => changeTab(tab, index)} onKeyDown={(event) => onTabKey(event, index)}>{tab}</button>
        ))}
      </div>
      <form id="search-panel" className="search-fields" role="tabpanel" aria-labelledby={`tab-${searchTabs.indexOf(activeTab)}`} onSubmit={submit}>
        <div className="field">
          <label htmlFor="catalog-query">Que recherchez-vous ?</label>
          <div className="field-control">
            <input ref={onSearchRef} id="catalog-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Logiciel de gestion, audit de sécurité, hébergement cloud..." />
            <Search size={16} aria-hidden="true" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="catalog-category">Catégorie</label>
          <div className="field-control">
            <select id="catalog-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>Toutes les catégories</option>
              {(activeTab === "Opportunités" ? opportunities.map((item) => item.type) : categories).map((item) => <option key={item}>{item}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="catalog-country">Pays</label>
          <div className="field-control">
            <select id="catalog-country" value={country} onChange={(event) => setCountry(event.target.value)}>
              <option>Tous les pays</option>
              {countries.map((item) => <option key={item}>{item}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>
        <button className="button button--primary search-submit" type="submit"><Search size={15} /> Rechercher</button>
      </form>
      <div className="quick-search" aria-label="Recherches fréquentes">
        <span>Recherches fréquentes</span>
        {quickSearches.map(({ label, query: value, icon: Icon }) => <button className="quick-tag" type="button" key={label} aria-pressed={query === value} onClick={() => runQuickSearch(value)}><Icon size={12} />{label}</button>)}
      </div>
      {results && (
        <div className="search-results" id="search-results" role="region" aria-live="polite" aria-label="Résultats de recherche">
          <h3>{results.length} résultat{results.length === 1 ? "" : "s"} dans {activeTab.toLocaleLowerCase("fr")}</h3>
          {results.length ? <ul>{results.map((item) => <li key={`${item.tab}-${item.title}`}><a href={item.href}><strong>{item.title}</strong><span>{item.organization || item.category} · {item.country}</span></a></li>)}</ul> : <p className="results-empty">Aucun résultat ne correspond à ces critères.</p>}
        </div>
      )}
    </div>
  );});

function OfferArtwork({ variant }: { variant: string }) {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">
      {variant === "dashboard" && <>
        <rect className="art-window" x="26" y="27" width="268" height="126" rx="6" />
        <rect className="art-head" x="26" y="27" width="268" height="23" rx="6" />
        <circle cx="39" cy="38" r="3" fill="#3f6bbd" /><rect x="50" y="35" width="53" height="6" rx="3" fill="#aebbd0" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => <rect key={item} className={`art-bar${item === 7 ? " art-bar--highlight" : ""}`} x={44 + item * 26} y={137 - [32, 54, 45, 67, 55, 44, 60, 78, 51][item]} width="17" height={[32, 54, 45, 67, 55, 44, 60, 78, 51][item]} rx="2" />)}
        <path d="M40 145H280" stroke="#dce1e9" />
      </>}
      {variant === "cloud" && <>
        <defs><pattern id="cloud-grid" width="18" height="18" patternUnits="userSpaceOnUse"><circle className="art-grid" cx="3" cy="3" r="1.4" /></pattern></defs>
        <rect width="320" height="180" fill="url(#cloud-grid)" />
        <path className="art-route" d="M48 104 116 75 181 110 248 58 280 93" />
        {[[48, 104], [116, 75], [181, 110], [248, 58], [280, 93]].map(([cx, cy], index) => <circle key={index} className="art-node" cx={cx} cy={cy} r="5" />)}
        <rect x="134" y="127" width="50" height="21" rx="4" fill="#1d355e" stroke="#304c76" />
      </>}
      {variant === "security" && <>
        {[30, 56, 82, 108, 134].map((radius, index) => <circle key={radius} className={`art-circle${index % 2 === 0 ? "" : " art-circle--muted"}`} cx="210" cy="148" r={radius} />)}
        <path d="M0 160H320" stroke="#20385f" />
      </>}
      {variant === "assistant" && <>
        <defs><pattern id="assistant-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle className="art-grid" cx="3" cy="3" r="1.4" /></pattern></defs>
        <rect width="320" height="180" fill="url(#assistant-grid)" />
        <rect className="art-panel" x="42" y="44" width="97" height="48" rx="6" /><rect className="art-line" x="55" y="58" width="33" height="4" rx="2" /><rect x="55" y="70" width="65" height="5" rx="2" fill="#516889" />
        <rect className="art-panel" x="153" y="69" width="116" height="56" rx="6" /><rect className="art-line" x="167" y="84" width="43" height="4" rx="2" /><rect x="167" y="97" width="80" height="5" rx="2" fill="#516889" /><rect x="167" y="108" width="57" height="5" rx="2" fill="#516889" />
      </>}
    </svg>
  );
}

function NewsArtwork({ variant }: { variant: string }) {
  return (
    <svg viewBox="0 0 420 175" aria-hidden="true" focusable="false">
      <defs><pattern id={`news-grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse"><circle className="art-grid" cx="3" cy="3" r="1.25" /></pattern></defs>
      <rect width="420" height="175" fill={`url(#news-grid-${variant})`} />
      {variant === "cloud" && <>
        <path className="art-route" d="M104 130 190 71 278 118 353 45" />
        {[[104, 130], [190, 71], [278, 118], [353, 45]].map(([cx, cy], index) => <circle className="art-node" key={index} cx={cx} cy={cy} r="6" />)}
      </>}
      {variant === "study" && <>
        <rect className="art-panel" x="72" y="34" width="120" height="91" rx="5" /><rect className="art-line" x="87" y="48" width="62" height="8" rx="3" />
        <rect className="art-panel" x="217" y="61" width="130" height="79" rx="5" /><rect className="art-line" x="234" y="76" width="45" height="7" rx="3" />
        <rect x="87" y="69" width="85" height="7" rx="3" fill="#52688b" /><rect x="87" y="85" width="66" height="7" rx="3" fill="#52688b" /><rect x="234" y="95" width="91" height="7" rx="3" fill="#52688b" />
      </>}
      {variant === "ports" && <>
        <path className="art-route" d="M96 139 162 72 236 116 314 54 366 103" />
        {[[96, 139], [162, 72], [236, 116], [314, 54], [366, 103]].map(([cx, cy], index) => <circle className="art-node" key={index} cx={cx} cy={cy} r="6" />)}
      </>}
    </svg>
  );
}

function OfferCards({ results }: { results: CatalogItem[] | null }) {
  const visibleOffers = filterOfferCards(offers, results);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);
  const setToggle = (values: string[], id: string) => values.includes(id) ? values.filter((value) => value !== id) : [...values, id];

  return (
    <>
      <div className="offer-grid">
        {visibleOffers.length === 0 ? <p className="results-empty" role="status" aria-live="polite">Aucune offre ne correspond à ces critères.</p> : visibleOffers.map((offer) => {
          const favorite = favorites.includes(offer.title);
          return (
            <article className="offer-card" key={offer.title}>
              <div className={`offer-art offer-art--${offer.art}`}><OfferArtwork variant={offer.art} /></div>
              <button className="offer-favorite" type="button" aria-label={`${favorite ? "Retirer des favoris" : "Ajouter aux favoris"} : ${offer.title}`} aria-pressed={favorite} onClick={() => setFavorites((current) => setToggle(current, offer.title))}><Heart size={16} fill={favorite ? "currentColor" : "none"} /></button>
              <div className="offer-body">
                <div className="offer-meta"><span className="offer-category"><span className="category-dot" />{offer.category}</span><span>{offer.domain}</span></div>
                <h3>{offer.title}</h3>
                <div className="offer-provider"><span className="provider-monogram">{offer.monogram}</span>{offer.provider}</div>
                <span className="offer-price-label">{offer.priceLabel}</span>
                <strong className="offer-price">{offer.price}{offer.unit && <small> / {offer.unit.replace("par ", "")}</small>}</strong>
                <div className="offer-rating"><span className="rating-stars" aria-hidden="true">★★★★★</span><strong aria-label={`${offer.rating} sur 5`}>{offer.rating}</strong><span>({offer.reviews})</span><span className="offer-city"><MapPin size={10} aria-hidden="true" /> {offer.city}</span></div>
                <label className="compare-label"><input type="checkbox" checked={compared.includes(offer.title)} onChange={() => setCompared((current) => setToggle(current, offer.title))} />Comparer</label>
              </div>
            </article>
          );
        })}
      </div>
      <p className="compare-status" aria-live="polite">{compared.length > 0 ? `${compared.length} offre${compared.length > 1 ? "s" : ""} sélectionnée${compared.length > 1 ? "s" : ""} pour comparaison.` : ""}</p>
    </>
  );
}
export default function HomeExperience() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [offerResults, setOfferResults] = useState<CatalogItem[] | null>(null);
  const handleSearchResults = useCallback((results: CatalogItem[] | null, tab: SearchTab) => {
    setOfferResults(tab === "Solutions" ? results : null);
  }, []);
  const searchPanelRef = useRef<SearchPanelHandle>(null);
  const focusSearch = () => {
    document.getElementById("recherche")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => searchRef.current?.focus(), 180);
  };

  return (
    <>
      <Header onSearch={focusSearch} />
      <main>
        <section className="hero" id="accueil" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="hero-badge"><Sparkles size={12} /> Nouveau : demandes de devis multi-fournisseurs</p>
              <h1 id="hero-title">Le marché numérique africain, ouvert sur le monde.</h1>
              <p>Entreprises, institutions et fournisseurs de solutions technologiques se retrouvent sur une seule plateforme : découvrir, comparer, demander un devis, contractualiser.</p>
              <div className="hero-actions">
                <Link className="button button--primary" href="/demande/presentation-du-service"><FileText size={15} /> Exprimer un besoin</Link>
                <Link className="button button--on-dark" href="/marketplace"><Search size={15} /> Explorer la marketplace</Link>
              </div>
            </div>
            <div className="hero-map"><MapArtwork variant="hero" /></div>
            <SearchPanel ref={searchPanelRef} onSearchRef={searchRef} onResultsChange={handleSearchResults} />
          </div>
        </section>

        <section className="section three-ways" aria-labelledby="ways-title">
          <div className="container">
            <div className="section-heading">
              <div><h2 id="ways-title">Une plateforme, trois manières de l’utiliser</h2><p>Que vous achetiez, vendiez ou cherchiez des partenaires, le parcours est pensé pour vous.</p></div>
            </div>
            <div className="ways-grid">
              <article className="way-card">
                <span className="way-icon"><Search size={18} /></span>
                <h3>Je cherche une solution</h3>
                <p>Parcourez le catalogue, comparez les offres et demandez un devis ou une démonstration en quelques clics.</p>
                <Link className="text-link" href="/marketplace">Explorer le catalogue <ArrowRight size={13} /></Link>
              </article>
              <article className="way-card">
                <span className="way-icon"><FileText size={18} /></span>
                <h3>J’ai un besoin à présenter</h3>
                <p>Décrivez votre projet en quelques lignes. Les fournisseurs qualifiés vous répondent avec des devis comparables.</p>
                <Link className="text-link" href="/demande/presentation-du-service">Exprimer mon besoin <ArrowRight size={13} /></Link>
              </article>
              <article className="way-card">
                <span className="way-icon"><Building2 size={18} /></span>
                <h3>Je propose mes solutions</h3>
                <p>Créez la vitrine de votre entreprise, publiez vos offres et recevez des demandes qualifiées.</p>
                <Link className="text-link" href="/espace-fournisseur/inscription-professionnelle">Devenir fournisseur <ArrowRight size={13} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--gray" id="domaines" aria-labelledby="domains-title">
          <div className="container">
            <div className="section-heading">
              <div><h2 id="domains-title">Parcourir par domaine</h2><p>Neuf domaines alignés sur l’architecture du groupe.</p></div>
              <Link className="text-link" href="/marketplace">Voir tout le catalogue <ArrowRight size={13} /></Link>
            </div>
            <div className="domain-grid">
              {domains.map(({ name, count, description, icon: Icon, style }) => (
                <a key={name} className="domain-card" href="#recherche" onClick={() => { searchPanelRef.current?.runQuery(name); window.setTimeout(() => searchRef.current?.focus(), 120); }}>
                  <span className={`domain-icon domain-${style}`}><Icon size={18} /></span>
                  <span className="domain-content"><span className="domain-count">{count}</span><h3>{name}</h3><p>{description}</p></span>
                  <ArrowUpRight className="domain-arrow" size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="fonctionnement" aria-labelledby="workflow-title">
          <div className="container workflow-layout">
            <div>
              <div className="section-heading"><div><h2 id="workflow-title">De l’expression du besoin au contrat, sans quitter la plateforme</h2></div></div>
              <ol className="steps">
                {steps.map((step, index) => <li className="step" key={step.title}><span className="step-number">{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}
              </ol>
            </div>
            <div aria-label="Aperçu d’un devis reçu" className="quote-preview">
              <div className="quote-mock">
                <div className="mock-browser"><span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" /><span className="mock-address">technologytrade.group / mes-demandes</span></div>
                <div className="mock-heading"><h3>Devis reçus</h3><span className="status-pill">3 nouveaux</span></div>
                {[
                  ["AS", "Atlas Software Studio", "312 000 €", "Délai 8 semaines"],
                  ["ME", "Mara ERP Solutions", "348 500 €", "Délai 8 semaines"],
                  ["LG", "Lumen GovTech", "389 000 €", "Délai 8 semaines"],
                ].map(([monogram, company, price, delay]) => <div className="quote-row" key={company}><span className="quote-avatar">{monogram}</span><span className="quote-name"><strong>{company}</strong><span>{delay}</span></span><strong className="quote-amount">{price}</strong></div>)}
              </div>
              <div className="quote-notice"><span className="status-icon"><CheckCircle2 size={15} /></span><span><strong>Demande transmise</strong><span>12 fournisseurs notifiés</span><span>Réponses attendues avant le 21 oct.</span></span></div>
            </div>
          </div>
        </section>

        <section className="section section--gray" id="offres" aria-labelledby="offers-title">
          <div className="container">
            <div className="section-heading">
              <div><h2 id="offers-title">Solutions à la une</h2><p>Une sélection d’offres de fournisseurs vérifiés.</p></div>
              <Link className="text-link" href="/marketplace">Voir toute la marketplace <ArrowRight size={13} /></Link>
            </div>
            <OfferCards results={offerResults} />
          </div>
        </section>
        <section className="section" id="opportunites" aria-labelledby="opportunities-title">
          <div className="container">
            <div className="section-heading">
              <div><h2 id="opportunities-title">Opportunités à saisir</h2><p>Appels d’offres, appels à projets et programmes startups, mis à jour chaque semaine.</p></div>
              <Link className="text-link" href="/opportunites">Toutes les opportunités <ArrowRight size={13} /></Link>
            </div>
            <div className="opportunities-layout">
              <div className="opportunity-list">
                {opportunities.map((item, index) => <article className="opportunity-row" key={item.title}>
                  <span className={`opportunity-type opportunity-type--${index + 1}`}>{item.type}</span>
                  <div className="opportunity-info"><h3><Link href={item.href}>{item.title}</Link></h3>{item.description && <p>{item.description}</p>}</div>
                  <div className="opportunity-budget"><strong>{item.budget}</strong></div>
                  <div className="opportunity-date"><span>Date limite</span><strong>{item.date}</strong></div>
                  <Link className="opportunity-next" href={item.href} aria-label={`Voir : ${item.title}`}><ArrowRight size={15} aria-hidden="true" /></Link>
                </article>)}
              </div>
              <aside className="supplier-cta" id="fournisseurs">
                <span className="supplier-icon"><Store size={18} /></span>
                <div><h3>Vous êtes fournisseur ?</h3><p>Publiez vos offres, répondez aux appels d’offres et trouvez des partenaires dans toute l’Afrique.</p></div>
                <Link className="button button--primary" href="/espace-fournisseur/inscription-professionnelle">Créer ma vitrine</Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="section section--gray ecosystem" id="ecosysteme" aria-labelledby="ecosystem-title">
          <div className="container ecosystem-layout">
            <div className="ecosystem-map-wrap"><MapArtwork variant="ecosystem" /></div>
            <div className="ecosystem-copy">
              <h2 id="ecosystem-title">Un hub pour l’Afrique, des routes vers les autres continents</h2>
              <p>TechnologyTrade Group relie les acteurs du numérique africain entre eux et avec leurs partenaires d’Europe, du Moyen-Orient, d’Asie et des Amériques.</p>
              <div className="eco-stat"><span>Fournisseurs vérifiés</span><strong>1 240</strong></div>
              <div className="eco-stat"><span>Pays représentés</span><strong>38</strong></div>
              <div className="eco-stat"><span>Demandes traitées</span><strong>9 600</strong></div>
              <Link className="button button--dark" href="/ecosysteme"><Network size={14} /> Découvrir l’écosystème</Link>
            </div>
          </div>
        </section>

        <section className="section" id="actualites" aria-labelledby="news-title">
          <div className="container">
            <div className="section-heading">
              <div><h2 id="news-title">Actualités et ressources</h2><p>Analyses de marché, études de cas et guides pratiques.</p></div>
              <Link className="text-link" href="/ressources">Toutes les publications <ArrowRight size={13} /></Link>
            </div>
            <div className="news-grid">
              <article className="news-card">
                <div className="news-art-wrap"><div className="news-visual news-visual--cloud"><NewsArtwork variant="cloud" /></div><span className="news-badge">Marché</span></div>
                <h3><Link href="/ressources/actualites/cloud-souverain">Cloud souverain : les administrations africaines accélèrent</Link></h3>
                <p>Quatre pays lancent des appels d’offres pour héberger leurs données publiques sur le continent.</p>
                <span className="news-meta">24 oct. 2026 · 6 min de lecture</span>
              </article>
              <article className="news-card">
                <div className="news-art-wrap"><div className="news-visual news-visual--study"><NewsArtwork variant="study" /></div><span className="news-badge">Étude</span></div>
                <h3><Link href="/ressources/etudes-rapports">Baromètre 2026 de la transformation numérique des PME</Link></h3>
                <p>Ce que les dirigeants des 12 pays achètent, retardent ou abandonnent.</p>
                <span className="news-meta">09 oct. 2026 · 12 min de lecture</span>
              </article>
              <article className="news-card">
                <div className="news-art-wrap"><div className="news-visual news-visual--ports"><NewsArtwork variant="ports" /></div><span className="news-badge">Cas client</span></div>
                <h3><Link href="/ressources/etudes-de-cas">Un port lacustre dématérialise la gestion de ses escales</Link></h3>
                <p>Comment l’Office National des Ports du Lac a réduit de moitié ses délais de facturation.</p>
                <span className="news-meta">02 oct. 2026 · 8 min de lecture</span>
              </article>
            </div>
          </div>
        </section>

        <section className="final-cta" id="contact" aria-labelledby="final-title">
          <div className="container final-cta-inner">
            <div><h2 id="final-title">Prêt à présenter votre besoin ?</h2><p>Sept étapes, environ quinze minutes. Vous pouvez enregistrer votre brouillon et le reprendre à tout moment.</p></div>
            <div className="final-cta-actions">
              <Link className="button button--primary" href="/demande/presentation-du-service"><FileText size={14} /> Exprimer un besoin</Link>
              <Link className="button button--on-dark" href="/contact"><MessageCircle size={14} /> Parler à un conseiller</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a className="brand" href="#accueil" aria-label="TechnologyTrade Group — accueil"><Image src="/brand/Logo_horizontal_blanc.svg" alt="TechnologyTrade Group" width={1221} height={382} /></a>
            <p>Relier les technologies, faire avancer le commerce, bâtir l’avenir de l’Afrique.</p>
          </div>
          <div className="footer-col"><h3>Plateforme</h3><ul><li><Link href="/marketplace">Marketplace</Link></li><li><Link href="/demande/presentation-du-service">Exprimer un besoin</Link></li><li><Link href="/opportunites">Opportunités</Link></li><li><Link href="/fonctionnement-de-la-plateforme">Fonctionnement</Link></li><li><Link href="/tarifs">Tarifs</Link></li><li><Link href="/espace-client/connexion">Espace client</Link></li></ul></div>
          <div className="footer-col"><h3>Écosystème</h3><ul><li><Link href="/marketplace/fournisseurs/atlas-software-studio">Fournisseurs</Link></li><li><Link href="/partenariats">Partenariats</Link></li><li><Link href="/opportunites">Startups</Link></li><li><Link href="/opportunites">Institutions</Link></li><li><Link href="/opportunites">ONG et programmes</Link></li><li><Link href="/espace-fournisseur/inscription-professionnelle">Devenir fournisseur</Link></li></ul></div>
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
