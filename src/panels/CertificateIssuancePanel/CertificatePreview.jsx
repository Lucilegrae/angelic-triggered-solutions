import React from "react";

const CertificatePreview = ({ data }) => {
  return (
    <div>
      <h3>Preview</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CertificatePreview;
