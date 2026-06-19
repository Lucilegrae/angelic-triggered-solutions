import { useEffect, useState } from "react";
import { buildPreview, saveCertificate } from "./certificate.service";
import { createMultiChannel, removeChannel } from "../../supabaseClient";

export const useCertificateIssuance = () => {
  const [form, setForm] = useState({ recipient: "", reason: "" });
  const [previewData, setPreviewData] = useState(null);
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    const channel = createMultiChannel([
      {
        table: "certificates",
        handlers: {
          onInsert: (p) => setLedger((prev) => [...prev, p.new]),
        },
      },
    ]);

    return () => removeChannel(channel);
  }, []);

  const issueCertificate = async () => {
    const preview = buildPreview(form);
    setPreviewData(preview);
    await saveCertificate(preview);
  };

  return { form, setForm, previewData, issueCertificate, ledger };
};
