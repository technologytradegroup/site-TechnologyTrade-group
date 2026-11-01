import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const initialMigration = readFileSync(
  fileURLToPath(
    new URL(
      "supabase/migrations/20261101170000_initial_backend.sql",
      root,
    ),
  ),
  "utf8",
);
const migration = readFileSync(
  fileURLToPath(
    new URL(
      "supabase/migrations/20261101190000_enterprise_foundation.sql",
      root,
    ),
  ),
  "utf8",
);
const adminLayout = readFileSync(
  fileURLToPath(new URL("app/admin/layout.tsx", root)),
  "utf8",
);
const adminDashboard = readFileSync(
  fileURLToPath(new URL("app/admin/page.tsx", root)),
  "utf8",
);
const adminAccess = readFileSync(
  fileURLToPath(new URL("lib/supabase/administration.ts", root)),
  "utf8",
);

test("every enterprise table enables RLS and declares a policy", () => {
  const tables = [...migration.matchAll(/create table public\.(\w+)/g)].map(
    (match) => match[1],
  );
  assert.equal(tables.length, 22);

  for (const table of tables) {
    assert.match(
      migration,
      new RegExp(`alter table public\\.${table} enable row level security`),
      `${table} must enable RLS`,
    );
    assert.match(
      migration,
      new RegExp(`create policy "[^"]+"\\s+on public\\.${table}`),
      `${table} must declare an access policy`,
    );
  }
});

test("administrative permissions are not self-assignable", () => {
  assert.match(
    migration,
    /create or replace function public\.has_admin_permission\(required_permission text\)/,
  );
  assert.match(migration, /administrator\.role = 'super_admin'/);
  assert.match(migration, /assignment\.revoked_at is null/);
  assert.match(
    migration,
    /create policy "Super administrators manage administrative role assignments"[\s\S]*?has_admin_permission\('admin\.roles\.manage'\)/,
  );
  assert.doesNotMatch(
    migration,
    /create policy "[^"]+"\s+on public\.administration_user_roles for insert to authenticated\s+with check \(user_id = \(select auth\.uid\(\)\)/i,
  );
});

test("the nine official brand names and order are seeded as unpublished drafts", () => {
  const seed = migration.match(
    /insert into public\.company_pillars \(slug, brand_name, label_fr, sort_order\) values([\s\S]*?)on conflict \(slug\) do nothing;/,
  )?.[1];
  assert.ok(seed);

  const pillars = [...seed.matchAll(/\('([a-z-]+)', '([^']+)', '[^']+', (\d)\)/g)].map(
    (match) => [match[2], Number(match[3])],
  );
  assert.deepEqual(pillars, [
    ["Software", 1],
    ["AI", 2],
    ["Cloud", 3],
    ["Cyber", 4],
    ["Academy", 5],
    ["Labs", 6],
    ["Capital", 7],
    ["Market", 8],
    ["Foundation", 9],
  ]);
  assert.match(migration, /publication_status text not null default 'draft'/);
  assert.match(migration, /'pillars\.publish'/);
});

test("publishing is permission-gated, reviewed, and invalidated by content edits", () => {
  assert.match(
    migration,
    /create or replace function public\.enforce_publication_permissions\(\)/,
  );
  assert.match(
    migration,
    /This role cannot publish this content\./,
  );
  assert.match(
    migration,
    /The content author cannot approve their own publication\./,
  );
  assert.match(
    migration,
    /jsonb_set\(next_row, '\{publication_status\}', '"pending_review"'/,
  );
  assert.match(
    migration,
    /A price requires an independent finance approval before publication\./,
  );
  assert.match(
    migration,
    /Partner confirmation and brand authorization require publication permission\./,
  );
  assert.match(migration, /author_field text := 'created_by'/);
  assert.match(migration, /author_field := 'uploaded_by'/);
  assert.match(
    migration,
    /The content author must match the authenticated user\./,
  );
  assert.match(migration, /The content author cannot be changed\./);
});

test("company services and third-party marketplace offers remain separate", () => {
  const allMigrations = `${initialMigration}\n${migration}`;
  assert.match(migration, /create table public\.company_services/);
  assert.match(allMigrations, /create table public\.offers/);
  assert.match(
    migration,
    /create table public\.company_quote_requests[\s\S]*?requester_id uuid references public\.profiles/,
  );
  assert.match(
    migration,
    /create policy "Authenticated users submit company quote requests"\s+on public\.company_quote_requests for insert to authenticated/,
  );
  assert.doesNotMatch(
    migration,
    /create policy "[^"]+"\s+on public\.company_quote_requests for insert to anon/i,
  );
  assert.doesNotMatch(migration, /insert into public\.service_prices/i);
});

test("media starts private and only approved media metadata is public", () => {
  assert.match(
    migration,
    /visibility text not null default 'private' check \(visibility in \('private', 'public'\)\)/,
  );
  assert.match(
    migration,
    /publication_status = 'published' and visibility = 'public'/,
  );
  assert.match(migration, /'application\/pdf'/);
  assert.match(migration, /file_size_bytes between 1 and 52428800/);
});

test("the operational administration route checks session and database permission", () => {
  assert.match(adminLayout, /export const dynamic = "force-dynamic"/);
  assert.match(adminLayout, /getAdminAccess\(\)/);
  assert.match(
    adminLayout,
    /redirect\("\/espace-client\/connexion\?next=%2Fadmin"\)/,
  );
  assert.match(adminLayout, /access\.status === "forbidden"/);
  assert.match(adminAccess, /supabase\.auth\.getUser\(\)/);
  assert.match(adminAccess, /"has_admin_permission"/);
  assert.match(adminLayout, /Backend à configurer/);
  assert.match(adminAccess, /sessionError\.name === "AuthSessionMissingError"/);
  assert.match(
    adminAccess,
    /AuthSessionMissingError"[\s\S]*?return \{ status: "unauthenticated" \}/,
  );
});

test("the dashboard only displays permission-scoped database counts", () => {
  assert.match(adminDashboard, /"pillars\.read"/);
  assert.match(adminDashboard, /"partners\.read"/);
  assert.match(adminDashboard, /"services\.read"/);
  assert.match(adminDashboard, /"quotes\.read"/);
  assert.match(adminDashboard, /count: "exact"/);
  assert.match(adminDashboard, /metric\.value \?\? "—"/);
  assert.doesNotMatch(adminDashboard, /value:\s*0\b/);
});
