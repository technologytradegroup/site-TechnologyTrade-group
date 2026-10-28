import { AdminAndStatePages } from "../../../components/AdminAndStatePages";

export const dynamicParams = false;
export function generateStaticParams() { return [{ slug: "tableau-de-bord" },
  { slug: "utilisateurs" },
  { slug: "organisations" },
  { slug: "fournisseurs" },
  { slug: "moderation-des-offres" },
  { slug: "categories" },
  { slug: "demandes" },
  { slug: "opportunites" },
  { slug: "contenus-editoriaux" },
  { slug: "roles-et-permissions" },
  { slug: "parametres-generaux" },
  { slug: "statistiques" },
  { slug: "journaux-d-activite" }]; }
export default async function AdministrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AdminAndStatePages area="administration" slug={slug} />;
}
