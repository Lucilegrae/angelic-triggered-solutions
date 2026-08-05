import { createClient } from "@/utils/supabase/server";

export async function useSectorHeatmap() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_heatmap");
  if (error) throw error;
  return data;
}
