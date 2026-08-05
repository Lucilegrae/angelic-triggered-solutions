"use client";

import { useParams } from "next/navigation";

export default function CertificateViewer() {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) {
    return (
      <div className="ats-container">
        <h1 className="aura-title">Certificate Viewer</h1>
        <p>Loading certificate...</p>
      </div>
    );
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">Certificate Viewer</h1>

      <iframe
        src={`/api/certificates/pdf?uuid=${encodeURIComponent(uuid)}`}
        title="Certificate Viewer"
        className="certificate-frame"
        width="100%"
        height="900"
      />
    </div>
  );
}
