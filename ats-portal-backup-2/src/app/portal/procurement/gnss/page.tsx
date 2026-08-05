"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function GNSSCapturePage() {
  const [recordId, setRecordId] = useState("");
  const [status, setStatus] = useState("");

  async function capture() {
    if (!recordId) {
      setStatus("Provide agriculture_production record ID.");
      return;
    }

    setStatus("Capturing GNSS…");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const gnss = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: new Date().toISOString(),
        };

        const { error } = await supabase
          .from("agriculture_production")
          .update({ gnss })
          .eq("id", recordId);

        if (error) {
          console.error(error);
          setStatus("Error saving GNSS.");
        } else {
          setStatus("GNSS saved.");
        }
      },
      () => setStatus("Failed to get GNSS position.")
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">GNSS Capture</h1>

      <input
        className="w-full mb-3 px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200"
        placeholder="agriculture_production record UUID"
        value={recordId}
        onChange={(e) => setRecordId(e.target.value)}
      />

      <button
        onClick={capture}
        className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        Capture GNSS
      </button>

      <p className="text-slate-400 mt-3">{status}</p>
    </div>
  );
}
