import { supabase } from "./supabase";
import * as RPC from "@/types/supabase/rpc";

/* -----------------------------------------------------------
   ATS PORTAL — TYPED SUPABASE RPC CLIENT
   ----------------------------------------------------------- */

type RpcArgs<T> = T extends Record<string, any> ? T : never;
type RpcReturn<T> = T;

/**
 * Generic typed RPC executor
 */
export async function callRpc<
  TArgs extends Record<string, any>,
  TReturn
>(fn: string, args: TArgs): Promise<TReturn> {
  const { data, error } = await supabase.rpc(fn, args);

  if (error) {
    throw new Error(`RPC Error (${fn}): ${error.message}`);
  }

  return data as TReturn;
}

/* -----------------------------------------------------------
   WORKFLOW ENGINE
   ----------------------------------------------------------- */

export const advanceWorkflow = (args: RPC.AdvanceWorkflowArgs) =>
  callRpc<RPC.AdvanceWorkflowArgs, RPC.AdvanceWorkflowReturns>(
    "advance_workflow",
    args
  );

export const createWorkflow = (args: RPC.CreateWorkflowArgs) =>
  callRpc<RPC.CreateWorkflowArgs, RPC.CreateWorkflowReturns>(
    "create_workflow",
    args
  );

export const emitWorkflowEvent = (args: RPC.EmitWorkflowEventArgs) =>
  callRpc<RPC.EmitWorkflowEventArgs, RPC.EmitWorkflowEventReturns>(
    "emit_workflow_event",
    args
  );

/* -----------------------------------------------------------
   FEDERATION
   ----------------------------------------------------------- */

export const federationHeartbeat = (args: RPC.FederationHeartbeatArgs) =>
  callRpc<RPC.FederationHeartbeatArgs, RPC.FederationHeartbeatReturns>(
    "federation_heartbeat",
    args
  );

export const getFederationState = () =>
  callRpc<RPC.GetFederationStateArgs, RPC.GetFederationStateReturns>(
    "get_federation_state",
    {}
  );

/* -----------------------------------------------------------
   COSMIC / ASTRAL
   ----------------------------------------------------------- */

export const getAstralFabric = () =>
  callRpc<RPC.GetAstralFabricArgs, RPC.GetAstralFabricReturns>(
    "get_astral_fabric",
    {}
  );

export const getCosmicTimeline = () =>
  callRpc<RPC.GetCosmicTimelineArgs, RPC.GetCosmicTimelineReturns>(
    "get_cosmic_timeline",
    {}
  );

/* -----------------------------------------------------------
   PROCUREMENT
   ----------------------------------------------------------- */

export const getProcurementRecord = (args: RPC.GetProcurementRecordArgs) =>
  callRpc<RPC.GetProcurementRecordArgs, RPC.GetProcurementRecordReturns>(
    "get_procurement_record",
    args
  );

export const listProcurementRecords = () =>
  callRpc<RPC.ListProcurementRecordsArgs, RPC.ListProcurementRecordsReturns>(
    "list_procurement_records",
    {}
  );

/* -----------------------------------------------------------
   COMPLIANCE
   ----------------------------------------------------------- */

export const registerComplianceDocument = (
  args: RPC.RegisterComplianceDocumentArgs
) =>
  callRpc<
    RPC.RegisterComplianceDocumentArgs,
    RPC.RegisterComplianceDocumentReturns
  >("register_compliance_document", args);

export const approveComplianceDocumentA = (
  args: RPC.ApproveComplianceDocumentArgsA
) =>
  callRpc<
    RPC.ApproveComplianceDocumentArgsA,
    RPC.ApproveComplianceDocumentReturns
  >("approve_compliance_document", args);

/* -----------------------------------------------------------
   MINISTRY
   ----------------------------------------------------------- */

export const getMinistryProfile = (args: RPC.GetMinistryProfileArgs) =>
  callRpc<RPC.GetMinistryProfileArgs, RPC.GetMinistryProfileReturns>(
    "get_ministry_profile",
    args
  );

export const listMinistries = () =>
  callRpc<RPC.ListMinistriesArgs, RPC.ListMinistriesReturns>(
    "list_ministries",
    {}
  );

/* -----------------------------------------------------------
   GLYPH / PDF
   ----------------------------------------------------------- */

export const listGlyphPdfs = () =>
  callRpc<RPC.ListGlyphPdfsArgs, RPC.ListGlyphPdfsReturns>(
    "list_glyph_pdfs",
    {}
  );

export const listGlyphPdfsByMinistry = (
  args: RPC.ListGlyphPdfsByMinistryArgs
) =>
  callRpc<
    RPC.ListGlyphPdfsByMinistryArgs,
    RPC.ListGlyphPdfsByMinistryReturns
  >("list_glyph_pdfs_by_ministry", args);

/* -----------------------------------------------------------
   MEMBER / STAKEHOLDER
   ----------------------------------------------------------- */

export const getMemberProfile = (args: RPC.GetMemberProfileArgs) =>
  callRpc<RPC.GetMemberProfileArgs, RPC.GetMemberProfileReturns>(
    "get_member_profile",
    args
  );

export const allocateMember = (args: RPC.AllocateMemberArgs) =>
  callRpc<RPC.AllocateMemberArgs, RPC.AllocateMemberReturns>(
    "allocate_member",
    args
  );

/* -----------------------------------------------------------
   PAYMENTS
   ----------------------------------------------------------- */

export const getPaymentJob = (args: RPC.GetPaymentJobArgs) =>
  callRpc<RPC.GetPaymentJobArgs, RPC.GetPaymentJobReturns>(
    "get_payment_job",
    args
  );

export const listPaymentJobs = () =>
  callRpc<RPC.ListPaymentJobsArgs, RPC.ListPaymentJobsReturns>(
    "list_payment_jobs",
    {}
  );

