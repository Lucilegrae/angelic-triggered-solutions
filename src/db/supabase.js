import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Debug output
console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE SERVICE ROLE KEY:", supabaseKey?.slice(0, 10) + "...");

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
