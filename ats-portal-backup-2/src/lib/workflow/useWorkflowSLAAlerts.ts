import { createClient } from "@/utils/supabase/server";

export async function useWorkflowSLAAlerts() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_workflow_sla_alerts");
  if (error) throw error;
  return data;
}
