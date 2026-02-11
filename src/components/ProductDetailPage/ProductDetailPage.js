import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import catalogApi from "../../api/catalog";
import { CONFIG } from "../../api/config";
import { useCart } from "../../context/CartContext";
import "./ProductDetailPage.scss";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [master, setMaster] = useState(null);
  const [vendorListings, setVendorListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const promises = [catalogApi.masterProduct(id)];
    if (CONFIG.VENDOR_LISTINGS_ENABLED) {
      promises.push(catalogApi.vendorListings({ masterProductId: id }).catch(() => ({ data: [] })));
    }
    Promise.all(promises)
      .then((responses) => {
        setMaster(responses[0].data ?? null);
        const vendorRes = CONFIG.VENDOR_LISTINGS_ENABLED ? responses[1] : { data: [] };
        setVendorListings(Array.isArray(vendorRes?.data) ? vendorRes.data : []);
      })
      .catch((err) => {
        setError(err.response?.data?.message ?? err.message ?? "Failed to load product.");
        setMaster(null);
        setVendorListings([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="product-detail-page product-detail-state">Loading...</div>;
  }
  if (error) {
    return (
      <div className="product-detail-page product-detail-state product-detail-error">
        <p>{error}</p>
        <Link to="/product-search">Back to products</Link>
      </div>
    );
  }
  if (!master) {
    return (
      <div className="product-detail-page product-detail-state">
        <p>Product not found.</p>
        <Link to="/product-search">Back to products</Link>
      </div>
    );
  }

  const name = master.name ?? master.title ?? "Product";
  const image = master.imageUrl ?? master.image ?? null;
  const firstVendor = vendorListings.length > 0 ? vendorListings[0] : null;

  const handleAddToCart = () => {
    if (!firstVendor) return;
    addItem({
      vendorProductId: firstVendor.id,
      quantity: 1,
      name,
      price: firstVendor.price,
    });
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-main">
        <div className="product-detail-image-wrap">
          {image ? (
            <img src={image} alt={name} className="product-detail-image" />
          ) : (
            <div className="product-detail-image-placeholder">No image</div>
          )}
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{name}</h1>
          {firstVendor && (
            <>
              <p className="product-detail-price">₹{Number(firstVendor.price).toLocaleString()}</p>
              <p className="product-detail-stock">
                {firstVendor.stock > 0 ? `In stock (${firstVendor.stock})` : "Out of stock"}
              </p>
              {firstVendor.vendor?.name && (
                <p className="product-detail-vendor">Sold by {firstVendor.vendor.name}</p>
              )}
              {firstVendor.stock > 0 && (
                <button type="button" className="product-detail-add-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              )}
            </>
          )}
          {!firstVendor && (
            <p className="product-detail-no-vendor">Check back for availability and pricing.</p>
          )}
        </div>
      </div>
      <p className="product-detail-back">
        <Link to="/product-search">← Back to products</Link>
      </p>
    </div>
  );
};

export default ProductDetailPage;
