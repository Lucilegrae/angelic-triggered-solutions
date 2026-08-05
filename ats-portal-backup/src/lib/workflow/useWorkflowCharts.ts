import { createClient } from "@/utils/supabase/client";

export async function useWorkflowCharts() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_workflow_charts");
  if (error) throw error;
  return data;
}
