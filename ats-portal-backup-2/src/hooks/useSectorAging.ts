import { createClient } from "@/utils/supabase/server";

export async function useSectorAging() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_aging");
  if (error) throw error;
  return data;
}
