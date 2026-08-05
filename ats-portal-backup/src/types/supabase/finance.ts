import type { UUID, Timestamp, Json } from "./core";

export interface Financing {
  id: number;
  stakeholder_id: UUID | null;
  bank_name: string;
  funding_request_id: number | null;
  status: string | null;
  amount: number;
  created_at: Timestamp | null;
  interest_rate: number | null;
}

export interface FundingRequests {
  id: number;
  stakeholder_id: UUID | null;
  miner_name: string;
  license_number: string;
  amount_requested: number;
  purpose: string | null;
  insurance_policy_id: number | null;
  status: string | null;
  created_at: Timestamp | null;
}

export interface InsurancePolicies {
  id: number;
  stakeholder_id: UUID | null;
  coverage_type: string;
  premium_amount: number;
  status: string | null;
  created_at: Timestamp | null;
}

export interface LandTransactions {
  id: number;
  stakeholder_id: UUID | null;
  source_type: string;
  transaction_type: string;
  location: string;
  size: number | null;
  value: number | null;
  created_at: Timestamp | null;
}

export interface Investments {
  id: UUID;
  user_id: UUID;
  stakeholder: string;
  investment_type: string | null;
  amount: number | null;
  payload: Json | null;
  created_at: Timestamp | null;
}

export interface Donations {
  id: UUID;
  user_id: UUID;
  stakeholder: string;
  donation_type: string | null;
  amount: number | null;
  payload: Json | null;
  created_at: Timestamp | null;
}
