import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequestJourney } from "../../../components/RequestClientJourneys";
import { requestRoutes } from "../../../components/journey-routes";
export function generateStaticParams(){return requestRoutes.map(route=>({slug:route.slug.split("/")}))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;const page=requestRoutes.find(route=>route.slug===slug.join("/"));return {title:page?`${page.title} - TechnologyTrade Group`:"Demande - TechnologyTrade Group",description:page?.title}}
export default async function DemandePage({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const route=slug.join("/");if(!requestRoutes.some(page=>page.slug===route))notFound();return <RequestJourney slug={route}/>}
