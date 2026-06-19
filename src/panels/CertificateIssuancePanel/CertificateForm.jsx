import React from "react";

const CertificateForm = ({ form, setForm, onSubmit }) => {
  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Recipient name"
        value={form.recipient}
        onChange={update("recipient")}
      />
      <input
        placeholder="Reason"
        value={form.reason}
        onChange={update("reason")}
      />
      <button type="submit">Issue Certificate</button>
    </form>
  );
};

export default CertificateForm;
