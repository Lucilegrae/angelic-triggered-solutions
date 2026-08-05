"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";

export default function StakeholderProgressHeatmap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    async function loadMap() {
      const res = await fetch("/api/onboarding/progress-heatmap");
      const geojson = await res.json();

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [31.054, -17.826],
        zoom: 12,
      });

      map.on("load", () => {
        map.addSource("progress", {
          type: "geojson",
          data: geojson,
        });

        // Heatmap layer
        map.addLayer({
          id: "progress-heatmap",
          type: "heatmap",
          source: "progress",
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "progress_score"],
              0, 0,
              50, 0.5,
              100, 1
            ],
            "heatmap-intensity": 1.2,
            "heatmap-radius": 40,
            "heatmap-opacity": 0.85,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(255,0,0,0)",      // red transparent (low progress)
              0.3, "rgba(255,165,0,0.6)", // amber
              0.6, "rgba(255,255,0,0.8)", // yellow
              1, "rgba(0,255,0,1)"        // green (high progress)
            ]
          }
        });

        // Labels (UPDATED: sector instead of ministry)
        map.addLayer({
          id: "progress-labels",
          type: "symbol",
          source: "progress",
          layout: {
            "text-field": ["get", "sector"],   // ✔ FIXED
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
      <h1 className="text-2xl font-semibold">Stakeholder Progress Heatmap</h1>
      <div
        ref={mapContainer}
        className="w-full h-[600px] rounded border border-slate-800"
      />
    </div>
  );
}
