"use client";

import React, { useState } from "react";
import CosmicAllocationCeremony from "./CosmicAllocationCeremony";
import CosmicTimelineRenderer from "../timeline/CosmicTimelineRenderer";

export default function CosmicAllocationDashboard() {
  const [result, setResult] = useState(null);
  const [timeline, setTimeline] = useState([]);

  async function runCosmic() {
    const res = await fetch("/api/allocation/cosmic-run", {
      method: "POST",
      body: JSON.stringify({
        ministryId: "MINISTRY_X",
        sectorId: "SECTOR_Y",
        blockId: "BLOCK_Z",
        capacity: 100,
        pressureIndex: 35,
        gnssOrbitalPhase: 0.7,
        astralPressure: 12,
        temporalLatticeStability: 0.9,
      }),
    });

    const data = await res.json();
    setResult(data);

    setTimeline((prev) => [
      ...prev,
      {
        timestamp: data.timelineAnchor,
        cosmicPressureScore: data.cosmicPressureScore,
        gnssOrbitalBand: data.gnssOrbitalBand,
        allocatedCapacity: data.allocatedCapacity,
      },
    ]);
  }

  return (
    <div className="space-y-6">
      <button
        onClick={runCosmic}
        className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded"
      >
        Run Cosmic Allocation
      </button>

      <CosmicAllocationCeremony result={result} />

      <CosmicTimelineRenderer events={timeline} />
    </div>
  );
}
