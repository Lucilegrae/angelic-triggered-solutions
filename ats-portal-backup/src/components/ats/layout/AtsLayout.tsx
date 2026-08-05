"use client";

import AtsSidebar from "./AtsSidebar";
import AtsTopbar from "./AtsTopbar";

export default function AtsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ats-shell">
      <AtsSidebar />

      <main className="ats-main">
        <AtsTopbar />
        <div className="ats-content">{children}</div>
      </main>
    </div>
  );
}
