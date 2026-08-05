import { loadPayload } from "../loadPayload";

export default async function CommunityDashboard() {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Community Dashboard</h1>
      <p>Sector: {payload.sector}</p>

      {payload.permissions.can_apply && (
        <div>Application Panel Enabled</div>
      )}
    </div>
  );
}
