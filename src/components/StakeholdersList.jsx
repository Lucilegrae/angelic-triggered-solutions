import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function StakeholdersList() {
  const [stakeholders, setStakeholders] = useState([]);

  useEffect(() => {
    async function fetchStakeholders() {
      const { data, error } = await supabase.from("stakeholders").select("*");
      if (error) {
        console.error("Error fetching stakeholders:", error);
      } else {
        setStakeholders(data);
      }
    }
    fetchStakeholders();
  }, []);

  return (
    <div>
      <h2>Stakeholders</h2>
      <ul>
        {stakeholders.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
