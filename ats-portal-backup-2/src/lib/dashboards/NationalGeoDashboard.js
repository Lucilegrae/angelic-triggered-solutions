"use client";

import GeoSpatialEngine from "./GeoSpatialEngine";
import LandGeoMap from "./LandGeoMap";
import InfrastructureHeatmap from "./InfrastructureHeatmap";
import CommunityDevelopmentConstellation from "./CommunityDevelopmentConstellation";
import ConstructionTimelineEngine from "./ConstructionTimelineEngine";

export default function NationalGeoDashboard() {
  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS National Geo‑Dashboard ✦</h2>

      <div className="space-y-12">
        <GeoSpatialEngine />
        <LandGeoMap />
        <InfrastructureHeatmap />
        <CommunityDevelopmentConstellation />
        <ConstructionTimelineEngine />
      </div>
    </div>
  );
}
