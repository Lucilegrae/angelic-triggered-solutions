"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Drilldown({ params, searchParams }) {
  const { id } = params;
  const type = searchParams.type;

  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      let table = null;

      if (type === "coordinator" || type === "farmer") table = "stakeholders";
      if (type === "institution") table = "institutions";

      const { data: row, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      setData(row);
    }
    load();
  }, [id, type]);

  if (!data) return <div className="p-6 text-slate-200">Loading…</div>;

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {type} Profile
      </h1>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-slate-300">
            {key}: {String(value)}
          </p>
        ))}
      </div>

      <a
        href="/portal/procurement"
        className="text-blue-400 hover:text-blue-300"
      >
        Back →
      </a>
    </div>
  );
}
