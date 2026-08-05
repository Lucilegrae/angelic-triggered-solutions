"use client";


export default function DashboardNavBar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: 20,
        padding: "12px 0",
        borderBottom: "1px solid #ccc",
        marginBottom: 20,
      }}
    >
      <a href="/dashboard">Dashboard Home</a>
      <a href="/dashboard/block-pressure">Block Pressure Heatmap</a>
      <a href="/dashboard/timeline">Allocation Timeline</a>
      <a href="/dashboard/occupancy">Unit Occupancy Map</a>
      <a href="/dashboard/gnss">GNSS Estate Map</a>
      <a href="/dashboard/risk">Risk Cluster View</a>
    </nav>
  );
}
