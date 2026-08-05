"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    await supabase.auth.signInWithOtp({ email });
    alert("Magic link sent. Check your email.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <form className="bg-slate-900 p-6 rounded border border-slate-800 w-80" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">ATS Staff Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-slate-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500">
          Send Magic Link
        </button>
      </form>
    </div>
  );
}
