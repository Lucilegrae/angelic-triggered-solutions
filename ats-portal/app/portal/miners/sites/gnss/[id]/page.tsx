"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerSiteGNSS() {
  const { id } = useParams<{ id: string }>();
  const [gnss, setGnss] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGNSS() {
      const { data, error } = await supabase.rpc("get_miner_site_gnss_profile", {
        site_id: id,
      });

      if (error) {
        console.error("Miner Site GNSS RPC error:", error);
      }

      setGnss(data || null);
      setLoading(false);
    }

    loadGNSS();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading GNSS Survey…</h2>
      </div>
    );
  }

  if (!gnss) {
    return (
      <div className="p-6 text-slate-200">
        <h2>No GNSS survey found for this site.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">

      <h1 className="text-2xl font-bold mb-4">GNSS Survey — {gnss.site_name}</h1>

      {/* Core GNSS Metadata */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Surveyor: {gnss.surveyor_name}</p>
        <p className="text-slate-300">Device: {gnss.device_model}</p>
        <p className="text-slate-300">Mode: {gnss.fix_mode}</p>
        <p className="text-slate-300">Accuracy: ±{gnss.accuracy_m} m</p>

        <p className="text-slate-300 mt-2">
          Timestamp: {new Date(gnss.timestamp).toLocaleString()}
        </p>
      </div>

      {/* Coordinates */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Coordinates</h2>

        <p className="text-slate-300">Latitude: {gnss.lat}</p>
        <p className="text-slate-300">Longitude: {gnss.lng}</p>
        <p className="text-slate-300">Elevation: {gnss.elevation_m} m</p>

        <p className="text-slate-300 mt-2">
          HDOP: {gnss.hdop} — VDOP: {gnss.vdop} — PDOP: {gnss.pdop}
        </p>
      </div>

      {/* Boundary Polygon */}
      {gnss.boundary_polygon && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Boundary Polygon</h2>

          <ul className="list-disc list-inside text-slate-400">
            {gnss.boundary_polygon.map((p, idx) => (
              <li key={idx}>
                Lat {p.lat}, Lng {p.lng}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* GNSS Epoch History */}
      {gnss.epochs && gnss.epochs.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">GNSS Epoch History</h2>

          {gnss.epochs.map((e, idx) => (
            <div key={idx} className="border-b border-slate-700 py-2">
              <p className="text-slate-300">
                Epoch {idx + 1}: Lat {e.lat}, Lng {e.lng}, Elev {e.elevation_m} m
              </p>
              <p className="text-slate-500">
                {new Date(e.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {gnss.site_id && (
          <p className="text-slate-300">
            Site Profile:{" "}
            <a
              href={`/portal/miners/sites/${gnss.site_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Site →
            </a>
          </p>
        )}

        {gnss.coordinator_id && (
          <p className="text-slate-300 mt-2">
            Coordinator:{" "}
            <a
              href={`/portal/miners/coordinator/${gnss.coordinator_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Coordinator →
            </a>
          </p>
        )}

        {gnss.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${gnss.ledger_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Ledger →
            </a>
          </p>
        )}
      </div>

      <a
        href="/portal/miners/sites"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Mining Sites Registry →
      </a>
    </div>
  );
}
