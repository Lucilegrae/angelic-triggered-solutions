"use client";

import { createContext, useContext } from "react";
import { useAtsMinistrySelector } from "@/hooks/api/ministry/useAtsMinistrySelector";

const AtsMinistryContext = createContext<any>(null);

export function AtsMinistryProvider({ children }: { children: React.ReactNode }) {
  const selector = useAtsMinistrySelector();
  return (
    <AtsMinistryContext.Provider value={selector}>
      {children}
    </AtsMinistryContext.Provider>
  );
}

export function useAtsMinistry() {
  return useContext(AtsMinistryContext);
}
