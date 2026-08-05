import type { UUID, Timestamp } from "./core";

export interface ATSRefreshTokens {
  id: UUID;
  user_id: string;
  token: string;
  expires_at: Timestamp;
  created_at: Timestamp | null;
  last_used_at: Timestamp | null;
  reused: boolean | null;
}

export interface ATSDevices {
  id: UUID;
  user_id: string;
  device_id: string;
  device_name: string | null;
  ip_address: string | null;
  user_agent: string | null;
  refresh_token: string | null;
  first_seen_at: Timestamp | null;
  last_seen_at: Timestamp | null;
}

export interface ATSSessions {
  id: UUID;
  user_id: string;
  device_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Timestamp | null;
  last_seen_at: Timestamp | null;
  active: boolean | null;
  risk_score: number | null;
}

export interface UserRoles {
  user_id: UUID;
  role:
    | "board_member"
    | "community_lead"
    | "mining_supervisor"
    | "public"
    | null;
}
