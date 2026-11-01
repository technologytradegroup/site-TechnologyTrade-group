export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
  siteUrl?: string;
};

export class SupabaseConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseConfigurationError";
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );
}

export function getSupabasePublicConfig(): SupabasePublicConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    throw new SupabaseConfigurationError(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new SupabaseConfigurationError(
      "NEXT_PUBLIC_SUPABASE_URL must be an absolute URL.",
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.hostname !== "localhost" &&
    parsedUrl.hostname !== "127.0.0.1"
  ) {
    throw new SupabaseConfigurationError(
      "NEXT_PUBLIC_SUPABASE_URL must use HTTPS outside local development.",
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    let parsedSiteUrl: URL;
    try {
      parsedSiteUrl = new URL(siteUrl);
    } catch {
      throw new SupabaseConfigurationError(
        "NEXT_PUBLIC_SITE_URL must be an absolute URL.",
      );
    }

    if (
      parsedSiteUrl.protocol !== "https:" &&
      parsedSiteUrl.hostname !== "localhost" &&
      parsedSiteUrl.hostname !== "127.0.0.1"
    ) {
      throw new SupabaseConfigurationError(
        "NEXT_PUBLIC_SITE_URL must use HTTPS outside local development.",
      );
    }
  }

  return { url, publishableKey, siteUrl };
}
