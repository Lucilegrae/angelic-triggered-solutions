import { createClient } from "@/utils/supabase/client";

export async function useIdentity() {
  const supabase = createClient();

  const { data: roles } = await supabase.rpc("get_user_roles");
  const { data: permissions } = await supabase.rpc("get_user_permissions");

  return {
    roles: roles ?? [],
    permissions: permissions ?? [],
  };
}

export async function usePermissions() {
  const supabase = createClient();
  const { data } = await supabase.rpc("get_user_permissions");

  const perms = new Set(data ?? []);

  return {
    has: (slug: string) => perms.has(slug),
    list: [...perms],
  };
}

export async function useAuthority() {
  const supabase = createClient();

  return {
    async canIssue(level: string, ministryId?: string, sectorId?: string) {
      const { data } = await supabase.rpc("can_issue_certificate", {
        p_level: level,
        p_ministry_id: ministryId,
        p_sector_id: sectorId,
      });
      return data === true;
    },

    async canApprove(ministryId?: string, sectorId?: string) {
      const { data } = await supabase.rpc("can_approve_workflow", {
        p_ministry_id: ministryId,
        p_sector_id: sectorId,
      });
      return data === true;
    },
  };
}
