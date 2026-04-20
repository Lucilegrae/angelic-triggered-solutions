import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logChartInteraction = (errors, chartType, action) => {
  logAuditTrail(
    supabase.auth.getUser(),
    errors,
    "CHART_INTERACTION",
    {
      chartType,
      action,
      rowCount: errors.length,
      interactedAt: new Date().toISOString()
    }
  );
};
