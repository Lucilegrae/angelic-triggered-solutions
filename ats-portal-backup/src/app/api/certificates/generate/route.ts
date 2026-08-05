import { NextResponse } from "next/server";
import { validateAtsPolicyNumber } from "@/utils/ats/policyNumberValidator";
import { decodeAtsPolicyNumber } from "@/utils/ats/policyNumberDecoder";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, ministry, sector, role, policy_number } = body;

  // Validate ATS Policy Number
  const validation = validateAtsPolicyNumber(policy_number);
  if (!validation.ok) {
    return NextResponse.json({
      ok: false,
      error: validation.error,
    });
  }

  // Decode ATS Policy Number
  const decoded = decodeAtsPolicyNumber(policy_number);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ats_certificates")
    .insert({
      name,
      ministry,
      sector,
      role,
      policy_number,
      national_id: decoded!.nationalId,
      tier: decoded!.tier,
      join_number: decoded!.joinNumber,
      allocation_slot: decoded!.allocationSlot,
      tier_meaning: decoded!.tierMeaning,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({
    ok: true,
    uuid: data.uuid,
    decoded,
    message: "Certificate generated successfully",
  });
}
