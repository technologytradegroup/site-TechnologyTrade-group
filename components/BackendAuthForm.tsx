"use client";

import { useActionState } from "react";
import {
  requestPasswordResetAction,
  signInAction,
  signUpAction,
  updatePasswordAction,
  type AuthActionState,
} from "../app/actions/auth";

type AuthMode = "sign-in" | "sign-up" | "reset-request" | "reset-password";
type AccountType = "buyer" | "supplier";

const emptyState: AuthActionState = {};

export function BackendAuthForm({
  mode,
  accountType = "buyer",
  nextPath,
}: {
  mode: AuthMode;
  accountType?: AccountType;
  nextPath?: string;
}) {
  const action =
    mode === "sign-in"
      ? signInAction
      : mode === "sign-up"
        ? signUpAction
        : mode === "reset-request"
          ? requestPasswordResetAction
          : updatePasswordAction;
  const [state, formAction, pending] = useActionState(action, emptyState);

  return (
    <form action={formAction} className="j-form">
      {mode === "sign-in" && nextPath === "/admin" && (
        <input type="hidden" name="next" value="/admin" />
      )}
      {mode === "sign-up" && (
        <>
          <div className="j-grid">
            <label className="j-field">
              <span>Prénom *</span>
              <input name="first_name" autoComplete="given-name" required maxLength={100} />
            </label>
            <label className="j-field">
              <span>Nom *</span>
              <input name="last_name" autoComplete="family-name" required maxLength={100} />
            </label>
          </div>
          <label className="j-field">
            <span>Nom de l’organisation *</span>
            <input name="organization_name" autoComplete="organization" required minLength={2} maxLength={200} />
          </label>
          {accountType === "buyer" && (
            <label className="j-field">
              <span>Type d’organisation *</span>
              <select name="organization_type" required defaultValue="company">
                <option value="company">Entreprise</option>
                <option value="public_institution">Institution</option>
                <option value="nonprofit">ONG</option>
                <option value="independent">Indépendant</option>
              </select>
            </label>
          )}
          {accountType === "supplier" && (
            <input type="hidden" name="organization_type" value="company" />
          )}
          <input type="hidden" name="account_type" value={accountType} />
        </>
      )}

      {mode !== "reset-password" && (
        <label className="j-field">
          <span>Adresse e-mail *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="prenom.nom@organisation.org"
          />
        </label>
      )}

      {(mode === "sign-in" || mode === "sign-up") && (
        <label className="j-field">
          <span>Mot de passe *</span>
          <input
            name="password"
            type="password"
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            required
            minLength={mode === "sign-up" ? 12 : 1}
            maxLength={128}
          />
        </label>
      )}

      {mode === "reset-password" && (
        <>
          <label className="j-field">
            <span>Nouveau mot de passe *</span>
            <input name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required />
          </label>
          <label className="j-field">
            <span>Confirmer le mot de passe *</span>
            <input name="password_confirmation" type="password" autoComplete="new-password" minLength={12} maxLength={128} required />
          </label>
        </>
      )}

      {mode === "sign-up" && (
        <label className="j-check">
          <input name="terms" type="checkbox" required />
          J’accepte les conditions d’utilisation et la politique de confidentialité.
        </label>
      )}

      <button className="j-button primary" type="submit" disabled={pending}>
        {pending
          ? "Veuillez patienter…"
          : mode === "sign-in"
            ? "Se connecter"
            : mode === "sign-up"
              ? "Créer mon compte"
              : mode === "reset-request"
                ? "Envoyer le lien de réinitialisation"
                : "Modifier le mot de passe"}
      </button>
      {state.error && (
        <p className="j-feedback" role="alert">
          {state.error}
        </p>
      )}
      {state.notice && (
        <p className="j-feedback" role="status">
          {state.notice}
        </p>
      )}
    </form>
  );
}
