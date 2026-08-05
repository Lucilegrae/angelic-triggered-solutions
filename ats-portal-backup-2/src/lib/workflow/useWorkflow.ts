import { createClient } from "@/utils/supabase/server";

export async function useWorkflow() {
  const supabase = createClient();

  return {
    async create(ministryId: string, sectorId: string, title: string, payload: any) {
      const { data, error } = await supabase.rpc("create_workflow", {
        p_ministry_id: ministryId,
        p_sector_id: sectorId,
        p_title: title,
        p_payload: payload,
      });
      if (error) throw error;
      return data as string;
    },

    async advance(workflowId: string, toState: string, note: string) {
      const { data, error } = await supabase.rpc("advance_workflow", {
        p_workflow_id: workflowId,
        p_to_state: toState,
        p_note: note,
      });
      if (error) throw error;
      return data === true;
    },

    async timeline(workflowId: string) {
      const { data, error } = await supabase.rpc("get_workflow_timeline", {
        p_workflow_id: workflowId,
      });
      if (error) throw error;
      return data ?? [];
    },
  };
}
