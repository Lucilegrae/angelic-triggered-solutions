"use client";

export default function CertificateViewer({ params }: { params: { uuid: string } }) {
  return (
    <div className="ats-container">
      <h1 className="aura-title">Certificate Viewer</h1>

      <iframe
        src={`/api/certificates/pdf?uuid=${params.uuid}`}
        className="certificate-frame"
      />
    </div>
  );
}
