import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: Request): Promise<Response> {
  // Generate CSV and PDF buffers here
  const timestamp = new Date().toISOString();
  const csvPath = `${timestamp}-report.csv`;
  const pdfPath = `${timestamp}-report.pdf`;

  // Upload to storage
  await supabase.storage.from("audit_exports").upload(csvPath, new Blob(["csv content"]), { upsert: true });
  await supabase.storage.from("audit_exports").upload(pdfPath, new Blob(["pdf content"]), { upsert: true });

  // Insert metadata into audit_archive
  await supabase.from("audit_archive").insert([
    {
      filename: csvPath,
      filetype: "csv",
      uploaded_at: timestamp,
      storage_path: csvPath
    },
    {
      filename: pdfPath,
      filetype: "pdf",
      uploaded_at: timestamp,
      storage_path: pdfPath
    }
  ]);

  return new Response("Weekly audit export complete", { status: 200 });
}
