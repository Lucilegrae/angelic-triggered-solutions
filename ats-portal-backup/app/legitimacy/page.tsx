"use client";

import { useEffect, useState } from "react";
import { LegitimacyMeter } from "@/components/legitimacy/LegitimacyMeter";
import { LegitimacyScore } from "@/components/legitimacy/LegitimacyScore";
import { LegitimacyTrajectory } from "@/components/legitimacy/LegitimacyTrajectory";
import { LegitimacyArchive } from "@/components/legitimacy/LegitimacyArchive";
import { LegitimacyConsistency } from "@/components/legitimacy/LegitimacyConsistency";
import { LegitimacyTrust } from "@/components/legitimacy/LegitimacyTrust";
import { LegitimacyInfluence } from "@/components/legitimacy/LegitimacyInfluence";
import { LegitimacyPowerRankings } from "@/components/legitimacy/LegitimacyPowerRankings";
import { LegitimacyTimeline } from "@/components/legitimacy/LegitimacyTimeline";
import { LegitimacyAlignment } from "@/components/legitimacy/LegitimacyAlignment";

export default function LegitimacyPage() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/legitimacy")
      .then((res) => res.json())
      .then((d) => setRows(d.legitimacy || []));
  }, []);

  return (
    <div className="p-6 flex flex-col gap-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold aura-title">ATS Legitimacy Dashboard</h1>

      {/* Legitimacy Score */}
      <LegitimacyScore />

      {/* Legitimacy Prediction */}
      <LegitimacyTrajectory />

      {/* Legitimacy Consistency */}
      <LegitimacyConsistency />

      {/* Legitimacy Trust */}
      <LegitimacyTrust />

      {/* Legitimacy Influence */}
      <LegitimacyInfluence />

      {/* Legitimacy Power Rankings */}
      <LegitimacyPowerRankings />

      {/* Legitimacy Timeline */}
      <LegitimacyTimeline />

      {/* Legitimacy Alignment */}
      <LegitimacyAlignment />

      {/* Legitimacy Rows */}
      <div className="flex flex-col gap-6">
        {rows.map((row) => (
          <LegitimacyMeter
            key={row.id}
            progress={row.progress}
            stage={row.stage}
          />
        ))}
      </div>

      {/* Legitimacy Archive */}
      <LegitimacyArchive />
    </div>
  );
}
