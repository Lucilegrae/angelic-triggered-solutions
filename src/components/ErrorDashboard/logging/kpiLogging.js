import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../.../supabaseClient";

export const logKPIRefresh = (errors) => {
  logAuditTrail(
    supabase.auth.getUser(),
    errors,
    "KPI_REFRESH",
    {
      rowCount: errors.length,
      refreshedAt: new Date().toISOString()
    }
  );
};
