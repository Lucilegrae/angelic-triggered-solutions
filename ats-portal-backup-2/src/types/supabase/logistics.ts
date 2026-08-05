import type { UUID, Timestamp, Json } from "./core";

export interface Logistics {
  id: UUID;
  user_id: UUID;
  stakeholder: string;
  ministry: string | null;
  cargo_type: string | null;
  cargo_weight: number | null;
  route: Json | null;
  payload: Json | null;
  created_at: Timestamp | null;
}

export interface WorkflowEvents {
  id: UUID;
  user_id: UUID;
  stakeholder: string;
  ministry: string | null;
  event_type: string;
  event_payload: Json | null;
  created_at: Timestamp | null;
  ministry_id: UUID | null;
}
