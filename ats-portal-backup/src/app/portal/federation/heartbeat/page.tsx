"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

export default function FederationHeartbeat() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.rpc("federation_heartbeat_timeline");
      setEvents(data || []);
    }
    load();
  }, []);

  async function pulseAll() {
    await supabase.rpc("federation_heartbeat_all");
    const { data } = await supabase.rpc("federation_heartbeat_timeline");
    setEvents(data || []);
  }

  return (
    <CosmicPage>
      <CosmicHeader
        title="Federation Heartbeat Monitor"
        subtitle="Live pulse of ATS Infinity Federation"
      />

      <button
        onClick={pulseAll}
        className="px-4 py-2 bg-pink-600 rounded mb-6 hover:bg-pink-500"
      >
        Pulse Federation
      </button>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded border border-slate-800">
            <p className="text-slate-100 font-semibold">{e.node_label}</p>
            <p className="text-slate-400 text-sm">Heartbeat: {e.heartbeat_time}</p>

            <p className="text-slate-300 mt-2">
              Sync: {e.sync_before} → {e.sync_after}
            </p>
            <p className="text-slate-300">
              Trust: {e.trust_before} → {e.trust_after}
            </p>
            <p className="text-slate-300">
              Health: {e.health_before} → {e.health_after}
            </p>
          </div>
        ))}
      </div>
    </CosmicPage>
  );
}
