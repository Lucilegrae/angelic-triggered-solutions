export type AtsBlock = {
  block: string;
  max_units: number;
  current_units: number;
};

export type AtsHousingUnit = {
  id: string;
  block: string;
  unit_number: string;
};

export type AtsMemberAllocation = {
  member_id: string;
  member_name: string;
  policy_number: string;
  privilegeRank: string;
  privilegeScore: number;
  allocated: boolean;
  block: string | null;
  unit_number: string | null;
};

export function applyBlockCapacity(
  sortedMembers: AtsMemberAllocation[],
  blocks: AtsBlock[],
  units: AtsHousingUnit[]
): AtsMemberAllocation[] {
  const blockMap = new Map<string, AtsBlock>();
  blocks.forEach((b) => blockMap.set(b.block, { ...b }));

  const unitMap = new Map<string, AtsHousingUnit[]>();
  units.forEach((u) => {
    if (!unitMap.has(u.block)) unitMap.set(u.block, []);
    unitMap.get(u.block)!.push(u);
  });

  const results: AtsMemberAllocation[] = [];

  for (const member of sortedMembers) {
    let allocated = false;

    for (const block of blocks) {
      const b = blockMap.get(block.block)!;

      if (b.current_units < b.max_units) {
        const availableUnits = unitMap.get(block.block) ?? [];
        const nextUnit = availableUnits.shift();

        if (nextUnit) {
          results.push({
            ...member,
            allocated: true,
            block: nextUnit.block,
            unit_number: nextUnit.unit_number,
          });

          b.current_units++;
          allocated = true;
          break;
        }
      }
    }

    if (!allocated) {
      results.push({
        ...member,
        allocated: false,
        block: null,
        unit_number: null,
      });
    }
  }

  return results;
}
