"use client";

import { useState } from "react";
import Link from "next/link";

const realms = {
  core: {
    name: "Core Realm",
    color: "text-emerald-400",
    description: "Foundational governance engines and base cosmic reality.",
    path: "/intelligence/master-atlas",
  },
  astral: {
    name: "Astral Realm",
    color: "text-pink-400",
    description: "Influence flows, astral pressure, and celestial governance fabric.",
    path: "/intelligence/astral-governance-fabric",
  },
  quantum: {
    name: "Quantum Realm",
    color: "text-sky-400",
    description: "Quantum state behavior, convergence, stability, and risk.",
    path: "/intelligence/quantum-kernel",
  },
  temporal: {
    name: "Temporal Realm",
    color: "text-violet-400",
    description: "Timelines, foresight, continuum, and sovereign control.",
    path: "/intelligence/cosmic-timeline",
  },
};

export default function RealmSwitcher() {
  const [realm, setRealm] = useState("core");

  const active = realms[realm];

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Realm Switcher ✦</h2>

      <p className="text-slate-400 text-sm mb-6">
        Switch between Core, Astral, Quantum, and Temporal realms.
      </p>

      <div className="flex space-x-4 mb-6">
        {Object.keys(realms).map((key) => (
          <button
            key={key}
            onClick={() => setRealm(key)}
            className={`px-4 py-2 rounded border border-slate-700 text-xs ${
              realm === key ? "bg-slate-800 text-slate-100" : "text-slate-400"
            }`}
          >
            {realms[key].name}
          </button>
        ))}
      </div>

      <div className="pdf-card p-4 border border-slate-700 rounded-lg">
        <h3 className={`text-lg font-semibold mb-2 ${active.color}`}>
          {active.name}
        </h3>

        <p className="text-slate-300 text-xs mb-4">{active.description}</p>

        <Link
          href={active.path}
          className="text-emerald-400 hover:text-emerald-300 underline text-xs"
        >
          Open Realm
        </Link>
      </div>
    </div>
  );
}
