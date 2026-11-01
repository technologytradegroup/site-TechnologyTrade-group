"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "./config";
import type { Database } from "./database.types";

let browserClient: SupabaseClient<Database> | undefined;

export function createBrowserSupabaseClient(): SupabaseClient<Database> {
  if (!browserClient) {
    const config = getSupabasePublicConfig();
    browserClient = createBrowserClient<Database>(
      config.url,
      config.publishableKey,
    );
  }

  return browserClient;
}
