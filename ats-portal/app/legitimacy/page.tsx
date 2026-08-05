"use client";

import { useEffect, useState } from "react";
import { LegitimacyMeter } from "@/components/legitimacy/LegitimacyMeter";
import { LegitimacyScore } from "@/components/legitimacy/LegitimacyScore";
import { LegitimacyTrajectory } from "@/components/legitimacy/LegitimacyTrajectory";
import { LegitimacyArchive } from "@/components/legitimacy/LegitimacyArchive";
import { LegitimacyConsistency } from "@/components/legitimacy/LegitimacyConsistency";
import { LegitimacyTrust } from "@/components/legitimacy/LegitimacyTrust";
import LegitimacyInfluence from "@/components/legitimacy/LegitimacyInfluence";
import { LegitimacyPowerRankings } from "@/components/legitimacy/LegitimacyPowerRankings";
import { LegitimacyTimeline } from "@/components/legitimacy/LegitimacyTimeline";
import { LegitimacyAlignment } from "@/components/legitimacy/LegitimacyAlignment";

type LegitimacyRow = {
  id: string | number;
  progress: number;
  stage: string;
};

export default function LegitimacyPage() {
  const [rows, setRows] = useState<LegitimacyRow[]>([]);

  useEffect(() => {
    async function loadLegitimacy() {
      try {
        const res = await fetch("/api/legitimacy");
        const data = await res.json();
        setRows(data.legitimacy ?? []);
      } catch (error) {
        console.error("Failed to load legitimacy data:", error);
        setRows([]);
      }
    }

    loadLegitimacy();
  }, []);

  return (
    <div className="p-6 flex min-h-screen flex-col gap-8 bg-black text-white">
      <h1 className="aura-title text-3xl font-bold">
        ATS Legitimacy Dashboard
      </h1>

      <LegitimacyScore />
      <LegitimacyTrajectory />
      <LegitimacyConsistency />
      <LegitimacyTrust />
      <LegitimacyInfluence />
      <LegitimacyPowerRankings />
      <LegitimacyTimeline />
      <LegitimacyAlignment />

      <div className="flex flex-col gap-6">
        {rows.map((row) => (
          <LegitimacyMeter
            key={row.id}
            progress={row.progress}
            stage={row.stage}
          />
        ))}
      </div>

      <LegitimacyArchive />
    </div>
  );
}
