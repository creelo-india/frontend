import React from "react";

const Product = ({ product }) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <img src={product.image} alt={product.title} />
    </div>
  );
};

export default Product;
