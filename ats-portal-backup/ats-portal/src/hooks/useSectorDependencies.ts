import { createClient } from "@/utils/supabase/server";

export async function useSectorDependencies() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_dependencies");
  if (error) throw error;
  return data;
}
