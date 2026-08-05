"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function BudgetIntelligenceEngine() {
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("national_budget")
        .select("*")
        .order("ministry", { ascending: true });

      setBudget(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS National Budget Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {budget.map((b) => (
          <div key={b.id} className="pdf-card">
            <h3 className="pdf-title">{b.ministry}</h3>
            <p>Allocated: ${b.allocated}</p>
            <p>Spent: ${b.spent}</p>
            <p>Variance: ${b.variance}</p>
            <p>ATS Audit Flag: {b.ats_audit_flag ? "⚠️ Yes" : "✔️ Clear"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
