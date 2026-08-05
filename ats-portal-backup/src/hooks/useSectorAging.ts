import { createClient } from "@/utils/supabase/client";

export async function useSectorAging() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_aging");
  if (error) throw error;
  return data;
}
