import type { UUID, Timestamp, Json } from "./core";

export interface StakeholderProfiles {
  id: UUID;
  full_name: string | null;
  crest_affiliation: string | null;
  created_at: Timestamp | null;
}

export interface StakeholderRoles {
  id: UUID;
  stakeholder_name: string;
  role: "government" | "investor" | "miner" | "community" | null;
  created_at: Timestamp | null;
}

export interface AuditTrails {
  id: UUID;
  stakeholder_id: UUID | null;
  action: string;
  commentary: string | null;
  signature: string | null;
  created_at: Timestamp | null;
  status: "affirmed" | "rejected" | null;
}

export interface Audittrail {
  audit_id: UUID;
  stakeholder_id: UUID | null;
  action: string | null;
  timestamp: Timestamp | null;
  details: Json | null;
}

export interface Feedback {
  id: UUID;
  stakeholder_id: UUID | null;
  reflection_text: string | null;
  submitted_at: Timestamp | null;
  certificate_url: string | null;
}
