"use client";

import { useState } from "react";

const roles = [
  "community",
  "community_member",
  "miner",
  "bank",
  "investor",
  "government",
  "council",
  "suppliers",
  "transport",
  "donors",
  "insurance",
];

const channels = ["email", "whatsapp", "sms", "qr"];

export default function StakeholderInvitationEngine() {
  const [role, setRole] = useState("community");
  const [channel, setChannel] = useState("email");
  const [target, setTarget] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [qr, setQr] = useState<string>("");
  const [bulkQR, setBulkQR] = useState<any[]>([]);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [badgePdf, setBadgePdf] = useState<string>("");

  async function sendInvite() {
    setStatus("Processing...");

    // QR rail
    if (channel === "qr") {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();
      setQr(data.qr);
      setStatus(`QR generated for role: ${role}`);
      return;
    }

    // Email / WhatsApp / SMS rails
    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "applicationapplication/json" },
      body: JSON.stringify({ role, channel, target, note }),
    });

    const data = await res.json();
    setStatus(`Invitation ${data.status} via ${channel}`);
  }

  async function generateBulkQR() {
    setStatus("Generating bulk QR sheet...");

    const res = await fetch("/api/qr/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roles }),
    });

    const data = await res.json();
    setBulkQR(data.items);
    setStatus(`Generated ${data.count} QR codes`);
  }

  async function generateBadge() {
    setStatus("Generating printable badge...");

    const res = await fetch("/api/qr/badge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, name: target }),
    });

    const data = await res.json();
    setQr(data.qr);
    setStatus(`Badge generated for ${role}`);
  }

  async function generateGoldenStarQR() {
    setStatus("Generating Golden Star verification QR...");

    const res = await fetch("/api/qr/golden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: target, type: role }),
    });

    const data = await res.json();
    setQr(data.qr);
    setStatus(`Golden Star QR generated`);
  }

  async function generatePDF() {
    setStatus("Generating PDF...");

    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "ATS Bulk QR Sheet",
        items: bulkQR,
        columns: 3,
      }),
    });

    const data = await res.json();
    setPdfBase64(data.pdf);
    setStatus("PDF generated");
  }

  async function generatePrintableBadge() {
    setStatus("Generating printable badge...");

    // First generate QR for this role + name
    const qrRes = await fetch("/api/qr/badge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, name: target }),
    });

    const qrData = await qrRes.json();

    // Now generate badge PDF
    const pdfRes = await fetch("/api/badge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        name: target,
        qr: qrData.qr,
      }),
    });

    const pdfData = await pdfRes.json();
    setBadgePdf(pdfData.pdf);
    setStatus("Printable badge generated");
  }

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">Stakeholder Invitation Engine</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Stakeholder Role</label>
          <select
            className="border rounded p-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Channel</label>
          <select
            className="border rounded p-2 w-full"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            {channels.map((c) => (
              <option key={c}>{c.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Target</label>
          <input
            className="border rounded p-2 w-full"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Email / Phone / WhatsApp number / Name / ID"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Personal Note (optional)</label>
          <textarea
            className="border rounded p-2 w-full"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Explain why they’re being invited..."
          />
        </div>
      </div>

      <button
        onClick={sendInvite}
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
      >
        Send Invitation
      </button>

      <button
        onClick={generateBulkQR}
        className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 mt-3"
      >
        Generate Bulk QR Sheet
      </button>

      <button
        onClick={generateBadge}
        className="px-4 py-2 rounded bg-yellow-600 text-white font-semibold hover:bg-yellow-700 mt-3"
      >
        Generate Printable Badge
      </button>

      <button
        onClick={generateGoldenStarQR}
        className="px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 mt-3"
      >
        Generate Golden Star QR
      </button>

      <button
        onClick={generatePDF}
        className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 mt-3"
      >
        Export Bulk QR Sheet as PDF
      </button>

      <button
        onClick={generatePrintableBadge}
        className="px-4 py-2 rounded bg-yellow-600 text-white font-semibold hover:bg-yellow-700 mt-3"
      >
        Generate Printable Badge
      </button>  

      {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}

      {qr && (
        <div className="mt-4">
          <p className="text-sm mb-2">Generated QR:</p>
          <img
            src={qr}
            alt={`QR for ${role}`}
            className="border rounded p-2 bg-white shadow"
          />
        </div>
      )}

      {pdfBase64 && (
        <div className="mt-4">
          <a
            href={`data:application/pdf;base64,${pdfBase64}`}
            download="ATS_QR_Sheet.pdf"
            className="text-blue-600 underline"
          >
            Download PDF
          </a>
        </div>
      )}

      {badgePdf && (
        <div className="mt-4">
          <a
            href={`data:application/pdf;base64,${badgePdf}`}
            download="ATS_Badge.pdf"
            className="text-blue-600 underline"
          >
            Download Printable Badge
          </a>
        </div>
      )}

      {bulkQR.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Bulk QR Sheet</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bulkQR.map((item) => (
              <div key={item.role} className="border rounded p-3 bg-white shadow">
                <p className="text-sm mb-2 font-semibold">{item.role.toUpperCase()}</p>
                <img src={item.qr} alt={item.role} className="border rounded p-2 bg-white" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
