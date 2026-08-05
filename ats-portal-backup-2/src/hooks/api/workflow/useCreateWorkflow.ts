"use client";
import { useApiPost } from "@/hooks/api/client";
import type { CreateWorkflowArgs, CreateWorkflowReturns } from "@/types/supabase/rpc";

export function useCreateWorkflow() {
  return useApiPost<CreateWorkflowArgs, CreateWorkflowReturns>("/api/workflow/create");
}
