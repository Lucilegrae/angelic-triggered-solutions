import { useCrossSectorInfluence } from "@/hooks/useCrossSectorInfluence";
import { CrossSectorMatrix } from "@/components/WorkflowCharts/CrossSectorMatrix";

export default async function InfluenceMatrixPage() {
  const matrix = await useCrossSectorInfluence();

  return (
    <div className="space-y-8 p-6">
      <CrossSectorMatrix data={matrix} />
    </div>
  );
}
