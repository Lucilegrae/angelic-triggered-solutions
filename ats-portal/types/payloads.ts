export interface BasePayload {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
}

export interface CommunityPayload extends BasePayload {
  community_village?: string | null;
}

export interface CommunityMemberPayload extends BasePayload {
  community_id?: string | null;
}

export interface MinerPayload extends BasePayload {
  miner_license_no?: string | null;
}

export interface BankPayload extends BasePayload {
  bank_registration_no?: string | null;
}

export interface InvestorPayload extends BasePayload {
  investor_fund_name?: string | null;
}

export interface GovernmentPayload extends BasePayload {
  government_department?: string | null;
}

export interface SupplierPayload extends BasePayload {
  supplier_category?: string | null;
  supply_scope?: string | null;
}

export interface TransporterPayload extends BasePayload {
  fleet_size?: string | null;
  transport_zone?: string | null;
}

export interface DonorPayload extends BasePayload {
  donation_type?: string | null;
  donation_amount?: number | null;
}

export interface InsurancePayload extends BasePayload {
  insurance_type?: string | null;
  insurance_license_no?: string | null;
}

export type RolePayload =
  | CommunityPayload
  | CommunityMemberPayload
  | MinerPayload
  | BankPayload
  | InvestorPayload
  | GovernmentPayload
  | SupplierPayload
  | TransporterPayload
  | DonorPayload
  | InsurancePayload;

export const RolePayloadMap = {
  community: {} as CommunityPayload,
  community_member: {} as CommunityMemberPayload,
  miner: {} as MinerPayload,
  bank: {} as BankPayload,
  investor: {} as InvestorPayload,
  government: {} as GovernmentPayload,
  suppliers: {} as SupplierPayload,
  transport: {} as TransporterPayload,
  donors: {} as DonorPayload,
  insurance: {} as InsurancePayload,
};
