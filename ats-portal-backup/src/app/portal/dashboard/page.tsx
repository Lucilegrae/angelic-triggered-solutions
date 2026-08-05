"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    loadUser();
  }, []);

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Loading ATS Portal…</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>ATS Portal Dashboard</h1>
      <p>Welcome, {user.email}</p>

      <div style={{ marginTop: 30 }}>
        <h2>Modules</h2>
        <ul style={{ lineHeight: "2.2em" }}>
          <li><a href="/portal/ministry">Ministry Intelligence</a></li>
          <li><a href="/portal/procurement">Procurement & Tonnage</a></li>
          <li><a href="/portal/mechanisation">Mechanisation & Field Ops</a></li>
          <li><a href="/portal/payments">Payment Orchestration</a></li>
          <li><a href="/portal/gnss">GNSS Surveying & Mapping</a></li>
        </ul>
      </div>

      <div style={{ marginTop: 40 }}>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            location.href = "/portal/login";
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
