import type { SupabaseClient } from "@supabase/supabase-js";
import { getAdminAccess } from "../../lib/supabase/administration";
import type { Database } from "../../lib/supabase/database.types";

export const dynamic = "force-dynamic";

type CountQuery = () => Promise<{
  count: number | null;
  error: { message: string } | null;
}>;

async function loadCount(
  supabase: SupabaseClient<Database>,
  permission: string,
  query: CountQuery,
): Promise<{ value: number | null; error: boolean }> {
  const { data: permitted, error: permissionError } = await supabase.rpc(
    "has_admin_permission",
    { required_permission: permission },
  );
  if (permissionError) {
    console.error(`Could not verify the administration permission ${permission}.`, permissionError);
    return { value: null, error: true };
  }
  if (!permitted) return { value: null, error: false };

  const result = await query();
  if (result.error) {
    console.error(`Could not load administration metric for ${permission}.`, result.error);
    return { value: null, error: true };
  }
  return { value: result.count ?? 0, error: false };
}

export default async function AdministrationDashboardPage() {
  const access = await getAdminAccess();
  if (access.status !== "authorized") return null;

  const metrics = await Promise.all([
    loadCount(access.supabase, "pillars.read", async () =>
      access.supabase.from("company_pillars").select("id", {
        count: "exact",
        head: true,
      }),
    ),
    loadCount(access.supabase, "partners.read", async () =>
      access.supabase.from("partners").select("id", {
        count: "exact",
        head: true,
      }),
    ),
    loadCount(access.supabase, "services.read", async () =>
      access.supabase.from("company_services").select("id", {
        count: "exact",
        head: true,
      }),
    ),
    loadCount(access.supabase, "quotes.read", async () =>
      access.supabase.from("company_quote_requests").select("id", {
        count: "exact",
        head: true,
      }),
    ),
  ]);

  const cards = [
    { title: "Piliers", description: "Contenus de TechnologyTrade Group", metric: metrics[0] },
    { title: "Partenaires", description: "Fiches accessibles à votre rôle", metric: metrics[1] },
    { title: "Services TTG", description: "Catalogue commercial propre", metric: metrics[2] },
    { title: "Demandes de devis", description: "Demandes commerciales visibles", metric: metrics[3] },
  ];

  return (
    <>
      <p className="ttg-admin-kicker">Tableau de bord</p>
      <h1>Vue d’ensemble</h1>
      <p className="ttg-admin-intro">
        Les nombres affichés sont lus depuis Supabase et limités aux données
        accessibles à votre rôle. Un tiret signifie que cette permission ne vous
        est pas attribuée; aucune statistique de démonstration n’est affichée.
      </p>
      <section className="ttg-admin-metrics" aria-label="Indicateurs issus de la base">
        {cards.map(({ title, description, metric }) => (
          <article className="ttg-admin-metric" key={title}>
            <h2>{title}</h2>
            <strong>{metric.error ? "!" : metric.value ?? "—"}</strong>
            <p>{metric.error ? "Données indisponibles" : description}</p>
          </article>
        ))}
      </section>
      {metrics.some((metric) => metric.error) && (
        <p className="ttg-admin-error" role="alert">
          Certaines données n’ont pas pu être chargées. Vérifiez les migrations et
          les droits RLS avant d’utiliser ces indicateurs.
        </p>
      )}
    </>
  );
}
