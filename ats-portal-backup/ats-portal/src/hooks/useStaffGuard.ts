"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";

export function useStaffGuard() {
  const router = useRouter();
  const { session, isLoading } = useSessionContext();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/portal/login");
    }
  }, [session, isLoading, router]);
}
