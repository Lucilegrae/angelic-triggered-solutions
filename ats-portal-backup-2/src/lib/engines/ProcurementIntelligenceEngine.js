"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ProcurementIntelligenceEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("procurement_records")
        .select("*")
        .order("contract_value", { ascending: false });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Procurement Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.tender_name}</h3>
            <p>Supplier: {r.supplier}</p>
            <p>Contract Value: ${r.contract_value}</p>
            <p>Delivery Status: {r.delivery_status}</p>
            <p>ATS Compliance Score: {r.ats_compliance_score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
