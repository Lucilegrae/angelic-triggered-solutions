import React, { useEffect, useState } from "react";
import { supabase } from ".../supabaseClient";
import "./AuraCards.css";
import "./AuraGrid.css";
import "./AuraHeadings.css";

export default function StakeholdersList() {
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStakeholders() {
      const { data, error } = await supabase
        .from("stakeholders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching stakeholders:", error);
        setError(error.message);
      } else {
        setStakeholders(data);
      }
      setLoading(false);
    }

    fetchStakeholders();

    // ✅ Attach handlers BEFORE subscribe()
    const channel = supabase
      .channel("stakeholders-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stakeholders" },
        (payload) => {
          console.log("New stakeholder:", payload);
          setStakeholders((prev) => [{ ...payload.new, animate: true }, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stakeholders" },
        (payload) => {
          console.log("Updated stakeholder:", payload);
          setStakeholders((prev) =>
            prev.map((s) =>
              s.id === payload.new.id ? { ...payload.new, animate: true } : s
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "stakeholders" },
        (payload) => {
          console.log("Deleted stakeholder:", payload);
          setStakeholders((prev) => prev.filter((s) => s.id !== payload.old.id));
        }
      )
      .subscribe(); // 🔥 Subscribe only after all handlers are attached

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <p>Loading stakeholders...</p>;

  return (
    <div className="aura-grid">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {stakeholders.length === 0 && <p>No stakeholders found.</p>}
      {stakeholders.map((s) => (
        <div key={s.id} className={`glyph-card ${s.animate ? "aura-fade" : ""}`}>
          <h2 className="slogan-arc aura-heading">{s.name}</h2>
          {s.role && (
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>Role: {s.role}</p>
          )}
          {s.contact_email && (
            <p style={{ fontSize: "12px", opacity: 0.7 }}>{s.contact_email}</p>
          )}
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            {new Date(s.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
