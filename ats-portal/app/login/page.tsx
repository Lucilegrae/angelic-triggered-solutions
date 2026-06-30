'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const res = await fetch('/api/me');
    const me = await res.json();

    setUser(data.user, me.role ?? null);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border border-slate-700 rounded-xl p-6">
        <h1 className="text-xl font-semibold">ATS Steward Login</h1>
        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded bg-emerald-500 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
          >
            {loading ? 'Entering covenant…' : 'Login'}
          </button>
        </div>
      </div>
    </main>
  );
}
