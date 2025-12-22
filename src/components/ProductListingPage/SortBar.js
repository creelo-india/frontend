"use client";

import React from "react";

const SortBar = ({ sortOption, onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-bar">
      <span>Sort by: </span>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="relevance">Relevance</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortBar;
