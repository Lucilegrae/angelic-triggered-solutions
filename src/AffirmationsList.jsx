import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./AffirmationsList.css"; // aura animations

// Initialize Supabase client using Vite env variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AffirmationsList() {
  const [affirmations, setAffirmations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAffirmations() {
      const { data, error } = await supabase
        .from("Affirmations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching affirmations:", error);
      } else {
        setAffirmations(data);
      }
      setLoading(false);
    }

    fetchAffirmations();

    // Real-time subscription
    const subscription = supabase
      .channel("affirmations-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Affirmations" },
        (payload) => {
          console.log("Affirmation change received!", payload);

          if (payload.eventType === "INSERT") {
            setAffirmations((prev) => [
              { ...payload.new, animate: true },
              ...prev,
            ]);
          }
          if (payload.eventType === "UPDATE") {
            setAffirmations((prev) =>
              prev.map((a) =>
                a.id === payload.new.id ? { ...payload.new, animate: true } : a
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setAffirmations((prev) =>
              prev.filter((a) => a.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Loading affirmations...</p>;

  return (
    <ul className="affirmations-list">
      {affirmations.map((a) => (
        <li key={a.id}>
          <strong>{a.slogan}</strong>
          {a.ceremonial_arc && (
            <span style={{ fontStyle: "italic", marginLeft: "8px" }}>
              Arc: {a.ceremonial_arc}
            </span>
          )}
          <span style={{ fontSize: "12px", opacity: 0.7, marginLeft: "8px" }}>
            {new Date(a.created_at).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
