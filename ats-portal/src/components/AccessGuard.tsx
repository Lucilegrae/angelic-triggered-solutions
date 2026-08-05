import { redirect } from "next/navigation";
import { usePermissions } from "@/hooks/useIdentity";

interface AccessGuardProps {
  permission: string;
  children: React.ReactNode;
}

export default async function AccessGuard({ permission, children }: AccessGuardProps) {
  const { has } = await usePermissions();

  if (!has(permission)) {
    redirect("/no-access");
  }

  return <>{children}</>;
}
