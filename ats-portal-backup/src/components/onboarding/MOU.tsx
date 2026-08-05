"use client";

import { useState } from "react";
import "@/styles/aura/mou.css";

export function MOU({ role }: { role: string }) {
  const auraMap: any = {
    community: "var(--aura-community)",
    miner: "var(--aura-miner)",
    bank: "var(--aura-bank)",
    investor: "var(--aura-investor)",
    government: "var(--aura-government)",
    supplier: "var(--aura-supplier)",
    transporter: "var(--aura-transporter)",
    donor: "var(--aura-donor)",
  };

  const auraColor = auraMap[role] || "var(--aura-community)";
  const [signed, setSigned] = useState(false);

  async function signMOU() {
    await fetch("/api/mou/sign", { method: "POST" });
    setSigned(true);
  }

  return (
    <div className="mou-container" style={{ "--aura": auraColor } as any}>
      <h2 className="text-2xl font-bold mb-4">ATS Memorandum of Understanding</h2>

      <div className="mou-text">
        <p>
          This Memorandum of Understanding formalizes your participation within
          the ATS ceremonial federation. By signing, you affirm alignment with
          ATS legitimacy, covenantal order, and federated unity. You agree to
          uphold the principles of transparency, integrity, and cosmic harmony
          within your designated role.
        </p>
      </div>

      {!signed && (
        <button className="mou-button" onClick={signMOU}>
          Sign MoU & Initiate Legitimacy
        </button>
      )}

      {signed && (
        <div className="mou-text">
          <p>Your MoU is signed. Legitimacy stage: INITIATED.</p>
          <a href="/legitimacy" className="mou-button">
            Proceed to Dashboard
          </a>
        </div>
      )}
    </div>
  );
}
