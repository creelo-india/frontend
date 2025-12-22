"use client";

import { useState, useEffect, useMemo } from "react";
import "../../src/components/ProductListingPage/ProductListingPage.scss";
import SidebarFilter from "../../src/components/ProductListingPage/SidebarFilter";
import ProductGrid from "../../src/components/ProductListingPage/ProductGrid";
import SortBar from "../../src/components/ProductListingPage/SortBar";
import Pagination from "../../src/components/ProductListingPage/Pagination";
import productsData from "../../src/components/ProductListingPage/products.json";

const ProductListingPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [sortOption, setSortOption] = useState("relevance");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 10000 },
  });

  useEffect(() => {
    setFilteredProducts(productsData);
  }, []);

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    let filteredList = productsData;

    if (newFilters.category) {
      filteredList = filteredList.filter(
        (product) => product.category.level1 === newFilters.category
      );
    }

    if (newFilters.priceRange) {
      filteredList = filteredList.filter(
        (product) =>
          product.price >= newFilters.priceRange.min &&
          product.price <= newFilters.priceRange.max
      );
    }

    const sortedProducts = [...filteredList].sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ category: "", priceRange: { min: 0, max: 10000 } });
    setFilteredProducts(productsData);
    setCurrentPage(1);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = useMemo(
    () => filteredProducts.slice(startIdx, startIdx + itemsPerPage),
    [filteredProducts, currentPage]
  );

  return (
    <div className="product-listing-page">
      <SidebarFilter
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />
      <div className="main-content">
        <SortBar sortOption={sortOption} onSortChange={handleSortChange} />
        <ProductGrid products={paginatedProducts} />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductListingPage;
