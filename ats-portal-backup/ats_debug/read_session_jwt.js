import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error:", error);
    return;
  }

  if (!data.session) {
    console.error("No active session found");
    return;
  }

  const token = data.session.access_token;

  fs.writeFileSync('./ats_debug/jwt.txt', token);

  console.log("JWT saved to ats_debug/jwt.txt");
}

main();
