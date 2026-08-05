"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

const Map = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

export default function FederationGNSSMap() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.rpc("get_federation_gnss_points");
      setPoints(data || []);
    }
    load();
  }, []);

  return (
    <CosmicPage>
      <CosmicHeader
        title="Federation GNSS Map"
        subtitle="Live geospatial intelligence from ATS field nodes"
      />

      <Map
        center={[-17.8292, 31.0522]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {points.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              <p className="text-slate-800 font-semibold">{p.node_label}</p>
              <p className="text-slate-700 text-sm">Accuracy: {p.accuracy}</p>
              <p className="text-slate-700 text-sm">{p.timestamp}</p>
            </Popup>
          </Marker>
        ))}
      </Map>
    </CosmicPage>
  );
}
