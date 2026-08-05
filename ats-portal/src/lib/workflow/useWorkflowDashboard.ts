import { createClient } from "@/utils/supabase/client";

export async function useWorkflowDashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("ats_workflow_dashboard");
  if (error) throw error;

  return data;
}
