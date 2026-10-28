import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientJourney } from "../../../components/RequestClientJourneys";
import { clientRoutes } from "../../../components/journey-routes";
export function generateStaticParams(){return clientRoutes.map(route=>({slug:route.slug.split("/")}))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;const page=clientRoutes.find(route=>route.slug===slug.join("/"));return {title:page?`${page.title} - Espace client - TechnologyTrade Group`:"Espace client - TechnologyTrade Group",description:page?.title}}
export default async function ClientPage({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const route=slug.join("/");if(!clientRoutes.some(page=>page.slug===route))notFound();return <ClientJourney slug={route}/>}
