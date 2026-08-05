import type { UUID, Timestamp, Json } from "./core";

export interface RetrySettings {
  id: number;
  count: number;
  delay: number;
}

export interface LineageTally {
  branch: string;
  total_blessings: number | null;
  last_updated: Timestamp | null;
}

export interface DashboardLinks {
  id: UUID;
  cadence: string;
  chart_url: string;
  created_at: Timestamp | null;
}
