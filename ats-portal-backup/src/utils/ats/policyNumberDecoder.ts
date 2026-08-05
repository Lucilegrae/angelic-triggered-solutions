export type AtsDecodedPolicyNumber = {
  nationalId: string;
  tier: string;
  joinNumber: number;
  allocationSlot: number;
  tierMeaning: string;
};

export function decodeAtsPolicyNumber(policy: string): AtsDecodedPolicyNumber | null {
  if (!policy.startsWith("ATS-")) return null;

  const parts = policy.replace("ATS-", "").split("-");
  if (parts.length !== 3) return null;

  const [nationalId, tier, joinNumberStr] = parts;

  const joinNumber = Number(joinNumberStr);
  if (isNaN(joinNumber)) return null;

  const tierMeaningMap: Record<string, string> = {
    T1: "Basic Tier — Entry level membership",
    T2: "Silver Tier — Moderate privilege",
    T3: "Gold Tier — High privilege and allocation priority",
    T4: "Platinum Tier — Maximum privilege and accelerated scaling",
  };

  return {
    nationalId,
    tier,
    joinNumber,
    allocationSlot: joinNumber,
    tierMeaning: tierMeaningMap[tier] ?? "Unknown Tier",
  };
}
