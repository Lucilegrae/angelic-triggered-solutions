"use client";

import { useEffect, useState } from "react";

type Estate = {
  name: string;
  lat: number;
  lng: number;
};

export default function GNSSPage() {
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEstates() {
      setLoading(true);
      const res = await fetch("/api/dashboard/gnss");
      const json = await res.json();
      setEstates(json.estates ?? []);
      setLoading(false);
    }
    loadEstates();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading GNSS Estate Map...</div>;
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>GNSS Estate Map</h1>
      <p>Placeholder for GNSS / GIS integration.</p>

      {estates.length === 0 ? (
        <p>No estate data yet. Integrate GNSS feed.</p>
      ) : (
        <ul>
          {estates.map((e) => (
            <li key={e.name}>
              {e.name} — ({e.lat}, {e.lng})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
