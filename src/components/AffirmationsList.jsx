import React, { useEffect, useState } from "react";
import { supabase } from ".../supabaseClient";
import "./AuraCards.css";
import "./AuraGrid.css";
import "./AuraHeadings.css";

export default function AffirmationsList() {
  const [affirmations, setAffirmations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAffirmations() {
      const { data, error } = await supabase
        .from("affirmations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching affirmations:", error);
        setError(error.message);
      } else {
        setAffirmations(data);
      }
      setLoading(false);
    }

    fetchAffirmations();

    // ✅ Attach handlers BEFORE subscribe()
    const channel = supabase
      .channel("affirmations-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "affirmations" },
        (payload) => {
          console.log("New affirmation:", payload);
          setAffirmations((prev) => [{ ...payload.new, animate: true }, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "affirmations" },
        (payload) => {
          console.log("Updated affirmation:", payload);
          setAffirmations((prev) =>
            prev.map((a) =>
              a.id === payload.new.id ? { ...payload.new, animate: true } : a
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "affirmations" },
        (payload) => {
          console.log("Deleted affirmation:", payload);
          setAffirmations((prev) => prev.filter((a) => a.id !== payload.old.id));
        }
      )
      .subscribe(); // 🔥 Subscribe only after handlers are attached

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <p>Loading affirmations...</p>;

  return (
    <div className="aura-grid">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {affirmations.length === 0 && <p>No affirmations found.</p>}
      {affirmations.map((a) => (
        <div key={a.id} className={`glyph-card ${a.animate ? "aura-fade" : ""}`}>
          <h2 className="slogan-arc aura-heading">{a.slogan}</h2>
          {a.ceremonial_arc && (
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>
              Arc: {a.ceremonial_arc}
            </p>
          )}
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            {new Date(a.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
