import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AuditExport from "./AuditExport";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./../theme.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AuditTrailTab() {
  const [logs, setLogs] = useState([]);
  const [trendData, setTrendData] = useState({ labels: [], datasets: [] });
  const [view, setView] = useState("monthly"); // daily, weekly, monthly
  const [stakeholders, setStakeholders] = useState(""); // comma-separated IDs

  useEffect(() => {
    async function loadLogs() {
      let query = supabase
        .from("audit_trail")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(1000);

      const { data, error } = await query;
      if (!error) {
        setLogs(data);
        buildTrend(data, view, stakeholders);
      }
    }
    loadLogs();
  }, [view, stakeholders]);

  function buildTrend(data, mode, stakeholderFilter) {
    const ids = stakeholderFilter
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id);

    const grouped = {};

    data.forEach((log) => {
      if (ids.length > 0 && !ids.includes(String(log.stakeholder_id))) return;

      const date = new Date(log.timestamp);
      let key;
      if (mode === "daily") {
        key = date.toISOString().slice(0, 10);
      } else if (mode === "weekly") {
        const year = date.getFullYear();
        const week = Math.ceil(((date - new Date(year, 0, 1)) / 86400000 + date.getDay() + 1) / 7);
        key = `${year}-W${week}`;
      } else {
        key = date.toISOString().slice(0, 7);
      }

      if (!grouped[key]) grouped[key] = {};
      const sid = log.stakeholder_id || "Unknown";
      grouped[key][sid] = (grouped[key][sid] || 0) + 1;
    });

    const labels = Object.keys(grouped).sort();
    const stakeholderIds = ids.length > 0 ? ids : Array.from(new Set(data.map((log) => log.stakeholder_id)));

    const datasets = stakeholderIds.map((sid, idx) => ({
      label: `Stakeholder ${sid}`,
      data: labels.map((l) => grouped[l][sid] || 0),
      backgroundColor: [
        "#4e79a7",
        "#f28e2b",
        "#e15759",
        "#76b7b2",
        "#59a14f",
        "#edc948",
      ][idx % 6],
    }));

    setTrendData({ labels, datasets });
  }

  return (
    <div>
      <h2 className="aura-heading">Audit Trail</h2>
      <AuditExport />

      {/* Multi-Stakeholder Filter */}
      <div style={{ margin: "1rem 0" }}>
        <label style={{ marginRight: "0.5rem" }}>Compare Stakeholders (comma-separated IDs):</label>
        <input
          type="text"
          value={stakeholders}
          onChange={(e) => setStakeholders(e.target.value)}
          placeholder="e.g. 42, 77, 101"
          style={{ padding: "0.5rem", width: "300px" }}
        />
      </div>

      {/* Comparison Chart */}
      <div className="glyph-card aura-form" style={{ marginTop: "1rem" }}>
        <h3 className="aura-heading">✦ Multi-Stakeholder Comparison ✦</h3>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setView("daily")} className="tab-btn projects">Daily</button>
          <button onClick={() => setView("weekly")} className="tab-btn stakeholders">Weekly</button>
          <button onClick={() => setView("monthly")} className="tab-btn affirmations">Monthly</button>
        </div>
        {trendData.labels.length > 0 ? (
          <Bar
            data={trendData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
              scales: { x: { stacked: false }, y: { stacked: false } },
            }}
          />
        ) : (
          <p>No comparison data yet.</p>
        )}
      </div>

      {/* Live audit logs */}
      <div className="aura-grid" style={{ marginTop: "2rem" }}>
        {logs.length === 0 && <p>No audit logs yet.</p>}
        {logs.map((log) => (
          <div key={log.id} className={`glyph-card ${log.animate ? "aura-fade" : ""}`}>
            <h3 className="slogan-arc aura-heading">{log.action}</h3>
            <p style={{ opacity: 0.8 }}>
              {log.details ? JSON.stringify(log.details) : "No details"}
            </p>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              Stakeholder: {log.stakeholder_id} — {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
