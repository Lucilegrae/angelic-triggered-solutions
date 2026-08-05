import { loadPayload } from "../loadPayload";

export default async function MinerDashboard() {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Miner Dashboard</h1>
      <p>Sector: {payload.sector}</p>

      {payload.permissions.can_insure && (
        <div>Insurance Panel Enabled</div>
      )}

      {payload.permissions.can_fund && (
        <div>Funding Panel Enabled</div>
      )}
    </div>
  );
}
