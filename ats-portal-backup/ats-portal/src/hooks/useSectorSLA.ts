import { createClient } from "@/utils/supabase/server";

export async function useSectorSLA() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_sla");
  if (error) throw error;
  return data;
}
