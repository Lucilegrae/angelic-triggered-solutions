import { createClient } from "@/utils/supabase/client";

export async function useSectorTimeline() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_sector_timeline");
  if (error) throw error;
  return data.timeline;
}
