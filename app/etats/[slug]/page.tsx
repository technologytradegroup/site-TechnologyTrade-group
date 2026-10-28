import { AdminAndStatePages } from "../../../components/AdminAndStatePages";

export const dynamicParams = false;
export function generateStaticParams() { return [{ slug: "recherche-sans-resultat" },
  { slug: "catalogue-vide" },
  { slug: "chargement" },
  { slug: "erreur-serveur" },
  { slug: "page-introuvable" },
  { slug: "acces-non-autorise" },
  { slug: "formulaire-invalide" },
  { slug: "confirmation-avant-action" },
  { slug: "notifications" },
  { slug: "succes-confirmation" },
  { slug: "tableau-de-bord-vide" },
  { slug: "etats-des-composants" }]; }
export default async function InterfaceStatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AdminAndStatePages area="etats" slug={slug} />;
}
