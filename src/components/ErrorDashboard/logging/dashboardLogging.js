import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logDashboardLoad = (data, filters) => {
  logAuditTrail(
    supabase.auth.getUser(),
    data || [],
    "DASHBOARD_LOAD",
    { filters }
  );
};
