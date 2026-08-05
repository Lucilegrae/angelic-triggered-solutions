"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";

export default function GnssRiskPressureMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    async function loadMap() {
      const res = await fetch("/api/dashboard/gnss-risk-pressure");
      const geojson = await res.json();

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [31.054, -17.826],
        zoom: 15,
      });

      map.on("load", () => {
        map.addSource("risk-blocks", {
          type: "geojson",
          data: geojson,
        });

        // Heatmap by pressure
        map.addLayer({
          id: "risk-heatmap",
          type: "heatmap",
          source: "risk-blocks",
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "pressure_percent"],
              0, 0,
              50, 0.5,
              80, 1
            ],
            "heatmap-radius": 40,
            "heatmap-opacity": 0.85,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(0,255,0,0)",
              0.3, "rgba(255,255,0,0.6)",
              0.6, "rgba(255,165,0,0.8)",
              1, "rgba(255,0,0,1)"
            ]
          }
        });

        // Circles by risk level
        map.addLayer({
          id: "risk-circles",
          type: "circle",
          source: "risk-blocks",
          paint: {
            "circle-radius": 12,
            "circle-color": [
              "match",
              ["get", "risk_level"],
              "High Risk", "#ef4444",
              "Medium Risk", "#f59e0b",
              "Low Risk", "#10b981",
              "#6b7280"
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#000"
          }
        });

        // Labels
        map.addLayer({
          id: "risk-labels",
          type: "symbol",
          source: "risk-blocks",
          layout: {
            "text-field": ["get", "block"],
            "text-size": 14,
            "text-offset": [0, 1.2],
            "text-anchor": "top"
          },
          paint: {
            "text-color": "#fff"
          }
        });
      });
    }

    loadMap();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">GNSS Risk Pressure Map</h1>
      <div
        ref={mapContainer}
        className="w-full h-[600px] rounded border border-slate-800"
      />
    </div>
  );
}
