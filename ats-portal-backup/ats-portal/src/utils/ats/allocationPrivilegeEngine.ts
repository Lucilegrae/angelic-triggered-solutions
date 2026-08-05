import { decodeAtsPolicyNumber } from "./policyNumberDecoder";

export type AtsPrivilegeResult = {
  nationalId: string;
  tier: string;
  joinNumber: number;
  privilegeScore: number;
  privilegeRank: string;
};

export function computeAllocationPrivilege(policyNumber: string): AtsPrivilegeResult | null {
  const decoded = decodeAtsPolicyNumber(policyNumber);
  if (!decoded) return null;

  const tierWeights: Record<string, number> = {
    T1: 1000,
    T2: 2000,
    T3: 3000,
    T4: 4000,
  };

  const tierWeight = tierWeights[decoded.tier] ?? 0;

  const privilegeScore = (100000 - decoded.joinNumber) + tierWeight;

  let privilegeRank = "Standard";

  if (decoded.tier === "T4") privilegeRank = "Platinum Priority";
  else if (decoded.tier === "T3") privilegeRank = "Gold Priority";
  else if (decoded.tier === "T2") privilegeRank = "Silver Priority";
  else if (decoded.tier === "T1") privilegeRank = "Basic Priority";

  return {
    nationalId: decoded.nationalId,
    tier: decoded.tier,
    joinNumber: decoded.joinNumber,
    privilegeScore,
    privilegeRank,
  };
}
