import {
  CommunityPayload,
  CommunityMemberPayload,
  MinerPayload,
  BankPayload,
  InvestorPayload,
  GovernmentPayload,
  SupplierPayload,
  TransporterPayload,
  DonorPayload,
  InsurancePayload,
} from "@/types/payloads";

/* ----------------------------------------
   Shared Base Fields
---------------------------------------- */
export const baseFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "contact_email", label: "Contact Email", type: "email" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "country", label: "Country", type: "text" },
];

/* ----------------------------------------
   Role‑Specific Fields
---------------------------------------- */
export const roleFields: Record<string, any[]> = {
  community: [
    { name: "community_village", label: "Community Village", type: "text" },
  ],

  community_member: [
    { name: "community_id", label: "Community ID", type: "text" },
  ],

  miner: [
    { name: "miner_license_no", label: "Miner License Number", type: "text" },
  ],

  bank: [
    { name: "bank_registration_no", label: "Bank Registration Number", type: "text" },
  ],

  investor: [
    { name: "investor_fund_name", label: "Investor Fund Name", type: "text" },
  ],

  government: [
    { name: "government_department", label: "Government Department", type: "text" },
  ],

  suppliers: [
    { name: "supplier_category", label: "Supplier Category", type: "text" },
    { name: "supply_scope", label: "Supply Scope", type: "text" },
  ],

  transport: [
    { name: "fleet_size", label: "Fleet Size", type: "text" },
    { name: "transport_zone", label: "Transport Zone", type: "text" },
  ],

  donors: [
    { name: "donation_type", label: "Donation Type", type: "text" },
    { name: "donation_amount", label: "Donation Amount", type: "number" },
  ],

  insurance: [
    { name: "insurance_type", label: "Insurance Type", type: "text" },
    { name: "insurance_license_no", label: "Insurance License Number", type: "text" },
  ],
};

/* ----------------------------------------
   Form Builder Function
---------------------------------------- */
export function buildFormFields(role: string) {
  return [...baseFields, ...(roleFields[role] || [])];
}
