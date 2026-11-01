import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) =>
  readFileSync(fileURLToPath(new URL(path, root)), "utf8");
const migration = read(
  "supabase/migrations/20261101170000_initial_backend.sql",
);

test("the initial Supabase schema enables RLS on every application table", () => {
  const tables = [...migration.matchAll(/create table public\.(\w+)/g)].map(
    (match) => match[1],
  );
  assert.ok(tables.length >= 14);

  for (const table of tables) {
    assert.match(
      migration,
      new RegExp(`alter table public\\.${table} enable row level security`),
      `${table} must have row level security enabled`,
    );
    assert.match(
      migration,
      new RegExp(`create policy "[^"]+"\\s+on public\\.${table}`),
      `${table} must have explicit access policies`,
    );
  }
});

test("platform privileges cannot be self-assigned or changed in a user profile", () => {
  assert.match(migration, /create table public\.platform_admins/);
  assert.doesNotMatch(
    migration,
    /create policy "[^"]+"\s+on public\.platform_admins for (?:insert|update|delete|all)/,
  );
  assert.match(
    migration,
    /revoke update on public\.profiles from anon, authenticated/i,
  );
  assert.match(
    migration,
    /grant update \(first_name, last_name, phone\) on public\.profiles to authenticated/i,
  );
  assert.match(migration, /create or replace function public\.has_platform_role/);
  assert.match(migration, /create trigger quotes_prevent_participant_change/);
  assert.match(migration, /create trigger applications_prevent_participant_change/);
  assert.match(migration, /set search_path = ''/);
});

test("account creation provisions only a pending supplier profile and an organization owner", () => {
  assert.match(migration, /create trigger on_auth_user_created/);
  assert.match(migration, /insert into public\.organization_members[\s\S]*?'owner'/);
  assert.match(migration, /insert into public\.supplier_profiles \(organization_id\)/);
  assert.match(migration, /verification_status text not null default 'pending'/);
  assert.doesNotMatch(migration, /verification_status text not null default 'verified'/);
  assert.match(migration, /public_supplier_organizations[\s\S]*supplier\.verification_status = 'verified'/);
  assert.doesNotMatch(migration, /on public\.supplier_profiles for select to anon/);
});

test("Supabase configuration is public-key-only and validates deployment URLs", () => {
  const config = read("lib/supabase/config.ts");
  const proxy = read("proxy.ts");
  const envExample = read(".env.example");

  assert.match(config, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(config, /parsedUrl\.protocol !== "https:"/);
  assert.match(proxy, /supabase\.auth\.getClaims\(\)/);
  assert.doesNotMatch(
    `${config}\n${proxy}\n${envExample}`,
    /SERVICE_ROLE|service_role/i,
  );
});

test("auth actions validate credentials and never reveal whether a reset email exists", () => {
  const actions = read("app/actions/auth.ts");
  const form = read("components/BackendAuthForm.tsx");
  const callback = read("app/auth/callback/route.ts");

  assert.match(actions, /password\.length < 12/);
  assert.match(actions, /password\.length > 128/);
  assert.match(actions, /organizationName\.trim\(\)\.length > 200/);
  assert.match(actions, /requestPasswordResetAction/);
  assert.match(actions, /Si un compte correspond à cette adresse/);
  assert.match(callback, /auth\.exchangeCodeForSession\(code\)/);
  assert.match(callback, /value\.startsWith\("\/\/"\)/);
  assert.match(actions, /function readSafeNext/);
  assert.match(actions, /includes\(url\.pathname\)/);
  assert.match(actions, /redirect\(readSafeNext\(formData\)\)/);
  assert.doesNotMatch(actions, /redirect\(formData\.get\("next"\)/);
  assert.match(form, /useActionState/);
  assert.match(form, /nextPath === "\/admin"/);
  assert.match(form, /name="password_confirmation"/);
  const adminLayout = read("app/admin/layout.tsx");
  const clientPage = read("app/espace-client/[...slug]/page.tsx");
  assert.match(adminLayout, /connexion\?next=%2Fadmin/);
  assert.match(clientPage, /query\.next==="\/admin"/);
});

test("local setup instructions distinguish the prepared schema from connected workflows", () => {
  const readme = read("README.md");
  assert.match(readme, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(readme, /service_role/);
  assert.match(readme, /les formulaires de gestion ne sont pas encore connectés/);
});
