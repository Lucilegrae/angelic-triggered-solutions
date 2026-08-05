import { z } from "zod";

/* ----------------------------------------
   Base Schema (shared across all roles)
---------------------------------------- */
export const BasePayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact_email: z.string().email("Valid email required"),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  user_id: z.string().uuid("Invalid user_id"),
});

/* ----------------------------------------
   Community
---------------------------------------- */
export const CommunitySchema = BasePayloadSchema.extend({
  community_village: z.string().optional().nullable(),
});

/* ----------------------------------------
   Community Member
---------------------------------------- */
export const CommunityMemberSchema = BasePayloadSchema.extend({
  community_id: z.string().uuid().optional().nullable(),
});

/* ----------------------------------------
   Miner
---------------------------------------- */
export const MinerSchema = BasePayloadSchema.extend({
  miner_license_no: z.string().optional().nullable(),
});

/* ----------------------------------------
   Bank
---------------------------------------- */
export const BankSchema = BasePayloadSchema.extend({
  bank_registration_no: z.string().optional().nullable(),
});

/* ----------------------------------------
   Investor
---------------------------------------- */
export const InvestorSchema = BasePayloadSchema.extend({
  investor_fund_name: z.string().optional().nullable(),
});

/* ----------------------------------------
   Government
---------------------------------------- */
export const GovernmentSchema = BasePayloadSchema.extend({
  government_department: z.string().optional().nullable(),
});

/* ----------------------------------------
   Supplier
---------------------------------------- */
export const SupplierSchema = BasePayloadSchema.extend({
  supplier_category: z.string().optional().nullable(),
  supply_scope: z.string().optional().nullable(),
});

/* ----------------------------------------
   Transporter
---------------------------------------- */
export const TransporterSchema = BasePayloadSchema.extend({
  fleet_size: z.string().optional().nullable(),
  transport_zone: z.string().optional().nullable(),
});

/* ----------------------------------------
   Donor
---------------------------------------- */
export const DonorSchema = BasePayloadSchema.extend({
  donation_type: z.string().optional().nullable(),
  donation_amount: z.number().optional().nullable(),
});

/* ----------------------------------------
   Insurance
---------------------------------------- */
export const InsuranceSchema = BasePayloadSchema.extend({
  insurance_type: z.string().optional().nullable(),
  insurance_license_no: z.string().optional().nullable(),
});

/* ----------------------------------------
   Role → Schema Map
---------------------------------------- */
export const RoleSchemaMap = {
  community: CommunitySchema,
  community_member: CommunityMemberSchema,
  miner: MinerSchema,
  bank: BankSchema,
  investor: InvestorSchema,
  government: GovernmentSchema,
  suppliers: SupplierSchema,
  transport: TransporterSchema,
  donors: DonorSchema,
  insurance: InsuranceSchema,
};
