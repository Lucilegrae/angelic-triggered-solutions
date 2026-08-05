import { useSectorTimeline } from "@/hooks/useSectorTimeline";
import { SectorTimelineChart } from "@/components/WorkflowCharts/SectorTimelineChart";

export default async function SectorTimelinePage() {
  const timeline = await useSectorTimeline();

  return (
    <div className="space-y-8 p-6">
      <SectorTimelineChart data={timeline} />
    </div>
  );
}
