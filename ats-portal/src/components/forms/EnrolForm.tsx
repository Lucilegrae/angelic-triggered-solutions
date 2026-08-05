"use client";

import { useState } from "react";
import { DynamicFormSection } from "./DynamicFormSection";

export function EnrolForm({ role }: { role: string }) {
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setPayload((p: any) => ({ ...p, [field]: value.trim() }));
  }

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/enrol", {
      method: "POST",
      body: JSON.stringify({ role, payload }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Submission failed");
      return;
    }

    alert("Enrolment submitted");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-4"
    >
      <DynamicFormSection role={role} update={update} />

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Submitting..." : "Submit Enrolment"}
      </button>
    </form>
  );
}
