import { computeAllocationPrivilege } from "./allocationPrivilegeEngine";
import { applyBlockCapacity, AtsMemberAllocation, AtsHousingUnit, AtsBlock } from "./blockCapacityEngine";

export type AtsMemberRecord = {
  id: string;
  name: string;
  policy_number: string;
};

export function runAllocationEngine(
  members: AtsMemberRecord[],
  units: AtsHousingUnit[],
  blocks: AtsBlock[]
) {
  const sortedMembers: AtsMemberAllocation[] = members
    .map((m) => {
      const privilege = computeAllocationPrivilege(m.policy_number);
      if (!privilege) return null;

      return {
        member_id: m.id,
        member_name: m.name,
        policy_number: m.policy_number,
        privilegeRank: privilege.privilegeRank,
        privilegeScore: privilege.privilegeScore,
        allocated: false,
        block: null,
        unit_number: null,
      } as AtsMemberAllocation;
    })
    .filter(Boolean) as AtsMemberAllocation[];

  sortedMembers.sort((a, b) => b.privilegeScore - a.privilegeScore);

  return applyBlockCapacity(sortedMembers, blocks, units);
}
