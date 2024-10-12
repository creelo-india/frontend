import React from "react";
import "./TopSellingProducts.scss";

const TopSellingProducts = () => {
  // Sample data for top-selling products
  const topSellingProducts = [
    {
      id: 1,
      name: "Modern Bathroom Faucet",
      price: "$199.99",
      imageUrl: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Luxury Shower System",
      price: "$299.99",
      imageUrl: "/images/product2.jpg",
    },
    {
      id: 3,
      name: "Kitchen Sink with Pull Down Sprayer",
      price: "$249.99",
      imageUrl: "/images/product3.jpg",
    },
    {
      id: 4,
      name: "Stainless Steel Dishwasher",
      price: "$799.99",
      imageUrl: "/images/product4.jpg",
    },
  ];

  return (
    <div className="top-selling-products">
      <h2>Top Selling Products</h2>
      <div className="products-grid">
        {topSellingProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
