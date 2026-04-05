import { logAuditTrail } from "../LogAuditTrail";

export const handleAuthLogging = (supabase) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      logAuditTrail(session?.user, [], "USER_LOGIN", { userId: session?.user?.id });
    }
    if (event === "SIGNED_OUT") {
      logAuditTrail(session?.user, [], "USER_LOGOUT", { userId: session?.user?.id });
    }
  });
  return authListener;
};
