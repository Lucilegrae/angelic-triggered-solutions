/* ✦ Golden Aura Audit Dashboard ✦ */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";   // ✦ Import Link for breadcrumb
import supabase from '.../supabaseClient';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './theme.css';

import RetryModeSelector from "./RetryModeSelector";
import RetryControlPanel from "./RetryControlPanel";
import AuditTrailFeed from "./AuditTrailFeed";
import AuditTrailLedger from "./AuditTrailLedger";

// ✦ Import sparks utilities
import { attachBreadcrumbSparks } from "../utils/breadcrumbSparks";
import { attachAuraSparks } from "../utils/auraSparks";

export default function AuditDashboard() {
  const [logs, setLogs] = useState([]);
  const barRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('role_action_log')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (!error) setLogs(data);
    }
    fetchLogs();

    const channel = supabase
      .channel('role-action-log-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'role_action_log' },
        (payload) => {
          setLogs((prev) => [payload.new, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✦ Attach sparks to breadcrumb + export button on mount
  useEffect(() => {
    attachBreadcrumbSparks();
    attachAuraSparks(); // applies to breadcrumb links + export button
  }, []);

  const actionCounts = logs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {});
  const roleCounts = logs.reduce((acc, log) => {
    acc[log.role] = (acc[log.role] || 0) + 1;
    return acc;
  }, {});

  const actionChartData = {
    labels: Object.keys(actionCounts),
    datasets: [{ label: 'Action Frequency', data: Object.values(actionCounts), backgroundColor: ['gold','crimson','dodgerblue','orange','limegreen'] }],
  };
  const roleChartData = {
    labels: Object.keys(roleCounts),
    datasets: [{ label: 'Role Activity', data: Object.values(roleCounts), backgroundColor: ['gold','crimson','dodgerblue','orange','limegreen'] }],
  };

  function exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("✨ Role Action Audit Report ✦", 14, 20);

    doc.autoTable({
      head: [['Timestamp','Actor','Role','Action','Details']],
      body: logs.map(log => [log.timestamp, log.actor, log.role, log.action, log.details]),
      startY: 30,
      styles: { fontSize: 9, cellPadding: 2 }
    });

    doc.save("audit_report.pdf");
  }

  return (
    <div style={{ border: "2px solid gold", padding: "1rem", color: "gold" }}>
      {/* ✦ Breadcrumb Trail ✦ */}
      <nav className="breadcrumb-trail">
        <Link to="/">Home ✦</Link>
        <span style={{ margin: "0 0.5rem" }}>{">"}</span>
        <span style={{ fontWeight: "bold" }}>Audit Dashboard ✦</span>
      </nav>

      <h2>✨ Role Action Audit Dashboard ✦</h2>

      {/* ✦ Retry controls ✦ */}
      <RetryModeSelector />
      <RetryControlPanel />

      {/* ✦ Charts ✦ */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ width: "45%" }}>
          <h3>📊 Action Frequency</h3>
          <Bar ref={barRef} data={actionChartData} />
        </div>
        <div style={{ width: "45%" }}>
          <h3>🧑‍⚖️ Role Activity</h3>
          <Pie ref={pieRef} data={roleChartData} />
        </div>
      </div>

      {/* ✦ Audit trail components ✦ */}
      <AuditTrailFeed />
      <AuditTrailLedger />

      {/* ✦ Table ✦ */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid gold", padding: "0.6rem" }}>Timestamp</th>
            <th style={{ border: "1px solid gold", padding: "0.6rem" }}>Actor</th>
            <th style={{ border: "1px solid gold", padding: "0.6rem" }}>Role</th>
            <th style={{ border: "1px solid gold", padding: "0.6rem" }}>Action</th>
            <th style={{ border: "1px solid gold", padding: "0.6rem" }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid rgba(255,215,0,0.4)", padding: "0.6rem" }}>{log.timestamp}</td>
              <td style={{ border: "1px solid rgba(255,215,0,0.4)", padding: "0.6rem" }}>{log.actor}</td>
              <td style={{ border: "1px solid rgba(255,215,0,0.4)", padding: "0.6rem" }}>{log.role}</td>
              <td style={{ border: "1px solid rgba(255,215,0,0.4)", padding: "0.6rem" }}>{log.action}</td>
              <td style={{ border: "1px solid rgba(255,215,0,0.4)", padding: "0.6rem" }}>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="export-btn" onClick={exportPDF}>⬇ Export PDF Scroll</button>
    </div>
  );
}
