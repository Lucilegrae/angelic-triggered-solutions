import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./StakeholdersList.css"; // aura animations

// Initialize Supabase client with Vite env variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function StakeholdersList() {
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    async function fetchStakeholders() {
      const { data, error } = await supabase
        .from("Stakeholders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching stakeholders:", error);
      } else {
        setStakeholders(data);
      }
      setLoading(false);
    }

    fetchStakeholders();

    // Real-time subscription
    const subscription = supabase
      .channel("stakeholders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Stakeholders" },
        (payload) => {
          console.log("Stakeholder change received!", payload);

          if (payload.eventType === "INSERT") {
            setStakeholders((prev) => [
              { ...payload.new, animate: true },
              ...prev,
            ]);
          }
          if (payload.eventType === "UPDATE") {
            setStakeholders((prev) =>
              prev.map((s) =>
                s.id === payload.new.id
                  ? { ...payload.new, animate: true }
                  : s
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setStakeholders((prev) =>
              prev.filter((s) => s.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Loading stakeholders...</p>;

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        justifyContent: "center",
      }}
    >
      {stakeholders.map((s) => (
        <div
          key={s.id}
          className={`glyph-card ${s.animate ? "aura-fade" : ""}`}
        >
          <h2 className="slogan-arc aura-heading">{s.name}</h2>
          <p>Role: {s.role}</p>
          {s.contact_email && (
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>
              Contact: {s.contact_email}
            </p>
          )}
          {s.pledge_line && (
            <p style={{ fontWeight: "bold", color: "#4a90e2" }}>
              Pledge: {s.pledge_line}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
