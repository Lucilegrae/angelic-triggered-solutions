import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function getJwt() {
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: "debug@example.com"
  });

  if (error) throw error;
  return data;
}
