import { createClient } from "@/utils/supabase/client";

export async function useSectorResilience() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_resilience");
  if (error) throw error;
  return data;
}
