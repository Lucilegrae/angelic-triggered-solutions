"use client";

import { useState } from "react";

type Member = {
  id: string;
  full_name: string;
  national_id: string;
  address: string;
  status: string;
};

export default function HousingRegistrationPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [member, setMember] = useState<Member | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    national_id: "",
    date_of_birth: "",
    address: "",
    phone: "",
    sector: "",
    photo_url: "",
  });
  const [blockCode, setBlockCode] = useState("BLOCK_A");
  const [unitType, setUnitType] = useState("STARTER");
  const [valueBenchmark, setValueBenchmark] = useState<number>(40000);
  const [subscriptionPlan, setSubscriptionPlan] = useState("ATS_HOUSING_FUND");
  const [bankName, setBankName] = useState("CBZ");
  const [gnssDistrict, setGnssDistrict] = useState("GNSS_DISTRICT_1");
  const [log, setLog] = useState<string[]>([]);

  function pushLog(msg: string) {
    setLog(prev => [...prev, msg]);
  }

  async function submitIdentity() {
    pushLog("Submitting identity...");
    const res = await fetch("/api/housing/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (!json.ok) {
      pushLog("Identity failed: " + json.error);
      return;
    }
    setMember(json.member);
    pushLog("Identity captured for member: " + json.member.full_name);
    setStep(2);
  }

  async function submitBlockUnit() {
    if (!member) return;
    pushLog("Assigning block and unit...");
    const res = await fetch("/api/housing/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: member.id,
        block_code: blockCode,
        unit_type: unitType,
        value_benchmark: valueBenchmark,
      }),
    });
    const json = await res.json();
    if (!json.ok) {
      pushLog("Block/unit assignment failed: " + json.error);
      return;
    }
    pushLog("Block and unit assigned.");
    setStep(3);
  }

  async function submitSubscription() {
    if (!member) return;
    pushLog("Activating subscription...");
    const res = await fetch("/api/housing/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: member.id,
        plan: subscriptionPlan,
      }),
    });
    const json = await res.json();
    if (!json.ok) {
      pushLog("Subscription failed: " + json.error);
      return;
    }
    pushLog("Subscription activated.");
    setStep(4);
  }

  async function submitBankAssessment() {
    if (!member) return;
    pushLog("Requesting bank assessment...");
    const res = await fetch("/api/housing/bank-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: member.id,
        bank_name: bankName,
      }),
    });
    const json = await res.json();
    if (!json.ok) {
      pushLog("Bank assessment failed: " + json.error);
      return;
    }
    pushLog("Bank assessment created.");
    setStep(5);
  }

  async function submitAllocation() {
    if (!member) return;
    pushLog("Allocating housing...");
    const res = await fetch("/api/housing/allocate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: member.id,
        gnss_district: gnssDistrict,
      }),
    });
    const json = await res.json();
    if (!json.ok) {
      pushLog("Allocation failed: " + json.error);
      return;
    }
    pushLog("Housing allocated.");
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Housing Registration</h1>

      {step === 1 && (
        <div className="space-y-3 bg-slate-900 p-4 rounded">
          <p className="font-semibold">Step 1: Identity Capture</p>
          <input
            className="px-3 py-2 bg-slate-800 rounded w-full"
            placeholder="Full Name"
            value={form.full_name}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
          />
          <input
            className="px-3 py-2 bg-slate-800 rounded w-full"
            placeholder="National ID"
            value={form.national_id}
            onChange={e => setForm({ ...form, national_id: e.target.value })}
          />
          <input
            className="px-3 py-2 bg-slate-800 rounded w-full"
            placeholder="Address"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
          <button
            onClick={submitIdentity}
            className="px-3 py-2 bg-emerald-600 rounded"
          >
            Submit Identity
          </button>
        </div>
      )}

      {step === 2 && member && (
        <div className="space-y-3 bg-slate-900 p-4 rounded">
          <p className="font-semibold">Step 2: Block & Unit</p>
          <select
            className="px-3 py-2 bg-slate-800 rounded w-full"
            value={blockCode}
            onChange={e => setBlockCode(e.target.value)}
          >
            <option value="BLOCK_A">Block A</option>
            <option value="BLOCK_B">Block B</option>
            <option value="BLOCK_C">Block C</option>
            <option value="BLOCK_D">Block D</option>
          </select>
          <select
            className="px-3 py-2 bg-slate-800 rounded w-full"
            value={unitType}
            onChange={e => {
              const v = e.target.value;
              setUnitType(v);
              if (v === "STARTER") setValueBenchmark(40000);
              if (v === "CORE") setValueBenchmark(45000);
              if (v === "FULL") setValueBenchmark(50000);
            }}
          >
            <option value="STARTER">Starter Unit</option>
            <option value="CORE">Core Unit</option>
            <option value="FULL">Full Unit</option>
          </select>
          <p>Value Benchmark: USD {valueBenchmark}</p>
          <button
            onClick={submitBlockUnit}
            className="px-3 py-2 bg-emerald-600 rounded"
          >
            Assign Block & Unit
          </button>
        </div>
      )}

      {step === 3 && member && (
        <div className="space-y-3 bg-slate-900 p-4 rounded">
          <p className="font-semibold">Step 3: Subscription</p>
          <select
            className="px-3 py-2 bg-slate-800 rounded w-full"
            value={subscriptionPlan}
            onChange={e => setSubscriptionPlan(e.target.value)}
          >
            <option value="ATS_HOUSING_FUND">ATS Housing Fund (USD 1/month)</option>
            <option value="DOVES_PENSION">Doves Micro-Pension (USD 10/month)</option>
          </select>
          <button
            onClick={submitSubscription}
            className="px-3 py-2 bg-emerald-600 rounded"
          >
            Activate Subscription
          </button>
        </div>
      )}

      {step === 4 && member && (
        <div className="space-y-3 bg-slate-900 p-4 rounded">
          <p className="font-semibold">Step 4: Bank Assessment</p>
          <select
            className="px-3 py-2 bg-slate-800 rounded w-full"
            value={bankName}
            onChange={e => setBankName(e.target.value)}
          >
            <option value="CBZ">CBZ</option>
            <option value="NMB">NMB</option>
            <option value="STEWARD">Steward</option>
            <option value="POSB">POSB</option>
            <option value="BANCABC">BancABC</option>
          </select>
          <button
            onClick={submitBankAssessment}
            className="px-3 py-2 bg-emerald-600 rounded"
          >
            Request Bank Assessment
          </button>
        </div>
      )}

      {step === 5 && member && (
        <div className="space-y-3 bg-slate-900 p-4 rounded">
          <p className="font-semibold">Step 5: Allocation</p>
          <input
            className="px-3 py-2 bg-slate-800 rounded w-full"
            placeholder="GNSS District"
            value={gnssDistrict}
            onChange={e => setGnssDistrict(e.target.value)}
          />
          <button
            onClick={submitAllocation}
            className="px-3 py-2 bg-emerald-600 rounded"
          >
            Allocate Housing
          </button>
        </div>
      )}

      <div className="bg-slate-900 p-4 rounded space-y-2">
        <p className="font-semibold">Log</p>
        {log.map((l, i) => (
          <p key={i} className="text-sm text-slate-300">
            {l}
          </p>
        ))}
      </div>

      {member && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="font-semibold">Member Summary</p>
          <p>{member.full_name}</p>
          <p>{member.national_id}</p>
          <p>{member.address}</p>
          <p>Status: {member.status}</p>
        </div>
      )}
    </div>
  );
}
