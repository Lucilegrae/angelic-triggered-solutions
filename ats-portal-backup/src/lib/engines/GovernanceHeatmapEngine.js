"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabaseClient";
import Chart from "chart.js/auto";

export default function GovernanceHeatmapEngine() {
  const canvasRef = useRef(null);
  const [ministries, setMinistries] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: mins } = await supabase.from("ministries").select("*");
      setMinistries(mins || []);

      const { data: stakeholders } = await supabase
        .from("stakeholders")
        .select("*");

      const matrix = mins.map((m) => {
        const group = stakeholders.filter((s) => s.ministry_id === m.id);

        return {
          ministry: m.name,
          legitimacy: group.reduce((a, b) => a + (b.legitimacy_score || 0), 0),
          upliftment: group.reduce((a, b) => a + (b.upliftment_score || 0), 0),
          blessings: group.reduce((a, b) => a + (b.blessings_count || 0), 0),
          compliance: group.reduce((a, b) => a + (b.compliance_count || 0), 0),
          mechanisation: group.reduce((a, b) => a + (b.mechanisation_count || 0), 0),
        };
      });

      setHeatmapData(matrix);
    })();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || heatmapData.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    const labels = ["Legitimacy", "Upliftment", "Blessings", "Compliance", "Mechanisation"];

    const datasets = heatmapData.map((row) => ({
      label: row.ministry,
      data: [
        row.legitimacy,
        row.upliftment,
        row.blessings,
        row.compliance,
        row.mechanisation,
      ],
      backgroundColor: (ctx) => {
        const value = ctx.raw;
        const intensity = Math.min(1, value / 100);
        return `rgba(16, 185, 129, ${intensity})`; // emerald gradient
      },
      borderWidth: 1,
      borderColor: "#0f172a",
    }));

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#fff" },
          },
          y: {
            ticks: { color: "#fff" },
          },
        },
      },
    });
  }, [heatmapData]);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Governance Heatmap Engine ✦</h2>
      <p className="text-slate-400 mb-4">
        Ministry activity intensity across all governance arcs.
      </p>

      <canvas ref={canvasRef} height="200"></canvas>
    </div>
  );
}
