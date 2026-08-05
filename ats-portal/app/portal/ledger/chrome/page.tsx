"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Chrome preview card
function ChromeCard({ title, description, gradient }) {
  return (
    <div
      className="p-4 rounded border border-slate-700 text-slate-200"
      style={{
        background: gradient,
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      }}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-slate-300 mt-2">{description}</p>
    </div>
  );
}

export default function LedgerChrome() {
  const [chrome, setChrome] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChrome() {
      const { data, error } = await supabase.rpc("ledger_chrome_enhancer");

      if (error) console.error("Ledger Chrome RPC error:", error);

      setChrome(data || null);
      setLoading(false);
    }

    loadChrome();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Enhancing Ceremonial Chrome…</div>;
  }

  if (!chrome) {
    return <div className="p-6 text-slate-200">No chrome data available.</div>;
  }

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-3xl font-bold mb-6">ATS Ceremonial Chrome Enhancer</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Chrome Layers</h2>
          <p className="text-3xl mt-2">{chrome.layers}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Module Themes</h2>
          <p className="text-3xl mt-2">{chrome.module_themes}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Insignia Variants</h2>
          <p className="text-3xl mt-2">{chrome.insignia_variants}</p>
        </div>

      </div>

      {/* Chrome Previews */}
      <h2 className="text-xl font-bold mb-4">Chrome Previews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chrome.previews.map((p, idx) => (
          <ChromeCard
            key={idx}
            title={p.title}
            description={p.description}
            gradient={p.gradient}
          />
        ))}
      </div>

      {/* Notes */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Chrome Notes</h2>
        <p className="text-slate-400">{chrome.notes}</p>
      </div>

      {/* Back */}
      <a
        href="/portal/ledger"
        className="inline-block text-blue-400 hover:text-blue-300 mt-6"
      >
        Back to Ledger Registry →
      </a>

    </div>
  );
}
