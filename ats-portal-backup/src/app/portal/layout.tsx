"use client";

import AtsLayout from "@/components/ats/layout/AtsLayout";
import { AtsMinistryProvider } from "@/context/AtsMinistryContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AtsMinistryProvider>
      <AtsLayout>{children}</AtsLayout>
    </AtsMinistryProvider>
  );
}
