import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
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

    // ✅ Safe realtime subscription pattern
    const channel = supabase
      .channel("stakeholders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stakeholders" },
        (payload) => {
          console.log("Stakeholder change received!", payload);

          if (payload.eventType === "INSERT") {
            setStakeholders((prev) => [{ ...payload.new, animate: true }, ...prev]);
          }
          if (payload.eventType === "UPDATE") {
            setStakeholders((prev) =>
              prev.map((s) =>
                s.id === payload.new.id ? { ...payload.new, animate: true } : s
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setStakeholders((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        }
      );

    channel.subscribe();

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
