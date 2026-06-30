import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { RolePayloadMap } from "@/types/payloads";
import { RoleSchemaMap } from "@/lib/validation/payloadSchemas";
import { RoleTableMap } from "@/types/supabase/roleTables";

const tableMap: Record<string, string> = {
  community: "communities",
  community_member: "community_members",
  miner: "miners",
  bank: "banks",
  investor: "investors",
  government: "government",
  suppliers: "supplier_profiles",
  transport: "transporter_profiles",
  donors: "donor_profiles",
  insurance: "insurance_profiles",
};

export async function POST(req: Request) {
  try {
    const { role, payload } = await req.json();

    // Type payload according to role
    const typedPayload = payload as typeof RolePayloadMap[role];

    // Validate role
    const table = tableMap[role];
    if (!table) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Fetch authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Attach user_id for RLS
    typedPayload.user_id = user.id;

    // Zod validation
    const parsed = RoleSchemaMap[role].safeParse(typedPayload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Type final payload according to Supabase table row type
    const finalPayload = parsed.data as typeof RoleTableMap[role];

    // Insert into mapped table
    const { error } = await supabase.from(table).insert(finalPayload);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid JSON payload or server error" },
      { status: 500 }
    );
  }
}
