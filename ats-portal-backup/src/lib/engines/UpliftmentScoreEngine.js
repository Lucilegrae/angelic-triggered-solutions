"use client";

import { listComplianceEvents, listMechanisationEvents } from "./supabaseClient";

export async function calculateUpliftmentScore(stakeholder) {
  let score = 0;

  // Base legitimacy
  score += stakeholder.legitimacy_score || 0;

  // Sector weighting
  const sectorWeights = {
    agriculture: 20,
    education: 15,
    health: 25,
    finance: 10,
    governance: 30,
    other: 5,
  };
  score += sectorWeights[stakeholder.sector?.toLowerCase()] || 5;

  // Pledge strength
  if (stakeholder.pledge) {
    score += stakeholder.pledge.length > 20 ? 20 : 10;
  }

  // Progress stage
  score += (stakeholder.progress_stage || 0) * 10;

  // Blessings count
  score += (stakeholder.blessings_count || 0) * 5;

  // Compliance events
  const compliance = await listComplianceEvents(stakeholder.id);
  const approvedCompliance = (compliance.data || []).filter(
    (ev) => ev.status === "approved"
  );
  score += approvedCompliance.length * 15;

  // Mechanisation events
  const mech = await listMechanisationEvents(stakeholder.id);
  const approvedMech = (mech.data || []).filter(
    (ev) => ev.status === "approved"
  );
  score += approvedMech.length * 20;

  return score;
}
