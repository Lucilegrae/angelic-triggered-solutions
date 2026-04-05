import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import KPIPanel from "./KPIPanel";
import Filters from "./Filters";
import ErrorCards from "./ErrorCards";
import Charts from "./Charts";

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
      }
      setLoading(false);
    }

    fetchErrors();

    const channel = supabase
      .channel("error-logs-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "error_logs" },
        (payload) => setErrors((prev) => [payload.new, ...prev])
      );

    channel.subscribe();
    return () => supabase.removeChannel(channel);
  }, [filters]);

  if (loading) return <p>Loading error logs...</p>;

  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Error Dashboard ✦
      </h1>

      {/* KPI Panel */}
      <KPIPanel errors={errors} />

      {/* Filters with Export */}
      <Filters filters={filters} setFilters={setFilters} errors={errors} />

      {/* Error Cards */}
      <ErrorCards errors={errors} />

      {/* Charts */}
      <Charts errors={errors} />
    </section>
  );
}
