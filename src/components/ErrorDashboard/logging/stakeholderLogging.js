import { logAuditTrail } from "../LogAuditTrail";
import { supabase } from "../../supabaseClient";

export const logStakeholderExport = (errors, type) => {
  logAuditTrail(supabase.auth.getUser(), errors, "STAKEHOLDER_EXPORT", { type, rowCount: errors.length });
};

export const logStakeholderView = (errors, type) => {
  logAuditTrail(supabase.auth.getUser(), errors, "STAKEHOLDER_REPORT_VIEW", { type, rowCount: errors.length });
};

export const logStakeholderAffirmation = (errors, type) => {
  logAuditTrail(supabase.auth.getUser(), errors, "STAKEHOLDER_REPORT_AFFIRMATION", { type, rowCount: errors.length, affirmedAt: new Date().toISOString() });
};

export const logStakeholderRejection = (errors, type) => {
  logAuditTrail(supabase.auth.getUser(), errors, "STAKEHOLDER_REPORT_REJECTION", { type, rowCount: errors.length, rejectedAt: new Date().toISOString() });
};

export const logStakeholderCommentary = (errors, type, comment) => {
  logAuditTrail(supabase.auth.getUser(), errors, "STAKEHOLDER_REPORT_COMMENTARY", { type, rowCount: errors.length, comment, commentedAt: new Date().toISOString() });
};
