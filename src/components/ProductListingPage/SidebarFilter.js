import React, { useState } from "react";

const SidebarFilter = ({ onApplyFilters, onResetFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters({
      category: selectedCategory,
      priceRange,
    });
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 10000 });
    onResetFilters(); // Reset filters in parent component
  };

  return (
    <div className="sidebar-filter">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className="filter-section">
        <h4>Category</h4>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Tools">Tools</option>
          {/* Add more top-level categories */}
        </select>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-range">
          <input
            type="number"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
            placeholder="Min"
          />
          <span>to</span>
          <input
            type="number"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            placeholder="Max"
          />
        </div>
      </div>

      <button onClick={applyFilters} className="apply-filters-btn">
        Apply Filters
      </button>
      <button onClick={resetFilters} className="reset-filters-btn">
        Reset Filters
      </button>
    </div>
  );
};

export default SidebarFilter;
