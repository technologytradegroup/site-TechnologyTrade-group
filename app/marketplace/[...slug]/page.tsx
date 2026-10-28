import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketplacePage } from "../../../components/MarketplacePages";
import { marketRoutes, offers } from "../../../lib/marketplace";
function resolve(slug: string[]) {
  const path = `/marketplace/${slug.join("/")}`;
  const route = marketRoutes.find((item) => item.path === path);
  if (route) return { id: route.id, title: route.title, description: route.description };
  if (slug[0] === "offres") { const offer = offers.find((item) => item.id === slug[1]); if (offer) return { id: "detail", title: offer.title, description: `${offer.title}, proposée par ${offer.provider}.` }; }
  return null;
}
export function generateStaticParams() { return [...marketRoutes.filter((route) => route.id !== "home").map((route) => ({ slug: route.path.replace("/marketplace/", "").split("/") })), ...offers.filter((offer) => offer.id !== "gestion-portuaire").map((offer) => ({ slug: ["offres", offer.id] }))]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> { const { slug } = await params; const route = resolve(slug); return route ? { title: `${route.title} — TechnologyTrade Group`, description: route.description } : {}; }
export default async function MarketplaceRoute({ params, searchParams }: { params: Promise<{ slug: string[] }>; searchParams: Promise<{ q?: string }> }) { const [{ slug }, search] = await Promise.all([params, searchParams]); const route = resolve(slug); if (!route) notFound(); return <MarketplacePage id={route.id as Parameters<typeof MarketplacePage>[0]["id"]} path={`/marketplace/${slug.join("/")}`} query={search.q} />; }
