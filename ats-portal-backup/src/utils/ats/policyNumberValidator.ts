export type AtsPolicyNumberParts = {
  nationalId: string;
  tier: string;
  joinNumber: number;
};

export function validateAtsPolicyNumber(policy: string): {
  ok: boolean;
  error?: string;
  parts?: AtsPolicyNumberParts;
} {
  if (!policy.startsWith("ATS-")) {
    return { ok: false, error: "Missing ATS prefix" };
  }

  const parts = policy.replace("ATS-", "").split("-");

  if (parts.length !== 3) {
    return { ok: false, error: "Policy number must have 3 parts: NationalID, Tier, JoinNumber" };
  }

  const [nationalId, tier, joinNumberStr] = parts;

  // Validate National ID (Zimbabwe format)
  const natIdRegex = /^[0-9]{2}-?[0-9]{6}[A-Z][0-9]{2}$/;
  if (!natIdRegex.test(nationalId)) {
    return { ok: false, error: "Invalid National ID format" };
  }

  // Validate Tier
  const validTiers = ["T1", "T2", "T3", "T4"];
  if (!validTiers.includes(tier)) {
    return { ok: false, error: "Invalid ATS Tier (must be T1, T2, T3, or T4)" };
  }

  // Validate Join Number
  const joinNumber = Number(joinNumberStr);
  if (isNaN(joinNumber) || joinNumber < 1) {
    return { ok: false, error: "Join number must be a positive integer" };
  }

  return {
    ok: true,
    parts: {
      nationalId,
      tier,
      joinNumber,
    },
  };
}
