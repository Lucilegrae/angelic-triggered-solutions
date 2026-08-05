import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✦ Core Stakeholder RPCs ✦
export async function createStakeholder(name, email, role) {
  return await supabase.rpc("create_stakeholder", {
    p_name: name,
    p_email: email,
    p_role: role
  });
}

export async function updateProgress(stakeholderId, stage) {
  return await supabase.rpc("update_progress", {
    p_stakeholder_id: stakeholderId,
    p_stage: stage
  });
}

export async function addBlessing(stakeholderId, branch, phrase, progressPercent) {
  return await supabase.rpc("add_blessing", {
    p_stakeholder_id: stakeholderId,
    p_branch: branch,
    p_phrase: phrase,
    p_progress_percent: progressPercent
  });
}

export async function submitReflection(stakeholderId, reflectionText) {
  return await supabase.rpc("submit_reflection", {
    p_stakeholder_id: stakeholderId,
    p_reflection_text: reflectionText
  });
}

// ✦ Onboarding RPCs ✦
export async function onboardMinistry(payload) {
  return await supabase.rpc("onboard_ministry", payload);
}

export async function onboardInvestor(payload) {
  return await supabase.rpc("onboard_investor", payload);
}

export async function onboardCommunal(payload) {
  return await supabase.rpc("onboard_communal", payload);
}

// ✦ GlyphStream RPCs ✦
export async function fetchGlyphs(params) {
  return await supabase.rpc("fetch_glyphs", params);
}

export async function logGlyphEvent(glyphId, eventType, meta = {}) {
  return await supabase.rpc("log_glyph_event", {
    p_glyph_id: glyphId,
    p_event_type: eventType,
    p_meta: meta
  });
}
