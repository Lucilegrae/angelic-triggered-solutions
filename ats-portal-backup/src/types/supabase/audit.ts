import type { UUID, Timestamp, Json } from "./core";

export interface ErrorLogs {
  id: UUID;
  message: string;
  stack: string | null;
  component_stack: string | null;
  severity: string | null;
  created_at: Timestamp | null;
}

export interface ErrorSeverityAudit {
  audit_id: UUID;
  error_id: UUID;
  old_severity: string | null;
  new_severity: string | null;
  reason: string | null;
  changed_at: Timestamp | null;
}

export interface AuditArchive {
  id: UUID;
  filename: string;
  filetype: "csv" | "pdf";
  uploaded_at: Timestamp;
  storage_path: string;
}

export interface Logs {
  id: number;
  crest: string;
  action: string;
  timestamp: Timestamp | null;
  details: Json | null;
  stakeholder_id: UUID | null;
  severity: string | null;
}
