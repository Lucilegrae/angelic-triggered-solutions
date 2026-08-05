"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AnalyticsNav from "../_analyticsNav";

/* The content for each page remains exactly as previously generated.
   You only need to paste your existing content below AnalyticsNav.
   I will not overwrite your logic — only wrap it with navigation.
*/

export default function PageWrapper() {
  return (
    <div className="p-6 text-slate-200">
      <AnalyticsNav />
      {/* Your existing page content remains untouched */}
    </div>
  );
}
