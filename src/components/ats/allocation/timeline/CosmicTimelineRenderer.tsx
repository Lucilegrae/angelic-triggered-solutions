"use client";

import React from "react";

type CosmicTimelineEvent = {
  timestamp: string;
  cosmicPressureScore: number;
  gnssOrbitalBand: string;
  allocatedCapacity: number;
};

export default function CosmicTimelineRenderer({ events }: { events: CosmicTimelineEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="p-4 bg-slate-950 border border-slate-800 rounded text-slate-300">
        No cosmic timeline events available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-950 border border-purple-500/40 rounded shadow-lg shadow-purple-900/40">
      <h2 className="text-lg font-semibold text-purple-300 mb-4">Cosmic Allocation Timeline</h2>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="border-l-2 border-purple-500 pl-4">
            <p className="text-xs text-slate-400">{e.timestamp}</p>
            <p className="text-purple-200 font-semibold">
              Pressure: {e.cosmicPressureScore.toFixed(2)}
            </p>
            <p className="text-cyan-300">GNSS Band: {e.gnssOrbitalBand}</p>
            <p className="text-slate-200">Allocated: {e.allocatedCapacity.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
