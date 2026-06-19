import React from "react";

const ExportHistory = ({ history }) => {
  return (
    <ul>
      {history.map((h) => (
        <li key={h.id}>
          {h.format} at {h.timestamp}
        </li>
      ))}
    </ul>
  );
};

export default ExportHistory;
