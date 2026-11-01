import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "../../actions/auth";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import { isSupabaseConfigured } from "../../../lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function ConnectedAccountPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="j-auth">
        <section className="j-auth-area">
          <div>
            <h1>Backend à configurer</h1>
            <p>Créez un projet Supabase et renseignez ses variables d’environnement pour activer les comptes.</p>
            <Link className="j-button primary" href="/espace-client/connexion">
              Retour à la connexion
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/espace-client/connexion");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name, account_type")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError) {
    return (
      <main className="j-auth">
        <section className="j-auth-area">
          <div>
            <h1>Compte connecté, profil indisponible</h1>
            <p role="alert">La session est valide, mais le profil n’a pas pu être chargé. Vérifiez la migration Supabase.</p>
            <form action={signOutAction}>
              <button className="j-button primary">Se déconnecter</button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  const displayName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="j-auth">
      <section className="j-auth-area">
        <div>
          <h1>Compte connecté</h1>
          <p>{displayName || data.user.email}</p>
          <p>Type de compte : {profile?.account_type ?? "à vérifier"}</p>
          <p>La session Supabase est active. Les espaces client et fournisseur restent en démonstration tant que leurs parcours ne sont pas reliés aux données.</p>
          <form action={signOutAction}>
            <button className="j-button primary">Se déconnecter</button>
          </form>
        </div>
      </section>
    </main>
  );
}
