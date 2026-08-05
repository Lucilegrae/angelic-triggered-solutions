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
  council: "councils",
  suppliers: "supplier_profiles",
  transport: "transporter_profiles",
  donors: "donor_profiles",
  insurance: "insurance_profiles",
};

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { role, payload } = await req.json();

    // ⭐ Golden Star Status Update
    if (role === "golden_star_update") {
      const { sector, id, status } = payload;
      const table = tableMap[sector];

      if (!table) {
        return NextResponse.json({ error: "Invalid sector" }, { status: 400 });
      }

      // Update status
      const { error: updateError } = await supabase
        .from(table)
        .update({ status })
        .eq("id", id);

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }

      // Audit trail logging
      await supabase.from("audit_trail").insert({
        entity_type: sector,
        entity_id: id,
        action: "status_update",
        actor_role: "golden_star_engine",
        actor_id: "system",
        commentary: `${sector} status changed to ${status}`,
      });

      return NextResponse.json({ success: true });
    }

    // ⭐ Default Enrolment Handler
    const table = tableMap[role];
    if (!table) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Type payload according to role
    const typedPayload = payload as typeof RolePayloadMap[role];

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

    // ⭐ Insert into mapped table + return UUID
    const { data: insertedRows, error } = await supabase
      .from(table)
      .insert(finalPayload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ⭐ Automatic audit trail insertion for ALL sectors
    await supabase.from("audit_trail").insert({
      entity_type: role,
      entity_id: insertedRows.id, // AUTO UUID
      action: "created",
      actor_role: "enrolment_engine",
      actor_id: user.id,
      commentary: `${role} onboarded`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid JSON payload or server error" },
      { status: 500 }
    );
  }
}
