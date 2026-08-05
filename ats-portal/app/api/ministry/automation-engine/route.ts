import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { stakeholder_id, event } = body;

  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("*")
    .eq("id", stakeholder_id)
    .single();

  const { data: state } = await supabase
    .from("onboarding_state")
    .select("*")
    .eq("stakeholder_id", stakeholder_id)
    .single();

  const { data: rules } = await supabase
    .from("ministry_automation_rules")
    .select("*")
    .eq("ministry", stakeholder.sector)
    .eq("trigger_event", event);

  const actionsToRun = [];

  rules.forEach(rule => {
    const cond = rule.condition;

    let match = true;
    Object.keys(cond).forEach(key => {
      if (state[key] !== cond[key] && stakeholder[key] !== cond[key]) {
        match = false;
      }
    });

    if (match) actionsToRun.push(rule.action);
  });

  for (const action of actionsToRun) {
    if (action.type === "advance_stage") {
      await supabase
        .from("onboarding_state")
        .update({ stage: action.next_stage })
        .eq("stakeholder_id", stakeholder_id);
    }

    if (action.type === "auto_reject") {
      await supabase
        .from("onboarding_state")
        .update({ stage: "Rejected" })
        .eq("stakeholder_id", stakeholder_id);
    }

    if (action.type === "auto_approve_mechanisation") {
      await supabase.rpc("approve_mechanisation_request", {
        stakeholder_id
      });
    }

    if (action.type === "notify") {
      await supabase.from("notifications").insert({
        stakeholder_id,
        message: action.message
      });
    }
  }

  return NextResponse.json({
    ok: true,
    executed: actionsToRun
  });
}
