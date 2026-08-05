import type { UUID, Timestamp, Json } from "./core";

export interface Payments {
  id: UUID;
  user_id: UUID | null;
  channel: string;
  amount: number;
  currency: string | null;
  status: string;
  provider_ref: string | null;
  signed_payload: string | null;
  created_at: Timestamp | null;
}

export interface EcocashRetryQueue {
  id: UUID;
  reference: string;
  amount: number;
  phone: string;
  attempts: number | null;
  max_attempts: number | null;
  status: string | null;
  created_at: Timestamp | null;
  updated_at: Timestamp | null;
}

export interface PaymentEvents {
  id: UUID;
  reference: string;
  channel: string;
  type: string;
  details: Json | null;
  created_at: Timestamp | null;
}

export interface Settlements {
  id: UUID;
  channel: string;
  batch_ref: string;
  total_amount: number;
  payment_count: number;
  created_at: Timestamp | null;
}
