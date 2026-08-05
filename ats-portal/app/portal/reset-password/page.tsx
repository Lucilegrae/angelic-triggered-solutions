"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleReset() {
    const res = await fetch("/portal/reset-password/action", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.error) {
      setStatus("Failed to update password: " + data.error);
    } else {
      setStatus("Password updated successfully.");
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>

      <input
        type="password"
        className="border p-2 rounded w-full"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Password
      </button>

      {status && <p className="text-red-600">{status}</p>}
    </div>
  );
}
