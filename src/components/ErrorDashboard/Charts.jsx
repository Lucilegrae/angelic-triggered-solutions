import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { logAuditTrail } from "./LogAuditTrail";

export default function Charts({ errors, user }) {
  const severityCounts = errors.reduce((acc, err) => {
    const sev = err.severity || "Medium";
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});
  const severityData = Object.entries(severityCounts).map(([severity, count]) => ({ severity, count }));

  const dailyCounts = errors.reduce((acc, err) => {
    const date = new Date(err.created_at).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const dailyData = Object.entries(dailyCounts).map(([date, count]) => ({ date, count }));

  const handleChartClick = (chartType) => {
    logAuditTrail(
      user,
      errors,
      "CHART_INTERACTION",
      { chart: chartType, rowCount: errors.length }
    );
  };

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <h2>Error Count by Severity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={severityData} onClick={() => handleChartClick("severity")}>
            <XAxis dataKey="severity" /><YAxis /><Tooltip /><Legend />
            <Bar dataKey="count" fill="#ff4d4d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h2>Error Trend by Date</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData} onClick={() => handleChartClick("timeline")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" /><YAxis /><Tooltip /><Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
