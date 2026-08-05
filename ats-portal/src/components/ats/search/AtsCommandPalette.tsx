"use client";

import { useState } from "react";
import AtsGlobalSearch from "./AtsGlobalSearch";

export default function AtsCommandPalette() {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <>
      <button className="ats-command-button" onClick={toggle}>
        ⌘K
      </button>

      {open && (
        <div className="ats-command-overlay" onClick={toggle}>
          <div className="ats-command-panel" onClick={(e) => e.stopPropagation()}>
            <AtsGlobalSearch />
          </div>
        </div>
      )}
    </>
  );
}
