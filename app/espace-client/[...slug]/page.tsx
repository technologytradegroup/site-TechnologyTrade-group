import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientJourney } from "../../../components/RequestClientJourneys";
import { clientRoutes } from "../../../components/journey-routes";
export function generateStaticParams(){return clientRoutes.map(route=>({slug:route.slug.split("/")}))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;const page=clientRoutes.find(route=>route.slug===slug.join("/"));return {title:page?`${page.title} - Espace client - TechnologyTrade Group`:"Espace client - TechnologyTrade Group",description:page?.title}}
export default async function ClientPage({params,searchParams}:{params:Promise<{slug:string[]}>;searchParams:Promise<Record<string,string|string[]|undefined>>}){const [{slug},query]=await Promise.all([params,searchParams]);const route=slug.join("/");if(!clientRoutes.some(page=>page.slug===route))notFound();const nextPath=route==="connexion"&&query.next==="/admin"?"/admin":undefined;return <ClientJourney slug={route} nextPath={nextPath}/>}
