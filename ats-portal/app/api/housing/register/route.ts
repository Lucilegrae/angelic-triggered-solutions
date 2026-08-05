import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();

    const {
      full_name,
      national_id,
      date_of_birth,
      address,
      phone,
      sector,
      photo_url,
    } = body;

    if (!full_name || !national_id || !address) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("housing_members")
      .insert({
        full_name,
        national_id,
        date_of_birth,
        address,
        phone,
        sector,
        photo_url,
        status: "IDENTITY_CAPTURED",
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        member: data,
      },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
