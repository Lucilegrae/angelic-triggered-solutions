import { loadPayload } from "../loadPayload";

export default async function InvestorDashboard() {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Investor Dashboard</h1>
      <p>Sector: {payload.sector}</p>

      {payload.permissions.can_invest && (
        <div>Investment Panel Enabled</div>
      )}

      {payload.permissions.can_commit_capital && (
        <div>Capital Commitment Tools Enabled</div>
      )}

      {payload.permissions.can_view_investor_dashboard && (
        <div>Investor Analytics Enabled</div>
      )}
    </div>
  );
}
