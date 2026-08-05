"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabaseClient";
import Chart from "chart.js/auto";

export default function PovertyHeatmap() {
  const canvasRef = useRef(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("poverty_index")
        .select("*")
        .order("poverty_score", { ascending: false });

      setRecords(data || []);
    })();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || records.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: records.map((r) => r.community_name),
        datasets: [
          {
            label: "Poverty Score",
            data: records.map((r) => r.poverty_score),
            backgroundColor: "rgba(239,68,68,0.7)",
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { color: "#fff" } } },
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff" } },
        },
      },
    });
  }, [records]);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Poverty Heatmap ✦</h2>
      <canvas ref={canvasRef} height="200"></canvas>
    </div>
  );
}
