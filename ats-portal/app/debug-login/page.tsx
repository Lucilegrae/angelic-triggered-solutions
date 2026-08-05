"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DebugLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setToken("ERROR: " + error.message);
      return;
    }

    setToken(data.session?.access_token ?? "NO TOKEN");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>ATS Debug Login</h1>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={login}>Login</button>

      <pre style={{ marginTop: 20 }}>{token}</pre>
    </div>
  );
}
