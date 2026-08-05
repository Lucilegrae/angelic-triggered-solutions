import type { UUID, Timestamp, Json } from "./core";

export interface Communities {
  id: UUID;
  name: string;
  population: number | null;
  location: string | null;
  status: "Submitted" | "Under Review" | "Approved" | null;
  created_at: Timestamp | null;
  user_id: UUID | null;
}

export interface Proposals {
  id: UUID;
  community_id: UUID | null;
  title: string;
  description: string | null;
  document_url: string | null;
  status: "Submitted" | "Under Review" | "Approved" | "Rejected" | null;
  submitted_at: Timestamp | null;
}

export interface HousingKPIs {
  id: UUID;
  community_id: UUID | null;
  housing_units_built: number | null;
  roads_constructed: number | null;
  water_reticulation_coverage: number | null;
  updated_at: Timestamp | null;
}

export interface EmergencyIncidents {
  id: UUID;
  incident_type: string | null;
  community_name: string | null;
  severity: string | null;
  status: string | null;
  reported_at: Timestamp | null;
}

export interface CommunityMembers {
  id: UUID;
  name: string;
  email: string | null;
  phone: string | null;
  community_name: string;
  pledge: string | null;
  joined_at: Timestamp | null;
  created_at: Timestamp | null;
  community_id: UUID | null;
  role: string | null;
  status: string | null;
  household_size: number | null;
  national_id: string | null;
  updated_at: Timestamp | null;
  user_id: UUID | null;
}
