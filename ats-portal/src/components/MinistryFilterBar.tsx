"use client";

export default function MinistryFilterBar({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (f: any) => void;
}) {
  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold">Filter Ministry Data</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
          value={filters.tier}
          onChange={(e) => setFilters({ ...filters, tier: e.target.value })}
        >
          <option value="">All Tiers</option>
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
        </select>

        <select
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
          value={filters.risk}
          onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
        >
          <option value="">All Risk Levels</option>
          <option value="High Risk">High Risk</option>
          <option value="Medium Risk">Medium Risk</option>
          <option value="Low Risk">Low Risk</option>
        </select>

        <input
          type="text"
          placeholder="Block name"
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
          value={filters.block}
          onChange={(e) => setFilters({ ...filters, block: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>
    </div>
  );
}
