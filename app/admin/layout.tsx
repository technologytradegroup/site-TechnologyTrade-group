import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "../actions/auth";
import { getAdminAccess } from "../../lib/supabase/administration";
import "./admin.css";

export const dynamic = "force-dynamic";

function AccessMessage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="ttg-admin-message">
      <section>
        <p className="ttg-admin-kicker">TechnologyTrade Group · Administration</p>
        <h1>{title}</h1>
        {children}
        <Link href="/" className="ttg-admin-link">
          Retour au site public
        </Link>
      </section>
    </main>
  );
}

export default async function AdministrationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const access = await getAdminAccess();

  if (access.status === "unconfigured") {
    return (
      <AccessMessage title="Backend à configurer">
        <p>
          L’espace privé reste fermé tant qu’un projet Supabase n’est pas relié.
          Configurez les variables locales décrites dans <code>.env.example</code>,
          puis appliquez les migrations dans l’ordre.
        </p>
      </AccessMessage>
    );
  }

  if (access.status === "configuration-error") {
    return (
      <AccessMessage title="Configuration Supabase invalide">
        <p>
          Les variables de connexion sont présentes mais ne permettent pas de
          vérifier l’accès. Corrigez la configuration locale avant de réessayer.
        </p>
      </AccessMessage>
    );
  }

  if (access.status === "unauthenticated") {
    redirect("/espace-client/connexion?next=%2Fadmin");
  }

  if (access.status === "forbidden") {
    return (
      <AccessMessage title="Accès réservé">
        <p role="alert">
          Ce compte n’a pas reçu la permission d’accéder à l’administration.
          Contactez un super-administrateur.
        </p>
      </AccessMessage>
    );
  }

  if (access.status === "verification-error") {
    return (
      <AccessMessage title="Vérification indisponible">
        <p role="alert">
          La session ou les permissions n’ont pas pu être vérifiées. Aucun contenu
          privé n’a été affiché. Vérifiez la connexion et les migrations Supabase.
        </p>
      </AccessMessage>
    );
  }

  if (access.status !== "authorized") {
    return (
      <AccessMessage title="Accès indisponible">
        <p role="alert">
          L’accès à l’administration n’a pas pu être établi. Aucun contenu privé
          n’a été affiché.
        </p>
      </AccessMessage>
    );
  }

  return (
    <div className="ttg-admin-shell">
      <header className="ttg-admin-header">
        <div>
          <p className="ttg-admin-kicker">Espace privé</p>
          <Link href="/admin" className="ttg-admin-brand">
            TechnologyTrade Group
          </Link>
        </div>
        <div className="ttg-admin-account">
          <span>{access.user.email}</span>
          <form action={signOutAction}>
            <button type="submit">Se déconnecter</button>
          </form>
        </div>
      </header>
      <nav className="ttg-admin-nav" aria-label="Navigation administration">
        <Link href="/admin" aria-current="page">
          Vue d’ensemble
        </Link>
      </nav>
      <main className="ttg-admin-content">{children}</main>
    </div>
  );
}
