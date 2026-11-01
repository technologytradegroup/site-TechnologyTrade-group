"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../../lib/supabase/server";
import {
  getSupabasePublicConfig,
  isSupabaseConfigured,
  SupabaseConfigurationError,
} from "../../lib/supabase/config";

export type AuthActionState = {
  error?: string;
  notice?: string;
};

function readSafeNext(formData: FormData): string {
  const value = formData.get("next");
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\r\n]/.test(value)
  ) {
    return "/auth/connected";
  }

  try {
    const url = new URL(value, "https://local.invalid");
    if (
      url.origin !== "https://local.invalid" ||
      !["/admin", "/auth/connected"].includes(url.pathname)
    ) {
      return "/auth/connected";
    }
    return url.pathname;
  } catch {
    return "/auth/connected";
  }
}

function readEmail(formData: FormData): string | null {
  const value = formData.get("email");
  if (typeof value !== "string") return null;

  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? email
    : null;
}

function readSiteUrl(): string | null {
  try {
    return getSupabasePublicConfig().siteUrl?.replace(/\/$/, "") ?? null;
  } catch (error) {
    if (error instanceof SupabaseConfigurationError) return null;
    throw error;
  }
}

function missingConfiguration(): AuthActionState {
  return {
    error:
      "Le backend n’est pas encore configuré. Renseignez les variables Supabase dans .env.local après avoir créé votre projet.",
  };
}

export async function signInAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return missingConfiguration();

  const email = readEmail(formData);
  const password = formData.get("password");
  if (
    !email ||
    typeof password !== "string" ||
    password.length === 0 ||
    password.length > 128
  ) {
    return { error: "Saisissez une adresse e-mail et un mot de passe valides." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error: "Connexion impossible. Vérifiez votre adresse e-mail et votre mot de passe.",
    };
  }

  redirect(readSafeNext(formData));
}

export async function signUpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return missingConfiguration();

  const email = readEmail(formData);
  const password = formData.get("password");
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const organizationName = formData.get("organization_name");
  const accountType = formData.get("account_type");
  const organizationType = formData.get("organization_type");

  if (
    !email ||
    typeof password !== "string" ||
    password.length < 12 ||
    password.length > 128 ||
    typeof firstName !== "string" ||
    firstName.trim().length < 1 ||
    firstName.trim().length > 100 ||
    typeof lastName !== "string" ||
    lastName.trim().length < 1 ||
    lastName.trim().length > 100 ||
    typeof organizationName !== "string" ||
    organizationName.trim().length < 2 ||
    organizationName.trim().length > 200 ||
    typeof organizationType !== "string" ||
    !["company", "public_institution", "nonprofit", "independent"].includes(
      organizationType,
    ) ||
    (accountType !== "buyer" && accountType !== "supplier") ||
    formData.get("terms") !== "on"
  ) {
    return {
      error:
        "Complétez les champs obligatoires, acceptez les conditions et choisissez un mot de passe d’au moins 12 caractères.",
    };
  }

  const siteUrl = readSiteUrl();
  if (!siteUrl) {
    return {
      error:
        "Définissez NEXT_PUBLIC_SITE_URL dans .env.local pour activer la confirmation du compte.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=/auth/connected`,
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        organization_name: organizationName.trim(),
        organization_type: organizationType,
        account_type: accountType,
      },
    },
  });

  if (error) {
    return {
      error:
        "La création du compte a échoué. Vérifiez les informations, puis réessayez ou contactez l’assistance.",
    };
  }

  if (data.session) redirect("/auth/connected");

  return {
    notice:
      "Votre demande de création de compte est enregistrée. Consultez votre boîte e-mail pour confirmer l’adresse avant de vous connecter.",
  };
}

export async function requestPasswordResetAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return missingConfiguration();

  const email = readEmail(formData);
  if (!email) return { error: "Saisissez une adresse e-mail valide." };

  const siteUrl = readSiteUrl();
  if (!siteUrl) {
    return {
      error:
        "Définissez NEXT_PUBLIC_SITE_URL dans .env.local pour activer la réinitialisation.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    return {
      error:
        "Le lien ne peut pas être envoyé pour le moment. Réessayez ultérieurement.",
    };
  }

  return {
    notice:
      "Si un compte correspond à cette adresse, un lien de réinitialisation vient d’être envoyé.",
  };
}

export async function updatePasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) return missingConfiguration();

  const password = formData.get("password");
  const confirmation = formData.get("password_confirmation");
  if (
    typeof password !== "string" ||
    password.length < 12 ||
    password.length > 128
  ) {
    return {
      error: "Choisissez un mot de passe de 12 à 128 caractères.",
    };
  }
  if (password !== confirmation) {
    return { error: "Les deux mots de passe ne correspondent pas." };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data.user) {
    return {
      error:
        "Votre lien n’est plus valide. Demandez un nouveau lien de réinitialisation.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      error:
        "Le mot de passe n’a pas pu être modifié. Demandez un nouveau lien puis réessayez.",
    };
  }

  redirect("/auth/connected");
}

export async function signOutAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("La déconnexion n’a pas pu être terminée.");
  redirect("/espace-client/connexion");
}
