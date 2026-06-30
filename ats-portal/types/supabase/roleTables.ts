/* ---------------------------------------------------------
   Base Row Type (shared across all role tables)
--------------------------------------------------------- */
export interface BaseRow {
  id: string;
  name: string;
  contact_email: string;
  phone: string | null;
  country: string | null;
  user_id: string;
  created_at: string;
}

/* ---------------------------------------------------------
   Communities
--------------------------------------------------------- */
export interface CommunityRow extends BaseRow {
  community_village: string | null;
}

export interface CommunityInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  community_village?: string | null;
}

/* ---------------------------------------------------------
   Community Members
--------------------------------------------------------- */
export interface CommunityMemberRow extends BaseRow {
  community_id: string | null;
}

export interface CommunityMemberInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  community_id?: string | null;
}

/* ---------------------------------------------------------
   Miners
--------------------------------------------------------- */
export interface MinerRow extends BaseRow {
  miner_license_no: string | null;
}

export interface MinerInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  miner_license_no?: string | null;
}

/* ---------------------------------------------------------
   Banks
--------------------------------------------------------- */
export interface BankRow extends BaseRow {
  bank_registration_no: string | null;
}

export interface BankInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  bank_registration_no?: string | null;
}

/* ---------------------------------------------------------
   Investors
--------------------------------------------------------- */
export interface InvestorRow extends BaseRow {
  investor_fund_name: string | null;
}

export interface InvestorInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  investor_fund_name?: string | null;
}

/* ---------------------------------------------------------
   Government
--------------------------------------------------------- */
export interface GovernmentRow extends BaseRow {
  government_department: string | null;
}

export interface GovernmentInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  government_department?: string | null;
}

/* ---------------------------------------------------------
   Supplier Profiles
--------------------------------------------------------- */
export interface SupplierRow extends BaseRow {
  supplier_category: string | null;
  supply_scope: string | null;
}

export interface SupplierInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  supplier_category?: string | null;
  supply_scope?: string | null;
}

/* ---------------------------------------------------------
   Transporter Profiles
--------------------------------------------------------- */
export interface TransporterRow extends BaseRow {
  fleet_size: string | null;
  transport_zone: string | null;
}

export interface TransporterInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  fleet_size?: string | null;
  transport_zone?: string | null;
}

/* ---------------------------------------------------------
   Donor Profiles
--------------------------------------------------------- */
export interface DonorRow extends BaseRow {
  donation_type: string | null;
  donation_amount: number | null;
}

export interface DonorInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  donation_type?: string | null;
  donation_amount?: number | null;
}

/* ---------------------------------------------------------
   Insurance Profiles
--------------------------------------------------------- */
export interface InsuranceRow extends BaseRow {
  insurance_type: string | null;
  insurance_license_no: string | null;
}

export interface InsuranceInsert {
  name: string;
  contact_email: string;
  phone?: string | null;
  country?: string | null;
  user_id: string;
  insurance_type?: string | null;
  insurance_license_no?: string | null;
}

/* ---------------------------------------------------------
   Role → Table Type Map
--------------------------------------------------------- */
export const RoleTableMap = {
  community: {} as CommunityRow,
  community_member: {} as CommunityMemberRow,
  miner: {} as MinerRow,
  bank: {} as BankRow,
  investor: {} as InvestorRow,
  government: {} as GovernmentRow,
  suppliers: {} as SupplierRow,
  transport: {} as TransporterRow,
  donors: {} as DonorRow,
  insurance: {} as InsuranceRow,
};
