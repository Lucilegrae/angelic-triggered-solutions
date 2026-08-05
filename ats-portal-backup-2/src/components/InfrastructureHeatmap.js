"use client";

import { useEffect, useRef, useState } from "react";
import { listCommunityDevelopment } from "./supabaseClient";
import Chart from "chart.js/auto";

export default function InfrastructureHeatmap() {
  const canvasRef = useRef(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityDevelopment();
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
            label: "Development Score",
            data: records.map((r) => r.development_score),
            backgroundColor: "rgba(16,185,129,0.7)",
          },
          {
            label: "ATS Intervention Level",
            data: records.map((r) => r.ats_intervention_level),
            backgroundColor: "rgba(139,92,246,0.7)",
          },
        ],
      },
      options: {
        plugins: {
          legend: { labels: { color: "#fff" } },
        },
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff" } },
        },
      },
    });
  }, [records]);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infrastructure Heatmap ✦</h2>
      <canvas ref={canvasRef} height="200"></canvas>
    </div>
  );
}
