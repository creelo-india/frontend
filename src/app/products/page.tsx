"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsRequest } from "../../store/productSlice";
import { ProductCard, ProductSkeleton } from "../../components/product";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { list: products, loading, error } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Products</h1>
        <div className="row g-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="col-md-4 col-lg-3">
              <ProductSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <p className="text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Products</h1>
      {products.length === 0 ? (
        <div className="text-center py-5">
          <p>No products found.</p>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
