"use client";

import React from "react";

type Props = {
  result: {
    allocationId: string;
    allocatedCapacity: number;
    residualCapacity: number;
    cosmicPressureScore: number;
    gnssOrbitalBand: string;
    timelineAnchor: string;
  } | null;
};

export default function CosmicAllocationCeremony({ result }: Props) {
  if (!result) {
    return (
      <div className="rounded border border-slate-800 bg-slate-950 p-4 text-slate-300">
        <p className="text-sm">No cosmic allocation has been performed yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-purple-500/40 bg-slate-950 p-4 text-slate-100 shadow-lg shadow-purple-900/40">
      <h2 className="text-lg font-semibold mb-2">
        Cosmic Allocation Ceremony
      </h2>
      <p className="text-xs text-slate-400 mb-4">
        Allocation ID: {result.allocationId}
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-400">Allocated Capacity</p>
          <p className="text-purple-300 font-semibold">
            {result.allocatedCapacity.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Residual Capacity</p>
          <p className="text-purple-300 font-semibold">
            {result.residualCapacity.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Cosmic Pressure Score</p>
          <p className="text-red-300 font-semibold">
            {result.cosmicPressureScore.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-slate-400">GNSS Orbital Band</p>
          <p className="text-cyan-300 font-semibold">
            {result.gnssOrbitalBand}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Timeline anchor: {result.timelineAnchor}
      </p>
    </div>
  );
}
