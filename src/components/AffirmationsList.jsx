import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./AuraCards.css"; // unified aura card styling
import "./AuraGrid.css";  // canonical grid layout
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

    // ✅ Safe realtime subscription pattern
    const channel = supabase
      .channel("affirmations-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "affirmations" },
        (payload) => {
          console.log("Affirmation change received!", payload);

          if (payload.eventType === "INSERT") {
            setAffirmations((prev) => [{ ...payload.new, animate: true }, ...prev]);
          }
          if (payload.eventType === "UPDATE") {
            setAffirmations((prev) =>
              prev.map((a) =>
                a.id === payload.new.id ? { ...payload.new, animate: true } : a
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setAffirmations((prev) => prev.filter((a) => a.id !== payload.old.id));
          }
        }
      );

    channel.subscribe();

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
