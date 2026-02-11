import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const hasVendorListing = product.vendorProductId != null;
  const masterId = product.masterProductId ?? product.id;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasVendorListing) return;
    addItem({
      vendorProductId: product.vendorProductId,
      quantity: 1,
      name: product.name,
      price: product.price,
    });
  };

  return (
    <div className="product-card">
      <Link to={masterId ? `/product/${masterId}` : "#"} className="product-card-link">
        <div className="product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.name || "Product"} className="product-image" />
          ) : (
            <div className="product-image-placeholder" aria-hidden>No image</div>
          )}
        </div>
        <div className="product-details">
          <h4 className="product-name">{product.name || "Product"}</h4>
          {product.price != null && (
            <p className="product-price">₹{Number(product.price).toLocaleString()}</p>
          )}
          {product.stock != null && (
            <p className="product-stock">{product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}</p>
          )}
          {product.vendorName && (
            <p className="product-vendor">{product.vendorName}</p>
          )}
        </div>
      </Link>
      {hasVendorListing && product.stock > 0 && (
        <button type="button" className="product-add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
