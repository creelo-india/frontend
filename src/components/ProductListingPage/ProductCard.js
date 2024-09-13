import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">₹{product.price}</p>
        {product.discount && (
          <p className="product-discount">{product.discount}% off</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
