# Supabase Database Setup Guide

Follow these steps carefully to set up your admin dashboard.

## Step 1: Access Your Supabase Project

1. Go to: https://supabase.com/dashboard
2. Login to your account
3. Select your project: **yjzlwdpgfsfasxmavxvt**

---

## Step 2: Create Database Tables

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the following SQL script:

```sql
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT NOT NULL,
  seats INTEGER NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create pricing table
CREATE TABLE public.pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  city_area TEXT NOT NULL,
  price_4h NUMERIC(10,2) NOT NULL,
  price_8h NUMERIC(10,2) NOT NULL,
  price_full_day NUMERIC(10,2) NOT NULL,
  price_weekly NUMERIC(10,2) NOT NULL,
  price_monthly NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vehicle_id, city_area)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_date TIMESTAMPTZ NOT NULL,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  passengers INTEGER NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create inquiries table
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- RLS Policies for vehicles
CREATE POLICY "Anyone can view vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Admins can insert vehicles" ON public.vehicles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update vehicles" ON public.vehicles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete vehicles" ON public.vehicles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for pricing
CREATE POLICY "Anyone can view pricing" ON public.pricing FOR SELECT USING (true);
CREATE POLICY "Admins can insert pricing" ON public.pricing FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pricing" ON public.pricing FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pricing" ON public.pricing FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bookings
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for inquiries
CREATE POLICY "Anyone can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert sample vehicles
INSERT INTO public.vehicles (name, type, image_url, seats, features, description) VALUES
  ('Mercedes Sprinter Luxury', 'Luxury Van', '/bus1.png', 14, '["WiFi", "Climate Control", "Leather Seats", "Entertainment System", "USB Charging"]'::jsonb, 'Premium luxury van perfect for corporate events and VIP transportation'),
  ('Toyota Coaster Deluxe', 'Luxury Bus', '/bus2.png', 28, '["WiFi", "Climate Control", "Reclining Seats", "PA System", "Luggage Space"]'::jsonb, 'Spacious luxury bus ideal for group tours and corporate shuttles'),
  ('Range Rover Sport', 'Luxury SUV', '/bus3.png', 7, '["WiFi", "Climate Control", "Leather Seats", "Premium Sound", "Massage Seats"]'::jsonb, 'Premium SUV for executive transportation and private tours');
```

4. Click **Run** to execute the script
5. You should see a success message

---

## Step 3: Create Admin User

1. In the left sidebar, click on **Authentication**
2. Click on **Users** tab
3. Click **Add User** button (top right)
4. Fill in the form:
   - **Email**: `admin@gmail.com`
   - **Password**: `Admin@123`
   - **Auto Confirm User**: ✅ (check this box)
5. Click **Create User**
6. **IMPORTANT**: Copy the **User ID** (UUID) that appears in the users table - you'll need this for the next step

---

## Step 4: Assign Admin Role

1. Go back to **SQL Editor**
2. Click **New Query**
3. Replace `YOUR_USER_ID_HERE` with the actual User ID you copied in Step 3:

```sql
INSERT INTO public.user_roles (user_id, role) 
VALUES ('YOUR_USER_ID_HERE', 'admin');
```

Example (replace with your actual ID):
```sql
INSERT INTO public.user_roles (user_id, role) 
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');
```

4. Click **Run**

---

## Step 5: Verify Setup

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - ✅ vehicles (with 3 sample vehicles)
   - ✅ pricing
   - ✅ bookings
   - ✅ inquiries
   - ✅ user_roles (with 1 admin user)

---

## Step 6: Test Login

1. In your browser, go to: `http://localhost:5173/login`
2. Login with:
   - **Email**: `admin@gmail.com`
   - **Password**: `Admin@123`
3. You should be redirected to `/admin` dashboard

---

## Troubleshooting

### If you get "Access denied" error:
- Make sure you ran Step 4 (assign admin role)
- Verify the user_id in the SQL matches the user ID from Step 3

### If tables don't appear:
- Check the SQL Editor for any error messages
- Make sure you're in the correct project

### If login fails:
- Verify the user was created in Authentication > Users
- Check that "Auto Confirm User" was enabled
- Try resetting the password in the Supabase dashboard

---

## Next Steps

Once setup is complete, you can:
- ✅ Manage vehicles in the Fleet tab
- ✅ Set pricing for different cities
- ✅ View customer bookings
- ✅ Handle customer inquiries
- ✅ View analytics and statistics
