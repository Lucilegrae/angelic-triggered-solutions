import { createClient } from "@/utils/supabase/client";

export async function useSectorInfluence() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_influence");
  if (error) throw error;
  return data.sectors;
}
