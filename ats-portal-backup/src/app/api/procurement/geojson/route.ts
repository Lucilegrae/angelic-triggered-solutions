import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { ProcurementGeojsonArgs, ProcurementGeojsonReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const geojson = await callRpc<ProcurementGeojsonArgs, ProcurementGeojsonReturns>("procurement_geojson", {});
    return NextResponse.json({ ok: true, geojson });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
