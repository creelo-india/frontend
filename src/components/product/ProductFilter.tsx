"use client";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setPriceRange,
  setRating,
  setAvailability,
  resetFilters,
} from "../../store/filterSlice";

export default function ProductFilter() {
  const dispatch = useAppDispatch();
  const { priceRange, rating, availability } = useAppSelector(
    (state) => state.filter
  );

  const handlePriceRangeChange = (type: "min" | "max", value: string) => {
    const numValue = parseFloat(value) || 0;
    dispatch(
      setPriceRange({
        min: type === "min" ? numValue : priceRange.min,
        max: type === "max" ? numValue : priceRange.max,
      })
    );
  };

  const handleRatingChange = (value: string) => {
    const numValue = parseFloat(value);
    dispatch(setRating(numValue || null));
  };

  const handleAvailabilityChange = (
    value: "all" | "inStock" | "outOfStock"
  ) => {
    dispatch(setAvailability(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="product-filter">
      <div className="product-filter__header">
        <h3>Filters</h3>
        <button
          type="button"
          className="btn btn-link btn-sm"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="product-filter__section">
        <h4>Price Range</h4>
        <div className="row g-2">
          <div className="col-6">
            <label htmlFor="price-min" className="form-label">
              Min
            </label>
            <input
              type="number"
              id="price-min"
              className="form-control"
              value={priceRange.min}
              onChange={(e) => handlePriceRangeChange("min", e.target.value)}
              min="0"
            />
          </div>
          <div className="col-6">
            <label htmlFor="price-max" className="form-label">
              Max
            </label>
            <input
              type="number"
              id="price-max"
              className="form-control"
              value={priceRange.max}
              onChange={(e) => handlePriceRangeChange("max", e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="product-filter__section">
        <h4>Rating</h4>
        <select
          className="form-select"
          value={rating || ""}
          onChange={(e) => handleRatingChange(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>

      <div className="product-filter__section">
        <h4>Availability</h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="availability"
            id="availability-all"
            value="all"
            checked={availability === "all"}
            onChange={(e) =>
              handleAvailabilityChange(
                e.target.value as "all" | "inStock" | "outOfStock"
              )
            }
          />
          <label className="form-check-label" htmlFor="availability-all">
            All
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="availability"
            id="availability-inStock"
            value="inStock"
            checked={availability === "inStock"}
            onChange={(e) =>
              handleAvailabilityChange(
                e.target.value as "all" | "inStock" | "outOfStock"
              )
            }
          />
          <label className="form-check-label" htmlFor="availability-inStock">
            In Stock
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="availability"
            id="availability-outOfStock"
            value="outOfStock"
            checked={availability === "outOfStock"}
            onChange={(e) =>
              handleAvailabilityChange(
                e.target.value as "all" | "inStock" | "outOfStock"
              )
            }
          />
          <label className="form-check-label" htmlFor="availability-outOfStock">
            Out of Stock
          </label>
        </div>
      </div>
    </div>
  );
}
