/* ✦ Golden Aura Scheduled PDF Export with Supabase Persistence ✦ */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import supabase from ".../supabaseClient";

// ✦ Default retry settings ✦
let RETRY_COUNT = parseInt(import.meta.env.VITE_RETRY_COUNT || "2", 10);
let RETRY_DELAY = parseInt(import.meta.env.VITE_RETRY_DELAY || "5000", 10);

// ✦ Load persisted settings from Supabase ✦
async function loadRetrySettings() {
  const { data, error } = await supabase
    .from("retry_settings")
    .select("*")
    .single();

  if (!error && data) {
    RETRY_COUNT = data.count;
    RETRY_DELAY = data.delay;
    console.log(
      `✨ Loaded retry settings from Supabase: count=${RETRY_COUNT}, delay=${RETRY_DELAY}ms`
    );
  }
}

// ✦ Save settings to Supabase ✦
export async function setRetrySettings(count, delay) {
  RETRY_COUNT = count;
  RETRY_DELAY = delay;

  const { error } = await supabase
    .from("retry_settings")
    .upsert({ id: 1, count, delay });

  if (error) {
    console.error("⚠️ Ritual Error saving retry settings:", error.message);
  } else {
    console.log(
      `✨ Retry settings updated & saved: count=${count}, delay=${delay}ms`
    );
  }
}

// ✦ Generate Audit Report ✦
export async function generateAuditReport() {
  const { data, error } = await supabase
    .from("role_action_log")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(100);

  if (error) {
    console.error("⚠️ Ritual Error fetching logs:", error.message);
    return null;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("✨ Weekly Role Action Audit Report ✦", 14, 20);

  doc.autoTable({
    head: [["Timestamp", "Actor", "Role", "Action", "Details"]],
    body: data.map((log) => [
      log.timestamp,
      log.actor,
      log.role,
      log.action,
      log.details,
    ]),
    startY: 30,
    styles: { fontSize: 9, cellPadding: 2 },
  });

  return doc.output("arraybuffer");
}
