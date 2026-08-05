import { loadPayload } from "../loadPayload";

export default async function LandownerDashboard() {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Landowner Dashboard</h1>
      <p>Sector: {payload.sector}</p>

      {payload.permissions.can_allocate_land && (
        <div>Land Allocation Panel Enabled</div>
      )}

      {payload.permissions.can_sell_land && (
        <div>Land Sales Panel Enabled</div>
      )}

      {payload.permissions.can_compensate_land && (
        <div>Compensation Panel Enabled</div>
      )}
    </div>
  );
}
