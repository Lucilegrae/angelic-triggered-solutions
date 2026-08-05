"use client";
import { useApiPost } from "@/hooks/api/client";
import type { EmitWorkflowEventArgs, EmitWorkflowEventReturns } from "@/types/supabase/rpc";

export function useEmitWorkflowEvent() {
  return useApiPost<EmitWorkflowEventArgs, EmitWorkflowEventReturns>("/api/workflow/event");
}
