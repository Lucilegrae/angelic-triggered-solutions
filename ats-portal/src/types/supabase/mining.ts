import type { UUID, Timestamp, Json } from "./core";

export interface MiningStakeholders {
  id: UUID;
  name: string;
  type: "artisanal" | "small_scale" | null;
  location: string | null;
  registered_on: Timestamp | null;
  created_by: UUID | null;
}

export interface ResourceAllocations {
  id: UUID;
  stakeholder_id: UUID | null;
  resource_type: string;
  quantity: number | null;
  allocation_date: Timestamp | null;
  allocated_by: UUID | null;
}

export interface ProductionRecords {
  id: UUID;
  stakeholder_id: UUID | null;
  commodity: string;
  volume: number;
  unit: string | null;
  recorded_on: Timestamp | null;
  recorded_by: UUID | null;
}

export interface FinancingLinks {
  id: UUID;
  stakeholder_id: UUID | null;
  bank_id: UUID | null;
  facility_type: string | null;
  amount: number | null;
  approved_on: Timestamp | null;
  approved_by: UUID | null;
}

export interface MiningKPIs {
  id: UUID;
  miner_id: UUID | null;
  loans_disbursed: number | null;
  equipment_financed: string | null;
  repayment_rate: number | null;
  jobs_created: number | null;
  updated_at: Timestamp | null;
}

export interface Miners {
  id: UUID;
  name: string;
  community_id: UUID | null;
  mining_type: string | null;
  capacity: number | null;
  location: string | null;
  registered_at: Timestamp | null;
  community_member_id: UUID | null;
  role: string | null;
  workforce_id: string | null;
  pledge: string | null;
  joined_at: Timestamp | null;
  status: string | null;
  user_id: UUID | null;
  created_at: Timestamp | null;
  government_id: UUID | null;
}
