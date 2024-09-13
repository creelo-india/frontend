import React from "react";

const FilterSection = ({ title, children }) => {
  return (
    <div className="filter-section">
      <h4 className="filter-title">{title}</h4>
      <div className="filter-content">{children}</div>
    </div>
  );
};

export default FilterSection;
