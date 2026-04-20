import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logErrorCardInspection = (errors, errorId, action) => {
  logAuditTrail(
    supabase.auth.getUser(),
    errors,
    "ERROR_CARD_INTERACTION",
    {
      errorId,
      action, // e.g. "OPEN", "CLOSE", "DETAIL_VIEW"
      inspectedAt: new Date().toISOString()
    }
  );
};
