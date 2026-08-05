// supabase/functions/getBlessing/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!
);

serve(async () => {
  const { data, error } = await supabase
    .from("blessings")
    .select("text")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ blessing: data[0].text }), {
    headers: { "Content-Type": "application/json" },
  });
});
