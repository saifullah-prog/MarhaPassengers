import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The project URL is not a secret, so we fall back to the known project ref if the
// env var is missing. The anon key must come from the environment.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://yjzlwdpgfsfasxmavxvt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
      '(Vercel → Project Settings → Environment Variables) and redeploy.'
  );
}

// When unconfigured we expose a null client. Consumers guard with `isSupabaseConfigured`
// so the app shows a clear message instead of white-screening. The cast keeps call sites
// type-clean for the configured (normal) case.
export const supabase: SupabaseClient = (
  isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null
) as SupabaseClient;
