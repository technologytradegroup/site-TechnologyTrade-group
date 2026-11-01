import Link from "next/link";
import { BackendAuthForm } from "../../../components/BackendAuthForm";

export default function ResetPasswordPage() {
  return (
    <main className="j-auth">
      <section className="j-auth-area">
        <div>
          <h1>Choisir un nouveau mot de passe</h1>
          <p>Le lien de réinitialisation doit être valide pour modifier votre mot de passe.</p>
          <BackendAuthForm mode="reset-password" />
          <Link href="/espace-client/connexion">Retour à la connexion</Link>
        </div>
      </section>
    </main>
  );
}
