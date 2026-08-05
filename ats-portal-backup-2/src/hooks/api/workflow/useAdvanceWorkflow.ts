"use client";
import { useApiPost } from "@/hooks/api/client";
import type { AdvanceWorkflowArgs, AdvanceWorkflowReturns } from "@/types/supabase/rpc";

export function useAdvanceWorkflow() {
  return useApiPost<AdvanceWorkflowArgs, AdvanceWorkflowReturns>("/api/workflow/advance");
}
