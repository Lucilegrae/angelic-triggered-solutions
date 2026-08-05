type EstateProps = {
  block_name: string;
  location: string;
  total_units: number;
  total_capacity: number;
  occupied_slots: number;
  remaining_slots: number;
  full_units: number;
  partial_units: number;
};

export default function EstatePressureCard(props: EstateProps) {
  return (
    <div className="border border-slate-800 rounded-lg px-3 py-2 bg-slate-900/40">
      <p className="text-xs text-slate-400">
        {props.block_name} · {props.location}
      </p>

      <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
        <div>
          <p>Total units: {props.total_units}</p>
          <p>Capacity: {props.total_capacity}</p>
        </div>
        <div>
          <p>Occupied: {props.occupied_slots}</p>
          <p>Remaining: {props.remaining_slots}</p>
        </div>
      </div>

      <div className="mt-1 text-xs text-slate-300">
        <p>Full units: {props.full_units}</p>
        <p>Partial units: {props.partial_units}</p>
      </div>
    </div>
  );
}
