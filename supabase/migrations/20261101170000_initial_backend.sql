create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  account_type text not null default 'buyer'
    check (account_type in ('buyer', 'supplier')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 200),
  organization_type text not null
    check (organization_type in ('company', 'public_institution', 'nonprofit', 'independent')),
  country text,
  city text,
  website text,
  description text not null default '',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.supplier_profiles (
  organization_id uuid primary key references public.organizations (id) on delete cascade,
  verification_status text not null default 'pending'
    check (verification_status in ('pending', 'under_review', 'verified', 'rejected')),
  verification_notes text,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.platform_admins (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  role text not null check (role in ('super_admin', 'moderator', 'editor', 'support', 'analyst')),
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete restrict,
  category_id uuid not null references public.categories (id) on delete restrict,
  created_by uuid not null references public.profiles (id) on delete restrict,
  title text not null check (char_length(title) between 5 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  offer_type text not null check (offer_type in ('product', 'service', 'software', 'solution', 'training')),
  summary text not null check (char_length(summary) between 10 and 500),
  description text not null default '',
  currency text check (currency is null or currency ~ '^[A-Z]{3}$'),
  price_min numeric(14, 2) check (price_min is null or price_min >= 0),
  price_max numeric(14, 2) check (price_max is null or price_max >= 0),
  price_unit text,
  status text not null default 'draft'
    check (status in ('draft', 'pending_review', 'published', 'rejected', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (price_min is null or price_max is null or price_min <= price_max)
);

create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete restrict,
  created_by uuid not null references public.profiles (id) on delete restrict,
  category_id uuid references public.categories (id) on delete set null,
  title text not null check (char_length(title) between 5 and 200),
  description text not null check (char_length(description) between 20 and 10000),
  budget_min numeric(14, 2) check (budget_min is null or budget_min >= 0),
  budget_max numeric(14, 2) check (budget_max is null or budget_max >= 0),
  currency text check (currency is null or currency ~ '^[A-Z]{3}$'),
  desired_start_date date,
  desired_end_date date,
  response_deadline timestamptz,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'published', 'closed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (budget_min is null or budget_max is null or budget_min <= budget_max),
  check (desired_start_date is null or desired_end_date is null or desired_start_date <= desired_end_date)
);

create table public.request_supplier_matches (
  request_id uuid not null references public.service_requests (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  status text not null default 'invited'
    check (status in ('invited', 'accepted', 'declined', 'withdrawn')),
  created_at timestamptz not null default now(),
  primary key (request_id, organization_id)
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests (id) on delete cascade,
  supplier_organization_id uuid not null references public.organizations (id) on delete restrict,
  created_by uuid not null references public.profiles (id) on delete restrict,
  amount numeric(14, 2) not null check (amount >= 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  delivery_days integer check (delivery_days is null or delivery_days > 0),
  message text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'accepted', 'rejected', 'withdrawn')),
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (request_id, supplier_organization_id)
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete restrict,
  created_by uuid not null references public.profiles (id) on delete restrict,
  category_id uuid references public.categories (id) on delete set null,
  title text not null check (char_length(title) between 5 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  opportunity_type text not null
    check (opportunity_type in ('tender', 'call_for_projects', 'startup_program', 'collaboration')),
  description text not null check (char_length(description) between 20 and 10000),
  country text,
  budget_min numeric(14, 2) check (budget_min is null or budget_min >= 0),
  budget_max numeric(14, 2) check (budget_max is null or budget_max >= 0),
  currency text check (currency is null or currency ~ '^[A-Z]{3}$'),
  application_deadline timestamptz,
  status text not null default 'draft'
    check (status in ('draft', 'pending_review', 'published', 'closed', 'rejected')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (budget_min is null or budget_max is null or budget_min <= budget_max)
);

create table public.opportunity_applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete restrict,
  created_by uuid not null references public.profiles (id) on delete restrict,
  message text not null check (char_length(message) between 20 and 10000),
  status text not null default 'submitted'
    check (status in ('submitted', 'under_review', 'shortlisted', 'rejected', 'accepted', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (opportunity_id, organization_id)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles (id) on delete restrict,
  title text not null check (char_length(title) between 3 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  content_type text not null
    check (content_type in ('news', 'guide', 'study', 'case_study', 'event', 'publication')),
  summary text not null default '',
  body text not null default '',
  status text not null default 'draft' check (status in ('draft', 'in_review', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  body text not null default '',
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null check (char_length(action) between 1 and 120),
  target_type text not null check (char_length(target_type) between 1 and 80),
  target_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create view public.public_supplier_organizations
with (security_barrier = true)
as
select
  organization.id,
  organization.name,
  organization.country,
  organization.city,
  organization.website,
  organization.description
from public.organizations organization
join public.supplier_profiles supplier
  on supplier.organization_id = organization.id
where organization.is_public
  and supplier.verification_status = 'verified';

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to authenticated;
grant select on public.public_supplier_organizations to anon, authenticated;
revoke update on public.profiles from anon, authenticated;
grant update (first_name, last_name, phone) on public.profiles to authenticated;

create index organization_members_user_idx on public.organization_members (user_id);
create index offers_public_idx on public.offers (category_id, published_at desc) where status = 'published';
create index offers_organization_idx on public.offers (organization_id, updated_at desc);
create index service_requests_owner_idx on public.service_requests (created_by, updated_at desc);
create index request_supplier_matches_org_idx on public.request_supplier_matches (organization_id, request_id);
create index quotes_request_idx on public.quotes (request_id, created_at desc);
create index opportunities_public_idx on public.opportunities (application_deadline) where status = 'published';
create index applications_org_idx on public.opportunity_applications (organization_id, created_at desc);
create index notifications_unread_idx on public.notifications (user_id, created_at desc) where read_at is null;
create index audit_logs_created_idx on public.audit_logs (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.prevent_related_owner_change()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  immutable_key text;
  immutable_keys text[] := array[
    'created_by',
    'organization_id',
    'supplier_organization_id',
    'request_id',
    'opportunity_id'
  ];
  previous_row jsonb := to_jsonb(old);
  next_row jsonb := to_jsonb(new);
begin
  foreach immutable_key in array immutable_keys loop
    if previous_row ? immutable_key
      and previous_row -> immutable_key is distinct from next_row -> immutable_key
    then
      raise exception using
        errcode = '42501',
        message = 'Ownership and participant references cannot be changed.';
    end if;
  end loop;

  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger organizations_set_updated_at
  before update on public.organizations
  for each row execute procedure public.set_updated_at();
create trigger supplier_profiles_set_updated_at
  before update on public.supplier_profiles
  for each row execute procedure public.set_updated_at();
create trigger offers_set_updated_at
  before update on public.offers
  for each row execute procedure public.set_updated_at();
create trigger service_requests_set_updated_at
  before update on public.service_requests
  for each row execute procedure public.set_updated_at();
create trigger quotes_set_updated_at
  before update on public.quotes
  for each row execute procedure public.set_updated_at();
create trigger opportunities_set_updated_at
  before update on public.opportunities
  for each row execute procedure public.set_updated_at();
create trigger opportunity_applications_set_updated_at
  before update on public.opportunity_applications
  for each row execute procedure public.set_updated_at();
create trigger content_items_set_updated_at
  before update on public.content_items
  for each row execute procedure public.set_updated_at();

create trigger offers_prevent_owner_change
  before update on public.offers
  for each row execute procedure public.prevent_related_owner_change();
create trigger service_requests_prevent_owner_change
  before update on public.service_requests
  for each row execute procedure public.prevent_related_owner_change();
create trigger quotes_prevent_participant_change
  before update on public.quotes
  for each row execute procedure public.prevent_related_owner_change();
create trigger opportunities_prevent_owner_change
  before update on public.opportunities
  for each row execute procedure public.prevent_related_owner_change();
create trigger applications_prevent_participant_change
  before update on public.opportunity_applications
  for each row execute procedure public.prevent_related_owner_change();

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.prevent_related_owner_change() from public, anon, authenticated;

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.platform_admins
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.has_platform_role(allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.platform_admins
    where user_id = (select auth.uid())
      and role = any (allowed_roles)
  );
$$;

create or replace function public.is_org_member(target_organization_id uuid, allowed_roles text[] default array['owner', 'admin', 'member'])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = target_organization_id
      and user_id = (select auth.uid())
      and role = any (allowed_roles)
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_kind text := case
    when new.raw_user_meta_data ->> 'account_type' = 'supplier' then 'supplier'
    else 'buyer'
  end;
  organization_kind text := case
    when new.raw_user_meta_data ->> 'organization_type' in ('public_institution', 'nonprofit', 'independent')
      then new.raw_user_meta_data ->> 'organization_type'
    else 'company'
  end;
  new_organization_id uuid;
begin
  insert into public.profiles (id, email, first_name, last_name, account_type)
  values (
    new.id,
    new.email,
    left(coalesce(new.raw_user_meta_data ->> 'first_name', ''), 100),
    left(coalesce(new.raw_user_meta_data ->> 'last_name', ''), 100),
    account_kind
  );

  if nullif(trim(new.raw_user_meta_data ->> 'organization_name'), '') is not null then
    insert into public.organizations (name, organization_type)
    values (
      left(trim(new.raw_user_meta_data ->> 'organization_name'), 200),
      organization_kind
    )
    returning id into new_organization_id;

    insert into public.organization_members (organization_id, user_id, role)
    values (new_organization_id, new.id, 'owner');

    if account_kind = 'supplier' then
      insert into public.supplier_profiles (organization_id)
      values (new_organization_id);
    end if;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

revoke all on function public.handle_new_auth_user() from public, anon, authenticated;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.supplier_profiles enable row level security;
alter table public.platform_admins enable row level security;
alter table public.categories enable row level security;
alter table public.offers enable row level security;
alter table public.service_requests enable row level security;
alter table public.request_supplier_matches enable row level security;
alter table public.quotes enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_applications enable row level security;
alter table public.content_items enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create policy "Profiles are visible to their owner and admins"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_platform_admin()));
create policy "Users update only their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "Organizations are visible to members, verified suppliers, and admins"
  on public.organizations for select to authenticated
  using (
    (select public.is_org_member(id))
    or (is_public and exists (
      select 1 from public.supplier_profiles sp
      where sp.organization_id = id and sp.verification_status = 'verified'
    ))
    or (select public.is_platform_admin())
  );
create policy "Organization owners create organizations"
  on public.organizations for insert to authenticated
  with check (false);
create policy "Organization admins update their organizations"
  on public.organizations for update to authenticated
  using ((select public.is_org_member(id, array['owner', 'admin'])))
  with check ((select public.is_org_member(id, array['owner', 'admin'])));
create policy "Platform admins manage organizations"
  on public.organizations for all to authenticated
  using ((select public.is_platform_admin()))
  with check ((select public.is_platform_admin()));

create policy "Members can view their organization memberships"
  on public.organization_members for select to authenticated
  using (
    user_id = (select auth.uid())
    or (select public.is_org_member(organization_id, array['owner', 'admin']))
    or (select public.is_platform_admin())
  );
create policy "Platform admins manage organization memberships"
  on public.organization_members for all to authenticated
  using ((select public.has_platform_role(array['super_admin'])))
  with check ((select public.has_platform_role(array['super_admin'])));

create policy "Supplier organization members view their verification status"
  on public.supplier_profiles for select to authenticated
  using ((select public.is_org_member(organization_id)) or (select public.is_platform_admin()));
create policy "Platform admins manage supplier verification"
  on public.supplier_profiles for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator'])));

create policy "Users can view their own platform role"
  on public.platform_admins for select to authenticated
  using (user_id = (select auth.uid()) or (select public.has_platform_role(array['super_admin'])));

create policy "Active categories are public"
  on public.categories for select to anon, authenticated
  using (is_active or (select public.is_platform_admin()));
create policy "Platform admins manage categories"
  on public.categories for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator'])));

create policy "Published offers and organization offers are visible"
  on public.offers for select to anon, authenticated
  using (
    status = 'published'
    or (select public.is_org_member(organization_id))
    or (select public.is_platform_admin())
  );
create policy "Supplier members create draft offers"
  on public.offers for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and status in ('draft', 'pending_review')
    and (select public.is_org_member(organization_id, array['owner', 'admin']))
    and exists (
      select 1 from public.supplier_profiles sp
      where sp.organization_id = public.offers.organization_id
    )
  );
create policy "Supplier admins update their non-published offers"
  on public.offers for update to authenticated
  using (
    (select public.is_org_member(organization_id, array['owner', 'admin']))
    and status <> 'published'
  )
  with check (
    (select public.is_org_member(organization_id, array['owner', 'admin']))
    and status in ('draft', 'pending_review', 'rejected', 'archived')
  );
create policy "Platform admins manage offers"
  on public.offers for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator'])));

create policy "Buyers and assigned suppliers can view service requests"
  on public.service_requests for select to authenticated
  using (
    created_by = (select auth.uid())
    or (select public.is_org_member(organization_id))
    or (select public.is_platform_admin())
    or exists (
      select 1
      from public.request_supplier_matches match
      where match.request_id = id
        and match.status in ('invited', 'accepted')
        and (select public.is_org_member(match.organization_id))
    )
  );
create policy "Organization members create their own requests"
  on public.service_requests for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and status in ('draft', 'submitted')
    and (select public.is_org_member(organization_id))
  );
create policy "Request owners update their own requests"
  on public.service_requests for update to authenticated
  using (
    (select public.is_org_member(organization_id, array['owner', 'admin']))
    and status not in ('published', 'closed')
  )
  with check (
    (select public.is_org_member(organization_id, array['owner', 'admin']))
    and status in ('draft', 'submitted', 'cancelled')
  );
create policy "Platform admins manage service requests"
  on public.service_requests for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator', 'support'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator', 'support'])));

create policy "Request participants view supplier matches"
  on public.request_supplier_matches for select to authenticated
  using (
    exists (
      select 1 from public.service_requests request
      where request.id = request_id
        and (request.created_by = (select auth.uid()) or (select public.is_org_member(request.organization_id)))
    )
    or (select public.is_org_member(organization_id))
    or (select public.is_platform_admin())
  );
create policy "Platform admins manage supplier matches"
  on public.request_supplier_matches for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator', 'support'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator', 'support'])));

create policy "Quote participants can view quotes"
  on public.quotes for select to authenticated
  using (
    created_by = (select auth.uid())
    or (select public.is_org_member(supplier_organization_id))
    or exists (
      select 1 from public.service_requests request
      where request.id = request_id
        and (request.created_by = (select auth.uid()) or (select public.is_org_member(request.organization_id)))
    )
    or (select public.is_platform_admin())
  );
create policy "Matched suppliers submit their own quotes"
  on public.quotes for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and status in ('draft', 'submitted')
    and (select public.is_org_member(supplier_organization_id, array['owner', 'admin']))
    and exists (
      select 1 from public.request_supplier_matches match
      where match.request_id = public.quotes.request_id
        and match.organization_id = public.quotes.supplier_organization_id
        and match.status in ('invited', 'accepted')
    )
  );
create policy "Suppliers update their own quotes"
  on public.quotes for update to authenticated
  using (
    (select public.is_org_member(supplier_organization_id, array['owner', 'admin']))
    and status in ('draft', 'submitted')
  )
  with check (
    (select public.is_org_member(supplier_organization_id, array['owner', 'admin']))
    and status in ('draft', 'submitted', 'withdrawn')
  );
create policy "Platform admins manage quotes"
  on public.quotes for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator', 'support'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator', 'support'])));

create policy "Published opportunities are public"
  on public.opportunities for select to anon, authenticated
  using (
    status = 'published'
    or (select public.is_org_member(organization_id))
    or (select public.is_platform_admin())
  );
create policy "Organization admins create draft opportunities"
  on public.opportunities for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and status in ('draft', 'pending_review')
    and (select public.is_org_member(organization_id, array['owner', 'admin']))
  );
create policy "Organization admins update unpublished opportunities"
  on public.opportunities for update to authenticated
  using (
    (select public.is_org_member(organization_id, array['owner', 'admin']))
    and status <> 'published'
  )
  with check (
    (select public.is_org_member(organization_id, array['owner', 'admin']))
    and status in ('draft', 'pending_review', 'closed', 'rejected')
  );
create policy "Platform admins manage opportunities"
  on public.opportunities for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator'])));

create policy "Applicants and opportunity owners view applications"
  on public.opportunity_applications for select to authenticated
  using (
    created_by = (select auth.uid())
    or (select public.is_org_member(organization_id))
    or exists (
      select 1 from public.opportunities opportunity
      where opportunity.id = opportunity_id
        and (select public.is_org_member(opportunity.organization_id, array['owner', 'admin']))
    )
    or (select public.is_platform_admin())
  );
create policy "Organization members apply to published opportunities"
  on public.opportunity_applications for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and status = 'submitted'
    and (select public.is_org_member(organization_id))
    and exists (
      select 1 from public.opportunities opportunity
      where opportunity.id = opportunity_id and opportunity.status = 'published'
    )
  );
create policy "Applicants withdraw their own applications"
  on public.opportunity_applications for update to authenticated
  using (
    created_by = (select auth.uid())
    and status = 'submitted'
  )
  with check (
    created_by = (select auth.uid())
    and status in ('submitted', 'withdrawn')
  );
create policy "Platform admins manage applications"
  on public.opportunity_applications for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator'])))
  with check ((select public.has_platform_role(array['super_admin', 'moderator'])));

create policy "Published content is public"
  on public.content_items for select to anon, authenticated
  using (status = 'published' or (select public.is_platform_admin()));
create policy "Platform admins manage editorial content"
  on public.content_items for all to authenticated
  using ((select public.has_platform_role(array['super_admin', 'editor'])))
  with check ((select public.has_platform_role(array['super_admin', 'editor'])));

create policy "Users view their own notifications"
  on public.notifications for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_platform_admin()));
create policy "Users update their own notifications"
  on public.notifications for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "Only platform admins read audit logs"
  on public.audit_logs for select to authenticated
  using ((select public.has_platform_role(array['super_admin', 'moderator', 'analyst'])));

insert into public.categories (name, slug, description) values
  ('Logiciels et applications', 'logiciels-applications', 'Logiciels métiers, applications et plateformes numériques.'),
  ('Intelligence artificielle et données', 'intelligence-artificielle-donnees', 'Solutions de données, intelligence artificielle et analytique.'),
  ('Cloud et infrastructures', 'cloud-infrastructures', 'Hébergement, connectivité, cloud et infrastructures.'),
  ('Cybersécurité', 'cybersecurite', 'Audit, sécurité informatique et protection des données.'),
  ('Formation et compétences', 'formation-competences', 'Formation professionnelle et développement des compétences numériques.'),
  ('Recherche et innovation', 'recherche-innovation', 'Recherche appliquée et partenariats d’innovation.'),
  ('Financement et investissement', 'financement-investissement', 'Solutions de financement, paiement et investissement.'),
  ('Marketplace', 'marketplace', 'Services et ressources proposés dans la marketplace.'),
  ('Impact et ONG', 'impact-ong', 'Solutions à impact, initiatives citoyennes et organisations non gouvernementales.')
on conflict (slug) do nothing;
