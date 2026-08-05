import { useWorkflowCharts } from "@/hooks/useWorkflowCharts";
import { StateDonutChart } from "@/components/WorkflowCharts/StateDonutChart";
import { DailyLineChart } from "@/components/WorkflowCharts/DailyLineChart";
import { MinistryBarChart } from "@/components/WorkflowCharts/MinistryBarChart";

export default async function WorkflowChartsPage() {
  const charts = await useWorkflowCharts();

  return (
    <div className="space-y-8 p-6">
      <StateDonutChart data={charts.states} />
      <DailyLineChart data={charts.daily} />
      <MinistryBarChart data={charts.ministries} />
    </div>
  );
}
