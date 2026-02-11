import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./ProductListingPage.scss";
import SidebarFilter from "./SidebarFilter";
import ProductGrid from "./ProductGrid";
import SortBar from "./SortBar";
import Pagination from "./Pagination";
import catalogApi from "../../api/catalog";
import { CONFIG } from "../../api/config";

const ITEMS_PER_PAGE = 20;

const ProductListingPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("relevance");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 100000 },
  });

  const fetchListings = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      // Only call vendor-listings when backend has implemented it (CONFIG.VENDOR_LISTINGS_ENABLED).
      const promises = [
        catalogApi.masterProducts(categoryId != null ? { categoryId } : {}),
      ];
      if (CONFIG.VENDOR_LISTINGS_ENABLED) {
        promises.push(
          catalogApi.vendorListings(categoryId != null ? { categoryId } : {}).catch(() => null)
        );
      }

      const results = await Promise.allSettled(promises);
      const masterRes = results[0];
      const vendorRes = CONFIG.VENDOR_LISTINGS_ENABLED ? results[1] : null;

      const masterRaw = masterRes.status === "fulfilled" ? masterRes.value?.data : undefined;
      const masterList = Array.isArray(masterRaw) ? masterRaw : (masterRaw?.data ?? []);
      const vendorRaw = vendorRes?.status === "fulfilled" ? vendorRes.value?.data : undefined;
      const vendorList = Array.isArray(vendorRaw) ? vendorRaw : (vendorRaw?.data ?? []);

      if (masterList.length === 0 && (!Array.isArray(vendorList) || vendorList.length === 0)) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const byMasterId = {};
      if (Array.isArray(masterList)) {
        masterList.forEach((m) => {
          byMasterId[m.id] = {
            id: m.id,
            masterProductId: m.id,
            name: m.name ?? m.title,
            image: m.imageUrl ?? m.image ?? null,
            price: null,
            stock: null,
            vendorProductId: null,
            vendorName: null,
          };
        });
      }

      if (Array.isArray(vendorList) && vendorList.length > 0) {
        vendorList.forEach((v) => {
          const masterId = v.masterProductId ?? v.masterProduct?.id;
          const name = v.name ?? v.masterProduct?.name ?? byMasterId[masterId]?.name ?? "Product";
          const image = v.image ?? v.masterProduct?.imageUrl ?? v.masterProduct?.image ?? byMasterId[masterId]?.image;
          const item = {
            id: v.id ?? `${v.masterProductId}-${v.vendorId}`,
            masterProductId: masterId,
            vendorProductId: v.id,
            name,
            image: image ?? null,
            price: v.price,
            stock: v.stock,
            vendorName: v.vendor?.name ?? v.vendorName,
          };
          if (byMasterId[masterId]) {
            byMasterId[masterId] = { ...byMasterId[masterId], ...item };
          } else {
            byMasterId[masterId] = item;
          }
        });
      }

      let list = Object.values(byMasterId);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
      }
      setProducts(list);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (slug) {
      catalogApi
        .categories()
        .then((res) => {
          const flat = res.data ?? [];
          const found = flat.find((c) => (c.slug || "").toLowerCase() === (slug || "").toLowerCase());
          const categoryId = found ? found.id : null;
          fetchListings(categoryId);
        })
        .catch(() => fetchListings(null));
    } else {
      fetchListings(null);
    }
  }, [slug, fetchListings]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ category: "", priceRange: { min: 0, max: 100000 } });
    setCurrentPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    let list = [...products];
    if (filters.priceRange) {
      const min = Number(filters.priceRange.min) || 0;
      const max = Number(filters.priceRange.max) || 100000;
      list = list.filter((p) => {
        const price = p.price != null ? Number(p.price) : 0;
        return price >= min && price <= max;
      });
    }
    if (filters.category) {
      list = list.filter((p) => (p.categoryName || p.category?.name || "").toLowerCase() === filters.category.toLowerCase());
    }
    const hasPrice = (a) => (a.price != null ? Number(a.price) : NaN);
    switch (sortOption) {
      case "price-low-high":
        list.sort((a, b) => hasPrice(a) - hasPrice(b));
        break;
      case "price-high-low":
        list.sort((a, b) => hasPrice(b) - hasPrice(a));
        break;
      default:
        break;
    }
    return list;
  }, [products, filters, sortOption]);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = useMemo(
    () => filteredAndSorted.slice(startIdx, startIdx + ITEMS_PER_PAGE),
    [filteredAndSorted, startIdx]
  );

  if (loading) {
    return (
      <div className="product-listing-page">
        <div className="product-listing-state product-listing-loading">Loading products...</div>
      </div>
    );
  }

  const handleRetry = () => {
    if (slug) {
      catalogApi.categories().then((res) => {
        const flat = res.data ?? [];
        const found = flat.find((c) => (c.slug || "").toLowerCase() === (slug || "").toLowerCase());
        fetchListings(found ? found.id : null);
      }).catch(() => fetchListings(null));
    } else {
      fetchListings(null);
    }
  };

  if (error) {
    return (
      <div className="product-listing-page">
        <div className="product-listing-state product-listing-error">
          <p>{error}</p>
          <button type="button" className="product-listing-retry" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-listing-page">
      <SidebarFilter
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />
      <div className="main-content">
        <SortBar sortOption={sortOption} onSortChange={handleSortChange} />
        {filteredAndSorted.length === 0 ? (
          <div className="product-listing-state product-listing-empty">No products found.</div>
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />
            <Pagination
              currentPage={currentPage}
              totalItems={filteredAndSorted.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
