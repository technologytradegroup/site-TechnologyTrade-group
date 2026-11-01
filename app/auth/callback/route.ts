import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "../../../lib/supabase/server";
import { isSupabaseConfigured } from "../../../lib/supabase/config";

function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/auth/connected";
  }
  return value;
}

export async function GET(request: NextRequest) {
  const callbackUrl = new URL("/auth/error?reason=callback", request.url);
  if (!isSupabaseConfigured()) return NextResponse.redirect(callbackUrl);

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (!code) return NextResponse.redirect(callbackUrl);

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(callbackUrl);

  const target = safeNextPath(requestUrl.searchParams.get("next"));
  return NextResponse.redirect(new URL(target, request.url));
}
