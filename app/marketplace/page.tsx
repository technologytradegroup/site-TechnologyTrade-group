import type { Metadata } from "next";
import { MarketplacePage } from "../../components/MarketplacePages";
export const metadata: Metadata = { title: "Marketplace numérique — TechnologyTrade Group", description: "Parcourez les offres, produits et services numériques de la marketplace TechnologyTrade Group." };
export default function MarketplaceHome() { return <MarketplacePage id="home" path="/marketplace" />; }
