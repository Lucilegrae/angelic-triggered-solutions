"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type HousingMember = {
  id: string;
  full_name: string;
  national_id: string;
  address: string;
  status: string;
  value_benchmark: number | null;
};

type HousingBlock = {
  block_code: string;
};

type HousingUnit = {
  unit_type: string;
  value_benchmark: number | null;
};

type Subscription = {
  status: string;
  plan: string;
};

type BankAssessment = {
  bank_name: string;
  eligibility: string;
  risk_category: string;
};

type Allocation = {
  allocation_status: string;
  gnss_district: string;
};

export default function HousingDashboard() {
  const params = useParams();
  const memberId = params?.id as string;
  const [member, setMember] = useState<HousingMember | null>(null);
  const [block, setBlock] = useState<HousingBlock | null>(null);
  const [unit, setUnit] = useState<HousingUnit | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [bank, setBank] = useState<BankAssessment | null>(null);
  const [allocation, setAllocation] = useState<Allocation | null>(null);

  useEffect(() => {
    if (!memberId) return;

    fetch(`/api/housing/profile?member_id=${memberId}`)
      .then(r => r.json())
      .then(j => {
        if (!j.ok) return;
        setMember(j.member);
        setBlock(j.block);
        setUnit(j.unit);
        setSubscription(j.subscription);
        setBank(j.bank);
        setAllocation(j.allocation);
      });
  }, [memberId]);

  if (!member) {
    return <div className="p-6">Loading housing profile...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Housing Dashboard</h1>

      <div className="bg-slate-900 p-4 rounded space-y-2">
        <p className="font-semibold text-lg">{member.full_name}</p>
        <p>National ID: {member.national_id}</p>
        <p>Address: {member.address}</p>
        <p>Status: {member.status}</p>
        <p>Value Benchmark: {member.value_benchmark ?? "N/A"}</p>
      </div>

      {block && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="font-semibold">Block</p>
          <p>Block Code: {block.block_code}</p>
        </div>
      )}

      {unit && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="font-semibold">Unit</p>
          <p>Unit Type: {unit.unit_type}</p>
          <p>Unit Value: {unit.value_benchmark ?? "N/A"}</p>
        </div>
      )}

      {subscription && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="font-semibold">Subscription</p>
          <p>Plan: {subscription.plan}</p>
          <p>Status: {subscription.status}</p>
        </div>
      )}

      {bank && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="font-semibold">Bank Assessment</p>
          <p>Bank: {bank.bank_name}</p>
          <p>Eligibility: {bank.eligibility}</p>
          <p>Risk: {bank.risk_category}</p>
        </div>
      )}

      {allocation && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="font-semibold">Allocation</p>
          <p>Status: {allocation.allocation_status}</p>
          <p>GNSS District: {allocation.gnss_district}</p>
        </div>
      )}
    </div>
  );
}
