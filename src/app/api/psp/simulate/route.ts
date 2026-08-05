import { NextRequest, NextResponse } from "next/server";

/**
 * ATS PSP Provider Simulator
 * --------------------------
 * Simulates provider behavior for:
 * - initiation
 * - status polling
 * - callbacks
 * - failures
 * - timeouts
 * - network errors
 *
 * Use for testing ATS payment orchestration without real PSPs.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      mode = "initiate",     // initiate | status | callback
      provider = "ecocash",  // ecocash | paynow | ats_psp
      outcome = "success",   // success | failed | pending | timeout | error
      payment_id,
      provider_ref
    } = body;

    // Simulated delay (optional)
    await new Promise((r) => setTimeout(r, 300));

    // INITIATE SIMULATION
    if (mode === "initiate") {
      return NextResponse.json({
        provider,
        simulated: true,
        reference: `SIM-${provider.toUpperCase()}-${Date.now()}`,
        status: "initiated",
        outcome
      });
    }

    // STATUS SIMULATION
    if (mode === "status") {
      let status = "pending";

      if (outcome === "success") status = "success";
      if (outcome === "failed") status = "failed";
      if (outcome === "timeout") status = "timeout";
      if (outcome === "pending") status = "pending";

      if (outcome === "error") {
        return NextResponse.json(
          {
            provider,
            simulated: true,
            error: "Simulated provider error",
            status: "pending"
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        provider,
        simulated: true,
        payment_id,
        provider_ref,
        status,
        outcome
      });
    }

    // CALLBACK SIMULATION
    if (mode === "callback") {
      let status = "pending";

      if (outcome === "success") status = "success";
      if (outcome === "failed") status = "failed";
      if (outcome === "timeout") status = "timeout";

      return NextResponse.json({
        provider,
        simulated: true,
        callback: true,
        payment_id,
        provider_ref,
        status,
        outcome
      });
    }

    return NextResponse.json(
      { error: "Unknown simulation mode" },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
