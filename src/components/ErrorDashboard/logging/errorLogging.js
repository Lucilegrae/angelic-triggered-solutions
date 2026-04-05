import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logErrorCreated = (payload) => {
  logAuditTrail(
    supabase.auth.getUser(),
    [payload.new],
    "ERROR_CREATED",
    {
      errorId: payload.new.id,
      message: payload.new.message,
      severity: payload.new.severity,
      component: payload.new.component_stack
    }
  );
};

export const logErrorResolved = (payload) => {
  if (payload.new.resolved === true) {
    logAuditTrail(
      supabase.auth.getUser(),
      [payload.new],
      "ERROR_RESOLVED",
      {
        errorId: payload.new.id,
        message: payload.new.message,
        severity: payload.new.severity,
        resolvedAt: new Date().toISOString()
      }
    );
  }
};
