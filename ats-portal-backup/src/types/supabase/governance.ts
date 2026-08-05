import type { UUID, Timestamp } from "./core";

export interface Institutions {
  id: UUID;
  name: string;
  sector:
    | "Banking"
    | "Insurance"
    | "Fund"
    | "Development Finance"
    | "Microfinance"
    | "Telecommunications";
  created_at: Timestamp | null;
}

export interface Stakeholders {
  id: UUID;
  institution_id: UUID | null;
  role: "ministry" | "investor" | "communal" | null;
  name: string;
  email: string | null;
  joined_at: Timestamp | null;
  created_at: Timestamp | null;
  sector:
    | "Government"
    | "Bank"
    | "Insurance"
    | "Mining"
    | "Community"
    | "Funder"
    | "Other"
    | null;
  pledge: string | null;
  progress_stage: number | null;
  blessings_count: number | null;
  updated_at: Timestamp | null;
  legitimacy_score: number | null;
  upliftment_score: number | null;
  compliance_count: number | null;
  mechanisation_count: number | null;
}

export interface Councils {
  id: UUID;
  council_name: string;
  jurisdiction: string | null;
  contact_info: string | null;
  status: string | null;
  created_at: Timestamp | null;
  user_id: UUID | null;
  government_id: UUID | null;
}

export interface Government {
  id: UUID;
  department_name: string;
  jurisdiction: string | null;
  status: string | null;
  created_at: Timestamp | null;
  user_id: UUID | null;
}

export interface Ministries {
  id: UUID;
  name: string;
  description: string | null;
  category: string | null;
  jurisdiction: string | null;
  color: string | null;
  created_at: Timestamp | null;
}
