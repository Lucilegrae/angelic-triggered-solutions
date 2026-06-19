import React from "react";
import "./certificate.styles.css";
import CertificateForm from "./CertificateForm";
import CertificatePreview from "./CertificatePreview";
import { useCertificateIssuance } from "./certificate.hooks";

const CertificateIssuancePanel = () => {
  const { form, setForm, previewData, issueCertificate } =
    useCertificateIssuance();

  return (
    <div className="certificate-panel">
      <h2>Certificate Issuance Panel</h2>
      <CertificateForm form={form} setForm={setForm} onSubmit={issueCertificate} />
      <CertificatePreview data={previewData} />
    </div>
  );
};

export default CertificateIssuancePanel;
