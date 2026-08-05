"use client";

import Link from "next/link";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

export default function PortalNavigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    loadUser();
  }, []);

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/portal/dashboard" className="text-slate-200 hover:text-white">
          Dashboard
        </Link>
        <Link href="/portal/ministry" className="text-slate-200 hover:text-white">
          Ministry
        </Link>
        <Link href="/portal/procurement" className="text-slate-200 hover:text-white">
          Procurement
        </Link>
        <Link href="/portal/mechanisation" className="text-slate-200 hover:text-white">
          Mechanisation
        </Link>
        <Link href="/portal/gnss" className="text-slate-200 hover:text-white">
          GNSS
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-slate-400 text-sm">
            {user.email}
          </span>
        )}

        <button
          className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/portal/login";
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
