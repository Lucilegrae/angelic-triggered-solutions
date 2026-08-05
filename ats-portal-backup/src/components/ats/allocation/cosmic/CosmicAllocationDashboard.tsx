"use client";

import React, { useState } from "react";
import CosmicTimelineRenderer from "./CosmicTimelineRenderer";

export default function CosmicAllocationDashboard() {
  const [result, setResult] = useState(null);
  const [timeline, setTimeline] = useState([]);

  async function runCosmic() {
    const res = await fetch("/api/allocation/run", {
      method: "POST",
      body: JSON.stringify({
        ministryId: "MINISTRY_X",
        sectorId: "SECTOR_Y",
        blockId: "BLOCK_Z",
        capacity: 100,
        pressureIndex: 35,
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

      {result && (
        <div className="p-4 bg-slate-900 border border-purple-500 rounded">
          <p>Allocated Capacity: {result.allocatedCapacity}</p>
          <p>Cosmic Pressure Score: {result.cosmicPressureScore}</p>
          <p>GNSS Orbital Band: {result.gnssOrbitalBand}</p>
        </div>
      )}

      <CosmicTimelineRenderer events={timeline} />
    </div>
  );
}
