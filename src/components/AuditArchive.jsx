import React, { useEffect, useState } from "react";
import { supabase } from ".../supabaseClient";
import "./../theme.css";

export default function AuditArchive() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function loadFiles() {
      const { data, error } = await supabase.storage
        .from("audit_exports") // bucket name
        .list("", { sortBy: { column: "created_at", order: "desc" } });

      if (!error) setFiles(data);
    }

    loadFiles();
  }, []);

  async function downloadFile(name) {
    const { data, error } = await supabase.storage
      .from("audit_exports")
      .download(name);

    if (error) {
      console.error("Download failed:", error.message);
      return;
    }

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="glyph-card aura-form" style={{ marginTop: "1rem" }}>
      <h3 className="aura-heading">✦ Archived Exports ✦</h3>
      {files.length === 0 && <p>No archived exports found.</p>}
      <ul>
        {files.map((file) => (
          <li key={file.name} style={{ marginBottom: "0.5rem" }}>
            <button
              onClick={() => downloadFile(file.name)}
              className="tab-btn projects"
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
