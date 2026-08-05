"use client";

import AtsGlobalSearch from "@/components/ats/search/AtsGlobalSearch";
import AtsCommandPalette from "@/components/ats/search/AtsCommandPalette";
import AtsMinistrySelector from "@/components/ats/ministry/AtsMinistrySelector";

export default function AtsTopbar() {
  return (
    <header className="ats-topbar">
      <div className="ats-topbar-title">ATS Portal</div>

      <AtsGlobalSearch />
      <AtsMinistrySelector />
      <AtsCommandPalette />

      <div className="ats-topbar-actions">
        <button className="ats-button-small">Settings</button>
        <button className="ats-button-small">Profile</button>
      </div>
    </header>
  );
}
