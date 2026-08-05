import { useSectorHeatmap } from "@/hooks/useSectorHeatmap";
import { SectorHeatmap } from "@/components/WorkflowCharts/SectorHeatmap";

export default async function SectorHeatmapPage() {
  const data = await useSectorHeatmap();

  return (
    <div className="space-y-8 p-6">
      <SectorHeatmap sectors={data.sectors} />
    </div>
  );
}
