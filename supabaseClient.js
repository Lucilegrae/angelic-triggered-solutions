import { createClient } from '@supabase/supabase-js';

// Supabase project reference and anon key
const supabaseUrl = 'https://wtifrlhiyzudgppqswzw.supabase.co';
const supabaseAnonKey = 'sb_publishable_eLu_k-kp9xTcQcM0hTRIwg_trevTugn';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
