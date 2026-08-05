import { NextResponse } from "next/server";
import { computeAllocationPrivilege } from "@/utils/ats/allocationPrivilegeEngine";

export async function POST(req: Request) {
  const { policy_number } = await req.json();

  const result = computeAllocationPrivilege(policy_number);

  if (!result) {
    return NextResponse.json({
      ok: false,
      error: "Invalid ATS Policy Number",
    });
  }

  return NextResponse.json({
    ok: true,
    privilege: result,
  });
}
