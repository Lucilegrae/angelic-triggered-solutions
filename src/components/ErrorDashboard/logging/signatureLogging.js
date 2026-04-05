import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logStakeholderSignature = (errors, type, signer) => {
  logAuditTrail(
    supabase.auth.getUser(),
    errors,
    "STAKEHOLDER_REPORT_SIGNATURE",
    {
      type,
      rowCount: errors.length,
      signer: signer,
      signedAt: new Date().toISOString()
    }
  );
};
