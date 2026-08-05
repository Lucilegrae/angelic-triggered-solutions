"use client";

export function calculateLegitimacyScore(stakeholder) {
  let score = 0;

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

  // Pledge weighting
  if (stakeholder.pledge) {
    score += stakeholder.pledge.length > 20 ? 20 : 10;
  }

  // Progress stage weighting
  score += stakeholder.progress_stage * 10;

  // Blessings count weighting
  score += stakeholder.blessings_count * 5;

  // Institution alignment
  if (stakeholder.institution_id) {
    score += 15;
  }

  return score;
}
