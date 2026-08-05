import { createClient } from "@/utils/supabase/client";

export async function useSectorDecay() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_decay_model");
  if (error) throw error;
  return data;
}
