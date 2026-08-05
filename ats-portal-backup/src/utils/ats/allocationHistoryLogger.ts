import { createClient } from "@/utils/supabase/server";

export async function logAllocationHistory(allocation: any[]) {
  const supabase = await createClient();

  const totalMembers = allocation.length;
  const allocatedCount = allocation.filter(a => a.allocated).length;
  const unallocatedCount = totalMembers - allocatedCount;

  const { error } = await supabase
    .from("ats_allocation_history")
    .insert({
      total_members: totalMembers,
      total_units: allocatedCount,
      allocated_count: allocatedCount,
      unallocated_count: unallocatedCount,
      allocation,
      engine_version: "v1.0",
      privilege_model: "ATS Privilege Score Model"
    });

  if (error) {
    console.error("Allocation history logging failed:", error.message);
  }
}
