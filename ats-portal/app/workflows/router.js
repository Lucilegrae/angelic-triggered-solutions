import { loadPayload } from "../dashboard/loadPayload";

export async function atsWorkflowRouter() {
  const payload = await loadPayload();
  if (!payload) return { redirect: "/login" };

  const stakeholder = payload.stakeholder;
  const perms = payload.permissions;

  switch (stakeholder) {
    case "Community":
      return { redirect: "/workflow/community/apply" };

    case "CommunityMember":
      return { redirect: "/workflow/community-member/apply" };

    case "Miner":
      if (perms.can_insure) return { redirect: "/workflow/miner/insurance" };
      if (perms.can_fund) return { redirect: "/workflow/miner/funding" };
      return { redirect: "/workflow/miner/apply" };

    case "Supplier":
      if (perms.can_supply) return { redirect: "/workflow/supplier/supply" };
      return { redirect: "/workflow/supplier/dashboard" };

    case "Insurance":
      return { redirect: "/workflow/insurance/underwriting" };

    case "Bank":
      return { redirect: "/workflow/bank/funding" };

    case "Government":
      return { redirect: `/workflow/government/${payload.ministry}` };

    case "Transporter":
      return { redirect: "/workflow/transporter/logistics" };

    case "Landowner":
      if (perms.can_allocate_land) return { redirect: "/workflow/landowner/allocate" };
      if (perms.can_sell_land) return { redirect: "/workflow/landowner/sell" };
      if (perms.can_compensate_land) return { redirect: "/workflow/landowner/compensate" };
      return { redirect: "/workflow/landowner/dashboard" };

    case "Donor":
      if (perms.can_donate) return { redirect: "/workflow/donor/donate" };
      if (perms.can_sponsor) return { redirect: "/workflow/donor/sponsor" };
      return { redirect: "/workflow/donor/support" };

    case "Investor":
      if (perms.can_invest) return { redirect: "/workflow/investor/invest" };
      if (perms.can_commit_capital) return { redirect: "/workflow/investor/commit" };
      return { redirect: "/workflow/investor/dashboard" };
  }

  return { redirect: "/unauthorized" };
}
