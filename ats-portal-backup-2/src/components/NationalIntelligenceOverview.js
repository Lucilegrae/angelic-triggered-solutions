"use client";

import { useEffect, useState, useRef } from "react";
import {
  getNationalIntelligenceOverview,
  getNationalTimeSeries,
  getSectorRisk,
  listCommunityUpliftment,
  listLandAllocations,
  listConstructionProjects,
  listCommunityDevelopment
} from "./supabaseClient";
import Chart from "chart.js/auto";

export default function NationalIntelligenceOverview() {
  const [summary, setSummary] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [risk, setRisk] = useState([]);

  const [upliftment, setUpliftment] = useState([]);
  const [land, setLand] = useState([]);
  const [construction, setConstruction] = useState([]);
  const [development, setDevelopment] = useState([]);

  const trendRef = useRef(null);

  useEffect(() => {
    (async () => {
      /* NATIONAL OVERVIEW */
      const { data } = await getNationalIntelligenceOverview();

      const totalLegitimacy = data.reduce(
        (a, b) => a + (b.legitimacy_score || 0),
        0
      );
      const totalUpliftment = data.reduce(
        (a, b) => a + (b.upliftment_score || 0),
        0
      );
      const totalBlessings = data.reduce(
        (a, b) => a + (b.blessings_count || 0),
        0
      );
      const count = data.length;

      const NSI = Math.round(
        (totalLegitimacy * 0.4 +
          totalUpliftment * 0.4 +
          totalBlessings * 0.2) /
          (count || 1)
      );

      setSummary({
        stakeholders: count,
        totalLegitimacy,
        totalUpliftment,
        totalBlessings,
        NSI,
      });

      /* SECTOR BREAKDOWN */
      const map = new Map();
      data.forEach((row) => {
        const key = row.sector || "Unknown";
        const current = map.get(key) || {
          sector: key,
          legitimacy: 0,
          upliftment: 0,
          blessings: 0,
          count: 0,
        };

        current.legitimacy += row.legitimacy_score || 0;
        current.upliftment += row.upliftment_score || 0;
        current.blessings += row.blessings_count || 0;
        current.count += 1;

        map.set(key, current);
      });

      setSectors(Array.from(map.values()));

      /* SECTOR RISK */
      const { data: riskData } = await getSectorRisk();
      const riskMap = new Map();

      riskData.forEach((row) => {
        const key = row.sector || "Unknown";
        const current = riskMap.get(key) || { sector: key, risk: 0, count: 0 };

        const legitimacyRisk = 100 - (row.legitimacy_score || 0);
        const upliftmentRisk = 100 - (row.upliftment_score || 0);
        const blessingsRisk = 50 - (row.blessings_count || 0);

        current.risk += legitimacyRisk + upliftmentRisk + blessingsRisk;
        current.count += 1;

        riskMap.set(key, current);
      });

      setRisk(Array.from(riskMap.values()));

      /* COMMUNITY UPLIFTMENT */
      const uplift = await listCommunityUpliftment();
      setUpliftment(uplift.data || []);

      /* LAND ALLOCATION */
      const landData = await listLandAllocations();
      setLand(landData.data || []);

      /* ATS CONSTRUCTION */
      const cons = await listConstructionProjects();
      setConstruction(cons.data || []);

      /* COMMUNITY DEVELOPMENT */
      const dev = await listCommunityDevelopment();
      setDevelopment(dev.data || []);
    })();
  }, []);

  /* TREND CHARTS */
  useEffect(() => {
    (async () => {
      const { data } = await getNationalTimeSeries();
      if (!data || data.length === 0) return;

      const ctx = trendRef.current.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((d) =>
            new Date(d.timestamp).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Legitimacy",
              data: data.map((d) => d.legitimacy_score),
              borderColor: "#10b981",
              tension: 0.3,
            },
            {
              label: "Upliftment",
              data: data.map((d) => d.upliftment_score),
              borderColor: "#0ea5e9",
              tension: 0.3,
            },
            {
              label: "Blessings",
              data: data.map((d) => d.blessings_count),
              borderColor: "#8b5cf6",
              tension: 0.3,
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
    })();
  }, []);

  if (!summary) {
    return <p className="text-slate-400">Loading national intelligence…</p>;
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">
        ✦ National Intelligence Overview ✦
      </h2>

      <div className="pdf-dashboard-grid">

        {/* NATIONAL SCORE INDEX */}
        <div className="pdf-card">
          <h3 className="pdf-title">National Score Index</h3>
          <p>Stakeholders: {summary.stakeholders}</p>
          <p>Total Legitimacy: {summary.totalLegitimacy}</p>
          <p>Total Upliftment: {summary.totalUpliftment}</p>
          <p>Total Blessings: {summary.totalBlessings}</p>
          <h3 className="pdf-title mt-4">NSI: {summary.NSI}</h3>
        </div>

        {/* TREND CHARTS */}
        <div className="pdf-card">
          <h3 className="pdf-title">Trend Charts Over Time</h3>
          <canvas ref={trendRef} height="200"></canvas>
        </div>

        {/* SECTOR RISK */}
        <div className="pdf-card">
          <h3 className="pdf-title">Sector Risk / Pressure Indicator</h3>
          {risk.map((r) => (
            <div key={r.sector} className="mb-4">
              <p className="text-sm font-semibold">{r.sector}</p>
              <p className="text-xs text-slate-400">
                Risk Score: {Math.round(r.risk / (r.count || 1))}
              </p>
              <div className="w-full bg-slate-800 h-2 rounded mt-1">
                <div
                  className="bg-red-500 h-2 rounded"
                  style={{
                    width:
                      Math.min(
                        100,
                        Math.round(r.risk / (r.count || 1))
                      ) + "%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* SECTOR BREAKDOWN */}
        <div className="pdf-card">
          <h3 className="pdf-title">Sector Breakdown</h3>
          {sectors.map((s) => (
            <div key={s.sector} className="mb-4">
              <p className="text-sm font-semibold">{s.sector}</p>
              <p className="text-xs text-slate-400">
                Stakeholders: {s.count} | Legitimacy: {s.legitimacy} | Upliftment:{" "}
                {s.upliftment} | Blessings: {s.blessings}
              </p>
            </div>
          ))}
        </div>

        {/* COMMUNITY UPLIFTMENT */}
        <div className="pdf-card">
          <h3 className="pdf-title">Community Upliftment</h3>
          <p>Total Communities: {upliftment.length}</p>
        </div>

        {/* LAND ALLOCATION */}
        <div className="pdf-card">
          <h3 className="pdf-title">Land Allocation</h3>
          <p>Total Allocations: {land.length}</p>
        </div>

        {/* ATS CONSTRUCTION */}
        <div className="pdf-card">
          <h3 className="pdf-title">ATS Construction</h3>
          <p>Active Projects: {construction.length}</p>
        </div>

        {/* COMMUNITY DEVELOPMENT */}
        <div className="pdf-card">
          <h3 className="pdf-title">Community Development</h3>
          <p>Development Records: {development.length}</p>
        </div>

      </div>
    </div>
  );
}
