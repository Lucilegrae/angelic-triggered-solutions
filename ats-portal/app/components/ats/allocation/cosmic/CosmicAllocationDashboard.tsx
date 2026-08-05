"use client";

import React, { useState } from "react";
import CosmicTimelineRenderer from "./CosmicTimelineRenderer";

export default function CosmicAllocationDashboard() {
  const [result, setResult] = useState(null);
  const [timeline, setTimeline] = useState([]);

  async function runCosmic() {
    const res = await fetch("/api/allocation/run", { method: "POST" });

    if (!res.ok) {
      console.error(await res.text());
      return;
    }

    const data = await res.json();
    setResult(data.allocation);

    setTimeline((prev) => [
      ...prev,
      {
        timestamp: new Date().toISOString(),
        ...data.allocation,
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

      <CosmicTimelineRenderer events={timeline} />
    </div>
  );
}
