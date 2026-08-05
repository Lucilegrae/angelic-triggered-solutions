import { createClient } from "@/utils/supabase/server";

export async function useSectorRecovery() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_recovery_model");
  if (error) throw error;
  return data;
}
