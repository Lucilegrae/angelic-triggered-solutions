import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import KPIPanel from "./KPIPanel";
import Filters from "./Filters";
import ErrorCards from "./ErrorCards";
import Charts from "./Charts";
import ExportButton from "./ExportButton";   // CSV export button
import ExportPNG from "./ExportPNG";         // PNG export button
import { logAuditTrail } from "./LogAuditTrail"; // audit trail utility

import { logDashboardLoad } from "./logging/dashboardLogging";
import { logSessionEnd } from "./logging/sessionLogging";
import { handleAuthLogging } from "./logging/authLogging";
import { logErrorCreated, logErrorResolved } from "./logging/errorLogging";
import {
  logStakeholderExport,
  logStakeholderView,
  logStakeholderAffirmation,
  logStakeholderRejection,
  logStakeholderCommentary
} from "./logging/stakeholderLogging";
import { logStakeholderSignature } from "./logging/signatureLogging";

export default function ErrorDashboard() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ date: "", component: "", severity: "" });

  useEffect(() => {
    async function fetchErrors() {
      let query = supabase.from("error_logs").select("*").order("created_at", { ascending: false });
      if (filters.date) query = query.gte("created_at", filters.date);
      if (filters.component) query = query.ilike("component_stack", `%${filters.component}%`);
      if (filters.severity) query = query.eq("severity", filters.severity);

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching logs:", error);
      } else {
        setErrors(data || []);
        logDashboardLoad(data, filters);
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
          logErrorCreated(payload);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "error_logs" },
        (payload) => {
          setErrors((prev) =>
            prev.map((err) => (err.id === payload.new.id ? payload.new : err))
          );
          logErrorResolved(payload);
        }
      );

    channel.subscribe();

    return () => {
      logSessionEnd(errors, filters);
      supabase.removeChannel(channel);
    };
  }, [filters]);

  useEffect(() => {
    const authListener = handleAuthLogging(supabase);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading error logs...</p>;

  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Error Dashboard ✦
      </h1>

      {/* KPI Panel */}
      <KPIPanel errors={errors} user={supabase.auth.getUser()} />

      {/* Filters with Audit Logging */}
      <Filters
        filters={filters}
        setFilters={(newFilters) => {
          setFilters(newFilters);
          logAuditTrail(
            supabase.auth.getUser(),
            errors,
            "FILTER_CHANGE",
            newFilters
          );
        }}
        errors={errors}
      />

      {/* Export Buttons */}
      <div style={{ marginBottom: "2rem" }}>
        <ExportButton
          user={supabase.auth.getUser()}
          errors={errors}
          onExport={() => logStakeholderExport(errors, "CSV")}
        />
        <ExportPNG
          user={supabase.auth.getUser()}
          errors={errors}
          onExport={() => logStakeholderExport(errors, "PNG")}
        />
      </div>

      {/* Stakeholder Report Viewing Buttons */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => logStakeholderView(errors, "Summary")}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
        >
          View Summary Report
        </button>
        <button
          onClick={() => logStakeholderView(errors, "Detailed")}
          style={{ padding: "0.5rem 1rem" }}
        >
          View Detailed Report
        </button>
      </div>

      {/* Stakeholder Report Affirmation Buttons */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => logStakeholderAffirmation(errors, "Summary")}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}
        >
          Affirm Summary Report
        </button>
        <button
          onClick={() => logStakeholderAffirmation(errors, "Detailed")}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}
        >
          Affirm Detailed Report
        </button>
      </div>

      {/* Stakeholder Report Rejection Buttons */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => logStakeholderRejection(errors, "Summary")}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}
        >
          Reject Summary Report
        </button>
        <button
          onClick={() => logStakeholderRejection(errors, "Detailed")}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}
        >
          Reject Detailed Report
        </button>
      </div>

      {/* Stakeholder Report Commentary Form */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Leave Feedback on Report</h3>
        <textarea
          id="reportComment"
          placeholder="Enter your feedback here..."
          style={{ width: "60%", height: "80px", marginBottom: "1rem", padding: "0.5rem" }}
        ></textarea>
        <div>
          <button
            onClick={() => {
              const comment = document.getElementById("reportComment").value;
              logStakeholderCommentary(errors, "Summary", comment);
            }}
            style={{ marginRight: "1rem", padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}
          >
            Submit Summary Feedback
          </button>
          <button
            onClick={() => {
              const comment = document.getElementById("reportComment").value;
              logStakeholderCommentary(errors, "Detailed", comment);
            }}
            style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}
          >
            Submit Detailed Feedback
          </button>
        </div>
      </div>

      {/* Stakeholder Report Signature Buttons */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => logStakeholderSignature(errors, "Summary", "Stakeholder A")}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem", backgroundColor: "#6f42c1", color: "white", border: "none", borderRadius: "4px" }}
        >
          Sign Summary Report
        </button>
        <button
          onClick={() => logStakeholderSignature(errors, "Detailed", "Stakeholder B")}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#6f42c1", color: "white", border: "none", borderRadius: "4px" }}
        >
          Sign Detailed Report
        </button>
      </div>

      {/* Error Cards */}
      <ErrorCards errors={errors} user={supabase.auth.getUser()} />

      {/* Charts */}
      <Charts errors={errors} user={supabase.auth.getUser()} />
    </section>
  );
}


