import React from "react";

const AuditFilters = ({ filters, setFilters }) => {
  const update = (field) => (e) =>
    setFilters({ ...filters, [field]: e.target.value });

  return (
    <div>
      <input
        placeholder="Actor"
        value={filters.actor}
        onChange={update("actor")}
      />
    </div>
  );
};

export default AuditFilters;
