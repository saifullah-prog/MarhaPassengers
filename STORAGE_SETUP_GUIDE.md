# Supabase Storage Setup for Vehicle Images

Follow these steps to create a storage bucket for vehicle images.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **yjzlwdpgfsfasxmavxvt**
3. Click on **Storage** in the left sidebar
4. Click **New Bucket** button
5. Fill in the form:
   - **Name**: `vehicle-images`
   - **Public bucket**: ✅ (check this box - so images can be viewed without authentication)
6. Click **Create Bucket**

## Step 2: Set Storage Policies

1. Click on the `vehicle-images` bucket you just created
2. Click on **Policies** tab
3. Click **New Policy**

### Policy 1: Public Read Access (Anyone can view images)

Click **Create a new policy from scratch** and use:

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'vehicle-images' );
```

Or use the UI:
- **Policy name**: `Public Access`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'vehicle-images'`

### Policy 2: Authenticated Upload (Admins can upload)

```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'vehicle-images' );
```

Or use the UI:
- **Policy name**: `Authenticated users can upload`
- **Allowed operation**: `INSERT`
- **Target roles**: `authenticated`
- **WITH CHECK expression**: `bucket_id = 'vehicle-images'`

### Policy 3: Authenticated Update (Admins can update)

```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'vehicle-images' );
```

### Policy 4: Authenticated Delete (Admins can delete)

```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'vehicle-images' );
```

## Step 3: Verify Setup

1. Go back to **Storage** → **vehicle-images**
2. You should see the bucket is marked as **Public**
3. Under **Policies**, you should see 4 policies created

## Alternative: Quick SQL Setup

If you prefer, you can run this SQL in the **SQL Editor** to create all policies at once:

```sql
-- Policy for public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'vehicle-images' );

-- Policy for authenticated upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'vehicle-images' );

-- Policy for authenticated update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'vehicle-images' );

-- Policy for authenticated delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'vehicle-images' );
```

## Testing

Once setup is complete:
1. The admin dashboard will be able to upload vehicle images
2. Images will be publicly accessible via URL
3. Only authenticated users (admins) can upload/modify/delete images

---

**Note**: After completing this setup, the Fleet Management image upload feature will work correctly!
