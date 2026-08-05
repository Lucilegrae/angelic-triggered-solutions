"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";

const Map = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((m) => m.GeoJSON),
  { ssr: false }
);

export default function ProcurementMap() {
  const [geo, setGeo] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("procurement_geojson");
      if (error) console.error(error);
      setGeo(data);
    }
    load();
  }, []);

  if (!geo) return <div className="p-6 text-slate-200">Loading map…</div>;

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Global Procurement Map</h1>

      <Map
        center={[-17.8292, 31.0522]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          data={geo}
          style={(feature: any) => ({
            fillColor: `rgba(34,197,94,${Math.min(
              1,
              (feature.properties.intake_kg || 0) / 200
            )})`,
            weight: 1,
            color: "#22c55e",
          })}
        />
      </Map>
    </div>
  );
}
