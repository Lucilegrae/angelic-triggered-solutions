import { createClient } from "@/utils/supabase/server";

export async function useWorkflowEscalation() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("ats_workflow_escalation_engine");
  if (error) throw error;
  return data;
}
