-- Dubai Luxe Ride: Supabase schema + RLS policies.
-- Note: storage.objects policies may require Storage UI or elevated role.

create extension if not exists pgcrypto;

-- Admin roles
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Helper to avoid policy recursion
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.user_roles enable row level security;

create policy "Admins can read roles"
on public.user_roles
for select
using (public.is_admin());

create policy "Admins can manage roles"
on public.user_roles
for all
using (public.is_admin())
with check (public.is_admin());

-- Vehicles
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  image_url text not null,
  seats integer not null check (seats > 0),
  features text[] not null default '{}'::text[],
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

create policy "Public read vehicles"
on public.vehicles
for select
using (true);

create policy "Admins manage vehicles"
on public.vehicles
for all
using (public.is_admin())
with check (public.is_admin());

-- Pricing
create table if not exists public.pricing (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  city_area text not null,
  price_4h numeric not null check (price_4h >= 0),
  price_8h numeric not null check (price_8h >= 0),
  price_full_day numeric not null check (price_full_day >= 0),
  price_weekly numeric not null check (price_weekly >= 0),
  price_monthly numeric not null check (price_monthly >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pricing enable row level security;

create policy "Public read pricing"
on public.pricing
for select
using (true);

create policy "Admins manage pricing"
on public.pricing
for all
using (public.is_admin())
with check (public.is_admin());

-- Bookings
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  pickup_date date not null,
  pickup_location text not null,
  dropoff_location text not null,
  vehicle_type text not null,
  passengers integer not null check (passengers > 0),
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Public insert bookings"
on public.bookings
for insert
to anon, authenticated
with check (true);

create policy "Admins manage bookings"
on public.bookings
for all
using (public.is_admin())
with check (public.is_admin());

-- Inquiries
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'resolved')),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "Public insert inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

create policy "Admins manage inquiries"
on public.inquiries
for all
using (public.is_admin())
with check (public.is_admin());

-- Storage (vehicle-images bucket + policies)
-- These statements may require Storage UI or elevated role to apply.
insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do nothing;

alter table storage.objects enable row level security;

create policy "Public read vehicle images"
on storage.objects
for select
using (bucket_id = 'vehicle-images');

create policy "Admins manage vehicle images"
on storage.objects
for all
using (
  bucket_id = 'vehicle-images'
  and public.is_admin()
)
with check (
  bucket_id = 'vehicle-images'
  and public.is_admin()
);
