import type { UUID, Timestamp, Json } from "./core";

export interface Certificates {
  id: UUID;
  title: string;
  text: string;
  issued_to: string | null;
  issued_at: Timestamp | null;
  user_id: UUID | null;
  ministry: string | null;
  revoked: boolean | null;
  revocation_reason: string | null;
  revocation_timestamp: Timestamp | null;
  revocation_authority: string | null;
  reissued: boolean | null;
  reissued_from: string | null;
  reissued_timestamp: Timestamp | null;
  reissued_authority: string | null;
  forged: boolean | null;
  forgery_score: number | null;
  forgery_reason: string | null;
  forgery_timestamp: Timestamp | null;
  forgery_detected_by: string | null;
}

export interface Certifications {
  id: number;
  stakeholder_id: UUID | null;
  crest_affiliation: string;
  certificate_number: string;
  issued_at: Timestamp | null;
  valid_until: Timestamp | null;
  status: string | null;
  metadata: Json | null;
  lineage_log: Json | null;
}

export interface Blessings {
  id: UUID;
  text: string;
  created_at: Timestamp | null;
}

export interface BlessingAudit {
  id: number;
  blessing_id: UUID | null;
  session_id: UUID | null;
  started_at: Timestamp | null;
}

export interface LineageLogs {
  id: UUID;
  member_id: UUID;
  blessing: string;
  branch: "Banking" | "Veterans" | "Cement" | "Steel" | "Government" | null;
  created_at: Timestamp | null;
}

export interface LineageAudit {
  id: number;
  job_name: string | null;
  action: string | null;
  branch: string | null;
  run_at: Timestamp | null;
}

export interface CovenantLedger {
  id: number;
  run_timestamp: Timestamp;
  certificates_generated: number;
  sanctifier: string | null;
}
