import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

/**
 * FRONTEND SUPABASE CLIENT (Browser)
 */
export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * BACKEND SUPABASE CLIENT (Server)
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
