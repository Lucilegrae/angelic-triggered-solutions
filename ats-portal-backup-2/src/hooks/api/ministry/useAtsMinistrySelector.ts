"use client";

import { useState, useEffect } from "react";

export type MinistryOption = {
  id: string;
  name: string;
  code: string;
};

export function useAtsMinistrySelector() {
  const [ministries, setMinistries] = useState<MinistryOption[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/ministry/list");
      const json = await res.json();
      if (json.ok) {
        setMinistries(json.ministries ?? []);
      }
    }
    load();
  }, []);

  function select(id: string) {
    setSelected(id);
    localStorage.setItem("ats-selected-ministry", id);
  }

  useEffect(() => {
    const saved = localStorage.getItem("ats-selected-ministry");
    if (saved) setSelected(saved);
  }, []);

  return { ministries, selected, select };
}
