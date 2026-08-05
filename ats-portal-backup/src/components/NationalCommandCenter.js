"use client";

import NationalGeoDashboard from "./NationalGeoDashboard";
import MinisterialIntelligenceDashboard from "./MinisterialIntelligenceDashboard";
import ProvincialIntelligenceDashboard from "./ProvincialIntelligenceDashboard";
import HouseholdIntelligenceEngine from "./HouseholdIntelligenceEngine";
import EmergencyResponseEngine from "./EmergencyResponseEngine";
import PovertyHeatmap from "./PovertyHeatmap";
import FoodSecurityEngine from "./FoodSecurityEngine";
import WaterSanitationEngine from "./WaterSanitationEngine";

export default function NationalCommandCenter() {
  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS National Command Center ✦</h2>

      <div className="space-y-12">
        <NationalGeoDashboard />
        <MinisterialIntelligenceDashboard />
        <ProvincialIntelligenceDashboard />
        <HouseholdIntelligenceEngine />
        <EmergencyResponseEngine />
        <PovertyHeatmap />
        <FoodSecurityEngine />
        <WaterSanitationEngine />
      </div>
    </div>
  );
}
