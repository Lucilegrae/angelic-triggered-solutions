import React from "react";

const TimelineFilters = ({ filters, setFilters }) => {
  const update = (field) => (e) =>
    setFilters({ ...filters, [field]: e.target.value });

  return (
    <div>
      <input
        placeholder="Keyword"
        value={filters.keyword}
        onChange={update("keyword")}
      />
    </div>
  );
};

export default TimelineFilters;
