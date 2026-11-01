import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "./server";
import {
  getSupabasePublicConfig,
  isSupabaseConfigured,
  SupabaseConfigurationError,
} from "./config";
import type { Database } from "./database.types";

export type AdminAccessResult =
  | {
      status: "authorized";
      supabase: SupabaseClient<Database>;
      user: User;
    }
  | {
      status:
        | "unconfigured"
        | "configuration-error"
        | "unauthenticated"
        | "forbidden"
        | "verification-error";
    };

export async function getAdminAccess(
  requiredPermission = "admin.access",
): Promise<AdminAccessResult> {
  if (!isSupabaseConfigured()) return { status: "unconfigured" };

  try {
    getSupabasePublicConfig();
  } catch (error) {
    if (error instanceof SupabaseConfigurationError) {
      return { status: "configuration-error" };
    }
    throw error;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error: sessionError } = await supabase.auth.getUser();

  if (sessionError) {
    if (
      !data.user &&
      sessionError.name === "AuthSessionMissingError"
    ) {
      return { status: "unauthenticated" };
    }
    console.error("Could not verify the administration session.", sessionError);
    return { status: "verification-error" };
  }
  if (!data.user) return { status: "unauthenticated" };

  const { data: permitted, error: permissionError } = await supabase.rpc(
    "has_admin_permission",
    { required_permission: requiredPermission },
  );

  if (permissionError) {
    console.error("Could not verify the administration permission.", permissionError);
    return { status: "verification-error" };
  }
  if (!permitted) return { status: "forbidden" };

  return { status: "authorized", supabase, user: data.user };
}
