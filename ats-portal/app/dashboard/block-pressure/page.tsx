"use client";

import { useEffect, useState } from "react";

type BlockPressure = {
  block: string;
  allocated: number;
  capacity: number;
};

export default function BlockPressurePage() {
  const [blocks, setBlocks] = useState<BlockPressure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlocks() {
      setLoading(true);
      const res = await fetch("/api/dashboard/block-pressure");
      const json = await res.json();
      setBlocks(json.blocks ?? []);
      setLoading(false);
    }
    loadBlocks();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading Block Pressure Heatmap...</div>;
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>Block Pressure Heatmap</h1>
      <p>Visualizing allocation pressure per block (allocated vs capacity).</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {blocks.map((b) => {
          const ratio = b.capacity > 0 ? b.allocated / b.capacity : 0;
          const intensity = Math.min(1, Math.max(0, ratio));
          const red = Math.round(255 * intensity);
          const green = Math.round(255 * (1 - intensity));
          const color = `rgb(${red}, ${green}, 80)`;

          return (
            <div
              key={b.block}
              style={{
                border: "1px solid #ccc",
                padding: 12,
                minWidth: 160,
                background: color,
                color: "#fff",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: "bold" }}>
                Block {b.block}
              </div>
              <div>Allocated: {b.allocated}</div>
              <div>Capacity: {b.capacity}</div>
              <div>Pressure: {(ratio * 100).toFixed(0)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
