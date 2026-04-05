import { supabase } from "../../supabaseClient";

export async function logAuditTrail(user, errors, action = "EXPORT_CSV", details = {}) {
  const { data, error } = await supabase.from("audit_trail").insert({
    user_id: user.id,
    action,
    target_table: "error_logs",
    details: { rowCount: errors.length, ...details }
  });

  if (error) {
    console.error("Audit trail insert failed:", error);
  } else {
    console.log("Audit trail logged:", data);
  }
}
