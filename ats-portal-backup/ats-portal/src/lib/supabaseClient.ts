"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* -----------------------------------------------------------
   STAKEHOLDERS
----------------------------------------------------------- */

export async function createStakeholder(payload) {
  const { data, error } = await supabase
    .from("stakeholders")
    .insert(payload)
    .select()
    .single();
  return { data, error };
}

export async function listStakeholders() {
  const { data, error } = await supabase
    .from("stakeholders")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function updateLegitimacyScore(id, score) {
  const { data, error } = await supabase
    .from("stakeholders")
    .update({ legitimacy_score: score, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function updateUpliftmentScore(id, score) {
  const { data, error } = await supabase
    .from("stakeholders")
    .update({
      upliftment_score: score,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function listUpliftmentScores() {
  const { data, error } = await supabase
    .from("stakeholders")
    .select("*")
    .order("upliftment_score", { ascending: false });
  return { data, error };
}

/* -----------------------------------------------------------
   COMPLIANCE
----------------------------------------------------------- */

export async function addComplianceEvent(payload) {
  const { data, error } = await supabase
    .from("stakeholder_compliance")
    .insert(payload)
    .select()
    .single();
  return { data, error };
}

export async function listComplianceEvents(stakeholderId) {
  const { data, error } = await supabase
    .from("stakeholder_compliance")
    .select("*")
    .eq("stakeholder_id", stakeholderId)
    .order("created_at", { ascending: true });
  return { data, error };
}

export async function updateComplianceStatus(id, status) {
  const { data, error } = await supabase
    .from("stakeholder_compliance")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

/* -----------------------------------------------------------
   MECHANISATION
----------------------------------------------------------- */

export async function addMechanisationEvent(payload) {
  const { data, error } = await supabase
    .from("stakeholder_mechanisation")
    .insert(payload)
    .select()
    .single();
  return { data, error };
}

export async function listMechanisationEvents(stakeholderId) {
  const { data, error } = await supabase
    .from("stakeholder_mechanisation")
    .select("*")
    .eq("stakeholder_id", stakeholderId)
    .order("created_at", { ascending: true });
  return { data, error };
}

export async function updateMechanisationStatus(id, status) {
  const { data, error } = await supabase
    .from("stakeholder_mechanisation")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

/* -----------------------------------------------------------
   BLESSINGS
----------------------------------------------------------- */

export async function addBlessing(payload) {
  const { data, error } = await supabase
    .from("stakeholder_blessings")
    .insert(payload)
    .select()
    .single();
  return { data, error };
}

export async function listBlessings(stakeholderId) {
  const { data, error } = await supabase
    .from("stakeholder_blessings")
    .select("*")
    .eq("stakeholder_id", stakeholderId)
    .order("created_at", { ascending: false });
  return { data, error };
}

/* -----------------------------------------------------------
   INSTITUTIONS
----------------------------------------------------------- */

export async function listInstitutions() {
  const { data, error } = await supabase
    .from("institutions")
    .select("*")
    .order("upliftment_score", { ascending: false });
  return { data, error };
}

export async function getInstitutionStakeholders(institutionId) {
  const { data, error } = await supabase
    .from("stakeholders")
    .select("*")
    .eq("institution_id", institutionId);
  return { data, error };
}

/* -----------------------------------------------------------
   SECTOR INTELLIGENCE
----------------------------------------------------------- */

export async function listSectorIntelligence() {
  const { data, error } = await supabase
    .from("stakeholders")
    .select("sector, legitimacy_score, upliftment_score, blessings_count")
    .not("sector", "is", null);
  return { data, error };
}

export async function getNationalIntelligenceOverview() {
  const { data, error } = await supabase
    .from("stakeholders")
    .select("legitimacy_score, upliftment_score, blessings_count, sector");
  return { data, error };
}

export async function getNationalTimeSeries() {
  const { data, error } = await supabase
    .from("stakeholder_history")
    .select("timestamp, legitimacy_score, upliftment_score, blessings_count");
  return { data, error };
}

export async function getSectorRisk() {
  const { data, error } = await supabase
    .from("stakeholders")
    .select("sector, legitimacy_score, upliftment_score, blessings_count");
  return { data, error };
}

/* -----------------------------------------------------------
   COSMIC ALIGNMENT — FINAL SINGLE VERSION
----------------------------------------------------------- */

export async function listStakeholderAlignment() {
  const { data, error } = await supabase
    .from("stakeholder_alignment_view")
    .select("*")
    .order("upliftment_score", { ascending: false });
  return { data, error };
}

/* -----------------------------------------------------------
   COMMUNITY / LAND / CONSTRUCTION / DEVELOPMENT
----------------------------------------------------------- */

export async function listCommunityUpliftment() {
  const { data, error } = await supabase
    .from("community_upliftment")
    .select("*")
    .order("upliftment_index", { ascending: false });
  return { data, error };
}

export async function listLandAllocations() {
  const { data, error } = await supabase
    .from("land_allocations")
    .select("*")
    .order("allocation_date", { ascending: false });
  return { data, error };
}

export async function listConstructionProjects() {
  const { data, error } = await supabase
    .from("construction_projects")
    .select("*")
    .order("progress", { ascending: false });
  return { data, error };
}

export async function listCommunityDevelopment() {
  const { data, error } = await supabase
    .from("community_development")
    .select("*")
    .order("development_score", { ascending: false });
  return { data, error };
}
