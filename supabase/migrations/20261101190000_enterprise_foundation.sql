create table public.administration_roles (
  role_key text primary key,
  name text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table public.administration_permissions (
  permission_key text primary key,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table public.administration_role_permissions (
  role_key text not null references public.administration_roles (role_key) on delete cascade,
  permission_key text not null references public.administration_permissions (permission_key) on delete cascade,
  primary key (role_key, permission_key)
);

create table public.administration_user_roles (
  user_id uuid not null references public.profiles (id) on delete cascade,
  role_key text not null references public.administration_roles (role_key) on delete restrict,
  granted_by uuid references public.profiles (id) on delete set null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (user_id, role_key),
  check (revoked_at is null or revoked_at >= granted_at)
);

create table public.company_profile (
  id smallint primary key default 1 check (id = 1),
  legal_name text,
  display_name text not null default 'TechnologyTrade Group',
  registration_country text,
  public_address text,
  public_email text,
  public_phone text,
  website text,
  overview text not null default '',
  mission text not null default '',
  vision text not null default '',
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (public_email is null or public_email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$')
);

create table public.company_history (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 200),
  body text not null default '',
  event_date date,
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_values (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  description text not null default '',
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_objectives (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 200),
  description text not null default '',
  target_date date,
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_pillars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  brand_name text not null unique check (char_length(brand_name) between 2 and 80),
  label_fr text not null,
  short_description text not null default '',
  description text not null default '',
  objectives text not null default '',
  sort_order smallint not null unique check (sort_order between 1 and 9),
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pillar_projects (
  id uuid primary key default gen_random_uuid(),
  pillar_id uuid not null references public.company_pillars (id) on delete cascade,
  title text not null check (char_length(title) between 2 and 200),
  description text not null default '',
  href text,
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_id text not null,
  object_path text not null,
  original_filename text not null,
  media_category text not null
    check (media_category in ('brand', 'executive', 'governance', 'pillar', 'partner', 'service', 'publication', 'document', 'other')),
  mime_type text not null,
  file_size_bytes bigint not null check (file_size_bytes between 1 and 52428800),
  visibility text not null default 'private' check (visibility in ('private', 'public')),
  alt_text text not null default '',
  caption text not null default '',
  captured_at date,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  uploaded_by uuid not null references public.profiles (id) on delete restrict,
  reviewed_by uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket_id, object_path),
  check (mime_type in ('image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf'))
);

create table public.pillar_media (
  pillar_id uuid not null references public.company_pillars (id) on delete cascade,
  media_asset_id uuid not null references public.media_assets (id) on delete restrict,
  usage text not null check (usage in ('cover', 'gallery')),
  sort_order integer not null default 0,
  primary key (pillar_id, media_asset_id)
);

create table public.partner_categories (
  category_key text primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 200),
  category_key text not null references public.partner_categories (category_key) on delete restrict,
  country text,
  website text,
  description text not null default '',
  logo_asset_id uuid references public.media_assets (id) on delete set null,
  relationship_confirmed boolean not null default false,
  brand_use_authorized boolean not null default false,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'rejected', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (publication_status <> 'published' or (relationship_confirmed and brand_use_authorized))
);

create table public.partnerships (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners (id) on delete restrict,
  partnership_type text not null,
  description text not null default '',
  start_date date,
  end_date date,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table public.company_service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.company_service_categories (id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 5 and 200),
  summary text not null default '',
  problem_solved text not null default '',
  description text not null default '',
  benefits text not null default '',
  deliverables text not null default '',
  target_audience text not null default '',
  indicative_delivery_time text,
  faq jsonb not null default '[]'::jsonb check (jsonb_typeof(faq) = 'array'),
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.company_services (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  description text not null default '',
  deliverables text not null default '',
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, name),
  unique (id, service_id)
);

create table public.service_prices (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.company_services (id) on delete cascade,
  package_id uuid,
  pricing_model text not null
    check (pricing_model in ('fixed', 'from', 'range', 'quote', 'recurring')),
  currency text check (currency is null or currency ~ '^[A-Z]{3}$'),
  amount_min numeric(14, 2) check (amount_min is null or amount_min >= 0),
  amount_max numeric(14, 2) check (amount_max is null or amount_max >= 0),
  billing_period text,
  terms text not null default '',
  effective_from date,
  effective_until date,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  approved_by uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (amount_min is null or amount_max is null or amount_min <= amount_max),
  check (pricing_model = 'quote' or amount_min is not null),
  check (pricing_model <> 'range' or amount_max is not null),
  check (pricing_model <> 'recurring' or nullif(trim(billing_period), '') is not null),
  check (effective_until is null or effective_from is null or effective_until >= effective_from),
  unique (id, service_id),
  foreign key (package_id, service_id)
    references public.service_packages (id, service_id) on delete restrict
);

create table public.service_options (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.company_services (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 160),
  description text not null default '',
  price_id uuid,
  sort_order integer not null default 0,
  publication_status text not null default 'draft'
    check (publication_status in ('draft', 'pending_review', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, name),
  foreign key (price_id, service_id)
    references public.service_prices (id, service_id) on delete restrict
);

create table public.company_quote_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  service_id uuid not null references public.company_services (id) on delete restrict,
  package_id uuid,
  requester_id uuid references public.profiles (id) on delete set null,
  requester_name text not null check (char_length(requester_name) between 2 and 160),
  requester_email text not null check (char_length(requester_email) <= 254),
  organization_name text,
  description text not null check (char_length(description) between 20 and 10000),
  budget_min numeric(14, 2) check (budget_min is null or budget_min >= 0),
  budget_max numeric(14, 2) check (budget_max is null or budget_max >= 0),
  currency text check (currency is null or currency ~ '^[A-Z]{3}$'),
  desired_deadline date,
  status text not null default 'submitted'
    check (status in ('submitted', 'received', 'in_review', 'needs_information', 'quoted', 'accepted', 'rejected', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (budget_min is null or budget_max is null or budget_min <= budget_max),
  foreign key (package_id, service_id)
    references public.service_packages (id, service_id) on delete restrict
);

create table public.company_quotes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.company_quote_requests (id) on delete restrict,
  amount numeric(14, 2) not null check (amount >= 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  message text not null default '',
  valid_until date,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'accepted', 'rejected', 'withdrawn')),
  created_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index company_history_public_idx on public.company_history (sort_order, event_date) where publication_status = 'published';
create index company_values_public_idx on public.company_values (sort_order) where publication_status = 'published';
create index company_objectives_public_idx on public.company_objectives (sort_order, target_date) where publication_status = 'published';
create index company_pillars_public_idx on public.company_pillars (sort_order) where publication_status = 'published';
create index pillar_projects_public_idx on public.pillar_projects (pillar_id, sort_order) where publication_status = 'published';
create index media_assets_status_idx on public.media_assets (media_category, publication_status, created_at desc);
create index partners_public_idx on public.partners (category_key, name) where publication_status = 'published';
create index partnerships_public_idx on public.partnerships (partner_id, start_date desc) where publication_status = 'published';
create index company_services_public_idx on public.company_services (category_id, name) where publication_status = 'published';
create index service_packages_public_idx on public.service_packages (service_id, sort_order) where publication_status = 'published';
create index service_prices_public_idx on public.service_prices (service_id, package_id, effective_from desc) where publication_status = 'published';
create index company_quote_requests_status_idx on public.company_quote_requests (status, created_at desc);
create index company_quote_requests_requester_idx on public.company_quote_requests (requester_id, created_at desc);
create index company_quotes_request_idx on public.company_quotes (request_id, created_at desc);

create trigger company_profile_set_updated_at
  before update on public.company_profile
  for each row execute procedure public.set_updated_at();
create trigger company_history_set_updated_at
  before update on public.company_history
  for each row execute procedure public.set_updated_at();
create trigger company_values_set_updated_at
  before update on public.company_values
  for each row execute procedure public.set_updated_at();
create trigger company_objectives_set_updated_at
  before update on public.company_objectives
  for each row execute procedure public.set_updated_at();
create trigger company_pillars_set_updated_at
  before update on public.company_pillars
  for each row execute procedure public.set_updated_at();
create trigger pillar_projects_set_updated_at
  before update on public.pillar_projects
  for each row execute procedure public.set_updated_at();
create trigger media_assets_set_updated_at
  before update on public.media_assets
  for each row execute procedure public.set_updated_at();
create trigger partners_set_updated_at
  before update on public.partners
  for each row execute procedure public.set_updated_at();
create trigger partnerships_set_updated_at
  before update on public.partnerships
  for each row execute procedure public.set_updated_at();
create trigger service_categories_set_updated_at
  before update on public.company_service_categories
  for each row execute procedure public.set_updated_at();
create trigger company_services_set_updated_at
  before update on public.company_services
  for each row execute procedure public.set_updated_at();
create trigger service_packages_set_updated_at
  before update on public.service_packages
  for each row execute procedure public.set_updated_at();
create trigger service_prices_set_updated_at
  before update on public.service_prices
  for each row execute procedure public.set_updated_at();
create trigger service_options_set_updated_at
  before update on public.service_options
  for each row execute procedure public.set_updated_at();
create trigger company_quote_requests_set_updated_at
  before update on public.company_quote_requests
  for each row execute procedure public.set_updated_at();
create trigger company_quotes_set_updated_at
  before update on public.company_quotes
  for each row execute procedure public.set_updated_at();

insert into public.administration_permissions (permission_key, description) values
  ('admin.access', 'Accéder à l’espace privé d’administration.'),
  ('admin.roles.read', 'Consulter les rôles et permissions internes.'),
  ('admin.roles.manage', 'Attribuer et révoquer les rôles administratifs.'),
  ('admin.audit.read', 'Consulter les journaux des actions d’administration.'),
  ('company.read', 'Consulter les contenus institutionnels.'),
  ('company.manage', 'Créer et modifier les contenus institutionnels.'),
  ('company.publish', 'Valider et publier les contenus institutionnels.'),
  ('pillars.read', 'Consulter les piliers et projets associés.'),
  ('pillars.manage', 'Gérer les contenus et la publication des piliers.'),
  ('pillars.publish', 'Valider et publier les piliers et leurs projets.'),
  ('partners.read', 'Consulter les fiches partenaires.'),
  ('partners.manage', 'Gérer les fiches, validations et publications partenaires.'),
  ('partners.publish', 'Confirmer et publier les contenus de partenariat.'),
  ('media.read', 'Consulter les métadonnées des médias.'),
  ('media.manage', 'Importer et gérer les médias et leur publication.'),
  ('media.publish', 'Valider et publier les médias approuvés.'),
  ('services.read', 'Consulter le catalogue propre à TechnologyTrade Group.'),
  ('services.manage', 'Gérer les catégories, services, forfaits et tarifs.'),
  ('services.publish', 'Valider et publier les services et leurs tarifs.'),
  ('pricing.read', 'Consulter les tarifs internes et leur statut d’approbation.'),
  ('pricing.approve', 'Approuver les montants des tarifs avant publication.'),
  ('quotes.read', 'Consulter les demandes et devis commerciaux.'),
  ('quotes.manage', 'Traiter les demandes et gérer les devis commerciaux.'),
  ('governance.read', 'Consulter les informations de gouvernance.'),
  ('governance.manage', 'Gérer les fonctions et profils de gouvernance.'),
  ('management.read', 'Consulter le chronogramme et les activités de direction.'),
  ('management.manage', 'Gérer les activités, décisions et tâches de direction.'),
  ('documents.read', 'Consulter les documents internes autorisés.'),
  ('documents.manage', 'Gérer les documents internes autorisés.'),
  ('analytics.read', 'Consulter les indicateurs calculés à partir des données réelles.')
on conflict (permission_key) do nothing;

insert into public.administration_roles (role_key, name, description) values
  ('super_admin', 'Super-administrateur', 'Accès complet administré hors inscription publique.'),
  ('direction', 'Direction', 'Consultation des contenus et activités de direction autorisés.'),
  ('content_manager', 'Gestionnaire de contenus', 'Gestion éditoriale des contenus institutionnels et médias.'),
  ('partner_manager', 'Gestionnaire des partenaires', 'Gestion des fiches, validations et publications partenaires.'),
  ('commercial_manager', 'Responsable commercial', 'Suivi du catalogue commercial et des demandes de devis.'),
  ('services_manager', 'Gestionnaire des services', 'Gestion des catégories, services, forfaits et tarifs.'),
  ('finance_manager', 'Gestionnaire financier', 'Accès financier limité aux autorisations explicitement attribuées.'),
  ('moderator', 'Modérateur', 'Modération des offres et contenus relevant de son périmètre.'),
  ('editor', 'Éditeur', 'Gestion et publication éditoriale autorisées.'),
  ('support', 'Support', 'Assistance limitée aux dossiers autorisés.'),
  ('analyst', 'Analyste', 'Consultation d’indicateurs minimisés.')
on conflict (role_key) do nothing;

insert into public.administration_role_permissions (role_key, permission_key) values
  ('direction', 'admin.access'),
  ('direction', 'company.read'),
  ('direction', 'company.publish'),
  ('direction', 'pillars.read'),
  ('direction', 'pillars.publish'),
  ('direction', 'partners.read'),
  ('direction', 'partners.publish'),
  ('direction', 'services.read'),
  ('direction', 'services.publish'),
  ('direction', 'media.publish'),
  ('direction', 'quotes.read'),
  ('direction', 'governance.read'),
  ('direction', 'management.read'),
  ('direction', 'documents.read'),
  ('direction', 'analytics.read'),
  ('content_manager', 'admin.access'),
  ('content_manager', 'company.read'),
  ('content_manager', 'company.manage'),
  ('content_manager', 'pillars.read'),
  ('content_manager', 'pillars.manage'),
  ('content_manager', 'media.read'),
  ('content_manager', 'media.manage'),
  ('partner_manager', 'admin.access'),
  ('partner_manager', 'partners.read'),
  ('partner_manager', 'partners.manage'),
  ('partner_manager', 'media.read'),
  ('partner_manager', 'media.manage'),
  ('commercial_manager', 'admin.access'),
  ('commercial_manager', 'services.read'),
  ('commercial_manager', 'quotes.read'),
  ('commercial_manager', 'quotes.manage'),
  ('services_manager', 'admin.access'),
  ('services_manager', 'services.read'),
  ('services_manager', 'services.manage'),
  ('services_manager', 'media.read'),
  ('services_manager', 'media.manage'),
  ('finance_manager', 'admin.access'),
  ('finance_manager', 'pricing.read'),
  ('finance_manager', 'quotes.read'),
  ('finance_manager', 'pricing.approve'),
  ('moderator', 'admin.access'),
  ('editor', 'admin.access'),
  ('editor', 'company.read'),
  ('editor', 'company.manage'),
  ('editor', 'media.read'),
  ('editor', 'media.manage'),
  ('support', 'admin.access'),
  ('analyst', 'admin.access'),
  ('analyst', 'analytics.read'),
  ('analyst', 'admin.audit.read'),
  ('support', 'admin.audit.read')
on conflict (role_key, permission_key) do nothing;

create or replace function public.has_admin_permission(required_permission text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.platform_admins administrator
    where administrator.user_id = (select auth.uid())
      and administrator.role = 'super_admin'
  ) or exists (
    select 1
    from public.administration_user_roles assignment
    where assignment.user_id = (select auth.uid())
      and assignment.revoked_at is null
      and assignment.role_key = 'super_admin'
  ) or exists (
    select 1
    from public.administration_user_roles assignment
    join public.administration_role_permissions role_permission
      on role_permission.role_key = assignment.role_key
    where assignment.user_id = (select auth.uid())
      and assignment.revoked_at is null
      and role_permission.permission_key = required_permission
  ) or exists (
    select 1
    from public.platform_admins administrator
    join public.administration_role_permissions role_permission
      on role_permission.role_key = administrator.role
    where administrator.user_id = (select auth.uid())
      and role_permission.permission_key = required_permission
  );
$$;

revoke all on function public.has_admin_permission(text) from public;
grant execute on function public.has_admin_permission(text) to anon, authenticated;

create or replace function public.enforce_publication_permissions()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  old_row jsonb := '{}'::jsonb;
  next_row jsonb := to_jsonb(new);
  manager_permission text;
  publisher_permission text;
  author_field text := 'created_by';
  author_id text;
  metadata_fields text[] := array[
    'publication_status',
    'published_at',
    'reviewed_by',
    'updated_at',
    'updated_by'
  ];
begin
  if tg_op = 'UPDATE' then
    old_row := to_jsonb(old);
  end if;

  if tg_table_name = 'media_assets' then
    author_field := 'uploaded_by';
  end if;

  if tg_op = 'INSERT' and (select auth.uid()) is not null then
    author_id := next_row ->> author_field;
    if author_id is null then
      next_row := jsonb_set(
        next_row,
        array[author_field],
        to_jsonb((select auth.uid()))
      );
    elsif author_id is distinct from (select auth.uid())::text then
      raise exception using
        errcode = '42501',
        message = 'The content author must match the authenticated user.';
    end if;
  elsif tg_op = 'UPDATE'
    and (old_row -> author_field) is distinct from (next_row -> author_field)
  then
    raise exception using
      errcode = '42501',
      message = 'The content author cannot be changed.';
  end if;

  case tg_table_name
    when 'company_profile', 'company_history', 'company_values', 'company_objectives' then
      manager_permission := 'company.manage';
      publisher_permission := 'company.publish';
    when 'company_pillars', 'pillar_projects' then
      manager_permission := 'pillars.manage';
      publisher_permission := 'pillars.publish';
    when 'media_assets' then
      manager_permission := 'media.manage';
      publisher_permission := 'media.publish';
      metadata_fields := array_append(metadata_fields, 'visibility');
    when 'partners', 'partnerships' then
      manager_permission := 'partners.manage';
      publisher_permission := 'partners.publish';
      if tg_table_name = 'partners' then
        metadata_fields := array_append(metadata_fields, 'relationship_confirmed');
        metadata_fields := array_append(metadata_fields, 'brand_use_authorized');
      end if;
    when 'company_service_categories', 'company_services', 'service_packages', 'service_prices', 'service_options' then
      manager_permission := 'services.manage';
      publisher_permission := 'services.publish';
      if tg_table_name = 'service_prices' then
        metadata_fields := array_append(metadata_fields, 'approved_by');
      end if;
    else
      raise exception using
        errcode = '22023',
        message = 'Unsupported publication target.';
  end case;

  if tg_op = 'UPDATE' and old_row ->> 'publication_status' = 'published'
    and next_row ->> 'publication_status' = 'published'
    and (old_row - metadata_fields) is distinct from (next_row - metadata_fields)
  then
    next_row := jsonb_set(next_row, '{publication_status}', '"pending_review"'::jsonb);
    next_row := jsonb_set(next_row, '{published_at}', 'null'::jsonb);
    next_row := jsonb_set(next_row, '{reviewed_by}', 'null'::jsonb);
  end if;

  if tg_op = 'UPDATE'
    and not (select public.has_admin_permission(manager_permission))
    and (old_row - metadata_fields) is distinct from (next_row - metadata_fields)
  then
    raise exception using
      errcode = '42501',
      message = 'This role may change publication status but not edit content.';
  end if;

  if tg_table_name = 'partners'
    and (
      (tg_op = 'UPDATE' and (
        old_row -> 'relationship_confirmed' is distinct from next_row -> 'relationship_confirmed'
        or old_row -> 'brand_use_authorized' is distinct from next_row -> 'brand_use_authorized'
      ))
      or (tg_op = 'INSERT' and (
        next_row -> 'relationship_confirmed' = 'true'::jsonb
        or next_row -> 'brand_use_authorized' = 'true'::jsonb
      ))
    )
    and not (select public.has_admin_permission('partners.publish'))
  then
    raise exception using
      errcode = '42501',
      message = 'Partner confirmation and brand authorization require publication permission.';
  end if;

  if tg_table_name = 'media_assets'
    and (
      (tg_op = 'UPDATE' and old_row -> 'visibility' is distinct from next_row -> 'visibility')
      or (tg_op = 'INSERT' and next_row ->> 'visibility' = 'public')
    )
    and not (select public.has_admin_permission('media.publish'))
  then
    raise exception using
      errcode = '42501',
      message = 'Changing media visibility requires publication permission.';
  end if;

  if tg_table_name = 'service_prices' then
    if old_row -> 'approved_by' is distinct from next_row -> 'approved_by'
      and next_row -> 'approved_by' <> 'null'::jsonb
      and (
        not (select public.has_admin_permission('pricing.approve'))
        or next_row ->> 'approved_by' is distinct from (select auth.uid())::text
      )
    then
      raise exception using
        errcode = '42501',
        message = 'Only an authorized finance approver can approve a service price.';
    end if;

    if tg_op = 'UPDATE'
      and (old_row - array_append(metadata_fields, 'approved_by'))
        is distinct from (next_row - array_append(metadata_fields, 'approved_by'))
    then
      next_row := jsonb_set(next_row, '{approved_by}', 'null'::jsonb);
      if next_row ->> 'publication_status' = 'published' then
        next_row := jsonb_set(next_row, '{publication_status}', '"pending_review"'::jsonb);
        next_row := jsonb_set(next_row, '{published_at}', 'null'::jsonb);
        next_row := jsonb_set(next_row, '{reviewed_by}', 'null'::jsonb);
      end if;
    end if;

    if tg_op = 'UPDATE'
      and not (select public.has_admin_permission(manager_permission))
      and (old_row - array_append(metadata_fields, 'approved_by'))
        is distinct from (next_row - array_append(metadata_fields, 'approved_by'))
    then
      raise exception using
        errcode = '42501',
        message = 'Price approval does not grant permission to edit price terms.';
    end if;

    if next_row ->> 'publication_status' = 'published'
      and (
        not (select public.has_admin_permission('pricing.approve'))
        or next_row -> 'approved_by' = 'null'::jsonb
        or next_row -> 'approved_by' = next_row -> 'created_by'
      )
    then
      raise exception using
        errcode = '42501',
        message = 'A price requires an independent finance approval before publication.';
    end if;
  end if;

  if next_row ->> 'publication_status' = 'published'
    and (
      tg_op = 'INSERT'
      or old_row ->> 'publication_status' is distinct from 'published'
    )
  then
    if not (select public.has_admin_permission(publisher_permission)) then
      raise exception using
        errcode = '42501',
        message = 'This role cannot publish this content.';
    end if;

    if next_row -> 'created_by' is not null
      and next_row -> 'created_by' <> 'null'::jsonb
      and next_row ->> 'created_by' = (select auth.uid())::text
    then
      raise exception using
        errcode = '42501',
        message = 'The content author cannot approve their own publication.';
    end if;

    next_row := jsonb_set(next_row, '{published_at}', to_jsonb(statement_timestamp()));
    next_row := jsonb_set(next_row, '{reviewed_by}', to_jsonb((select auth.uid())));
  end if;

  new := jsonb_populate_record(new, next_row);
  return new;
end;
$$;

revoke all on function public.enforce_publication_permissions() from public, anon, authenticated;

create trigger company_profile_publication_review
  before insert or update on public.company_profile
  for each row execute procedure public.enforce_publication_permissions();
create trigger company_history_publication_review
  before insert or update on public.company_history
  for each row execute procedure public.enforce_publication_permissions();
create trigger company_values_publication_review
  before insert or update on public.company_values
  for each row execute procedure public.enforce_publication_permissions();
create trigger company_objectives_publication_review
  before insert or update on public.company_objectives
  for each row execute procedure public.enforce_publication_permissions();
create trigger company_pillars_publication_review
  before insert or update on public.company_pillars
  for each row execute procedure public.enforce_publication_permissions();
create trigger pillar_projects_publication_review
  before insert or update on public.pillar_projects
  for each row execute procedure public.enforce_publication_permissions();
create trigger media_assets_publication_review
  before insert or update on public.media_assets
  for each row execute procedure public.enforce_publication_permissions();
create trigger partners_publication_review
  before insert or update on public.partners
  for each row execute procedure public.enforce_publication_permissions();
create trigger partnerships_publication_review
  before insert or update on public.partnerships
  for each row execute procedure public.enforce_publication_permissions();
create trigger service_categories_publication_review
  before insert or update on public.company_service_categories
  for each row execute procedure public.enforce_publication_permissions();
create trigger company_services_publication_review
  before insert or update on public.company_services
  for each row execute procedure public.enforce_publication_permissions();
create trigger service_packages_publication_review
  before insert or update on public.service_packages
  for each row execute procedure public.enforce_publication_permissions();
create trigger service_prices_publication_review
  before insert or update on public.service_prices
  for each row execute procedure public.enforce_publication_permissions();
create trigger service_options_publication_review
  before insert or update on public.service_options
  for each row execute procedure public.enforce_publication_permissions();

create or replace function public.log_enterprise_admin_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  old_row jsonb := '{}'::jsonb;
  next_row jsonb := '{}'::jsonb;
  changed_fields text[];
  target_key text;
begin
  if tg_op in ('UPDATE', 'DELETE') then
    old_row := to_jsonb(old);
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    next_row := to_jsonb(new);
  end if;

  select coalesce(array_agg(field_name order by field_name), array[]::text[])
  into changed_fields
  from jsonb_object_keys(case when tg_op = 'DELETE' then old_row else next_row end) as fields(field_name)
  where tg_op in ('INSERT', 'DELETE')
    or old_row -> field_name is distinct from next_row -> field_name;

  target_key := coalesce(
    next_row ->> 'id',
    old_row ->> 'id',
    next_row ->> 'user_id',
    old_row ->> 'user_id',
    next_row ->> 'role_key',
    old_row ->> 'role_key',
    next_row ->> 'permission_key',
    old_row ->> 'permission_key'
  );

  insert into public.audit_logs (actor_id, action, target_type, target_id, details)
  values (
    (select auth.uid()),
    lower(tg_op),
    tg_table_name,
    target_key,
    jsonb_build_object('changed_fields', changed_fields)
  );

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

revoke all on function public.log_enterprise_admin_change() from public, anon, authenticated;

create trigger administration_roles_audit
  after insert or update or delete on public.administration_roles
  for each row execute procedure public.log_enterprise_admin_change();
create trigger administration_role_permissions_audit
  after insert or update or delete on public.administration_role_permissions
  for each row execute procedure public.log_enterprise_admin_change();
create trigger administration_user_roles_audit
  after insert or update or delete on public.administration_user_roles
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_profile_audit
  after insert or update or delete on public.company_profile
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_history_audit
  after insert or update or delete on public.company_history
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_values_audit
  after insert or update or delete on public.company_values
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_objectives_audit
  after insert or update or delete on public.company_objectives
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_pillars_audit
  after insert or update or delete on public.company_pillars
  for each row execute procedure public.log_enterprise_admin_change();
create trigger pillar_projects_audit
  after insert or update or delete on public.pillar_projects
  for each row execute procedure public.log_enterprise_admin_change();
create trigger media_assets_audit
  after insert or update or delete on public.media_assets
  for each row execute procedure public.log_enterprise_admin_change();
create trigger partners_audit
  after insert or update or delete on public.partners
  for each row execute procedure public.log_enterprise_admin_change();
create trigger partnerships_audit
  after insert or update or delete on public.partnerships
  for each row execute procedure public.log_enterprise_admin_change();
create trigger service_categories_audit
  after insert or update or delete on public.company_service_categories
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_services_audit
  after insert or update or delete on public.company_services
  for each row execute procedure public.log_enterprise_admin_change();
create trigger service_packages_audit
  after insert or update or delete on public.service_packages
  for each row execute procedure public.log_enterprise_admin_change();
create trigger service_prices_audit
  after insert or update or delete on public.service_prices
  for each row execute procedure public.log_enterprise_admin_change();
create trigger service_options_audit
  after insert or update or delete on public.service_options
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_quote_requests_audit
  after insert or update or delete on public.company_quote_requests
  for each row execute procedure public.log_enterprise_admin_change();
create trigger company_quotes_audit
  after insert or update or delete on public.company_quotes
  for each row execute procedure public.log_enterprise_admin_change();

alter table public.administration_roles enable row level security;
alter table public.administration_permissions enable row level security;
alter table public.administration_role_permissions enable row level security;
alter table public.administration_user_roles enable row level security;
alter table public.company_profile enable row level security;
alter table public.company_history enable row level security;
alter table public.company_values enable row level security;
alter table public.company_objectives enable row level security;
alter table public.company_pillars enable row level security;
alter table public.pillar_projects enable row level security;
alter table public.media_assets enable row level security;
alter table public.pillar_media enable row level security;
alter table public.partner_categories enable row level security;
alter table public.partners enable row level security;
alter table public.partnerships enable row level security;
alter table public.company_service_categories enable row level security;
alter table public.company_services enable row level security;
alter table public.service_packages enable row level security;
alter table public.service_prices enable row level security;
alter table public.service_options enable row level security;
alter table public.company_quote_requests enable row level security;
alter table public.company_quotes enable row level security;

create policy "Administrators read role definitions"
  on public.administration_roles for select to authenticated
  using ((select public.has_admin_permission('admin.roles.read')));
create policy "Super administrators manage role definitions"
  on public.administration_roles for all to authenticated
  using ((select public.has_admin_permission('admin.roles.manage')))
  with check ((select public.has_admin_permission('admin.roles.manage')));
create policy "Administrators read permission definitions"
  on public.administration_permissions for select to authenticated
  using ((select public.has_admin_permission('admin.roles.read')));
create policy "Administrators read role permissions"
  on public.administration_role_permissions for select to authenticated
  using ((select public.has_admin_permission('admin.roles.read')));
create policy "Super administrators manage role permissions"
  on public.administration_role_permissions for all to authenticated
  using ((select public.has_admin_permission('admin.roles.manage')))
  with check ((select public.has_admin_permission('admin.roles.manage')));
create policy "Users read their own administrative roles"
  on public.administration_user_roles for select to authenticated
  using (user_id = (select auth.uid()) or (select public.has_admin_permission('admin.roles.read')));
create policy "Super administrators manage administrative role assignments"
  on public.administration_user_roles for all to authenticated
  using ((select public.has_admin_permission('admin.roles.manage')))
  with check ((select public.has_admin_permission('admin.roles.manage')));

create policy "Published company profile is public"
  on public.company_profile for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp())
    or (select public.has_admin_permission('company.read'))
  );
create policy "Authorized administrators manage company profile"
  on public.company_profile for all to authenticated
  using ((select public.has_admin_permission('company.manage')))
  with check ((select public.has_admin_permission('company.manage')));
create policy "Authorized publishers review company profile"
  on public.company_profile for update to authenticated
  using ((select public.has_admin_permission('company.publish')))
  with check ((select public.has_admin_permission('company.publish')));

create policy "Published company history is public"
  on public.company_history for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp())
    or (select public.has_admin_permission('company.read'))
  );
create policy "Authorized administrators manage company history"
  on public.company_history for all to authenticated
  using ((select public.has_admin_permission('company.manage')))
  with check ((select public.has_admin_permission('company.manage')));
create policy "Authorized publishers review company history"
  on public.company_history for update to authenticated
  using ((select public.has_admin_permission('company.publish')))
  with check ((select public.has_admin_permission('company.publish')));
create policy "Published company values are public"
  on public.company_values for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp())
    or (select public.has_admin_permission('company.read'))
  );
create policy "Authorized administrators manage company values"
  on public.company_values for all to authenticated
  using ((select public.has_admin_permission('company.manage')))
  with check ((select public.has_admin_permission('company.manage')));
create policy "Authorized publishers review company values"
  on public.company_values for update to authenticated
  using ((select public.has_admin_permission('company.publish')))
  with check ((select public.has_admin_permission('company.publish')));
create policy "Published company objectives are public"
  on public.company_objectives for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp())
    or (select public.has_admin_permission('company.read'))
  );
create policy "Authorized administrators manage company objectives"
  on public.company_objectives for all to authenticated
  using ((select public.has_admin_permission('company.manage')))
  with check ((select public.has_admin_permission('company.manage')));
create policy "Authorized publishers review company objectives"
  on public.company_objectives for update to authenticated
  using ((select public.has_admin_permission('company.publish')))
  with check ((select public.has_admin_permission('company.publish')));

create policy "Published pillars are public"
  on public.company_pillars for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp())
    or (select public.has_admin_permission('pillars.read'))
  );
create policy "Authorized administrators manage pillars"
  on public.company_pillars for all to authenticated
  using ((select public.has_admin_permission('pillars.manage')))
  with check ((select public.has_admin_permission('pillars.manage')));
create policy "Authorized publishers review pillars"
  on public.company_pillars for update to authenticated
  using ((select public.has_admin_permission('pillars.publish')))
  with check ((select public.has_admin_permission('pillars.publish')));
create policy "Published pillar projects are public"
  on public.pillar_projects for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp() and exists (
      select 1 from public.company_pillars pillar
      where pillar.id = pillar_id
        and pillar.publication_status = 'published'
        and pillar.published_at <= statement_timestamp()
    ))
    or (select public.has_admin_permission('pillars.read'))
  );
create policy "Authorized administrators manage pillar projects"
  on public.pillar_projects for all to authenticated
  using ((select public.has_admin_permission('pillars.manage')))
  with check ((select public.has_admin_permission('pillars.manage')));
create policy "Authorized publishers review pillar projects"
  on public.pillar_projects for update to authenticated
  using ((select public.has_admin_permission('pillars.publish')))
  with check ((select public.has_admin_permission('pillars.publish')));

create policy "Approved published media metadata is public"
  on public.media_assets for select to anon, authenticated
  using (
    (publication_status = 'published' and visibility = 'public'
      and published_at <= statement_timestamp())
    or (select public.has_admin_permission('media.read'))
  );
create policy "Authorized administrators manage media metadata"
  on public.media_assets for all to authenticated
  using ((select public.has_admin_permission('media.manage')))
  with check ((select public.has_admin_permission('media.manage')));
create policy "Authorized publishers review media metadata"
  on public.media_assets for update to authenticated
  using ((select public.has_admin_permission('media.publish')))
  with check ((select public.has_admin_permission('media.publish')));
create policy "Published pillar media is public"
  on public.pillar_media for select to anon, authenticated
  using (
    exists (
      select 1 from public.company_pillars pillar
      where pillar.id = pillar_id
        and pillar.publication_status = 'published'
        and pillar.published_at <= statement_timestamp()
    )
    and exists (
      select 1 from public.media_assets media
      where media.id = media_asset_id
        and media.publication_status = 'published'
        and media.visibility = 'public'
        and media.published_at <= statement_timestamp()
    )
    or (select public.has_admin_permission('pillars.read'))
  );
create policy "Authorized administrators manage pillar media"
  on public.pillar_media for all to authenticated
  using ((select public.has_admin_permission('pillars.manage')))
  with check ((select public.has_admin_permission('pillars.manage')));

create policy "Published partner categories are public"
  on public.partner_categories for select to anon, authenticated
  using (
    exists (
      select 1 from public.partners partner
      where partner.category_key = public.partner_categories.category_key
        and partner.publication_status = 'published'
        and partner.published_at <= statement_timestamp()
    )
    or (select public.has_admin_permission('partners.read'))
  );
create policy "Authorized administrators manage partner categories"
  on public.partner_categories for all to authenticated
  using ((select public.has_admin_permission('partners.manage')))
  with check ((select public.has_admin_permission('partners.manage')));
create policy "Approved published partners are public"
  on public.partners for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp()
      and relationship_confirmed and brand_use_authorized
      and (logo_asset_id is null or exists (
        select 1 from public.media_assets media
        where media.id = logo_asset_id
          and media.publication_status = 'published'
          and media.visibility = 'public'
          and media.published_at <= statement_timestamp()
      )))
    or (select public.has_admin_permission('partners.read'))
  );
create policy "Authorized administrators manage partners"
  on public.partners for all to authenticated
  using ((select public.has_admin_permission('partners.manage')))
  with check ((select public.has_admin_permission('partners.manage')));
create policy "Authorized publishers review partners"
  on public.partners for update to authenticated
  using ((select public.has_admin_permission('partners.publish')))
  with check ((select public.has_admin_permission('partners.publish')));
create policy "Published partnerships of public partners are public"
  on public.partnerships for select to anon, authenticated
  using (
    (publication_status = 'published' and exists (
      select 1 from public.partners partner
      where partner.id = partner_id
        and partner.publication_status = 'published'
        and partner.published_at <= statement_timestamp()
        and partner.relationship_confirmed
        and partner.brand_use_authorized
    ))
    or (select public.has_admin_permission('partners.read'))
  );
create policy "Authorized administrators manage partnerships"
  on public.partnerships for all to authenticated
  using ((select public.has_admin_permission('partners.manage')))
  with check ((select public.has_admin_permission('partners.manage')));
create policy "Authorized publishers review partnerships"
  on public.partnerships for update to authenticated
  using ((select public.has_admin_permission('partners.publish')))
  with check ((select public.has_admin_permission('partners.publish')));

create policy "Published company service categories are public"
  on public.company_service_categories for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp())
    or (select public.has_admin_permission('services.read'))
  );
create policy "Authorized administrators manage service categories"
  on public.company_service_categories for all to authenticated
  using ((select public.has_admin_permission('services.manage')))
  with check ((select public.has_admin_permission('services.manage')));
create policy "Authorized publishers review service categories"
  on public.company_service_categories for update to authenticated
  using ((select public.has_admin_permission('services.publish')))
  with check ((select public.has_admin_permission('services.publish')));
create policy "Published company services are public"
  on public.company_services for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp() and exists (
      select 1 from public.company_service_categories category
      where category.id = category_id
        and category.publication_status = 'published'
        and category.published_at <= statement_timestamp()
    ))
    or (select public.has_admin_permission('services.read'))
  );
create policy "Authorized administrators manage company services"
  on public.company_services for all to authenticated
  using ((select public.has_admin_permission('services.manage')))
  with check ((select public.has_admin_permission('services.manage')));
create policy "Authorized publishers review company services"
  on public.company_services for update to authenticated
  using ((select public.has_admin_permission('services.publish')))
  with check ((select public.has_admin_permission('services.publish')));
create policy "Published service packages are public"
  on public.service_packages for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp() and exists (
      select 1 from public.company_services service
      join public.company_service_categories category on category.id = service.category_id
      where service.id = service_id
        and service.publication_status = 'published'
        and service.published_at <= statement_timestamp()
        and category.publication_status = 'published'
        and category.published_at <= statement_timestamp()
    ))
    or (select public.has_admin_permission('services.read'))
  );
create policy "Authorized administrators manage service packages"
  on public.service_packages for all to authenticated
  using ((select public.has_admin_permission('services.manage')))
  with check ((select public.has_admin_permission('services.manage')));
create policy "Authorized publishers review service packages"
  on public.service_packages for update to authenticated
  using ((select public.has_admin_permission('services.publish')))
  with check ((select public.has_admin_permission('services.publish')));
create policy "Published service prices are public"
  on public.service_prices for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp()
      and (effective_from is null or effective_from <= current_date)
      and (effective_until is null or effective_until >= current_date)
      and exists (
        select 1 from public.company_services service
        join public.company_service_categories category on category.id = service.category_id
        where service.id = service_id
          and service.publication_status = 'published'
          and service.published_at <= statement_timestamp()
          and category.publication_status = 'published'
          and category.published_at <= statement_timestamp()
      )
      and (package_id is null or exists (
        select 1 from public.service_packages package
        where package.id = package_id
          and package.publication_status = 'published'
          and package.published_at <= statement_timestamp()
      )))
    or (select public.has_admin_permission('services.read'))
    or (select public.has_admin_permission('pricing.read'))
  );
create policy "Authorized administrators manage service prices"
  on public.service_prices for all to authenticated
  using ((select public.has_admin_permission('services.manage')))
  with check ((select public.has_admin_permission('services.manage')));
create policy "Authorized reviewers update service price approval"
  on public.service_prices for update to authenticated
  using (
    (select public.has_admin_permission('services.publish'))
    or (select public.has_admin_permission('pricing.approve'))
  )
  with check (
    (select public.has_admin_permission('services.publish'))
    or (select public.has_admin_permission('pricing.approve'))
  );
create policy "Published service options are public"
  on public.service_options for select to anon, authenticated
  using (
    (publication_status = 'published' and published_at <= statement_timestamp() and exists (
      select 1 from public.company_services service
      join public.company_service_categories category on category.id = service.category_id
      where service.id = service_id
        and service.publication_status = 'published'
        and service.published_at <= statement_timestamp()
        and category.publication_status = 'published'
        and category.published_at <= statement_timestamp()
    ))
    or (select public.has_admin_permission('services.read'))
  );
create policy "Authorized administrators manage service options"
  on public.service_options for all to authenticated
  using ((select public.has_admin_permission('services.manage')))
  with check ((select public.has_admin_permission('services.manage')));
create policy "Authorized publishers review service options"
  on public.service_options for update to authenticated
  using ((select public.has_admin_permission('services.publish')))
  with check ((select public.has_admin_permission('services.publish')));

create policy "Requesters and authorized staff view company quote requests"
  on public.company_quote_requests for select to authenticated
  using (requester_id = (select auth.uid()) or (select public.has_admin_permission('quotes.read')));
create policy "Authenticated users submit company quote requests"
  on public.company_quote_requests for insert to authenticated
  with check (
    requester_id = (select auth.uid())
    and status = 'submitted'
    and exists (
      select 1 from public.company_services service
      where service.id = service_id and service.publication_status = 'published'
    )
    and (
      package_id is null
      or exists (
        select 1 from public.service_packages package
        where package.id = package_id
          and package.service_id = service_id
          and package.publication_status = 'published'
      )
    )
  );
create policy "Authorized staff manage company quote requests"
  on public.company_quote_requests for update to authenticated
  using ((select public.has_admin_permission('quotes.manage')))
  with check ((select public.has_admin_permission('quotes.manage')));
create policy "Requesters and authorized staff view company quotes"
  on public.company_quotes for select to authenticated
  using (
    (select public.has_admin_permission('quotes.read'))
    or exists (
      select 1 from public.company_quote_requests request
      where request.id = request_id and request.requester_id = (select auth.uid())
    )
  );
create policy "Authorized staff manage company quotes"
  on public.company_quotes for all to authenticated
  using ((select public.has_admin_permission('quotes.manage')))
  with check ((select public.has_admin_permission('quotes.manage')));
drop policy if exists "Only platform admins read audit logs" on public.audit_logs;
create policy "Authorized administrators read enterprise audit logs"
  on public.audit_logs for select to authenticated
  using ((select public.has_admin_permission('admin.audit.read')));

insert into public.company_pillars (slug, brand_name, label_fr, sort_order) values
  ('software', 'Software', 'Logiciels et applications', 1),
  ('ai', 'AI', 'Intelligence artificielle et données', 2),
  ('cloud', 'Cloud', 'Cloud et infrastructures', 3),
  ('cyber', 'Cyber', 'Cybersécurité', 4),
  ('academy', 'Academy', 'Formation et compétences', 5),
  ('labs', 'Labs', 'Recherche et innovation', 6),
  ('capital', 'Capital', 'Financement et investissement', 7),
  ('market', 'Market', 'Marketplace', 8),
  ('foundation', 'Foundation', 'Impact et ONG', 9)
on conflict (slug) do nothing;

insert into public.partner_categories (category_key, name) values
  ('institutional', 'Institutionnel'),
  ('technology', 'Technologique'),
  ('commercial', 'Commercial'),
  ('academic', 'Académique'),
  ('strategic', 'Stratégique'),
  ('international', 'International')
on conflict (category_key) do nothing;

grant select, insert, update, delete on public.administration_roles,
  public.administration_permissions, public.administration_role_permissions,
  public.administration_user_roles, public.company_profile, public.company_history,
  public.company_values, public.company_objectives, public.company_pillars,
  public.pillar_projects, public.media_assets, public.pillar_media,
  public.partner_categories, public.partners, public.partnerships,
  public.company_service_categories, public.company_services, public.service_packages,
  public.service_prices, public.service_options, public.company_quote_requests,
  public.company_quotes to authenticated;

grant select on public.company_profile, public.company_history, public.company_values,
  public.company_objectives, public.company_pillars, public.pillar_projects,
  public.media_assets, public.pillar_media, public.partner_categories, public.partners,
  public.partnerships, public.company_service_categories, public.company_services,
  public.service_packages, public.service_prices, public.service_options to anon;
