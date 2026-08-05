import { createClient } from "@/utils/supabase/server";

export async function useCrossSectorInfluence() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_cross_sector_influence");
  if (error) throw error;
  return data;
}
