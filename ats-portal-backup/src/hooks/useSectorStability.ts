import { createClient } from "@/utils/supabase/client";

export async function useSectorStability() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_stability_index");
  if (error) throw error;
  return data;
}
