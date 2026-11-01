import Link from "next/link";

export default async function AuthenticationErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message =
    reason === "callback"
      ? "Le lien de confirmation est invalide, expiré ou le backend n’est pas encore configuré."
      : "L’authentification n’a pas abouti. Réessayez ou demandez un nouveau lien.";

  return (
    <main className="j-auth">
      <section className="j-auth-area">
        <div>
          <h1>Connexion impossible</h1>
          <p role="alert">{message}</p>
          <Link className="j-button primary" href="/espace-client/connexion">
            Retour à la connexion
          </Link>
        </div>
      </section>
    </main>
  );
}
