"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function GnssEstateMap({ estates }: { estates: any[] }) {
  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">GNSS Estate Map</h3>

      <MapContainer
        center={[-17.8292, 31.0522]} // Harare
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {estates.map((e, idx) => (
          <Marker key={idx} position={[e.lat, e.lng]}>
            <Popup>
              <strong>{e.block_name}</strong>
              <br />
              {e.location}
              <br />
              Units: {e.total_units}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
