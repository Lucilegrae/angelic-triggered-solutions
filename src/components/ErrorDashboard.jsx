import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import "./AuraGrid.css";
import "./AuraCards.css";

export default function ErrorDashboard() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: "",
    component: "",
    severity: ""
  });

  useEffect(() => {
    async function fetchErrors() {
      let query = supabase
        .from("error_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.date) {
        query = query.gte("created_at", filters.date);
      }
      if (filters.component) {
        query = query.ilike("component_stack", `%${filters.component}%`);
      }
      if (filters.severity) {
        query = query.eq("severity", filters.severity);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching logs:", error);
      } else {
        setErrors(data || []);
      }
      setLoading(false);
    }

    fetchErrors();

    const channel = supabase
      .channel("error-logs-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "error_logs" },
        (payload) => {
          setErrors((prev) => [payload.new, ...prev]);
        }
      );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filters]);

  const exportCSV = () => {
    const headers = ["Message", "Severity", "Created At", "Stack", "Component Stack"];
    const rows = errors.map((err) => [
      `"${err.message}"`,
      err.severity || "medium",
      new Date(err.created_at).toLocaleString(),
      `"${err.stack || ""}"`,
      `"${err.component_stack || ""}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "error_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Aggregate severity data
  const severityCounts = errors.reduce((acc, err) => {
    const sev = err.severity || "Medium";
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});
  const severityData = Object.entries(severityCounts).map(([severity, count]) => ({
    severity,
    count
  }));

  // Aggregate daily data
  const dailyCounts = errors.reduce((acc, err) => {
    const date = new Date(err.created_at).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const dailyData = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count
  }));

  // KPI calculations
  const totalErrors = errors.length;
  const today = new Date().toISOString().split("T")[0];
  const todayErrors = errors.filter(
    (err) => new Date(err.created_at).toISOString().split("T")[0] === today
  ).length;
  const highSeverity = severityCounts["High"] || 0;
  const highSeverityPercent = totalErrors > 0 ? ((highSeverity / totalErrors) * 100).toFixed(1) : 0;

  if (loading) return <p>Loading error logs...</p>;

  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Error Dashboard ✦
      </h1>

      {/* KPI Panel */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "#222", padding: "1rem 2rem", borderRadius: "8px", color: "#fff" }}>
          <h3>Total Errors</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{totalErrors}</p>
        </div>
        <div style={{ background: "#222", padding: "1rem 2rem", borderRadius: "8px", color: "#fff" }}>
          <h3>Errors Today</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{todayErrors}</p>
        </div>
        <div style={{ background: "#222", padding: "1rem 2rem", borderRadius: "8px", color: "#fff" }}>
          <h3>High Severity %</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff4d4d" }}>
            {highSeverityPercent}%
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by component"
          value={filters.component}
          onChange={(e) => setFilters({ ...filters, component: e.target.value })}
        />
        <select
          value={filters.severity}
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
        >
          <option value="">All Severities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={exportCSV}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Error Cards */}
      {errors.length === 0 && <p>No errors logged yet.</p>}
      <div className="aura-grid">
        {errors.map((err) => (
          <div key={err.id} className="glyph-card aura-fade">
            <h2 className="aura-heading" style={{ color: "#ff4d4d" }}>
              {err.message}
            </h2>
            <p style={{ fontSize: "12px", opacity: 0.8 }}>
              {new Date(err.created_at).toLocaleString()}
            </p>
            {err.severity && (
              <p style={{ fontSize: "12px", fontWeight: "bold", color: "#ff4d4d" }}>
                Severity: {err.severity}
              </p>
            )}
            {err.stack && (
              <pre
                style={{
                  textAlign: "left",
                  fontSize: "12px",
                  background: "#222",
                  color: "#eee",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  overflowX: "auto"
                }}
              >
                {err.stack}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Error Count by Severity */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Error Count by Severity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={severityData}>
            <XAxis dataKey="severity" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ff4d4d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Error Trend by Date */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Error Trend by Date</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
