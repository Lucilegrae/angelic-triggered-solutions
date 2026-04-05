import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logSessionEnd = (errors, filters) => {
  logAuditTrail(
    supabase.auth.getUser(),
    errors,
    "SESSION_END",
    { filters }
  );
};
