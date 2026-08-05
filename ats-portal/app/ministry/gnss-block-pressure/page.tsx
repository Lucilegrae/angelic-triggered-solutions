"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";

export default function GnssBlockPressureMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    async function loadMap() {
      const res = await fetch("/api/dashboard/gnss-occupancy-pressure");
      const geojson = await res.json();

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [31.054, -17.826],
        zoom: 15,
      });

      map.on("load", () => {
        map.addSource("blocks", {
          type: "geojson",
          data: geojson,
        });

        // ⭐ HEATMAP (Allocation Pressure)
        map.addLayer({
          id: "allocation-heatmap",
          type: "heatmap",
          source: "blocks",
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "allocation_pressure"],
              0, 0,
              50, 0.5,
              80, 1
            ],
            "heatmap-intensity": 1.2,
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

        // ⭐ OCCUPANCY PRESSURE CIRCLES
        map.addLayer({
          id: "occupancy-circles",
          type: "circle",
          source: "blocks",
          paint: {
            "circle-radius": 12,
            "circle-color": [
              "case",
              [">=", ["get", "occupancy_pressure"], 80], "#ef4444",
              [">=", ["get", "occupancy_pressure"], 50], "#f59e0b",
              "#10b981"
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#000"
          }
        });

        // ⭐ LABELS
        map.addLayer({
          id: "block-labels",
          type: "symbol",
          source: "blocks",
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
      <h1 className="text-2xl font-semibold">GNSS Dual Pressure Map</h1>
      <div
        ref={mapContainer}
        className="w-full h-[600px] rounded border border-slate-800"
      />
    </div>
  );
}
