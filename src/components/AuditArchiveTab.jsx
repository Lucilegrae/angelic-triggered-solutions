import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // adjust import to your setup

export default function AuditArchiveTab() {
  const [archives, setArchives] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Listen for auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchArchives = async () => {
      if (!session) return; // only fetch if signed in
      const { data, error } = await supabase
        .from("audit_archive")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) {
        console.error("Error fetching audit archive:", error);
      } else {
        setArchives(data);
      }
    };

    fetchArchives();
  }, [session]);

  const getSignedUrl = async (path) => {
    const { data, error } = await supabase
      .storage
      .from("audit_exports")
      .createSignedUrl(path, 3600);

    if (error) {
      console.error("Error creating signed URL:", error);
      return null;
    }
    return data.signedUrl;
  };

  const handleDownload = async (path) => {
    const url = await getSignedUrl(path);
    if (url) {
      window.open(url, "_blank");
    }
  };

  const grouped = archives.reduce((acc, file) => {
    const date = new Date(file.uploaded_at).toLocaleDateString();
    if (!acc[date]) acc[date] = {};
    acc[date][file.filetype] = file;
    return acc;
  }, {});

  if (!session) {
    return <p>Please sign in to view the Audit Archive.</p>;
  }

  return (
    <div className="audit-archive">
      <h2>Audit Archive</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>CSV</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([date, files]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>
                {files.csv ? (
                  <button onClick={() => handleDownload(files.csv.storage_path)}>
                    📊 Download CSV
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {files.pdf ? (
                  <button onClick={() => handleDownload(files.pdf.storage_path)}>
                    📄 Download PDF
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
