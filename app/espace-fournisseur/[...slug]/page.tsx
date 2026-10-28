import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupplierWorkspace } from "../../../components/SupplierWorkspace";
import { resolveSupplierRoute, supplierRoutes } from "../../../lib/supplier-workspace";
export function generateStaticParams(){return supplierRoutes.map(route=>({slug:route.path.replace("/espace-fournisseur/","").split("/")}));}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const{slug}=await params;const route=resolveSupplierRoute(slug);return route?{title:`${route.title} — Espace fournisseur · TechnologyTrade Group`}:{};}
export default async function SupplierRoute({params}:{params:Promise<{slug:string[]}>}){const{slug}=await params;const route=resolveSupplierRoute(slug);if(!route)notFound();return <SupplierWorkspace id={route.id}/>;}
