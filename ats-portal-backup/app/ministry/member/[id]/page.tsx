"use client";

import { useRouter } from "next/navigation";
import {
  useMinistryCoverage,
  useLifecycle,
} from "@/hooks/useMinistry";

import MemberTimelineChart from "@/components/charts/MemberTimelineChart";
import { useRiskPrediction } from "@/hooks/useRiskPrediction";

export default function MemberIntelligencePage({
  params,
}: {
  params: { id: string };
}) {
  const token = "";
  const { data: coverage } = useMinistryCoverage(token);
  const { data: lifecycle } = useLifecycle(token);
  const router = useRouter();

  const member = coverage?.find((m: any) => m.national_id === params.id);
  const memberLifecycle = lifecycle?.filter(
    (l: any) => l.national_id === params.id
  );

  if (!coverage) return <div>Loading member…</div>;
  if (!member) return <div>Member not found.</div>;

  // ⭐ Timeline events (fallback)
  const events = member?.events || [
    { date: "2024-01-01", status_label: "Registered", status_score: 1 },
    { date: "2024-03-10", status_label: "Allocated", status_score: 2 },
    { date: "2024-06-05", status_label: "Insured", status_score: 3 },
  ];

  // ⭐ Risk Prediction Hook
  const { result, loading, predict } = useRiskPrediction();

  // ⭐ Payload for ES256 risk prediction
  const payload = {
    tier: member.tier,
    insurance_status: member.insurance_status,
    months_remaining: member.months_remaining,
    risk_level: member.risk_level,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {member.full_name}
          </h1>
          <p className="text-sm text-slate-400">
            National ID: {member.national_id}
          </p>
        </div>
        <button
          onClick={() => router.push("/ministry")}
          className="text-xs px-3 py-1 rounded border border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Summary chips */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="border border-emerald-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Tier</p>
          <p className="text-emerald-300 text-sm font-semibold">
            {member.tier}
          </p>
        </div>
        <div className="border border-blue-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Insurance</p>
          <p className="text-blue-300 text-sm font-semibold">
            {member.insurance_status}
          </p>
        </div>
        <div className="border border-amber-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Months remaining</p>
          <p className="text-amber-300 text-sm font-semibold">
            {member.months_remaining}
          </p>
        </div>
        <div className="border border-red-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Risk level</p>
          <p className="text-red-300 text-sm font-semibold">
            {member.risk_level}
          </p>
        </div>
      </section>

      {/* Coverage + Estate */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/40">
          <h2 className="text-sm font-semibold mb-2">
            Coverage Profile
          </h2>
          <p>Tier: {member.tier}</p>
          <p>Priority: {member.priority}</p>
          <p>Insurance: {member.insurance_status}</p>
          <p>Gap: {member.insurance_gap}</p>
        </div>

        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/40">
          <h2 className="text-sm font-semibold mb-2">
            Estate Allocation
          </h2>
          <p>Unit: {member.unit_code}</p>
          <p>Block: {member.block_name}</p>
          <p>Location: {member.location}</p>
          <p>Family slot: {member.family_slot}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-4">
        <MemberTimelineChart events={events} />
      </section>

      {/* Lifecycle panel */}
      {memberLifecycle && memberLifecycle.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold">
            Allocation Lifecycle
          </h2>
          <div className="space-y-2">
            {memberLifecycle.map((l: any, idx: number) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-lg px-3 py-2 bg-slate-900/40 text-xs"
              >
                <p className="text-slate-400">
                  {l.block_name} · {l.location}
                </p>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <div>
                    <p>Status: {l.allocation_status}</p>
                    <p>Start: {l.allocation_clock_start}</p>
                  </div>
                  <div>
                    <p>Deadline: {l.allocation_deadline}</p>
                    <p>Months remaining: {l.months_remaining}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Risk prediction */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">
          Risk Prediction (ES256‑signed)
        </h2>
        <button
          onClick={() => predict(payload)}
          className="mt-1 text-xs px-3 py-1 rounded border border-red-500/40 text-red-300 hover:bg-red-500/10"
        >
          {loading ? "Predicting…" : "Run Risk Prediction"}
        </button>

        {result && (
          <div className="mt-3 text-xs border border-red-500/40 rounded-lg p-3 bg-slate-900/40">
            <p>Score: {result.prediction.score}</p>
            <p>Band: {result.prediction.band}</p>
          </div>
        )}
      </section>
    </div>
  );
}
