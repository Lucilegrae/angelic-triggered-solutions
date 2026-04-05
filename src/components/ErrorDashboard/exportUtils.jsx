import { supabase } from "../../supabaseClient";

export async function logAuditTrail(user, errors) {
  const { data, error } = await supabase.from("audit_trail").insert({
    user_id: user.id,              // Supabase auth user ID
    action: "EXPORT_CSV",          // Action type
    target_table: "error_logs",    // Target table
    details: { rowCount: errors.length } // Extra metadata
  });

  if (error) {
    console.error("Audit trail insert failed:", error);
  } else {
    console.log("Audit trail logged:", data);
  }
}
