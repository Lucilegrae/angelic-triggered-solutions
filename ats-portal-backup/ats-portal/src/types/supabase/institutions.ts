import type { UUID, Timestamp } from "./core";

export interface Approvals {
  id: UUID;
  stakeholder_id: UUID | null;
  initiative_id: UUID | null;
  signature_url: string | null;
  status: string | null;
  approved_at: Timestamp | null;
  created_at: Timestamp | null;
  sector: string | null;
  vendor_status: string | null;
  joined_at: Timestamp | null;
}

export interface Initiatives {
  id: UUID;
  pillar: string;
  description: string | null;
  file_url: string | null;
  created_at: Timestamp | null;
}
