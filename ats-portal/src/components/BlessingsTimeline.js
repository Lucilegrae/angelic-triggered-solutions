"use client";

import { useEffect, useState } from "react";
import { listBlessings } from "./supabaseClient";

export default function BlessingsTimeline({ stakeholderId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!stakeholderId) return;

    (async () => {
      const { data } = await listBlessings(stakeholderId);
      setItems(data || []);
    })();
  }, [stakeholderId]);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Blessings Timeline ✦</h2>

      {items.length === 0 && (
        <p className="text-slate-400">No blessings recorded.</p>
      )}

      <div className="pdf-dashboard-grid">
        {items.map((b) => (
          <div key={b.id} className="pdf-card">
            <h3 className="pdf-title">Blessing</h3>
            <p>{b.blessing}</p>
            <p className="pdf-timestamp">
              {new Date(b.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
