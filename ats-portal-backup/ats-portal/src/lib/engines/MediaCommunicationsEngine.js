"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function MediaCommunicationsEngine() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("media_communications")
        .select("*")
        .order("sentiment", { ascending: true });

      setMedia(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Media & Communications Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {media.map((m) => (
          <div key={m.id} className="pdf-card">
            <h3 className="pdf-title">{m.media_house}</h3>
            <p>Sentiment: {m.sentiment}</p>
            <p>Coverage Focus: {m.coverage_focus}</p>
            <p>Misinformation Alert: {m.misinformation_alert ? "⚠️ Yes" : "✔️ No"}</p>
            <p>ATS Media Team: {m.ats_media_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
