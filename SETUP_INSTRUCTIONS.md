# Admin Dashboard Setup Instructions

## Step 1: Create Admin User in Supabase

1. Go to your Supabase Dashboard: https://yjzlwdpgfsfasxmavxvt.supabase.co
2. Navigate to **Authentication** → **Users**
3. Click **Add User** and create:
   - Email: `admin@gmail.com`
   - Password: `Admin@123`
4. Copy the user ID that is generated

## Step 2: Run SQL Migrations

Go to **SQL Editor** in Supabase and run this SQL:

```sql
-- Create enum for user roles
create type public.app_role as enum ('admin', 'user');

-- Create vehicles table
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  image_url text not null,
  seats integer not null,
  features jsonb not null default '[]'::jsonb,
  description text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create pricing table
create table public.pricing (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  city_area text not null,
  price_4h numeric(10,2) not null,
  price_8h numeric(10,2) not null,
  price_full_day numeric(10,2) not null,
  price_weekly numeric(10,2) not null,
  price_monthly numeric(10,2) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(vehicle_id, city_area)
);

-- Create bookings table
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  pickup_date timestamptz not null,
  pickup_location text not null,
  dropoff_location text not null,
  vehicle_type text not null,
  passengers integer not null,
  message text,
  status text default 'pending' not null,
  created_at timestamptz default now()
);

-- Create inquiries table
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  status text default 'new' not null,
  created_at timestamptz default now()
);

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz default now(),
  unique(user_id, role)
);

-- Enable RLS on all tables
alter table public.vehicles enable row level security;
alter table public.pricing enable row level security;
alter table public.bookings enable row level security;
alter table public.inquiries enable row level security;
alter table public.user_roles enable row level security;

-- Create security definer function
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- RLS Policies
create policy "Anyone can view vehicles" on public.vehicles for select using (true);
create policy "Admins can insert vehicles" on public.vehicles for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update vehicles" on public.vehicles for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete vehicles" on public.vehicles for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can view pricing" on public.pricing for select using (true);
create policy "Admins can insert pricing" on public.pricing for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update pricing" on public.pricing for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete pricing" on public.pricing for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can create bookings" on public.bookings for insert with check (true);
create policy "Admins can view all bookings" on public.bookings for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update bookings" on public.bookings for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can create inquiries" on public.inquiries for insert with check (true);
create policy "Admins can view all inquiries" on public.inquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update inquiries" on public.inquiries for update to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can insert roles" on public.user_roles for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

-- Insert sample vehicles
insert into public.vehicles (name, type, image_url, seats, features, description) values
  ('Mercedes Sprinter Luxury', 'Luxury Van', '/bus1.png', 14, '["WiFi", "Climate Control", "Leather Seats", "Entertainment System", "USB Charging"]'::jsonb, 'Premium luxury van perfect for corporate events and VIP transportation'),
  ('Toyota Coaster Deluxe', 'Luxury Bus', '/bus2.png', 28, '["WiFi", "Climate Control", "Reclining Seats", "PA System", "Luggage Space"]'::jsonb, 'Spacious luxury bus ideal for group tours and corporate shuttles'),
  ('Range Rover Sport', 'Luxury SUV', '/bus3.png', 7, '["WiFi", "Climate Control", "Leather Seats", "Premium Sound", "Massage Seats"]'::jsonb, 'Premium SUV for executive transportation and private tours');
```

## Step 3: Assign Admin Role

Replace `YOUR_USER_ID` with the user ID from Step 1:

```sql
INSERT INTO public.user_roles (user_id, role) 
VALUES ('YOUR_USER_ID', 'admin');
```

## Access the Dashboard

1. Visit: `/login`
2. Login with: `admin@gmail.com` / `Admin@123`
3. You'll be redirected to `/admin`

## Features

- **Fleet Management**: Add/edit/delete vehicles
- **Pricing Management**: Manage city-wise pricing for each vehicle
- **Bookings**: View and manage customer bookings
- **Inquiries**: Handle customer inquiries
- **Analytics**: View charts and statistics

All data is now dynamic and managed through the admin dashboard!
