/* -----------------------------------------------------------
   ATS PORTAL — SUPABASE RPC MASTER INDEX
   All RPC argument + return types consolidated in one module.
   ----------------------------------------------------------- */

import type { UUID, Json } from "./core";

/* ===========================================================
   WORKFLOW ENGINE RPCS
   =========================================================== */

export type AdvanceWorkflowArgs = {
  p_workflow_id: UUID;
  p_to_state: string;
  p_note: string;
};
export type AdvanceWorkflowReturns = boolean;

export type AtsHasPermissionArgs = { p_slug: string };
export type AtsHasPermissionReturns = boolean;

export type AtsHasPermissionForScopeArgs = {
  p_slug: string;
  p_ministry_id: UUID;
  p_sector_id: UUID;
};
export type AtsHasPermissionForScopeReturns = boolean;

export type AtsHasCertificateAuthorityArgs = {
  p_level: string;
  p_ministry_id: UUID;
  p_sector_id: UUID;
};
export type AtsHasCertificateAuthorityReturns = boolean;

export type AtsHasWorkflowAuthorityArgs = {
  p_ministry_id: UUID;
  p_sector_id: UUID;
  p_action: string;
};
export type AtsHasWorkflowAuthorityReturns = boolean;

export type CanApproveWorkflowArgs = {
  p_ministry_id: UUID;
  p_sector_id: UUID;
};
export type CanApproveWorkflowReturns = boolean;

export type CanIssueCertificateArgs = {
  p_level: string;
  p_ministry_id: UUID;
  p_sector_id: UUID;
};
export type CanIssueCertificateReturns = boolean;

export type CreateWorkflowArgs = {
  p_ministry_id: UUID;
  p_sector_id: UUID;
  p_title: string;
  p_payload: Json;
};
export type CreateWorkflowReturns = UUID;

export type EmitWorkflowEventArgs = {
  p_event_type: string;
  p_event_payload: Json;
};
export type EmitWorkflowEventReturns = null;

export type AdvanceLegitimacyArgs = { new_stage: string };
export type AdvanceLegitimacyReturns = null;

export type CommissionLegitimacyArgs = { role_name: string };
export type CommissionLegitimacyReturns = null;

export type RunLegitimacyFlowArgs = {};
export type RunLegitimacyFlowReturns = null;

export type SanctifyLegitimacyArgs = { role_name: string };
export type SanctifyLegitimacyReturns = null;

export type CurrentStaffRoleArgs = {};
export type CurrentStaffRoleReturns = string;

/* ===========================================================
   FEDERATION RPCS
   =========================================================== */

export type FederationHeartbeatArgs = { node_id: UUID };
export type FederationHeartbeatReturns = string[];

export type FederationHeartbeatAllArgs = {};
export type FederationHeartbeatAllReturns = null;

export type FederationHeartbeatTimelineArgs = {};
export type FederationHeartbeatTimelineReturns = null;

export type FederationSyncIndexArgs = {};
export type FederationSyncIndexReturns = {
  node_label: string;
  sync_level: number;
  last_sync_at: string;
  is_in_sync: boolean;
  global_sync_index: number;
};

export type FederationVitalityAiArgs = {};
export type FederationVitalityAiReturns = {
  node_label: string;
  vitality_level: number;
  heartbeat_count: number;
  last_heartbeat: string;
  vitality_score: number;
};

export type GetFederationStateArgs = {};
export type GetFederationStateReturns = Json;

export type GetFederationGnssPointsArgs = {};
export type GetFederationGnssPointsReturns = Json;

/* ===========================================================
   COSMIC + ASTRAL RPCS
   =========================================================== */

export type GetAstralFabricArgs = {};
export type GetAstralFabricReturns = {
  id: number;
  node_label: string;
  arc_label: string;
  influence_index: number;
  link_to: string;
  x_pos: number;
  y_pos: number;
}[];

export type GetAstralPressureArgs = {};
export type GetAstralPressureReturns = {
  id: number;
  node_label: string;
  pressure_index: number;
  resonance_index: number;
}[];

export type GetCelestialHarmonicSequencerArgs = {};
export type GetCelestialHarmonicSequencerReturns = {
  id: number;
  sequence_label: string;
  arc_label: string;
  harmonic_index: number;
}[];

export type GetCelestialMapArgs = {};
export type GetCelestialMapReturns = {
  id: number;
  star_label: string;
  constellation_label: string;
  arc_label: string;
}[];

export type GetCommandMatrixArgs = {};
export type GetCommandMatrixReturns = {
  id: number;
  node_label: string;
  engine_label: string;
  priority_level: number;
}[];

export type GetCosmicRiskMatrixArgs = {};
export type GetCosmicRiskMatrixReturns = {
  id: number;
  risk_label: string;
  risk_category: string;
  likelihood: number;
}[];

export type GetCosmicTimelineArgs = {};
export type GetCosmicTimelineReturns = {
  id: number;
  title: string;
  description: string;
  event_type: string;
  date_label: string;
}[];

export type GetDimensionalStabilityArgs = {};
export type GetDimensionalStabilityReturns = Json;

export type GetHyperConvergenceArgs = {};
export type GetHyperConvergenceReturns = {
  id: number;
  convergence_label: string;
  convergence_index: number;
  stability_index: number;
}[];

export type GetOmniKernelArgs = { p_tier?: string | null };
export type GetOmniKernelReturns = {
  id: number;
  kernel_label: string;
  tier: string | null;
  stability_index: number;
}[];

export type GetOmniSentienceArgs = {};
export type GetOmniSentienceReturns = {
  id: number;
  channel_label: string;
  intensity_level: number;
  clarity_index: number;
}[];

export type GetOmniversalPolicyWeaveArgs = {};
export type GetOmniversalPolicyWeaveReturns = {
  id: number;
  policy_label: string;
  weave_label: string;
  arc_label: string;
  alignment_index: number;
}[];

export type GetOracleScenariosArgs = {};
export type GetOracleScenariosReturns = {
  id: number;
  title: string;
  description: string;
  horizon_label: string;
  probability_index: number;
}[];

export type GetParallelTimelinesArgs = {};
export type GetParallelTimelinesReturns = {
  id: number;
  timeline_label: string;
  horizon_label: string;
  summary: string;
  state_label: string;
}[];

export type GetTemporalProbabilityLatticeArgs = {};
export type GetTemporalProbabilityLatticeReturns = {
  id: number;
  lattice_label: string;
  horizon_label: string;
  probability_index: number;
}[];

/* ===========================================================
   PROCUREMENT RPCS
   =========================================================== */

export type GetProcurementRecordArgs = { record_id: UUID };
export type GetProcurementRecordReturns = Json;

export type ListProcurementRecordsArgs = {};
export type ListProcurementRecordsReturns = Json;

export type RetryExportRecordArgs = { record_id: UUID };
export type RetryExportRecordReturns = null;

export type RetryPaymentJobArgs = { job_id: UUID };
export type RetryPaymentJobReturns = null;

export type RejectProcurementRecordArgs = {
  p_document_id: UUID;
  officer: string;
  notes: string;
};
export type RejectProcurementRecordReturns = null;

export type ProcurementGeojsonArgs = {};
export type ProcurementGeojsonReturns = Json;

/* ===========================================================
   COMPLIANCE RPCS
   =========================================================== */

export type ApproveComplianceDocumentArgsA = {
  p_document_id: UUID;
  p_ministry: string;
};
export type ApproveComplianceDocumentArgsB = {
  p_document_id: UUID;
  officer: string;
  notes: string;
};
export type ApproveComplianceDocumentReturns = null;

export type RejectComplianceDocumentArgsA = {
  p_document_id: UUID;
  p_ministry: string;
};
export type RejectComplianceDocumentArgsB = {
  p_document_id: UUID;
  officer: string;
  notes: string;
};
export type RejectComplianceDocumentReturns = null;

export type RegisterComplianceDocumentArgs = {
  stakeholder_id: UUID;
  compliance_type: string;
  description: string;
  pdf_url: string;
  ministry: string;
};
export type RegisterComplianceDocumentReturns = UUID;

export type ListCompliancePdfsArgs = { p_stakeholder: UUID };
export type ListCompliancePdfsReturns = Json;

export type SubmitTaxReprieveApplicationArgs = { p_pdf_id: UUID };
export type SubmitTaxReprieveApplicationReturns = null;

export type ApproveTaxReprieveArgs = {
  p_pdf_id: UUID;
  p_ministry: string;
};
export type ApproveTaxReprieveReturns = null;

export type ListTaxReprievePdfsArgs = { p_pdf_id: UUID };
export type ListTaxReprievePdfsReturns = {
  id: UUID;
  glyph_id: UUID;
  pdf_url: string;
  ministries: string[];
  tags: string[];
}[];

export type UpdateComplianceTimestampArgs = {};
export type UpdateComplianceTimestampReturns = null;

/* ===========================================================
   MINISTRY RPCS
   =========================================================== */

export type OnboardMinistryArgs = {
  institution_name: string;
  stakeholder_name: string;
  stakeholder_email: string;
};
export type OnboardMinistryReturns = UUID;

export type RegisterMinistryArgs = {
  name: string;
  code: string;
  officer_name: string;
  officer_email: string;
  officer_phone: string;
};
export type RegisterMinistryReturns = UUID;

export type GetMinistryProfileArgs = { ministry_id: UUID };
export type GetMinistryProfileReturns = Json;

export type ListMinistriesArgs = {};
export type ListMinistriesReturns = Json;

export type UpdateMinistryStatusArgs = {
  ministry_id: UUID;
  new_status: string;
};
export type UpdateMinistryStatusReturns = null;

export type UpdateMinistryTimestampArgs = {};
export type UpdateMinistryTimestampReturns = null;

/* ===========================================================
   GLYPH + PDF RPCS
   =========================================================== */

export type RegisterGlyphPdfArgs = {
  p_glyph_id: UUID;
  p_pdf_url: string;
};
export type RegisterGlyphPdfReturns = null;

export type ListGlyphPdfsArgs = {};
export type ListGlyphPdfsReturns = {
  id: UUID;
  glyph_id: UUID;
  glyph_title: string;
  pdf_url: string;
  created_at: string;
}[];

export type ListGlyphPdfsByMinistryArgs = { p_ministry: string };
export type ListGlyphPdfsByMinistryReturns = {
  id: UUID;
  glyph_id: UUID;
  glyph_title: string;
  pdf_url: string;
  created_at: string;
}[];

export type ListGlyphPdfsByTagArgs = { p_tag: string };
export type ListGlyphPdfsByTagReturns = {
  id: UUID;
  glyph_id: UUID;
  glyph_title: string;
  pdf_url: string;
  created_at: string;
}[];

export type ListStakeholderPdfsArgs = { p_stakeholder_id: UUID };
export type ListStakeholderPdfsReturns = {
  id: UUID;
  glyph_title: string;
  pdf_url: string;
  created_at: string;
}[];

export type ListExportIntelligenceArgs = {};
export type ListExportIntelligenceReturns = Json;

/* ===========================================================
   MEMBER + STAKEHOLDER RPCS
   =========================================================== */

export type AllocateMemberArgs = {
  m_id: UUID;
  tier: string;
  priority: string;
  u_id: UUID;
  start_date: string;
};
export type AllocateMemberReturns = any;

export type GetMemberProfileArgs = { member_id: UUID };
export type GetMemberProfileReturns = Json;

export type GetMemberAllocationSummaryArgs = {};
export type GetMemberAllocationSummaryReturns = {
  member_id: UUID;
  full_name: string;
  tier: string;
  priority: string;
  unit_code: string;
}[];

export type IncrementMembershipArgs = {};
export type IncrementMembershipReturns = number;

export type SetBranchClaimArgs = {};
export type SetBranchClaimReturns = null;

export type UpdateBlessingsCountArgs = {};
export type UpdateBlessingsCountReturns = null;

export type OnboardCommunalArgs = {
  institution_name: string;
  stakeholder_name: string;
  stakeholder_email: string;
};
export type OnboardCommunalReturns = UUID;

export type OnboardInvestorArgs = {
  institution_name: string;
  stakeholder_name: string;
  stakeholder_email: string;
};
export type OnboardInvestorReturns = UUID;

/* ===========================================================
   PAYMENT RPCS
   =========================================================== */

export type GetPaymentJobArgs = { job_id: UUID };
export type GetPaymentJobReturns = Json;

export type ListPaymentJobsArgs = {};
export type ListPaymentJobsReturns = Json;

export type RetryPaymentJobArgs = { job_id: UUID };
export type RetryPaymentJobReturns = null;

export type GetPaymentProfileArgs = { member_id: UUID };
export type GetPaymentProfileReturns = Json;

export type LedgerReconciliationQueueArgs = {};
export type LedgerReconciliationQueueReturns = {
  id: number;
  job_id: UUID;
  status: string;
  created_at: string;
}[];

export type LedgerReconciliationReportArgs = {};
export type LedgerReconciliationReportReturns = {
  id: number;
  job_id: UUID;
  ledger_status: string;
  reconciled_at: string;
}[];

export type ResolveLedgerReconciliationArgs = {
  reconciliation_id: number;
};
export type ResolveLedgerReconciliationReturns = null;

/* ===========================================================
   TRIGGER RPCS
   =========================================================== */

export type AssignSeverityArgs = {};
export type AssignSeverityReturns = null;

export type AtsLegitimacyEngineArgs = {};
export type AtsLegitimacyEngineReturns = null;

export type AuditLineageLogsArgs = {};
export type AuditLineageLogsReturns = null;

export type GenerateCertificateArgs = {};
export type GenerateCertificateReturns = null;

export type GoldenStarPropagationArgs = {};
export type GoldenStarPropagationReturns = null;

export type HandleCertificateIssueArgs = {};
export type HandleCertificateIssueReturns = null;

export type LogEntityActionArgs = {};
export type LogEntityActionReturns = null;

export type LogFinancingActionArgs = {};
export type LogFinancingActionReturns = null;

export type LogHousingKpiActionArgs = {};
export type LogHousingKpiActionReturns = null;

export type LogLegitimacyAuditArgs = {};
export type LogLegitimacyAuditReturns = null;

export type LogMiningKpiActionArgs = {};
export type LogMiningKpiActionReturns = null;

export type LogProposalActionArgs = {};
export type LogProposalActionReturns = null;

export type RlsAutoEnableArgs = {};
export type RlsAutoEnableReturns = null;

export type RunLegitimacyFlowTriggerArgs = {};
export type RunLegitimacyFlowTriggerReturns = null;

export type SetBranchClaimTriggerArgs = {};
export type SetBranchClaimTriggerReturns = null;

export type SubmitMechanisationRequestArgs = {
  p_stakeholder: UUID;
  p_request_type: string;
  p_description: string;
};
export type SubmitMechanisationRequestReturns = null;

export type UpdateBlessingsCountTriggerArgs = {};
export type UpdateBlessingsCountTriggerReturns = null;

export type UpdateComplianceTimestampTriggerArgs = {};
export type UpdateComplianceTimestampTriggerReturns = null;

export type UpdateLegitimacyOnEnrolArgs = {};
export type UpdateLegitimacyOnEnrolReturns = null;

export type UpdateMechTimestampArgs = {};
export type UpdateMechTimestampReturns = null;

export type UpdateMinistryTimestampTriggerArgs = {};
export type UpdateMinistryTimestampTriggerReturns = null;

export type UpdateTimestampArgs = {};
export type UpdateTimestampReturns = null;

export type UpdateUnitFullStatusArgs = {};
export type UpdateUnitFullStatusReturns = null;

