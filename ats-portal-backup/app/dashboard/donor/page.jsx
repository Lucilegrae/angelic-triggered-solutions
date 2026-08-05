import { loadPayload } from "../loadPayload";

export default async function DonorDashboard() {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Donor Dashboard</h1>
      <p>Sector: {payload.sector}</p>

      {payload.permissions.can_donate && (
        <div>Donation Panel Enabled</div>
      )}

      {payload.permissions.can_sponsor && (
        <div>Sponsorship Panel Enabled</div>
      )}

      {payload.permissions.can_support_projects && (
        <div>Project Support Panel Enabled</div>
      )}
    </div>
  );
}
