import { useWorkflowDashboard } from "@/hooks/useWorkflowDashboard";
import { StateSummary } from "@/components/WorkflowDashboard/StateSummary";
import { RecentWorkflows } from "@/components/WorkflowDashboard/RecentWorkflows";
import { TotalWorkflows } from "@/components/WorkflowDashboard/TotalWorkflows";

export default async function WorkflowDashboardPage() {
  const data = await useWorkflowDashboard();

  return (
    <div className="space-y-8 p-6">
      <TotalWorkflows total={data.total} />

      <StateSummary states={data.by_state} />

      <RecentWorkflows items={data.recent} />
    </div>
  );
}
