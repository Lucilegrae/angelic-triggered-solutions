"use client";

import ProcurementRecordViewer from "@/components/ats/procurement/ProcurementRecordViewer";

export default function ProcurementDashboard() {
  return (
    <div className="ats-container">
      <h1 className="aura-title">🌾 Procurement & Tonnage</h1>

      <ProcurementRecordViewer record_id="REC-001" />
    </div>
  );
}
